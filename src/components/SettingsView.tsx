import React from 'react';
import {
  ArrowLeft, Star, Rocket, Sparkles, Moon, Sun, Loader, LogIn, LogOut, User
} from 'lucide-react';
import { UserAvatar } from './UserAvatar';

interface SettingsViewProps {
  goBack: () => void;
  goHome: () => void;
  navigateTo: (view: string) => void;
  avatarNuggetType: string | null;
  selectedAccessories: any;
  accessoryOptions: any;
  baseNuggetImg: string;
  spicyNuggetImg: string;
  user: any;
  isSaving: boolean;
  handleLogin: () => void;
  handleLogout: () => void;
  apiKey: string;
  setApiKey: (key: string) => void;
  showNotification: (msg: string) => void;
  darkMode: boolean;
  setDarkMode: (mode: boolean) => void;
  saveData: (data: any) => void;
  isPreGenerating: boolean;
  preGenerateNuggets: () => void;
}

export function SettingsView({
  goBack,
  goHome,
  navigateTo,
  avatarNuggetType,
  selectedAccessories,
  accessoryOptions,
  baseNuggetImg,
  spicyNuggetImg,
  user,
  isSaving,
  handleLogin,
  handleLogout,
  apiKey,
  setApiKey,
  showNotification,
  darkMode,
  setDarkMode,
  saveData,
  isPreGenerating,
  preGenerateNuggets,
}: SettingsViewProps) {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-800 p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <button onClick={goBack} className="p-2 bg-white dark:bg-slate-800 rounded-full shadow-sm"><ArrowLeft className="w-6 h-6 text-slate-600 dark:text-slate-400" /></button>
            <h1 className="text-3xl font-black text-slate-800 dark:text-white" style={{ fontFamily: 'var(--font-bubblegum)' }}>Settings</h1>
          </div>
          <div className="flex items-center gap-2">
            {avatarNuggetType && (
              <button 
                onClick={() => navigateTo('avatar')}
                className="hover:scale-110 transition-transform"
                title="Customize your avatar"
              >
                <UserAvatar
                  avatarNuggetType={avatarNuggetType}
                  selectedAccessories={selectedAccessories}
                  accessoryOptions={accessoryOptions}
                  baseNuggetImg={baseNuggetImg}
                  spicyNuggetImg={spicyNuggetImg}
                  size="sm"
                />
              </button>
            )}
            <button onClick={() => navigateTo('my-collections')} className="px-4 py-2 bg-white dark:bg-slate-800 rounded-full shadow-sm hover:shadow-md transition-all flex items-center gap-2 text-slate-700 dark:text-slate-200 font-bold text-sm">
              <Star className="w-4 h-4 text-yellow-400" /> Collections
            </button>
            <button onClick={goHome} className="px-4 py-2 bg-white dark:bg-slate-800 rounded-full shadow-sm hover:shadow-md transition-all flex items-center gap-2 text-slate-700 dark:text-slate-200 font-bold text-sm">
              Home
            </button>
          </div>
        </div>
        <div className="space-y-4">
          {/* Account Section */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold text-lg mb-4 text-slate-800 dark:text-white" style={{ fontFamily: 'var(--font-bubblegum)' }}>Account</h3>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${!user ? 'bg-slate-200 dark:bg-slate-700' : 'bg-blue-100 dark:bg-blue-900'}`}>
                  <User className={`w-5 h-5 ${!user ? 'text-slate-400' : 'text-blue-600 dark:text-blue-400'}`} />
                </div>
                <div className="flex-grow">
                  <p className="text-sm font-bold text-slate-700 dark:text-slate-200">
                    {user ? (user.email || "Signed In") : "Guest User"}
                  </p>
                  <p className="text-xs text-slate-400">
                    {!user ? "Progress not saved" : "Synced to cloud ☁️"}
                  </p>
                </div>
                {isSaving && (
                  <Loader className="w-4 h-4 text-blue-500 animate-spin" />
                )}
              </div>
              
              {!user ? (
                <button 
                  onClick={handleLogin}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors shadow-md"
                >
                  <LogIn className="w-4 h-4" /> Sign in to Save Progress
                </button>
              ) : (
                <button 
                  onClick={handleLogout}
                  className="w-full bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 px-4 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors"
                >
                  <LogOut className="w-4 h-4" /> Sign Out
                </button>
              )}
            </div>
          </div>

          {/* Beta Tester Signup Link */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/10 dark:to-pink-900/10 p-6 rounded-2xl shadow-sm border-2 border-purple-200 dark:border-purple-700">
            <div className="flex items-start gap-3 mb-3">
              <Rocket className="w-6 h-6 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-slate-800 dark:text-white">🚀 Beta Tester Program</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">Help shape the future of Nugget School! Get early access.</p>
              </div>
            </div>
            <button 
              onClick={() => navigateTo('beta-signup')}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-4 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-md"
            >
              <Rocket className="w-4 h-4" /> Join Beta Program
            </button>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold text-slate-800 dark:text-white mb-2">Gemini API Key</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">Required for AI-generated facts and activities. Get yours at <a href="https://ai.google.dev/" target="_blank" className="text-blue-500 hover:underline">ai.google.dev</a></p>
            <div className="flex gap-2">
              <input 
                type="password" 
                value={apiKey} 
                onChange={e => setApiKey(e.target.value)} 
                className="flex-1 p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" 
                placeholder="Paste your key here..." 
              />
              <button 
                onClick={() => {
                  localStorage.setItem('gemini_api_key', apiKey);
                  showNotification("API Key Saved!");
                }}
                className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-xl transition-colors"
              >
                Save
              </button>
            </div>
          </div>
          
          {/* Pre-generate Nuggets Section */}
          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/10 dark:to-orange-900/10 p-6 rounded-2xl shadow-sm border-2 border-yellow-200 dark:border-yellow-700">
            <div className="flex items-start gap-3 mb-3">
              <Rocket className="w-6 h-6 text-orange-600 dark:text-orange-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-slate-800 dark:text-white">⚡ Speed Boost</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">Pre-generate facts for all topics so they load instantly! Takes ~5-10 minutes in the background.</p>
              </div>
            </div>
            <button 
              onClick={() => {
                if (!apiKey) {
                  showNotification("Add API Key first!");
                  return;
                }
                preGenerateNuggets();
                showNotification("⚡ Pre-generation started! Check console for progress.");
              }}
              disabled={!apiKey || isPreGenerating}
              className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 disabled:from-slate-300 disabled:to-slate-300 text-white px-4 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-md disabled:cursor-not-allowed"
            >
              {isPreGenerating ? (
                <>
                  <Loader className="w-4 h-4 animate-spin" /> Generating...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" /> Pre-generate All Topics
                </>
              )}
            </button>
          </div>
          
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-800 dark:text-white">Dark Mode</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Toggle dark theme</p>
            </div>
            <button onClick={() => { 
              const newMode = !darkMode;
              setDarkMode(newMode); 
              saveData({ darkMode: newMode });
            }} className={`w-14 h-8 rounded-full p-1 transition-colors ${darkMode ? 'bg-blue-600' : 'bg-slate-200'}`}>
              <div className={`w-6 h-6 bg-white rounded-full shadow-sm transition-transform ${darkMode ? 'translate-x-6' : ''} flex items-center justify-center`}>
                {darkMode ? <Moon className="w-3 h-3 text-blue-600" /> : <Sun className="w-3 h-3 text-orange-500" />}
              </div>
            </button>
          </div>
          
          <div className="bg-red-50 dark:bg-red-900/10 p-6 rounded-2xl border border-red-100 dark:border-red-900/30">
            <h3 className="font-bold text-red-800 dark:text-red-400 mb-2">Danger Zone</h3>
            <p className="text-sm text-red-600 dark:text-red-400 mb-3">This will delete all your collected nuggets and words.</p>
            <button 
              onClick={() => { 
                if(confirm("Are you sure? This cannot be undone!")) { 
                  localStorage.clear(); 
                  window.location.reload(); 
                } 
              }} 
              className="text-red-600 dark:text-red-400 text-sm font-bold hover:underline"
            >
              Clear All Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
