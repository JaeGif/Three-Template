import EventEmitter from './EventEmitter';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export default class Resources extends EventEmitter {
  constructor(sources) {
    super();

    this.sources = sources;

    //setup
    // loaded items
    this.items = {};
    // remaining count
    this.toLoad = this.sources.length;
    // current count
    this.loaded = 0;

    this.setLoaders();
    this.startLoading();
  }
  setLoaders() {
    // if model uses draco add draco loader
    // only instantiate required loaders
    this.loaders = {};
    this.loaders.gltfLoader = new GLTFLoader();
    this.loaders.textureLoader = new THREE.TextureLoader();
    this.loaders.cubeTextureLoader = new THREE.CubeTextureLoader();
  }

  startLoading() {
    // loop all loaders

    for (const source of this.sources) {
      // test type for correct loader
      switch (source.type) {
        case 'gltfModel':
          this.loaders.gltfLoader.load(source.path, (file) => {
            this.sourceLoaded(source, file);
          });
          break;
        case 'texture':
          this.loaders.textureLoader.load(source.path, (file) => {
            this.sourceLoaded(source, file);
          });
        case 'cubeTexture':
          this.loaders.cubeTextureLoader.load(source.path, (file) => {
            this.sourceLoaded(source, file);
          });
          break;

        default:
          throw new Error('missing loader');
      }
    }
  }
  sourceLoaded(source, file) {
    this.items[source.name] = file;
    this.loaded++;
    if (this.loaded === this.toLoad) {
      this.trigger('ready');
    }
  }
}
