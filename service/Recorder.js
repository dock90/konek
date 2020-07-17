const MIME_TYPE = "audio/webm";

export function isSupported() {
  if (
    !process.browser ||
    !navigator.mediaDevices ||
    !navigator.mediaDevices.getUserMedia
  ) {
    return false;
  }

  if (!window.MediaRecorder) {
    return false;
  }

  return window.MediaRecorder.isTypeSupported(MIME_TYPE);
}

const STATUS_INITIALIZING = "initializing",
  STATUS_UNSUPPORTED = "unsupported",
  STATUS_READY = "ready",
  STATUS_RECORDING = "recording",
  STATUS_STOPPED = "stopped";

export function Recorder() {
  this.status = STATUS_INITIALIZING;
  this.startTime = null;
  this.stopTime = null;
  this._init = new Promise(async (resolve, reject) => {
    if (!isSupported()) {
      this.status = STATUS_UNSUPPORTED;
      reject("Recording not supported on this browser.");
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false
      });

      this._recorder = new window.MediaRecorder(stream, {
        mimeType: MIME_TYPE,
        audioBitsPerSecond: 128000
      });
    } catch (e) {
      reject(e);
      return;
    }

    this._chunks = [];
    this._recorder.ondataavailable = e => {
      this._chunks.push(e.data);
    };

    this.status = STATUS_READY;
    resolve();
  });

  this._init.catch(e => {
    console.error(e);
  });
}

Recorder.prototype.length = function() {
  if (!this.startTime) {
    return 0;
  }
  if (!this.stopTime) {
    return Date.now() - this.startTime;
  }
  return this.stopTime - this.startTime;
};

Recorder.prototype.start = async function() {
  await this._init;

  if (this.status !== STATUS_READY) {
    // Probably was an error somewhere.
    return;
  }

  this._recorder.start();
  this.startTime = Date.now();
  this.status = STATUS_RECORDING;
};

Recorder.prototype.stop = function() {
  this._recorder.stop();
  this.stopTime = Date.now();
  this.status = STATUS_STOPPED;
};

Recorder.prototype.getFile = async function() {
  if (this._blob) {
    return this._blob;
  }
  return new Promise(resolve => {
    this._recorder.onstop = () => {
      this._blob = new File(this._chunks, "recording.ogg", {
        type: MIME_TYPE
      });
      resolve(this._blob);
    };
  });
};

Recorder.prototype.destroy = function() {
  for (const audioTrack of this._recorder.stream.getAudioTracks()) {
    audioTrack.stop();
  }
  this._chunks = [];
  this._recorder = null;
  this._blob = null;
};
