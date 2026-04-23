import React from 'react';
import { X, Sparkles, Loader, Mic, Volume2, Check } from 'lucide-react';

interface StardustQuizModalProps {
  stardustQuestion: any;
  stardustQuizLoading: boolean;
  stardustQuizSubmitted: boolean;
  freeformAnswer: string;
  setFreeformAnswer: (value: string) => void;
  selectedStardustAnswer: number | null;
  setSelectedStardustAnswer: (value: number | null) => void;
  wrongAnswers: Set<number>;
  setWrongAnswers: (value: Set<number>) => void;
  isListening: boolean;
  startListening: () => void;
  isValidTextInput: (text: string) => boolean;
  currentNugget: any;
  collection: any[];
  saveCollection: (collection: any[]) => void;
  updateCrumbs: (amount: number) => void;
  showNotification: (message: string) => void;
  setShowStardustQuiz: (value: boolean) => void;
  setStardustQuestion: (value: any) => void;
  setStardustQuizSubmitted: (value: boolean) => void;
}

export function StardustQuizModal({
  stardustQuestion,
  stardustQuizLoading,
  stardustQuizSubmitted,
  freeformAnswer,
  setFreeformAnswer,
  selectedStardustAnswer,
  setSelectedStardustAnswer,
  wrongAnswers,
  setWrongAnswers,
  isListening,
  startListening,
  isValidTextInput,
  currentNugget,
  collection,
  saveCollection,
  updateCrumbs,
  showNotification,
  setShowStardustQuiz,
  setStardustQuestion,
  setStardustQuizSubmitted,
}: StardustQuizModalProps) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto animate-pop border border-slate-200 dark:border-slate-700">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-400 p-6 rounded-t-3xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-2xl">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-white" style={{ fontFamily: 'var(--font-bubblegum)' }}>What Do You Think?</h2>
              <p className="text-sm text-white/90 font-semibold">Answer to Earn More Crumbs!</p>
            </div>
          </div>
          <button onClick={() => setShowStardustQuiz(false)} className="text-white/80 hover:text-white transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Text Input Section */}
          <div>
            <label className="text-base font-bold text-slate-800 dark:text-white mb-3 block">
              What did you find most interesting?
            </label>
            <div className="relative">
              <textarea
                value={freeformAnswer}
                onChange={(e) => setFreeformAnswer(e.target.value)}
                placeholder="Type or speak your thoughts here..."
                className="w-full p-4 pr-12 border-2 border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 min-h-[60px] resize-none"
              />
              <button
                onClick={startListening}
                disabled={isListening}
                className={`absolute right-2 top-2 p-2 rounded-full transition-colors ${
                  isListening 
                    ? 'bg-red-500 animate-pulse' 
                    : 'bg-orange-100 dark:bg-orange-900 hover:bg-orange-200 dark:hover:bg-orange-800'
                }`}
                title="Speech to text"
              >
                <Mic className={`w-5 h-5 ${isListening ? 'text-white' : 'text-orange-600 dark:text-orange-300'}`} />
              </button>
            </div>
          </div>

          {/* Multiple Choice Section */}
          <div>
            <label className="text-base font-bold text-slate-800 dark:text-white mb-3 block">
              Or answer this question:
            </label>
            {stardustQuizLoading ? (
              <div className="flex flex-col items-center justify-center py-6 bg-white dark:bg-slate-800 rounded-xl">
                <Loader className="w-6 h-6 text-orange-600 animate-spin mb-2" />
                <p className="text-sm text-slate-600 dark:text-slate-400">Generating question...</p>
              </div>
            ) : stardustQuestion ? (
              <>
                <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-4 mb-3 border border-slate-200 dark:border-slate-700">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-base font-bold text-slate-800 dark:text-white">
                      {stardustQuestion.question}
                    </p>
                    <button
                      onClick={() => {
                        const utterance = new SpeechSynthesisUtterance(stardustQuestion.question);
                        utterance.rate = 0.9;
                        utterance.pitch = 1.1;
                        
                        const voices = speechSynthesis.getVoices();
                        const preferredVoices = [
                          'Samantha', 'Google US English Female',
                          'Microsoft Zira Desktop', 'Google UK English Female',
                          'Karen', 'Microsoft Zira', 'Fiona', 'Female',
                        ];
                        
                        let selectedVoice = null;
                        for (const preferred of preferredVoices) {
                          selectedVoice = voices.find(voice => 
                            voice.name.includes(preferred) && 
                            (voice.lang.startsWith('en-') || voice.lang === 'en')
                          );
                          if (selectedVoice) break;
                        }
                        
                        if (!selectedVoice) {
                          selectedVoice = voices.find(voice => 
                            (voice.name.toLowerCase().includes('female') || 
                             voice.name.toLowerCase().includes('woman')) &&
                            (voice.lang.startsWith('en-') || voice.lang === 'en')
                          );
                        }
                        
                        if (!selectedVoice) {
                          selectedVoice = voices.find(voice => 
                            voice.lang.startsWith('en-') || voice.lang === 'en'
                          );
                        }
                        
                        if (selectedVoice) {
                          utterance.voice = selectedVoice;
                          utterance.lang = selectedVoice.lang;
                        } else {
                          utterance.lang = 'en-US';
                        }
                        
                        speechSynthesis.speak(utterance);
                      }}
                      className="flex-shrink-0 p-2 bg-orange-100 dark:bg-orange-900 rounded-full hover:bg-orange-200 dark:hover:bg-orange-800 transition-colors"
                    >
                      <Volume2 className="w-4 h-4 text-orange-600 dark:text-orange-300" />
                    </button>
                  </div>
                </div>
                <div className="space-y-2">
                  {stardustQuestion.options.map((option, index) => {
                    const isWrong = wrongAnswers.has(index);
                    const isSelected = selectedStardustAnswer === index;
                    const isCorrect = stardustQuizSubmitted && index === stardustQuestion.correctIndex;
                    
                    return (
                      <button
                        key={index}
                        onClick={() => {
                          if (isWrong) return;
                          setSelectedStardustAnswer(index);
                        }}
                        disabled={isWrong}
                        className={`w-full p-4 rounded-xl font-semibold text-left transition-all ${
                          isWrong 
                            ? 'bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-500 cursor-not-allowed border-2 border-slate-300 dark:border-slate-600 line-through opacity-60'
                            : isSelected && isCorrect
                            ? 'bg-green-500 text-white shadow-lg border-2 border-green-600'
                            : isSelected
                            ? 'bg-gradient-to-r from-red-500 via-orange-500 to-yellow-400 text-white shadow-lg border-2 border-orange-600'
                            : 'bg-white dark:bg-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 shadow border-2 border-slate-200 dark:border-slate-600 hover:border-orange-300 dark:hover:border-orange-600 hover:shadow-lg hover:-translate-y-0.5'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span>{option}</span>
                          {isSelected && isCorrect && <Check className="w-5 h-5 flex-shrink-0" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
                {stardustQuizSubmitted && selectedStardustAnswer === stardustQuestion.correctIndex && (
                  <div className="bg-green-100 dark:bg-green-900/30 border-2 border-green-500 dark:border-green-700 rounded-xl p-4 text-center animate-pop">
                    <p className="text-green-800 dark:text-green-200 font-bold flex items-center justify-center gap-2">
                      <Check className="w-5 h-5" /> Correct! Here are your Crumbs!
                    </p>
                  </div>
                )}
                {wrongAnswers.size > 0 && (
                  <div className="text-center">
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Try again - you've got this! 💪
                    </p>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700">
                <p className="text-sm text-slate-600 dark:text-slate-400">Question couldn't be generated</p>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            onClick={() => {
              const hasValidTextAnswer = isValidTextInput(freeformAnswer);
              const hasCorrectMCQ = selectedStardustAnswer === stardustQuestion?.correctIndex;
              
              if (hasValidTextAnswer || hasCorrectMCQ) {
                setStardustQuizSubmitted(true);
                updateCrumbs(10);
                showNotification("Great job! +10 Crumbs 🍗");
                
                if (hasValidTextAnswer && currentNugget) {
                  const updatedCollection = collection.map(nugget => {
                    if (nugget.text === currentNugget.text) {
                      return { ...nugget, userThoughts: freeformAnswer };
                    }
                    return nugget;
                  });
                  saveCollection(updatedCollection);
                }
                
                setTimeout(() => {
                  setShowStardustQuiz(false);
                  setFreeformAnswer('');
                  setSelectedStardustAnswer(null);
                  setWrongAnswers(new Set());
                  setStardustQuestion(null);
                  setStardustQuizSubmitted(false);
                }, 1500);
              } else if (selectedStardustAnswer !== null && selectedStardustAnswer !== stardustQuestion?.correctIndex) {
                setStardustQuizSubmitted(true);
                setWrongAnswers(new Set([...wrongAnswers, selectedStardustAnswer]));
                setSelectedStardustAnswer(null);
                showNotification("Not quite! Try again - you've got this! 💪");
                setTimeout(() => setStardustQuizSubmitted(false), 500);
              } else if (freeformAnswer.trim().length > 0 && !hasValidTextAnswer) {
                showNotification("Please provide a thoughtful answer!");
              } else {
                showNotification("Please answer the question or write something thoughtful!");
              }
            }}
            className="w-full bg-gradient-to-r from-red-500 via-orange-500 to-yellow-400 hover:from-red-600 hover:via-orange-600 hover:to-yellow-500 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
          >
            <Sparkles className="w-5 h-5" />
            Submit for +10 Crumbs! 🍗
          </button>

          {/* Skip Button */}
          <button
            onClick={() => {
              setShowStardustQuiz(false);
              setFreeformAnswer('');
              setSelectedStardustAnswer(null);
              setWrongAnswers(new Set());
              setStardustQuestion(null);
              setStardustQuizSubmitted(false);
            }}
            className="w-full bg-slate-300 hover:bg-slate-400 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-bold py-3 px-6 rounded-xl transition-all"
          >
            Skip
          </button>
        </div>
      </div>
    </div>
  );
}
