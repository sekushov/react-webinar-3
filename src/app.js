import React, {useCallback} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import Modal from "./components/modal";
import Actions from './components/actions';
import PageLayout from "./components/page-layout";
import './style.css';

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
    onDeleteItem: useCallback((code) => {     // удаление элемента из списка
      store.deleteItem(code, 'cartList');     // передаем код элемента и свойство состояния
    }, [store]),

    onSelectItem: useCallback((code) => {     // выделение элемента
      store.selectItem(code);
    }, [store]),

    onAddItem: useCallback(() => {            // добавление нового элемента список
      store.addItem();
    }, [store]),

    onAddToCart: useCallback((code) => {      // добавление элемента в корзину
      store.addToCart(code);
    }, [store]),

    onShowModal: useCallback(() => {          // тогглим показ модалки
      store.showModal();
    }, [store]),

    addCartModalResult: (() => {              // считаем сумму в корзине
      let sumPrice = 0;
      for (let item of cartList) {
        sumPrice += item.price*item.amount;
      }
      return {title: 'Итого', price: sumPrice}
    })()
  }

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <div className={'controls-action'}>
        <Controls cartList={cartList}/>                     {/* подсчет товаров в корзине */} 
        <Actions actions={[{name: 'Перейти', onClick: callbacks.onShowModal}]}/>
      </div>
      <List list={list}
            actions={[{name: 'Добавить', onClick: callbacks.onAddToCart}]}
            elements={['code', 'title', '', 'price']}/>     {/* какие свойства будут отображаться */}
      <Modal cartList={cartList}
            elements={['code', 'title', 'price', 'amount', {'Controls': <Controls cartList={cartList} onAdd={callbacks.onShowModal}/>}]}  /* какие свойства будут отображаться */
            actionsItem={[{name: 'Удалить', onClick: callbacks.onDeleteItem}]}
            actionsModal={[{name: 'Закрыть', onClick: callbacks.onShowModal}]}
            show={showModal}                                /* модалка открыта или закрыта */
            resultItem={callbacks.addCartModalResult}       /* передаем итоговую сумма */
            resultElements={['', '', 'title', 'price']}/>   {/* передаем куда подставим сумму */}
    </PageLayout>
  );
}

export default App;
