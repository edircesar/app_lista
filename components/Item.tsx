
import React, { useState, useRef, useEffect } from 'react';
import type { Item as ItemType } from '../types';
import EditIcon from './icons/EditIcon';
import DeleteIcon from './icons/DeleteIcon';
import CheckIcon from './icons/CheckIcon';
import XIcon from './icons/XIcon';

interface ItemProps {
  item: ItemType;
  onUpdate: (id: number, newName: string) => void;
  onDelete: () => void;
}

const Item: React.FC<ItemProps> = ({ item, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(item.name);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [isEditing]);

  const handleSave = () => {
    if (editText.trim()) {
      onUpdate(item.id, editText.trim());
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditText(item.name);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  return (
    <li className="flex items-center justify-between p-4 transition duration-200 ease-in-out hover:bg-slate-700/50">
      {isEditing ? (
        <input
          ref={inputRef}
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleCancel} // Cancel on blur for simplicity, save could be an option too
          className="flex-grow bg-slate-700 border border-slate-600 rounded-md px-3 py-1 mr-4 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      ) : (
        <span className="text-slate-300 break-all">{item.name}</span>
      )}

      <div className="flex-shrink-0 flex items-center space-x-2 ml-4">
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              onMouseDown={(e) => e.preventDefault()} // Prevent blur from firing before click
              className="p-2 text-emerald-400 hover:text-emerald-300 rounded-full hover:bg-slate-600 transition-colors"
              aria-label="Salvar"
            >
              <CheckIcon className="h-5 w-5" />
            </button>
            <button
              onClick={handleCancel}
              onMouseDown={(e) => e.preventDefault()}
              className="p-2 text-rose-400 hover:text-rose-300 rounded-full hover:bg-slate-600 transition-colors"
              aria-label="Cancelar"
            >
              <XIcon className="h-5 w-5" />
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setIsEditing(true)}
              className="p-2 text-slate-400 hover:text-indigo-400 rounded-full hover:bg-slate-600 transition-colors"
              aria-label="Editar"
            >
              <EditIcon className="h-5 w-5" />
            </button>
            <button
              onClick={onDelete}
              className="p-2 text-slate-400 hover:text-rose-400 rounded-full hover:bg-slate-600 transition-colors"
              aria-label="Excluir"
            >
              <DeleteIcon className="h-5 w-5" />
            </button>
          </>
        )}
      </div>
    </li>
  );
};

export default Item;
