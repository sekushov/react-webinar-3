import React, {useCallback} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import Modal from "./components/modal";
import PageLayout from "./components/page-layout";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const list = store.getState().list,
        cartList = store.getState().cartList,
        showModal = store.getState().showModal;

  const callbacks = {
    onDeleteItem: useCallback((code) => {
      store.deleteItem(code, 'cartList');
    }, [store]),

    onSelectItem: useCallback((code) => {
      store.selectItem(code);
    }, [store]),

    onAddItem: useCallback(() => {
      store.addItem();
    }, [store]),

    onAddToCart: useCallback((code) => {
      store.addToCart(code);
    }, [store]),

    onDeleteFromCart: useCallback((code) => {
      store.deleteFromCart(code);
    }, [store]),

    onShowModal: useCallback(() => {
      store.showModal();
    }, [store])
  }

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <Controls cartList={cartList} onAdd={callbacks.onShowModal}/>
      <List list={list}
            onAdd={callbacks.onAddToCart}
            itemBtnText='Добавить'/>
      <Modal cartList={cartList} 
            onDelete={callbacks.onDeleteItem}
            elements={['amount', {'Controls': <Controls cartList={cartList} onAdd={callbacks.onShowModal}/>}]}
            itemBtnText='Удалить'
            show={showModal}/>
    </PageLayout>
  );
}

export default App;
