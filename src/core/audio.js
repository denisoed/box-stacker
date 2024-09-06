import * as Tone from "tone";

class PlayAudio {
  constructor(src) {
    this.player = new Tone.Player(src)
      .toDestination();
  }

  stop() {
    this.player.stop();
  }
  play(rate) {
    this.player.playbackRate = rate || 1;
    this.player.start();
  }
}

export default PlayAudio;
