import { useState, createContext, PropsWithChildren } from 'react';
import {
  createItem,
  filterItems,
  getInitialItems,
  removeItem,
  updateItem,
} from './lib/items';

type PartialItem = Partial<Item>;
type WithoutId = Omit<PartialItem, 'id'>;

//pull dynamicly types out of values
type ItemsState = {
  items: Item[];
  unpackedItems: Item[];
  packedItems: Item[];
  add: (name: string) => void;
  update: (id: string, updates: WithoutId) => void;
  remove: (id: string) => void;
  markAllAsUnpacked: () => void;
};

export const ItemsContext = createContext({} as ItemsState);

const ItemsProvider = ({ children }: PropsWithChildren) => {
  const [items, setItems] = useState(getInitialItems());

  const add = (name: string) => {
    const item = createItem(name);
    setItems([...items, item]);
  };

  const update = (id: string, updates: WithoutId) => {
    setItems(updateItem(items, id, updates));
  };

  const remove = (id: string) => {
    setItems(removeItem(items, id));
  };

  const unpackedItems = filterItems(items, { packed: false });
  const packedItems = filterItems(items, { packed: true });

  const markAllAsUnpacked = () => {
    return setItems(items.map((item) => ({ ...item, packed: false })));
  };

  const value = {
    items,
    unpackedItems,
    packedItems,
    add,
    update,
    remove,
    markAllAsUnpacked,
  };

  //pull dynamicly types out of values
  // const status = ['loading', 'error', 'success'] as const;
  // type StatusState = typeof status[number];

  return (
    <ItemsContext.Provider value={value}>{children}</ItemsContext.Provider>
  );
};

export default ItemsProvider;
