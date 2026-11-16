/* ════════════════════════════════════════════════════════════════════
   ✎  EVERYTHING YOU NEED TO EDIT LIVES IN THIS FILE
   ────────────────────────────────────────────────────────────────────
   Password, hints, the three questions, and the birthday message.
   Anything wrapped in [ square brackets ] is a placeholder to replace.
   Save the file and refresh the browser to see your changes.
   ════════════════════════════════════════════════════════════════════ */

window.BIRTHDAY_CONFIG = {

  /* ── Names ─────────────────────────────────────────────────────── */
  herName: "Sanaa",
  yourName: "[Your name]",

  /* ── Opening · big text, then the date rolls in on cubes ───────── */
  intro: {
    enabled: true,
    hello: "Hey!",
    line: "It's your day today",
    highlight: "your day", // these words are written in blue
    // One cube per digit; any other character becomes a gap between groups.
    // "16/11/26" gives six cubes. Write "16/11/2026" if you'd like eight.
    date: "16/11/26",
    dateLabels: ["day", "month", "year"],
  },

  /* ── Screen 1 · the lock ───────────────────────────────────────── */
  password: "2106",

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
    "Where it all began.",
    "June.",
    "21.",
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
      question: "What is our favourite place?",
      options: ["Hauz Khas", "Connaught Place", "Tarun Enclave", "Bal Bharati"],
      correctIndex: 0,
      cheer: "yes! one seal down ♡",
    },
    {
      question: "What is our favourite way of commuting?",
      options: ["Scooty", "Auto", "Cab", "Car"],
      correctIndex: 0,
      cheer: "of course you knew ♡",
    },
    {
      question: "What is our favourite food spot?",
      options: ["Social", "AS Momos", "Kwality Momos", "McDonald's"],
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
    greeting: "Happy birthday, my princess ♡",

    leftPage: [
      "You've been so much to me, more than I know how to say. The last few months were hard on both of us, you know that better than anyone, and somehow you were still more than amazing through all of it.",
      "You're the most beautiful, most angel-looking girl I've ever fucking met. I'm proud every single day that I get to be your boyfriend and call you my girlfriend.",
      "I really, really miss you here.",
    ],

    rightPage: [
      "I'm so proud of you that I run out of words. Whatever you do, you do it the best.",
      "You know me better than I know myself, and you are such a fucking amazing human being.",
      "So stay weird. And most importantly, stay MINE.",
      "I really, really fucking love you.",
    ],

    signOff: "Happy birthday, Sanaa ♡",
    signature: "I love you. Again.",

    replayButton: "↺ write it again",
    skipButton: "show the whole letter",
    closeButton: "close the card ♡", // takes her on to her reaction video and the cake
  },

  /* ── Lilies (her favourite flowers) ────────────────────────────── */
  lilies: {
    note: "lilies, because they're your favourite ♡",
    // Hidden note: appears when she clicks the lily beside the cake.
    secretNote:
      "I really am fine with what you say on this, but I wanted to try. " +
      "Can we be what we want to be? Or do you feel better about it?",
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
