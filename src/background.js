// Animierter Hintergrund: langsam wandernde Bühnenlichter (CSS) plus ein paar
// treibende Funken auf einem Canvas. Sparsam gehalten, respektiert
// prefers-reduced-motion und pausiert, wenn der Tab unsichtbar ist.

export function startBackground() {
  if (document.querySelector('.buehne-hintergrund')) return;
  const wrap = document.createElement('div');
  wrap.className = 'buehne-hintergrund';
  wrap.setAttribute('aria-hidden', 'true');
  wrap.innerHTML = `
    <div class="licht licht-a"></div>
    <div class="licht licht-b"></div>
    <div class="licht licht-c"></div>
    <div class="raster"></div>
    <canvas class="funken"></canvas>
    <div class="koernung"></div>`;
  document.body.prepend(wrap);

  const reduziert = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const canvas = wrap.querySelector('canvas');
  if (reduziert) {
    canvas.remove();
    return;
  }
  const ctx = canvas.getContext('2d');
  let w = 0;
  let h = 0;
  let funken = [];
  let laeuft = true;

  function groesse() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    const n = Math.min(70, Math.round((w * h) / 22000));
    funken = Array.from({ length: n }, neuerFunke);
  }

  function neuerFunke() {
    return {
      x: Math.random() * w,
      y: Math.random() * h,
      r: 0.6 + Math.random() * 1.8,
      vx: (Math.random() - 0.5) * 0.15,
      vy: -0.08 - Math.random() * 0.25,
      a: 0.15 + Math.random() * 0.5,
      phase: Math.random() * Math.PI * 2,
      warm: Math.random() < 0.7,
    };
  }

  function zeichne(t) {
    if (!laeuft) return;
    ctx.clearRect(0, 0, w, h);
    for (const f of funken) {
      f.x += f.vx;
      f.y += f.vy;
      f.phase += 0.02;
      if (f.y < -10 || f.x < -10 || f.x > w + 10) Object.assign(f, neuerFunke(), { y: h + 10 });
      const alpha = f.a * (0.6 + 0.4 * Math.sin(f.phase));
      ctx.beginPath();
      ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
      ctx.fillStyle = f.warm ? `rgba(255, 170, 80, ${alpha})` : `rgba(120, 210, 255, ${alpha})`;
      ctx.fill();
    }
    requestAnimationFrame(zeichne);
  }

  window.addEventListener('resize', groesse);
  document.addEventListener('visibilitychange', () => {
    laeuft = !document.hidden;
    if (laeuft) requestAnimationFrame(zeichne);
  });
  groesse();
  requestAnimationFrame(zeichne);
}
