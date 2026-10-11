import{e as l,B as w,b as E,g as j,C as $,s as A}from"./index-q1WDSUZc.js";import{b as q}from"./preview-dc6lnWue.js";const S={web:"Web-Grundlagen",html:"HTML",css:"CSS",recht:"Recht",js:"JavaScript"},y={web:"var(--basics)",html:"var(--html)",css:"var(--css)",recht:"var(--projekt)",js:"var(--js)"};let a=null;function v(){if(!a)return;a.classList.remove("an"),document.body.classList.remove("nachschlagen-offen");const e=a;setTimeout(()=>e.remove(),300),a=null}function z(e,{hervor:c=!1}={}){return e?`<article class="konzept-karte ${c?"hervor":""}" id="konzept-${l(e.id).replace(/[^a-z0-9-]/gi,"-")}" style="--farbe:${y[e.block]||"var(--spark)"}">
    <div class="konzept-kopf"><span class="chip chip-farbe" style="--farbe:${y[e.block]||"var(--spark)"}">${S[e.block]||e.block}</span><h4>${l(e.titel)}</h4></div>
    ${e.kurz?`<p>${l(e.kurz)}</p>`:""}
    ${e.beispiel?`<pre class="codeblock lang-${l(e.sprache||"text")}"><code>${l(e.beispiel)}</code></pre>`:""}
    ${e.merke?`<div class="konzept-merke">💡 ${l(e.merke)}</div>`:""}
  </article>`:""}function x(e){return`<article class="konzept-karte ort-regel-karte" style="--farbe:${l(e.regionFarbe||"var(--spark)")}">
    <div class="konzept-kopf">${A(e.gespinst,{groesse:36,titel:e.gespinstName})}<h4>Ort ${e.nr} · ${l(e.name)}</h4></div>
    <p><b>${l(e.gespinstName)}</b> ${l(e.fallenart)}</p>
    <p>${l(e.regel)}</p>
    ${e.beispiel?`<pre class="codeblock lang-${l(e.sprache||"text")}"><code>${l(e.beispiel)}</code></pre>`:""}
  </article>`}function N(e,c){const d=(e?.steps||[]).slice(0,c).filter(n=>n.type==="explain"||n.type==="example");return d.length?d.map((n,o)=>{if(n.type==="example"){const p=["html","css","js"].filter(i=>n[i]!=null);return`<section class="nachschlagen-schritt">
          <div class="schritt-art">🧪 Beispiel ${o+1}</div>
          <div class="schritt-inhalt">${$(n.text)}</div>
          ${p.map(i=>`<div class="nachschlagen-datei">${i==="html"?"index.html":i==="css"?"style.css":"script.js"}</div><pre class="codeblock lang-${i}"><code>${l(n[i])}</code></pre>`).join("")}
          <details class="nachschlagen-vorschau"><summary>Vorschau anzeigen</summary><iframe title="Vorschau des Beispiels" sandbox="allow-scripts" loading="lazy" data-srcdoc="${l(q({html:n.html||"",css:n.css||"",js:n.js||""},{capture:!1}))}"></iframe></details>
        </section>`}return`<section class="nachschlagen-schritt">
        <div class="schritt-art">📖 Erklärung ${o+1}</div>
        ${n.figure?`<div class="schritt-grafik">${n.figure}</div>`:""}
        <div class="schritt-inhalt">${$(n.text)}</div>
      </section>`}).join(""):'<p class="nachschlagen-leer">In dieser Lektion gab es vor diesem Schritt noch keine Erklärung – schau in den Spickzettel.</p>'}async function O(e={}){const{lektion:c=null,bisIndex:d=1/0,konzeptIds:n=[],fokus:o=null}=e,[p,i]=await Promise.all([w(),E().catch(()=>[])]),k=j(),L=new Set([...Object.keys(k.leitner),...n]),u=n.map(t=>p.find(s=>s.id===t)).filter(Boolean),g=p.filter(t=>L.has(t.id)&&!n.includes(t.id)),b=i.filter(t=>k.boss[t.chapter]?.passed),r=e.tab||(c?"lektion":"spickzettel");v(),a=document.createElement("aside"),a.className="nachschlagen",a.setAttribute("role","dialog"),a.setAttribute("aria-label","Nachschlagen"),a.innerHTML=`
    <div class="nachschlagen-kopf">
      <div><div class="schritt-art">📖 Nachschlagen</div><strong>Erklärungen, Spickzettel, Regeln – keine Lösungen</strong></div>
      <button class="icon-btn" type="button" id="ns-zu" title="Schließen (Esc)">✕</button>
    </div>
    <div class="nachschlagen-tabs" role="tablist">
      ${c?`<button type="button" role="tab" data-tab="lektion" class="${r==="lektion"?"aktiv":""}">Diese Lektion</button>`:""}
      <button type="button" role="tab" data-tab="spickzettel" class="${r==="spickzettel"?"aktiv":""}">Spickzettel</button>
      <button type="button" role="tab" data-tab="orte" class="${r==="orte"?"aktiv":""}">Befreite Orte <span class="chip">${b.length}</span></button>
    </div>
    <div class="nachschlagen-inhalt">
      ${c?`<div class="nachschlagen-tab" data-tab="lektion" ${r==="lektion"?"":"hidden"}>
        <p class="nachschlagen-leer">Alles, was du in dieser Lektion bis hierher gelesen und ausprobiert hast. Die Aufgaben sind damit lösbar – die Lösung selbst steht hier nicht.</p>
        ${N(c,d)}
      </div>`:""}
      <div class="nachschlagen-tab" data-tab="spickzettel" ${r==="spickzettel"?"":"hidden"}>
        <input class="nachschlagen-suche" type="search" placeholder="Suchen … (z. B. padding, Link, Liste)" aria-label="Spickzettel durchsuchen">
        ${u.length?`<div class="nachschlagen-gruppe"><h3>Diese Lektion</h3>${u.map(t=>z(t,{hervor:!0})).join("")}</div>`:""}
        ${g.length?["web","html","css","recht","js"].map(t=>{const s=g.filter(h=>h.block===t);return s.length?`<div class="nachschlagen-gruppe"><h3>${S[t]}</h3>${s.map(h=>z(h)).join("")}</div>`:""}).join(""):""}
        ${!u.length&&!g.length?'<p class="nachschlagen-leer">Noch keine Konzepte gelernt – nach der ersten Lektion füllt sich der Spickzettel.</p>':""}
        <p class="nachschlagen-leer" style="margin-top:1rem">Alle Karten auf einer Seite: <a href="#/spickzettel">Spickzettel öffnen</a></p>
      </div>
      <div class="nachschlagen-tab" data-tab="orte" ${r==="orte"?"":"hidden"}>
        ${b.length?`<p class="nachschlagen-leer">Jeder befreite Ort hat dir eine Regel gegeben: der Fehler des Gespinsts und was stattdessen gilt.</p>${b.map(x).join("")}`:'<p class="nachschlagen-leer">Noch kein Ort befreit – die erste Regel gibt es nach dem ersten gewonnenen Duell.</p>'}
      </div>
    </div>`,document.body.appendChild(a),document.body.classList.add("nachschlagen-offen"),requestAnimationFrame(()=>a.classList.add("an")),a.querySelector("#ns-zu").addEventListener("click",v),a.querySelectorAll('[role="tab"]').forEach(t=>{t.addEventListener("click",()=>{a.querySelectorAll('[role="tab"]').forEach(s=>s.classList.toggle("aktiv",s===t)),a.querySelectorAll(".nachschlagen-tab").forEach(s=>s.hidden=s.dataset.tab!==t.dataset.tab)})}),a.querySelectorAll("details.nachschlagen-vorschau").forEach(t=>{t.addEventListener("toggle",()=>{const s=t.querySelector("iframe");t.open&&s&&!s.srcdoc&&(s.srcdoc=s.dataset.srcdoc)})});const f=a.querySelector(".nachschlagen-suche");if(f.addEventListener("input",()=>{const t=f.value.trim().toLowerCase();a.querySelectorAll('[data-tab="spickzettel"] .konzept-karte').forEach(s=>s.hidden=t&&!s.textContent.toLowerCase().includes(t)),a.querySelectorAll(".nachschlagen-gruppe").forEach(s=>s.hidden=![...s.querySelectorAll(".konzept-karte")].some(h=>!h.hidden))}),o){const t=a.querySelector(`#konzept-${o.replace(/[^a-z0-9-]/gi,"-")}`);t&&(t.classList.add("fokus"),setTimeout(()=>t.scrollIntoView({block:"start",behavior:"smooth"}),200))}const m=t=>{t.key==="Escape"&&(v(),window.removeEventListener("keydown",m))};return window.addEventListener("keydown",m),a}export{z as k,v as n,O as o};
