// ==================== SUPABASE CLOUD SYNC ====================
// Free cloud sync for TrainIQ using Supabase (no credit card required!)
// 
// SETUP INSTRUCTIONS:
// 1. Go to https://supabase.com and create a free account
// 2. Create a new project (free tier)
// 3. Get your project URL and anon key from Settings > API
// 4. Replace the values below:

const SUPABASE_URL = 'YOUR_SUPABASE_URL_HERE';  // e.g., https://xxxxx.supabase.co
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY_HERE';

// Initialize Supabase client
let supabaseClient = null;

try {
    if (SUPABASE_URL !== 'YOUR_SUPABASE_URL_HERE' && SUPABASE_ANON_KEY !== 'YOUR_SUPABASE_ANON_KEY_HERE') {
        const { createClient } = supabase;
        supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        console.log('✅ Supabase connected');
    } else {
        console.warn('⚠️  Supabase not configured. Cloud sync will not work.');
        console.warn('📖 See setup instructions at top of supabase-sync.js');
    }
} catch (error) {
    console.error('❌ Supabase initialization failed:', error);
}

// Push current data to cloud
async function pushToCloud() {
    if (!supabaseClient) {
        alert('⚠️ Cloud sync not configured.\n\nTo enable:\n1. Create free Supabase account at supabase.com\n2. Get your project URL and key\n3. Update supabase-sync.js with your credentials');
        return;
    }

    try {
        // Get profile ID from URL hash (multi-user support)
        const profileId = getProfileIdFromHash();
        
        // Get current data from localStorage
        const stateKey = `trainiq:${profileId}:state`;
        const stateData = localStorage.getItem(stateKey);
        
        if (!stateData) {
            alert('❌ No data to sync. Generate a program first!');
            return;
        }

        const state = JSON.parse(stateData);
        
        // Save to Supabase
        const { data, error } = await supabaseClient
            .from('trainiq_data')
            .upsert({
                profile_id: profileId,
                state_data: state,
                updated_at: new Date().toISOString()
            }, {
                onConflict: 'profile_id'
            });

        if (error) throw error;

        alert('✅ Saved to cloud successfully!\n\nYour program is now backed up.');
        console.log('☁️  Data pushed to cloud:', profileId);
        
    } catch (error) {
        console.error('Push error:', error);
        alert(`❌ Failed to save to cloud:\n${error.message}\n\nCheck console for details.`);
    }
}

// Pull data from cloud to device
async function pullFromCloud() {
    if (!supabaseClient) {
        alert('⚠️ Cloud sync not configured.\n\nTo enable:\n1. Create free Supabase account at supabase.com\n2. Get your project URL and key\n3. Update supabase-sync.js with your credentials');
        return;
    }

    if (!confirm('⚠️ This will REPLACE your current data with cloud data.\n\nContinue?')) {
        return;
    }

    try {
        // Get profile ID from URL hash
        const profileId = getProfileIdFromHash();
        
        // Fetch from Supabase
        const { data, error } = await supabaseClient
            .from('trainiq_data')
            .select('state_data, updated_at')
            .eq('profile_id', profileId)
            .single();

        if (error) {
            if (error.code === 'PGRST116') {
                alert('❌ No cloud data found for this profile.\n\nSave to cloud first using the "⬆️ Save to Cloud" button.');
            } else {
                throw error;
            }
            return;
        }

        if (!data || !data.state_data) {
            alert('❌ No cloud data available.');
            return;
        }

        // Save to localStorage
        const stateKey = `trainiq:${profileId}:state`;
        localStorage.setItem(stateKey, JSON.stringify(data.state_data));

        const lastUpdated = new Date(data.updated_at).toLocaleString();
        alert(`✅ Loaded from cloud successfully!\n\nLast updated: ${lastUpdated}\n\nReloading app...`);
        
        // Reload to show new data
        setTimeout(() => window.location.reload(), 500);
        
    } catch (error) {
        console.error('Pull error:', error);
        alert(`❌ Failed to load from cloud:\n${error.message}\n\nCheck console for details.`);
    }
}

// Helper: Get profile ID from URL hash
function getProfileIdFromHash() {
    const hash = window.location.hash;
    const match = hash.match(/#\/u\/([a-f0-9-]+)/i);
    if (match) {
        return match[1];
    }
    
    // If no profile in URL, use default profile
    const defaultProfileId = localStorage.getItem('trainiq_default_profile_id');
    if (defaultProfileId) {
        return defaultProfileId;
    }
    
    // Generate new profile ID
    const newProfileId = generateUUID();
    localStorage.setItem('trainiq_default_profile_id', newProfileId);
    return newProfileId;
}

// Helper: Generate UUID
function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

// Make functions globally available
window.pushToCloud = pushToCloud;
window.pullFromCloud = pullFromCloud;

console.log('📦 Supabase sync module loaded');

// ==================== SUPABASE TABLE SETUP ====================
// Run this SQL in your Supabase SQL Editor to create the table:
/*

CREATE TABLE trainiq_data (
    id BIGSERIAL PRIMARY KEY,
    profile_id TEXT UNIQUE NOT NULL,
    state_data JSONB NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE trainiq_data ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read/write their own profile (using profile_id)
-- This is simple but not secure for production - consider adding auth
CREATE POLICY "Allow public access" ON trainiq_data
    FOR ALL USING (true);

-- Create index for faster lookups
CREATE INDEX idx_profile_id ON trainiq_data(profile_id);

*/
