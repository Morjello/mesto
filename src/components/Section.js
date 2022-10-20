export class Section {
    constructor({items, renderer}, containerSelector) {
        this._items = items;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    //добавление элемента в контейнер
    addItem(element) {
        this._container.prepend(element);
      }

    renderer() {
        this._items.forEach(item => {
          this._renderer(item);
        });
      }
}