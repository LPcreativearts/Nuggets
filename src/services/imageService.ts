/**
 * Image Service
 * Handles educational image fetching with multiple fallback strategies
 */

import { SUBTOPIC_IMAGES } from '../data/subtopic-images';

export const fetchWikipediaImage = async (term: string): Promise<string | null> => {
  try {
    const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&list=search&srsearch=${encodeURIComponent(term)}&srlimit=1`;
    const searchRes = await fetch(searchUrl);
    const searchData = await searchRes.json();
    const pageId = searchData.query?.search?.[0]?.pageid;
    
    if (!pageId) return null;
    
    const imageUrl = `https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&prop=pageimages&pithumbsize=800&pageids=${pageId}`;
    const imageRes = await fetch(imageUrl);
    const imageData = await imageRes.json();
    const thumbnail = imageData.query?.pages?.[pageId]?.thumbnail?.source;
    
    return thumbnail || null;
  } catch (error) {
    console.log('Wikipedia image fetch failed for:', term);
    return null;
  }
};

const testImageUrl = async (url: string): Promise<boolean> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = url;
    
    // Timeout after 5 seconds
    setTimeout(() => resolve(false), 5000);
  });
};

export const fetchEducationalImage = async (
  searchTerm: string,
  subjectId: string = 'science'
): Promise<string | null> => {
  console.log('🔍 Fetching educational image for:', searchTerm);
  
  try {
    // Try Wikipedia first (free, educational, safe)
    console.log('📚 Trying Wikipedia...');
    const wikiUrl = await fetchWikipediaImage(searchTerm);
    
    if (wikiUrl) {
      console.log('✅ Found Wikipedia image');
      const isValid = await testImageUrl(wikiUrl);
      
      if (isValid) {
        return wikiUrl;
      }
    }
    
    console.log('❌ No valid Wikipedia image found');
    return null;
    
  } catch (error) {
    console.error('Image fetch error:', error);
    return null;
  }
};

export const getImageForNugget = async (
  nuggetText: string,
  searchTerm: string | null,
  originalTag: string | null,
  subjectId: string = 'science',
  callbacks: {
    onLoading: (loading: boolean) => void;
    onImageFound: (url: string) => void;
    onError: () => void;
  }
) => {
  callbacks.onLoading(true);
  
  try {
    // Priority 1: Check if there's a pre-defined image for this exact subtopic
    if (originalTag && SUBTOPIC_IMAGES[originalTag]) {
      console.log('🎯 Using predefined image for:', originalTag);
      callbacks.onImageFound(SUBTOPIC_IMAGES[originalTag]);
      callbacks.onLoading(false);
      return;
    }
    
    // Priority 2: Use the search term from AI or fallback to original tag
    const term = searchTerm || originalTag || nuggetText.split(' ').slice(0, 3).join(' ');
    console.log('🔍 Searching for image with term:', term);
    
    // Try fetching educational image
    const imageUrl = await fetchEducationalImage(term, subjectId);
    
    if (imageUrl) {
      callbacks.onImageFound(imageUrl);
    } else {
      callbacks.onError();
    }
  } catch (error) {
    console.error('Image generation error:', error);
    callbacks.onError();
  } finally {
    callbacks.onLoading(false);
  }
};

// Helper to load multiple images for "Show Me" feature
export const extractKeyTerms = (text: string): string => {
  if (!text) return '';
  
  // Remove common stopwords and just get key nouns
  const stopwords = ['the', 'is', 'are', 'was', 'were', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by'];
  const words = text.toLowerCase().split(/\s+/);
  const keywords = words.filter(w => !stopwords.includes(w) && w.length > 3).slice(0, 2);
  
  return keywords.join(' ');
};

export const loadShowMeImages = async (
  nuggetText: string,
  subjectId: string,
  maxImages: number = 3
): Promise<string[]> => {
  const images: string[] = [];
  
  // Generate search terms (main concept + related terms)
  const mainTerm = extractKeyTerms(nuggetText);
  const searchTerms = [mainTerm];
  
  // Try to fetch images for each term
  for (const term of searchTerms.slice(0, maxImages)) {
    if (term) {
      const imageUrl = await fetchEducationalImage(term, subjectId);
      if (imageUrl) {
        images.push(imageUrl);
      }
    }
    
    // Stop if we have enough images
    if (images.length >= maxImages) break;
  }
  
  return images;
};
