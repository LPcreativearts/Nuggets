import React from 'react';

interface UserAvatarProps {
  avatarNuggetType: 'basic' | 'spicy' | null;
  selectedAccessories: {
    eyes: string[];
    mouth: string | null;
    arms: string | null;
    legs: string | null;
    accessories: string[];
  };
  accessoryOptions: any;
  baseNuggetImg: string;
  spicyNuggetImg: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  className?: string;
}

export function UserAvatar({
  avatarNuggetType,
  selectedAccessories,
  accessoryOptions,
  baseNuggetImg,
  spicyNuggetImg,
  size = 'md',
  className = ''
}: UserAvatarProps) {
  // Don't render if no nugget type is selected
  if (!avatarNuggetType) {
    return null;
  }

  const currentNuggetImage = avatarNuggetType === 'spicy' ? spicyNuggetImg : baseNuggetImg;
  const nuggetDisplayName = avatarNuggetType === 'spicy' ? 'Spicy Nugget' : 'Basic Nugget';

  // Size classes
  const sizeClasses = {
    xs: 'w-12 h-12',
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32'
  };

  return (
    <div className={`relative ${sizeClasses[size]} ${className}`}>
      {/* Accessories that render behind the nugget */}
      {selectedAccessories.accessories.map(accessoryId => {
        const accessoryOption = accessoryOptions.accessories.find((a: any) => a.id === accessoryId);
        return accessoryOption && accessoryOption.renderBehind ? (
          <img 
            key={accessoryId}
            src={accessoryOption.image}
            alt={accessoryOption.name}
            className="absolute inset-0 w-full h-full object-contain pointer-events-none"
          />
        ) : null;
      })}
      
      {/* Layered Arms Accessory - render behind nugget (unless renderInFront is true) */}
      {selectedAccessories.arms && (() => {
        const armsOption = accessoryOptions.arms.find((a: any) => a.id === selectedAccessories.arms);
        return armsOption && !armsOption.renderInFront ? (
          <img 
            src={armsOption.image}
            alt={armsOption.name}
            className="absolute inset-0 w-full h-full object-contain pointer-events-none"
          />
        ) : null;
      })()}
      
      {/* Layered Legs Accessory - render behind nugget */}
      {selectedAccessories.legs && (() => {
        const legsOption = accessoryOptions.legs.find((l: any) => l.id === selectedAccessories.legs);
        return legsOption ? (
          <img 
            src={legsOption.image}
            alt={legsOption.name}
            className="absolute inset-0 w-full h-full object-contain pointer-events-none"
          />
        ) : null;
      })()}
      
      {/* Base Nugget */}
      <img 
        src={currentNuggetImage} 
        alt={nuggetDisplayName}
        className="w-full h-full object-contain drop-shadow-lg"
      />
      
      {/* Layered Eye Accessories - Show all selected */}
      {selectedAccessories.eyes.map(eyeId => {
        const eyeOption = accessoryOptions.eyes.find((e: any) => e.id === eyeId);
        return eyeOption ? (
          <img 
            key={eyeId}
            src={eyeOption.image}
            alt={eyeOption.name}
            className="absolute inset-0 w-full h-full object-contain pointer-events-none"
          />
        ) : null;
      })}
      
      {/* Layered Mouth Accessory */}
      {selectedAccessories.mouth && (() => {
        const mouthOption = accessoryOptions.mouth.find((m: any) => m.id === selectedAccessories.mouth);
        return mouthOption ? (
          <img 
            src={mouthOption.image}
            alt={mouthOption.name}
            className="absolute inset-0 w-full h-full object-contain pointer-events-none"
          />
        ) : null;
      })()}
      
      {/* Layered Arms Accessory - render in front if specified */}
      {selectedAccessories.arms && (() => {
        const armsOption = accessoryOptions.arms.find((a: any) => a.id === selectedAccessories.arms);
        return armsOption && armsOption.renderInFront ? (
          <img 
            src={armsOption.image}
            alt={armsOption.name}
            className="absolute inset-0 w-full h-full object-contain pointer-events-none"
          />
        ) : null;
      })()}
      
      {/* Layered Accessories (only those that render in front) */}
      {selectedAccessories.accessories.map(accessoryId => {
        const accessoryOption = accessoryOptions.accessories.find((a: any) => a.id === accessoryId);
        return accessoryOption && !accessoryOption.renderBehind ? (
          <img 
            key={accessoryId}
            src={accessoryOption.image}
            alt={accessoryOption.name}
            className="absolute inset-0 w-full h-full object-contain pointer-events-none"
          />
        ) : null;
      })}
    </div>
  );
}
