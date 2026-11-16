/* Paper confetti: little cut-out scraps in the card's own colours. */
(function () {
  const COLORS = ["#4a8fd8", "#a9c9ef", "#fbf6ea", "#ffffff", "#2f6fbd", "#d9e7f6", "#2f9e6b"];
  let raf = 0;

  function heart(ctx, s) {
    ctx.beginPath();
    ctx.moveTo(0, s * 0.35);
    ctx.bezierCurveTo(-s, -s * 0.35, -s * 0.45, -s, 0, -s * 0.4);
    ctx.bezierCurveTo(s * 0.45, -s, s, -s * 0.35, 0, s * 0.35);
    ctx.fill();
  }

  function launch(duration = 5200) {
    const canvas = document.getElementById("confetti");
    const ctx = canvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const W = (canvas.width = innerWidth * dpr), H = (canvas.height = innerHeight * dpr);
    canvas.classList.add("on");
    cancelAnimationFrame(raf);

    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const parts = [];
    const add = (x, y, vx, vy) => parts.push({
      x, y, vx, vy,
      w: (7 + Math.random() * 9) * dpr, h: (5 + Math.random() * 7) * dpr,
      rot: Math.random() * 6.28, vr: (Math.random() - 0.5) * 0.22,
      flip: Math.random() * 6.28, vf: 0.08 + Math.random() * 0.12,
      color: COLORS[(Math.random() * COLORS.length) | 0],
      shape: Math.random() < 0.22 ? "heart" : Math.random() < 0.3 ? "check" : "rect",
    });
    const total = reduced ? 50 : 170;
    for (let i = 0; i < total; i++) {
      if (i % 3 === 0) add(Math.random() * W, -Math.random() * H * 0.4, (Math.random() - 0.5) * 2 * dpr, (1 + Math.random() * 2) * dpr);
      else {
        const left = i % 2 === 0;
        add(left ? -10 : W + 10, H * (0.55 + Math.random() * 0.2),
          (left ? 1 : -1) * (5 + Math.random() * 9) * dpr, -(8 + Math.random() * 9) * dpr);
      }
    }

    const start = performance.now();
    (function frame(now) {
      const t = now - start;
      ctx.clearRect(0, 0, W, H);
      for (const p of parts) {
        p.vy += 0.16 * dpr; p.vx *= 0.992; p.vy = Math.min(p.vy, 5.5 * dpr);
        p.x += p.vx + Math.sin(p.flip) * 0.8 * dpr; p.y += p.vy;
        p.rot += p.vr; p.flip += p.vf;
        ctx.save();
        ctx.translate(p.x, p.y); ctx.rotate(p.rot); ctx.scale(1, Math.cos(p.flip));
        ctx.globalAlpha = Math.max(0, Math.min(1, (duration - t) / 900));
        ctx.shadowColor = "rgba(70,50,20,.25)"; ctx.shadowBlur = 3 * dpr; ctx.shadowOffsetY = 1.5 * dpr;
        ctx.fillStyle = p.color;
        if (p.shape === "heart") heart(ctx, p.w * 0.75);
        else {
          ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
          if (p.shape === "check") { // a scrap of gingham
            ctx.shadowColor = "transparent";
            ctx.fillStyle = "rgba(255,255,255,.55)";
            ctx.fillRect(-p.w / 2, -p.h / 6, p.w, p.h / 3);
            ctx.fillRect(-p.w / 6, -p.h / 2, p.w / 3, p.h);
          }
        }
        ctx.restore();
      }
      if (t < duration) raf = requestAnimationFrame(frame);
      else { ctx.clearRect(0, 0, W, H); canvas.classList.remove("on"); }
    })(start);
  }

  window.Confetti = { launch };
})();
