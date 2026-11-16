/* The journey:
   lock → (recording notice) → sealed card + three questions → confetti
   → card opens → two-page message types itself out. */
(function () {
  const C = window.BIRTHDAY_CONFIG, A = window.Art, P = window.Paper, R = window.Recorder;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  const pick = (list, last) => {
    if (list.length < 2) return list[0];
    let v; do v = list[(Math.random() * list.length) | 0]; while (v === last);
    return v;
  };
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  function show(id) {
    $$(".screen").forEach((s) => s.classList.toggle("active", s.id === id));
  }

  /* ═════════ Setup ═════════ */
  function init() {
    P.decorateDesk($("#deskDecor"));
    P.ambient($("#ambient"));
    $("#introCard").innerHTML = P.cardFront();
    $("#coverCard").innerHTML = P.cardFront();
    $("#lockIcon").innerHTML = A.padlock();
    $("#consentArt").innerHTML = A.camera();
    $("#quizPuppy").innerHTML = A.puppy();
    buildMessagePages();
    buildSeals();
    buildMaze();
    P.tornify();

    initLock();
    initConsent();
    initQuiz();
    initMessageControls();

    // Clicking any decoration makes it wiggle and scatter a few hearts.
    document.addEventListener("click", (e) => {
      const s = e.target.closest(".sticker");
      if (!s || s.closest(".seal")) return;
      s.classList.remove("boing"); void s.offsetWidth; s.classList.add("boing");
      P.heartBurst(e.clientX, e.clientY);
    });
  }

  /* ═════════ 1 · Lock ═════════ */
  function initLock() {
    $("#lockTitle").textContent = C.lock.title;
    $("#lockMessage").textContent = C.lock.message;
    $("#digitsLabel").textContent = C.lock.inputLabel;
    const digits = $$(".digit"), feedback = $("#lockFeedback"), row = $("#lockRow");
    let lastMsg = "", done = false;

    const check = async () => {
      const code = digits.map((d) => d.value).join("");
      if (code.length < digits.length || done) return;
      if (code === String(C.password)) {
        done = true;
        digits.forEach((d) => { d.readOnly = true; d.blur(); });
        row.classList.add("unlocked");
        feedback.textContent = C.lock.success;
        feedback.className = "lock-feedback hand good";
        P.heartBurst(row.getBoundingClientRect().left + 40, row.getBoundingClientRect().top + 30);
        await wait(1500);
        $("#screen-lock").classList.add("leaving");
        await wait(650);
        afterUnlock();
      } else {
        lastMsg = pick(C.wrongPasswordMessages, lastMsg);
        feedback.textContent = lastMsg;
        feedback.className = "lock-feedback hand bad";
        row.classList.remove("shake"); void row.offsetWidth; row.classList.add("shake");
        await wait(520);
        digits.forEach((d) => (d.value = ""));
        digits[0].focus();
      }
    };

    digits.forEach((d, i) => {
      d.addEventListener("input", () => {
        d.value = d.value.replace(/\D/g, "").slice(-1);
        if (d.value && i < digits.length - 1) digits[i + 1].focus();
        check();
      });
      d.addEventListener("keydown", (e) => {
        if (e.key === "Backspace" && !d.value && i > 0) { digits[i - 1].value = ""; digits[i - 1].focus(); }
        if (e.key === "ArrowLeft" && i > 0) digits[i - 1].focus();
        if (e.key === "ArrowRight" && i < digits.length - 1) digits[i + 1].focus();
      });
      d.addEventListener("focus", () => d.select());
      d.addEventListener("paste", (e) => {
        e.preventDefault();
        const txt = (e.clipboardData.getData("text") || "").replace(/\D/g, "").slice(0, digits.length);
        [...txt].forEach((ch, k) => (digits[k].value = ch));
        (digits[Math.min(txt.length, digits.length - 1)]).focus();
        check();
      });
    });

    // Progressive hints
    const btn = $("#hintBtn"), list = $("#hints");
    let shown = 0;
    const label = () => {
      btn.textContent = shown < C.hints.length
        ? `${shown ? "another hint?" : C.lock.hintButton}  (${shown}/${C.hints.length})`
        : C.lock.noMoreHints;
      btn.disabled = shown >= C.hints.length;
    };
    btn.addEventListener("click", () => {
      if (shown >= C.hints.length) return;
      const li = document.createElement("li");
      li.className = "hint";
      li.style.setProperty("--r", `${[-1.4, 1.1, -0.7, 1.6][shown % 4]}deg`);
      li.innerHTML = `<span class="hint-n">hint ${shown + 1}</span>${esc(C.hints[shown])}`;
      list.appendChild(li);
      shown++;
      label();
    });
    label();
    setTimeout(() => digits[0].focus({ preventScroll: true }), 900);
  }

  /* ═════════ 1½ · Recording notice ═════════ */
  function initConsent() {
    const rc = C.recording;
    $("#consentTitle").textContent = rc.consentTitle;
    $("#consentMessage").textContent = rc.consentMessage;
    $("#consentPrivacy").textContent = rc.consentPrivacy;
    $("#consentYes").textContent = rc.consentYes;
    $("#consentNo").textContent = rc.consentNo;
    $("#vfCaption").textContent = rc.caption;

    let busy = false;
    $("#consentYes").addEventListener("click", async () => {
      if (busy) return; busy = true;
      $("#consentYes").textContent = "one second…";
      await R.requestPermission(); // asked exactly once; a "no" simply continues without recording
      enterCardPage();
    });
    $("#consentNo").addEventListener("click", () => { if (!busy) { busy = true; enterCardPage(); } });
  }

  function afterUnlock() {
    if (C.recording.enabled && R.supported()) show("screen-consent");
    else enterCardPage();
  }

  /* ═════════ 2 · Card page + automatic recording ═════════ */
  async function enterCardPage() {
    show("screen-card");
    if (!R.hasStream()) return;
    const vf = $("#viewfinder");
    const fmt = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
    const ok = R.start($("#vfVideo"), (s) => ($("#vfTime").textContent = fmt(s)));
    if (!ok) return;
    vf.hidden = false;
    requestAnimationFrame(() => vf.classList.add("in"));
    await wait(700);
    toast(C.recording.toast, 5200);
  }

  function toast(text, ms) {
    const t = $("#toast");
    $("#toastText").textContent = text;
    t.classList.add("in");
    setTimeout(() => t.classList.remove("in"), ms);
  }

  async function finishRecording() {
    if (!R.isRecording()) return;
    const result = await R.stop();
    const vf = $("#viewfinder"), video = $("#vfVideo");
    if (!result) { vf.classList.remove("in"); return; }
    vf.classList.add("saved");
    video.srcObject = null;
    video.src = result.url;
    video.autoplay = false;
    video.pause();
    $("#vfCaption").textContent = C.recording.savedCaption;
    $("#vfActions").hidden = false;
    const dl = $("#vfDownload");
    dl.href = result.url;
    dl.download = `${C.recording.fileName}.${result.ext}`;

    const replay = $("#vfReplay");
    const close = () => { vf.classList.remove("playing"); video.pause(); video.controls = false; replay.textContent = "▸ replay"; };
    replay.addEventListener("click", () => {
      if (vf.classList.contains("playing")) return close();
      vf.classList.add("playing");
      video.muted = false; video.controls = true; video.currentTime = 0;
      video.play().catch(() => {});
      replay.textContent = "× close";
    });
  }

  /* ═════════ Seals + maze ═════════ */
  function buildSeals() {
    $("#seals").innerHTML = C.questions.map((_, i) =>
      `<span class="seal" style="--i:${i};--r:${[-10, 8, -6][i % 3]}deg">${A.heartSticker()}</span>`).join("");
  }

  const maze = { path: null, token: null, total: 0, at: 0 };
  function buildMaze() {
    const n = C.questions.length;
    const d = "M26,84 H96 V34 H166 V84 H236 V34 H306 V84 H372";
    $("#maze").innerHTML =
      `<svg viewBox="0 0 400 118" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="maze progress">
        <g filter="url(#softshadow)"><path d="${d}" fill="none" stroke="#fbf6ea" stroke-width="24" stroke-linecap="round" stroke-linejoin="round"/></g>
        <path d="${d}" fill="none" stroke="#a9c9ef" stroke-width="2.4" stroke-dasharray="2 9" stroke-linecap="round" stroke-linejoin="round"/>
        <path id="mazePath" d="${d}" fill="none" stroke="#4a8fd8" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/>
        <g id="mazeGates"></g>
        <g id="mazeToken">${A.puppyFace()}</g>
      </svg>`;
    maze.path = $("#mazePath"); maze.token = $("#mazeToken");
    maze.total = maze.path.getTotalLength();
    maze.path.style.strokeDasharray = maze.total;
    maze.path.style.strokeDashoffset = maze.total;
    let gates = "";
    for (let i = 1; i <= n; i++) {
      const p = maze.path.getPointAtLength((maze.total * i) / n);
      gates += `<g class="gate" data-gate="${i - 1}" transform="translate(${p.x - 13},${p.y - 13}) scale(.26)">` +
        `<path d="${A.heartPath}" fill="#fbf6ea" stroke="#2b2a28" stroke-width="9" stroke-linejoin="round"/></g>`;
    }
    $("#mazeGates").innerHTML = gates;
    placeToken(0);
  }
  function placeToken(len) {
    const p = maze.path.getPointAtLength(len);
    maze.token.setAttribute("transform", `translate(${p.x.toFixed(1)},${(p.y - 3).toFixed(1)}) scale(.82)`);
    maze.path.style.strokeDashoffset = maze.total - len;
    maze.at = len;
  }
  function walkTo(stage) {
    const from = maze.at, to = (maze.total * stage) / C.questions.length, t0 = performance.now(), dur = 1000;
    return new Promise((res) => {
      (function step(now) {
        const k = Math.min(1, (now - t0) / dur), e = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
        placeToken(from + (to - from) * e);
        if (k < 1) requestAnimationFrame(step);
        else { const g = $(`.gate[data-gate="${stage - 1}"]`); g && g.classList.add("passed"); res(); }
      })(t0);
    });
  }

  /* ═════════ Questions ═════════ */
  let lastWrong = "";
  function initQuiz() {
    $("#cardInstruction").textContent = C.card.instruction;
    const body = $("#quizBody");
    body.innerHTML =
      `<p class="tiny-label">${esc(C.card.introTitle)}</p>
       <p class="hand quiz-q">${esc(C.card.introMessage)}</p>
       <div class="btn-row"><button class="tag-btn primary" id="quizStart" type="button">${esc(C.card.startButton)}</button></div>`;
    $("#quizStart").addEventListener("click", () => swapQuestion(0));
  }

  async function swapQuestion(i) {
    const note = $(".quiz-note"), body = $("#quizBody");
    note.classList.add("swap");
    await wait(360);
    renderQuestion(i);
    note.style.setProperty("--tilt", `${[-1.2, 1, -0.6][i % 3]}deg`);
    note.classList.remove("swap");
    body.querySelector("button")?.focus({ preventScroll: true });
  }

  function renderQuestion(i) {
    const q = C.questions[i], body = $("#quizBody"), n = C.questions.length;
    body.innerHTML =
      `<p class="tiny-label">question ${i + 1} of ${n}</p>
       <p class="hand quiz-q">${esc(q.question)}</p>
       <div class="options">${q.options.map((o, k) =>
         `<button class="option" type="button" data-k="${k}" style="--r:${[-0.8, 0.6, 0.9, -0.5][k % 4]}deg">
            <span class="opt-letter">${"abcdefgh"[k]}</span><span class="opt-text">${esc(o)}</span></button>`).join("")}</div>`;
    let locked = false;
    $$(".option", body).forEach((btn) => btn.addEventListener("click", async () => {
      if (locked || btn.disabled) return;
      const k = +btn.dataset.k;
      if (k !== q.correctIndex) {
        btn.classList.add("wrong"); btn.disabled = true;
        lastWrong = pick(C.wrongAnswerMessages, lastWrong);
        bubble(lastWrong, false);
        const pup = $("#quizPuppy");
        pup.classList.remove("nope"); void pup.offsetWidth; pup.classList.add("nope");
        return;
      }
      locked = true;
      btn.classList.add("right");
      $$(".option", body).forEach((b) => b !== btn && b.classList.add("dim"));
      bubble(q.cheer || "yes ♡", true);
      const pup = $("#quizPuppy");
      pup.classList.remove("hop"); void pup.offsetWidth; pup.classList.add("hop");
      const r = btn.getBoundingClientRect();
      P.heartBurst(r.left + 24, r.top + r.height / 2);
      $$(".seal")[i]?.classList.add("off");
      await walkTo(i + 1);
      await wait(650);
      if (i + 1 < n) swapQuestion(i + 1);
      else reveal();
    }));
  }

  let bubbleTimer = 0;
  function bubble(text, good) {
    const b = $("#quizBubble");
    b.textContent = text;
    b.className = `bubble hand in ${good ? "good" : ""}`;
    clearTimeout(bubbleTimer);
    bubbleTimer = setTimeout(() => b.classList.remove("in"), 2600);
  }

  /* ═════════ Confetti → card opens → message ═════════ */
  async function reveal() {
    const scene = $("#scene");
    window.Confetti.launch();
    $("#screen-card").scrollTo({ top: 0, behavior: "smooth" }); // matters on small, stacked screens
    scene.classList.add("reveal");          // questions drift away, card takes the stage
    await wait(1700);
    scene.classList.add("open");            // the card physically opens
    await wait(3100);
    scene.classList.add("opened");
    fitMessage();
    await finishRecording();                // stop the camera once the card is open
    $("#msgControls").classList.add("in");
    typeMessage();
  }

  /* ═════════ Two-page message ═════════ */
  function buildMessagePages() {
    const m = C.message;
    const line = (cls, text) => `<p class="ln ${cls}" data-text="${esc(text)}"><span class="t"></span><span class="r">${esc(text)}</span></p>`;
    $("#pageLeft").innerHTML =
      `<div class="pg-paper paper-cream">
         <div class="torn pg-strip-top" data-torn="bottom" data-paper="gingham" data-amp="8"></div>
       </div>
       <div class="pg-deco d-bow sticker">${A.bow()}</div>
       <div class="pg-deco d-cherries sticker">${A.cherries()}</div>
       <div class="pg-deco ink d-s1 sticker">${A.sparkle()}</div>
       <div class="pg-deco ink d-h1 sticker">${A.heart()}</div>
       <div class="pg-deco ink d-s2 sticker">${A.sparkle()}</div>
       <div class="pg-text pg-text-left">${line("greet", m.greeting)}${m.leftPage.map((t) => line("para", t)).join("")}</div>`;
    $("#pageRight").innerHTML =
      `<div class="pg-paper paper-cream">
         <div class="torn pg-strip-corner" data-torn="top,left" data-paper="gingham" data-amp="8"></div>
       </div>
       <div class="pg-deco ink d-h2 sticker">${A.heart()}</div>
       <div class="pg-deco ink d-s3 sticker">${A.sparkle()}</div>
       <div class="pg-deco ink d-s4 sticker">${A.sparkle()}</div>
       <div class="pg-deco ink d-h3 sticker">${A.heart()}</div>
       <div class="pg-deco d-puppy sticker">${A.puppy()}</div>
       <div class="pg-text pg-text-right">${m.rightPage.map((t) => line("para", t)).join("")}${line("sign", m.signOff)}${line("sign name", m.signature)}</div>`;
    $("#replayMsg").textContent = m.replayButton;
    $("#skipMsg").textContent = m.skipButton;
  }

  // If a page is too full, shrink the handwriting a little until it fits.
  function fitMessage() {
    $$(".pg-text").forEach((box) => {
      let size = 6;
      box.style.setProperty("--mfs", `${size}em`);
      while (box.scrollHeight > box.clientHeight + 1 && size > 3) {
        size -= 0.15;
        box.style.setProperty("--mfs", `${size}em`);
      }
    });
  }

  let typingRun = 0;
  function setLine(p, count) {
    const text = p.dataset.text;
    p.querySelector(".t").textContent = text.slice(0, count);
    p.querySelector(".r").textContent = text.slice(count);
  }
  async function typeMessage() {
    const run = ++typingRun, lines = [...$$("#pageLeft .ln"), ...$$("#pageRight .ln")]; // left page first
    const speed = C.typing.msPerCharacter, pause = C.typing.pauseBetweenParagraphs;
    lines.forEach((p) => { setLine(p, 0); p.classList.remove("writing"); });
    $("#scene").classList.remove("typed");
    await wait(500);
    for (const p of lines) {
      const text = p.dataset.text;
      p.classList.add("writing");
      for (let i = 1; i <= text.length; i++) {
        if (run !== typingRun) return;
        setLine(p, i);
        const ch = text[i - 1];
        await wait(/[.!?…]/.test(ch) ? speed * 7 : /[,;:—]/.test(ch) ? speed * 4 : speed * (0.7 + Math.random() * 0.6));
      }
      p.classList.remove("writing");
      if (run !== typingRun) return;
      await wait(pause);
    }
    if (run === typingRun) $("#scene").classList.add("typed");
  }
  function showWholeMessage() {
    typingRun++;
    $$(".ln").forEach((p) => { setLine(p, p.dataset.text.length); p.classList.remove("writing"); });
    $("#scene").classList.add("typed");
  }
  function initMessageControls() {
    $("#replayMsg").addEventListener("click", typeMessage);
    $("#skipMsg").addEventListener("click", showWholeMessage);
    addEventListener("resize", () => $("#scene").classList.contains("opened") && fitMessage());
  }

  document.fonts && document.fonts.ready ? document.fonts.ready.then(init) : init();
})();
