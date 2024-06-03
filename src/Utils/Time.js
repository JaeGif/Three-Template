import EventEmitter from './EventEmitter';

export default class Time extends EventEmitter {
  constructor() {
    super();

    // setup
    this.start = Date.now(); // ms
    this.current = this.start;
    this.elapsed = 0;
    this.delta = 16; // default screens run 60fps ~16ms/frame

    window.requestAnimationFrame(() => {
      this.tick();
    });
  }
  tick() {
    const currentTime = Date.now();
    this.delta = currentTime - this.current;
    this.current = currentTime;
    this.elapsed = this.current - this.start;

    this.trigger('tick');
    window.requestAnimationFrame(() => {
      this.tick();
    });
  }
}
