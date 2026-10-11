import{g as f,l as _,B as k,U as L,e as r,aa as D,M as w}from"./index-q1WDSUZc.js";async function j(c){const e=f(),[l,d]=await Promise.all([_(),k()]),i={};await Promise.all(l.flatMap(t=>t.lessons.map(s=>L(t.id,s).then(a=>i[`${t.id}/${s}`]=a.title).catch(()=>i[`${t.id}/${s}`]=s))));const h=Object.values(e.lessons).filter(t=>t.done).length,$=l.reduce((t,s)=>t+s.lessons.length,0),b=Object.values(e.lessons).reduce((t,s)=>t+(s.stars||0),0),u=e.stats.correct+e.stats.wrong?Math.round(e.stats.correct/(e.stats.correct+e.stats.wrong)*100):0,g=Object.values(e.leitner).filter(t=>t.box>=4).length,p=new Date().toLocaleDateString("de-DE",{day:"2-digit",month:"2-digit",year:"numeric"});c.innerHTML=`
    <div class="bericht auftritt">
      <div class="bericht-leiste">
        <a class="zurueck" href="#/ich">← Ich</a>
        <button class="btn btn-primaer" type="button" id="drucken">🖨 Drucken / als PDF speichern</button>
      </div>
      <div class="karte bericht-blatt">
        <h1>Lernbericht WebWerkstatt</h1>
        <p class="bericht-meta"><strong>${r(e.name||"__________________")}</strong> · Stand ${p} · Level ${D(e.xp)} · ${e.xp} XP</p>
        <div class="statistik-grid bericht-stats">
          <div class="stat-kachel"><strong>${h}/${$}</strong><small>Lektionen</small></div>
          <div class="stat-kachel"><strong>${b}</strong><small>Sterne</small></div>
          <div class="stat-kachel"><strong>${e.stats.codePassed}</strong><small>Code-Aufgaben</small></div>
          <div class="stat-kachel"><strong>${u} %</strong><small>Treffsicherheit</small></div>
          <div class="stat-kachel"><strong>${Object.values(e.boss).filter(t=>t.passed).length}/${l.length}</strong><small>Abnahmen</small></div>
          <div class="stat-kachel"><strong>${g}/${d.length}</strong><small>Konzepte sicher</small></div>
        </div>
        <h2>Orte</h2>
        <table class="pruef-tabelle bericht-tabelle">
          <thead><tr><th>Ort</th><th>Lektionen</th><th>Sterne</th><th>Duell</th></tr></thead>
          <tbody>
            ${l.map((t,s)=>{const a=t.lessons.filter(o=>e.lessons[`${t.id}/${o}`]?.done).length,m=t.lessons.reduce((o,v)=>o+(e.lessons[`${t.id}/${v}`]?.stars||0),0),n=e.boss[t.id];return`<tr><td>${s+1} · ${r(t.title)}</td><td>${a}/${t.lessons.length}</td><td>${m}/${t.lessons.length*3}</td><td>${n?`${Math.round(n.best*100)} % ${n.passed?"✔":"✘"}${n.versuche>1?` (${n.versuche} Versuche)`:""}`:"–"}</td></tr>`}).join("")}
          </tbody>
        </table>
        <h2>Lektionen im Detail</h2>
        <table class="pruef-tabelle bericht-tabelle">
          <thead><tr><th>Lektion</th><th>Sterne</th><th>Fehler</th><th>Tipps</th><th>Durchläufe</th><th>zuletzt</th></tr></thead>
          <tbody>
            ${l.flatMap(t=>t.lessons.map(s=>{const a=e.lessons[`${t.id}/${s}`];return a?.done?`<tr><td>${r(i[`${t.id}/${s}`])}</td><td>${"★".repeat(a.stars)}${"☆".repeat(3-a.stars)}</td><td>${a.fehler??"–"}</td><td>${a.tipps??"–"}</td><td>${a.versuche||1}</td><td>${a.lastAt?new Date(a.lastAt).toLocaleDateString("de-DE"):""}</td></tr>`:""})).join("")||'<tr><td colspan="6">Noch keine Lektion abgeschlossen.</td></tr>'}
          </tbody>
        </table>
        <h2>Meilensteine</h2>
        <p>${w.filter(t=>e.badges[t.id]).map(t=>`${t.icon} ${r(t.titel)}`).join(" · ")||"Noch keine."}</p>
        <h2>Was noch wackelt (Leitner-Box 1–2)</h2>
        <p>${Object.entries(e.leitner).filter(([,t])=>t.box<=2).map(([t])=>r(d.find(s=>s.id===t)?.titel||t)).join(" · ")||"Nichts – alles Gelernte sitzt bisher."}</p>
        <p class="bericht-fuss">WebWerkstatt · Der Bericht stammt aus dem Browser-Spielstand der Lernenden und ist nicht fälschungssicher.</p>
      </div>
    </div>`,c.querySelector("#drucken").addEventListener("click",()=>window.print())}export{j as renderBericht};
