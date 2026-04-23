// Activity opener helper functions - extracted from App.tsx to reduce file size
// These functions create nuggets and navigate to the nugget view for various activity types

import {
  SCIENTIFIC_METHOD_STEP_CONTENT, EXPERIMENT_DATA, EXPERIMENT_FACTS,
  ART_ACTIVITY_DATA, ART_ACTIVITY_FACTS,
  MATH_ACTIVITY_DATA, MATH_ACTIVITY_FACTS,
  MUSIC_ACTIVITY_DATA, MUSIC_ACTIVITY_FACTS,
  LANGUAGE_ACTIVITY_DATA, LANGUAGE_ACTIVITY_FACTS
} from './activity-data';

interface StateSetters {
  setActivityResponse: (data: any) => void;
  setAiResponse: (data: any) => void;
  setCurrentNugget: (nugget: any) => void;
  setAiContentImage: (img: any) => void;
  setActivityImage: (img: any) => void;
  setLearnResponse: (resp: any) => void;
  navigateTo: (view: string) => void;
  generateImage: (title: string, searchTerm: string, tag: string) => void;
}

export function createActivityOpeners(s: StateSetters) {
  const openScientificExperiment = (experiment: any) => {
    const data = EXPERIMENT_DATA[experiment.name];
    if (!data) return;

    s.setActivityResponse(data);
    s.setAiResponse({ type: 'activity', content: data });

    const experimentFact = EXPERIMENT_FACTS[experiment.name] || `${experiment.name}: ${experiment.description}`;
    const experimentNugget = {
      text: experimentFact,
      tags: ["Scientific Method", "Experiments", experiment.name],
      subjectId: 'science',
      id: Date.now(),
      searchTerm: data.imageSearchTerm,
      originalTag: experiment.name
    };

    s.setCurrentNugget(experimentNugget);
    s.setAiContentImage(null);
    s.setActivityImage(null);
    s.setLearnResponse(null);
    s.navigateTo('nugget');
    s.generateImage(data.title, data.imageSearchTerm, experiment.name);
  };

  const openArtActivity = (activity: any) => {
    const data = ART_ACTIVITY_DATA[activity.name];
    if (!data) { console.error("Activity not found:", activity.name); return; }

    s.setActivityResponse(data);
    s.setAiResponse({ type: 'activity', content: data });

    const activityFact = ART_ACTIVITY_FACTS[activity.name] || `${activity.name}: ${activity.description}`;
    const firstSentence = activityFact.split(/[.!?]/)[0] + '.';
    const activityNugget = {
      text: firstSentence,
      tags: ["Elements of Art", activity.element, activity.name],
      subjectId: 'art',
      id: Date.now(),
      searchTerm: data.imageSearchTerm,
      originalTag: activity.name
    };

    s.setCurrentNugget(activityNugget);
    s.setAiContentImage(null);
    s.setActivityImage(null);
    s.setLearnResponse(null);
    s.navigateTo('nugget');
    s.generateImage(data.title, data.imageSearchTerm, activity.name);
  };

  const openMathActivity = (activity: any) => {
    const data = MATH_ACTIVITY_DATA[activity.name];
    if (!data) { console.error("Activity not found:", activity.name); return; }

    s.setActivityResponse(data);
    s.setAiResponse({ type: 'activity', content: data });

    const activityFact = MATH_ACTIVITY_FACTS[activity.name] || `${activity.name}: ${activity.description}`;
    const firstSentence = activityFact.split(/[.!?]/)[0] + '.';
    const activityNugget = {
      text: firstSentence,
      tags: ["Elements of Math", activity.concept, activity.name],
      subjectId: 'math',
      id: Date.now(),
      searchTerm: data.imageSearchTerm,
      originalTag: activity.name
    };

    s.setCurrentNugget(activityNugget);
    s.setAiContentImage(null);
    s.setActivityImage(null);
    s.setLearnResponse(null);
    s.navigateTo('nugget');
    s.generateImage(data.title, data.imageSearchTerm, activity.name);
  };

  const openMusicActivity = (activity: any) => {
    const data = MUSIC_ACTIVITY_DATA[activity.name];
    if (!data) { console.error("Activity not found:", activity.name); return; }

    s.setActivityResponse(data);
    s.setAiResponse({ type: 'activity', content: data });

    const activityFact = MUSIC_ACTIVITY_FACTS[activity.name] || `${activity.name}: ${activity.description}`;
    const firstSentence = activityFact.split(/[.!?]/)[0] + '.';
    const activityNugget = {
      text: firstSentence,
      tags: ["Elements of Music", activity.concept, activity.name],
      subjectId: 'music',
      id: Date.now(),
      searchTerm: data.imageSearchTerm,
      originalTag: activity.name
    };

    s.setCurrentNugget(activityNugget);
    s.setAiContentImage(null);
    s.setActivityImage(null);
    s.setLearnResponse(null);
    s.navigateTo('nugget');
    s.generateImage(data.title, data.imageSearchTerm, activity.name);
  };

  const openLanguageActivity = (activity: any) => {
    const data = LANGUAGE_ACTIVITY_DATA[activity.name];
    if (!data) { console.error("Activity not found:", activity.name); return; }

    s.setActivityResponse(data);
    s.setAiResponse({ type: 'activity', content: data });

    const activityFact = LANGUAGE_ACTIVITY_FACTS[activity.name] || `${activity.name}: ${activity.description}`;
    const firstSentence = activityFact.split(/[.!?]/)[0] + '.';
    const activityNugget = {
      text: firstSentence,
      tags: ["Elements of Language", activity.concept, activity.name],
      subjectId: 'words',
      id: Date.now(),
      searchTerm: data.imageSearchTerm,
      originalTag: activity.name
    };

    s.setCurrentNugget(activityNugget);
    s.setAiContentImage(null);
    s.setActivityImage(null);
    s.setLearnResponse(null);
    s.navigateTo('nugget');
    s.generateImage(data.title, data.imageSearchTerm, activity.name);
  };

  return {
    openScientificExperiment,
    openArtActivity,
    openMathActivity,
    openMusicActivity,
    openLanguageActivity
  };
}
