import React from 'react';
import { X, Brain, BookOpen, Pencil, Check } from 'lucide-react';

interface WordQuizModalProps {
  wordQuizQuestions: any[];
  currentWordQuestionIndex: number;
  setCurrentWordQuestionIndex: (value: number) => void;
  selectedWordAnswer: number | null;
  setSelectedWordAnswer: (value: number | null) => void;
  wordQuizWrongAnswers: Set<string>;
  setWordQuizWrongAnswers: (value: Set<string>) => void;
  wordQuizSubmitted: boolean;
  setWordQuizSubmitted: (value: boolean) => void;
  updateCrumbs: (amount: number) => void;
  showNotification: (message: string) => void;
  setShowWordQuiz: (value: boolean) => void;
  setWordQuizQuestions: (value: any[]) => void;
}

export function WordQuizModal({
  wordQuizQuestions,
  currentWordQuestionIndex,
  setCurrentWordQuestionIndex,
  selectedWordAnswer,
  setSelectedWordAnswer,
  wordQuizWrongAnswers,
  setWordQuizWrongAnswers,
  wordQuizSubmitted,
  setWordQuizSubmitted,
  updateCrumbs,
  showNotification,
  setShowWordQuiz,
  setWordQuizQuestions,
}: WordQuizModalProps) {
  const closeQuiz = () => {
    setShowWordQuiz(false);
    setWordQuizQuestions([]);
    setCurrentWordQuestionIndex(0);
    setSelectedWordAnswer(null);
    setWordQuizWrongAnswers(new Set());
    setWordQuizSubmitted(false);
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto animate-pop border border-slate-200 dark:border-slate-700">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-400 to-teal-500 p-6 rounded-t-3xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-2xl">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-white" style={{ fontFamily: 'var(--font-bubblegum)' }}>Word Challenge</h2>
              <p className="text-sm text-white/90 font-semibold">
                Question {currentWordQuestionIndex + 1} of {wordQuizQuestions.length}
              </p>
            </div>
          </div>
          <button 
            onClick={closeQuiz} 
            className="text-white/80 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Progress Bar */}
          <div className="flex gap-2">
            {wordQuizQuestions.map((_, i) => (
              <div 
                key={i} 
                className={`h-2 flex-1 rounded-full ${
                  i < currentWordQuestionIndex 
                    ? 'bg-green-500' 
                    : i === currentWordQuestionIndex 
                    ? 'bg-emerald-500' 
                    : 'bg-slate-200 dark:bg-slate-700'
                }`}
              />
            ))}
          </div>

          {/* Question Type Badge */}
          <div className="flex justify-center">
            <span className="inline-flex items-center gap-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 px-4 py-2 rounded-full text-sm font-bold">
              {wordQuizQuestions[currentWordQuestionIndex].type === 'definition' ? (
                <>
                  <BookOpen className="w-4 h-4" />
                  Definition Question
                </>
              ) : (
                <>
                  <Pencil className="w-4 h-4" />
                  Spelling Question
                </>
              )}
            </span>
          </div>

          {/* Question */}
          <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
            <p className="text-lg font-bold text-slate-800 dark:text-white">
              {wordQuizQuestions[currentWordQuestionIndex].question}
            </p>
          </div>

          {/* Answer Options */}
          <div className="space-y-3">
            {wordQuizQuestions[currentWordQuestionIndex].options.map((option, index) => {
              const isWrong = wordQuizWrongAnswers.has(`${currentWordQuestionIndex}-${index}`);
              const isSelected = selectedWordAnswer === index;
              const isCorrect = wordQuizSubmitted && isSelected && index === wordQuizQuestions[currentWordQuestionIndex].correctIndex;
              
              return (
                <button
                  key={index}
                  onClick={() => {
                    if (isWrong) return;
                    setSelectedWordAnswer(index);
                  }}
                  disabled={isWrong}
                  className={`w-full p-4 rounded-xl font-semibold text-left transition-all ${
                    isWrong
                      ? 'bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-500 cursor-not-allowed border-2 border-slate-300 dark:border-slate-600 line-through opacity-60'
                      : isCorrect
                      ? 'bg-green-500 text-white shadow-lg border-2 border-green-600'
                      : isSelected
                      ? 'bg-gradient-to-r from-emerald-400 to-teal-500 text-white shadow-lg border-2 border-emerald-600'
                      : 'bg-white dark:bg-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 shadow border-2 border-slate-200 dark:border-slate-600 hover:border-emerald-300 dark:hover:border-emerald-600 hover:shadow-lg hover:-translate-y-0.5'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{option}</span>
                    {isCorrect && <Check className="w-5 h-5 flex-shrink-0" />}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Feedback Messages */}
          {wordQuizSubmitted && selectedWordAnswer === wordQuizQuestions[currentWordQuestionIndex].correctIndex && (
            <div className="bg-green-100 dark:bg-green-900/30 border-2 border-green-500 dark:border-green-700 rounded-xl p-4 text-center animate-pop">
              <p className="text-green-800 dark:text-green-200 font-bold flex items-center justify-center gap-2">
                <Check className="w-5 h-5" /> Correct! Great job!
              </p>
            </div>
          )}
          {wordQuizWrongAnswers.size > 0 && (
            <div className="text-center">
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Try again - you've got this! 💪
              </p>
            </div>
          )}

          {/* Submit Button */}
          <button
            onClick={() => {
              if (selectedWordAnswer === null) {
                showNotification("Please select an answer!");
                return;
              }
              
              const isCorrect = selectedWordAnswer === wordQuizQuestions[currentWordQuestionIndex].correctIndex;
              
              if (isCorrect) {
                setWordQuizSubmitted(true);
                
                if (currentWordQuestionIndex < wordQuizQuestions.length - 1) {
                  setTimeout(() => {
                    setCurrentWordQuestionIndex(currentWordQuestionIndex + 1);
                    setSelectedWordAnswer(null);
                    setWordQuizWrongAnswers(new Set());
                    setWordQuizSubmitted(false);
                  }, 1500);
                } else {
                  updateCrumbs(20);
                  showNotification("Amazing! +20 Crumbs 🍗");
                  setTimeout(() => {
                    closeQuiz();
                  }, 2000);
                }
              } else {
                setWordQuizSubmitted(true);
                setWordQuizWrongAnswers(new Set([...wordQuizWrongAnswers, `${currentWordQuestionIndex}-${selectedWordAnswer}`]));
                setSelectedWordAnswer(null);
                showNotification("Not quite! Try again - you've got this! 💪");
                setTimeout(() => setWordQuizSubmitted(false), 500);
              }
            }}
            className="w-full py-4 rounded-xl font-bold text-lg transition-all bg-gradient-to-r from-emerald-400 to-green-400 hover:from-emerald-500 hover:to-green-500 text-emerald-900 shadow-lg hover:shadow-xl active:scale-[0.98]"
          >
            Submit Answer
          </button>

          {/* Exit Button */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
            <button
              onClick={closeQuiz}
              className="w-full px-4 py-3 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 font-semibold text-sm transition-colors rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700/50"
            >
              Exit Challenge
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
