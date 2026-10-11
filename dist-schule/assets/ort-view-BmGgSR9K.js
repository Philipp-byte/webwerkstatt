import{o as j,l as q,a as M,p as W,s as p,e as s,c as D,d as N,q as T,r as Z,h as H,f as C}from"./index-q1WDSUZc.js";import{l as K,k as b,w as A,f as S,b as v,s as z}from"./figuren-BwUP6XLO.js";async function P(l,a){const[f,n,c,t]=await Promise.all([j(a),q(),M(),W(a)]);await K();const i=n.findIndex(e=>e.id===a),k=b(i,n);if(!t){l.innerHTML='<div class="lektion-seite"><a class="zurueck" href="#/">← Hyperia</a><div class="karte gesperrt-karte"><p>Diesen Ort gibt es nicht.</p></div></div>';return}if(!k){const e=n[i-1],u=c.orte.find($=>$.chapter===e?.id);l.innerHTML=`<div class="lektion-seite"><a class="zurueck" href="#/">← Hyperia</a>
      <div class="karte gesperrt-karte">${p(t.gespinst,{groesse:72})}<h2>🕸 ${s(t.name)} liegt unter dem Netz</h2>
      <p>Erst wenn ${s(u?.name||"der Ort davor")} befreit ist, öffnet sich der Weg hierher.</p>
      ${e?`<a class="btn btn-sekundaer" href="#/ort/${e.id}">Zu ${s(u?.name||e.title)}</a>`:""}</div></div>`;return}const{eintraege:h,naechste:o,stand:r}=await A(f,t,{kapitelIstFrei:k}),g=D(a),x=S(t.gespinst),m=`${a}:start`,w=c.seidra?.[a]?.wann==="start"&&!N(m)?c.seidra[a]:null,F=e=>{const u=["weg-eintrag",e.art,e.status,e.art==="duell"&&e.bestanden?"bestanden":""].filter(Boolean).join(" "),$=e.frei?e.href:`#/ort/${a}`,E=e.art==="lektion"?e.erledigt?"✓":e.frei?e.nr:"🔒":e.frei||e.erledigt?e.icon:"🔒";let d="";e.art==="lektion"&&(d=e.erledigt?e.versuche>1?`${e.versuche}× gespielt`:"geschafft":e.frei?"":"erst die Lektion davor"),e.art==="hinterhalt"&&(d=e.erledigt?`gespielt · ${e.sterne} von 3 Sternen · jederzeit wiederholbar`:e.frei?e.untertitel:"wird frei nach der Lektion davor"),e.art==="sturm"&&(d=e.erledigt?`gespielt · ${e.sterne} von 3 Sternen`:e.frei?e.untertitel:"wird frei, wenn alle Lektionen geschafft sind"),e.art==="duell"&&(d=e.bestanden?`Gewonnen mit ${Math.round(e.best*100)} % · jederzeit wiederholbar`:e.frei?"Sam prüft · ab 80 % reißt das Gespinst":"wird frei, wenn alle Lektionen geschafft sind");const G=e.art==="lektion"?e.untertitel:e.art==="hinterhalt"?"Hinterhalt":e.art==="sturm"?"Warm-up":"Duell";return`<a class="${u}" href="${$}" ${e.frei?"":'aria-disabled="true"'}>
      <span class="weg-nr">${E}</span>
      <span class="weg-text"><span class="weg-art">${G}</span><strong>${s(e.titel)}</strong>${d?`<small>${s(d)}</small>`:""}</span>
      <span class="weg-rechts">${e.art==="lektion"&&e.erledigt?z(e.stars):""}${(e.art==="hinterhalt"||e.art==="sturm")&&e.erledigt?z(e.sterne):""}${e.status==="naechste"?'<span class="chip chip-jetzt">Jetzt</span>':""}${e.art==="duell"&&e.bestanden?'<span class="chip chip-gold">befreit</span>':""}</span>
    </a>`},y=`<div class="karte einleitung ${g?"zu":""}" id="einleitung">
      <div class="einleitung-kopf">
        <div><span class="chip chip-gespinst">Gespinst ${s(t.gespinstName)}</span><h2>${s(t.fallenart)}</h2></div>
        <button class="btn btn-geist btn-klein" type="button" id="einleitung-toggle">${g?"Einleitung lesen":"Zuklappen"}</button>
      </div>
      <div class="einleitung-dialog">
        ${t.einleitung.map(e=>v(e.wer,e.text,{art:S(e.wer)?.rolle==="gespinst"?"spott":"rede"})).join("")}
        ${!g&&o?`<div class="schritt-buttons"><a class="btn btn-primaer btn-gross" href="${o.href}" id="los">${o.art==="lektion"?`Los: ${s(o.titel)} →`:`${s(o.titel)} →`}</a></div>`:""}
      </div>
    </div>`,O=r.abgenommen?`<div class="karte ort-befreit">
        <div class="ort-befreit-kopf">${p("funke",{groesse:48})}<div><span class="chip chip-gold">Ort befreit</span><h2>${s(t.name)} leuchtet</h2></div></div>
        ${t.befreit?v(t.befreit.wer,t.befreit.text,{art:"rede"}):""}
        <div class="ort-regel"><div class="schritt-art">📜 Die Regel dieses Ortes</div><p>${s(t.regel)}</p>${t.beispiel?`<pre class="codeblock lang-${s(t.sprache||"text")}"><code>${s(t.beispiel)}</code></pre>`:""}</div>
      </div>`:"";l.innerHTML=`
    <div class="lektion-seite ort-seite auftritt">
      <a class="zurueck" href="#/">← Hyperia</a>
      <div class="ort-kopf" style="--f:${t.regionFarbe}">
        ${p(r.abgenommen?"funke":t.gespinst,{groesse:84,klasse:r.abgenommen?"":"sigil-gross",titel:t.gespinstName})}
        <div>
          <span class="chip" style="--f:${t.regionFarbe}">${s(t.regionName)} · Ort ${t.nr} von ${n.length}</span>
          <h1>${s(t.name)}</h1>
          <p>${s(f.title)} · ${s(f.description||"")}</p>
        </div>
      </div>

      ${w?`<div class="seidra-auftritt" id="seidra">${v("seidra",w.text,{art:"spott"})}<button class="btn btn-geist btn-klein" type="button" id="seidra-weg">Weiter ohne sie</button></div>`:""}
      ${r.abgenommen?O:y}

      <div class="karte ort-stand">
        <div class="balken" style="--f:${t.regionFarbe}"><span style="width:${Math.round(r.erledigt/r.gesamt*100)}%"></span></div>
        <div>${r.erledigt} / ${r.gesamt} Lektionen · ${r.sterne} / ${r.maxSterne} Sterne</div>
        ${o?`<a class="btn btn-primaer btn-klein" href="${o.href}">Weiter: ${s(o.titel)} →</a>`:r.abgenommen&&n[i+1]&&b(i+1,n)?`<a class="btn btn-primaer btn-klein" href="#/ort/${n[i+1].id}">Nächster Ort →</a>`:""}
      </div>

      <div class="block-titel">Der Weg durch ${s(t.name)} · ${h.filter(e=>e.art==="lektion").length} Lektionen, ${h.filter(e=>e.art==="hinterhalt").length} Hinterhalte, 1 Duell</div>
      <div class="weg">${h.map(F).join("")}</div>

      ${r.abgenommen?y:""}
      ${x&&!r.abgenommen&&g,""}

      <div class="schritt-buttons" style="margin-top:1rem">
        ${i>0?`<a class="btn btn-geist" href="#/ort/${n[i-1].id}">← ${s(c.orte[i-1]?.name||n[i-1].title)}</a>`:""}
        ${i<n.length-1&&b(i+1,n)?`<a class="btn btn-geist" href="#/ort/${n[i+1].id}">${s(c.orte[i+1]?.name||n[i+1].title)} →</a>`:""}
        ${T()?'<span class="chip" style="margin-left:auto">🔓 Lehrkraft-Modus: alles offen</span>':""}
      </div>
    </div>`;const L=l.querySelector("#einleitung");l.querySelector("#einleitung-toggle")?.addEventListener("click",e=>{L.classList.toggle("zu"),e.currentTarget.textContent=L.classList.contains("zu")?"Einleitung lesen":"Zuklappen"}),l.querySelector("#los")?.addEventListener("click",()=>{Z(a),H.klick()}),l.querySelector("#seidra-weg")?.addEventListener("click",()=>{C(m),l.querySelector("#seidra")?.remove()}),g||H.klick?.()}export{P as renderOrt};
