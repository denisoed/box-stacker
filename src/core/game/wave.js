class Wave {
  constructor(scene) {
    this.wave = null;
    this.waveScale = 0;
    this.waveOpacity = 0;
    this.waveTimer = 0;
    this.waveActive = false;
    this.scene = scene;
  }

  createWave(block) {
    if (!block) return;
    this.waveActive = false;
    const geometry = new THREE.BoxGeometry(block.dimension.width, 0, block.dimension.depth);
    const material = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 1
    });
    this.wave = new THREE.Mesh(geometry, material);
    this.wave.position.set((block.position.x + block.dimension.width / 2), block.position.y, block.position.z + block.dimension.depth / 2);
    this.waveScale = 0.5;
    this.waveOpacity = 0.5;
    this.waveActive = true;
    this.scene.add(this.wave);
  }

  removeWave() {
    if (this.wave) {
      this.scene.remove(this.wave);
      this.wave = null;
      this.waveActive = false;
      this.waveTimer = 0;
      this.waveScale = 0;
      this.waveOpacity = 0;
    }
  }

  tick() {
    if (this.waveActive) {
      this.waveTimer += 1;
      this.waveScale += 0.03;
      this.waveOpacity -= 0.01;
      this.wave.scale.set(this.waveScale, this.waveScale, this.waveScale);
      this.wave.material.opacity = this.waveOpacity;

      if (this.waveTimer > 100) {
        this.removeWave();
      }
    }
  }
}

export default Wave;