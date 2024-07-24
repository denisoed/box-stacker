import Stage from '@/core/game/stage';
import Block from '@/core/game/block';
import Wave from '@/core/game/wave';
import Emitter from '@/core/emitter';
import PlayAudio from '@/core/audio';
import { SCORE_CHANGE } from '@/config/events';
import { AUDIO_LOCAL_STORAGE_KEY } from '@/config';

class Game {
  constructor() {
    this.STATES = {
      'LOADING': 'loading',
      'PLAYING': 'playing',
      'READY': 'ready',
      'ENDED': 'ended',
      'RESETTING': 'resetting'
    };
    this.blocks = [];
    this.state = this.STATES.LOADING;
    this.emitter = new Emitter();
    this.stage = new Stage();
    this.wave = new Wave(this.stage);
    this.mainContainer = document.getElementById('container');
    this.instructions = document.getElementById('instructions');
    this.score = 0;
    this.clickAudio = new PlayAudio('click.mp3');
    this.bonusAudio = new PlayAudio('bonus.mp3');
    this.newBlocks = new THREE.Group();
    this.placedBlocks = new THREE.Group();
    this.choppedBlocks = new THREE.Group();
    this.stage.add(this.newBlocks);
    this.stage.add(this.placedBlocks);
    this.stage.add(this.choppedBlocks);
    this.addBlock();
    this.tick();
    this.updateState(this.STATES.READY);
  }
  updateState(newState) {
    for (let key in this.STATES)
      this.mainContainer.classList.remove(this.STATES[key]);
    this.mainContainer.classList.add(newState);
    this.state = newState;
  }
  onAction() {
    switch (this.state) {
      case this.STATES.READY:
        this.startGame();
        break;
      case this.STATES.PLAYING:
        this.placeBlock();
        break;
      case this.STATES.ENDED:
        this.restartGame();
        break;
    }
  }
  startGame() {
    if (this.state != this.STATES.PLAYING) {
      this.score = 0;
      this.emitter.emit(SCORE_CHANGE, this.score);
      this.updateState(this.STATES.PLAYING);
      this.addBlock();
    }
  }
  restartGame() {
    this.updateState(this.STATES.RESETTING);
    let oldBlocks = this.placedBlocks.children;
    let removeSpeed = 0.2;
    let delayAmount = 0.02;
    for (let i = 0; i < oldBlocks.length; i++) {
      TweenLite.to(oldBlocks[i].scale, removeSpeed, {
        x: 0,
        y: 0,
        z: 0,
        delay: (oldBlocks.length - i) * delayAmount,
        ease: Power1.easeIn,
        onComplete: () => this.placedBlocks.remove(oldBlocks[i])
      });
      TweenLite.to(oldBlocks[i].rotation, removeSpeed, {
        y: 0.5,
        delay: (oldBlocks.length - i) * delayAmount,
        ease: Power1.easeIn
      });
    }
    let cameraMoveSpeed = removeSpeed * 2 + (oldBlocks.length * delayAmount);
    this.stage.setCamera(2, cameraMoveSpeed);
    let countdown = {
      value: this.blocks.length - 1
    };
    TweenLite.to(countdown, cameraMoveSpeed, {
      value: 0,
      onUpdate: () => {
        this.score = Math.round(countdown.value);
        this.emitter.emit(SCORE_CHANGE, this.score);
      }
    });
    this.blocks = this.blocks.slice(0, 1);
    setTimeout(() => {
      this.startGame();
    }, cameraMoveSpeed * 1000);
  }
  placeBlock() {
    const audioIsDisabled = localStorage.getItem(AUDIO_LOCAL_STORAGE_KEY) === 'true';

    if (!audioIsDisabled) {
      this.clickAudio.stop();
      this.clickAudio.play();
    }

    this.wave.removeWave();
    let currentBlock = this.blocks[this.blocks.length - 1];
    let newBlocks = currentBlock.place();
    if (newBlocks.bonus) {
      this.wave.createWave(currentBlock);

      if (!audioIsDisabled) {
        this.bonusAudio.stop();
        this.bonusAudio.play();
      }
    }
    this.newBlocks.remove(currentBlock.mesh);
    if (newBlocks.placed)
      this.placedBlocks.add(newBlocks.placed);
    if (newBlocks.chopped) {
      this.choppedBlocks.add(newBlocks.chopped);
      let positionParams = {
        y: '-=30',
        ease: Power1.easeIn,
        onComplete: () => this.choppedBlocks.remove(newBlocks.chopped)
      };
      let rotateRandomness = 10;
      let rotationParams = {
        delay: 0.05,
        x: newBlocks.plane == 'z' ? ((Math.random() * rotateRandomness) - (rotateRandomness / 2)) : 0.1,
        z: newBlocks.plane == 'x' ? ((Math.random() * rotateRandomness) - (rotateRandomness / 2)) : 0.1,
        y: Math.random() * 0.1,
      };
      if (newBlocks.chopped.position[newBlocks.plane] > newBlocks.placed.position[newBlocks.plane]) {
        positionParams[newBlocks.plane] = '+=' + (40 * Math.abs(newBlocks.direction));
      } else {
        positionParams[newBlocks.plane] = '-=' + (40 * Math.abs(newBlocks.direction));
      }
      TweenLite.to(newBlocks.chopped.position, 1, positionParams);
      TweenLite.to(newBlocks.chopped.rotation, 1, rotationParams);
    }
    this.addBlock();
  }
  addBlock() {
    let lastBlock = this.blocks[this.blocks.length - 1];
    if (lastBlock && lastBlock.state == lastBlock.STATES.MISSED) {
      return this.endGame();
    }
    this.score = this.blocks.length - 1;
    this.emitter.emit(SCORE_CHANGE, this.score);
    let newKidOnTheBlock = new Block(lastBlock);
    this.newBlocks.add(newKidOnTheBlock.mesh);
    this.blocks.push(newKidOnTheBlock);
    this.stage.setCamera(this.blocks.length * 2);
    if (this.blocks.length >= 5)
      this.instructions.classList.add('hide');
  }
  endGame() {
    this.updateState(this.STATES.ENDED);
  }
  tick() {
    this.blocks[this.blocks.length - 1].tick();
    this.stage.render();
    this.wave.tick();
    requestAnimationFrame(() => {
      this.tick();
    });
  }
  on(event, cb) {
    this.emitter.on(event, cb);
  }
  off(event, cb) {
    this.emitter.off(event, cb);
  }
}

export default Game