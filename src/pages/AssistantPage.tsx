import { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, ArrowRight, Check, TriangleAlert, User } from 'lucide-react';
import { opportunities, currentUser } from '@/data/mockData';
import { MatchBadge } from '@/components/ui/MatchBadge';
import type { ChatMessage, PageId } from '@/types';

interface AssistantPageProps {
  onNavigate: (page: PageId) => void;
  onViewOpportunity: (id: string) => void;
}

const exampleQuestions = [
  'I have Python and SQL but want to enter product management. What should I apply for?',
  'What cross-domain opportunities match my AI and business interests?',
  'How can I grow from software developer to product manager?',
  'What am I missing in my opportunity search?',
];

function generateResponse(query: string): ChatMessage {
  const lower = query.toLowerCase();

  let recommendations: ChatMessage['recommendations'] = [];
  let content = '';
  let nextStep = '';

  if (lower.includes('python') && lower.includes('sql') && lower.includes('product')) {
    content = "Based on your Python and SQL skills, combined with your interest in product management, I'd recommend opportunities that bridge data and product. These roles let you leverage your analytical skills while building product thinking.";
    recommendations = [
      { title: 'Product Analytics Challenge', matchScore: 89, matchType: 'cross-domain', why: ['Python', 'SQL', 'Product Management interest', 'Data Visualization'], missing: ['Advanced statistics'] },
      { title: 'AI Product Hackathon', matchScore: 94, matchType: 'cross-domain', why: ['Python', 'AI interest', 'Product Management interest', 'Hackathon experience'], missing: ['Formal product internship'] },
      { title: 'Product Case Competition', matchScore: 85, matchType: 'growth', why: ['Product Management interest', 'Leadership experience', 'Business Analysis (beginner)'], missing: ['Formal product training'] },
    ];
    nextStep = "I'd suggest starting with the Product Analytics Challenge — it leverages your existing SQL skills while introducing product thinking. Then tackle the AI Product Hackathon to build a cross-domain portfolio piece.";
  } else if (lower.includes('cross-domain') || (lower.includes('ai') && lower.includes('business'))) {
    content = "Your profile has strong AI and business dimensions that create powerful cross-domain opportunities. These are roles where your technical AI skills meet business thinking — a combination that's in high demand.";
    recommendations = [
      { title: 'AI Product Hackathon', matchScore: 94, matchType: 'cross-domain', why: ['AI interest (86%)', 'Product Management interest (78%)', 'Python', 'Hackathon experience'], missing: [] },
      { title: 'AI Ethics Fellowship', matchScore: 81, matchType: 'cross-domain', why: ['AI interest', 'Product Management interest', 'Research experience'], missing: ['Ethics coursework'] },
      { title: 'Startup Fellowship Program', matchScore: 84, matchType: 'growth', why: ['Startups interest', 'Product Management interest', 'Leadership experience'], missing: ['Prior startup experience'] },
    ];
    nextStep = "The AI Product Hackathon is your strongest cross-domain match. It sits at the intersection of AI, Product, and Software — three of your top dimensions.";
  } else if (lower.includes('grow') || lower.includes('product manager') || lower.includes('career')) {
    content = `To grow from ${currentUser.currentDirection} to ${currentUser.goal}, you need opportunities that build product thinking, market analysis, and strategy skills. Here's a progression path I'd recommend:`;
    recommendations = [
      { title: 'AI Product Hackathon', matchScore: 94, matchType: 'cross-domain', why: ['Builds product prototyping', 'AI integration', 'Pitching skills'], missing: [] },
      { title: 'Product Case Competition', matchScore: 85, matchType: 'growth', why: ['Builds product thinking', 'Market analysis', 'Product strategy'], missing: ['Formal product training'] },
      { title: 'Startup Fellowship Program', matchScore: 84, matchType: 'growth', why: ['Builds startup operations experience', 'Mentorship from founders', 'Real product decisions'], missing: ['Prior startup experience'] },
    ];
    nextStep = "Follow this sequence: Hackathon → Case Competition → Fellowship. Each builds on the previous one, moving you closer to your Product Manager goal.";
  } else if (lower.includes('missing') || lower.includes('overlook')) {
    content = "You're mostly exploring Software opportunities, but your profile has strong AI and Product dimensions. You may be overlooking cross-domain opportunities that combine your software skills with AI and product thinking.";
    recommendations = [
      { title: 'AI Product Challenge', matchScore: 93, matchType: 'cross-domain', why: ['AI + Product intersection', 'Python matches', 'Software background'], missing: [] },
      { title: 'Product Analytics Challenge', matchScore: 89, matchType: 'cross-domain', why: ['SQL + Product intersection', 'Data Visualization'], missing: ['Advanced analytics'] },
      { title: 'Startup Fellowship', matchScore: 84, matchType: 'growth', why: ['Startups interest', 'Product Management alignment', 'Leadership experience'], missing: ['Prior startup experience'] },
    ];
    nextStep = "Visit the 'What Am I Missing?' page for a full analysis of your overlooked opportunities.";
  } else {
    content = "I can help you find opportunities that match your multidimensional profile. Try asking about specific skills, career goals, or what you might be missing. For example: 'What cross-domain opportunities match my AI and business interests?'";
    recommendations = opportunities.slice(0, 3).map((o) => ({
      title: o.title,
      matchScore: o.matchScore,
      matchType: o.matchType,
      why: o.matchReasons.slice(0, 3).map((r) => r.label),
      missing: o.missingReasons.map((r) => r.label),
    }));
    nextStep = "Tell me more about your skills and goals, and I'll find more targeted recommendations.";
  }

  return { id: Date.now().toString(), role: 'assistant', content, recommendations, nextStep };
}

export function AssistantPage({ onViewOpportunity }: AssistantPageProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = (text?: string) => {
    const query = text || input;
    if (!query.trim()) return;

    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', content: query };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const response = generateResponse(query);
      setMessages((prev) => [...prev, response]);
      setIsTyping(false);
    }, 1200);
  };

  const getOppId = (title: string): string | undefined => {
    const opp = opportunities.find((o) => o.title === title);
    return opp?.id;
  };

  return (
    <div className="p-4 lg:p-6 max-w-3xl mx-auto flex flex-col" style={{ minHeight: 'calc(100vh - 4rem)' }}>
      {/* Header */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <h1 className="font-heading text-xl font-bold text-surface-900">AI Assistant</h1>
        </div>
        <p className="text-sm text-surface-500">Ask about opportunities, career paths, or what you might be missing</p>
      </div>

      {/* Chat area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-4 pb-4">
        {messages.length === 0 && (
          <div className="text-center py-12 animate-fade-in">
            <div className="w-16 h-16 rounded-2xl bg-primary-50 flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8 text-primary-500" />
            </div>
            <h2 className="font-heading text-lg font-semibold text-surface-800 mb-2">How can I help you discover opportunities?</h2>
            <p className="text-sm text-surface-500 mb-6 max-w-md mx-auto">
              I understand your multidimensional profile and can recommend opportunities, explain matches, and suggest growth paths.
            </p>
            <div className="space-y-2 max-w-lg mx-auto">
              {exampleQuestions.map((q) => (
                <button
                  key={q}
                  onClick={() => handleSend(q)}
                  className="w-full flex items-center gap-3 p-3 rounded-xl bg-white border border-surface-200 hover:border-primary-300 hover:bg-primary-50/30 transition-all text-left group"
                >
                  <Sparkles className="w-4 h-4 text-surface-400 group-hover:text-primary-500" />
                  <span className="text-sm text-surface-600 flex-1">{q}</span>
                  <ArrowRight className="w-4 h-4 text-surface-300 group-hover:text-primary-500" />
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in-up`}>
            {msg.role === 'assistant' && (
              <div className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
            )}
            <div className={`max-w-[85%] ${msg.role === 'user' ? 'order-2' : ''}`}>
              <div className={`p-4 rounded-2xl ${msg.role === 'user' ? 'bg-primary-600 text-white' : 'card'}`}>
                <p className={`text-sm leading-relaxed ${msg.role === 'user' ? 'text-white' : 'text-surface-700'}`}>
                  {msg.content}
                </p>
              </div>

              {/* Recommendations */}
              {msg.recommendations && msg.recommendations.length > 0 && (
                <div className="mt-3 space-y-2">
                  {msg.recommendations.map((rec) => {
                    const oppId = getOppId(rec.title);
                    return (
                      <div key={rec.title} className="card p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-sm font-semibold text-surface-900">{rec.title}</h4>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-sm font-bold text-primary-600">{rec.matchScore}%</span>
                            <MatchBadge type={rec.matchType} size="sm" />
                          </div>
                        </div>

                        <div className="space-y-1.5 mb-2">
                          {rec.why.map((w) => (
                            <div key={w} className="flex items-center gap-2 text-xs text-surface-600">
                              <Check className="w-3.5 h-3.5 text-success-500" />
                              {w}
                            </div>
                          ))}
                        </div>

                        {rec.missing.length > 0 && (
                          <div className="space-y-1.5 mb-3">
                            {rec.missing.map((m) => (
                              <div key={m} className="flex items-center gap-2 text-xs text-surface-500">
                                <TriangleAlert className="w-3.5 h-3.5 text-warning-500" />
                                {m}
                              </div>
                            ))}
                          </div>
                        )}

                        {oppId && (
                          <button
                            onClick={() => onViewOpportunity(oppId)}
                            className="btn-secondary w-full text-xs"
                          >
                            View Opportunity
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Next step */}
              {msg.nextStep && (
                <div className="mt-2 p-3 rounded-xl bg-primary-50 border border-primary-100">
                  <p className="text-xs font-semibold text-primary-700 uppercase tracking-wider mb-1">Suggested Next Step</p>
                  <p className="text-sm text-surface-700">{msg.nextStep}</p>
                </div>
              )}
            </div>
            {msg.role === 'user' && (
              <div className="w-8 h-8 rounded-lg bg-surface-200 flex items-center justify-center flex-shrink-0 order-3">
                <User className="w-4 h-4 text-surface-500" />
              </div>
            )}
          </div>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex gap-3 animate-fade-in">
            <div className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div className="card p-4">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-primary-400 animate-pulse-soft" />
                <div className="w-2 h-2 rounded-full bg-primary-400 animate-pulse-soft" style={{ animationDelay: '0.2s' }} />
                <div className="w-2 h-2 rounded-full bg-primary-400 animate-pulse-soft" style={{ animationDelay: '0.4s' }} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="sticky bottom-0 bg-surface-50 pt-4">
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about opportunities, skills, or career goals..."
            className="input pr-12"
          />
          <button
            onClick={() => handleSend()}
            disabled={!input.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-lg bg-primary-600 text-white flex items-center justify-center disabled:opacity-40 hover:bg-primary-700 transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
