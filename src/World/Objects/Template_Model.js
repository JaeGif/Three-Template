import Experience from '../../Experience/Experience';
import * as THREE from 'three';

export default class Template_Model {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.time = this.experience.time;
    this.debug = this.experience.debug;
    // debug

    // setup from gltf
    this.resource = this.resources.items.foxModel;

    // initialization functions

    this.setModel();
  }
  setModel() {
    this.model = this.resource.scene;
    this.scene.add(this.model);

    // shadows? uncomment
    /*     this.model.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
      }
    }); */
  }

  update() {
    this.animation.mixer.update(this.time.delta / 1000); // ms to s
  }
}
