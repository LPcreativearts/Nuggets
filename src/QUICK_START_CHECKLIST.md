# ✅ Quick Migration Checklist

Copy this checklist and check off each step as you complete it!

---

## 📦 Pre-Migration Preparation

- [ ] **Review your app** - Test all features one last time in Figma Make
- [ ] **Note any Figma Make-specific features** - Anything that might not transfer
- [ ] **Have your API keys ready** - Google Gemini API key, Supabase credentials
- [ ] **Choose your GitHub username** - If you don't have an account yet

---

## 🔐 Security & Environment Setup

- [ ] **Create `.env` file locally** (don't commit it!)
  ```env
  VITE_SUPABASE_URL=your_url_here
  VITE_SUPABASE_ANON_KEY=your_key_here
  ```
- [ ] **Verify `.gitignore` includes `.env`** (already done ✅)
- [ ] **Remove any hardcoded API keys** from code (already done ✅)
- [ ] **Document required env variables** in README (already done ✅)

---

## 📤 Export from Figma Make

- [ ] **Export/Download your project** from Figma Make
  - Look for Export, Download, or Clone option
  - Save all files to a local folder
- [ ] **Verify all files are present**:
  - [ ] App.tsx (main file)
  - [ ] /components/ folder
  - [ ] /services/ folder
  - [ ] /utils/ folder
  - [ ] /data/ folder
  - [ ] /styles/ folder
  - [ ] All other project files

---

## 🐙 GitHub Repository Setup

- [ ] **Create GitHub account** (if needed) at https://github.com
- [ ] **Create new repository**:
  - Name: `nugget-school`
  - Public or Private (your choice)
  - Add README: Yes (you'll replace it)
  - Add .gitignore: Node
- [ ] **Note your repository URL**: `https://github.com/YOUR_USERNAME/nugget-school`

---

## 📤 Push to GitHub

### Option A: GitHub Website Upload (Easier)
- [ ] Click "uploading an existing file" in your GitHub repo
- [ ] Drag and drop all project files
- [ ] Write commit message: "Initial commit - Nugget School"
- [ ] Click "Commit changes"

### Option B: Git CLI (Recommended)
- [ ] Open terminal in project folder
- [ ] Run: `git init`
- [ ] Run: `git add .`
- [ ] Run: `git commit -m "Initial commit - Nugget School v1.0"`
- [ ] Run: `git remote add origin https://github.com/YOUR_USERNAME/nugget-school.git`
- [ ] Run: `git branch -M main`
- [ ] Run: `git push -u origin main`

---

## 🚀 Import to Google IDX

- [ ] **Go to Google IDX**: https://idx.google.com or https://idx.dev
- [ ] **Sign in** with your Google account
- [ ] **Click "Import from GitHub"** or "New Project"
- [ ] **Select your repository**: `YOUR_USERNAME/nugget-school`
- [ ] **Wait for import** to complete (may take 1-2 minutes)

---

## ⚙️ Configure Google IDX

- [ ] **IDX auto-detects project type** (React/Vite)
- [ ] **Add environment variables in IDX**:
  - Go to Settings (⚙️) → Environment Variables
  - Add: `VITE_SUPABASE_URL`
  - Add: `VITE_SUPABASE_ANON_KEY`
- [ ] **Open terminal in IDX**
- [ ] **Install dependencies**: `npm install`
- [ ] **Start dev server**: `npm run dev`
- [ ] **Open preview** - Click the preview URL IDX provides

---

## ✅ Verification Testing

Test these key features to make sure everything works:

### Core Features:
- [ ] **App loads** without errors
- [ ] **Home page** displays with subject planets
- [ ] **Settings page** opens
- [ ] **Add Google Gemini API key** in Settings
- [ ] **Click a subject** (e.g., Science)
- [ ] **Click a subtopic** to generate a nugget
- [ ] **Nugget generates** successfully with AI
- [ ] **Image loads** on nugget page

### Interactive Features:
- [ ] **"Explain" button** generates AI response
- [ ] **"Do This" button** generates activity
- [ ] **"Photos" button** shows image search
- [ ] **Speech/Read Aloud** button works (if testing audio)
- [ ] **Save to Collection** works

### Data Persistence:
- [ ] **Crumbs balance** persists after refresh
- [ ] **Saved nuggets** appear in "My Collections"
- [ ] **Settings** are saved (dark mode, API key)

### Authentication (if using):
- [ ] **Sign up** creates account
- [ ] **Sign in** works
- [ ] **Sign out** works
- [ ] **Data syncs** to Supabase

---

## 🎨 Optional: Customize IDX

- [ ] **Install IDX extensions** (if needed)
- [ ] **Configure keyboard shortcuts**
- [ ] **Set up Git commit preferences**
- [ ] **Customize theme** (dark/light)

---

## 🌐 Optional: Deploy to Production

### Using Vercel (Recommended):
- [ ] Go to https://vercel.com
- [ ] Sign in with GitHub
- [ ] Click "Import Project"
- [ ] Select `nugget-school` repository
- [ ] Add environment variables in Vercel dashboard
- [ ] Click "Deploy"
- [ ] **Live URL**: `nugget-school.vercel.app` ✨

### Using Netlify:
- [ ] Go to https://netlify.com
- [ ] Sign in with GitHub
- [ ] Click "Add new site" → "Import from Git"
- [ ] Select `nugget-school` repository
- [ ] Build command: `npm run build`
- [ ] Publish directory: `dist`
- [ ] Add environment variables
- [ ] Click "Deploy"
- [ ] **Live URL**: `nugget-school.netlify.app` ✨

---

## 📚 Documentation Review

- [ ] **Read** `/README.md` - Project overview
- [ ] **Read** `/MIGRATION_GUIDE.md` - Detailed migration steps
- [ ] **Read** `/FINAL_STATUS.md` - Optimization summary
- [ ] **Bookmark** important docs for reference

---

## 🎉 Migration Complete!

Congratulations! Your Nugget School app is now:

✅ **Version-controlled** on GitHub  
✅ **Running** in Google IDX  
✅ **AI-assisted** development ready  
✅ **Optimized** (60% size reduction)  
✅ **Well-documented**  
✅ **(Optional) Deployed** to production  

---

## 🆘 If You Get Stuck

### Common Issues:

**"Module not found" errors:**
```bash
npm install
```

**Environment variables not working:**
- Restart dev server after adding them
- Check they're prefixed with `VITE_`

**Supabase connection fails:**
- Verify credentials are correct
- Check Supabase project is active

**Build errors:**
- Check package.json
- Run `npm install` again
- Look for TypeScript errors in IDE

### Need Help?
- Check `/MIGRATION_GUIDE.md` for detailed troubleshooting
- Review error messages carefully
- Search GitHub Issues (or create one!)

---

## 📞 Next Steps After Migration

- [ ] **Learn Google IDX features** - AI assistance, collaboration
- [ ] **Start using Gemini in IDX** for code suggestions
- [ ] **Set up Git workflow** - branches, pull requests
- [ ] **Plan new features** using your optimized codebase
- [ ] **Share your app** with users!

---

## 🚀 You're All Set!

**Happy coding with Nugget School!** 🍗✨

*Made with ❤️ for curious young minds*
