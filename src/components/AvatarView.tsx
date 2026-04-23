import React from 'react';
import { ArrowLeft, Sparkles, ShoppingBag, Shuffle, Drumstick, Lock, Check, Save } from 'lucide-react';
import baseNuggetImg from 'figma:asset/e23fe5acb66ca864e8e5ca8d62fa1245562b1fd4.png';
import spicyNuggetImg from 'figma:asset/a3e4544d3442bb9c3e68eb1a33e7a1f69695dda9.png';

interface AvatarViewProps {
  avatarNuggetType: string | null;
  setAvatarNuggetType: (value: string | null) => void;
  selectedAccessories: any;
  setSelectedAccessories: (value: any) => void;
  accessoryOptions: any;
  goBack: () => void;
  goHome: () => void;
  navigateTo: (view: string) => void;
  crumbs: number;
  inventory: string[];
  avatarCustomizationTab: string;
  setAvatarCustomizationTab: (value: string) => void;
  saveData: (data: any) => void;
  saveAvatarConfig: () => void;
  avatarSaveLoading: boolean;
  avatarSaveSuccess: boolean;
}

const customizationCategories = [
  { id: 'eyes', label: 'Eyes', icon: '👀' },
  { id: 'mouth', label: 'Mouth', icon: '👄' },
  { id: 'arms', label: 'Arms', icon: '💪' },
  { id: 'legs', label: 'Legs', icon: '🦵' },
  { id: 'accessories', label: 'Accessories', icon: '✨' }
];

export function AvatarView({
  avatarNuggetType,
  setAvatarNuggetType,
  selectedAccessories,
  setSelectedAccessories,
  accessoryOptions,
  goBack,
  goHome,
  navigateTo,
  crumbs,
  inventory,
  avatarCustomizationTab,
  setAvatarCustomizationTab,
  saveData,
  saveAvatarConfig,
  avatarSaveLoading,
  avatarSaveSuccess,
}: AvatarViewProps) {

  const handleNuggetTypeSelection = (type) => {
    setAvatarNuggetType(type);
    localStorage.setItem('nuggets_avatarNuggetType', type);
    
    const defaultAccessories = {
      eyes: ['confident-eyebrows'],
      mouth: 'mouth-toothy-grin',
      arms: 'exploringarms',
      legs: 'legup',
      accessories: []
    };
    setSelectedAccessories(defaultAccessories);
    localStorage.setItem('nuggets_selectedAccessories', JSON.stringify(defaultAccessories));
    
    saveData({ avatarNuggetType: type, selectedAccessories: defaultAccessories });
  };

  // Show nugget type selection if not chosen yet
  if (!avatarNuggetType) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-800 pattern-bg overflow-x-hidden transition-colors duration-500 flex items-center justify-center p-4">
        <div className="max-w-4xl w-full">
          {/* Header */}
          <div className="text-center mb-12 animate-pop">
            <h1 className="text-4xl md:text-6xl font-black text-slate-800 dark:text-white mb-4" style={{ fontFamily: 'var(--font-bubblegum)' }}>
              Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">Nugget!</span>
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Pick your favorite style to start customizing
            </p>
          </div>

          {/* Selection Cards */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Basic Nugget */}
            <button
              onClick={() => handleNuggetTypeSelection('basic')}
              className="group relative bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-xl border-4 border-slate-200 dark:border-slate-700 hover:border-yellow-400 dark:hover:border-yellow-500 transition-all hover:scale-105 hover:shadow-2xl"
            >
              <div className="absolute top-4 right-4 bg-yellow-100 dark:bg-yellow-900/30 px-4 py-2 rounded-full">
                <span className="text-sm font-black text-yellow-700 dark:text-yellow-400">Classic</span>
              </div>
              
              <div className="bg-gradient-to-br from-yellow-100 to-orange-100 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-2xl p-8 mb-6 border-2 border-yellow-200 dark:border-yellow-800">
                <img 
                  src={baseNuggetImg} 
                  alt="Basic Nugget"
                  className="w-full h-64 object-contain drop-shadow-2xl group-hover:scale-110 transition-transform"
                />
              </div>

              <h3 className="text-3xl font-black text-slate-800 dark:text-white mb-3" style={{ fontFamily: 'var(--font-bubblegum)' }}>Basic Nugget</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                The original golden nugget! Perfect for classic learners who love the traditional look.
              </p>
              
              <div className="flex items-center justify-center gap-2 text-yellow-600 dark:text-yellow-400 font-bold">
                <span className="text-2xl">✨</span>
                <span>Choose Classic</span>
                <span className="text-2xl">✨</span>
              </div>
            </button>

            {/* Spicy Nugget */}
            <button
              onClick={() => handleNuggetTypeSelection('spicy')}
              className="group relative bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-xl border-4 border-slate-200 dark:border-slate-700 hover:border-red-400 dark:hover:border-red-500 transition-all hover:scale-105 hover:shadow-2xl"
            >
              <div className="absolute top-4 right-4 bg-red-100 dark:bg-red-900/30 px-4 py-2 rounded-full">
                <span className="text-sm font-black text-red-700 dark:text-red-400">Hot!</span>
              </div>
              
              <div className="bg-gradient-to-br from-red-100 to-orange-100 dark:from-red-900/20 dark:to-orange-900/20 rounded-2xl p-8 mb-6 border-2 border-red-200 dark:border-red-800">
                <img 
                  src={spicyNuggetImg} 
                  alt="Spicy Nugget"
                  className="w-full h-64 object-contain drop-shadow-2xl group-hover:scale-110 transition-transform"
                />
              </div>

              <h3 className="text-3xl font-black text-slate-800 dark:text-white mb-3" style={{ fontFamily: 'var(--font-bubblegum)' }}>Spicy Nugget</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                Extra crispy and full of flavor! For adventurous learners who like things spicy! 🌶️
              </p>
              
              <div className="flex items-center justify-center gap-2 text-red-600 dark:text-red-400 font-bold">
                <span className="text-2xl">🔥</span>
                <span>Choose Spicy</span>
                <span className="text-2xl">🔥</span>
              </div>
            </button>
          </div>

          {/* Back Button */}
          <div className="text-center mt-8">
            <button
              onClick={goBack}
              className="px-6 py-3 bg-white dark:bg-slate-800 rounded-full shadow-lg hover:shadow-xl transition-all text-slate-700 dark:text-slate-200 font-bold flex items-center gap-2 mx-auto"
            >
              <ArrowLeft className="w-5 h-5" />
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Show customization interface after selection
  const currentNuggetImage = avatarNuggetType === 'spicy' ? spicyNuggetImg : baseNuggetImg;
  const nuggetDisplayName = avatarNuggetType === 'spicy' ? 'Spicy Nugget' : 'Basic Nugget';

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-800 pattern-bg overflow-x-hidden transition-colors duration-500">
      {/* Header */}
      <div className="sticky top-0 z-50 glass-panel border-b border-slate-200 dark:border-slate-800 px-4 py-3 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-3">
          <button onClick={goBack} className="p-2 bg-white dark:bg-slate-800 rounded-full shadow-sm hover:scale-110 transition-transform">
            <ArrowLeft className="w-6 h-6 text-slate-600 dark:text-slate-400" />
          </button>
          <h1 className="text-xl md:text-2xl font-black text-slate-800 dark:text-white" style={{ fontFamily: 'var(--font-bubblegum)' }}>Avatar Studio</h1>
        </div>
        <div className="flex gap-2">
          <div className="flex items-center gap-1 bg-white dark:bg-slate-800 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-700 shadow-sm">
            <span className="font-bold text-slate-700 dark:text-white">{crumbs}</span>
            <Drumstick className="w-4 h-4 text-orange-400 fill-orange-400" />
          </div>
          <button onClick={goHome} className="px-4 py-2 bg-white dark:bg-slate-800 rounded-full shadow-sm hover:shadow-md transition-all text-slate-700 dark:text-slate-200 font-bold text-sm">
            Home
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4 md:p-8">
        {/* Main Content Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Side - Avatar Preview */}
          <div className="space-y-4">
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-lg border border-slate-200 dark:border-slate-700">
              <h2 className="text-2xl font-black text-slate-800 dark:text-white mb-6 text-center" style={{ fontFamily: 'var(--font-bubblegum)' }}>Your Nugget</h2>
              
              {/* Avatar Display */}
              <div className={`relative rounded-2xl p-8 aspect-square flex items-center justify-center border-4 ${
                avatarNuggetType === 'spicy' 
                  ? 'bg-gradient-to-br from-red-100 to-orange-100 dark:from-red-900/20 dark:to-orange-900/20 border-red-200 dark:border-red-800'
                  : 'bg-gradient-to-br from-yellow-100 to-orange-100 dark:from-yellow-900/20 dark:to-orange-900/20 border-yellow-200 dark:border-yellow-800'
              }`}>
                <div className="relative w-full h-full">
                  {/* Accessories that render behind the nugget */}
                  {selectedAccessories.accessories.map(accessoryId => {
                    const accessoryOption = accessoryOptions.accessories.find(a => a.id === accessoryId);
                    return accessoryOption && accessoryOption.renderBehind ? (
                      <img key={accessoryId} src={accessoryOption.image} alt={accessoryOption.name} className="absolute inset-0 w-full h-full object-contain pointer-events-none" />
                    ) : null;
                  })}
                  {/* Arms behind nugget */}
                  {selectedAccessories.arms && (() => {
                    const armsOption = accessoryOptions.arms.find(a => a.id === selectedAccessories.arms);
                    return armsOption && !armsOption.renderInFront ? (
                      <img src={armsOption.image} alt={armsOption.name} className="absolute inset-0 w-full h-full object-contain pointer-events-none" />
                    ) : null;
                  })()}
                  {/* Legs */}
                  {selectedAccessories.legs && (() => {
                    const legsOption = accessoryOptions.legs.find(l => l.id === selectedAccessories.legs);
                    return legsOption ? (
                      <img src={legsOption.image} alt={legsOption.name} className="absolute inset-0 w-full h-full object-contain pointer-events-none" />
                    ) : null;
                  })()}
                  {/* Base Nugget */}
                  <img src={currentNuggetImage} alt={nuggetDisplayName} className="w-full h-full object-contain drop-shadow-2xl" />
                  {/* Eyes */}
                  {selectedAccessories.eyes.map(eyeId => {
                    const eyeOption = accessoryOptions.eyes.find(e => e.id === eyeId);
                    return eyeOption ? (
                      <img key={eyeId} src={eyeOption.image} alt={eyeOption.name} className="absolute inset-0 w-full h-full object-contain pointer-events-none" />
                    ) : null;
                  })}
                  {/* Mouth */}
                  {selectedAccessories.mouth && (() => {
                    const mouthOption = accessoryOptions.mouth.find(m => m.id === selectedAccessories.mouth);
                    return mouthOption ? (
                      <img src={mouthOption.image} alt={mouthOption.name} className="absolute inset-0 w-full h-full object-contain pointer-events-none" />
                    ) : null;
                  })()}
                  {/* Arms in front */}
                  {selectedAccessories.arms && (() => {
                    const armsOption = accessoryOptions.arms.find(a => a.id === selectedAccessories.arms);
                    return armsOption && armsOption.renderInFront ? (
                      <img src={armsOption.image} alt={armsOption.name} className="absolute inset-0 w-full h-full object-contain pointer-events-none" />
                    ) : null;
                  })()}
                  {/* Accessories in front */}
                  {selectedAccessories.accessories.map(accessoryId => {
                    const accessoryOption = accessoryOptions.accessories.find(a => a.id === accessoryId);
                    return accessoryOption && !accessoryOption.renderBehind ? (
                      <img key={accessoryId} src={accessoryOption.image} alt={accessoryOption.name} className="absolute inset-0 w-full h-full object-contain pointer-events-none" />
                    ) : null;
                  })}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 space-y-3">
                <button
                  onClick={saveAvatarConfig}
                  disabled={avatarSaveLoading}
                  className={`w-full px-4 py-3 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 border ${
                    avatarSaveSuccess
                      ? 'bg-green-500 dark:bg-green-600 text-white border-green-600 dark:border-green-700'
                      : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-transparent shadow-lg hover:shadow-xl'
                  }`}
                >
                  {avatarSaveLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Saving...
                    </>
                  ) : avatarSaveSuccess ? (
                    <>
                      <Check className="w-4 h-4" />
                      Saved!
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      Save Avatar
                    </>
                  )}
                </button>
                
                <button
                  onClick={() => navigateTo('shop')}
                  className="w-full bg-gradient-to-r from-orange-400 to-amber-500 hover:from-orange-500 hover:to-amber-600 text-white px-4 py-3 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Visit Shop
                </button>
                
                <button
                  onClick={() => {
                    setAvatarNuggetType(null);
                    localStorage.removeItem('nuggets_avatarNuggetType');
                  }}
                  className="w-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 px-4 py-3 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 border border-slate-200 dark:border-slate-700"
                >
                  <Shuffle className="w-4 h-4" />
                  Change Nugget Style
                </button>
              </div>
            </div>
          </div>

          {/* Right Side - Customization Options */}
          <div className="space-y-4">
            <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-6">
                <h2 className="text-2xl font-black text-white" style={{ fontFamily: 'var(--font-bubblegum)' }}>Customize</h2>
                <p className="text-sm text-white/80 mt-1">Choose features for your nugget</p>
              </div>

              {/* Category Tabs */}
              <div className="grid grid-cols-5 gap-1 p-2 bg-slate-50 dark:bg-slate-800/50">
                {customizationCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setAvatarCustomizationTab(category.id)}
                    className={`p-3 rounded-xl font-bold text-xs flex flex-col items-center gap-1 transition-all ${
                      avatarCustomizationTab === category.id
                        ? 'bg-white dark:bg-slate-700 shadow-md scale-105 text-slate-800 dark:text-white'
                        : 'bg-transparent text-slate-500 dark:text-slate-400 hover:bg-white/50 dark:hover:bg-slate-700/50'
                    }`}
                  >
                    <span className="text-xl">{category.icon}</span>
                    <span className="hidden sm:inline">{category.label}</span>
                  </button>
                ))}
              </div>

              {/* Options Display */}
              <div className="p-6 min-h-[400px]">
                <h3 className="text-lg font-black text-slate-800 dark:text-white mb-4 flex items-center gap-2" style={{ fontFamily: 'var(--font-bubblegum)' }}>
                  <span className="text-2xl">
                    {customizationCategories.find(c => c.id === avatarCustomizationTab)?.icon}
                  </span>
                  {customizationCategories.find(c => c.id === avatarCustomizationTab)?.label}
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {accessoryOptions[avatarCustomizationTab]?.length > 0 ? (
                    accessoryOptions[avatarCustomizationTab]
                      .sort((a, b) => {
                        const aUnlocked = !a.requiresUnlock || inventory.includes(a.id);
                        const bUnlocked = !b.requiresUnlock || inventory.includes(b.id);
                        if (aUnlocked && !bUnlocked) return -1;
                        if (!aUnlocked && bUnlocked) return 1;
                        return 0;
                      })
                      .map((option) => {
                      const currentSelection = selectedAccessories[avatarCustomizationTab];
                      const isSelected = Array.isArray(currentSelection) 
                        ? currentSelection.includes(option.id)
                        : currentSelection === option.id;
                      const isLocked = option.requiresUnlock && !inventory.includes(option.id);
                      
                      return (
                        <button
                          key={option.id}
                          disabled={isLocked}
                          onClick={() => {
                            if (isLocked) return;
                            
                            setSelectedAccessories(prev => {
                              const currentValue = prev[avatarCustomizationTab];
                              
                              if (Array.isArray(currentValue)) {
                                const isEyebrow = option.id === 'eyebrows' || option.id === 'eye-angry' || option.id === 'checkit-eyebrows';
                                
                                if (isEyebrow) {
                                  const withoutEyebrows = currentValue.filter(id => id !== 'eyebrows' && id !== 'eye-angry' && id !== 'checkit-eyebrows');
                                  const newArray = isSelected ? withoutEyebrows : [...withoutEyebrows, option.id];
                                  return { ...prev, [avatarCustomizationTab]: newArray };
                                } else {
                                  const newArray = isSelected
                                    ? currentValue.filter(id => id !== option.id)
                                    : [...currentValue, option.id];
                                  return { ...prev, [avatarCustomizationTab]: newArray };
                                }
                              }
                              
                              return { ...prev, [avatarCustomizationTab]: isSelected ? null : option.id };
                            });
                          }}
                          className={`aspect-square bg-white dark:bg-slate-800 rounded-2xl border-2 transition-all group p-4 flex flex-col items-center justify-center gap-2 relative ${
                            isLocked 
                              ? 'border-slate-200 dark:border-slate-700 opacity-60 cursor-not-allowed'
                              : `cursor-pointer hover:scale-105 hover:shadow-lg ${
                                  isSelected 
                                    ? 'border-blue-500 dark:border-blue-400 shadow-lg scale-105 ring-2 ring-blue-300 dark:ring-blue-600' 
                                    : 'border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500'
                                }`
                          }`}
                        >
                          {isLocked && (
                            <div className="absolute inset-0 flex items-center justify-center bg-slate-900/50 rounded-2xl backdrop-blur-sm">
                              <Lock className="w-8 h-8 text-white" />
                            </div>
                          )}
                          <img 
                            src={option.image} 
                            alt={option.name}
                            className={`w-full h-auto object-contain transition-transform ${!isLocked && 'group-hover:scale-110'}`}
                          />
                          <p className={`text-xs font-bold text-center ${
                            isLocked 
                              ? 'text-slate-400 dark:text-slate-500'
                              : isSelected ? 'text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-300'
                          }`}>{option.name}</p>
                          {isLocked && (
                            <p className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold">
                              Earn Crumbs to Unlock!
                            </p>
                          )}
                        </button>
                      );
                    })
                  ) : (
                    [1, 2, 3, 4, 5, 6].map((i) => (
                      <div
                        key={i}
                        className="aspect-square bg-slate-100 dark:bg-slate-800 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-600 flex flex-col items-center justify-center gap-2 hover:border-blue-400 dark:hover:border-blue-500 transition-all cursor-pointer group"
                      >
                        <div className="text-3xl group-hover:scale-110 transition-transform">
                          {customizationCategories.find(c => c.id === avatarCustomizationTab)?.icon}
                        </div>
                        <p className="text-xs font-bold text-slate-400 dark:text-slate-500">Coming Soon</p>
                      </div>
                    ))
                  )}
                </div>

                {accessoryOptions[avatarCustomizationTab]?.length === 0 && (
                  <div className="mt-8 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-2xl p-6 text-center">
                    <Sparkles className="w-8 h-8 text-purple-500 mx-auto mb-3" />
                    <h4 className="font-black text-slate-800 dark:text-white mb-2">More Options Coming Soon!</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      We're working on adding lots of fun {customizationCategories.find(c => c.id === avatarCustomizationTab)?.label.toLowerCase()} options for your nugget.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
