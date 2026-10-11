import{o as ee,t as te,l as se,a as ne,p as ae,e as l,m as V,s as D,X as P,h as $,z as H,g as Z,u as ie,v as _,w as re,x as le}from"./index-q1WDSUZc.js";import{c as oe,d as ce,b as g,e as F,f as K}from"./figuren-BwUP6XLO.js";import{r as de,z as ue,m as pe,S as fe,a as he}from"./lesson-view-CIAIDwXF.js";import{k as me}from"./celebrate-CzG_yRvC.js";import"./preview-dc6lnWue.js";import"./checker-TvFk0fyq.js";import"./nachschlagen-CiV0SDqc.js";async function Se(o,n){const[q,c,X,G,b]=await Promise.all([ee(n),te(n),se(),ne(),ae(n)]),k=await oe(n),E=X.findIndex(e=>e.id===n),f=b?.gespinst||"knoten",i=K(f)||{name:"das Gespinst",farbe:"#e23cff"},v=f==="seidra";if(!c){o.innerHTML=`<div class="lektion-seite"><a class="zurueck" href="#/ort/${n}">← Zum Ort</a><div class="karte gesperrt-karte"><p>Für diesen Ort gibt es (noch) kein Duell.</p></div></div>`;return}if(!ce(q)){o.innerHTML=`<div class="lektion-seite"><a class="zurueck" href="#/ort/${n}">← Zum Ort</a><div class="karte gesperrt-karte"><h2>🔒 Noch nicht</h2><p>Erst alle Lektionen des Ortes abschließen, dann stellt sich ${l(i.name)}.</p></div></div>`;return}const h=c.aufgaben,w=e=>e.type==="code"?3:1,N=h.reduce((e,t)=>e+w(t),0);let z=0,C=0,d=-1,W=0;const O=[];o.innerHTML=`
    <div class="lektion-seite duell-seite">
      <div class="lektion-kopf">
        <a class="zurueck" href="#/ort/${n}">← Ort ${b?.nr||E+1}: ${l(b?.name||q.title)}</a>
        <h1>⚔️ Duell gegen ${l(i.name)}</h1>
        <span class="punkte-anzeige" id="punkte">0 / ${N} Punkte</span>
        <div class="pager-fortschritt"><span class="pager-zaehler" id="zaehler"></span><div class="pager-dots" id="dots"></div></div>
      </div>
      <div class="duell-kopf" style="--f:${l(i.farbe||"#e23cff")}">
        <span class="duell-team">${V("sam",{groesse:44,titel:"Sam"})}Du · Werkstatt</span>
        <span class="duell-stand" id="stand">0 : 0</span>
        <span class="duell-team gegner" id="gegner-team">${l(i.name)}${D(f,{groesse:44,titel:i.name,klasse:"duell-sigil"})}</span>
        <span class="duell-info">Sam prüft · ${l(c.title)} · ab ${Math.round(c.bestanden*100)} % reißt das Gespinst</span>
      </div>
      <div id="buehne"></div>
    </div>`;const x=o.querySelector("#buehne"),T=o.querySelector("#stand"),R=o.querySelector("#dots"),J=h.map(()=>{const e=document.createElement("span");return e.className="pager-dot",R.appendChild(e),e});function Q(){T.textContent=`${z} : ${C}`,T.classList.add("tick"),setTimeout(()=>T.classList.remove("tick"),250),o.querySelector("#punkte").textContent=`${z} / ${N} Punkte`}function U(){const e=k.vorstellung(),t=i.spott?.[0]||"";x.innerHTML=`<section class="schritt auftritt duell-intro">
      <div class="duell-buehne">
        ${D(f,{groesse:150,klasse:"sigil-gross",titel:i.name})}
        <div>
          ${e?g(f,e,{art:"spott"}):""}
          ${g(f,v?"Dein Netz gegen meins. Ein Fehler, und ich ziehe.":t,{art:"spott"})}
          ${g("sam",c.intro.replace(/[*_`]/g,""),{art:"rede"})}
        </div>
      </div>
      <div class="hinweis-box" style="margin-top:1rem">
        <strong>So läuft das Duell:</strong> ${h.length} Aufgaben, gemischt aus diesem und früheren Orten. Jede richtige Antwort ist ein Punkt für dich, jede falsche ein Punkt für ${l(i.name)}, und du hast <strong>einen Versuch</strong> pro Antwort. Bei Code-Aufgaben (3 Punkte) darfst du so oft prüfen, wie du willst, aber es gibt keine Tipps. Ab <strong>${Math.round(c.bestanden*100)} %</strong> reißt das Gespinst: ${P.abnahme} XP beim ersten Sieg, +${P.abnahmePerfekt} bei 100 %. Kein Nachlesen im Duell, dafür davor: <a href="#/spickzettel">Spickzettel</a>.
      </div>
      <div class="schritt-buttons"><button class="btn btn-primaer btn-gross" type="button" id="start">Gespinst zerreißen →</button><a class="btn btn-geist" href="#/ort/${n}">Erst nochmal nachlesen</a></div>
    </section>`,x.querySelector("#start").addEventListener("click",()=>{$.klick(),j()})}function j(){if(d++,d>=h.length)return Y();const e=h[d];o.querySelector("#zaehler").textContent=`Aufgabe ${d+1} von ${h.length}`,J.forEach((s,a)=>{s.classList.toggle("aktiv",a===d),s.classList.toggle("erledigt",a<d&&O[a]?.ok)}),x.innerHTML="";const t=document.createElement("section");t.className=`schritt schritt-${e.type} pager-seite slide-vor`,x.appendChild(t);let S=!1,L=!1,u=0;const m=s=>{if(L)return;L=!0;const a=s?w(e):0;z+=a,s||(C+=w(e)),O.push({ok:s,titel:`${fe[e.type]} ${he[e.type]} ${d+1}`,punkte:a,max:w(e)}),Q(),e.konzept&&le(Z(),e.konzept,s);const y=document.createElement("div");y.className="schritt-buttons";const p=document.createElement("button");p.type="button",p.className="btn btn-primaer",p.textContent=d+1<h.length?"Nächste Aufgabe →":"Ergebnis ansehen ✔",p.addEventListener("click",j),y.appendChild(p),t.appendChild(y),p.focus()};de(t,e,{hints:!1,allowSolution:!1,solved:()=>{if(e.type==="code"||!S){if(W++,H("correct"),$.richtig(),W%3===0){const s=k.erfolg();s&&F(t,s.id,s.text,{art:"lob",pose:s.pose,klein:!0})}m(!0)}else m(!1)},wrong:()=>{if(u++,e.type!=="code"&&!S){S=!0,H("wrong"),$.falsch();const s=k.fehler(1),a=document.createElement("div");a.className="rueckmeldung rueckmeldung-fehler",a.innerHTML=`<strong>Leider falsch – Punkt für ${l(i.name)}.</strong> Löse die Aufgabe trotzdem zu Ende, dann geht es weiter.`,t.appendChild(a),s&&F(t,s.id,s.text,{art:"spott",klein:!0,meta:"Duell"})}else if(e.type==="code"){H("wrong"),$.falsch();const s=k.fehler(u);s&&F(t,s.id,s.text,{art:"spott",klein:!0,meta:`${u}. Versuch`})}}})}function Y(){const e=z/N,t=e>=c.bestanden,S=Z().boss[n],L=t&&!S?.passed;ie(n,{anteil:e,passed:t});let u=0,m=null;t&&(m=_(P.abnahme,{key:`${n}#abnahme`}),u+=m.xp,e>=1&&(u+=_(P.abnahmePerfekt,{key:`${n}#abnahme-perfekt`}).xp));const s=re({ereignis:"duell"}),a=X[E+1],y=a?G.orte.find(r=>r.chapter===a.id):null,p=Math.round(e*100),M=t?k.rueckzug():null,A=t?null:k.fehler(4),I=t?b?.befreit?.text||`Passt. ${i.name} ist weg. Weiter zum nächsten Ort.`:`Fast. Ab ${Math.round(c.bestanden*100)} % reißt das Gespinst. Schau dir die roten Punkte an, lies kurz nach und versuch es nochmal.`,B=t&&v?G.finale:null;x.innerHTML=`<section class="schritt abschluss auftritt duell-ende">
      <div class="duell-ergebnis">
        ${V("sam",{groesse:72,titel:"Sam"})}
        <span class="duell-stand" style="font-size:2.4rem">${z} : ${C}</span>
        <span class="${t?"gespinst-zerrissen":""}">${D(f,{groesse:84,titel:i.name})}</span>
      </div>
      <h2>${t?v?"Das Netz hält. Seidra weicht.":`${l(b?.name||"Der Ort")} ist befreit!`:"Noch nicht befreit"}</h2>
      <div class="abschluss-xp">${p} %</div>
      ${M?g(M.id,M.text,{art:"spott"}):""}
      ${A?g(A.id,A.text,{art:"spott"}):""}
      ${B?B.text.map(r=>g(r.wer,r.text,{art:K(r.wer)?.rolle==="gespinst"?"spott":"rede"})).join(""):g(b?.befreit?.wer||"sam",I,{art:"rede"})}
      ${t?"":`<p style="font-size:0.9rem"><a href="#/spickzettel">📖 Spickzettel</a> und die <a href="#/ort/${n}">Lektionen des Ortes</a> helfen vor dem nächsten Versuch. Im Duell selbst gibt es kein Nachlesen.</p>`}
      ${u?`<div class="abschluss-xp">+${u} XP</div>`:L?"":t?'<p style="color:var(--muted)">Der Ort war schon befreit, keine neuen XP.</p>':""}
      <ul class="abschluss-liste">${O.map(r=>`<li><span>${r.ok?"✅":"❌"} ${r.titel}</span><span>${r.punkte}/${r.max}</span></li>`).join("")}</ul>
      <div class="abschluss-buttons">
        ${t&&v?'<a class="btn btn-primaer" href="#/showtime">🎆 Funkenfest: Website zeigen →</a>':""}
        ${t&&a?`<a class="btn btn-primaer" href="#/ort/${a.id}">Ort ${E+2}: ${l(y?.name||a.title)} →</a>`:""}
        ${t?"":`<a class="btn btn-primaer" href="#/duell/${n}" onclick="location.reload()">Nochmal</a>`}
        <a class="btn btn-sekundaer" href="#/ort/${n}">Zum Ort</a>
        <a class="btn btn-geist" href="#/">Hyperia</a>
      </div>
    </section>`,t?($.fanfare(),me(v?"gross":"mittel"),m?.levelup&&setTimeout(()=>ue(m.levelup),900)):$.alarm(),pe(s)}return U(),{}}export{Se as renderDuell};
