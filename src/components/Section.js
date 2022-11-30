export class Section {
  #renderer
  #container
    constructor({ renderer }, containerSelector) {
        this.#renderer = renderer;
        this.#container = document.querySelector(containerSelector);
    }

    //добавление элемента в контейнер
    addItem(element) {
        this.#container.prepend(element);
      }

    renderer(items, userId) {
        items.forEach(item => {
          this.#renderer(item, userId);
        });
      }
}