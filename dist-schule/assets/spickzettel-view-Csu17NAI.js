import{B as v,l as m,g,q as b,U as $,e as o}from"./index-q1WDSUZc.js";import{k as S}from"./nachschlagen-CiV0SDqc.js";import"./preview-dc6lnWue.js";const L=[{id:"web",titel:"Web-Grundlagen",farbe:"var(--basics)"},{id:"html",titel:"HTML – das Gerüst",farbe:"var(--html)"},{id:"css",titel:"CSS – Licht & Farbe",farbe:"var(--css)"},{id:"recht",titel:"Recht im Web",farbe:"var(--projekt)"},{id:"js",titel:"JavaScript – Strom",farbe:"var(--js)"}];async function j(l){const[a,h]=await Promise.all([v(),m()]),r=g(),k=b(),n={};await Promise.all(h.flatMap((e,s)=>e.lessons.map(t=>$(e.id,t).then(i=>(i.konzepte||[]).forEach(p=>n[p]=n[p]||{runde:s+1,kapitel:e,lesson:t,titel:i.title})).catch(()=>{}))));const u=e=>k||!!r.leitner[e],c=e=>(r.leitner[e]?.box||0)>=4,z=a.filter(e=>!!r.leitner[e.id]).length,f=a.filter(e=>c(e.id)).length;l.innerHTML=`
    <div class="auftritt spickzettel-seite">
      <a class="zurueck" href="#/">← Hyperia</a>
      <div class="spickzettel-kopf">
        <div>
          <span class="chip chip-farbe" style="--farbe: var(--spark)">Werkstatt-Handbuch</span>
          <h1>📖 Spickzettel</h1>
          <p style="color:var(--ink-2);max-width:60ch">Jedes Konzept als kurze Karte: Regel, Beispiel, Merksatz. Die Karten füllen sich, sobald du die passende Lektion abgeschlossen hast – und bleiben während jeder Aufgabe über „Nachlesen“ erreichbar. Lösungen stehen hier nie, Beispiele immer.</p>
        </div>
        <div class="karte spickzettel-stand">
          <div><strong>${z}</strong><small>/ ${a.length} Konzepte gelernt</small></div>
          <div><strong>${f}</strong><small>sicher (Soundcheck Box 4+)</small></div>
        </div>
      </div>
      <input class="nachschlagen-suche spickzettel-suche" type="search" placeholder="Suchen … (z. B. padding, Link, Liste)" aria-label="Spickzettel durchsuchen">
      ${L.map(e=>{const s=a.filter(t=>t.block===e.id);return`<section class="spickzettel-block" data-block="${e.id}">
          <h2 style="color:${e.farbe}">${e.titel} <span class="chip">${s.filter(t=>!!r.leitner[t.id]).length} / ${s.length}</span></h2>
          <div class="konzept-raster">
            ${s.map(t=>{if(u(t.id))return`<div class="konzept-zelle ${c(t.id)?"sicher":""}">${S(t)}${c(t.id)?'<span class="konzept-status">✔ sitzt</span>':'<span class="konzept-status">gelernt</span>'}</div>`;const i=n[t.id];return`<div class="konzept-zelle gesperrt"><article class="konzept-karte" style="--farbe:${e.farbe}"><div class="konzept-kopf"><span class="chip">🔒</span><h4>${o(t.titel)}</h4></div><p class="nachschlagen-leer">${i?`Kommt in Ort ${i.runde} · <a href="#/kapitel/${i.kapitel.id}">${o(i.kapitel.title)}</a>, Lektion „${o(i.titel)}“.`:"Wird in einer späteren Runde eingeführt."}</p></article></div>`}).join("")}
          </div>
        </section>`}).join("")}
    </div>`;const d=l.querySelector(".spickzettel-suche");d.addEventListener("input",()=>{const e=d.value.trim().toLowerCase();l.querySelectorAll(".konzept-zelle").forEach(s=>s.hidden=e&&!s.textContent.toLowerCase().includes(e)),l.querySelectorAll(".spickzettel-block").forEach(s=>s.hidden=![...s.querySelectorAll(".konzept-zelle")].some(t=>!t.hidden))})}export{j as renderSpickzettel};
