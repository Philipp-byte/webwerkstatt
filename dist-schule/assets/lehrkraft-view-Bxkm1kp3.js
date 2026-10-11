import{q as l,a8 as n,a9 as c}from"./index-q1WDSUZc.js";import{t as a}from"./celebrate-CzG_yRvC.js";async function u(e){const t=await crypto.subtle.digest("SHA-256",new TextEncoder().encode(e));return[...new Uint8Array(t)].map(r=>r.toString(16).padStart(2,"0")).join("")}async function f(e){const t=l();if(e.innerHTML=`
    <div class="lektion-seite auftritt">
      <a class="zurueck" href="#/ich">← Ich</a>
      <div class="karte" style="margin-top:0.75rem">
        <h1>🔑 Lehrkraft-Modus</h1>
        <p style="color:var(--ink-2)">Schaltet alle Orte, Lektionen und Duelle frei – praktisch, um im Unterricht direkt an eine Stelle zu springen. Der Lernstand bleibt unverändert. Das ist ein Sichtschutz, keine Sicherheit: Die App läuft komplett im Browser.</p>
        ${t?'<p><strong>Der Modus ist aktiv.</strong></p><button class="btn btn-sekundaer" type="button" id="aus">Modus beenden</button>':`<form class="lehrkraft-form" id="form"><input type="password" id="pw" placeholder="Passwort" autocomplete="current-password" aria-label="Passwort"><button class="btn btn-primaer" type="submit">Freischalten</button></form>
             <p style="color:var(--muted);font-size:0.85rem;margin-top:0.75rem">Passwort ändern: <code>node scripts/lehrkraft-passwort.mjs "neues Passwort"</code> – im Repo liegt nur der Hash.</p>`}
      </div>
      <div class="karte sektion">
        <h2>Werkzeuge</h2>
        <ul>
          <li><a href="#/pruefung">Interne Prüfung aller Code-Aufgaben</a> (Lösung besteht, Starter fällt durch)</li>
          <li><a href="#/projekt">FUNKEN-Website</a> · <a href="#/showtime">Showtime</a> · <a href="#/hinterhalt">Hinterhalte</a></li>
        </ul>
      </div>
    </div>`,t){e.querySelector("#aus").addEventListener("click",()=>{n(!1),location.hash="#/",location.reload()});return}e.querySelector("#form").addEventListener("submit",async r=>{r.preventDefault();const o=e.querySelector("#pw").value,{hash:s}=await c();let i="";try{i=await u(o)}catch{a({titel:"Nicht möglich",text:"Die Prüfung braucht https oder localhost.",icon:"⚠️",art:"fehler"});return}s&&i===s?(n(!0),a({titel:"Lehrkraft-Modus aktiv",icon:"🔓",art:"ok"}),setTimeout(()=>{location.hash="#/",location.reload()},600)):a({titel:"Falsches Passwort",icon:"🔒",art:"fehler"})})}export{f as renderLehrkraft};
