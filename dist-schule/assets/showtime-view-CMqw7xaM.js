import{S as y,_ as S,T as h,v,h as b,w}from"./index-q1WDSUZc.js";import{c as E,v as T,m as L}from"./lesson-view-CIAIDwXF.js";import{r as x}from"./checker-TvFk0fyq.js";import{b as z}from"./preview-dc6lnWue.js";import{t as g,k as C}from"./celebrate-CzG_yRvC.js";import"./figuren-BwUP6XLO.js";import"./nachschlagen-CiV0SDqc.js";const j=`<!DOCTYPE html>
<html lang="de">
  <head>
    <meta charset="utf-8">
    <title>Meine Website</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <header>
      <h1>Mein Thema</h1>
    </header>
    <nav>
    </nav>
    <main>
    </main>
    <footer>
    </footer>
    <script src="script.js"><\/script>
  </body>
</html>
`,A=`body {
  font-family: Arial, sans-serif;
}
`,K=`// Dein JavaScript
`,a=[{titel:"Grundgerüst mit Titel und Zeichensatz",tests:[{type:"source",file:"html",matches:"<!doctype html"},{type:"source",file:"html",matches:"<meta[^>]+charset"},{type:"selector",selector:"title"}]},{titel:"Eine Hauptüberschrift (h1) und mindestens zwei Zwischenüberschriften (h2)",tests:[{type:"selector",selector:"h1",count:1},{type:"selector",selector:"h2",min:2}]},{titel:"Mindestens drei Absätze",tests:[{type:"selector",selector:"p",min:3}]},{titel:"Eine Navigation (nav) mit mindestens drei Links",tests:[{type:"selector",selector:"nav a",min:3}]},{titel:"Eine Liste (ul oder ol) mit mindestens drei Einträgen",tests:[{type:"selector",selector:"ul li, ol li",min:3}]},{titel:"Ein Bild mit Alternativtext",tests:[{type:"selector",selector:"img[alt]"},{type:"attr",selector:"img",attr:"alt",matches:"\\S"}]},{titel:"Eine Tabelle mit Kopfzeile",tests:[{type:"selector",selector:"table th",min:1},{type:"selector",selector:"table tr",min:2}]},{titel:"Ein Formular mit Eingabefeld, Label und Knopf",tests:[{type:"selector",selector:"form input"},{type:"selector",selector:"form label"},{type:"selector",selector:'form button, form input[type="submit"]'}]},{titel:"Semantische Struktur: header, main, footer",tests:[{type:"selector",selector:"header"},{type:"selector",selector:"main"},{type:"selector",selector:"footer"}]},{titel:"Ein Link zu einem Impressum-Abschnitt oder einer Impressum-Seite",tests:[{type:"attr",selector:"a",attr:"href",matches:"impressum",any:!0}]},{titel:"CSS: eigene Schrift und Farben für body und h1",tests:[{type:"source",file:"css",matches:"body\\s*\\{[^}]*font-family"},{type:"source",file:"css",matches:"h1\\s*\\{[^}]*color"}]},{titel:"CSS: mindestens eine Klasse verwendet und gestaltet",tests:[{type:"selector",selector:"[class]"},{type:"source",file:"css",matches:"\\.[a-zA-Z][\\w-]*\\s*\\{"}]},{titel:"CSS: Box-Modell benutzt (padding und border oder margin)",tests:[{type:"source",file:"css",matches:"padding\\s*:"},{type:"source",file:"css",matches:"(border|margin)\\s*:"}]},{titel:"CSS: Navigation als Flexbox",tests:[{type:"style",selector:"nav",prop:"display",expected:"flex"}]},{titel:"JavaScript: ein Knopf verändert beim Klick etwas auf der Seite",tests:[{type:"source",file:"js",matches:`addEventListener\\s*\\(\\s*["']click`},{type:"source",file:"js",matches:"getElementById|querySelector"}]}];async function Z(t){const u=y();t.innerHTML=`
    <div class="auftritt">
      <a class="zurueck" href="#/">← Hyperia</a>
      <div style="display:flex;flex-wrap:wrap;gap:1rem;align-items:center;margin:0.5rem 0 0.5rem">
        <h1 style="margin:0;flex:1">🎆 Showtime – deine eigene Website</h1>
        <span class="chip chip-farbe" id="stand" style="--farbe: var(--projekt)">0 / ${a.length} Pflicht-Kriterien</span>
      </div>
      <p style="color:var(--ink-2);max-width:70ch">Jetzt bist du dran: eine Website zu <strong>deinem</strong> Thema – Verein, Hobby, Lieblingsspiel, Foodtruck, was du willst. Die Checkliste prüft die Pflicht-Kriterien automatisch; alles darüber hinaus ist Kür. Dein Stand wird automatisch gespeichert.</p>
      <div class="projekt-leiste">
        <button class="btn btn-primaer" type="button" id="pruefen">✔ Checkliste prüfen</button>
        <button class="btn btn-sekundaer" type="button" id="zip">⬇ Als ZIP herunterladen</button>
        <button class="btn btn-sekundaer" type="button" id="neu-tab">↗ Präsentieren (eigener Tab)</button>
      </div>
      <div class="showtime-werkbank" id="werkbank"></div>
      <div class="karte sektion">
        <h2>📋 Checkliste</h2>
        <ul class="checkliste" id="checkliste">${a.map(l=>`<li><span class="sym">○</span><span>${l.titel}</span></li>`).join("")}</ul>
        <p style="color:var(--muted);font-size:0.85rem;margin:0.75rem 0 0">Kür-Ideen: ein zweites Bild mit Bildunterschrift, hover-Effekte, ein Schatten auf Karten, ein Zähler-Knopf, ein Dark-Mode-Schalter.</p>
      </div>
    </div>`;const k={html:u.html??j,css:u.css??A,js:u.js??K};let p=null;const o=E(t.querySelector("#werkbank"),k,{onChange:()=>{clearTimeout(p),p=setTimeout(()=>h(o.getFiles()),800)}});async function f(l=!1){const c=o.getFiles();h(c);const i=t.querySelectorAll("#checkliste li");let r=0;for(let e=0;e<a.length;e++){const m=await x(c,a[e].tests);if(!t.isConnected||!i[e]?.isConnected)return;const s=m.every(n=>n.pass);i[e].classList.toggle("ok",s),i[e].querySelector(".sym").textContent=s?"✔":"○",s&&r++}if(t.querySelector("#stand").textContent=`${r} / ${a.length} Pflicht-Kriterien`,r===a.length){const e=y().pflichtErfuellt;if(h({pflichtErfuellt:!0}),!e){const m=v(300,{key:"showtime#pflicht"});T(m,t.querySelector("#stand")),C("gross"),b.fanfare(),g({titel:"Alle Pflicht-Kriterien erfüllt!",text:"Deine Website steht. Jetzt die Kür.",icon:"🎆",art:"ok",dauer:5e3})}L(w({ereignis:"showtime"}))}else l||b.klick()}return t.querySelector("#pruefen").addEventListener("click",()=>f(!1)),f(!0),t.querySelector("#neu-tab").addEventListener("click",()=>{const l=new Blob([z(o.getFiles(),{capture:!1})],{type:"text/html"});window.open(URL.createObjectURL(l),"_blank")}),t.querySelector("#zip").addEventListener("click",async()=>{const{default:l}=await S(async()=>{const{default:n}=await import("./jszip.min-BQ7-ZQoZ.js").then(d=>d.j);return{default:n}},[]),c=new l,i=c.folder("meine-website"),r=o.getFiles();i.file("index.html",r.html),i.file("style.css",r.css),i.file("script.js",r.js);const e=new Set([...r.html.matchAll(/(?:src|href)="([^"]+\.(?:svg|wav|mp4|png|jpg))"/g)].map(n=>n[1]));await Promise.all([...e].map(async n=>{try{const d=await fetch(new URL(`uebung/${n}`,document.baseURI));d.ok&&i.file(n,await d.blob())}catch{}}));const m=await c.generateAsync({type:"blob"}),s=document.createElement("a");s.href=URL.createObjectURL(m),s.download="meine-website.zip",document.body.appendChild(s),s.click(),s.remove(),g({titel:"ZIP heruntergeladen",text:"Entpacken und index.html öffnen.",icon:"📦",art:"ok"})}),{destroy:()=>{clearTimeout(p),h(o.getFiles()),o.destroy()}}}export{a as PFLICHT,Z as renderShowtime};
