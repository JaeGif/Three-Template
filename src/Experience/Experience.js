import * as THREE from 'three';

import Sizes from '../Utils/Sizes';
import Time from '../Utils/Time';
import Camera from '../Camera';
import Renderer from '../Renderer';
import World from '../World/World';
import Resources from '../Utils/Resources';
import sources from '../sources';
import Debug from '../Utils/Debug';

let instance = null;
// Experience is a Singleton
export default class Experience {
  constructor(canvas) {
    // singleton pattern
    if (instance) return instance;
    instance = this;

    // FIRST INSTANTIATION
    // provides global access to the experience
    window.experience = this;
    // options
    this.canvas = canvas;

    // setup
    this.debug = new Debug();
    this.sizes = new Sizes();
    this.time = new Time();
    this.scene = new THREE.Scene();
    this.resources = new Resources(sources);
    this.camera = new Camera();
    this.renderer = new Renderer();
    this.world = new World();
    // resize event
    this.sizes.on('resize', () => {
      this.resize();
    });

    // tick event

    this.time.on('tick', () => {
      this.update();
    });
  }
  resize() {
    this.camera.resize();
    this.renderer.resize();
  }
  update() {
    // ORDER MATTERS
    this.camera.update();
    this.world.update();
    this.renderer.update();
  }
  destroy() {
    this.sizes.off('resize');
    this.time.off('tick');

    // Traverse the whole scene
    this.scene.traverse((child) => {
      // Test if it's a mesh
      if (child instanceof THREE.Mesh) {
        child.geometry.dispose();

        // Loop through the material properties
        for (const key in child.material) {
          const value = child.material[key];

          // Test if there is a dispose function
          if (value && typeof value.dispose === 'function') {
            value.dispose();
          }
        }
      }
    });

    this.camera.controls.dispose();
    this.renderer.instance.dispose();

    if (this.debug.active) this.debug.ui.destroy();
  }
}
