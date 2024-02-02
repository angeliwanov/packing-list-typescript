import { useReducer } from 'react';
import { filterItems, getInitialItems } from '../lib/items';
import Header from './header';
import ItemList from './item-list';
import MarkAllAsUnpacked from './mark-all-as-unpacked';
import NewItem from './new-item';
import { reducer } from '../lib/reducer';

const Application = () => {
  const [items, dispatch] = useReducer(reducer, getInitialItems());

  const unpackedItems = filterItems(items, { packed: false });
  const packedItems = filterItems(items, { packed: true });

  return (
    <main className="mx-auto flex flex-col gap-8 p-8 lg:max-w-4xl">
      <Header items={items} />
      <NewItem dispatch={dispatch} />
      <section className="flex flex-col gap-8 md:flex-row">
        <ItemList
          title="Unpacked Items"
          items={unpackedItems}
          dispatch={dispatch}
        />
        <ItemList
          title="Packed Items"
          items={packedItems}
          dispatch={dispatch}
        />
      </section>
      <MarkAllAsUnpacked onClick={dispatch} />
    </main>
  );
};

export default Application;
