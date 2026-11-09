import { useEffect, useState } from 'react';
import { CheckCircle2, Loader2, Sparkles } from 'lucide-react';

export function AIProcessingState({ onComplete }: { onComplete: () => void }) {
  const steps = [
    'Education identified',
    'Skills mapped',
    'Interests identified',
    'Experience analyzed',
    'Goals connected',
    'Opportunity dimensions created',
  ];
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (currentStep < steps.length) {
      const timer = setTimeout(() => setCurrentStep(currentStep + 1), 700);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(onComplete, 1000);
      return () => clearTimeout(timer);
    }
  }, [currentStep, steps.length, onComplete]);

  return (
    <div className="min-h-screen bg-surface-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md text-center">
        <div className="relative w-20 h-20 mx-auto mb-8">
          <div className="absolute inset-0 rounded-2xl bg-primary-600 flex items-center justify-center shadow-glow">
            <Sparkles className="w-10 h-10 text-white animate-pulse-soft" />
          </div>
        </div>

        <h2 className="text-2xl font-heading font-semibold text-surface-900 mb-2">
          Understanding your profile...
        </h2>
        <p className="text-sm text-surface-500 mb-8">
          Our AI is analyzing your multidimensional profile to build your opportunity ecosystem.
        </p>

        <div className="space-y-3 text-left">
          {steps.map((step, idx) => {
            const done = idx < currentStep;
            const active = idx === currentStep;
            return (
              <div
                key={step}
                className={`flex items-center gap-3 transition-all duration-300 ${
                  done || active ? 'opacity-100' : 'opacity-30'
                }`}
              >
                {done ? (
                  <CheckCircle2 className="w-5 h-5 text-success-500 flex-shrink-0" />
                ) : active ? (
                  <Loader2 className="w-5 h-5 text-primary-500 flex-shrink-0 animate-spin" />
                ) : (
                  <div className="w-5 h-5 rounded-full border-2 border-surface-200 flex-shrink-0" />
                )}
                <span className={`text-sm font-medium ${done ? 'text-surface-800' : active ? 'text-primary-600' : 'text-surface-400'}`}>
                  {step}
                </span>
              </div>
            );
          })}
        </div>

        {currentStep >= steps.length && (
          <div className="mt-8 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 text-primary-700 text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              Your profile has 8 dimensions
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
