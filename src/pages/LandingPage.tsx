import { Sparkles, ArrowRight, User, Brain, Target, Compass, HelpCircle, TrendingUp, Check, Zap, Layers, Network } from 'lucide-react';
import { useInView } from '@/hooks/useAnimations';
import { useRef } from 'react';

interface LandingPageProps {
  onGetStarted: () => void;
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  const { ref: heroRef, inView: heroInView } = useInView<HTMLDivElement>();
  const { ref: problemRef, inView: problemInView } = useInView<HTMLDivElement>();
  const { ref: howRef, inView: howInView } = useInView<HTMLDivElement>();
  const { ref: matchRef, inView: matchInView } = useInView<HTMLDivElement>();
  const { ref: missingRef, inView: missingInView } = useInView<HTMLDivElement>();

  const dimensions = [
    { label: 'AI', color: '#6366f1', angle: -90 },
    { label: 'Python', color: '#22c55e', angle: -38 },
    { label: 'Product Mgmt', color: '#8b5cf6', angle: 15 },
    { label: 'Business', color: '#f59e0b', angle: 68 },
    { label: 'Hackathons', color: '#06b6d4', angle: 120 },
    { label: 'BCA', color: '#ec4899', angle: 173 },
    { label: 'Startups', color: '#14b8a6', angle: 226 },
    { label: 'Research', color: '#3b82f6', angle: 278 },
  ];

  return (
    <div className="min-h-screen bg-surface-50 overflow-x-hidden">
      {/* Nav */}
      <nav className="sticky top-0 z-40 bg-surface-50/80 backdrop-blur-xl border-b border-surface-200/60">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 lg:px-8 h-16">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-primary-600 flex items-center justify-center shadow-soft">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h1 className="font-heading font-bold text-lg text-surface-900">OpportunityOS</h1>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={onGetStarted} className="btn-ghost text-sm hidden sm:flex">Sign in</button>
            <button onClick={onGetStarted} className="btn-primary text-sm">Get Started</button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section ref={heroRef} className="relative pt-16 pb-24 px-4 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-60" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary-200/20 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-50 border border-primary-100 text-primary-700 text-xs font-medium mb-6 animate-fade-in-up">
              <Sparkles className="w-3.5 h-3.5" />
              Multi-Dimensional Opportunity Intelligence
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-surface-900 leading-[1.1] text-balance animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              Your profile is <span className="text-primary-600">multidimensional</span>.
              <br />
              Your opportunities should be too.
            </h1>
            <p className="mt-6 text-lg text-surface-500 text-pretty max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Discover opportunities based on your skills, interests, experience and goals — not just a single career category.
            </p>
            <div className="mt-8 flex items-center justify-center gap-3 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <button onClick={onGetStarted} className="btn-primary text-base px-6 py-3">
                Build My Opportunity Profile
                <ArrowRight className="w-4 h-4" />
              </button>
              <a href="#how" className="btn-secondary text-base px-6 py-3">
                See How It Works
              </a>
            </div>
          </div>

          {/* Hero visualization */}
          <div className={`mt-16 transition-all duration-1000 ${heroInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="relative max-w-4xl mx-auto h-[400px] md:h-[440px]">
              {/* Center person */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                <div className="relative">
                  <div className="w-20 h-20 rounded-2xl bg-primary-600 flex items-center justify-center shadow-glow animate-float">
                    <User className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-white shadow-soft text-[10px] font-semibold text-surface-700 whitespace-nowrap">
                    YOU
                  </div>
                </div>
              </div>

              {/* Connection lines */}
              <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
                {dimensions.map((dim, idx) => {
                  const rad = (dim.angle * Math.PI) / 180;
                  const x = 50 + Math.cos(rad) * 38;
                  const y = 50 + Math.sin(rad) * 38;
                  return (
                    <line
                      key={idx}
                      x1="50%"
                      y1="50%"
                      x2={`${x}%`}
                      y2={`${y}%`}
                      stroke={dim.color}
                      strokeWidth="1.5"
                      strokeOpacity="0.3"
                      strokeDasharray="4 4"
                      className={heroInView ? 'animate-draw' : ''}
                      style={{ animationDelay: `${idx * 0.1 + 0.5}s` }}
                    />
                  );
                })}
              </svg>

              {/* Dimension nodes */}
              {dimensions.map((dim, idx) => {
                const rad = (dim.angle * Math.PI) / 180;
                const x = 50 + Math.cos(rad) * 38;
                const y = 50 + Math.sin(rad) * 38;
                return (
                  <div
                    key={dim.label}
                    className="absolute z-10 transition-all duration-700"
                    style={{
                      left: `${x}%`,
                      top: `${y}%`,
                      transform: 'translate(-50%, -50%)',
                      opacity: heroInView ? 1 : 0,
                      transitionDelay: `${idx * 0.08 + 0.4}s`,
                    }}
                  >
                    <div
                      className="px-3 py-2 rounded-xl bg-white border border-surface-200 shadow-card text-xs font-semibold whitespace-nowrap hover:scale-110 hover:shadow-elevated transition-transform cursor-default"
                      style={{ color: dim.color }}
                    >
                      {dim.label}
                    </div>
                  </div>
                );
              })}

              {/* Opportunity cards floating */}
              <div
                className="absolute bottom-0 right-0 z-10 transition-all duration-700"
                style={{ opacity: heroInView ? 1 : 0, transitionDelay: '1s' }}
              >
                <div className="card p-3 w-44 animate-float" style={{ animationDelay: '0.5s' }}>
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className="w-7 h-7 rounded-lg bg-primary-100 flex items-center justify-center">
                      <Zap className="w-3.5 h-3.5 text-primary-600" />
                    </div>
                    <span className="font-mono text-sm font-bold text-primary-600">94%</span>
                  </div>
                  <p className="text-xs font-semibold text-surface-800">AI Product Hackathon</p>
                  <p className="text-[10px] text-secondary-600 font-medium mt-0.5">CROSS-DOMAIN</p>
                </div>
              </div>
              <div
                className="absolute top-4 left-0 z-10 transition-all duration-700"
                style={{ opacity: heroInView ? 1 : 0, transitionDelay: '1.2s' }}
              >
                <div className="card p-3 w-40 animate-float" style={{ animationDelay: '1s' }}>
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className="w-7 h-7 rounded-lg bg-success-100 flex items-center justify-center">
                      <Check className="w-3.5 h-3.5 text-success-600" />
                    </div>
                    <span className="font-mono text-sm font-bold text-success-600">91%</span>
                  </div>
                  <p className="text-xs font-semibold text-surface-800">Full-Stack Internship</p>
                  <p className="text-[10px] text-success-600 font-medium mt-0.5">DIRECT MATCH</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem */}
      <section ref={problemRef} className="py-20 px-4 lg:px-8 bg-white border-y border-surface-100">
        <div className={`max-w-5xl mx-auto transition-all duration-700 ${problemInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="text-center mb-12">
            <span className="text-xs font-semibold text-danger-600 uppercase tracking-wider">The Problem</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-surface-900 mt-2 text-balance">
              You're more than a single label
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <div className="card p-5 border-danger-100 bg-danger-50/30">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-danger-100 flex items-center justify-center">
                    <User className="w-5 h-5 text-danger-500" />
                  </div>
                  <span className="font-semibold text-surface-800">Traditional platforms</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['Developer', 'Designer', 'Business', 'Data Analyst'].map((label) => (
                    <span key={label} className="chip bg-white border-surface-200 text-surface-500">
                      {label}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-surface-500 mt-3">
                  You get boxed into one category. Everything else about you is ignored.
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="card p-5 border-primary-200 bg-primary-50/30">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center">
                    <Layers className="w-5 h-5 text-primary-600" />
                  </div>
                  <span className="font-semibold text-surface-800">OpportunityOS</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['BCA', 'Python', 'AI', 'Product', 'Hackathons', 'Startups', 'Research', 'React'].map((label) => (
                    <span key={label} className="chip bg-white border-primary-200 text-primary-700">
                      {label}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-surface-600 mt-3">
                  Every dimension of you is mapped. Opportunities are found at the intersections.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" ref={howRef} className="py-20 px-4 lg:px-8">
        <div className={`max-w-5xl mx-auto transition-all duration-700 ${howInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="text-center mb-12">
            <span className="text-xs font-semibold text-primary-600 uppercase tracking-wider">How It Works</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-surface-900 mt-2 text-balance">
              From understanding to action
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: User, title: 'Understand Me', desc: 'Build a multidimensional profile — education, skills, interests, experience, goals, and preferences.', color: '#4f46e5' },
              { icon: Compass, title: 'Discover', desc: 'See opportunities matched across all your dimensions, not just a single category.', color: '#06b6d4' },
              { icon: Network, title: 'Connect', desc: 'Visualize how your dimensions intersect to create unique opportunity matches.', color: '#8b5cf6' },
              { icon: HelpCircle, title: 'Explore', desc: 'Find what you\'re missing — opportunities outside your normal search behavior.', color: '#ec4899' },
              { icon: TrendingUp, title: 'Grow', desc: 'Follow a career path from where you are now to where you want to be.', color: '#22c55e' },
              { icon: Target, title: 'Act', desc: 'Save, apply, and track your opportunities — every recommendation leads to action.', color: '#f59e0b' },
            ].map((step, idx) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.title}
                  className="card card-hover p-5 transition-all"
                  style={{ transitionDelay: `${idx * 0.05}s` }}
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ backgroundColor: `${step.color}15` }}>
                    <Icon className="w-5 h-5" style={{ color: step.color }} />
                  </div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="font-mono text-xs font-semibold text-surface-400">0{idx + 1}</span>
                    <h3 className="font-heading font-semibold text-surface-900">{step.title}</h3>
                  </div>
                  <p className="text-sm text-surface-500">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Match types */}
      <section ref={matchRef} className="py-20 px-4 lg:px-8 bg-white border-y border-surface-100">
        <div className={`max-w-5xl mx-auto transition-all duration-700 ${matchInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="text-center mb-12">
            <span className="text-xs font-semibold text-secondary-600 uppercase tracking-wider">Three Types of Matches</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-surface-900 mt-2 text-balance">
              Not just what fits now — what helps you grow
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { type: 'Direct Match', color: '#22c55e', bg: 'bg-success-50', border: 'border-success-200', icon: Check, desc: 'Opportunities that directly match your current capabilities and experience.', example: 'Full-Stack Developer Internship — 91%' },
              { type: 'Cross-Domain Match', color: '#8b5cf6', bg: 'bg-secondary-50', border: 'border-secondary-200', icon: Network, desc: 'Opportunities created by the intersection of multiple dimensions in your profile.', example: 'AI Product Hackathon — 94%' },
              { type: 'Growth Match', color: '#06b6d4', bg: 'bg-accent-50', border: 'border-accent-200', icon: TrendingUp, desc: 'Opportunities that help you move from your current profile toward your career goal.', example: 'Startup Fellowship — 84%' },
            ].map((match, idx) => {
              const Icon = match.icon;
              return (
                <div key={match.type} className={`card p-6 ${match.border} ${match.bg}`}>
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 bg-white shadow-soft">
                    <Icon className="w-6 h-6" style={{ color: match.color }} />
                  </div>
                  <h3 className="font-heading font-semibold text-lg text-surface-900 mb-2">{match.type}</h3>
                  <p className="text-sm text-surface-600 mb-4">{match.desc}</p>
                  <div className="pt-3 border-t border-surface-200/60">
                    <p className="text-xs text-surface-500 mb-1">Example</p>
                    <p className="text-sm font-medium text-surface-800">{match.example}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* What Am I Missing preview */}
      <section ref={missingRef} className="py-20 px-4 lg:px-8">
        <div className={`max-w-4xl mx-auto transition-all duration-700 ${missingInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-50 border border-accent-100 text-accent-700 text-xs font-medium mb-4">
              <HelpCircle className="w-3.5 h-3.5" />
              Signature Feature
            </div>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-surface-900 text-balance">
              "What Am I Missing?"
            </h2>
            <p className="mt-4 text-lg text-surface-500 max-w-2xl mx-auto">
              We analyze your profile, search behavior, and saved opportunities to surface what you might be overlooking.
            </p>
          </div>

          <div className="card p-6 md:p-8 bg-gradient-to-br from-surface-50 to-white border-surface-200">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center">
                <Brain className="w-4 h-4 text-white" />
              </div>
              <span className="text-xs font-semibold text-primary-600 uppercase tracking-wider">AI Insight</span>
            </div>
            <p className="text-lg text-surface-800 font-medium mb-6 text-pretty">
              "You're mostly exploring Software opportunities. Your profile also shows strong AI and Product dimensions. You may be overlooking these cross-domain opportunities."
            </p>

            <div className="flex items-center gap-4 mb-6 flex-wrap">
              <div className="flex items-center gap-2">
                <span className="text-xs text-surface-500">Current focus:</span>
                <span className="chip bg-surface-100 border-surface-200 text-surface-600">Software</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-surface-500">Hidden dimensions:</span>
                <span className="chip bg-secondary-50 border-secondary-200 text-secondary-700">AI</span>
                <span className="chip bg-secondary-50 border-secondary-200 text-secondary-700">Product</span>
                <span className="chip bg-secondary-50 border-secondary-200 text-secondary-700">Business</span>
              </div>
            </div>

            <div className="space-y-2">
              {[
                { title: 'AI Product Hackathon', score: 93, type: 'Cross-Domain' },
                { title: 'Product Analytics Challenge', score: 89, type: 'Cross-Domain' },
                { title: 'Startup Fellowship', score: 84, type: 'Growth' },
              ].map((item) => (
                <div key={item.title} className="flex items-center justify-between p-3 rounded-xl bg-white border border-surface-100 hover:border-surface-200 transition-colors">
                  <div>
                    <p className="text-sm font-semibold text-surface-800">{item.title}</p>
                    <p className="text-xs text-surface-500">{item.type}</p>
                  </div>
                  <span className="font-mono text-lg font-bold text-primary-600">{item.score}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 px-4 lg:px-8 bg-white border-y border-surface-100">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold text-primary-600 uppercase tracking-wider">Why OpportunityOS</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-surface-900 mt-2 text-balance">
              Built for multidimensional people
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              { icon: Layers, title: 'Multidimensional matching', desc: 'Your profile is mapped across 8+ dimensions — not reduced to a single category.' },
              { icon: Brain, title: 'AI-powered insights', desc: 'Every recommendation is explained. You always know why an opportunity matches.' },
              { icon: HelpCircle, title: 'Discover what you\'re missing', desc: 'Surface opportunities outside your normal search behavior — your hidden potential.' },
              { icon: TrendingUp, title: 'Career growth paths', desc: 'See the steps from where you are now to where you want to be — with opportunities at each stage.' },
              { icon: Network, title: 'Cross-domain discovery', desc: 'Find opportunities at the intersection of your skills and interests that you\'d never search for.' },
              { icon: Target, title: 'Action-oriented', desc: 'Every recommendation leads to an action — save, apply, track. No dead ends.' },
            ].map((benefit) => {
              const Icon = benefit.icon;
              return (
                <div key={benefit.title} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-surface-900 mb-1">{benefit.title}</h3>
                    <p className="text-sm text-surface-500">{benefit.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-4 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <div className="relative inline-block mb-6">
            <div className="absolute inset-0 bg-primary-200/30 blur-2xl rounded-full" />
            <div className="relative w-16 h-16 rounded-2xl bg-primary-600 flex items-center justify-center shadow-glow mx-auto">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
          </div>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-surface-900 text-balance">
            Stop searching in one direction.
            <br />
            Start discovering in every dimension.
          </h2>
          <p className="mt-4 text-lg text-surface-500">
            Build your multidimensional profile and let opportunities find you.
          </p>
          <div className="mt-8">
            <button onClick={onGetStarted} className="btn-primary text-base px-6 py-3">
              Build My Opportunity Profile
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 lg:px-8 border-t border-surface-100">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-primary-600 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-heading font-semibold text-sm text-surface-700">OpportunityOS</span>
          </div>
          <p className="text-xs text-surface-400">Multi-Dimensional Opportunity Intelligence Platform</p>
        </div>
      </footer>
    </div>
  );
}
