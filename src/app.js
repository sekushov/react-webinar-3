import React, {useCallback} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const list = store.getState().list,
        cartList = store.getState().cartList;

  const callbacks = {
    onDeleteItem: useCallback((code) => {
      store.deleteItem(code);
    }, [store]),

    onSelectItem: useCallback((code) => {
      store.selectItem(code);
    }, [store]),

    onAddItem: useCallback(() => {
      store.addItem();
    }, [store]),

    onAddToCart: useCallback((code) => {
      store.addToCart(code);
    }, [store])
  }

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <Controls cartList={cartList} onAdd={() => {}}/>
      <List list={list}
            onAddToCart={callbacks.onAddToCart}/>
    </PageLayout>
  );
}

export default App;
