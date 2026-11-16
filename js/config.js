/* ════════════════════════════════════════════════════════════════════
   ✎  EVERYTHING YOU NEED TO EDIT LIVES IN THIS FILE
   ────────────────────────────────────────────────────────────────────
   Password, hints, the three questions, and the birthday message.
   Anything wrapped in [ square brackets ] is a placeholder to replace.
   Save the file and refresh the browser to see your changes.
   ════════════════════════════════════════════════════════════════════ */

window.BIRTHDAY_CONFIG = {

  /* ── Names ─────────────────────────────────────────────────────── */
  herName: "[Her name]",
  yourName: "[Your name]",

  /* ── Screen 1 · the lock ───────────────────────────────────────── */
  password: "2107",

  lock: {
    title: "psst… this one's for you",
    message:
      "There's something special tucked inside this card, but it's locked. " +
      "Only you know the four numbers that open it.",
    inputLabel: "four little numbers",
    hintButton: "need a hint?",
    noMoreHints: "that's every hint I've got ♡",
    success: "you remembered ♡",
  },

  // Revealed one at a time, in this order.
  hints: [
    "It isn't your birthday, and it isn't mine… but it's a day that belongs to both of us.",
    "It's a date, not a number. Day first, then month.",
    "Think back to the day “you and me” quietly turned into “us”.",
    "It was the middle of the year: the twenty-first day of the seventh month.",
  ],

  // Shown (at random) when she types the wrong code.
  wrongPasswordMessages: [
    "hmm, not quite… try again?",
    "so close! (maybe. I can't actually tell.)",
    "nope, but you look cute trying ♡",
    "the lock says no. a hint might help!",
  ],

  /* ── Camera · reaction recording ───────────────────────────────── */
  recording: {
    enabled: true, // set to false to skip the camera completely
    consentTitle: "one tiny thing first…",
    consentMessage:
      "When the next page opens, your reaction will be recorded automatically " +
      "using your camera and microphone, so this moment can be kept as a little memory.",
    consentPrivacy:
      "It stays only on this device. Nothing is uploaded anywhere, and you'll get to watch and save it at the end.",
    consentYes: "okay, I'm ready ♡",
    consentNo: "continue without recording",
    toast: "A little memory is being recorded ♡",
    caption: "a little memory ♡",
    savedCaption: "memory saved ♡",
    fileName: "birthday-reaction",
  },

  /* ── Screen 2 · the sealed card ────────────────────────────────── */
  card: {
    instruction: "this card is sealed with three little hearts…",
    introTitle: "before you open it",
    introMessage:
      "Answer three questions about us to peel off the seals. " +
      "Each right answer takes you one step further through the little maze.",
    startButton: "let's go ♡",
  },

  /* ── The three questions ───────────────────────────────────────────
     • question      – the text she sees
     • options       – as many answers as you like (3 or 4 looks best)
     • correctIndex  – which option is right, counting from 0
     • cheer         – short note shown when she gets it right
     ─────────────────────────────────────────────────────────────── */
  questions: [
    {
      question: "[ Question 1: write your first question about the two of you here ]",
      options: [
        "[ Correct answer ]",
        "[ Wrong answer ]",
        "[ Wrong answer ]",
        "[ Wrong answer ]",
      ],
      correctIndex: 0,
      cheer: "yes! one seal down ♡",
    },
    {
      question: "[ Question 2: write your second question here ]",
      options: [
        "[ Wrong answer ]",
        "[ Correct answer ]",
        "[ Wrong answer ]",
        "[ Wrong answer ]",
      ],
      correctIndex: 1,
      cheer: "of course you knew ♡",
    },
    {
      question: "[ Question 3: write your third question here ]",
      options: [
        "[ Wrong answer ]",
        "[ Wrong answer ]",
        "[ Correct answer ]",
        "[ Wrong answer ]",
      ],
      correctIndex: 2,
      cheer: "that's all three ♡",
    },
  ],

  // Shown (at random) when she picks a wrong answer.
  wrongAnswerMessages: [
    "nope! try again ♡",
    "hmm… are you sure about that?",
    "the puppy is judging you a little",
    "not that one, silly",
    "so close. (not really.) try again!",
  ],

  /* ── Screen 3 · the birthday message ───────────────────────────────
     Each string is one paragraph. Add or remove paragraphs freely;
     the text shrinks slightly by itself if a page gets too full.
     ─────────────────────────────────────────────────────────────── */
  message: {
    greeting: "Dear [Her name],",

    leftPage: [
      "[ Your first paragraph goes here. Replace this text in js/config.js. ]",
      "[ Second paragraph: a few more lines of your own words. ]",
      "[ Third paragraph, if you'd like one on this page. ]",
    ],

    rightPage: [
      "[ The message continues on the right-hand page. ]",
      "[ Another paragraph of your own words. ]",
      "[ Your closing lines. ]",
    ],

    signOff: "Happy birthday ♡",
    signature: "[Your name]",

    replayButton: "↺ write it again",
    skipButton: "show the whole letter",
    closeButton: "close the card ♡", // takes her on to her reaction video and the cake
  },

  /* ── Lilies (her favourite flowers) ────────────────────────────── */
  lilies: {
    note: "lilies, because they're your favourite ♡",
  },

  /* ── After the card closes · her reaction video ────────────────── */
  reaction: {
    caption: "this was you, a minute ago ♡",
    saveButton: "↓ keep this video",
    nextButton: "one more thing… ♡",
  },

  /* ── The cake ──────────────────────────────────────────────────── */
  cake: {
    candles: "18", // one number candle per digit
    titleLines: ["hAppY", "bIrThDaY"], // cut-out letters, black on blue-edged paper
    titleAccent: "baby", // cut-out letters, blue on black-edged paper
    love: "i love you",
    blowButton: "blow out the candles",
    wish: "make a wish ♡",
    againQuestion: "do you want to read it again?",
    againYes: "yes, again ♡",
    againReaction: "watch my reaction again",
  },

  /* ── Typing animation speed ────────────────────────────────────── */
  typing: {
    msPerCharacter: 36, // lower = faster
    pauseBetweenParagraphs: 520, // milliseconds
  },
};
