class HTMLRenderer {
  /** Настройки поверхности @type Object<String> */
  #canvas_surface = {};

  /** Элемент canvas @type {Canvas} */
  #canvas_element = null;

  /** Контекст для 2D @type {CanvasRenderingContext2D} */
  #context_2d = null;

  // TEST
  #dom_url    = null;
  #test_image = null;
  #test_svg = null;
  #test_url = null;
  #test_blob = null;

  /**
   * @param {String} access_token - ключ доступа к данным документа на сервере
   */
  constructor() {
    HTMLRenderer.instance = this;

    // URL Utility
    this.#dom_url = window.URL || URL || window.webkitURL || window;

    // Инициализация
    this.initSurface();

    // Тестовый HTML
    const test_html = `
    <div><button class="btn btn-xs btn-info">Button</button></div>
    `;

    // Тестовая отрисовка HTML-тегов
    this.#test_svg = `<svg xmlns='http://www.w3.org/2000/svg' width='${this.#canvas_surface.width}px' height='${this.#canvas_surface.height}px'>
      <foreignObject width='100%' height='100%'>
          <div xmlns='http://www.w3.org/1999/xhtml' >
              ${test_html}
          </div>
      </foreignObject>
    </svg>`;

    // Image
    this.#test_image = new Image();
    this.#test_image.onload = () => {
      this.#context_2d.drawImage( this.#test_image, 0, 0 );
    };
    this.#test_blob = new Blob([this.#test_svg], {type: "image/svg+xml;charset=utf-8"});
    this.#test_url = this.#dom_url.createObjectURL(this.#test_blob);
    this.#test_image.src = this.#test_url;
  }

  initSurface() {
    // DOM-Element
    let canvas = $('#document_renderer_canvas');
    if ( !canvas || !canvas.length ) {
      console.error('QDocumentsViewer::initSurface: canvas-element not found');
    }
    this.#canvas_element = canvas[0];

    // Context-2D
    this.#context_2d = this.#canvas_element.getContext('2d');

    // Surface
    this.#canvas_surface['width']  = canvas.width();
    this.#canvas_surface['height'] = canvas.height();

    this.#context_2d.canvas.width  = this.#canvas_surface['width'];
    this.#context_2d.canvas.height = this.#canvas_surface['height'];
  }

};
