import { useState } from 'react';
import { Sparkles, ArrowRight, ArrowLeft, Mail, Lock, User } from 'lucide-react';

interface AuthPageProps {
  mode: 'login' | 'register';
  onAuth: () => void;
  onSwitchMode: (mode: 'login' | 'register') => void;
}

export function AuthPage({ mode, onAuth, onSwitchMode }: AuthPageProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAuth();
  };

  return (
    <div className="min-h-screen bg-surface-50 flex">
      {/* Left panel — visual */}
      <div className="hidden lg:flex flex-1 bg-primary-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-10" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary-500/20 rounded-full blur-3xl" />

        <div className="relative z-10 flex flex-col justify-center px-16 text-white">
          <div className="flex items-center gap-2.5 mb-8">
            <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h1 className="font-heading font-bold text-xl">OpportunityOS</h1>
          </div>
          <h2 className="font-heading text-3xl font-bold leading-tight text-balance mb-4">
            Your profile is multidimensional. Your opportunities should be too.
          </h2>
          <p className="text-primary-200 text-lg max-w-md">
            Join thousands of students and early-career professionals discovering opportunities that match every dimension of who they are.
          </p>

          <div className="mt-12 space-y-3">
            {['8+ profile dimensions mapped', 'Direct, Cross-Domain, and Growth matches', '"What Am I Missing?" AI insights'].map((feat) => (
              <div key={feat} className="flex items-center gap-3 text-primary-200">
                <div className="w-5 h-5 rounded-full bg-success-500/20 flex items-center justify-center">
                  <ArrowRight className="w-3 h-3 text-success-400" />
                </div>
                <span className="text-sm">{feat}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-sm">
          <div className="lg:hidden flex items-center gap-2.5 mb-8">
            <div className="w-9 h-9 rounded-xl bg-primary-600 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h1 className="font-heading font-bold text-lg text-surface-900">OpportunityOS</h1>
          </div>

          <h2 className="font-heading text-2xl font-bold text-surface-900 mb-1">
            {mode === 'login' ? 'Welcome back' : 'Create your account'}
          </h2>
          <p className="text-sm text-surface-500 mb-8">
            {mode === 'login'
              ? 'Sign in to your opportunity intelligence dashboard.'
              : 'Start building your multidimensional opportunity profile.'}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <div>
                <label className="label">Name</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your full name"
                    className="input pl-10"
                    required
                  />
                </div>
              </div>
            )}
            <div>
              <label className="label">Email</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="input pl-10"
                  required
                />
              </div>
            </div>
            <div>
              <label className="label">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="input pl-10"
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn-primary w-full py-3 mt-2">
              {mode === 'login' ? 'Sign in' : 'Create account'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-surface-500">
            {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
            <button
              onClick={() => onSwitchMode(mode === 'login' ? 'register' : 'login')}
              className="font-semibold text-primary-600 hover:text-primary-700"
            >
              {mode === 'login' ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
