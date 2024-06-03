import EventEmitter from './EventEmitter';

export default class Sizes extends EventEmitter {
  constructor() {
    super();
    this.width = window.innerWidth;
    this.height = window.innerHeight + 1;
    this.pixelRatio = Math.min(window.devicePixelRatio, 2);

    // resize event
    window.addEventListener('resize', () => {
      this.width = window.innerWidth;
      this.height = window.innerHeight + 1;
      this.pixelRatio = Math.min(window.devicePixelRatio, 2);

      this.trigger('resize');
    });
  }
}
