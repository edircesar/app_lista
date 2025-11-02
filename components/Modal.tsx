
import React, { Fragment, useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onConfirm, title, children }) => {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 transition-opacity"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative bg-slate-800 rounded-lg shadow-xl border border-slate-700 w-full max-w-md m-4">
        <div className="px-6 pt-5 pb-4">
          <div className="sm:flex sm:items-start">
            <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-rose-900/50 sm:mx-0 sm:h-10 sm:w-10">
              <svg className="h-6 w-6 text-rose-400" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
            </div>
            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
              <h3 className="text-lg font-semibold leading-6 text-slate-100" id="modal-title">
                {title}
              </h3>
              <div className="mt-2 text-sm text-slate-400">
                {children}
              </div>
            </div>
          </div>
        </div>
        <div className="bg-slate-800/50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 rounded-b-lg">
          <button
            type="button"
            onClick={onConfirm}
            className="inline-flex w-full justify-center rounded-md bg-rose-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-rose-700 sm:ml-3 sm:w-auto transition-colors"
          >
            Excluir
          </button>
          <button
            type="button"
            onClick={onClose}
            className="mt-3 inline-flex w-full justify-center rounded-md bg-slate-700 px-4 py-2 text-sm font-semibold text-slate-200 shadow-sm hover:bg-slate-600 sm:mt-0 sm:w-auto transition-colors"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
