import {generateCode} from "./utils";

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    }
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  /**
   * Добавление новой записи
   */
  addItem() {
    this.setState({
      ...this.state,
      list: [...this.state.list, {code: generateCode(), title: 'Новая запись'}]
    })
  };

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code, stateItem) {
    this.setState({
      ...this.state,
      // Новый список, в котором не будет удаляемой записи
      [stateItem]: this.state[stateItem].filter(item => item.code !== code)
    })
  };

  /**
   * Выделение записи по коду
   * @param code
   */
  selectItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (item.code === code) {
          // Смена выделения и подсчёт
          return {
            ...item,
            selected: !item.selected,
            count: item.selected ? item.count : item.count + 1 || 1,
          };
        }
        // Сброс выделения если выделена
        return item.selected ? {...item, selected: false} : item;
      })
    })
  };

  /**
   * Добавление записи в корзину
   * @param code
   */
  addToCart(code) {
    let repeat = false;
    this.state.cartList.forEach(item => {
      if (item.code === code) {
        repeat = true;
        this.setState({
          ...this.state,
          cartList: this.state.cartList.map(item2 => {
            if (item2.code === item.code) {
              return {
                ...item2, amount: item2.amount ? ++item2.amount : 2
              }
            }
            return item2
          })
        })
      }
    });
    this.setState({
      ...this.state,
      cartList: [...this.state.cartList, 
        ...this.state.list
        .filter(item2 => item2.code === code && !repeat)
        .map(item => {
          return {
            ...item, amount: 1
          }
        }
      )]
    });
  }

  showModal() {
    this.setState({
      ...this.state,
      showModal: this.state.showModal ? false : true
    })
  }
}

export default Store;
