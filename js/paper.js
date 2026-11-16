/* Paper helpers: torn edges, the reusable birthday-card front,
   desk decorations and small floating bits. */
(function () {
  const A = window.Art;

  // Small seeded random generator so the torn edges look the same on every load.
  function rng(seed) {
    let a = seed >>> 0;
    return () => {
      a |= 0; a = (a + 0x6d2b79f5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  /* ── Torn paper ────────────────────────────────────────────────────
     <div class="torn" data-torn="top,bottom" data-paper="gingham">…</div>
     becomes a white fibrous under-layer plus the paper itself, both
     clipped to matching ragged outlines. The wrapper carries the shadow. */
  let tornSeed = 11;
  function tornify(root = document) {
    root.querySelectorAll(".torn:not([data-done])").forEach((el) => {
      el.dataset.done = "1";
      const sides = (el.dataset.torn || "").split(",").map((s) => s.trim());
      const amp = parseFloat(el.dataset.amp || 6);
      const n = parseInt(el.dataset.steps || 34, 10);
      const rnd = rng(tornSeed++ * 97);

      const ragged = (side) => {
        const on = sides.includes(side), out = [];
        let drift = amp * 0.5;
        for (let i = 0; i <= n; i++) {
          drift += (rnd() - 0.5) * amp * 0.7;
          drift = Math.max(0, Math.min(amp, drift));
          out.push(on ? drift + rnd() * amp * 0.35 : 0);
        }
        return out;
      };
      const edge = { top: ragged("top"), right: ragged("right"), bottom: ragged("bottom"), left: ragged("left") };
      const inner = {};
      for (const s in edge) inner[s] = edge[s].map((v) => (sides.includes(s) ? v + 1.2 + rnd() * 2.6 : 0));

      const poly = (o) => {
        const p = [], f = (v) => v.toFixed(1);
        for (let i = 0; i <= n; i++) {
          const x = i === 0 ? `${f(o.left[0])}px` : i === n ? `calc(100% - ${f(o.right[0])}px)` : `${f((i / n) * 100)}%`;
          p.push(`${x} ${f(o.top[i])}px`);
        }
        for (let i = 1; i < n; i++) p.push(`calc(100% - ${f(o.right[i])}px) ${f((i / n) * 100)}%`);
        for (let i = n; i >= 0; i--) {
          const x = i === 0 ? `${f(o.left[n])}px` : i === n ? `calc(100% - ${f(o.right[n])}px)` : `${f((i / n) * 100)}%`;
          p.push(`${x} calc(100% - ${f(o.bottom[i])}px)`);
        }
        for (let i = n - 1; i > 0; i--) p.push(`${f(o.left[i])}px ${f((i / n) * 100)}%`);
        return `polygon(${p.join(",")})`;
      };

      const under = document.createElement("div");
      under.className = "torn-edge";
      under.style.clipPath = poly(edge);
      const paper = document.createElement("div");
      paper.className = `torn-in paper-${el.dataset.paper || "cream"}`;
      paper.style.clipPath = poly(inner);
      while (el.firstChild) paper.appendChild(el.firstChild);
      el.append(under, paper);
    });
  }

  /* ── The birthday-card front (used on screen 1 and as the cover) ── */
  function cardFront() {
    const tile = (ch, i, kind) => {
      const tilt = [-4, 3, -2, 4, -3, 5, -6, 3][(i * 3 + (kind === "day" ? 5 : 0)) % 8];
      const lift = [0, 1.2, -0.8, 1.6, 0.4][i % 5];
      return `<span class="tile tile-${kind} sticker" style="--r:${tilt}deg;--y:${lift}em"><b>${ch}</b></span>`;
    };
    return `
      <div class="bcard-paper paper-cream">
        <div class="torn piece-top" data-torn="bottom" data-paper="gingham" data-amp="9"></div>
        <div class="torn piece-corner" data-torn="top,left" data-paper="gingham" data-amp="9"></div>
      </div>
      <div class="on-card ink i-heart1 sticker">${A.heart()}</div>
      <div class="on-card ink i-spark1 sticker">${A.sparkle()}</div>
      <div class="on-card ink i-spark2 sticker">${A.sparkle()}</div>
      <div class="on-card ink i-spark3 sticker">${A.sparkle()}</div>
      <div class="on-card ink i-heart2 sticker">${A.heart()}</div>
      <div class="on-card ink i-spark4 sticker">${A.sparkle()}</div>
      <div class="on-card ink i-heart3 sticker">${A.heart()}</div>
      <div class="on-card c-bow sticker">${A.bow()}</div>
      <div class="on-card c-cherries sticker">${A.cherries()}</div>
      <div class="on-card c-bunting">${A.bunting("HAPPY")}</div>
      <div class="on-card c-birth">${[..."bIrTh"].map((c, i) => tile(c, i, "birth")).join("")}</div>
      <div class="on-card c-day">${[..."Day"].map((c, i) => tile(c, i, "day")).join("")}</div>
      <div class="on-card c-puppy sticker">${A.puppy()}</div>`;
  }

  /* ── Desk decorations: dried baby's-breath sprigs and a lace doily ── */
  function sprig(seed, w, h, stems) {
    const rnd = rng(seed);
    let twigs = "", buds = "";
    const branch = (x, y, ang, len, depth) => {
      const x2 = x + Math.cos(ang) * len, y2 = y + Math.sin(ang) * len;
      const cx = (x + x2) / 2 + (rnd() - 0.5) * len * 0.35, cy = (y + y2) / 2 + (rnd() - 0.5) * len * 0.35;
      twigs += `<path d="M${x.toFixed(1)},${y.toFixed(1)} Q${cx.toFixed(1)},${cy.toFixed(1)} ${x2.toFixed(1)},${y2.toFixed(1)}" stroke-width="${(depth * 0.6 + 0.7).toFixed(1)}"/>`;
      if (depth <= 0) {
        const k = 2 + ((rnd() * 3) | 0);
        for (let i = 0; i < k; i++) {
          const r = 3.5 + rnd() * 4.5;
          buds += `<circle cx="${(x2 + (rnd() - 0.5) * 12).toFixed(1)}" cy="${(y2 + (rnd() - 0.5) * 12).toFixed(1)}" r="${r.toFixed(1)}" fill="${rnd() > 0.45 ? "#fbf5e6" : "#eadfc6"}"/>`;
        }
        return;
      }
      const kids = 2 + ((rnd() * 2) | 0);
      for (let i = 0; i < kids; i++) branch(x2, y2, ang + (rnd() - 0.5) * 1.25, len * (0.5 + rnd() * 0.25), depth - 1);
    };
    stems.forEach(([x, y, ang, len]) => branch(x, y, ang, len, 3));
    return `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg"><g fill="none" stroke="#a88b5c" stroke-linecap="round">${twigs}</g><g stroke="#d6c59f" stroke-width=".8">${buds}</g></svg>`;
  }

  function doily() {
    const c = 170, lace = "#f7efdc";
    let out = "";
    // scalloped rim, then alternating solid and pierced rings, like crochet
    for (let i = 0; i < 20; i++) {
      const a = (i / 20) * Math.PI * 2;
      out += `<circle cx="${(c + Math.cos(a) * 146).toFixed(1)}" cy="${(c + Math.sin(a) * 146).toFixed(1)}" r="20" fill="none" stroke="${lace}" stroke-width="7"/>`;
    }
    [[128, 12, null], [108, 9, "1 15"], [90, 5, null], [72, 11, "1 17"], [52, 5, null], [36, 9, "1 14"]].forEach(([r, w, dash]) => {
      out += `<circle cx="${c}" cy="${c}" r="${r}" fill="none" stroke="${lace}" stroke-width="${w}" stroke-linecap="round"${dash ? ` stroke-dasharray="${dash}"` : ""}/>`;
    });
    return `<svg viewBox="0 0 340 340" xmlns="http://www.w3.org/2000/svg">${out}<circle cx="${c}" cy="${c}" r="14" fill="${lace}"/></svg>`;
  }

  function decorateDesk(host) {
    host.innerHTML =
      `<div class="decor doily">${doily()}</div>` +
      `<div class="decor sprig sprig-tr">${sprig(5, 420, 520, [[430, 40, 2.75, 150], [430, 120, 2.95, 170], [430, 230, 3.3, 150], [430, 330, 3.45, 130]])}</div>` +
      `<div class="decor sprig sprig-bl">${sprig(23, 380, 300, [[-10, 300, -0.75, 120], [-10, 250, -0.45, 130], [60, 310, -1.1, 110]])}</div>`;
  }

  /* ── Slow floating hearts and sparkles behind everything ── */
  function ambient(host, count = 12) {
    const rnd = rng(99);
    let html = "";
    for (let i = 0; i < count; i++) {
      const isHeart = i % 3 === 0, size = 14 + rnd() * 16;
      html += `<span class="floaty" style="left:${(4 + rnd() * 92).toFixed(1)}%;top:${(6 + rnd() * 86).toFixed(1)}%;width:${size.toFixed(0)}px;` +
        `--dur:${(9 + rnd() * 9).toFixed(1)}s;--delay:${(-rnd() * 12).toFixed(1)}s;--dx:${((rnd() - 0.5) * 30).toFixed(0)}px">` +
        (isHeart ? A.heart("#bcd6f3", "#8fb6e6") : A.sparkle("#8fb6e6")) + `</span>`;
    }
    host.innerHTML = html;
  }

  /* ── Tiny burst of hearts when a decoration is clicked ── */
  function heartBurst(x, y) {
    for (let i = 0; i < 6; i++) {
      const s = document.createElement("span");
      s.className = "burst";
      const ang = (Math.PI * 2 * i) / 6 + Math.random() * 0.8, dist = 34 + Math.random() * 34;
      s.style.cssText = `left:${x}px;top:${y}px;--bx:${(Math.cos(ang) * dist).toFixed(0)}px;--by:${(Math.sin(ang) * dist - 20).toFixed(0)}px;--br:${((Math.random() - 0.5) * 90).toFixed(0)}deg`;
      s.innerHTML = i % 2 ? A.sparkle("#6fa3e0") : A.heart();
      document.body.appendChild(s);
      s.addEventListener("animationend", () => s.remove());
    }
  }

  window.Paper = { rng, tornify, cardFront, decorateDesk, ambient, heartBurst };
})();
