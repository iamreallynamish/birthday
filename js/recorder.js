/* Reaction recorder.
   Everything stays in the browser: the stream is recorded with
   MediaRecorder into memory and offered back as a local download.
   Nothing is ever sent over the network. */
(function () {
  const state = { stream: null, recorder: null, chunks: [], blob: null, url: null, startedAt: 0, timer: 0, asked: false };

  const supported = () =>
    !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia && window.MediaRecorder);

  /* Ask for camera + microphone exactly once. Resolves true/false; never throws. */
  async function requestPermission() {
    if (state.asked) return !!state.stream;
    state.asked = true;
    if (!supported()) return false;
    try {
      state.stream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 1280 }, height: { ideal: 720 }, facingMode: "user" },
        audio: true,
      });
      return true;
    } catch (err) {
      state.stream = null;
      return false;
    }
  }

  function pickMime() {
    const options = ["video/webm;codecs=vp9,opus", "video/webm;codecs=vp8,opus", "video/webm", "video/mp4"];
    return options.find((m) => MediaRecorder.isTypeSupported(m)) || "";
  }

  /* Start recording. onTick(seconds) is called once a second. */
  function start(videoEl, onTick) {
    if (!state.stream || state.recorder) return false;
    videoEl.srcObject = state.stream;
    videoEl.muted = true;
    videoEl.play().catch(() => {});
    try {
      const mimeType = pickMime();
      state.recorder = new MediaRecorder(state.stream, mimeType ? { mimeType } : undefined);
    } catch (err) {
      return false;
    }
    state.chunks = [];
    state.recorder.ondataavailable = (e) => e.data && e.data.size && state.chunks.push(e.data);
    state.recorder.start(1000);
    state.startedAt = Date.now();
    onTick && onTick(0);
    state.timer = setInterval(() => onTick && onTick(Math.floor((Date.now() - state.startedAt) / 1000)), 1000);
    return true;
  }

  /* Stop recording, switch the camera off, and resolve with { url, blob, ext }. */
  function stop() {
    return new Promise((resolve) => {
      clearInterval(state.timer);
      const rec = state.recorder;
      if (!rec || rec.state === "inactive") return resolve(null);
      rec.onstop = () => {
        const type = rec.mimeType || "video/webm";
        state.blob = new Blob(state.chunks, { type });
        state.url = URL.createObjectURL(state.blob);
        state.stream.getTracks().forEach((t) => t.stop());
        state.stream = null;
        state.recorder = null;
        resolve({ url: state.url, blob: state.blob, ext: type.includes("mp4") ? "mp4" : "webm" });
      };
      rec.stop();
    });
  }

  const isRecording = () => !!state.recorder && state.recorder.state === "recording";
  const hasStream = () => !!state.stream;

  window.Recorder = { supported, requestPermission, start, stop, isRecording, hasStream };
})();
