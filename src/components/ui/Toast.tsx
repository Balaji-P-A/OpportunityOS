import { useEffect, useState } from 'react';

export function Toast({ message, visible, onClose }: { message: string; visible: boolean; onClose: () => void }) {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(onClose, 2500);
      return () => clearTimeout(timer);
    }
  }, [visible, onClose]);

  if (!visible) return null;

  return (
    <div className="fixed bottom-20 md:bottom-6 left-1/2 -translate-x-1/2 z-50 animate-fade-in-up">
      <div className="bg-surface-900 text-white text-sm font-medium px-4 py-2.5 rounded-xl shadow-elevated flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-success-400" />
        {message}
      </div>
    </div>
  );
}

export function useToast() {
  const [message, setMessage] = useState('');
  const [visible, setVisible] = useState(false);

  const show = (msg: string) => {
    setMessage(msg);
    setVisible(true);
  };

  return { message, visible, show, close: () => setVisible(false) };
}
