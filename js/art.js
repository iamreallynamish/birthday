/* Hand-drawn SVG illustrations used across the scrapbook.
   Every function returns an SVG string. "Stickers" get a cream cut-out
   margin (filter #cutout) and a slight hand wobble (filter #wobble);
   both filters are defined once in index.html. */
(function () {
  const BLUE = "#4a8fd8", BLUE_L = "#a9c9ef", BLUE_P = "#d9e7f6",
        INK = "#2b2a28", GREEN = "#2f9e6b", CREAM = "#fbf6ea";

  const sticker = (vb, inner, cls = "") =>
    `<svg class="art ${cls}" viewBox="${vb}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">` +
    `<g filter="url(#cutout)"><g filter="url(#wobble)">${inner}</g></g></svg>`;

  const doodle = (vb, inner, cls = "") =>
    `<svg class="art ${cls}" viewBox="${vb}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">` +
    `<g filter="url(#wobble)">${inner}</g></svg>`;

  const Art = {
    /* Big ribbon bow, drawn with a fat blue marker. */
    bow() {
      const loopL = "M150,112 C108,30 14,34 20,100 C25,158 104,142 150,112 Z";
      const loopR = "M150,112 C192,30 286,34 280,100 C275,158 196,142 150,112 Z";
      const tailL = "M143,118 C132,176 108,226 80,270 L118,284 C136,236 150,176 153,120 Z";
      const tailR = "M157,118 C168,176 192,226 220,268 L184,284 C168,236 154,176 149,120 Z";
      const s = `fill="${BLUE_P}" stroke="${BLUE}" stroke-width="13" stroke-linejoin="round" stroke-linecap="round"`;
      const hi = `fill="none" stroke="${BLUE}" stroke-width="7" stroke-linecap="round" opacity=".85"`;
      return sticker("-10 10 320 300",
        `<path d="${tailL}" ${s}/><path d="${tailR}" ${s}/>` +
        `<path d="M112,250 C124,214 134,180 140,146" ${hi}/><path d="M190,250 C178,214 168,180 161,146" ${hi}/>` +
        `<path d="${loopL}" ${s}/><path d="${loopR}" ${s}/>` +
        `<path d="M128,104 C100,62 50,62 50,98 C52,124 96,118 124,106" ${hi}/>` +
        `<path d="M172,104 C200,62 250,62 250,98 C248,124 204,118 176,106" ${hi}/>` +
        `<ellipse cx="150" cy="114" rx="17" ry="20" fill="${BLUE}" stroke="${BLUE}" stroke-width="6"/>`,
        "bow");
    },

    /* Two blue cherries tied with a little green bow. */
    cherries() {
      return sticker("0 0 200 190",
        `<path d="M58,104 C66,70 84,48 104,36" fill="none" stroke="${GREEN}" stroke-width="7" stroke-linecap="round"/>` +
        `<path d="M142,108 C138,74 124,52 104,36" fill="none" stroke="${GREEN}" stroke-width="7" stroke-linecap="round"/>` +
        `<path d="M104,36 C84,12 70,22 80,34 C88,42 98,40 104,36 C112,10 132,14 128,28 C124,40 112,40 104,36" fill="none" stroke="${GREEN}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>` +
        `<circle cx="56" cy="138" r="40" fill="${BLUE}" stroke="${INK}" stroke-width="2.5"/>` +
        `<circle cx="144" cy="142" r="40" fill="${BLUE}" stroke="${INK}" stroke-width="2.5"/>` +
        `<path d="M34,124 C38,112 48,106 58,106" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".45"/>` +
        `<path d="M122,128 C126,116 136,110 146,110" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".45"/>`,
        "cherries");
    },

    /* A small white puppy with long floppy ears. */
    puppy() {
      const line = `stroke="${INK}" stroke-width="2.6" stroke-linejoin="round" stroke-linecap="round"`;
      return sticker("0 0 250 190",
        `<path d="M96,112 C82,150 92,176 104,178 C112,180 118,174 124,174 C130,174 136,180 146,178 C160,174 166,148 150,112 Z" fill="#fff" ${line}/>` +
        `<path d="M156,150 C172,150 178,134 166,128 C158,126 156,134 162,136" fill="none" ${line}/>` +
        `<path d="M82,62 C46,30 4,40 8,70 C12,96 56,96 84,84" fill="#fff" ${line}/>` +
        `<path d="M168,62 C204,30 246,40 242,70 C238,96 194,96 166,84" fill="#fff" ${line}/>` +
        `<path d="M22,74 C34,86 56,88 76,80" fill="none" stroke="${BLUE_L}" stroke-width="6" stroke-linecap="round" opacity=".8"/>` +
        `<path d="M228,74 C216,86 194,88 174,80" fill="none" stroke="${BLUE_L}" stroke-width="6" stroke-linecap="round" opacity=".8"/>` +
        `<ellipse cx="125" cy="78" rx="52" ry="42" fill="#fff" ${line}/>` +
        `<ellipse cx="104" cy="80" rx="5.5" ry="7.5" fill="${BLUE}"/><ellipse cx="146" cy="80" rx="5.5" ry="7.5" fill="${BLUE}"/>` +
        `<ellipse cx="90" cy="94" rx="8" ry="5" fill="${BLUE_L}" opacity=".7"/><ellipse cx="160" cy="94" rx="8" ry="5" fill="${BLUE_L}" opacity=".7"/>` +
        `<path d="M114,94 q5.5,7 11,0 q5.5,7 11,0" fill="none" ${line}/>` +
        `<path d="M104,128 C98,134 98,142 106,142" fill="none" ${line}/><path d="M146,128 C152,134 152,142 144,142" fill="none" ${line}/>`,
        "puppy");
    },

    /* Just the puppy's face – used as the maze token. */
    puppyFace() {
      const line = `stroke="${INK}" stroke-width="2.4" stroke-linecap="round"`;
      return `<g class="token-art">` +
        `<path d="M-13,-5 C-27,-17 -40,-10 -38,0 C-36,9 -22,8 -13,4 Z" fill="#fff" ${line}/>` +
        `<path d="M13,-5 C27,-17 40,-10 38,0 C36,9 22,8 13,4 Z" fill="#fff" ${line}/>` +
        `<ellipse cx="0" cy="0" rx="17" ry="14" fill="#fff" ${line}/>` +
        `<ellipse cx="-6.5" cy="0" rx="2" ry="2.8" fill="${BLUE}"/><ellipse cx="6.5" cy="0" rx="2" ry="2.8" fill="${BLUE}"/>` +
        `<path d="M-3.5,5 q1.8,2.4 3.5,0 q1.8,2.4 3.5,0" fill="none" ${line} stroke-width="1.6"/></g>`;
    },

    heartPath: "M50,88 C22,64 4,46 10,26 C16,8 40,8 50,28 C60,8 84,8 90,26 C96,46 78,64 50,88 Z",
    sparklePath: "M50,4 C54,36 64,46 96,50 C64,54 54,64 50,96 C46,64 36,54 4,50 C36,46 46,36 50,4 Z",

    /* Ink doodles (no cut-out edge): drawn straight onto the paper. */
    heart(fill = BLUE_L, stroke = "#7ba9e2") {
      return doodle("0 0 100 100", `<path d="${Art.heartPath}" fill="${fill}" stroke="${stroke}" stroke-width="5" stroke-linejoin="round"/>`, "heart");
    },
    sparkle(stroke = "#7ba9e2") {
      return doodle("0 0 100 100", `<path d="${Art.sparklePath}" fill="none" stroke="${stroke}" stroke-width="6" stroke-linejoin="round"/>`, "sparkle");
    },
    /* Cut-out paper heart (used for the seals). */
    heartSticker(fill = BLUE) {
      return sticker("-8 -6 116 110", `<path d="${Art.heartPath}" fill="${fill}" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round"/>` +
        `<path d="M22,30 C24,22 30,18 36,18" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".5"/>`, "heart-sticker");
    },

    /* "HAPPY" bunting: swallow-tail flags hanging on a string. */
    bunting(text = "HAPPY") {
      const n = text.length, W = 460, sag = 46;
      let flags = "";
      for (let i = 0; i < n; i++) {
        const t = (i + 0.5) / n;
        const x = 20 + t * (W - 40);
        const y = 14 + sag * 4 * t * (1 - t) * 0.9 + (1 - t) * 34; // string drops to the left
        const slope = (sag * 3.6 * (1 - 2 * t) - 34) / (W - 40);
        const ang = (Math.atan(slope) * 180) / Math.PI + (i % 2 ? 3 : -3);
        flags +=
          `<g transform="translate(${x.toFixed(1)},${y.toFixed(1)}) rotate(${ang.toFixed(1)})">` +
          `<path d="M-32,0 L32,0 L32,84 L0,62 L-32,84 Z" fill="${CREAM}" stroke="${INK}" stroke-width="2.2" stroke-linejoin="round"/>` +
          `<path d="M-32,22 H32 M-32,40 H32" stroke="${BLUE_L}" stroke-width="7" opacity=".45"/>` +
          `<text x="0" y="46" text-anchor="middle" font-family="Caveat, cursive" font-weight="700" font-size="46" fill="#2f55c4">${text[i]}</text></g>`;
      }
      const yAt = (t) => 14 + sag * 4 * t * (1 - t) * 0.9 + (1 - t) * 34;
      let d = `M0,${yAt(0) - 2}`;
      for (let t = 0.05; t <= 1.001; t += 0.05) d += ` L${(20 + t * (W - 40) + (t >= 1 ? 20 : 0)).toFixed(1)},${(yAt(t) - 2).toFixed(1)}`;
      return `<svg class="art bunting" viewBox="-6 -4 472 150" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">` +
        `<g filter="url(#softshadow)"><g filter="url(#wobble)"><path d="${d}" fill="none" stroke="${INK}" stroke-width="1.8"/>${flags}</g></g></svg>`;
    },

    /* Padlock for the password screen. */
    padlock() {
      return sticker("0 0 100 124",
        `<path class="shackle" d="M30,58 V38 a20,20 0 0 1 40,0 V58" fill="none" stroke="${INK}" stroke-width="8" stroke-linecap="round"/>` +
        `<rect x="16" y="54" width="68" height="56" rx="10" fill="${BLUE}" stroke="${INK}" stroke-width="2.6"/>` +
        `<path transform="translate(35,66) scale(.3)" d="${Art.heartPath}" fill="${CREAM}"/>`,
        "padlock");
    },

    /* Tiny camera doodle for the recording note. */
    camera() {
      return sticker("0 0 120 96",
        `<rect x="10" y="26" width="100" height="60" rx="9" fill="${BLUE_P}" stroke="${INK}" stroke-width="2.6"/>` +
        `<path d="M40,26 L48,13 H72 L80,26" fill="${BLUE_P}" stroke="${INK}" stroke-width="2.6" stroke-linejoin="round"/>` +
        `<circle cx="60" cy="56" r="20" fill="#fff" stroke="${INK}" stroke-width="2.6"/>` +
        `<path transform="translate(47,44) scale(.26)" d="${Art.heartPath}" fill="${BLUE}"/>` +
        `<circle cx="96" cy="38" r="4" fill="#d9534f"/>`,
        "camera");
    },
  };

  window.Art = Art;
})();
