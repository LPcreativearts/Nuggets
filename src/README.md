# 🍗 Nugget School

An educational app for children (ages 7-8) that presents fascinating facts across different subjects with an interactive learning experience, specifically designed with neurodivergent children in mind.

![Nugget School](https://img.shields.io/badge/React-18+-blue.svg)
![Tailwind](https://img.shields.io/badge/Tailwind-4.0-38bdf8.svg)
![Supabase](https://img.shields.io/badge/Supabase-Enabled-3ecf8e.svg)

## ✨ Features

### 📚 Educational Content
- **6 Subject Areas**: Science, History, Geography, Arts, Math, Language
- **AI-Powered Facts**: Generated using Google Gemini API
- **Interactive Learning**: "Explain", "Do This" activities, and photo exploration
- **Voice Support**: Text-to-speech and speech recognition for accessibility

### 🎮 Gamification
- **Crumbs Currency** (🍗): Earn rewards by completing activities
- **Quiz Challenges**: Test knowledge with Stardust Quiz, Collection Quiz, and Word Quiz
- **Avatar Customization**: Personalize your Nugget mascot with accessories
- **Collections**: Save favorite nuggets, activities, and words

### 🎨 Child-Friendly Design
- **Subject Planets**: Visual navigation with themed planets
- **Neurodivergent-Friendly**: Clear structure, visual cues, consistent patterns
- **Dark/Light Mode**: Comfortable viewing in any environment
- **Mascot Guide**: Friendly Space Nugget or Sky Nugget guide

### 🔐 Authentication & Data
- **Supabase Integration**: User accounts and data persistence
- **BYOK Architecture**: Bring-your-own-key for Google Gemini API
- **Local + Cloud Storage**: Seamless offline/online experience

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- A Google Gemini API key ([Get one here](https://makersuite.google.com/app/apikey))
- (Optional) Supabase account for authentication

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/nugget-school.git
   cd nugget-school
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   # Supabase (if using authentication)
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
   
   > **Note**: Users provide their own Google Gemini API key through the app's Settings page (BYOK architecture).

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 📁 Project Structure

```
nugget-school/
├── App.tsx                    # Main application (3,033 lines - 60% optimized!)
├── components/                # React components
│   ├── HomeView.tsx          # Home page with subject planets
│   ├── NuggetDetailView.tsx  # Nugget detail page
│   ├── CurriculumView.tsx    # Curriculum browser
│   ├── SettingsView.tsx      # Settings & API key management
│   └── ...                   # Other view and UI components
├── services/
│   ├── geminiService.ts      # Google Gemini AI integration
│   └── imageService.ts       # Image fetching (Wikipedia, etc.)
├── utils/
│   ├── speechHelpers.ts      # Text-to-speech & speech recognition
│   └── nuggetHelpers.ts      # Nugget utility functions
├── hooks/
│   ├── useNavigation.ts      # Navigation state management
│   └── useDataSync.ts        # Supabase sync logic
├── data/
│   ├── subjects.tsx          # Subject definitions
│   ├── curriculum-topics.tsx # Curriculum structure
│   ├── subtopic-images.tsx   # Image mappings
│   └── ...                   # Other data files
├── supabase/
│   └── functions/server/     # Supabase Edge Functions
└── styles/
    └── globals.css           # Tailwind CSS styles
```

## 🎨 Design System

### Colors
- **Primary Gradient**: `bg-gradient-to-r from-red-500 via-orange-500 to-yellow-400`
- **Crumbs Icon**: 🍗 (drumstick emoji)
- **Subjects**: Each subject has its own color scheme (Science: blue, History: amber, etc.)

### Typography
- Rounded, friendly fonts for child-appropriate design
- Large, readable text sizes
- Clear hierarchy

## 🔧 Configuration

### API Keys

Users configure their own Google Gemini API key in-app:
1. Click Settings (⚙️)
2. Enter Google Gemini API Key
3. Key is stored locally and securely

### Content Safety

The app implements comprehensive safety guidelines:
- Age-appropriate content filtering
- Inappropriate topic blocking
- Safe image search terms
- Positive, educational focus

See `/guidelines/Guidelines.md` for full details.

## 📖 Documentation

- **[Extraction Summary](EXTRACTION_SUMMARY.md)** - Optimization history
- **[Optimization Guide](OPTIMIZATION_GUIDE.md)** - Architecture decisions
- **[Final Status](FINAL_STATUS.md)** - Complete status report
- **[Content Guidelines](guidelines/Guidelines.md)** - Safety & content rules

## 🏗️ Tech Stack

- **React** 18+ - UI framework
- **Tailwind CSS** 4.0 - Styling
- **Google Gemini API** - AI content generation
- **Supabase** - Authentication & database
- **Motion** (Framer Motion) - Animations
- **Lucide React** - Icons
- **Recharts** - Data visualization
- **Web Speech API** - Text-to-speech & recognition

## 🤝 Contributing

This is a personal educational project, but suggestions and feedback are welcome!

## 📄 License

This project is for educational purposes.

## 🙏 Acknowledgments

- Built with ❤️ for neurodivergent learners
- Powered by Google Gemini AI
- Images from Wikipedia and educational sources
- Icons from Lucide

## 📞 Support

For issues or questions about the app, please check the documentation files or open an issue on GitHub.

---

**Made with 🍗 for curious young minds!**
