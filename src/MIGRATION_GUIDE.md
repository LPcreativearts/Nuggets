# 🚀 Migration Guide: Figma Make → GitHub → Google IDX

## Overview

This guide walks you through migrating your Nugget School app from Figma Make to GitHub and then to Google IDX (Google's cloud-based IDE with AI assistance).

---

## 📋 Migration Steps

### Step 1: Export from Figma Make

Figma Make should have an **export** or **download** option. You'll want to:

1. Look for an **Export** button (usually in settings or file menu)
2. Download as ZIP or clone the repository
3. Extract all files to a local folder

> **Alternative**: If Figma Make has Git integration, you can push directly to GitHub from within Figma Make.

---

### Step 2: Set Up GitHub Repository

#### Option A: Using GitHub Website (Easier)

1. **Create a new repository on GitHub**:
   - Go to https://github.com/new
   - Repository name: `nugget-school`
   - Description: "Educational app for children with AI-powered facts"
   - Choose **Public** or **Private**
   - ✅ Add README (you can replace it later)
   - ✅ Add .gitignore (select "Node")
   - Click **Create repository**

2. **Upload your files**:
   - Click **uploading an existing file**
   - Drag and drop all your files
   - Commit the changes

#### Option B: Using Git CLI (Recommended for developers)

```bash
# Navigate to your project folder
cd /path/to/nugget-school

# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Nugget School v1.0 (optimized 60%)"

# Add your GitHub repository as remote
git remote add origin https://github.com/YOUR_USERNAME/nugget-school.git

# Push to GitHub
git branch -M main
git push -u origin main
```

---

### Step 3: Set Up Environment Variables

**IMPORTANT**: Before pushing, make sure sensitive data is protected!

1. **Create `.env` file** (already added to `.gitignore`):
   ```env
   VITE_SUPABASE_URL=your_supabase_url_here
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
   ```

2. **Never commit**:
   - API keys
   - Database credentials
   - Any `.env` files

3. **Document in README** what environment variables are needed (already done!)

---

### Step 4: Import to Google IDX

#### What is Google IDX?

Google IDX is a cloud-based development environment with:
- ✅ AI assistance (powered by Gemini)
- ✅ Built-in preview
- ✅ GitHub integration
- ✅ No local setup required
- ✅ Collaborative features

#### How to Import:

1. **Go to Google IDX**:
   - Visit https://idx.google.com (or https://idx.dev)
   - Sign in with your Google account

2. **Import from GitHub**:
   - Click **"Import from GitHub"** or **"New Project"**
   - Select **"Import a repository"**
   - Choose `YOUR_USERNAME/nugget-school`
   - Click **Import**

3. **Configure the project**:
   - IDX will detect it's a React/Vite project
   - It should auto-configure build settings
   - If prompted, select:
     - **Framework**: React
     - **Build tool**: Vite
     - **Package manager**: npm

4. **Set up environment variables in IDX**:
   - Go to project settings (⚙️)
   - Find "Environment Variables" or "Secrets"
   - Add your Supabase credentials:
     - `VITE_SUPABASE_URL`
     - `VITE_SUPABASE_ANON_KEY`

5. **Install dependencies**:
   ```bash
   npm install
   ```

6. **Run the app**:
   ```bash
   npm run dev
   ```

7. **Use the preview**:
   - IDX will provide a preview URL
   - Click to see your app running!

---

## 🎯 Alternative Options

### Option 1: Google AI Studio (Limited)

**Not recommended for full app development**, but you can:
- Use it for testing Gemini API prompts
- Experiment with content generation
- Fine-tune your AI responses

**Better for**: API testing and prompt engineering, not full app development

### Option 2: Replit

Similar to Google IDX:
1. Go to https://replit.com
2. Click **Import from GitHub**
3. Select your repository
4. Replit auto-configures everything

**Pros**: Very easy, good collaboration  
**Cons**: Limited free tier

### Option 3: StackBlitz

Web-based IDE specifically for web apps:
1. Go to https://stackblitz.com
2. Click **Import from GitHub**
3. Enter: `github.com/YOUR_USERNAME/nugget-school`

**Pros**: Instant preview, very fast  
**Cons**: Limited backend support

### Option 4: Local Development

Good old-fashioned local setup:
1. Clone from GitHub
2. Run `npm install`
3. Run `npm run dev`
4. Use your favorite IDE (VS Code, WebStorm, etc.)

**Pros**: Full control, fastest performance  
**Cons**: Requires local setup

---

## ✅ Recommended Path

**For Nugget School, I recommend:**

1. **GitHub** (version control) ✅
2. **Google IDX** (development) ✅
3. **Vercel or Netlify** (deployment) ✅

**Why?**
- GitHub: Industry standard, free, great for collaboration
- Google IDX: Cloud-based, AI assistance, no local setup, perfect for your Gemini API usage
- Vercel/Netlify: Free hosting, automatic deployments from GitHub

---

## 🔐 Security Checklist

Before pushing to GitHub:

- [ ] `.gitignore` includes `.env` files
- [ ] No API keys in code
- [ ] No database credentials in code
- [ ] Supabase keys are environment variables
- [ ] `SUPABASE_SERVICE_ROLE_KEY` is server-side only
- [ ] README documents required environment variables

---

## 📦 What to Include in Repository

### ✅ Include:
- All `.tsx`, `.ts`, `.css` files
- `package.json` and `package-lock.json`
- `.gitignore`
- `README.md`
- Documentation files (`.md`)
- Public assets

### ❌ Don't Include:
- `node_modules/` folder
- `.env` files
- API keys
- Build output (`dist/`, `build/`)
- IDE-specific files (`.vscode/`, `.idea/`)

---

## 🚀 Deployment (Bonus)

Once in GitHub, deploy easily:

### Vercel (Recommended):
1. Go to https://vercel.com
2. Click **Import Project**
3. Select your GitHub repo
4. Vercel auto-detects Vite/React
5. Add environment variables in Vercel dashboard
6. Click **Deploy**

**Result**: Live app at `nugget-school.vercel.app`

### Netlify:
1. Go to https://netlify.com
2. Click **Add new site** → **Import from Git**
3. Select your GitHub repo
4. Build command: `npm run build`
5. Publish directory: `dist`
6. Add environment variables
7. Click **Deploy**

**Result**: Live app at `nugget-school.netlify.app`

---

## 💡 Pro Tips

1. **Commit often**: Make small, frequent commits with clear messages
2. **Use branches**: Create feature branches for new work
3. **Document changes**: Update README as you add features
4. **Test before pushing**: Make sure app works before pushing to GitHub
5. **Use GitHub Issues**: Track bugs and feature requests
6. **Set up GitHub Actions**: Automate testing and deployment

---

## 🆘 Troubleshooting

### "Module not found" errors in IDX:
```bash
npm install
```

### Environment variables not working:
- Check they're prefixed with `VITE_` for client-side access
- Restart dev server after adding env vars

### Supabase connection issues:
- Verify URL and keys are correct
- Check if your Supabase project is active
- Ensure environment variables are set in IDX

### Build fails:
- Check `package.json` has all dependencies
- Run `npm install` again
- Check for TypeScript errors

---

## 📞 Next Steps

After successful migration:

1. ✅ Test all features in Google IDX
2. ✅ Set up environment variables
3. ✅ Run the app and verify everything works
4. ✅ Use Gemini in IDX for AI-assisted coding
5. ✅ Deploy to Vercel/Netlify for live version
6. ✅ Share with users!

---

## 🎉 You're Ready!

Your Nugget School app is:
- ✅ Version-controlled on GitHub
- ✅ Running in Google IDX
- ✅ Optimized (60% size reduction)
- ✅ Well-documented
- ✅ Ready for AI-assisted development

**Happy coding!** 🚀🍗
