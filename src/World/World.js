import Experience from '../Experience/Experience';
// import Environment from './Environment';

export default class World {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;

    this.resources = this.experience.resources;
    this.resources.on('ready', () => {
      // setup env after resources are ready
      // ORDER MATTERS

     // this.environment = new Environment();
    });
  }
  update() {
    // if model needs updating, update here
  }
}
