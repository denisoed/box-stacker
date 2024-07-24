import { Howl } from 'howler';

class PlayAudio {
  constructor(src) {
    this.sound = new Howl({
      src,
      format: 'mp3',
      usingWebAudio: false,
      html5: true,
      mute: false,
      webAudio: false,
      volume: 1,
    });
  }
  play() {
    this.sound.play();
  }
}

export default PlayAudio;
