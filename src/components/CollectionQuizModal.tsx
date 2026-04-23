import React from 'react';
import { X, Sparkles, Check } from 'lucide-react';

interface CollectionQuizModalProps {
  collectionQuizQuestions: any[];
  currentCollectionQuestionIndex: number;
  setCurrentCollectionQuestionIndex: (value: number) => void;
  selectedCollectionAnswer: number | null;
  setSelectedCollectionAnswer: (value: number | null) => void;
  collectionQuizWrongAnswers: Set<string>;
  setCollectionQuizWrongAnswers: (value: Set<string>) => void;
  collectionQuizCorrect: boolean;
  setCollectionQuizCorrect: (value: boolean) => void;
  updateCrumbs: (amount: number) => void;
  showNotification: (message: string) => void;
  setShowCollectionQuiz: (value: boolean) => void;
  setCollectionQuizQuestions: (value: any[]) => void;
}

export function CollectionQuizModal({
  collectionQuizQuestions,
  currentCollectionQuestionIndex,
  setCurrentCollectionQuestionIndex,
  selectedCollectionAnswer,
  setSelectedCollectionAnswer,
  collectionQuizWrongAnswers,
  setCollectionQuizWrongAnswers,
  collectionQuizCorrect,
  setCollectionQuizCorrect,
  updateCrumbs,
  showNotification,
  setShowCollectionQuiz,
  setCollectionQuizQuestions,
}: CollectionQuizModalProps) {
  const closeQuiz = () => {
    setShowCollectionQuiz(false);
    setCollectionQuizQuestions([]);
    setCurrentCollectionQuestionIndex(0);
    setSelectedCollectionAnswer(null);
    setCollectionQuizWrongAnswers(new Set());
    setCollectionQuizCorrect(false);
  };

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
              <h2 className="text-2xl font-black text-white" style={{ fontFamily: 'var(--font-bubblegum)' }}>Collection Challenge</h2>
              <p className="text-sm text-white/90 font-semibold">
                Question {currentCollectionQuestionIndex + 1} of {collectionQuizQuestions.length}
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
            {collectionQuizQuestions.map((_, i) => (
              <div 
                key={i} 
                className={`h-2 flex-1 rounded-full ${
                  i < currentCollectionQuestionIndex 
                    ? 'bg-green-500' 
                    : i === currentCollectionQuestionIndex 
                    ? 'bg-yellow-500' 
                    : 'bg-slate-200 dark:bg-slate-700'
                }`}
              />
            ))}
          </div>

          {/* Question */}
          <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
            <p className="text-lg font-bold text-slate-800 dark:text-white">
              {collectionQuizQuestions[currentCollectionQuestionIndex].question}
            </p>
          </div>

          {/* Answer Options */}
          <div className="space-y-3">
            {collectionQuizQuestions[currentCollectionQuestionIndex].options.map((option, index) => {
              const isSelected = selectedCollectionAnswer === index;
              const isWrong = collectionQuizWrongAnswers.has(`${currentCollectionQuestionIndex}-${index}`);
              
              return (
                <button
                  key={index}
                  onClick={() => {
                    if (isWrong) return;
                    setSelectedCollectionAnswer(index);
                  }}
                  disabled={isWrong}
                  className={`w-full p-4 rounded-xl font-semibold text-left transition-all ${
                    isWrong
                      ? 'bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-500 cursor-not-allowed border-2 border-slate-300 dark:border-slate-600 line-through opacity-60'
                      : isSelected
                      ? 'bg-yellow-100 dark:bg-yellow-900/30 text-slate-800 dark:text-white border-2 border-yellow-400 shadow-md'
                      : 'bg-white dark:bg-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600 text-slate-800 dark:text-white border-2 border-slate-200 dark:border-slate-600 hover:border-yellow-300 hover:shadow-md active:scale-[0.98]'
                  }`}
                >
                  {option}
                </button>
              );
            })}
          </div>

          {/* Submit Button */}
          <button
            onClick={() => {
              if (selectedCollectionAnswer === null) {
                showNotification("Please select an answer!");
                return;
              }
              
              const isCorrect = selectedCollectionAnswer === collectionQuizQuestions[currentCollectionQuestionIndex].correctIndex;
              
              if (isCorrect) {
                setCollectionQuizCorrect(true);
                showNotification("Correct! 🎉");
                
                if (currentCollectionQuestionIndex < collectionQuizQuestions.length - 1) {
                  setTimeout(() => {
                    setCurrentCollectionQuestionIndex(currentCollectionQuestionIndex + 1);
                    setSelectedCollectionAnswer(null);
                    setCollectionQuizWrongAnswers(new Set());
                    setCollectionQuizCorrect(false);
                  }, 1200);
                } else {
                  updateCrumbs(20);
                  showNotification("Awesome! +20 Crumbs 🍗");
                  setTimeout(() => {
                    closeQuiz();
                  }, 1500);
                }
              } else {
                setCollectionQuizWrongAnswers(new Set([...collectionQuizWrongAnswers, `${currentCollectionQuestionIndex}-${selectedCollectionAnswer}`]));
                setSelectedCollectionAnswer(null);
                showNotification("Not quite! Try again - you've got this! 💪");
              }
            }}
            disabled={selectedCollectionAnswer === null || collectionQuizCorrect}
            className={`w-full py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2 ${
              collectionQuizCorrect
                ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg cursor-default'
                : selectedCollectionAnswer === null
                ? 'bg-slate-300 dark:bg-slate-700 text-slate-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 text-yellow-900 shadow-lg hover:shadow-xl active:scale-[0.98]'
            }`}
          >
            {collectionQuizCorrect && <Check className="w-6 h-6" />}
            {collectionQuizCorrect ? 'Correct!' : 'Submit Answer'}
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
