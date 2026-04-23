# 🔥 Google Ecosystem Migration Guide

## Overview

This guide shows you how to migrate Nugget School to the **Google Cloud ecosystem**, staying entirely within Google's tools and services.

---

## 🎯 Recommended Google Stack for Nugget School

### **Your App Architecture:**
```
┌─────────────────────────────────────────────┐
│  Frontend (React/Vite)                      │
│  → Firebase Hosting (Google)                │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│  AI API (Google Gemini)                     │
│  → Called from client-side                  │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│  Backend (Supabase Edge Functions)          │
│  → Already configured                       │
└─────────────────────────────────────────────┘
```

### ✅ **Recommended: Firebase Hosting**

**Best for your React app** because:
- ✅ Free tier (generous limits)
- ✅ CDN-backed (fast globally)
- ✅ Automatic SSL
- ✅ Easy CLI deployment
- ✅ Preview channels for testing
- ✅ Perfect for static sites (React/Vite builds)

### 🤔 **Cloud Run - When to Use It?**

**Good for:**
- Containerized applications
- Backend APIs you control
- Server-side rendering (SSR)
- Microservices

**NOT needed for Nugget School because:**
- ❌ Your app is client-side React (static files)
- ❌ Supabase already handles your backend
- ❌ More complex and expensive
- ❌ Overkill for static site hosting

**When you'd need Cloud Run:**
- If you wanted to move away from Supabase
- If you needed custom server logic
- If you wanted SSR with Next.js

---

## 📋 Migration Path: GitHub → Firebase Hosting

### Step 1: Set Up GitHub (Version Control)

```bash
# In your project folder
git init
git add .
git commit -m "Initial commit - Nugget School"

# Create repo on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/nugget-school.git
git branch -M main
git push -u origin main
```

### Step 2: Install Firebase CLI

```bash
npm install -g firebase-tools
```

### Step 3: Login to Firebase

```bash
firebase login
```

This opens your browser to authenticate with your Google account.

### Step 4: Initialize Firebase in Your Project

```bash
# Navigate to your project folder
cd nugget-school

# Initialize Firebase
firebase init
```

**Select these options:**

1. **Which Firebase features?**
   - ✅ Hosting (press Space to select)
   - Press Enter

2. **Use an existing project or create a new one?**
   - Choose "Create a new project" OR select existing
   - Project ID: `nugget-school` (or auto-generated)

3. **What do you want to use as your public directory?**
   - Enter: `dist` (this is where Vite builds to)

4. **Configure as a single-page app?**
   - Enter: `y` (Yes)

5. **Set up automatic builds with GitHub?**
   - Enter: `y` (Yes, this enables auto-deploy!)

6. **Select your GitHub repo:**
   - Choose: `YOUR_USERNAME/nugget-school`

7. **Set up workflow for automatic deployment?**
   - Enter: `y` (Yes)
   - Branch: `main`

### Step 5: Configure Build Settings

Firebase creates `firebase.json`. Update it:

```json
{
  "hosting": {
    "public": "dist",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ],
    "headers": [
      {
        "source": "**/*.@(jpg|jpeg|gif|png|svg|webp)",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "max-age=31536000"
          }
        ]
      }
    ]
  }
}
```

### Step 6: Set Up Environment Variables

Firebase Hosting is static, so environment variables must be build-time variables.

Create `.env.production`:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

**Add to `.gitignore`:**
```
.env.production
```

### Step 7: Build and Deploy

```bash
# Build your app
npm run build

# Deploy to Firebase
firebase deploy
```

**Your app is now live!** 🎉

URL: `https://nugget-school.web.app` (or custom domain)

### Step 8: Set Up GitHub Actions (Auto-Deploy)

Firebase created `.github/workflows/firebase-hosting-merge.yml`:

```yaml
name: Deploy to Firebase Hosting on merge
on:
  push:
    branches:
      - main
jobs:
  build_and_deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: '${{ secrets.GITHUB_TOKEN }}'
          firebaseServiceAccount: '${{ secrets.FIREBASE_SERVICE_ACCOUNT }}'
          channelId: live
          projectId: nugget-school
```

**Add environment variables as GitHub Secrets:**
1. Go to GitHub repo → Settings → Secrets → Actions
2. Add secrets:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

Update the workflow to use them:

```yaml
      - run: npm run build
        env:
          VITE_SUPABASE_URL: ${{ secrets.VITE_SUPABASE_URL }}
          VITE_SUPABASE_ANON_KEY: ${{ secrets.VITE_SUPABASE_ANON_KEY }}
```

**Now every push to `main` auto-deploys!** 🚀

---

## 🛠️ Development Environment Options

### Option 1: Local Development (Recommended)

**Pros:**
- Fastest performance
- Full IDE features (VS Code, WebStorm)
- No internet required (except for API calls)

**Setup:**
```bash
git clone https://github.com/YOUR_USERNAME/nugget-school.git
cd nugget-school
npm install
npm run dev
```

### Option 2: Google Cloud Shell Editor (Cloud IDE)

**Access:** https://shell.cloud.google.com/?show=ide

**Pros:**
- ✅ Free cloud-based IDE
- ✅ Integrated with Google Cloud
- ✅ Pre-installed tools (gcloud, firebase)
- ✅ 5GB persistent storage

**Setup:**
```bash
# In Cloud Shell
git clone https://github.com/YOUR_USERNAME/nugget-school.git
cd nugget-school
npm install
npm run dev

# Preview on port 8080
# Click "Web Preview" button
```

### Option 3: GitHub Codespaces

**Pros:**
- VS Code in the browser
- Good performance
- GitHub integration

**Cons:**
- Limited free hours (60 hours/month)
- Not Google ecosystem

---

## 🔄 Alternative: Cloud Run (If You Want Full Control)

### When to Use Cloud Run:

If you want to:
- Run a Node.js server (move away from Supabase)
- Implement server-side rendering
- Have custom backend logic
- Use Docker containers

### How to Deploy to Cloud Run:

#### 1. Create `Dockerfile`:

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Install serve to run the built app
RUN npm install -g serve

EXPOSE 8080

CMD ["serve", "-s", "dist", "-l", "8080"]
```

#### 2. Create `.dockerignore`:

```
node_modules
.git
.env
dist
```

#### 3. Build and Deploy:

```bash
# Enable Cloud Run API
gcloud services enable run.googleapis.com

# Build container
gcloud builds submit --tag gcr.io/PROJECT_ID/nugget-school

# Deploy to Cloud Run
gcloud run deploy nugget-school \
  --image gcr.io/PROJECT_ID/nugget-school \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars VITE_SUPABASE_URL=your_url,VITE_SUPABASE_ANON_KEY=your_key
```

**URL:** `https://nugget-school-xxxxx-uc.a.run.app`

**Cost:** Pay per request (free tier: 2 million requests/month)

---

## 💰 Cost Comparison

### Firebase Hosting (Recommended ✅):
- **Storage:** 10 GB free
- **Transfer:** 360 MB/day free
- **Builds:** Unlimited
- **Cost:** FREE for most apps
- **Overage:** $0.026/GB transfer

### Cloud Run:
- **Requests:** 2M free/month
- **CPU time:** 360,000 CPU-seconds/month free
- **Memory:** 180,000 GiB-seconds/month free
- **Cost:** FREE for low traffic, ~$5-20/month for moderate traffic

**For Nugget School:** Firebase Hosting is perfect and will stay free!

---

## 🎯 Recommended Setup Summary

```
┌─────────────────────────────────────────┐
│ Development                             │
│ → Local (VS Code) OR Cloud Shell Editor│
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│ Version Control                         │
│ → GitHub                                │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│ Build & Deploy                          │
│ → Firebase Hosting (auto-deploy)       │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│ Production                              │
│ → https://nugget-school.web.app        │
└─────────────────────────────────────────┘
```

---

## ✅ Quick Start Checklist

### GitHub Setup:
- [ ] Create GitHub repository
- [ ] Push code to GitHub
- [ ] Add `.gitignore` for sensitive files

### Firebase Setup:
- [ ] Install Firebase CLI: `npm install -g firebase-tools`
- [ ] Login: `firebase login`
- [ ] Initialize: `firebase init hosting`
- [ ] Configure for single-page app
- [ ] Set up GitHub Actions for auto-deploy

### Environment Variables:
- [ ] Create `.env.production` locally (don't commit!)
- [ ] Add secrets to GitHub Actions
- [ ] Test build locally: `npm run build`

### Deploy:
- [ ] First deploy: `firebase deploy`
- [ ] Test live site
- [ ] Set up custom domain (optional)

### Verify:
- [ ] App loads correctly
- [ ] Routing works (refresh on sub-routes)
- [ ] Gemini API calls work
- [ ] Supabase connection works
- [ ] Images load

---

## 🆘 Troubleshooting

### "Page not found" on refresh:
- Make sure `firebase.json` has rewrites configured (see Step 5)

### Environment variables not working:
- Remember: Firebase Hosting is static
- Variables must be in `.env.production` at build time
- Prefix with `VITE_` for Vite to include them

### Build fails in GitHub Actions:
- Check secrets are added to GitHub
- Check `package.json` has all dependencies
- Review build logs in Actions tab

### Firebase deploy fails:
- Run `firebase login` again
- Check Firebase project exists
- Verify `firebase.json` is correct

---

## 🚀 Advanced: Custom Domain

1. **Go to Firebase Console**: https://console.firebase.google.com
2. **Select your project**
3. **Go to Hosting**
4. **Click "Add custom domain"**
5. **Enter your domain**: `nuggetschool.com`
6. **Verify ownership** (add TXT record to DNS)
7. **Add A records** to point to Firebase

**Result:** `https://nuggetschool.com` 🎉

---

## 📊 Monitoring & Analytics

### Firebase Analytics (Optional):

```bash
firebase init analytics
```

Add to your app:

```typescript
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  // Your config from Firebase console
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
```

Track events:

```typescript
import { logEvent } from "firebase/analytics";

// Track nugget generation
logEvent(analytics, 'nugget_generated', {
  subject: 'Science',
  topic: 'Space'
});
```

---

## 🎉 Summary

**Best Google Ecosystem Setup for Nugget School:**

1. **Development:** Local VS Code OR Google Cloud Shell Editor
2. **Version Control:** GitHub
3. **Deployment:** Firebase Hosting
4. **Backend:** Keep Supabase (already working!)
5. **AI:** Google Gemini API (client-side calls)

**Why NOT Cloud Run:**
- Your app is static React (doesn't need a server)
- Firebase Hosting is simpler, faster, and free
- Cloud Run is for backend services (you have Supabase)

**Total Cost:** $0/month (Firebase free tier) 💰

---

## 📞 Next Steps

1. ✅ Push to GitHub
2. ✅ Set up Firebase Hosting
3. ✅ Deploy with `firebase deploy`
4. ✅ Test your live app
5. ✅ Set up auto-deploy from GitHub
6. ✅ Share with users!

**You're staying 100% in the Google ecosystem!** 🔥

*Questions? Check the troubleshooting section or Firebase docs.*
