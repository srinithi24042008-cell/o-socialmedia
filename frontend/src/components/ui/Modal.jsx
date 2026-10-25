import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useEffect, useId } from 'react';

export const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  hideClose = false,
}) => {
  const titleId = useId();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-[95vw] h-[95vh]',
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm"
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', duration: 0.5, bounce: 0.3 }}
              role="dialog"
              aria-modal="true"
              aria-labelledby={title ? titleId : undefined}
              className={`w-full ${sizes[size]} bg-surface rounded-3xl shadow-soft-xl pointer-events-auto overflow-hidden border border-border flex flex-col`}
            >
              {(title || !hideClose) && (
                <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-slate-50/50">
                  {title && <h2 id={titleId} className="text-lg font-semibold text-slate-800">{title}</h2>}
                  {!hideClose && (
                    <button
                      type="button"
                      onClick={onClose}
                      aria-label="Close modal"
                      className="p-2 ml-auto rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-200/50 transition-colors"
                    >
                      <X className="w-5 h-5" aria-hidden="true" />
                    </button>
                  )}
                </div>
              )}
              <div className="p-6 overflow-y-auto max-h-[calc(100vh-8rem)] custom-scrollbar">
                {children}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};
