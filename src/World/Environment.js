import Experience from '../Experience/Experience';

import * as THREE from 'three';
export default class Environment {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.debug = this.experience.debug;
    // Debug
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder('environment');
    }
    this.setEnvironmentMap();
  }

  setEnvironmentMap() {
    this.environmentMap = {};
    this.environmentMap.texture = this.resources.items.environmentMapTexture;
    this.environmentMap.texture.colorSpace = THREE.SRGBColorSpace;
    this.scene.environment = this.environmentMap.texture;

    // handles in case texture loads before objects
    this.environmentMap.updateMaterial = () => {
      this.scene.traverse((child) => {
        if (
          child instanceof THREE.Mesh &&
          child.material instanceof THREE.MeshStandardMaterial
        ) {
          child.material.envMap = this.environmentMap.texture;
          child.material.envMapIntensity = this.environmentMap.intensity;
          child.material.needsUpdate = true;
        }
      });
    };
    this.environmentMap.updateMaterial();

    // Debug
    if (this.debug.active) {
      this.debugFolder
        .add(this.environmentMap, 'intensity')
        .name('envMapIntensity')
        .min(0)
        .max(4)
        .step(0.001)
        .onChange(this.environmentMap.updateMaterials);
    }
  }
}
