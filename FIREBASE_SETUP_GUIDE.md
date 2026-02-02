# Firebase Cloud Sync Setup Guide
## 100% FREE Cloud Sync for TrainIQ

This guide will help you set up free cloud sync using Firebase (Google's free backend service).

---

## Step 1: Create Firebase Project (5 minutes)

1. Go to **https://console.firebase.google.com/**
2. Click **"Add project"** or **"Create a project"**
3. Enter project name: `trainiq-app` (or any name you want)
4. **Disable Google Analytics** (not needed, keeps it simple)
5. Click **"Create project"**
6. Wait ~30 seconds for setup

---

## Step 2: Register Your Web App (2 minutes)

1. In Firebase console, click the **Web icon** (`</>`) to add a web app
2. Enter app nickname: `TrainIQ Web`
3. **Don't check** "Firebase Hosting" (you're using Netlify)
4. Click **"Register app"**
5. **COPY the firebaseConfig object** - you'll need this!

It looks like this:
```javascript
const firebaseConfig = {
  apiKey: "AIzaSyC...",
  authDomain: "trainiq-app.firebaseapp.com",
  projectId: "trainiq-app",
  storageBucket: "trainiq-app.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

---

## Step 3: Enable Google Authentication (2 minutes)

1. In Firebase console, go to **"Authentication"** (left sidebar)
2. Click **"Get started"**
3. Click **"Sign-in method"** tab
4. Click **"Google"** provider
5. Toggle **"Enable"**
6. Enter support email: your email
7. Click **"Save"**

---

## Step 4: Setup Firestore Database (3 minutes)

1. In Firebase console, go to **"Firestore Database"** (left sidebar)
2. Click **"Create database"**
3. Choose **"Start in production mode"** (we'll add security rules)
4. Choose location: `us-central` (or closest to your users)
5. Click **"Enable"**

### Add Security Rules:

1. Click **"Rules"** tab
2. Replace the rules with this:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

3. Click **"Publish"**

**What this does:** 
- Users can only access their own data
- Must be signed in
- 100% secure

---

## Step 5: Add Firebase to Your App (3 minutes)

### 5a. Add Firebase SDK to index.html

Open `index.html` and find this line (around line 40):
```html
<script src="utils-fixed.js"></script>
```

**Add these lines AFTER it:**
```html
<!-- Firebase SDK -->
<script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-auth-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore-compat.js"></script>
<script src="firebase-sync.js"></script>
```

### 5b. Add Your Firebase Config

Open `firebase-sync.js` and find these lines:
```javascript
const firebaseConfig = {
    apiKey: "YOUR_API_KEY_HERE",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    // ...
};
```

**Replace with YOUR config** from Step 2!

---

## Step 6: Add Cloud Sync UI to Settings Screen

Open `index.html` and find the SettingsScreen function (around line 3285).

**Add this code AFTER the Profile Link section** (around line 3500):

```javascript
{/* CLOUD SYNC SECTION */}
<div className="p-5 rounded-2xl glass">
  <div className="flex items-center justify-between mb-4">
    <div>
      <div className="font-bold text-sm text-gray-400">CLOUD SYNC</div>
      <div className="text-xs text-gray-500 mt-1">Sync across devices</div>
    </div>
    {syncUser && (
      <div className="text-xs text-green-400">
        ✓ {syncUser.email}
      </div>
    )}
  </div>
  
  {!syncUser ? (
    <button
      onClick={handleSignIn}
      className="w-full p-3 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold btn-touch flex items-center justify-center gap-2"
    >
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
      </svg>
      Sign in with Google
    </button>
  ) : (
    <div className="space-y-3">
      <div className="text-xs text-gray-400">
        Last sync: {syncManager.getLastSyncTime() || 'Never'}
      </div>
      
      <div className="flex gap-2">
        <button
          onClick={handleSyncNow}
          disabled={syncing}
          className="flex-1 p-3 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 font-bold btn-touch"
        >
          {syncing ? 'Syncing...' : 'Sync Now'}
        </button>
        
        <button
          onClick={handleSignOut}
          className="flex-1 p-3 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold btn-touch"
        >
          Sign Out
        </button>
      </div>
    </div>
  )}
</div>
```

---

## Step 7: Add Cloud Sync Logic to TrainIQ Component

In the TrainIQ component (around line 2200), add these states and handlers:

```javascript
// Add these states
const [syncUser, setSyncUser] = useState(null);
const [syncing, setSyncing] = useState(false);

// Add authentication listener
useEffect(() => {
  const unsubscribe = window.firebaseCloudSync.onAuthStateChanged(async (user) => {
    setSyncUser(user);
    
    if (user) {
      // User signed in - load from cloud
      setSyncing(true);
      try {
        const cloudData = await window.firebaseCloudSync.loadFromCloud(user.uid);
        
        if (cloudData) {
          // Merge cloud data with local
          if (cloudData.config) setConfig({ ...DEFAULT_CONFIG, ...cloudData.config });
          if (cloudData.program) setProgram(cloudData.program);
          if (cloudData.history) setHistory(cloudData.history);
        }
        
        // Enable auto-sync
        window.syncManager.enableAutoSync(() => ({
          config,
          program,
          history
        }));
      } catch (error) {
        console.error('Cloud load error:', error);
      } finally {
        setSyncing(false);
      }
    } else {
      // User signed out - disable auto-sync
      window.syncManager.disableAutoSync();
    }
  });
  
  return () => unsubscribe();
}, []);

// Add handlers
const handleSignIn = async () => {
  await window.firebaseCloudSync.signInWithGoogle();
};

const handleSignOut = async () => {
  if (confirm('Sign out of cloud sync?')) {
    await window.firebaseCloudSync.signOut();
  }
};

const handleSyncNow = async () => {
  if (!syncUser) return;
  
  setSyncing(true);
  try {
    await window.firebaseCloudSync.saveToCloud(syncUser.uid, {
      config,
      program,
      history
    });
    alert('✓ Synced to cloud!');
  } catch (error) {
    alert('Sync failed: ' + error.message);
  } finally {
    setSyncing(false);
  }
};
```

---

## Step 8: Deploy & Test

1. **Commit changes** to GitHub
2. **Netlify auto-deploys** (~30 seconds)
3. **Test on desktop:**
   - Go to Profile tab
   - Click "Sign in with Google"
   - Generate a program
   - Should auto-sync
4. **Test on mobile:**
   - Open your app
   - Sign in with same Google account
   - Your program should appear!

---

## ✅ You're Done!

Your app now has:
- ✅ 100% FREE cloud sync
- ✅ Auto-sync every 30 seconds
- ✅ Works across all devices
- ✅ Secure (users only see their own data)
- ✅ No monthly costs

---

## Free Tier Limits (Very Generous)

Firebase Free Tier includes:
- **50,000 document reads/day** (~1,600 users syncing daily)
- **20,000 document writes/day** (~650 program generations daily)
- **1 GB storage** (~1 million programs)
- **10 GB bandwidth/month** (~100k users/month)

**You'd need 10,000+ active users** before needing to pay anything!

---

## Troubleshooting

### "Firebase not configured"
- Make sure you updated `firebaseConfig` in `firebase-sync.js`
- Check that Firebase SDK scripts are loaded in `index.html`

### "Sign-in failed"
- Make sure Google auth is enabled in Firebase console
- Check browser console for specific error

### "Permission denied"
- Make sure Firestore security rules are set correctly
- User must be signed in

### Not syncing automatically
- Check browser console for errors
- Make sure auto-sync is enabled after sign-in

---

## Support

Questions? Check the Firebase console for:
- **Authentication** → See signed-in users
- **Firestore** → See stored data
- **Usage** → Monitor free tier limits

Happy syncing! ☁️
