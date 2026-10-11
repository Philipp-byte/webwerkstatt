import{ab as a,s as o,ac as l,h as d,e as u}from"./index-q1WDSUZc.js";async function m(e){if(!a()){e.innerHTML='<div class="lektion-seite"><div class="karte gesperrt-karte"><h2>Kein Schulserver</h2><p>Diese Fassung läuft ohne Konto: Dein Spielstand bleibt im Browser. <a href="#/">Nach Hyperia</a></p></div></div>';return}e.innerHTML=`
    <div class="login-seite auftritt">
      <div class="karte login-karte">
        <div class="login-kopf">${o("funke",{groesse:64})}<div><span class="chip chip-gold">Schulmodus</span><h1>Anmelden</h1></div></div>
        <p style="color:var(--ink-2)">Dein Pseudonym und das Passwort hast du von deiner Lehrkraft bekommen. Dein Spielstand wird auf dem Schulserver gespeichert und ist an jedem Rechner da.</p>
        <form id="form" autocomplete="off">
          <label>Pseudonym<input id="pseudonym" type="text" autocapitalize="off" autocomplete="username" required></label>
          <label>Passwort<input id="passwort" type="password" autocomplete="current-password" required></label>
          <div class="rueckmeldung rueckmeldung-fehler" id="fehler" hidden></div>
          <div class="schritt-buttons"><button class="btn btn-primaer btn-gross" type="submit" id="los">Anmelden →</button></div>
        </form>
      </div>
    </div>`;const r=e.querySelector("#form"),s=e.querySelector("#fehler");r.addEventListener("submit",async n=>{n.preventDefault(),s.hidden=!0;const t=e.querySelector("#los");t.disabled=!0;try{await l(e.querySelector("#pseudonym").value.trim(),e.querySelector("#passwort").value),d.fanfare(),history.replaceState(null,"",location.pathname+location.search),location.reload()}catch(i){s.hidden=!1,s.textContent=u(i.message||"Anmeldung fehlgeschlagen."),t.disabled=!1}}),setTimeout(()=>e.querySelector("#pseudonym")?.focus(),200)}export{m as renderLogin};
