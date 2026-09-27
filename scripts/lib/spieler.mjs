// Gemeinsame Hilfen für die E2E-Skripte: einen Schritt im Browser lösen.
export const md = (s) => String(s).replace(/`/g, '').replace(/\*\*/g, '').trim();

export async function loeseSchritt(page, step, karte, { etappen = [] } = {}) {
  switch (step.type) {
    case 'quiz': {
      const soll = md(step.options[step.correct]);
      for (const b of await karte.$$('.quiz-option')) {
        const t = (await b.innerText()).replace(/^[A-D]\s*/, '').trim();
        if (t === soll) {
          await b.click();
          return;
        }
      }
      throw new Error(`Quiz-Option nicht gefunden: ${soll}`);
    }
    case 'fill': {
      const inputs = await karte.$$('.fill-input');
      const accept = Array.isArray(step.accept[0]) ? step.accept : [step.accept];
      for (let i = 0; i < inputs.length; i++) await inputs[i].fill(accept[i][0]);
      await karte.$eval('.btn-primaer', (b) => b.click());
      return;
    }
    case 'order': {
      for (const zeile of step.lines) {
        let ok = false;
        for (const b of await karte.$$('.sortier-pool .sortier-zeile')) {
          if ((await b.innerText()).replace(/^\+\s*/, '').trim() === zeile.trim()) {
            await b.click();
            ok = true;
            break;
          }
        }
        if (!ok) throw new Error(`Sortier-Zeile nicht gefunden: ${zeile}`);
      }
      await karte.$eval('.schritt-buttons .btn-primaer', (b) => b.click());
      return;
    }
    case 'pair': {
      for (let i = 0; i < step.pairs.length; i++) {
        await (await karte.$(`.paar-links .paar-item[data-i="${i}"]`)).click();
        const soll = md(step.pairs[i][1]);
        let ok = false;
        for (const r of await karte.$$('.paar-rechts .paar-item')) {
          if ((await r.innerText()).trim() === soll) {
            await r.click();
            ok = true;
            break;
          }
        }
        if (!ok) throw new Error(`Paar nicht gefunden: ${soll}`);
      }
      return;
    }
    case 'bug': {
      await (await karte.$$('.bug-zeile'))[step.line].click();
      return;
    }
    case 'code': {
      let solution = step.solution;
      let editable = step.editable || Object.keys(step.solution || {});
      if (step.etappe) {
        const e = etappen.find((x) => x.id === step.etappe);
        editable = e.editable;
        solution = Object.fromEntries(e.editable.map((k) => [k, e.files[k]]));
      }
      for (const k of editable) {
        await karte.$eval(`.editor-wrap[data-datei="${k}"]`, (wrap, text) => {
          const v = wrap.cmView;
          v.dispatch({ changes: { from: 0, to: v.state.doc.length, insert: text } });
        }, solution[k]);
      }
      await page.waitForTimeout(300);
      await karte.$eval('.schritt-buttons .btn-primaer', (b) => b.click());
      await page.waitForSelector('.schritt:not([hidden]) .rueckmeldung-ok', { timeout: 15000 });
      return;
    }
    default:
      return;
  }
}
