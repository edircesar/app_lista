
import React, { useState, useMemo } from 'react';
import type { Item } from './types';
import SearchBar from './components/SearchBar';
import AddItemForm from './components/AddItemForm';
import ItemList from './components/ItemList';
import Modal from './components/Modal';

const App: React.FC = () => {
  const [items, setItems] = useState<Item[]>([
    { id: 1, name: 'React' },
    { id: 2, name: 'TypeScript' },
    { id: 3, name: 'Tailwind CSS' },
    { id: 4, name: 'Vite' },
  ]);
  const [searchQuery, setSearchQuery] = useState('');
  const [itemToDelete, setItemToDelete] = useState<Item | null>(null);

  const handleAddItem = (name: string) => {
    if (name.trim() === '') return;
    const newItem: Item = {
      id: Date.now(),
      name: name.trim(),
    };
    setItems(prevItems => [newItem, ...prevItems]);
  };

  const handleUpdateItem = (id: number, newName: string) => {
    setItems(prevItems =>
      prevItems.map(item => (item.id === id ? { ...item, name: newName } : item))
    );
  };

  const handleDeleteRequest = (item: Item) => {
    setItemToDelete(item);
  };

  const handleConfirmDelete = () => {
    if (itemToDelete) {
      setItems(prevItems => prevItems.filter(item => item.id !== itemToDelete.id));
      setItemToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setItemToDelete(null);
  };

  const filteredItems = useMemo(() => {
    return items.filter(item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [items, searchQuery]);

  return (
    <div className="min-h-screen bg-slate-900 font-sans p-4 sm:p-6 lg:p-8">
      <main className="max-w-2xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-emerald-400">
            Gerenciador de Itens
          </h1>
          <p className="text-slate-400 mt-2">
            Cadastre, pesquise, edite e exclua seus itens com facilidade.
          </p>
        </header>

        <div className="space-y-6">
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          <AddItemForm onAddItem={handleAddItem} />
          <ItemList
            items={filteredItems}
            onUpdateRequest={handleUpdateItem}
            onDeleteRequest={handleDeleteRequest}
          />
        </div>
      </main>
      
      <Modal
        isOpen={!!itemToDelete}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        title="Confirmar Exclusão"
      >
        <p className="text-slate-300">
          Você tem certeza que deseja excluir o item "<strong>{itemToDelete?.name}</strong>"? Esta ação não pode ser desfeita.
        </p>
      </Modal>
    </div>
  );
};

export default App;
