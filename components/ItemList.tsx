
import React from 'react';
import type { Item as ItemType } from '../types';
import Item from './Item';

interface ItemListProps {
  items: ItemType[];
  onUpdateRequest: (id: number, newName: string) => void;
  onDeleteRequest: (item: ItemType) => void;
}

const ItemList: React.FC<ItemListProps> = ({ items, onUpdateRequest, onDeleteRequest }) => {
  if (items.length === 0) {
    return (
      <div className="text-center py-10 px-4 bg-slate-800/50 rounded-lg">
        <p className="text-slate-400">Nenhum item encontrado.</p>
        <p className="text-slate-500 text-sm mt-1">Tente adicionar um novo item ou refinar sua busca.</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-800 rounded-lg border border-slate-700/50 shadow-lg">
      <ul className="divide-y divide-slate-700">
        {items.map((item) => (
          <Item
            key={item.id}
            item={item}
            onUpdate={onUpdateRequest}
            onDelete={() => onDeleteRequest(item)}
          />
        ))}
      </ul>
    </div>
  );
};

export default ItemList;
