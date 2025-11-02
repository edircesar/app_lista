
import React, { useState } from 'react';
import PlusIcon from './icons/PlusIcon';

interface AddItemFormProps {
  onAddItem: (name: string) => void;
}

const AddItemForm: React.FC<AddItemFormProps> = ({ onAddItem }) => {
  const [newItemName, setNewItemName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddItem(newItemName);
    setNewItemName('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 sm:gap-4">
      <input
        type="text"
        placeholder="Adicionar novo item"
        value={newItemName}
        onChange={(e) => setNewItemName(e.target.value)}
        className="flex-grow bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
      />
      <button
        type="submit"
        className="flex-shrink-0 flex items-center justify-center gap-2 bg-indigo-600 text-white font-semibold px-4 py-3 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-indigo-500 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={!newItemName.trim()}
      >
        <PlusIcon className="h-5 w-5" />
        <span className="hidden sm:inline">Adicionar</span>
      </button>
    </form>
  );
};

export default AddItemForm;
