import React,{useState} from 'react';
import {createRoot} from 'react-dom/client';
import './style.css';

const matches=[
 {id:1,league:'Football • Démo',time:'18:00',home:'Équipe A',away:'Équipe B',odds:[1.65,3.40,4.80]},
 {id:2,league:'Football • Démo',time:'20:45',home:'Équipe C',away:'Équipe D',odds:[2.10,3.20,3.10]},
 {id:3,league:'Football • Démo',time:'21:00',home:'Équipe E',away:'Équipe F',odds:[1.90,3.30,3.70]}
];
function App(){
 const [tab,setTab]=useState('Sport'); const [slip,setSlip]=useState([]); const [balance,setBalance]=useState(1000);
 const add=(m,i)=>{const key=m.id+'-'+i;setSlip(s=>s.some(x=>x.key===key)?s.filter(x=>x.key!==key):[...s.filter(x=>x.id!==m.id),{key,id:m.id,name:m.home+' - '+m.away,selection:['1','X','2'][i],odd:m.odds[i]}])};
 const total=slip.reduce((a,x)=>a*x.odd,1); const place=()=>{const stake=Number(prompt('Mise virtuelle (DT):','10'));if(!stake||stake<=0||stake>balance)return;setBalance(b=>b-stake);alert('Pari virtuel enregistré. Gain potentiel: '+(stake*total).toFixed(2)+' DT');};
 return <div className="app"><header><div className="logo">Vira<span>Bet</span></div><div className="balance">💰 {balance.toFixed(2)} DT</div></header>
 <nav>{['Sport','Live','Virtuels','Casino','Live Casino'].map(x=><button className={tab===x?'active':''} onClick={()=>setTab(x)}>{x}</button>)}</nav>
 <main><section className="hero"><h1>{tab}</h1><p>Plateforme de paris <b>100% virtuelle</b> — aucun dépôt ni retrait réel.</p></section>
 {tab==='Sport'||tab==='Live'?<div className="grid">{matches.map(m=><article className="match"><div className="meta">{m.league}<span>{tab==='Live'?'🔴 LIVE':m.time}</span></div><div className="teams"><b>{m.home}</b><span>vs</span><b>{m.away}</b></div><div className="odds">{m.odds.map((o,i)=><button className={slip.some(x=>x.key===m.id+'-'+i)?'selected':''} onClick={()=>add(m,i)}>{['1','X','2'][i]}<strong>{o.toFixed(2)}</strong></button>)}</div></article>)}</div>:<div className="empty">Section {tab} — bientôt disponible.</div>}
 </main><aside><h2>🎫 Coupon</h2>{slip.length===0?<p className="muted">Sélectionne une cote pour commencer.</p>:<>{slip.map(x=><div className="bet"><span>{x.name}<small>{x.selection} • {x.odd.toFixed(2)}</small></span><button onClick={()=>setSlip(s=>s.filter(y=>y.key!==x.key))}>×</button></div>)}<div className="summary"><span>Cote totale</span><b>{total.toFixed(2)}</b></div><button className="place" onClick={place}>VALIDER LE PARI VIRTUEL</button></>}</aside><footer>ViraBet • monnaie virtuelle uniquement</footer></div>}
createRoot(document.getElementById('root')).render(<App/>);
