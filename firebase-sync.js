// ==================== FIREBASE CLOUD SYNC ====================
// 100% Free Cloud Sync with Firebase
// Allows users to sync programs across devices with Google Sign-In

// Firebase configuration - ACTUAL PRODUCTION CONFIG
const firebaseConfig = {
    apiKey: "AIzaSyDU0yGa-XkS7Lwkd_2Au6nFoKaE-U2IHcE",
    authDomain: "train-test-da86f.firebaseapp.com",
    projectId: "train-test-da86f",
    storageBucket: "train-test-da86f.firebasestorage.app",
    messagingSenderId: "971455659737",
    appId: "1:971455659737:web:fbc4f68ca157ff7225c8c8",
    measurementId: "G-K7S9WPL79D"
};

// Initialize Firebase (only if config is set up)
let firebaseInitialized = false;
let db = null;
let auth = null;

function initializeFirebase() {
    if (firebaseInitialized) return true;
    
    // Check if Firebase is loaded and config is set
    if (typeof firebase === 'undefined') {
        console.warn('Firebase SDK not loaded');
        return false;
    }
    
    if (firebaseConfig.apiKey === "YOUR_API_KEY_HERE") {
        console.warn('Firebase not configured. Cloud sync disabled.');
        return false;
    }
    
    try {
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }
        
        db = firebase.firestore();
        auth = firebase.auth();
        firebaseInitialized = true;
        
        console.log('✅ Firebase initialized successfully');
        return true;
    } catch (error) {
        console.error('Firebase initialization error:', error);
        return false;
    }
}

// ==================== AUTHENTICATION ====================

async function signInWithGoogle() {
    if (!initializeFirebase()) {
        alert('Cloud sync is not configured. Please contact support.');
        return null;
    }
    
    try {
        const provider = new firebase.auth.GoogleAuthProvider();
        const result = await auth.signInWithPopup(provider);
        
        console.log('✅ Signed in:', result.user.email);
        return result.user;
    } catch (error) {
        console.error('Sign-in error:', error);
        
        if (error.code === 'auth/popup-closed-by-user') {
            return null; // User cancelled, no alert needed
        }
        
        alert(`Sign-in failed: ${error.message}`);
        return null;
    }
}

async function signOut() {
    if (!auth) return;
    
    try {
        await auth.signOut();
        console.log('✅ Signed out');
    } catch (error) {
        console.error('Sign-out error:', error);
    }
}

function getCurrentUser() {
    return auth ? auth.currentUser : null;
}

function onAuthStateChanged(callback) {
    if (!auth) return () => {};
    return auth.onAuthStateChanged(callback);
}

// ==================== CLOUD STORAGE ====================

async function saveToCloud(userId, data) {
    if (!db || !userId) {
        throw new Error('Not authenticated');
    }
    
    try {
        await db.collection('users').doc(userId).set({
            config: data.config || {},
            program: data.program || null,
            history: data.history || [],
            updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
            version: 1
        }, { merge: true });
        
        console.log('✅ Saved to cloud');
        return { success: true };
    } catch (error) {
        console.error('Cloud save error:', error);
        return { success: false, error: error.message };
    }
}

async function loadFromCloud(userId) {
    if (!db || !userId) {
        throw new Error('Not authenticated');
    }
    
    try {
        const doc = await db.collection('users').doc(userId).get();
        
        if (!doc.exists) {
            console.log('No cloud data found');
            return null;
        }
        
        const data = doc.data();
        console.log('✅ Loaded from cloud');
        
        return {
            config: data.config || {},
            program: data.program || null,
            history: data.history || [],
            updatedAt: data.updatedAt
        };
    } catch (error) {
        console.error('Cloud load error:', error);
        throw error;
    }
}

async function deleteCloudData(userId) {
    if (!db || !userId) {
        throw new Error('Not authenticated');
    }
    
    try {
        await db.collection('users').doc(userId).delete();
        console.log('✅ Cloud data deleted');
        return { success: true };
    } catch (error) {
        console.error('Cloud delete error:', error);
        return { success: false, error: error.message };
    }
}

// ==================== SYNC MANAGER ====================

class SyncManager {
    constructor() {
        this.syncing = false;
        this.lastSync = null;
        this.autoSyncEnabled = true;
        this.syncInterval = null;
    }
    
    async enableAutoSync(callback) {
        this.autoSyncEnabled = true;
        
        // Auto-sync every 30 seconds when user is active
        if (this.syncInterval) {
            clearInterval(this.syncInterval);
        }
        
        this.syncInterval = setInterval(async () => {
            const user = getCurrentUser();
            if (user && this.autoSyncEnabled && !this.syncing) {
                await this.syncToCloud(callback);
            }
        }, 30000); // 30 seconds
    }
    
    disableAutoSync() {
        this.autoSyncEnabled = false;
        if (this.syncInterval) {
            clearInterval(this.syncInterval);
            this.syncInterval = null;
        }
    }
    
    async syncToCloud(getLocalData) {
        if (this.syncing) return;
        
        const user = getCurrentUser();
        if (!user) return;
        
        this.syncing = true;
        
        try {
            // Get current local data
            const localData = getLocalData();
            
            // Save to cloud
            const result = await saveToCloud(user.uid, localData);
            
            if (result.success) {
                this.lastSync = new Date();
            }
            
            return result;
        } catch (error) {
            console.error('Sync error:', error);
            return { success: false, error: error.message };
        } finally {
            this.syncing = false;
        }
    }
    
    async syncFromCloud(userId) {
        if (this.syncing) return null;
        
        this.syncing = true;
        
        try {
            const cloudData = await loadFromCloud(userId);
            this.lastSync = new Date();
            return cloudData;
        } catch (error) {
            console.error('Sync error:', error);
            return null;
        } finally {
            this.syncing = false;
        }
    }
    
    getLastSyncTime() {
        if (!this.lastSync) return null;
        
        const now = new Date();
        const diff = now - this.lastSync;
        
        if (diff < 60000) return 'Just now';
        if (diff < 3600000) return `${Math.floor(diff / 60000)} min ago`;
        if (diff < 86400000) return `${Math.floor(diff / 3600000)} hr ago`;
        return this.lastSync.toLocaleDateString();
    }
}

// Global sync manager instance
window.syncManager = new SyncManager();

// ==================== EXPORT FUNCTIONS ====================

if (typeof window !== 'undefined') {
    window.firebaseCloudSync = {
        initialize: initializeFirebase,
        signInWithGoogle,
        signOut,
        getCurrentUser,
        onAuthStateChanged,
        saveToCloud,
        loadFromCloud,
        deleteCloudData,
        syncManager: window.syncManager
    };
}
