import { Asset, AssetManager } from "./AssetManager";

export class AudioController {
  public static mute() {
    // go through all audio asset and mute all
    const assets = AssetManager.getInstance();
    const allAudio = assets.findAll<AudioAsset>((id, asset) => {
      return asset instanceof AudioAsset;
    });
    Object.entries(allAudio).map(([id, audio]) => {
      audio.mute();
    });
  }

  public static unmute() {
    const assets = AssetManager.getInstance();
    const allAudio = assets.findAll<AudioAsset>((id, asset) => {
      return asset instanceof AudioAsset;
    });
    Object.entries(allAudio).map(([id, audio]) => {
      audio.unmute();
    });
  }
}

export class AudioAsset implements Asset {
  private _isloaded = false;
  private _isLoading = false;
  private src: string;
  private audio = new Audio();

  private isMuted = false;

  constructor(src: string) {
    this.src = src;
  }
  isLoading(): boolean {
    return this._isLoading;
  }

  public mute() {
    this.isMuted = true;
    this.audio.volume = 0;
  }

  public unmute() {
    this.isMuted = false;
    this.audio.volume = 1;
  }

  public getAudio() {
    return this.audio;
  }
  public isLoaded() {
    return this._isloaded;
  }

  public play() {
    this.audio.currentTime = 0;
    this.audio.play();
  }

  public trigger() {
    const newAudio = this.audio.cloneNode() as HTMLAudioElement;
    newAudio.currentTime = 0;
    newAudio.play();
  }

  public loop() {
    this.audio.loop = true;
    this.audio.currentTime = 0;
    this.audio.play();
  }

  public stop() {
    this.audio.pause();
  }

  public load(): Promise<Asset> {
    // start loading
    return new Promise((resolve, reject) => {
      this._isLoading = true;

      // if we have to pull from the server
      this.audio.ondurationchange = () => {
        this._isloaded = true;
        this._isLoading = false;
        resolve(this);
      };
      this.audio.src = this.src;
      this.audio.preload = "auto";

      // if the browser cached of the image already
      if (this.audio.readyState >= this.audio.HAVE_ENOUGH_DATA) {
        console.log(
          `Audio ${this.src} is loaded already, using the browser cached version`
        );
        this._isloaded = true;
        this._isLoading = false;
        resolve(this);
        return;
      }

      // if not then load the audio
      this.audio.load();
    });
  }
}
