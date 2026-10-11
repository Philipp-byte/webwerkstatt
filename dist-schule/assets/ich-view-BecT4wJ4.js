import{g as b,B as j,l as A,b as D,E as N,F as O,M as v,m as q,e as i,q as k,s as M,h as c,n as H,G as P,w as B,H as R,I as W,J as I,K as T,L as F,N as C,O as K}from"./index-q1WDSUZc.js";import{t as m}from"./celebrate-CzG_yRvC.js";import{m as U}from"./lesson-view-CIAIDwXF.js";import{S as G}from"./figuren-BwUP6XLO.js";import"./preview-dc6lnWue.js";import"./checker-TvFk0fyq.js";import"./nachschlagen-CiV0SDqc.js";function $(n){return n?new Date(n).toLocaleDateString("de-DE"):"–"}async function ee(n){const t=b(),[S,y,o]=await Promise.all([j(),A(),D()]),u=N(t.xp),w=Object.values(t.lessons).reduce((e,s)=>e+(s.stars||0),0),L=Object.values(t.lessons).filter(e=>e.done).length,x=y.reduce((e,s)=>e+s.lessons.length,0),z=t.stats.correct+t.stats.wrong?Math.round(t.stats.correct/(t.stats.correct+t.stats.wrong)*100):0,p=O(),f=o.filter(e=>t.boss[e.chapter]?.passed),h=o.find(e=>!t.boss[e.chapter]?.passed)||null,d=K(),E=[{titel:"Web-Grundlagen",prefix:"web.",farbe:"var(--basics)"},{titel:"HTML",prefix:"html.",farbe:"var(--html)"},{titel:"CSS",prefix:"css.",farbe:"var(--css)"},{titel:"Recht",prefix:"recht.",farbe:"var(--projekt)"},{titel:"JavaScript",prefix:"js.",farbe:"var(--js)"}].map(e=>{const s=S.filter(l=>l.id.startsWith(e.prefix)).map(l=>l.id),r=s.filter(l=>t.leitner[l]),a=s.filter(l=>t.leitner[l]?.box>=4);return{...e,gesamt:s.length,gelernt:r.length,sicher:a.length}});n.innerHTML=`
    <div class="auftritt ich-seite">
      <a class="zurueck" href="#/">← Hyperia</a>
      <div class="karte profil">
        <div class="profil-bild">${q("robby",{pose:u.level>=10?"erfolg-pokal":"hallo-winken",groesse:110})}</div>
        <div class="profil-mitte">
          <span class="chip chip-gold">${d?`Schulmodus · ${i(d.pseudonym)}`:"Lehrling der Werkstatt"}${k()?" · Lehrkraft-Modus":""}</span>
          <input class="keycard-name-input" id="name" type="text" maxlength="30" placeholder="Dein Name (optional)" value="${i(t.name)}" aria-label="Name">
          <div class="keycard-level">Level ${u.level} · ${t.xp} XP · noch ${u.fehlt} XP bis Level ${u.level+1}</div>
          <div class="balken" style="--f: var(--spark)"><span style="width:${Math.round(u.anteil*100)}%"></span></div>
        </div>
        <div class="profil-zahlen">
          <div><strong>${f.length}/${o.length}</strong><small>Orte befreit</small></div>
          <div><strong>${w}</strong><small>Sterne</small></div>
          <div><strong>${t.stats.hinterhaltSterne||0}</strong><small>Hinterhalt-Sterne</small></div>
        </div>
      </div>

      <div class="statistik-grid">
        <div class="stat-kachel"><strong>${L}/${x}</strong><small>Lektionen</small></div>
        <div class="stat-kachel"><strong>${t.stats.codePassed}</strong><small>Code-Aufgaben bestanden</small></div>
        <div class="stat-kachel"><strong>${z} %</strong><small>Treffsicherheit</small></div>
        <div class="stat-kachel"><strong>${t.stats.soundcheckCorrect}</strong><small>Soundcheck-Fragen richtig</small></div>
        <div class="stat-kachel"><strong>${t.hinterhalte.runden||0}</strong><small>Hinterhalte gespielt</small></div>
        <div class="stat-kachel"><strong>${h?h.name:"Funkenfest"}</strong><small>${h?`nächster Ort · Gespinst ${i(h.gespinstName)}`:"Hyperia ist frei"}</small></div>
      </div>

      <div class="sektion">
        <h2>🏅 Meilensteine <span class="chip">${Object.keys(t.badges).filter(e=>v.some(s=>s.id===e)).length} / ${v.length}</span></h2>
        <div class="abzeichen-grid">
          ${v.map(e=>`<div class="abzeichen ${t.badges[e.id]?"":"gesperrt"}" title="${i(e.text)}"><div class="icon">${e.icon}</div><strong>${i(e.titel)}</strong><small>${t.badges[e.id]?$(t.badges[e.id]):i(e.text)}</small></div>`).join("")}
        </div>
      </div>

      <div class="sektion karte">
        <h2>🧠 Was sitzt schon?</h2>
        <p style="color:var(--muted);font-size:0.9rem">Sicher = im Soundcheck und in Hinterhalten mehrfach richtig (Leitner-Box 4 oder höher). Was noch wackelt, kommt automatisch wieder dran.</p>
        <div class="kompetenz-liste">
          ${E.map(e=>`<div class="kompetenz-zeile"><span>${e.titel}</span><span class="balken" style="--f:${e.farbe}"><span style="width:${e.gesamt?Math.round(e.sicher/e.gesamt*100):0}%"></span></span><span style="color:var(--muted);font-size:0.8rem">${e.sicher}/${e.gesamt}</span></div>`).join("")}
        </div>
      </div>

      <div class="sektion karte">
        <h2>🕸 Hinterhalt-Rekorde</h2>
        <div class="rekorde">${G.map(e=>`<a class="rekord" href="#/hinterhalt/${h?.chapter||o[0].chapter}/${e.id}"><span>${e.icon}</span><strong>${i(e.titel)}</strong><small>${t.hinterhalte.rekorde[e.id]||0} Punkte</small></a>`).join("")}</div>
      </div>

      <div class="sektion karte">
        <h2>🕯 Befreite Orte <span class="chip">${f.length} / ${o.length}</span></h2>
        <div class="orte-sigille">${o.map(e=>`<span class="ort-sigil ${t.boss[e.chapter]?.passed?"frei":""}" title="${i(e.name)} · ${i(e.gespinstName)}">${M(t.boss[e.chapter]?.passed?"funke":e.gespinst,{groesse:40,titel:e.name})}<small>${e.nr}</small></span>`).join("")}</div>
        <p style="color:var(--muted);font-size:0.85rem;margin:0.5rem 0 0">Die Regel jedes befreiten Ortes steht auf seiner Seite und in jeder Aufgabe unter „Nachlesen“.</p>
      </div>

      <div class="sektion karte">
        <h2>💾 Spielstand</h2>
        <p style="color:var(--muted);font-size:0.95rem">${d?"Dein Spielstand liegt auf dem Schulserver und ist an jedem Rechner da, sobald du dich anmeldest. Eine Sicherungsdatei schadet trotzdem nicht.":"Dein Spielstand liegt nur in diesem Browser. Schulrechner werden oft gelöscht: Lade dir regelmäßig eine Sicherungsdatei herunter und lade sie am nächsten Rechner wieder."}</p>
        <div class="schritt-buttons">
          <button class="btn btn-primaer" type="button" id="export">⬇ Spielstand herunterladen</button>
          <button class="btn btn-sekundaer" type="button" id="import">⬆ Spielstand laden</button>
          <input type="file" id="import-datei" accept=".json,application/json" hidden>
          <a class="btn btn-sekundaer" href="#/bericht">🖨 Lernbericht</a>
          <a class="btn btn-sekundaer" href="#/spickzettel">📖 Spickzettel</a>
          ${d?'<button class="btn btn-geist" type="button" id="abmelden" style="margin-left:auto">Abmelden</button>':'<button class="btn btn-geist" type="button" id="reset" style="margin-left:auto">Alles zurücksetzen</button>'}
        </div>
        <p style="color:var(--muted);font-size:0.8rem;margin:0.6rem 0 0">Zuletzt aktiv: ${$(t.stats.lastActive)} · Sicherungen bisher: ${t.stats.exports}</p>
        ${d?`<form id="pw-form" class="klasse-form" style="margin-top:0.9rem;flex-wrap:wrap"><span style="color:var(--ink-2);font-size:0.9rem;flex-basis:100%">Angemeldet als <strong>${i(d.pseudonym)}</strong> · Passwort ändern:</span><input id="pw-alt" type="password" placeholder="Altes Passwort" autocomplete="current-password" required><input id="pw-neu" type="password" placeholder="Neues Passwort (mind. 6 Zeichen)" minlength="6" autocomplete="new-password" required><button class="btn btn-sekundaer btn-klein" type="submit">🔑 Ändern</button></form>`:""}
      </div>

      <div class="sektion karte">
        <h2>⚙️ Einstellungen</h2>
        <div class="einstellungen">
          <div class="einstellung"><span>Design</span><span class="schalter" data-setting="theme"><button type="button" data-wert="dunkel" class="${p.theme!=="hell"?"aktiv":""}">🌙 Dunkel</button><button type="button" data-wert="hell" class="${p.theme==="hell"?"aktiv":""}">☀️ Hell</button></span></div>
          <div class="einstellung"><span>Bewegung im Hintergrund</span><span class="schalter" data-setting="motion"><button type="button" data-wert="an" class="${p.motion!=="aus"?"aktiv":""}">An</button><button type="button" data-wert="aus" class="${p.motion==="aus"?"aktiv":""}">Aus</button></span></div>
          <div class="einstellung"><span>Ton</span><span class="schalter" data-setting="ton"><button type="button" data-wert="an" class="${c.istStumm()?"":"aktiv"}">🔊 An</button><button type="button" data-wert="aus" class="${c.istStumm()?"aktiv":""}">🔇 Aus</button></span></div>
          <div class="einstellung"><span>Vorspann</span><a class="btn btn-geist btn-klein" href="#/intro">🎬 Noch einmal ansehen</a></div>
          <div class="einstellung"><span>Lehrkraft</span><a class="btn btn-geist btn-klein" href="#/lehrkraft">${k()?"🔓 Modus aktiv":"🔒 Lehrkraft-Modus"}</a></div>
        </div>
      </div>
    </div>`,n.querySelector("#name").addEventListener("change",e=>H(e.target.value)),n.querySelector("#export").addEventListener("click",()=>{const e=P(),s=(b().name||"spielstand").replace(/[^a-zA-Z0-9_-]+/g,"_"),r=new Blob([JSON.stringify(e,null,2)],{type:"application/json"}),a=document.createElement("a");a.href=URL.createObjectURL(r),a.download=`webwerkstatt_${s}_${new Date().toISOString().slice(0,10)}.json`,document.body.appendChild(a),a.click(),a.remove(),setTimeout(()=>URL.revokeObjectURL(a.href),2e3),m({titel:"Spielstand heruntergeladen",text:"Bewahre die Datei gut auf.",icon:"💾",art:"ok"}),U(B({ereignis:"export"}))});const g=n.querySelector("#import-datei");n.querySelector("#import").addEventListener("click",()=>g.click()),g.addEventListener("change",async()=>{const e=g.files[0];if(e)try{const s=JSON.parse(await e.text());if(!confirm("Den aktuellen Spielstand durch die Datei ersetzen?"))return;R(s),m({titel:"Spielstand geladen",text:"Die Seite wird neu aufgebaut …",icon:"✅",art:"ok"}),setTimeout(()=>location.reload(),900)}catch(s){m({titel:"Datei nicht lesbar",text:s.message||"Keine WebWerkstatt-Datei.",icon:"⚠️",art:"fehler"})}}),n.querySelector("#reset")?.addEventListener("click",()=>{confirm("Wirklich den gesamten Spielstand löschen? XP, Sterne, Meilensteine, befreite Orte und die FUNKEN-Website sind dann weg.")&&confirm("Ganz sicher? Das lässt sich nicht rückgängig machen.")&&(W(),location.reload())}),n.querySelector("#pw-form")?.addEventListener("submit",async e=>{e.preventDefault();try{await I(n.querySelector("#pw-alt").value,n.querySelector("#pw-neu").value),m({titel:"Passwort geändert",text:"Beim nächsten Anmelden gilt das neue.",icon:"✅",art:"ok"}),e.target.reset()}catch(s){m({titel:"Fehler",text:s.message,icon:"⚠️",art:"fehler"})}}),n.querySelector("#abmelden")?.addEventListener("click",async()=>{T(),await F(),location.hash="#/login",location.reload()}),n.querySelectorAll(".schalter").forEach(e=>{e.querySelectorAll("button").forEach(s=>{s.addEventListener("click",()=>{e.querySelectorAll("button").forEach(a=>a.classList.remove("aktiv")),s.classList.add("aktiv");const r=e.dataset.setting;if(r==="ton"){c.setStumm(s.dataset.wert==="aus"),c.istStumm()||c.klick();const a=document.getElementById("ton-knopf");a&&(a.textContent=c.istStumm()?"🔇":"🔊");return}C(r,s.dataset.wert),document.documentElement.dataset[r]=s.dataset.wert})})})}export{ee as renderIch};
