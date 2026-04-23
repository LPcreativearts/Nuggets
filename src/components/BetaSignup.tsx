import React, { useState } from 'react';
import { ArrowLeft, Rocket, CheckCircle, Loader } from 'lucide-react';

interface BetaSignupProps {
  goBack: () => void;
  darkMode: boolean;
}

export const BetaSignup: React.FC<BetaSignupProps> = ({ goBack, darkMode }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    roles: [] as string[],
    age: '',
    experience: '',
    interests: [] as string[],
    interestsOther: '',
    neuroatypical: [] as string[],
    neuroatypicalOther: '',
    wantMost: '',
    additionalInfo: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const roleOptions = [
    'Parent/Guardian',
    'Student',
    'Home Educator / Unschool Guide',
    'Professional Educator'
  ];

  const interestOptions = [
    'Space & Astronomy',
    'Science & Nature',
    'Math & Logic',
    'History & Culture',
    'Arts & Creativity',
    'Music & Sound',
    'Language & Words'
  ];

  const neuroatypicalOptions = [
    'No',
    'ADHD',
    'Autism Spectrum',
    'Dyslexia',
    'Dysgraphia',
    'Dyscalculia',
    'Sensory Processing',
    'PDA / ODD'
  ];

  const handleRoleToggle = (role: string) => {
    setFormData(prev => ({
      ...prev,
      roles: prev.roles.includes(role)
        ? prev.roles.filter(r => r !== role)
        : [...prev.roles, role]
    }));
  };

  const handleInterestToggle = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleNeuroatypicalToggle = (option: string) => {
    setFormData(prev => ({
      ...prev,
      neuroatypical: prev.neuroatypical.includes(option)
        ? prev.neuroatypical.filter(o => o !== option)
        : [...prev.neuroatypical, option]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Validation
    if (!formData.name || !formData.email) {
      setError('Please fill in your name and email');
      return;
    }
    
    if (!formData.email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    // Validate required multi-select fields
    if (formData.roles.length === 0) {
      setError('Please select at least one role');
      return;
    }

    if (!formData.age) {
      setError('Please select a user age');
      return;
    }

    if (!formData.experience) {
      setError('Please select your educational app experience');
      return;
    }

    if (formData.interests.length === 0 && !formData.interestsOther) {
      setError('Please select at least one interest or enter other interests');
      return;
    }

    if (formData.neuroatypical.length === 0 && !formData.neuroatypicalOther) {
      setError('Please select an option for neurodivergent or enter other');
      return;
    }

    if (!formData.wantMost) {
      setError('Please tell us what you want most from an educational program');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const { projectId, publicAnonKey } = await import('../utils/supabase/info');
      
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-c9fbfdc0/beta-signup`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`
          },
          body: JSON.stringify(formData)
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Something went wrong. Please try again.');
        return;
      }
      
      console.log('Beta signup submitted:', data);
      setSubmitted(true);
    } catch (err) {
      setError('Something went wrong. Please try again.');
      console.error('Beta signup error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-800 p-4 md:p-8 flex items-center justify-center">
        <div className="max-w-lg w-full">
          <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl p-8 text-center border border-slate-200 dark:border-slate-700">
            <div className="w-20 h-20 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-400 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-black text-slate-800 dark:text-white mb-4" style={{ fontFamily: 'var(--font-bubblegum)' }}>
              You're In! 🎉
            </h2>
            <p className="text-slate-600 dark:text-slate-300 mb-6">
              Thanks for signing up to be a beta tester! We'll email you at <strong>{formData.email}</strong> with next steps.
            </p>
            <button
              onClick={goBack}
              className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-400 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:shadow-xl transition-all"
            >
              Back to Settings
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-800 p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button 
            onClick={goBack} 
            className="p-2 bg-white dark:bg-slate-900 rounded-full shadow-sm hover:shadow-md transition-all"
          >
            <ArrowLeft className="w-6 h-6 text-slate-600 dark:text-slate-400" />
          </button>
          <h1 className="text-3xl font-black text-slate-800 dark:text-white" style={{ fontFamily: 'var(--font-bubblegum)' }}>
            Beta Tester Signup
          </h1>
        </div>

        {/* Hero Section */}
        <div className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-400 rounded-3xl p-8 mb-6 text-white shadow-xl">
          <div className="flex items-center gap-4 mb-4">
            <Rocket className="w-12 h-12" />
            <div>
              <h2 className="text-2xl font-black" style={{ fontFamily: 'var(--font-bubblegum)' }}>
                Join the Adventure!
              </h2>
              <p className="text-white/90 text-sm">
                Help shape the future of Nugget School
              </p>
            </div>
          </div>
          <p className="text-white/95">
            Be the first to try a new approach to education, built with all minds in mind! You'll get free access during the beta in exchange for feedback. Help us improve the app to make learning fun again.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-lg border border-slate-200 dark:border-slate-700">
          <div className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-200 mb-2">
                Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Your name"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-200 mb-2">
                Email *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="your.email@example.com"
                required
              />
            </div>

            {/* I am a... */}
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-200 mb-3">
                I am a... (select all that apply) *
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {roleOptions.map(role => (
                  <button
                    key={role}
                    type="button"
                    onClick={() => handleRoleToggle(role)}
                    className={`p-3 rounded-xl border-2 font-bold text-sm transition-all ${
                      formData.roles.includes(role)
                        ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300'
                        : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:border-orange-300'
                    }`}
                  >
                    {role}
                  </button>
                ))}
              </div>
            </div>

            {/* User Age */}
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-200 mb-2">
                User Age *
              </label>
              <select
                value={formData.age}
                onChange={(e) => setFormData(prev => ({ ...prev, age: e.target.value }))}
                className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              >
                <option value="">Select user age...</option>
                <option value="3-4">3-4 years</option>
                <option value="5-7">5-7 years</option>
                <option value="8-10">8-10 years</option>
                <option value="11-13">11-13 years</option>
                <option value="14-18">14-18 years</option>
                <option value="multiple">Multiple Ages</option>
                <option value="adult">Adult</option>
              </select>
            </div>

            {/* Experience */}
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-200 mb-2">
                Educational App Experience *
              </label>
              <select
                value={formData.experience}
                onChange={(e) => setFormData(prev => ({ ...prev, experience: e.target.value }))}
                className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              >
                <option value="">Select experience level...</option>
                <option value="first-time">First time using one</option>
                <option value="some">Used a few before</option>
                <option value="lots">Use them regularly</option>
                <option value="expert">Power user!</option>
              </select>
            </div>

            {/* Special Interests */}
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-200 mb-3">
                Special Interests? (select all that apply) *
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {interestOptions.map(interest => (
                  <button
                    key={interest}
                    type="button"
                    onClick={() => handleInterestToggle(interest)}
                    className={`p-3 rounded-xl border-2 font-bold text-sm transition-all ${
                      formData.interests.includes(interest)
                        ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300'
                        : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:border-orange-300'
                    }`}
                  >
                    {interest}
                  </button>
                ))}
                <input
                  type="text"
                  value={formData.interestsOther}
                  onChange={(e) => setFormData(prev => ({ ...prev, interestsOther: e.target.value }))}
                  className="p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Other interests..."
                />
              </div>
            </div>

            {/* Neurodivergent */}
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-200 mb-3">
                Neurodivergent? (select all that apply) *
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {neuroatypicalOptions.map(option => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => handleNeuroatypicalToggle(option)}
                    className={`p-3 rounded-xl border-2 font-bold text-sm transition-all ${
                      formData.neuroatypical.includes(option)
                        ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300'
                        : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:border-orange-300'
                    }`}
                  >
                    {option}
                  </button>
                ))}
                <input
                  type="text"
                  value={formData.neuroatypicalOther}
                  onChange={(e) => setFormData(prev => ({ ...prev, neuroatypicalOther: e.target.value }))}
                  className="p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Other..."
                />
              </div>
            </div>

            {/* What do you want most */}
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-200 mb-2">
                What do you want most from an educational program? *
              </label>
              <textarea
                value={formData.wantMost}
                onChange={(e) => setFormData(prev => ({ ...prev, wantMost: e.target.value }))}
                className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 min-h-[100px] resize-y"
                placeholder="Tell us what you're looking for in an educational app..."
                required
              />
            </div>

            {/* Additional Info */}
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-200 mb-2">
                Anything else we should know? (Optional)
              </label>
              <textarea
                value={formData.additionalInfo}
                onChange={(e) => setFormData(prev => ({ ...prev, additionalInfo: e.target.value }))}
                className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 min-h-[100px] resize-y"
                placeholder="Tell us about your interests, feedback ideas, or special needs we should consider..."
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 text-red-700 dark:text-red-300 text-sm">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-red-500 via-orange-500 to-yellow-400 text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-lg"
            >
              {isSubmitting ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Rocket className="w-5 h-5" />
                  Try It Out!
                </>
              )}
            </button>

            <p className="text-xs text-slate-500 dark:text-slate-400 text-center">
              We respect your privacy and will never share your information.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};