import{l as te,g as H,o as ne,p as se,e as s,y as ie,X as N,s as R,h as z,A as V,v as ae,w as re,B as le,C as q,D as J,x as U,z as Q}from"./index-q1WDSUZc.js";import{v as oe,m as ue,r as ce}from"./lesson-view-CIAIDwXF.js";import{k as de}from"./celebrate-CzG_yRvC.js";import{c as he,f as fe,g as ge,h as $e,S as Y,e as D,i as me,j as pe}from"./figuren-BwUP6XLO.js";import{o as be}from"./nachschlagen-CiV0SDqc.js";import"./preview-dc6lnWue.js";import"./checker-TvFk0fyq.js";async function Ee(o,t,m,i){const E=await te();if(!t){const e=H(),a=E.filter(c=>c.lessons.some(b=>e.lessons[`${c.id}/${b}`]?.done));t=(a.length?a[a.length-1]:E[0]).id}const[u,S]=await Promise.all([ne(t),se(t)]),h=await he(t),p=fe(h.gespinstId)||{name:"Das Gespinst"},M=i==="sturm",P=!!i&&!M;if(!m)return ke(o,u,S);const{spiel:n,aufgaben:C}=await ge(m,t,{nurKapitel:M});if(!n){o.innerHTML=`<div class="lektion-seite"><a class="zurueck" href="#/ort/${t}">← ${s(S?.name||u.title)}</a><div class="karte gesperrt-karte"><h2>Noch zu wenig Vorrat</h2><p>Für einen Hinterhalt braucht es gelernten Stoff. Schließ erst ein paar Lektionen ab.</p></div></div>`;return}n.id!==m&&(m=n.id);const j=i?ie(t,i):null,X=n.typ==="quiz"?C.flatMap(e=>[$e(e,Math.random()<.5)]).slice(0,n.runden):C.slice(0,n.runden),f=X.length;let y=0,x=0,g=0,d=n.zeit,L=!1,T=null;const F=new Set;o.innerHTML=`
    <div class="hinterhalt-seite">
      <div class="alarm"><span class="punkt"></span><span class="alarm-text">HINTERHALT · ${s(p.name)} ${s(n.angriff)}${S?` · ${s(S.name)}`:""}</span><span class="timer" id="timer">${W(d)}</span></div>
      <div class="hinterhalt">
        <div class="hh-kopf">
          <a class="zurueck" href="#/ort/${t}">← ${s(S?.name||u.title)}</a>
          <h2>${n.icon} ${s(n.titel)}</h2>
          <span class="hh-runde" id="runde">Runde 1 von ${f}</span>
          <span class="hh-punkte" id="punkte">0 Punkte</span>
        </div>
        <div id="buehne"></div>
        <div class="spiel-leiste">${Y.map(e=>`<a class="spiel-kachel ${e.id===n.id?"an":""}" href="#/hinterhalt/${t}/${e.id}${i?`/${i}`:""}" ${e.id===n.id?'aria-current="true"':""}><span>${e.icon}</span>${s(e.titel)}</a>`).join("")}</div>
      </div>
    </div>`;const k=o.querySelector("#buehne"),K=o.querySelector("#timer"),_=o.querySelector("#runde"),O=o.querySelector("#punkte");function W(e){return`${Math.floor(e/60)}:${String(e%60).padStart(2,"0")}`}function I(){k.innerHTML=`<section class="schritt auftritt hinterhalt-start">
      <div class="duell-buehne">${R(h.gespinstId||"knoten",{groesse:110,klasse:"sigil-gross",titel:p.name})}
        <div><h3>${s(p.name)} ${s(n.angriff)}.</h3>
        <p>${s(n.text)} <strong>${f} Runden in ${n.zeit} Sekunden.</strong> ${M?"Nur Aufgaben dieses Ortes, als Warm-up vor dem Duell.":"Aufgaben aus allen befreiten Orten, fällige zuerst."}</p>
        <p style="color:var(--muted);font-size:0.9rem">Sterne: ab 40 % einer, ab 70 % zwei, ab 90 % drei. ${P&&!j?`XP gibt es für diesen Hinterhalt einmal: ${N.hinterhalt} + ${N.hinterhaltStern} je Stern.`:"Dieser Durchgang bringt Sterne und Rekorde, keine neuen XP."}</p>
        <div class="schritt-buttons"><button class="btn btn-primaer btn-gross" type="button" id="los">Los →</button></div></div>
      </div></section>`,k.querySelector("#los").addEventListener("click",()=>{z.klick(),L=!0,T=setInterval(()=>{d--,K.textContent=W(d),K.classList.toggle("knapp",d<=10),d<=10&&d>0&&z.tick(),d<=0&&B()},1e3),Z()})}function G(e=700){setTimeout(()=>{L&&(y++,Z())},e)}function Z(){if(!L)return;if(y>=f)return B();_.textContent=`Runde ${y+1} von ${f}`;const e=X[y];k.innerHTML="";const a=document.createElement("section");a.className=`schritt schritt-${e.type||"wahr"} slide-vor hinterhalt-karte`,k.appendChild(a),e.konzept&&F.add(e.konzept);let c=!1,b=!1;if(n.typ==="quiz"){a.innerHTML=`<div class="schritt-art">👉 Wahr oder Lüge</div><div class="schritt-inhalt wahr-frage">${q(e.frage)}</div>
        <div class="wahr-aussage">${q(e.antwort)}</div>
        <div class="wahr-knoepfe"><button class="btn btn-sekundaer btn-gross" type="button" data-w="1">✔ Wahr</button><button class="btn btn-sekundaer btn-gross" type="button" data-w="0">✘ Lüge</button></div>`,a.querySelectorAll(".wahr-knoepfe button").forEach(l=>{l.addEventListener("click",()=>{if(b)return;b=!0;const $=l.dataset.w==="1"===e.wahr;if(a.querySelectorAll(".wahr-knoepfe button").forEach(v=>v.disabled=!0),l.classList.add($?"richtig":"falsch"),J(e.id),e.konzept&&U(H(),e.konzept,$),$)x++,g+=2,z.richtig();else{Q("wrong"),z.falsch();const v=h.fehler(1);v&&D(a,v.id,v.text,{art:"spott",klein:!0})}const w=document.createElement("div");w.className=`rueckmeldung ${$?"rueckmeldung-ok":"rueckmeldung-fehler"}`,w.innerHTML=`<strong>${$?"Richtig.":e.wahr?"Das war wahr.":"Das war eine Lüge."}</strong> ${e.erklaerung?q(e.erklaerung):""}`,a.appendChild(w),O.textContent=`${g} Punkte`,G($?900:1800)})});return}ce(a,e,{hints:!1,allowSolution:!1,solved:()=>{if(!b){if(b=!0,J(e.id),e.konzept&&U(H(),e.konzept,!c),!c&&(x++,g+=n.typ==="pair"?4:2,z.richtig(),x%3===0)){const l=h.erfolg();l&&D(a,l.id,l.text,{art:"lob",pose:l.pose,klein:!0})}O.textContent=`${g} Punkte`,G(900)}},wrong:()=>{if(!c){c=!0,Q("wrong"),z.falsch();const l=h.fehler(1);l&&D(a,l.id,l.text,{art:"spott",klein:!0})}}})}async function B(){if(!L&&y<f&&d>0)return;L=!1,clearInterval(T);const e=me(x,f),a=i?V(t,i,{spiel:n.id,punkte:g,max:f,sterne:e}):null;if(!i){const r=H();r.hinterhalte.rekorde[n.id]=Math.max(r.hinterhalte.rekorde[n.id]||0,g),V(t,`frei-${n.id}`,{spiel:n.id,punkte:g,max:f,sterne:e})}let c={xp:0};P&&!j&&(c=ae(N.hinterhalt+e*N.hinterhaltStern,{key:`${t}#${i}`}));const b=re({ereignis:"hinterhalt"}),l=await le().catch(()=>[]),A=[...F].slice(0,3).map(r=>l.find(ee=>ee.id===r)).filter(Boolean),$=P?ve(u,i):null,w=e===0?h.fehler(4):null,v=e>=2?h.rueckzug():null;k.innerHTML=`<section class="schritt spiel-ergebnis auftritt">
      <div class="sterne-gross">${[1,2,3].map(r=>`<span class="stern ${r<=e?"":"leer"}">★</span>`).join("")}</div>
      <div class="gross">${x} / ${f}</div>
      <h2>${e===3?`${s(p.name)} zieht sich zurück!`:e>=1?"Hinterhalt abgewehrt":"Das Gespinst hat dich erwischt"}</h2>
      <p style="color:var(--muted)">${g} Punkte · ${d>0?`${d} Sekunden übrig`:"Zeit abgelaufen"}${a&&a.punkte>g?` · dein Rekord hier: ${a.punkte}`:""}</p>
      ${v?`<div class="figur-blase figur-blase-spott an" style="--f:${s(p.farbe)}">${R(h.gespinstId,{groesse:44})}<div class="figur-blase-text"><b>${s(p.name)}</b>${s(v.text)}</div></div>`:""}
      ${w?`<div class="figur-blase figur-blase-spott an" style="--f:${s(p.farbe)}">${R(h.gespinstId,{groesse:44})}<div class="figur-blase-text"><b>${s(p.name)}</b>${s(w.text)}</div></div>`:""}
      ${c.xp?`<div class="abschluss-xp">+${c.xp} XP</div>`:""}
      ${A.length?`<div class="merksaetze"><h3>🛡️ Das hast du verteidigt</h3><ul>${A.map(r=>`<li><b>${s(r.titel)}:</b> ${s(r.merke||r.kurz||"")} <button class="btn btn-geist btn-klein nachlesen-konzept" type="button" data-id="${s(r.id)}">📖</button></li>`).join("")}</ul></div>`:""}
      <div class="abschluss-buttons">
        ${$?`<a class="btn btn-primaer" href="#/lektion/${t}/${$}">Weiter im Ort →</a>`:M?`<a class="btn btn-primaer" href="#/duell/${t}">Zum Duell →</a>`:""}
        <a class="btn btn-sekundaer" href="#/hinterhalt/${t}/${n.id}${i?`/${i}`:""}" onclick="setTimeout(()=>location.reload(),0)">Nochmal</a>
        <a class="btn btn-geist" href="#/ort/${t}">Zum Ort</a>
      </div>
    </section>`,k.querySelectorAll(".nachlesen-konzept").forEach(r=>r.addEventListener("click",()=>be({tab:"spickzettel",fokus:r.dataset.id,konzeptIds:[r.dataset.id]}))),e>=2&&de(e===3?"gross":"mittel"),z.fanfare(),oe(c,k),ue(b)}return I(),{destroy:()=>clearInterval(T)}}function ve(o,t){const m=Number(String(t).replace("h",""));if(Number.isNaN(m))return null;for(let i=0;i<o.lessons.length;i++)if(pe(o,i)===t)return o.lessons[i+1]||null;return null}async function ke(o,t,m,i){const E=H();o.innerHTML=`
    <div class="auftritt">
      <a class="zurueck" href="#/ort/${t.id}">← ${s(m?.name||t.title)}</a>
      <h1 style="margin-top:0.5rem">🕸 Hinterhalte</h1>
      <p style="color:var(--ink-2);max-width:60ch">Fünf kurze Spiele gegen die Uhr, mit Aufgaben aus allen befreiten Orten. Fällige Wiederholungen kommen zuerst. Jederzeit, so oft du willst.</p>
      <div class="backstage-grid">
        ${Y.map(u=>`<div class="karte spiel-karte">
          <div class="icon">${u.icon}</div>
          <h2>${s(u.titel)}</h2>
          <p style="color:var(--ink-2)">${s(u.text)} ${u.runden} Runden, ${u.zeit} Sekunden.</p>
          <div class="highscore">Rekord: ${E.hinterhalte.rekorde[u.id]||0} Punkte</div>
          <a class="btn btn-primaer" href="#/hinterhalt/${t.id}/${u.id}">Spielen →</a>
        </div>`).join("")}
      </div>
    </div>`}export{Ee as renderHinterhalt};
