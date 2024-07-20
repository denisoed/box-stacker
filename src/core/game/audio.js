class PlayAudio {
  constructor() {
    this.audioContext = new(window.AudioContext || window.webkitAudioContext)();
    this.audioBuffer = null;
  }
  async loadSound(url) {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    this.audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
  }
  play() {
    const source = this.audioContext.createBufferSource();
    source.buffer = this.audioBuffer;
    source.connect(this.audioContext.destination);
    source.start(0);
  }
}

export default PlayAudio;
