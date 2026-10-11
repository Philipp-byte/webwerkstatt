import{e as c,s as Q,l as L,a as O,b as E,g as H,c as Z,d as A,f as D,h as M}from"./index-q1WDSUZc.js";import{l as I,k as w,a as S,n as F,s as G,b as K}from"./figuren-BwUP6XLO.js";const b=[[70,580],[150,552],[200,500],[160,430],[130,360],[175,285],[240,282],[300,330],[300,400],[350,470],[400,440],[425,380],[395,320],[420,260],[455,210],[430,150],[440,90],[360,24]],W={quelle:"M30 560 Q 60 470 150 500 Q 230 520 250 600 Q 170 640 60 620 Z",runenmark:"M60 180 Q 160 120 300 200 Q 360 250 330 360 Q 250 380 150 340 Q 70 300 60 180 Z",kaskadia:"M150 380 Q 260 330 400 420 Q 470 470 420 560 Q 300 600 250 520 Q 200 470 150 380 Z",funkenland:"M330 60 Q 450 40 520 140 Q 540 230 470 300 Q 400 320 340 260 Q 300 180 330 60 Z",festgelaende:"M400 330 Q 500 300 540 380 Q 550 450 490 470 Q 430 460 400 400 Z"},q={quelle:[120,636],runenmark:[92,170],kaskadia:[330,600],funkenland:[540,500],festgelaende:null};function N($=b.length){let i=`M ${b[0][0]} ${b[0][1]}`;for(let d=1;d<$;d++){const[r,o]=b[d-1],[h,f]=b[d],l=(h-r)*.5;i+=` C ${r+l} ${o+(f-o)*.2}, ${h-l} ${f-(f-o)*.2}, ${h} ${f}`}return i}function B($,i,d,{klein:r=!1}={}){const o=$.findIndex(a=>d.get(a.chapter)?.jetzt),h=$.filter(a=>d.get(a.chapter)?.befreit).length,f=Math.max(1,o>=0?o+1:h),l=i.map(a=>`<path d="${W[a.id]||""}" fill="${a.farbe}" opacity="${r?.12:.14}"/>`).join(""),p=r?"":i.map(a=>{const g=q[a.id];return g?`<text x="${g[0]}" y="${g[1]}" fill="#8b84ad" font-size="10" letter-spacing="2" text-anchor="${a.id==="funkenland"?"end":"start"}" font-family="Unbounded Variable, sans-serif" font-weight="700">${c(a.name.toUpperCase())}</text>`:""}).join(""),x=`<g fill="none" stroke="#4a3a7a" stroke-width="1.4" opacity="0.9">
      <path d="M360 20 L120 330 M360 20 L540 300 M360 20 L250 220 M360 20 L470 480 M360 20 L560 160 M360 20 L60 600"/>
      <path d="M250 120 Q 360 90 470 130 M200 200 Q 360 160 520 230 M180 280 Q 360 240 540 330 M300 330 Q 420 300 530 400 M140 420 Q 320 380 520 470"/>
    </g>`,m=$.map((a,g)=>{const[k,e]=b[g],t=d.get(a.chapter)||{},n=t.befreit?"ort-frei":t.jetzt?"ort-jetzt":t.frei?"ort-offen":"ort-schatten",v=g===$.length-1,s=t.jetzt?17:13,z=!r&&(t.befreit||t.jetzt),u=k+(k>300?-22:22),y=k>300?"end":"start";let j;return v&&!t.befreit?j=`<foreignObject x="${k-24}" y="${e-22}" width="48" height="48">${Q("seidra",{groesse:48,titel:"Seidra"})}</foreignObject>`:j=`<circle cx="${k}" cy="${e}" r="${s}" class="ort-kreis"/><text x="${k}" y="${e+(t.jetzt?4.5:3.6)}" text-anchor="middle" class="ort-nr" font-size="${t.jetzt?12:10}">${a.nr}</text>`,`<g class="ort ${n}" data-chapter="${a.chapter}" tabindex="${t.frei||t.befreit?0:-1}" role="${t.frei||t.befreit?"link":"img"}" aria-label="Ort ${a.nr}: ${c(a.name)}${t.befreit?" (befreit)":t.jetzt?" (jetzt)":" (unter dem Netz)"}">
        ${t.jetzt?`<circle cx="${k}" cy="${e}" r="26" class="ort-puls"/>`:""}
        ${j}
        ${z?`<text x="${u}" y="${e+4}" text-anchor="${y}" class="ort-name" font-size="${t.jetzt?11:10}">${c(a.name)}</text>`:""}
        <title>Ort ${a.nr} · ${c(a.name)}</title>
      </g>`}).join("");return`<svg class="hyperia-karte ${r?"klein":""}" viewBox="0 0 560 640" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Karte von Hyperia: ${h} von ${$.length} Orten befreit">
    ${l}
    ${x}
    <path d="${N()}" fill="none" stroke="#4a3a7a" stroke-width="4" stroke-dasharray="6 8" stroke-linecap="round"/>
    <path d="${N(f)}" fill="none" stroke="#ffc53d" stroke-width="4" stroke-linecap="round" opacity="0.95"/>
    ${p}
    ${m}
  </svg>`}function C($,{frei:i,ziel:d=r=>`#/ort/${r}`}={}){$.querySelectorAll(".hyperia-karte .ort").forEach(r=>{const o=r.dataset.chapter,h=()=>{i(o)&&(location.hash=d(o))};r.addEventListener("click",h),r.addEventListener("keydown",f=>(f.key==="Enter"||f.key===" ")&&(f.preventDefault(),h()))})}async function T($){const[i,d,r]=await Promise.all([L(),O(),E()]);await I(),H();const o=new Map,h=i.findIndex((e,t)=>w(t,i)&&!S(e).abgenommen);i.forEach((e,t)=>{const n=S(e);o.set(e.id,{...n,befreit:n.abgenommen,jetzt:t===h,frei:w(t,i)})});const f=[...o.values()].filter(e=>e.befreit).length,l=await F(i,r,w).catch(()=>null),p=l?.ort||null,x=f===i.length;let m;if(x)m=`<div class="karte weiter-karte frei">
      ${Q("funke",{groesse:72,titel:"Funkenfest"})}
      <div>
        <span class="chip chip-gold">Hyperia ist frei</span>
        <h2>Das Funkenfest kann beginnen.</h2>
        <p>Alle achtzehn Orte leuchten. Seidra ist in der Tiefe. Zeig allen deine Website.</p>
        <a class="btn btn-primaer" href="#/showtime">Zur Showtime →</a>
      </div></div>`;else if(l){const e=l.eintrag,t=!Z(l.kapitel.id),n=t?`${p.gespinstName} hat ${p.name} besetzt.`:e.art==="lektion"?`Weiter: ${e.titel}`:e.art==="duell"?`Duell gegen ${p.gespinstName}`:e.titel,v=t?c(p.fallenart):e.art==="lektion"?`${e.untertitel} ${e.nr} von ${l.kapitel.lessons.length} · ${c(l.kapitel.title)}`:c(e.untertitel||""),s=t?`#/ort/${l.kapitel.id}`:e.href,z=t?`${p.name} betreten →`:e.art==="lektion"?"Weiter →":e.art==="duell"?"Zum Duell →":`${e.titel.split(":")[0]} →`,u=p.einleitung?.[0]?.text;m=`<div class="karte weiter-karte">
      ${Q(p.gespinst,{groesse:72,titel:p.gespinstName})}
      <div>
        <span class="chip chip-gespinst">Ort ${p.nr} · ${c(p.name)} · ${c(p.regionName)}</span>
        <h2>${c(n)}</h2>
        <p>${v}</p>
        ${t&&u?`<div class="gespinst-zeile">${c(p.gespinstName.toUpperCase())} › „${c(u)}“</div>`:""}
        <a class="btn btn-primaer" href="${s}">${c(z)}</a>
      </div></div>`}else m=`<div class="karte weiter-karte"><div><h2>Hyperia wartet.</h2><a class="btn btn-primaer" href="#/ort/${i[0].id}">Quellgrund betreten →</a></div></div>`;const a=l?`${l.kapitel.id}:start`:null,g=l&&d.seidra?.[l.kapitel.id]?.wann==="start"&&!A(a)?d.seidra[l.kapitel.id]:null,k=d.regionen.map(e=>{const t=r.filter(n=>n.region===e.id);return`<div class="region-block">
        <div class="region-titel" style="--f:${e.farbe}"><span>${c(e.name)}</span><small>${c(e.text)}</small></div>
        ${t.map(n=>{const v=i.find(y=>y.id===n.chapter),s=o.get(n.chapter),z=s.befreit?"frei":s.jetzt?"jetzt":s.frei?"offen":"schatten",u=s.befreit?`befreit · ${n.gespinstName} vertrieben · ${s.sterne} von ${s.maxSterne} Sternen`:s.jetzt?`${s.erledigt} / ${s.gesamt} Lektionen · Gespinst ${n.gespinstName}`:s.frei?`${s.erledigt} / ${s.gesamt} Lektionen`:`unter dem Netz · Gespinst ${n.gespinstName}`;return`<a class="ort-zeile ${z}" href="${s.frei?`#/ort/${n.chapter}`:"#/"}" ${s.frei?"":'aria-disabled="true"'}>
              <span class="ort-nr-kachel">${s.befreit||s.frei?n.nr:"🕸"}</span>
              <span class="ort-zeile-text"><strong>${c(n.name)} · ${c(v?.title||"")}</strong><small>${u}</small></span>
              <span class="ort-zeile-rechts">${s.befreit?G(Math.round(s.sterne/Math.max(1,s.maxSterne)*3)):s.jetzt?'<span class="chip chip-jetzt">Jetzt</span>':""}</span>
            </a>`}).join("")}
      </div>`}).join("");$.innerHTML=`
    <div class="hyperia-seite auftritt">
      <div class="hyperia-lage">
        <div>
          ${m}
          ${g?`<div class="seidra-auftritt" id="seidra">${K("seidra",g.text,{art:"spott"})}<button class="btn btn-geist btn-klein" type="button" id="seidra-weg">Weiter ohne sie</button></div>`:""}
          <div class="orte-liste">${k}</div>
          <div class="schnellzugriff">
            <a class="schnell-karte" href="#/projekt"><span class="icon">🌐</span><span><strong>Deine Website</strong><small>Die FUNKEN-Seite wächst mit jedem Ort</small></span></a>
            <a class="schnell-karte" href="#/spickzettel"><span class="icon">📖</span><span><strong>Spickzettel</strong><small>Alle Regeln als Karten</small></span></a>
          </div>
        </div>
        <div class="karte karte-hyperia">
          <h3>Hyperia · ${f} von ${i.length} Orten befreit</h3>
          ${B(r,d.regionen,o)}
          <div class="stand">${x?"Das Netz ist zerrissen. Hyperia leuchtet.":"Jeder befreite Ort leuchtet. Das Netz zieht sich zurück."}</div>
        </div>
      </div>
    </div>`,C($,{frei:e=>!!o.get(e)?.frei||!!o.get(e)?.befreit}),$.querySelector("#seidra-weg")?.addEventListener("click",()=>{D(a),M.klick(),$.querySelector("#seidra")?.remove()}),g&&M.alarm?.()}export{T as renderKarte};
