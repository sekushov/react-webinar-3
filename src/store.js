/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
    // определим максимальный id в массиве - стартовый id для генератора
    this.id = (() => {
      let max = 0;
      this.state.list.forEach(item => {
        if (item.code > max) max = item.code;
      });
      return max
    })();
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
    this.id++;  // запускаем генератор
    this.setState({
      ...this.state,
      list: [...this.state.list, {code: this.id, title: 'Новая запись'}]
    })
  };

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.filter(item => item.code !== code)
    })
  };
  // отображение количества выделений
  showSelectCount(item) {
    if (!item.selectCount) {
      item.selectCount = 0;
      item.firstTitle = item.title;
    }
    item.selectCount++;
    // подбираем окончание раз(а)
    const returnRaz = (num) => {
      if (num % 10 === 2 || num % 10 === 3 || num % 10 === 4) {
        if (num % 100 === 12 || num % 100 === 13 || num % 100 === 14) return 'раз'
        return 'раза'
      } else return 'раз'
    }
    return `${item.firstTitle} | Выделяли ${item.selectCount} ${returnRaz(item.selectCount)}`
  }
  /**
   * Выделение записи по коду
   * @param code
   */
  selectItem(code, e) {
    if (e.target.parentElement.classList != 'Item-actions') {   // чтобы select не срабатывал при удалении
      this.setState({
        ...this.state,
        list: this.state.list.map(item => {
          if (item.code === code) {
            item.selected = !item.selected;
            if (item.selected) {
              item.title = this.showSelectCount(item);
            }
          } else {
            item.selected = false;
          }
          return item;
        })
      })
    }
  }
}

export default Store;
