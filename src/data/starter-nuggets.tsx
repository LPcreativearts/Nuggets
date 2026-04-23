// Starter nuggets for each subject - shown before AI generates new ones
export const STARTER_NUGGETS: Record<string, Array<{ text: string; tags: string[]; searchTerm: string }>> = {
  science: [
    { text: "Octopuses have three hearts and blue blood.", tags: ["Octopuses"], searchTerm: "Octopus" },
    { text: "A teaspoon of a neutron star would weigh 6 billion tons.", tags: ["Neutron Star"], searchTerm: "Neutron star" },
    { text: "Bananas are slightly radioactive!", tags: ["Bananas"], searchTerm: "Banana" }
  ],
  history: [
    { text: "The Great Pyramids were built when woolly mammoths were still alive.", tags: ["Pyramids"], searchTerm: "Great Pyramid of Giza" },
    { text: "Vikings used a special crystal called a 'sunstone' to find the sun on cloudy days.", tags: ["Vikings"], searchTerm: "Viking ship" }
  ],
  math: [
    { text: "The number zero was invented in India.", tags: ["Zero"], searchTerm: "Aryabhata" },
    { text: "A 'jiffy' is an actual unit of time: 1/100th of a second.", tags: ["Time"], searchTerm: "Stopwatch" }
  ],
  art: [
    { text: "The color 'Mummy Brown' was originally made from actual Egyptian mummies.", tags: ["Paint"], searchTerm: "Mummy" },
    { text: "Vincent Van Gogh only sold one painting while he was alive.", tags: ["Van Gogh"], searchTerm: "The Starry Night" }
  ],
  music: [
    { text: "Termites eat wood twice as fast when listening to heavy metal music.", tags: ["Termites"], searchTerm: "Termite" },
    { text: "Other people's heartbeats can synchronize to the same musical rhythm when listening together.", tags: ["Heartbeat"], searchTerm: "Human heart" }
  ],
  career: [
    { text: "There is a job called a 'Snake Milker' who collects venom for medicine.", tags: ["Snakes"], searchTerm: "Snake venom" },
    { text: "Lego Sculptors are professionals who get paid to build Lego sets.", tags: ["Lego"], searchTerm: "Lego" }
  ],
  words: [
    { text: "The word 'bookkeeper' is the only unhyphenated word with three double letters in a row.", tags: ["Bookkeeper"], searchTerm: "Bookkeeping" },
    { text: "Ghost words are words that ended up in the dictionary by mistake.", tags: ["Dictionaries"], searchTerm: "Dictionary" }
  ]
};
