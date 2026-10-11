import{a as S,l as q,g,e as d,i as z,j as k,h as y,k as V,s as m,m as W,n as I}from"./index-q1WDSUZc.js";async function R(c){return new Promise(a=>{const o=new Image;o.onload=()=>a(!0),o.onerror=()=>a(!1),o.src=c})}const T=()=>new URL("intro/schattennetz-intro.mp4",document.baseURI).href,H=()=>new URL("intro/schattennetz-intro.webm",document.baseURI).href,f=()=>new URL("intro/schattennetz-intro-poster.jpg",document.baseURI).href,U=()=>new URL("intro/schattennetz-intro.vtt",document.baseURI).href;async function N(c){const[a,o]=await Promise.all([S(),q()]),p=await R(f()),L=!g().intro.komplett,$=o[0].id;c.innerHTML='<div class="intro" id="intro"></div>';const e=c.querySelector("#intro");let n=null;function v(s=""){return`<div class="intro-kopf" style="position:relative">
        <span class="brand"><span class="brand-mark">&lt;/&gt;</span>WebWerkstatt</span>
        <div class="intro-akt"><span>Vorspann</span><strong>${d(a.titel)}</strong></div>
        <div class="rechts">${s}</div>
      </div>`}function h(){const s=!L;e.innerHTML=`${v(s?'<button class="btn btn-geist btn-klein" id="skip" type="button">Überspringen ›</button>':'<span class="chip chip-gespinst">Erster Start · der Vorspann läuft einmal ganz</span>')}
      <div class="intro-video-wrap">
        <video id="film" playsinline preload="auto" poster="${f()}" crossorigin="anonymous" ${s?"controls":""}>
          <source src="${T()}" type="video/mp4">
          <source src="${H()}" type="video/webm">
          <track kind="subtitles" srclang="de" label="Deutsch" src="${U()}" default>
        </video>
        <button class="intro-play" id="play" type="button" aria-label="Vorspann starten"><span>▶</span><small>Vorspann starten · Ton an</small></button>
      </div>
      <nav class="intro-steuerung" style="position:relative">
        <button class="btn btn-sekundaer" id="lesen" type="button">📖 Lieber lesen</button>
        <div class="mitte"><strong>${d(a.untertitel)}</strong>${s?"Weiter mit „Überspringen“ oder am Ende des Videos.":"Am Ende des Videos geht es automatisch weiter."}</div>
        <button class="btn btn-primaer" id="weiter" type="button" ${s?"":"hidden"}>Weiter ›</button>
      </nav>`,n=e.querySelector("#film");const t=e.querySelector("#play"),i=()=>{k(!0),l()};n.addEventListener("ended",i),n.addEventListener("error",()=>u(),{once:!0}),n.addEventListener("play",()=>t.classList.add("weg")),n.addEventListener("pause",()=>n.ended||t.classList.remove("weg")),t.addEventListener("click",()=>n.play().catch(()=>{})),e.querySelector("#weiter").addEventListener("click",()=>{z(!0),l()}),e.querySelector("#skip")?.addEventListener("click",()=>l()),e.querySelector("#lesen").addEventListener("click",()=>{n.pause(),u()}),n.play().catch(()=>{})}function u(){const s=a.vorspann;let t=0;e.innerHTML=`${v('<button class="btn btn-geist btn-klein" id="skip" type="button">Überspringen ›</button>')}
      <div class="intro-lesen">
        <div class="karte intro-lesen-karte" id="karte"></div>
        <nav class="intro-steuerung">
          <button class="btn btn-sekundaer" id="zurueck" type="button">‹ Zurück</button>
          <div class="mitte"><strong><span id="nr">1</span> / ${s.length}</strong>Weiter mit Klick oder →</div>
          <button class="btn btn-primaer" id="weiter" type="button">Weiter ›</button>
        </nav>
      </div>`;const i=()=>{const r=s[t];e.querySelector("#nr").textContent=t+1,e.querySelector("#karte").innerHTML=`
        <div class="intro-lesen-bild">${t===3?m("seidra",{groesse:120,klasse:"sigil-gross"}):t===4?["sam","ayla","jonas","robby"].map(b=>W(b,{groesse:64,pose:"hallo-winken"})).join(""):t===5?m("funke",{groesse:110}):`<span class="intro-lesen-nr">${r.bild}</span>`}</div>
        <div><span class="chip chip-gespinst">Bild ${r.bild} von ${s.length}</span><h2>${d(r.titel)}</h2><p>${d(r.text)}</p></div>`,e.querySelector("#zurueck").disabled=t===0,e.querySelector("#weiter").textContent=t===s.length-1?"Lehrling werden ›":"Weiter ›"};e.querySelector("#weiter").addEventListener("click",()=>{if(t>=s.length-1)return k(!0),l();t++,i(),y.klick()}),e.querySelector("#zurueck").addEventListener("click",()=>{t>0&&t--,i()}),e.querySelector("#skip").addEventListener("click",()=>l()),i()}function l(){n&&(n.pause(),n=null),V(!0);const s=g(),t=[["Fehler sind Fäden.","Jeder Fehler bekommt eine genaue Rückmeldung, die Gespinste verraten dabei mehr, als sie wollen. Nachlesen geht immer, abschreiben nie."],["Wiederholung hält das Netz.","Soundcheck und Hinterhalte holen Altes zurück, bis es sitzt. Erst dann hält ein Knoten, wenn Seidra daran zieht."],["Jeder Ort leuchtet.","Lektionen, zwei Hinterhalte, ein Duell. Ab 80 % reißt das Gespinst, der Ort geht an, der nächste öffnet sich."]];e.innerHTML=`<div class="intro-onboarding">
      <div class="karte auftritt">
        <div style="display:flex;align-items:center;gap:1rem;margin-bottom:0.5rem">${m("funke",{groesse:64})}<div><div class="chip chip-gold">Die Werkstatt nimmt dich auf</div><h2 style="margin:0.3rem 0 0">Willkommen in Hyperia, Lehrling.</h2></div></div>
        <p style="color:var(--ink-2);margin:0.5rem 0 0.9rem">Wie soll Sam dich nennen? (Optional, du kannst den Namen später unter „Ich“ ändern.)</p>
        <input class="intro-name" id="name" type="text" maxlength="30" placeholder="Dein Name oder Spielername" value="${d(s.name||"")}" autocomplete="nickname">
        <div class="intro-regeln">
          ${t.map(([b,E],w)=>`<div class="intro-regel"><span class="nr">${w+1}</span><span><b>${b}</b> ${E}</span></div>`).join("")}
        </div>
        <div class="schritt-buttons">
          <button class="btn btn-primaer btn-gross" type="button" id="los">🕯 Nach Quellgrund ›</button>
          <a class="btn btn-sekundaer" href="#/">Zur Karte</a>
          <button class="btn btn-geist" type="button" id="nochmal">${p?"🎬 Vorspann nochmal":"📖 Vorspann lesen"}</button>
        </div>
      </div></div>`;const i=e.querySelector("#name"),r=()=>I(i.value.trim());i.addEventListener("change",r),e.querySelector("#los").addEventListener("click",()=>{r(),y.fanfare(),location.hash=`#/ort/${$}`}),e.querySelector("#nochmal").addEventListener("click",()=>p?h():u()),setTimeout(()=>i.focus(),300)}return p?h():u(),{destroy:()=>{n&&n.pause(),document.body.classList.remove("intro-aktiv")}}}export{N as renderIntro};
