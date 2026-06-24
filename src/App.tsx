// @ts-nocheck
import React, { useState, useRef, useEffect, useCallback } from "react";

const FT = {
  red:"#DA291C", navy:"#1A1A2E", white:"#FFFFFF", offWhite:"#F5F5F5",
  gray:"#E0E0E0", grayMid:"#AAAAAA", grayDark:"#555555",
  text:"#1A1A2E", textSub:"#555555", accent:"#0071C5",
  green:"#00A651", orange:"#F47920",
};

const CAMERA_DB = [
  { model:"FCM-MC51-C",  sku:"FCM-MC51-C",  name:"FortiCamera MC51-C",  cloudOnly:true,  type:"Indoor Mini-Cube",        resolution:"5MP",     fov:103, irRange:8,  poeStd:"802.3af", poeBudget:13, color:"#0071C5", desc:"5MP mini-cube, 2.0mm, 512GB SD, Wi-Fi",
    faceQ:{day:{"2":100,"5":92,"8":75,"12":52,"20":25},night:{"2":82,"5":68,"8":48,"12":28,"20":10}}, lprQ:{day:{"5":90,"10":72,"15":48,"20":28,"30":10},night:{"5":75,"10":55,"15":32,"20":15,"30":5}} },
  { model:"FCM-CD51-C",  sku:"FCM-CD51-C",  name:"FortiCamera CD51-C",  cloudOnly:true,  type:"Dome Indoor/Outdoor",     resolution:"5MP",     fov:103, irRange:20, poeStd:"802.3af", poeBudget:13, color:"#0071C5", desc:"5MP dome, 2.8mm fixed, IP67/IK10, 512GB SD",
    faceQ:{day:{"2":100,"5":92,"8":75,"12":52,"20":25},night:{"2":82,"5":68,"8":48,"12":28,"20":10}}, lprQ:{day:{"5":90,"10":72,"15":48,"20":28,"30":10},night:{"5":75,"10":55,"15":32,"20":15,"30":5}} },
  { model:"FCM-CD55-C",  sku:"FCM-CD55-C",  name:"FortiCamera CD55-C",  cloudOnly:true,  type:"Dome Indoor/Outdoor",     resolution:"5MP",     fov:100, irRange:20, poeStd:"802.3af", poeBudget:13, color:"#0071C5", desc:"5MP dome, 2.7-13mm varifocal, IP67/IK10, 512GB SD",
    faceQ:{day:{"2":100,"5":95,"8":80,"12":60,"20":35},night:{"2":85,"5":72,"8":55,"12":35,"20":14}}, lprQ:{day:{"5":95,"10":78,"15":58,"20":38,"30":16},night:{"5":80,"10":62,"15":42,"20":22,"30":8}} },
  { model:"FCM-FD55-CA", sku:"FCM-FD55-CA", name:"FortiCamera FD55-CA", cloudOnly:true,  type:"AI Dome Indoor/Outdoor",  resolution:"5MP",     fov:105, irRange:50, poeStd:"802.3at", poeBudget:25, color:FT.red, desc:"5MP AI dome, varifocal, DI/DO, IP67/IK10, 512GB SD",
    faceQ:{day:{"2":100,"5":98,"10":88,"15":70,"20":50},night:{"2":90,"5":80,"10":65,"15":45,"20":25}}, lprQ:{day:{"5":98,"10":88,"20":72,"30":52,"40":28},night:{"5":85,"10":70,"20":52,"30":32,"40":14}} },
  { model:"FCM-FB85-CA", sku:"FCM-FB85-CA", name:"FortiCamera FB85-CA", cloudOnly:true,  type:"AI Bullet Indoor/Outdoor", resolution:"8MP",    fov:84,  irRange:50, poeStd:"802.3at", poeBudget:25, color:FT.red, desc:"8MP AI bullet, varifocal, DI/DO, IP67/IK10, 1TB SD",
    faceQ:{day:{"2":100,"5":100,"10":95,"15":82,"20":65},night:{"2":92,"5":85,"10":72,"15":55,"20":35}}, lprQ:{day:{"5":100,"10":92,"20":80,"30":65,"50":38},night:{"5":90,"10":78,"20":62,"30":45,"50":20}} },
  { model:"FCM-CD51",    sku:"FCM-CD51",    name:"FortiCamera CD51",    cloudOnly:false, type:"Dome Indoor/Outdoor",     resolution:"5MP",     fov:103, irRange:20, poeStd:"802.3af", poeBudget:13, color:FT.grayDark, desc:"5MP dome, 2.8mm fixed, IP67/IK10",
    faceQ:{day:{"2":100,"5":92,"8":75,"12":52,"20":25},night:{"2":82,"5":68,"8":48,"12":28,"20":10}}, lprQ:{day:{"5":90,"10":72,"15":48,"20":28,"30":10},night:{"5":75,"10":55,"15":32,"20":15,"30":5}} },
  { model:"FCM-CD55",    sku:"FCM-CD55",    name:"FortiCamera CD55",    cloudOnly:false, type:"Dome Indoor/Outdoor",     resolution:"5MP",     fov:100, irRange:20, poeStd:"802.3af", poeBudget:13, color:FT.grayDark, desc:"5MP dome, 2.7-13mm varifocal, IP67/IK10",
    faceQ:{day:{"2":100,"5":95,"8":80,"12":60,"20":35},night:{"2":85,"5":72,"8":55,"12":35,"20":14}}, lprQ:{day:{"5":95,"10":78,"15":58,"20":38,"30":16},night:{"5":80,"10":62,"15":42,"20":22,"30":8}} },
  { model:"FCM-FD50",    sku:"FCM-FD50",    name:"FortiCamera FD50",    cloudOnly:false, type:"Dome",                    resolution:"5MP",     fov:102, irRange:30, poeStd:"802.3af", poeBudget:13, color:FT.grayDark, desc:"5MP dome, 2.8-12mm varifocal, IP66/IK10",
    faceQ:{day:{"2":100,"5":94,"8":78,"12":56,"20":30},night:{"2":84,"5":72,"8":52,"12":32,"20":12}}, lprQ:{day:{"5":93,"10":76,"15":55,"20":35,"30":14},night:{"5":78,"10":60,"15":40,"20":20,"30":7}} },
  { model:"FCM-FD51",    sku:"FCM-FD51",    name:"FortiCamera FD51",    cloudOnly:false, type:"Dome",                    resolution:"5MP",     fov:100, irRange:30, poeStd:"802.3af", poeBudget:13, color:FT.grayDark, desc:"5MP dome, 2.8mm fixed, IP66/IK10",
    faceQ:{day:{"2":100,"5":92,"8":75,"12":52,"20":25},night:{"2":82,"5":68,"8":48,"12":28,"20":10}}, lprQ:{day:{"5":90,"10":72,"15":48,"20":28,"30":10},night:{"5":75,"10":55,"15":32,"20":15,"30":5}} },
  { model:"FCM-FB50",    sku:"FCM-FB50",    name:"FortiCamera FB50",    cloudOnly:false, type:"Bullet Indoor/Outdoor",   resolution:"5MP",     fov:90,  irRange:30, poeStd:"802.3af", poeBudget:13, color:FT.grayDark, desc:"5MP bullet, 2.8-12mm varifocal, IP66/IK10",
    faceQ:{day:{"2":100,"5":96,"10":82,"15":62,"20":42},night:{"2":88,"5":76,"10":60,"15":40,"20":20}}, lprQ:{day:{"5":96,"10":84,"20":68,"30":48,"40":22},night:{"5":82,"10":66,"20":48,"30":28,"40":10}} },
  { model:"FCM-MC51",    sku:"FCM-MC51",    name:"FortiCamera MC51",    cloudOnly:false, type:"Indoor Mini-Cube",        resolution:"5MP",     fov:103, irRange:8,  poeStd:"802.3af", poeBudget:13, color:FT.grayDark, desc:"5MP mini-cube, 2.0mm fixed",
    faceQ:{day:{"2":100,"5":92,"8":75,"12":52,"20":25},night:{"2":82,"5":68,"8":48,"12":28,"20":10}}, lprQ:{day:{"5":90,"10":72,"15":48,"20":28,"30":10},night:{"5":75,"10":55,"15":32,"20":15,"30":5}} },
  { model:"FCM-FE120B",  sku:"FCM-FE120B",  name:"FortiCamera FE120B",  cloudOnly:false, type:"Fisheye",                 resolution:"12MP/9MP",fov:360, irRange:20, poeStd:"802.3at", poeBudget:22, color:FT.grayDark, desc:"12MP fisheye, 1.22mm, IP66/IK10",
    faceQ:{day:{"2":95,"4":78,"6":58,"8":38,"10":20},night:{"2":75,"4":55,"6":35,"8":18,"10":8}}, lprQ:{day:{"2":85,"4":65,"6":45,"8":25,"10":10},night:{"2":65,"4":45,"6":25,"8":10,"10":3}} },
];

const RECORDER_DB = [
  { sku:"FRC-400F",    name:"FortiRecorder 400F",    channels:64,   form:"1U Appliance",            hdd:"1×4TB (4×8TB max)", desc:"Up to 64 cameras, RAID 0/1/5/10, face recognition" },
  { sku:"FRC-100G",    name:"FortiRecorder 100G",    channels:16,   form:"1U Desktop",              hdd:"1×2TB",             desc:"Up to 16 cameras, desktop form factor" },
  { sku:"FRC-VM-BASE", name:"FortiRecorder VM Base", channels:1024, form:"VM (VMware/KVM/Hyper-V)", hdd:"Host storage",      desc:"Base 10 cams, stack FRC-VM-10/50/100 to 1024" },
];

const ACCESSORIES_DB = [
  { sku:"FCM-CD5-PCP-4",           name:"Pendant Cap (CD/FD series)",           cat:"Mount"   },
  { sku:"FCM-FD5-PDT-8",           name:"Pendant Arm (FD/FB series)",           cat:"Mount"   },
  { sku:"FCM-FB5-JBX-4",           name:"Junction Box",                          cat:"Mount"   },
  { sku:"FCM-CD5-WMT-8",           name:"Wall Mount L-type",                     cat:"Mount"   },
  { sku:"FCM-MOUNTSTH-2",          name:"Ceiling Mount",                         cat:"Mount"   },
  { sku:"FCM-MOUNTPOL-2",          name:"Pole Mount",                            cat:"Mount"   },
  { sku:"SP-FRC400F-HDD1",         name:"4TB HDD with Tray (FRC-400F)",          cat:"Storage" },
  { sku:"SP-FRC400F-HDD2",         name:"8TB HDD with Tray (FRC-400F)",          cat:"Storage" },
  { sku:"FC1-10-FCCLD-518-02-DD",  name:"FortiCamera Cloud Subscription/cam/yr", cat:"License" },
  { sku:"FRC-EXC-10",              name:"ONVIF Camera License ×10",              cat:"License" },
  { sku:"FRC-CLM-20",              name:"FortiRecorder Cloud Mode ×20 cams",     cat:"License" },
];






// ─── Helpers ──────────────────────────────────────────────────────────────────
const qColor=v=>v>=80?FT.green:v>=60?"#8BC34A":v>=40?FT.orange:v>=20?"#FF6B35":FT.red;
const qLabel=v=>v>=80?"Excellent":v>=60?"Good":v>=40?"Fair":v>=20?"Poor":"Unusable";
const poeColor=s=>s==="802.3at"?FT.orange:FT.green;
const interp=(def,dist,mode,type)=>{
  const tbl=(type==="face"?def.faceQ:def.lprQ)[mode];
  const keys=Object.keys(tbl).map(Number).sort((a,b)=>a-b);
  const d=Number(dist);
  if(d<=keys[0])return tbl[keys[0]];
  if(d>=keys[keys.length-1])return tbl[keys[keys.length-1]];
  for(let i=0;i<keys.length-1;i++){
    if(d>=keys[i]&&d<=keys[i+1]){
      const t=(d-keys[i])/(keys[i+1]-keys[i]);
      return Math.round(tbl[keys[i]]*(1-t)+tbl[keys[i+1]]*t);
    }
  }
  return 0;
};
const makeId=()=>Math.random().toString(36).slice(2,9);
const defFloor=()=>({id:makeId(),name:"Floor 1",img:null,imgW:0,imgH:0,pxPerFt:null,cameras:[],walls:[]});
const defOutdoorZone=()=>({id:makeId(),name:"Outdoor Zone 1",type:"outdoor",
  lat:null,lng:null,zoom:18,img:null,imgW:800,imgH:600,pxPerMeter:null,cameras:[],walls:[]});
const defProject=()=>({name:"New Project",customer:"",buildings:[{id:makeId(),name:"Building A",floors:[defFloor()],outdoorZones:[]}]});
const MAPBOX_TOKEN="pk.eyJ1IjoicmRld2l0dGU2NSIsImEiOiJjbXFzZGNxZ2wwMmRkMnBwbDk0Mndmb2p5In0.R_j9OJnOgFPgNkGYHd89WQ";
const getMapboxUrl=(lat,lng,zoom,w=800,h=600)=>
  'https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v12/static/'+
  lng+','+lat+','+zoom+',0/'+w+'x'+h+'?attribution=false&logo=false&access_token='+MAPBOX_TOKEN;
// px per meter at given lat/zoom (Mapbox formula)
const mapboxPxPerMeter=(lat,zoom)=>Math.cos(lat*Math.PI/180)*2*Math.PI*6378137/(256*Math.pow(2,zoom))*2;






// ─── Raycasting ───────────────────────────────────────────────────────────────
function raySegIntersect(ox,oy,dx,dy,ax,ay,bx,by){
  const ex=bx-ax,ey=by-ay;
  const denom=dx*ey-dy*ex;
  if(Math.abs(denom)<1e-9)return null;
  const t=((ax-ox)*ey-(ay-oy)*ex)/denom;
  const s=((ax-ox)*dy-(ay-oy)*dx)/denom;
  if(t<1e-8||s<-1e-8||s>1+1e-8)return null;
  return t;
}
function castRay(ox,oy,angle,maxR,walls){
  const dx=Math.cos(angle),dy=Math.sin(angle);
  let m=maxR;
  for(const w of walls){
    const t=raySegIntersect(ox,oy,dx,dy,w.x1,w.y1,w.x2,w.y2);
    if(t!==null&&t<m)m=t;
  }
  return m;
}
function buildVisPolygon(ox,oy,maxR,dirRad,halfFov,walls){
  const aMin=dirRad-halfFov, aMax=dirRad+halfFov;
  const angles=new Set();
  const steps=Math.max(80,Math.ceil((halfFov*2)/(Math.PI/180)));
  for(let i=0;i<=steps;i++) angles.add(aMin+(aMax-aMin)*i/steps);
  const EPS=0.0003;
  for(const w of walls){
    for(const [px,py] of [[w.x1,w.y1],[w.x2,w.y2]]){
      const a=Math.atan2(py-oy,px-ox);
      for(const da of [-EPS,0,EPS]){
        let rel=(a+da)-dirRad;
        while(rel>Math.PI)rel-=2*Math.PI;
        while(rel<-Math.PI)rel+=2*Math.PI;
        if(Math.abs(rel)<=halfFov+EPS*2)
          angles.add(Math.max(aMin,Math.min(aMax,a+da)));
      }
    }
  }
  const sorted=[...angles].sort((a,b)=>a-b);
  return sorted.map(angle=>{
    const t=castRay(ox,oy,angle,maxR,walls);
    return{x:ox+Math.cos(angle)*t, y:oy+Math.sin(angle)*t};
  });
}






// ─── Wall hit testing ─────────────────────────────────────────────────────────
// Returns {wallId, part:"p1"|"p2"|"body"} or null
function hitWall(pt, walls, tol){
  for(const w of walls){
    if(Math.hypot(pt.x-w.x1,pt.y-w.y1)<tol) return{wallId:w.id,part:"p1"};
    if(Math.hypot(pt.x-w.x2,pt.y-w.y2)<tol) return{wallId:w.id,part:"p2"};
    // Distance to segment
    const dx=w.x2-w.x1, dy=w.y2-w.y1;
    const len2=dx*dx+dy*dy;
    if(len2>0){
      const t=Math.max(0,Math.min(1,((pt.x-w.x1)*dx+(pt.y-w.y1)*dy)/len2));
      const nx=w.x1+t*dx, ny=w.y1+t*dy;
      if(Math.hypot(pt.x-nx,pt.y-ny)<tol) return{wallId:w.id,part:"body",t};
    }
  }
  return null;
}






// ─── Canvas Component ─────────────────────────────────────────────────────────
function FloorCanvas({floor,cameras,annotations,zones,zoneDraft,selCamId,selWallId,selAnnotId,
                      onSelectCam,onSelectWall,onMoveCam,onMoveWall,onAnnotationClick,onMoveAnnotation,
                      showFov,showSnap,mode,wallDraft,wallThick,mousePos,
                      onScalePt1,onScalePt2,onWallClick,onZoneClick,onZoneDblClick,zoneType,
                      scalePt2,
                      onCanvasMouseMove,
                      zoom,panX,panY,onZoom,onPanDelta,onWrapSize}){
  const cvRef=useRef(null);
  const wrapRef=useRef(null);
  const imgEl=useRef(null);
  const dragState=useRef(null); // {type:"cam"|"wall", ...}
  const panState=useRef(null);  // {startX,startY,startPanX,startPanY}
  const [hovCam,setHovCam]=useState(null);
  const [hovWall,setHovWall]=useState(null);

  // useLayoutEffect syncs ALL callback refs after every render, before any paint.
  // This is the definitive fix — refs are always current when mouse events fire.
  const modeRef=useRef(mode);
  const onScalePt1Ref=useRef(onScalePt1);
  const onScalePt2Ref=useRef(onScalePt2);
  const onWallClickRef=useRef(onWallClick);
  const onZoneClickRef=useRef(onZoneClick);
  const onZoneDblClickRef=useRef(onZoneDblClick);
  const onSelectCamRef=useRef(onSelectCam);
  const onSelectWallRef=useRef(onSelectWall);
  const onMoveCamRef=useRef(onMoveCam);
  const onMoveWallRef=useRef(onMoveWall);
  const onCanvasMouseMoveRef=useRef(onCanvasMouseMove);
  const annotationsRef=useRef(annotations);
  React.useLayoutEffect(()=>{
    modeRef.current=mode;
    annotationsRef.current=annotations;
    onScalePt1Ref.current=onScalePt1;
    onScalePt2Ref.current=onScalePt2;
    onWallClickRef.current=onWallClick;
    onZoneClickRef.current=onZoneClick;
    onZoneDblClickRef.current=onZoneDblClick;
    onSelectCamRef.current=onSelectCam;
    onSelectWallRef.current=onSelectWall;
    onMoveCamRef.current=onMoveCam;
    onMoveWallRef.current=onMoveWall;
    onCanvasMouseMoveRef.current=onCanvasMouseMove;
  }); // no deps = after every render, before paint
  const floorRef=useRef(floor);
  useEffect(()=>{floorRef.current=floor;},[floor]);
  const zoomRef=useRef(zoom); useEffect(()=>{zoomRef.current=zoom;},[zoom]);
  const panXRef=useRef(panX); useEffect(()=>{panXRef.current=panX;},[panX]);
  const panYRef=useRef(panY); useEffect(()=>{panYRef.current=panY;},[panY]);
  const camerasRef=useRef(cameras); useEffect(()=>{camerasRef.current=cameras;},[cameras]);

  // Canvas resolution:
  // • With image: use natural image dimensions (keeps coordinate precision)
  // • Without image: track wrapper size via ResizeObserver for responsiveness
  const [wrapSize, setWrapSize] = useState({w:900,h:550});
  useEffect(()=>{
    const el=wrapRef.current; if(!el) return;
    const ro=new ResizeObserver(entries=>{
      const {width,height}=entries[0].contentRect;
      if(width>0&&height>0){
        setWrapSize({w:Math.floor(width),h:Math.floor(height)});
        if(onWrapSize) onWrapSize({w:Math.floor(width),h:Math.floor(height)});
      }
    });
    ro.observe(el);
    const r=el.getBoundingClientRect();
    if(r.width>0){
      const ws={w:Math.floor(r.width),h:Math.floor(r.height)};
      setWrapSize(ws);
      if(onWrapSize) onWrapSize(ws);
    }
    return()=>ro.disconnect();
  },[]);
  const IW = floor.imgW || wrapSize.w;
  const IH = floor.imgH || wrapSize.h;


  useEffect(()=>{
    if(!floor.img){imgEl.current=null;return;}
    const im=new Image();
    im.crossOrigin="anonymous"; // needed for Mapbox URLs and canvas taint
    im.onload=()=>{imgEl.current=im;};
    im.onerror=()=>console.error("Image load failed:",floor.img?.slice(0,80));
    im.src=floor.img;
  },[floor.img]);

  // ── Core coordinate conversion ────────────────────────────────────────────
  const getCanvasRect=()=>cvRef.current?.getBoundingClientRect()||{left:0,top:0,width:IW,height:IH};

  // Event → image coords — accounts for CSS scaling of canvas element
  const evToImg=useCallback(e=>{
    const r=getCanvasRect();
    const cx=e.clientX-r.left;
    const cy=e.clientY-r.top;
    // Canvas CSS size vs pixel size ratio (handles zoom/pan within canvas coordinate space)
    const sx=cx*(IW/r.width);
    const sy=cy*(IH/r.height);
    return{x:(sx-panXRef.current)/zoomRef.current, y:(sy-panYRef.current)/zoomRef.current};
  },[IW,IH]); // stable — reads zoom/pan from refs

  // ── Render ────────────────────────────────────────────────────────────────
  const render=useCallback(()=>{
    const cv=cvRef.current; if(!cv)return;
    const ctx=cv.getContext("2d");
    ctx.clearRect(0,0,IW,IH);

    ctx.save();
    ctx.translate(panX,panY);
    ctx.scale(zoom,zoom);

    // Floor plan
    if(imgEl.current&&imgEl.current.complete){
      ctx.drawImage(imgEl.current,0,0,IW,IH);
    } else {
      ctx.fillStyle="#F0F2F4"; ctx.fillRect(0,0,IW,IH);
      ctx.strokeStyle="#D8DCE0"; ctx.lineWidth=1/zoom;
      for(let x=0;x<IW;x+=50){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,IH);ctx.stroke();}
      for(let y=0;y<IH;y+=50){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(IW,y);ctx.stroke();}
      ctx.fillStyle="#9AAAB8"; ctx.font=(14/zoom)+"px Inter,sans-serif"; ctx.textAlign="center";
      ctx.fillText("Upload a floor plan to begin",IW/2,IH/2); ctx.textAlign="left";
    }

    const ppf=floor.pxPerFt||null;
    const walls=floor.walls||[];

    // ── FOV cones ────────────────────────────────────────────────────────────
    if(showFov){
      cameras.forEach(cam=>{
        const def=CAMERA_DB.find(d=>d.model===cam.model); if(!def)return;
        const isSel=selCamId===cam.id, isHov=hovCam===cam.id;
        const range=ppf?def.irRange*3.281*ppf:70;
        const dirRad=(cam.rotation*Math.PI)/180;
        ctx.save();
        if(def.fov>=360){
          const pts=buildVisPolygon(cam.x,cam.y,range,dirRad,Math.PI,walls);
          if(pts.length>2){
            const g=ctx.createRadialGradient(cam.x,cam.y,0,cam.x,cam.y,range);
            g.addColorStop(0,def.color+"88"); g.addColorStop(1,def.color+"11");
            ctx.fillStyle=g; ctx.globalAlpha=0.82;
            ctx.beginPath(); ctx.moveTo(cam.x,cam.y);
            pts.forEach(p=>ctx.lineTo(p.x,p.y));
            ctx.closePath(); ctx.fill();
          }
        } else {
          const camFov = cam.customFov != null ? cam.customFov : def.fov;
        const halfFov=(camFov*Math.PI)/180/2;
          const visPts=buildVisPolygon(cam.x,cam.y,range,dirRad,halfFov,walls);
          // Ghost (full unobstructed cone)
          ctx.globalAlpha=0.09; ctx.fillStyle=def.color;
          ctx.beginPath(); ctx.moveTo(cam.x,cam.y);
          ctx.arc(cam.x,cam.y,range,dirRad-halfFov,dirRad+halfFov); // ghost uses camFov via halfFov
          ctx.closePath(); ctx.fill();
          // Visible polygon
          if(visPts.length>1){
            const g=ctx.createRadialGradient(cam.x,cam.y,0,cam.x,cam.y,range);
            g.addColorStop(0,def.color+(isSel?"CC":"88"));
            g.addColorStop(0.5,def.color+(isSel?"77":"55"));
            g.addColorStop(1,def.color+"11");
            ctx.fillStyle=g; ctx.globalAlpha=isSel||isHov?1:0.9;
            ctx.beginPath(); ctx.moveTo(cam.x,cam.y);
            visPts.forEach(p=>ctx.lineTo(p.x,p.y));
            ctx.closePath(); ctx.fill();
            ctx.globalAlpha=0.5; ctx.strokeStyle=def.color; ctx.lineWidth=1.2/zoom;
            ctx.stroke();
          }
        }
        ctx.restore();
      });
    }

    // ── Zones ────────────────────────────────────────────────────────────────
    (zones||[]).forEach(z=>{
      if(z.pts.length<2) return;
      ctx.save();
      const isCov=z.type==="coverage";
      ctx.globalAlpha=0.25;
      ctx.fillStyle=isCov?"#00A651":"#DA291C";
      ctx.beginPath();
      ctx.moveTo(z.pts[0].x,z.pts[0].y);
      z.pts.forEach(p=>ctx.lineTo(p.x,p.y));
      ctx.closePath(); ctx.fill();
      ctx.globalAlpha=0.8;
      ctx.strokeStyle=isCov?FT.green:FT.red;
      ctx.lineWidth=2/zoom; ctx.setLineDash([6/zoom,3/zoom]);
      ctx.stroke(); ctx.setLineDash([]);
      // Label at centroid
      const cx=z.pts.reduce((s,p)=>s+p.x,0)/z.pts.length;
      const cy=z.pts.reduce((s,p)=>s+p.y,0)/z.pts.length;
      ctx.fillStyle=isCov?FT.green:FT.red;
      ctx.font=`bold ${11/zoom}px Inter,sans-serif`;
      ctx.textAlign="center";
      ctx.fillText(isCov?"✅ Coverage":"🚫 Exclusion",cx,cy);
      ctx.textAlign="left";
      ctx.restore();
    });

    // Zone being drawn (draft polygon)
    if(zoneDraft&&zoneDraft.pts.length>0&&mousePos){
      const isCov=zoneDraft.type==="coverage";
      ctx.save();
      ctx.strokeStyle=isCov?FT.green:FT.red;
      ctx.lineWidth=2/zoom; ctx.setLineDash([5/zoom,3/zoom]);
      ctx.fillStyle=isCov?"rgba(0,166,81,0.12)":"rgba(218,41,28,0.12)";
      ctx.beginPath();
      ctx.moveTo(zoneDraft.pts[0].x,zoneDraft.pts[0].y);
      zoneDraft.pts.forEach(p=>ctx.lineTo(p.x,p.y));
      ctx.lineTo(mousePos.x,mousePos.y);
      if(zoneDraft.pts.length>=2) ctx.fill();
      ctx.stroke();
      ctx.setLineDash([]);
      // Vertex dots
      zoneDraft.pts.forEach((p,i)=>{
        ctx.beginPath(); ctx.arc(p.x,p.y,4/zoom,0,Math.PI*2);
        ctx.fillStyle=i===0?"#FFD700":isCov?FT.green:FT.red; ctx.fill();
      });
      // Close hint near first point
      if(zoneDraft.pts.length>=3){
        const d=Math.hypot(mousePos.x-zoneDraft.pts[0].x,mousePos.y-zoneDraft.pts[0].y);
        if(d<20/zoom){
          ctx.beginPath(); ctx.arc(zoneDraft.pts[0].x,zoneDraft.pts[0].y,10/zoom,0,Math.PI*2);
          ctx.strokeStyle="#FFD700"; ctx.lineWidth=2/zoom; ctx.stroke();
        }
      }
      ctx.restore();
    }

    // ── Walls ─────────────────────────────────────────────────────────────────
    walls.forEach(w=>{
      const isSel=selWallId===w.id, isHov=hovWall?.wallId===w.id;
      const lw=w.thickness||8;
      ctx.save();
      ctx.strokeStyle=isSel?"#4488FF":isHov?"#6699FF":FT.navy;
      ctx.lineWidth=lw; ctx.lineCap="round"; ctx.lineJoin="round";
      ctx.beginPath(); ctx.moveTo(w.x1,w.y1); ctx.lineTo(w.x2,w.y2); ctx.stroke();
      // Highlight stripe
      ctx.strokeStyle="rgba(255,255,255,0.3)"; ctx.lineWidth=Math.max(1,lw*0.22);
      ctx.beginPath(); ctx.moveTo(w.x1,w.y1); ctx.lineTo(w.x2,w.y2); ctx.stroke();
      ctx.restore();

      // Edit handles (always visible for selected wall; hover = any wall)
      if(isSel||(mode==="wall_edit"&&isHov)){
        const hr=6/zoom;
        [[w.x1,w.y1,"p1"],[w.x2,w.y2,"p2"]].forEach(([hx,hy,part])=>{
          const hov=hovWall?.wallId===w.id&&hovWall?.part===part;
          ctx.beginPath(); ctx.arc(hx,hy,hr,0,Math.PI*2);
          ctx.fillStyle=hov?"#FF6B6B":"#4488FF";
          ctx.fill(); ctx.strokeStyle=FT.white; ctx.lineWidth=1.5/zoom; ctx.stroke();
        });
        // Body midpoint handle
        const mx=(w.x1+w.x2)/2, my=(w.y1+w.y2)/2;
        const hovBody=hovWall?.wallId===w.id&&hovWall?.part==="body";
        ctx.beginPath(); ctx.arc(mx,my,4/zoom,0,Math.PI*2);
        ctx.fillStyle=hovBody?"#FF9800":"#4488FF"; ctx.fill();
        ctx.strokeStyle=FT.white; ctx.lineWidth=1/zoom; ctx.stroke();
      }
    });

    // Wall draft
    if((mode==="wall"||mode==="wall_new")&&wallDraft&&mousePos){
      const lw=wallThick||8;
      // Snapping preview
      const dx=mousePos.x-wallDraft.x, dy=mousePos.y-wallDraft.y;
      const len=Math.hypot(dx,dy);
      ctx.save();
      ctx.strokeStyle=FT.red; ctx.lineWidth=lw; ctx.lineCap="round"; ctx.setLineDash([8/zoom,5/zoom]);
      ctx.beginPath(); ctx.moveTo(wallDraft.x,wallDraft.y); ctx.lineTo(mousePos.x,mousePos.y); ctx.stroke();
      ctx.setLineDash([]);
      // Start handle
      ctx.beginPath(); ctx.arc(wallDraft.x,wallDraft.y,7/zoom,0,Math.PI*2);
      ctx.fillStyle=FT.green; ctx.fill(); ctx.strokeStyle=FT.white; ctx.lineWidth=1.5/zoom; ctx.stroke();
      // End handle  
      ctx.beginPath(); ctx.arc(mousePos.x,mousePos.y,5/zoom,0,Math.PI*2);
      ctx.fillStyle=FT.red; ctx.fill(); ctx.strokeStyle=FT.white; ctx.lineWidth=1/zoom; ctx.stroke();
      // Length label
      if(len>10/zoom){
        const label=ppf?(len/ppf).toFixed(1)+"ft / "+(len/ppf/3.281).toFixed(1)+"m":len.toFixed(0)+"px";
        const lx=(wallDraft.x+mousePos.x)/2, ly=(wallDraft.y+mousePos.y)/2;
        const fw=label.length*5.5/zoom;
        ctx.fillStyle="rgba(26,26,46,0.85)"; ctx.fillRect(lx-fw/2-3/zoom,ly-10/zoom,fw+6/zoom,15/zoom);
        ctx.fillStyle=FT.white; ctx.font=(10/zoom)+"px monospace"; ctx.textAlign="center";
        ctx.fillText(label,lx,ly+3/zoom); ctx.textAlign="left";
      }
      ctx.restore();
    }

    // Scale calibration drawing
    if(floor._scalePt1){
      const p1=floor._scalePt1;
      ctx.save();

      // If we have both points (scale_confirm), draw the locked line in green
      if(scalePt2){
        const p2=scalePt2;
        // Confirmed measurement line
        ctx.strokeStyle=FT.green; ctx.lineWidth=2.5/zoom;
        ctx.setLineDash([]);
        ctx.beginPath(); ctx.moveTo(p1.x,p1.y); ctx.lineTo(p2.x,p2.y); ctx.stroke();
        // Point 1 dot
        ctx.fillStyle=FT.orange; ctx.beginPath(); ctx.arc(p1.x,p1.y,7/zoom,0,Math.PI*2); ctx.fill();
        ctx.strokeStyle=FT.white; ctx.lineWidth=1.5/zoom; ctx.stroke();
        // Point 2 dot
        ctx.fillStyle=FT.green; ctx.beginPath(); ctx.arc(p2.x,p2.y,7/zoom,0,Math.PI*2); ctx.fill();
        ctx.strokeStyle=FT.white; ctx.lineWidth=1.5/zoom; ctx.stroke();
        // Length label at midpoint
        const pxd=Math.hypot(p2.x-p1.x,p2.y-p1.y);
        const lx=(p1.x+p2.x)/2, ly=(p1.y+p2.y)/2-14/zoom;
        const lbl=pxd.toFixed(0)+"px — enter distance below";
        const lw=lbl.length*5.5/zoom;
        ctx.fillStyle="rgba(0,166,81,0.9)"; ctx.fillRect(lx-lw/2-4/zoom,ly-9/zoom,lw+8/zoom,14/zoom);
        ctx.fillStyle=FT.white; ctx.font="bold "+(9/zoom)+"px monospace"; ctx.textAlign="center";
        ctx.fillText(lbl,lx,ly+2/zoom); ctx.textAlign="left";
      } else {
        // Still picking point 2 — show dashed preview line to mouse
        ctx.fillStyle=FT.orange; ctx.beginPath(); ctx.arc(p1.x,p1.y,7/zoom,0,Math.PI*2); ctx.fill();
        ctx.strokeStyle=FT.white; ctx.lineWidth=1.5/zoom; ctx.stroke();
        if(mousePos){
          ctx.strokeStyle=FT.orange; ctx.lineWidth=2/zoom; ctx.setLineDash([6/zoom,4/zoom]);
          ctx.beginPath(); ctx.moveTo(p1.x,p1.y); ctx.lineTo(mousePos.x,mousePos.y); ctx.stroke();
          ctx.setLineDash([]);
          const pxd=Math.hypot(mousePos.x-p1.x,mousePos.y-p1.y);
          const lbl=pxd.toFixed(0)+"px";
          const lx=(p1.x+mousePos.x)/2+8/zoom, ly=(p1.y+mousePos.y)/2;
          ctx.fillStyle="rgba(26,26,46,0.82)"; ctx.fillRect(lx,ly-9/zoom,lbl.length*5.5/zoom+4/zoom,13/zoom);
          ctx.fillStyle=FT.white; ctx.font=(9/zoom)+"px monospace"; ctx.fillText(lbl,lx+2/zoom,ly+2/zoom);
        }
      }
      ctx.restore();
    }

    // Scale bar
    if(ppf){
      const barFt=10, bW=ppf*barFt;
      const bx=12/zoom, by=IH-38/zoom;
      ctx.save();
      ctx.fillStyle="rgba(26,26,46,0.8)"; ctx.fillRect(bx-3/zoom,by-5/zoom,bW+60/zoom,24/zoom);
      ctx.fillStyle=FT.red; ctx.fillRect(bx,by+2/zoom,bW,4/zoom);
      ctx.strokeStyle=FT.red; ctx.lineWidth=1/zoom;
      for(let i=0;i<=barFt;i+=5){ctx.beginPath();ctx.moveTo(bx+ppf*i,by+1/zoom);ctx.lineTo(bx+ppf*i,by+7/zoom);ctx.stroke();}
      ctx.fillStyle=FT.white; ctx.font=(9/zoom)+"px monospace";
      ctx.fillText("0",bx,by+15/zoom);
      ctx.fillText(barFt+"ft",(bW+bx+3/zoom),by+15/zoom);
      ctx.restore();
    }


    // ── Wall snap indicator ───────────────────────────────────────────────────
    if(showSnap && mousePos && (mode==="wall")){
      const snapTol=14/zoom;
      let snapPt=null;
      for(const w of walls){
        for(const [sx,sy] of [[w.x1,w.y1],[w.x2,w.y2]]){
          if(Math.hypot(mousePos.x-sx,mousePos.y-sy)<snapTol){snapPt={x:sx,y:sy};break;}
        }
        if(snapPt)break;
      }
      if(snapPt){
        ctx.save();
        ctx.strokeStyle=FT.green; ctx.lineWidth=2/zoom;
        ctx.beginPath(); ctx.arc(snapPt.x,snapPt.y,snapTol,0,Math.PI*2); ctx.stroke();
        ctx.fillStyle=FT.green; ctx.beginPath(); ctx.arc(snapPt.x,snapPt.y,4/zoom,0,Math.PI*2); ctx.fill();
        ctx.restore();
      }
    }


    // ── Annotations ──────────────────────────────────────────────────────────
    (annotations||[]).forEach(a=>{
      const isSel=selAnnotId===a.id;
      ctx.save();
      // Pin head
      ctx.beginPath(); ctx.arc(a.x,a.y,8/zoom,0,Math.PI*2);
      ctx.fillStyle=isSel?"#FFD700":FT.orange;
      ctx.fill();
      ctx.strokeStyle=FT.white; ctx.lineWidth=1.5/zoom; ctx.stroke();
      // Pin icon
      ctx.fillStyle=FT.white; ctx.font=`bold ${9/zoom}px sans-serif`;
      ctx.textAlign="center"; ctx.textBaseline="middle";
      ctx.fillText("📝",a.x,a.y); ctx.textAlign="left"; ctx.textBaseline="alphabetic";
      // Label bubble
      if(a.text){
        const lines=a.text.split('\n').slice(0,3);
        const fw=Math.max(...lines.map(l=>l.length))*5.5/zoom;
        const fh=lines.length*13/zoom+6/zoom;
        const bx=a.x+10/zoom, by=a.y-fh/2;
        ctx.fillStyle="rgba(255,215,0,0.95)";
        ctx.beginPath();
        ctx.roundRect?ctx.roundRect(bx,by,fw+8/zoom,fh,4/zoom):ctx.rect(bx,by,fw+8/zoom,fh);
        ctx.fill();
        ctx.strokeStyle=isSel?FT.red:"#E6B800"; ctx.lineWidth=(isSel?2:1)/zoom; ctx.stroke();
        ctx.fillStyle=FT.navy; ctx.font=`${10/zoom}px Inter,sans-serif`;
        lines.forEach((l,i)=>ctx.fillText(l,bx+4/zoom,by+13/zoom+i*13/zoom));
      }
      ctx.restore();
    });

    // Camera bodies
    cameras.forEach(cam=>{
      const def=CAMERA_DB.find(d=>d.model===cam.model); if(!def)return;
      const isSel=selCamId===cam.id;
      const r=(isSel?15:12)/zoom;
      if(isSel){
        ctx.save(); ctx.shadowColor=def.color; ctx.shadowBlur=14;
        ctx.beginPath(); ctx.arc(cam.x,cam.y,r,0,Math.PI*2); ctx.fillStyle=def.color; ctx.fill(); ctx.restore();
      }
      ctx.beginPath(); ctx.arc(cam.x,cam.y,r,0,Math.PI*2);
      ctx.fillStyle=isSel?FT.white:def.color; ctx.fill();
      ctx.strokeStyle=isSel?def.color:"rgba(255,255,255,0.9)"; ctx.lineWidth=(isSel?2.5:1.8)/zoom; ctx.stroke();
      if(def.fov<360){
        const ang=(cam.rotation*Math.PI)/180;
        ctx.save(); ctx.strokeStyle=isSel?def.color:"rgba(255,255,255,0.9)"; ctx.lineWidth=2.5/zoom; ctx.lineCap="round";
        ctx.beginPath(); ctx.moveTo(cam.x,cam.y); ctx.lineTo(cam.x+Math.cos(ang)*(r+9/zoom),cam.y+Math.sin(ang)*(r+9/zoom)); ctx.stroke(); ctx.restore();
      }
      const lx=cam.x+r+4/zoom, ly=cam.y;
      const label=cam.label||def.model;
      ctx.font=(isSel?"bold ":"")+(10/zoom)+"px Inter,monospace";
      const lw=ctx.measureText(label).width;
      ctx.fillStyle="rgba(26,26,46,0.78)"; ctx.fillRect(lx-1/zoom,ly-9/zoom,lw+4/zoom,12/zoom);
      ctx.fillStyle=FT.white; ctx.fillText(label,lx,ly+1/zoom);
      const camFovDisp = cam.customFov != null ? cam.customFov : def.fov;
      const sub=def.resolution+" "+camFovDisp+"°";
      ctx.font=(8/zoom)+"px monospace";
      const sw=ctx.measureText(sub).width;
      ctx.fillStyle="rgba(26,26,46,0.65)"; ctx.fillRect(lx-1/zoom,ly+3/zoom,sw+4/zoom,10/zoom);
      ctx.fillStyle=def.color; ctx.fillText(sub,lx,ly+11/zoom);
    });

    ctx.restore(); // undo zoom/pan

    // Fixed UI overlays (not affected by zoom)
    // Mode bar
    const msgs={
      zone:zoneDraft?`${zoneDraft.type==="coverage"?"✅":"🚫"} Click to add vertices — double-click to close zone (${(zoneDraft?.pts?.length||0)} pts)`:`${zoneType==="coverage"?"✅":"🚫"} Click to start zone polygon`,
      annotate:"📝 Click anywhere to drop a note — click existing note to select it",
      wall:"🧱 Click to start wall (ESC to exit) | click again to finish",
      wall_edit:"✏️ Edit mode: drag endpoint or body to move wall — click empty to deselect",
      scale:"📐 Click POINT 1 of your known distance (ESC to cancel)",
      scale2:"📐 Click POINT 2",
      scale_confirm:"✅ Both points set — enter the distance in feet in the toolbar, then click Apply",
    };
    const msg=msgs[mode];
    if(msg){
      ctx.fillStyle="rgba(26,26,46,0.9)"; ctx.fillRect(0,0,IW,26);
      ctx.fillStyle=mode==="wall"||mode==="wall_edit"?FT.red:mode==="scale_confirm"?FT.green:mode==="annotate"?"#E6B800":mode==="zone"?(zoneType==="coverage"?FT.green:FT.red):FT.orange;
      ctx.font="bold 12px Inter,sans-serif"; ctx.textAlign="center";
      ctx.fillText(msg,IW/2,18); ctx.textAlign="left";
    }
    // Zoom badge
    ctx.fillStyle="rgba(26,26,46,0.72)"; ctx.fillRect(IW-70,IH-24,66,20);
    ctx.fillStyle=FT.white; ctx.font="11px monospace"; ctx.textAlign="right";
    ctx.fillText(Math.round(zoom*100)+"%",IW-5,IH-8); ctx.textAlign="left";

  },[cameras,selCamId,selWallId,hovCam,hovWall,showFov,floor,mode,scalePt2,wallDraft,wallThick,mousePos,zoom,panX,panY,IW,IH,annotations,selAnnotId,zones,zoneDraft]);

  useEffect(()=>{render();},[render]);

  // ── Mouse handlers ────────────────────────────────────────────────────────
  const onDown=useCallback(e=>{
    e.preventDefault();
    const ip=evToImg(e);
    const currentMode=modeRef.current;  // always fresh — no stale closure

    // Right-click or middle = pan
    if(e.button===1||e.button===2){
      panState.current={startX:e.clientX,startY:e.clientY};
      return;
    }

    // Scale calibration: call via refs — always current, no stale closure
    if(currentMode==="scale"){  onScalePt1Ref.current(ip); return; }
    if(currentMode==="scale2"){ onScalePt2Ref.current(ip); return; }

    if(currentMode==="wall"){
      onWallClickRef.current(ip);
      return;
    }

    if(currentMode==="wall_edit"){
      const tol=12/zoomRef.current;
      const wh=hitWall(ip,floorRef.current?.walls||[],tol);
      if(wh){
        onSelectWallRef.current(wh.wallId);
        const w=(floorRef.current?.walls||[]).find(x=>x.id===wh.wallId);
        if(w){
          dragState.current={type:"wall",wallId:wh.wallId,part:wh.part,
            ox:ip.x,oy:ip.y,ox1:w.x1,oy1:w.y1,ox2:w.x2,oy2:w.y2};
        }
        return;
      }
      onSelectWallRef.current(null);
      return;
    }

    // Zone drawing click
    if(currentMode==="zone"){
      onZoneClickRef.current(ip);
      return;
    }

    // Annotation click
    if(currentMode==="annotate"){
      onAnnotationClick(ip);
      return;
    }

    // Camera mode — check annotation hit first
    const annotTol=12/zoomRef.current;
    const ha=(annotations||[]).find(a=>Math.hypot(a.x-ip.x,a.y-ip.y)<annotTol);
    if(ha&&currentMode==="camera"){
      onAnnotationClick({hit:ha.id});
      dragState.current={type:"annot",id:ha.id,ox:ip.x-ha.x,oy:ip.y-ha.y};
      return;
    }

    const camTol=18/zoomRef.current;
    const h=camerasRef.current.find(c=>Math.hypot(c.x-ip.x,c.y-ip.y)<camTol);
    if(h){
      onSelectCamRef.current(h.id);
      dragState.current={type:"cam",id:h.id,ox:ip.x-h.x,oy:ip.y-h.y};
    } else {
      onSelectCamRef.current(null);
    }
  },[evToImg]);

  const onMove=useCallback(e=>{
    const ip=evToImg(e);
    onCanvasMouseMoveRef.current(ip);

    // Pan
    if(panState.current){
      const dx=e.clientX-panState.current.startX;
      const dy=e.clientY-panState.current.startY;
      const r=getCanvasRect();
      const scaleX=IW/r.width, scaleY=IH/r.height;
      onPanDelta(dx*scaleX, dy*scaleY);
      panState.current={startX:e.clientX,startY:e.clientY};
      return;
    }

    // Drag annotation
    if(dragState.current?.type==="annot"){
      const ds=dragState.current;
      onMoveAnnotation(ds.id, ip.x-ds.ox, ip.y-ds.oy);
      return;
    }

    // Drag camera
    if(dragState.current?.type==="cam"){
      onMoveCamRef.current(dragState.current.id, ip.x-dragState.current.ox, ip.y-dragState.current.oy);
      return;
    }

    // Drag wall
    if(dragState.current?.type==="wall"){
      const ds=dragState.current;
      const dx=ip.x-ds.ox, dy=ip.y-ds.oy;
      if(ds.part==="p1")      onMoveWallRef.current(ds.wallId,ds.ox1+dx,ds.oy1+dy,ds.ox2,ds.oy2);
      else if(ds.part==="p2") onMoveWallRef.current(ds.wallId,ds.ox1,ds.oy1,ds.ox2+dx,ds.oy2+dy);
      else                    onMoveWallRef.current(ds.wallId,ds.ox1+dx,ds.oy1+dy,ds.ox2+dx,ds.oy2+dy);
      return;
    }

    // Hover
    const camTol=18/zoomRef.current;
    setHovCam(camerasRef.current.find(c=>Math.hypot(c.x-ip.x,c.y-ip.y)<camTol)?.id||null);
    if(modeRef.current==="wall_edit"){
      setHovWall(hitWall(ip,floorRef.current?.walls||[],12/zoomRef.current)||null);
    } else {
      setHovWall(null);
    }
  },[evToImg,onPanDelta,IW,IH]);

  const onUp=useCallback(()=>{
    dragState.current=null;
    panState.current=null;
  },[]);

  const onWheel=useCallback(e=>{
    e.preventDefault();
    if(e.shiftKey){
      // Shift+scroll → pan horizontally
      onPanDelta(-e.deltaY*1.2, 0);
    } else if(e.ctrlKey||e.metaKey){
      // Ctrl+scroll → pan vertically
      onPanDelta(0,-e.deltaY*1.2);
    } else {
      // Plain scroll → zoom toward cursor (original behaviour)
      const r=getCanvasRect();
      const cx=(e.clientX-r.left)*(IW/r.width);
      const cy=(e.clientY-r.top)*(IH/r.height);
      onZoom(e.deltaY<0?1.15:1/1.15, cx, cy);
    }
  },[IW,IH,onZoom,onPanDelta]);

  const getCursor=()=>{
    const m=modeRef.current;
    if(panState.current)return"grabbing";
    if(m==="scale"||m==="scale2"||m==="wall")return"crosshair";
    if(m==="wall_edit"){if(hovWall)return hovWall.part==="body"?"move":"crosshair"; return"default";}
    if(hovCam)return"grab";
    return"default";
  };

  return(
    <div ref={wrapRef} style={{flex:1,minWidth:0,overflow:"hidden",background:"#1e2333",position:"relative"}}>
      <canvas ref={cvRef} width={IW} height={IH}
        style={{
          display:"block", width:"100%", height:"100%",
          cursor:getCursor()
        }}
        onMouseDown={onDown} onMouseMove={onMove} onMouseUp={onUp} onMouseLeave={onUp}
        onDoubleClick={e=>{if(modeRef.current==="zone"&&onZoneDblClickRef.current)onZoneDblClickRef.current();}}
        onWheel={onWheel} onContextMenu={e=>e.preventDefault()}
      />
    </div>
  );
}







// ─── Main App ─────────────────────────────────────────────────────────────────
const FORTINET_LOGO_URI = null; // PNG embed removed — use SVG instead

function FortinetLogo({size=34}){
  return React.createElement("svg",{width:size,height:size,viewBox:"0 0 60 60",fill:"none",style:{flexShrink:0}},
    React.createElement("path",{d:"M30 4L8 14v16c0 13.3 9.3 25.7 22 29 12.7-3.3 22-15.7 22-29V14L30 4z",fill:"#DA291C"}),
    React.createElement("rect",{x:20,y:20,width:20,height:4,rx:1,fill:"white"}),
    React.createElement("rect",{x:20,y:29,width:13,height:4,rx:1,fill:"white"})
  );
}

export default function App(){
  // Responsive layout breakpoints
  const [winW,setWinW]=useState(window.innerWidth);
  useEffect(()=>{
    const h=()=>setWinW(window.innerWidth);
    window.addEventListener("resize",h);
    return()=>window.removeEventListener("resize",h);
  },[]);
  const isNarrow = winW < 1100;  // hide right sidebar below 1100px
  const isTiny   = winW < 750;   // compact tool panel, hide tree below 750px

  const [tab,setTab]=useState("planner");
  const _init=React.useMemo(()=>defProject(),[]);
  const [project,setProject]=useState(_init);
  const [activeBId,setActiveBId]=useState(_init.buildings[0].id);
  const [activeFId,setActiveFId]=useState(_init.buildings[0].floors[0].id);
  const [selCamId,setSelCamId]=useState(null);
  const [selWallId,setSelWallId]=useState(null);
  const [selModel,setSelModel]=useState(CAMERA_DB[0].model);
  const [showFov,setShowFov]=useState(true);
  const [showSnap,setShowSnap]=useState(true);
  const [mode,setMode]=useState("camera");
  const [wallDraft,setWallDraft]=useState(null);
  const [wallThick,setWallThick]=useState(8);
  const [mousePos,setMousePos]=useState(null);
  const [scalePt1,setScalePt1]=useState(null);
  const [scalePt2,setScalePt2]=useState(null);
  const [scaleFeet,setScaleFeet]=useState("20");
  const [zoom,setZoom]=useState(1);
  const [panX,setPanX]=useState(0);
  const [panY,setPanY]=useState(0);
  const [importing,setImporting]=useState(false);
  const [darkMode,setDarkMode]=useState(false);
  const [showOptimizer,setShowOptimizer]=useState(false);
  const [showMapSearch,setShowMapSearch]=useState(false);  // outdoor zone search dialog
  const [mapSearchQuery,setMapSearchQuery]=useState("");
  const [mapSearchLat,setMapSearchLat]=useState("");
  const [mapSearchLng,setMapSearchLng]=useState("");
  const [mapZoomLevel,setMapZoomLevel]=useState(18);
  const [mapSearching,setMapSearching]=useState(false);
  const [activeTabType,setActiveTabType]=useState("floor"); // "floor" | "outdoor"
  const [activeOZId,setActiveOZId]=useState(null);
  const [selAnnotId,setSelAnnotId]=useState(null);
  const [editAnnotId,setEditAnnotId]=useState(null); // annotation being text-edited
  // Undo / Redo stacks — store full project snapshots
  const [undoStack,setUndoStack]=useState([]);
  const [redoStack,setRedoStack]=useState([]);
  const [optTarget,setOptTarget]=useState(90);   // % coverage target
  const [optRunning,setOptRunning]=useState(false);
  const [optResult,setOptResult]=useState(null); // {count, coverage}
  const [optModel,setOptModel]=useState(CAMERA_DB[0].model); // model for optimizer
  const [zoneType,setZoneType]=useState("coverage"); // "coverage" | "exclusion"
  const [zoneDraft,setZoneDraft]=useState(null);     // {type, pts:[{x,y}]} — in-progress polygon
  const [editingName,setEditingName]=useState(null);
  const [qMod,setQMod]=useState(CAMERA_DB[0].model);
  const [qDist,setQDist]=useState(10);
  const [qCond,setQCond]=useState("day");
  const [bomAcc,setBomAcc]=useState({});
  const [selRec,setSelRec]=useState("");
  const fileRef=useRef(null);
  const projFileRef=useRef(null);
  const nid=useRef(1);
  const canvasWrapRef=useRef(null); // direct ref to cvRow for accurate fit measurements

  // Undo/Redo — snapshot before every project mutation
  const MAX_UNDO=40;
  const updProject=fn=>setProject(p=>{
    // Push current state to undo stack
    setUndoStack(s=>[...s.slice(-(MAX_UNDO-1)),JSON.stringify(p)]);
    setRedoStack([]);
    const np=JSON.parse(JSON.stringify(p));fn(np);return np;
  });
  const undo=()=>{
    if(!undoStack.length)return;
    const prev=undoStack[undoStack.length-1];
    setRedoStack(s=>[...s,JSON.stringify(project)]);  // wait — project may be stale
    setUndoStack(s=>s.slice(0,-1));
    setProject(JSON.parse(prev));
  };
  const redo=()=>{
    if(!redoStack.length)return;
    const next=redoStack[redoStack.length-1];
    setUndoStack(s=>[...s,JSON.stringify(project)]);
    setRedoStack(s=>s.slice(0,-1));
    setProject(JSON.parse(next));
  };
  const activeB=project.buildings.find(b=>b.id===activeBId)||project.buildings[0];
  const activeF=activeTabType==="floor"?(activeB?.floors.find(f=>f.id===activeFId)||activeB?.floors[0]):null;
  const activeOZ=activeTabType==="outdoor"?((activeB?.outdoorZones||[]).find(z=>z.id===activeOZId)||null):null;
  // Unified "active canvas item" — whichever is active
  const activeCanvas=activeF||activeOZ;
  const cameras=(activeCanvas?.cameras)||[];
  const walls=(activeCanvas?.walls)||[];
  const ppf=activeCanvas?.pxPerFt||activeCanvas?.pxPerMeter||null;

  const updFloor=fn=>updProject(np=>{
    const b=np.buildings.find(b=>b.id===activeBId);if(!b)return;
    if(activeTabType==="outdoor"){
      if(!b.outdoorZones)b.outdoorZones=[];
      const z=b.outdoorZones.find(z=>z.id===activeOZId);if(z)fn(z);
    } else {
      const f=b.floors.find(f=>f.id===activeFId);if(f)fn(f);
    }
  });
  const updCams=fn=>updFloor(f=>fn(f.cameras));
  const updWalls=fn=>updFloor(f=>{if(!f.walls)f.walls=[];fn(f.walls);});

  // Container size reported by FloorCanvas ResizeObserver
  const [containerSize,setContainerSize]=useState({w:900,h:550});
  const containerSizeRef=useRef({w:900,h:550}); // always current, no stale closure

  const resetView=()=>{
    const el=canvasWrapRef.current;
    const rect=el?el.getBoundingClientRect():null;
    const cw=rect&&rect.width>10?rect.width:containerSizeRef.current.w;
    const ch=rect&&rect.height>10?rect.height:containerSizeRef.current.h;
    const IW=activeF?.imgW||cw;
    const IH=activeF?.imgH||ch;
    if(cw<=0||ch<=0){setZoom(1);setPanX(0);setPanY(0);return;}
    // Fill container completely — min picks the axis that fits without clipping
    const fitZoom=Math.min(cw/IW, ch/IH);
    setZoom(fitZoom);
    setPanX(0);
    setPanY(0);
  };

  const handleZoom=(factor,cx,cy)=>{
    setZoom(z=>{
      const nz=Math.max(0.15,Math.min(10,z*factor));
      if(cx!=null){setPanX(px=>cx-(cx-px)*(nz/z));setPanY(py=>cy-(cy-py)*(nz/z));}
      return nz;
    });
  };
  const handlePanDelta=(dx,dy)=>{setPanX(p=>p+dx);setPanY(p=>p+dy);};

  // ── Upload floor plan ─────────────────────────────────────────────────────
  const handleUpload=e=>{
    const file=e.target.files[0];if(!file)return;
    setImporting(true);
    // requestAnimationFrame gives React time to paint the spinner before heavy work
    requestAnimationFrame(()=>requestAnimationFrame(()=>{
      const reader=new FileReader();
      reader.onload=ev=>{
        const url=ev.target.result;
        const im=new Image();
        im.onload=()=>{
          updFloor(f=>{f.img=url;f.imgW=im.naturalWidth;f.imgH=im.naturalHeight;f.pxPerFt=null;f._scalePt1=null;if(!f.walls)f.walls=[];});
          // Wait one more frame so the floor state is committed before fitting
          requestAnimationFrame(()=>{
            resetView();
            setImporting(false);
          });
        };
        im.onerror=()=>setImporting(false);
        im.src=url;
      };
      reader.onerror=()=>setImporting(false);
      reader.readAsDataURL(file);
    }));
    e.target.value="";
  };

  // ── Save / Load project (JSON) ────────────────────────────────────────────
  const newProject=()=>{
    if(!window.confirm("Start a new project? All unsaved changes will be lost.")) return;
    const p=defProject();
    setProject(p);
    setActiveBId(p.buildings[0].id);
    setActiveFId(p.buildings[0].floors[0].id);
    setSelCamId(null); setSelWallId(null); setSelAnnotId(null);
    setMode("camera"); setWallDraft(null); setZoneDraft(null);
    setUndoStack([]); setRedoStack([]);
    resetView();
  };

  const saveProject=()=>{
    const data=JSON.stringify({version:1,project,activeBId,activeFId},null,2);
    const blob=new Blob([data],{type:"application/json"});
    const a=document.createElement("a");
    a.href=URL.createObjectURL(blob);
    a.download=(project.name||"project").replace(/\s+/g,"_")+".fcplan";
    a.click();
  };
  const loadProject=e=>{
    const file=e.target.files[0];if(!file)return;
    const reader=new FileReader();
    reader.onload=ev=>{
      try{
        const {project:p,activeBId:bid,activeFId:fid}=JSON.parse(ev.target.result);
        setProject(p);
        setActiveBId(bid||p.buildings[0].id);
        setActiveFId(fid||p.buildings[0].floors[0].id);
        setSelCamId(null);setSelWallId(null);setMode("camera");setWallDraft(null);
        resetView();
      }catch(err){alert("Could not load project file: "+err.message);}
    };
    reader.readAsText(file);
    e.target.value="";
  };

  // ── PDF export — all buildings, all floors + full BOM ────────────────────
  const exportPDF=async()=>{
    const hasSomeFloor=project.buildings.some(b=>b.floors.some(f=>f.img));
    if(!hasSomeFloor){alert("No floor plan images uploaded yet.");return;}

    // Helper: render one floor to a data URL
    const renderFloor=async(b,f)=>{
      const IW=f.imgW||900, IH=f.imgH||550;
      const oc=document.createElement("canvas"); oc.width=IW; oc.height=IH;
      const ctx=oc.getContext("2d");
      // Floor plan image
      if(f.img){
        await new Promise(res=>{
          const im=new Image();
          im.onload=()=>{ctx.drawImage(im,0,0,IW,IH);res();};
          im.onerror=res;
          im.src=f.img;
        });
      } else {
        ctx.fillStyle="#F0F2F4"; ctx.fillRect(0,0,IW,IH);
        ctx.fillStyle="#AAAAAA"; ctx.font="24px Arial"; ctx.textAlign="center";
        ctx.fillText("No floor plan image",IW/2,IH/2); ctx.textAlign="left";
      }
      // Zones
      (f.zones||[]).forEach(z=>{
        if(z.pts.length<2)return;
        const isCov=z.type==="coverage";
        ctx.save(); ctx.globalAlpha=0.18;
        ctx.fillStyle=isCov?"#00A651":"#DA291C";
        ctx.beginPath(); ctx.moveTo(z.pts[0].x,z.pts[0].y);
        z.pts.forEach(p=>ctx.lineTo(p.x,p.y));
        ctx.closePath(); ctx.fill();
        ctx.globalAlpha=0.7; ctx.strokeStyle=isCov?"#00A651":"#DA291C";
        ctx.lineWidth=2; ctx.setLineDash([6,3]); ctx.stroke(); ctx.setLineDash([]);
        ctx.restore();
      });
      // Walls
      (f.walls||[]).forEach(w=>{
        ctx.strokeStyle="#1A1A2E"; ctx.lineWidth=w.thickness||8; ctx.lineCap="round";
        ctx.beginPath(); ctx.moveTo(w.x1,w.y1); ctx.lineTo(w.x2,w.y2); ctx.stroke();
      });
      // FOV cones
      const fPpf=f.pxPerFt||null;
      (f.cameras||[]).forEach(cam=>{
        const def=CAMERA_DB.find(d=>d.model===cam.model); if(!def)return;
        const range=fPpf?def.irRange*3.281*fPpf:70;
        const camFov=cam.customFov!=null?cam.customFov:def.fov;
        const dirRad=(cam.rotation*Math.PI)/180;
        ctx.save();
        if(camFov<360){
          const halfFov=(camFov*Math.PI)/180/2;
          const pts=buildVisPolygon(cam.x,cam.y,range,dirRad,halfFov,f.walls||[]);
          ctx.fillStyle=def.color+"44"; ctx.strokeStyle=def.color; ctx.lineWidth=1.5;
          ctx.beginPath(); ctx.moveTo(cam.x,cam.y);
          pts.forEach(p=>ctx.lineTo(p.x,p.y)); ctx.closePath();
          ctx.fill(); ctx.stroke();
        } else {
          ctx.fillStyle=def.color+"44";
          ctx.beginPath(); ctx.arc(cam.x,cam.y,range,0,Math.PI*2); ctx.fill();
        }
        ctx.restore();
        // Camera dot
        const r=12;
        ctx.beginPath(); ctx.arc(cam.x,cam.y,r,0,Math.PI*2);
        ctx.fillStyle=def.color; ctx.fill();
        ctx.strokeStyle="#fff"; ctx.lineWidth=2; ctx.stroke();
        ctx.fillStyle="#fff"; ctx.font="bold 10px Arial"; ctx.textAlign="center";
        ctx.fillText(cam.label,cam.x,cam.y+4); ctx.textAlign="left";
      });
      // Annotations
      (f.annotations||[]).forEach(a=>{
        if(!a.text)return;
        ctx.save();
        ctx.fillStyle="rgba(255,215,0,0.92)";
        ctx.fillRect(a.x+12,a.y-10,Math.max(60,a.text.length*6),16);
        ctx.fillStyle="#1A1A2E"; ctx.font="10px Arial";
        ctx.fillText(a.text.split('\n')[0],a.x+15,a.y+3);
        ctx.beginPath(); ctx.arc(a.x,a.y,7,0,Math.PI*2);
        ctx.fillStyle="#E6A000"; ctx.fill();
        ctx.restore();
      });
      // Footer bar
      ctx.fillStyle="rgba(26,26,46,0.75)"; ctx.fillRect(0,IH-24,IW,24);
      ctx.fillStyle="#fff"; ctx.font="bold 10px Arial"; ctx.textAlign="left";
      ctx.fillText(
        `FortiCamera Planner  |  ${project.name}  |  ${b.name} / ${f.name}`+
        `  |  ${(f.cameras||[]).length} cameras`+
        (fPpf?`  |  Scale: ${fPpf.toFixed(1)}px/ft`:"")+
        `  |  ${new Date().toLocaleDateString()}`,
        8,IH-8
      );
      return oc.toDataURL("image/png",0.95);
    };

    // ── Build HTML document ───────────────────────────────────────────────────
    const CSS=`
      *{box-sizing:border-box;margin:0;padding:0;}
      body{font-family:'Segoe UI',Arial,sans-serif;color:#1A1A2E;background:#fff;}
      .page{page-break-after:always;padding:12mm;}
      .page:last-child{page-break-after:avoid;}
      .cover{display:flex;flex-direction:column;justify-content:center;align-items:center;min-height:100vh;}
      .cover h1{font-size:32px;color:#DA291C;margin-bottom:8px;}
      .cover h2{font-size:18px;color:#1A1A2E;font-weight:400;margin-bottom:4px;}
      .cover p{font-size:13px;color:#666;margin-top:16px;}
      .floor-page h2{font-size:15px;color:#DA291C;border-bottom:2px solid #DA291C;padding-bottom:4px;margin-bottom:8px;}
      .floor-page h3{font-size:12px;color:#1A1A2E;margin-bottom:6px;}
      img.floorplan{
        width:100%;height:auto;
        max-height:140mm; /* fits portrait A4 leaving room for header+table */
        object-fit:contain;
        border:1px solid #ddd;border-radius:4px;
        page-break-inside:avoid;
      }
      .floor-page{page-break-inside:avoid;}
      .cam-table{width:100%;border-collapse:collapse;margin-top:8px;font-size:10px;}
      .cam-table th{background:#1A1A2E;color:#fff;padding:4px 6px;text-align:left;}
      .cam-table td{padding:4px 6px;border-bottom:1px solid #eee;}
      .cam-table tr:nth-child(even) td{background:#F5F5F5;}
      .bom-page h2{font-size:15px;color:#DA291C;border-bottom:2px solid #DA291C;padding-bottom:4px;margin-bottom:12px;}
      .bom-page h3{font-size:12px;color:#1A1A2E;margin:14px 0 6px;}
      .bom-table{width:100%;border-collapse:collapse;font-size:10px;margin-bottom:8px;}
      .bom-table th{background:#1A1A2E;color:#fff;padding:5px 7px;text-align:left;}
      .bom-table td{padding:5px 7px;border-bottom:1px solid #eee;}
      .bom-table tr:nth-child(even) td{background:#F5F5F5;}
      .bom-table .qty{font-weight:700;color:#DA291C;font-size:13px;}
      .bom-table .sku{font-weight:700;color:#DA291C;font-size:10px;}
      .summary-box{background:#F5F5F5;border:1px solid #ddd;border-radius:6px;padding:12px;margin-bottom:12px;display:flex;gap:24px;flex-wrap:wrap;}
      .summary-box .item{display:flex;flex-direction:column;}
      .summary-box .label{font-size:9px;color:#888;text-transform:uppercase;letter-spacing:0.5px;}
      .summary-box .value{font-size:16px;font-weight:700;color:#1A1A2E;}
      .red{color:#DA291C;} .green{color:#00A651;} .orange{color:#F47920;}
      @media print{
        .page{padding:8mm;}
        @page{size:A4 portrait;margin:8mm;}
      }
    `;

    // Collect all floor images
    const floorPages=[];
    for(const b of project.buildings){
      for(const f of b.floors){
        const url=await renderFloor(b,f);
        floorPages.push({b,f,url});
      }
    }

    // BOM data
    const allC=project.buildings.flatMap(b=>b.floors.flatMap(f=>
      (f.cameras||[]).map(c=>({...c,bName:b.name,fName:f.name}))
    ));
    const totPoe=allC.reduce((s,c)=>{const d=CAMERA_DB.find(x=>x.model===c.model);return s+(d?d.poeBudget:0);},0);

    // Global BOM counts
    const globalCounts={};
    allC.forEach(c=>{globalCounts[c.model]=(globalCounts[c.model]||0)+1;});

    const recRow=selRec?RECORDER_DB.find(r=>r.sku===selRec):"";
    const accRows=ACCESSORIES_DB.filter(a=>(bomAcc[a.sku]||0)>0);

    // ── Generate HTML ──────────────────────────────────────────────────────────
    let html=`<!DOCTYPE html><html><head><meta charset="utf-8">
      <title>${project.name} — FortiCamera Planner Report</title>
      <style>${CSS}</style></head><body>`;

    // Cover page
    html+=`<div class="page cover">
      <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAlkAAAJZCAMAAACtJtB1AAABqWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMzcgMS4wMDAwMDAsIDAwMDAvMDAvMDAtMDA6MDA6MDAgICAgICAgICI+CiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiCiAgICB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iCiAgIGRjOm1vZGlmaWVkPSIyMDE4LTAzLTIwVDE2OjIyOjIwLjUwNC0wNzowMCIvPgogPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KPD94cGFja2V0IGVuZD0iciI/PmUFjNwAAAAzUExURQAAAM07Ks07Ks07Ks07Ks07Ks07Ks07Ks07Ks07Ks07Ks07Ks07Ks07Ks07Ks07Ks07KuSMjy8AAAAQdFJOUwC/gEBg7xCfIDDPcN+PUK94l3n+AAAJS0lEQVR42uzBgQAAAACAoP2pF6kCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGD27gU3dRiKoqgDcX6k5cx/tE96asWnFGypyMdXe40goluJc20oAAAAAAAAAAAAAAAAAAAAAAAAAAAAgBimcR7+2EcqMVgoutZ1+Gvz55RCm8az/t6QSshC0bUe9QbnMW5c65z1H2U1KEvK85oiGgd9o6wmZUkajimacdcFZbUqS9o/UyTHQdcoq7Is7luPLWfdoqyWZUlzkLX8KesOZbUtS/mU+rcM+oGyGpclDUvq3Jj1E2U1L0u575X8NOsRympflvSR+rVseoiyHMrS1u1Cfs16jLIsylLudCY/6jeU5VGW8pg69CQsyjIpS+owrZN+R1k2ZfWX1qwnKMunLHU2NH0eFmUZldXXXWvUU5TlVFZPab0Ki7KsyuonrU+9QFleZamTnZ7XA1LKMiurj5HplPUKZZmVpb2HjZ5NL1GWW1nakr1Zr1GWXVn+Jx9GFaAsv7LcV/Flq3fKMiwre58y3VSCsgzL8l5qHVSEshzL0iHZWlWGsizLku9Ua1MZyvIsy/Z5eFAhyvIsy/V5uKoUZZmWJc/3w0GlKMu1rCEZGlWOskzLcpyXTruKUZZtWXuyc1A5yrIty28RP2WVoyzfsrLbeZpZFSjLtyy3Qw+LalCWcVlmk4dZNSjLuaw5GVlUhbKcy7K6ac2qQlnWZRndtCbVoSzrsoxeDw+qQ1nWZfnMtKpnWZTlXVZOJkZVoizvsmy+jr+rEmWZl2VyBLD550BZF6HOLc+qRVnuZVkMHiZVoyz3siwGD6OqUZZ7WRZr+E3VKMu+LIM1/KLmKOsi0ObhQc1R1rUwP7m8qznK+hLqcbiqPcr6EupxeFJ7lPUt0uOw/ZshZV0EehwavBlS1ptMqV6kMSllXYszLD3LAGVdibJ3mGWAsq4EOf/n8RFQ1rUYR2kMBvCUdSPK3GGQA8p6j3N6i2h/rZ6u1aSsnKpF2tqhrDshFloOWzuUdSvGQqv5CXjK+inERMvgBA1l3Yuwddj+uxWU9V6pSrQ5KWW9zzGVC7iAp6xbAZbwJgt4yrrX/W+WekzgKete///S4h87d5DaMAyEYdTYpbi73v+0XRQxtAmMV8k/yXsnkODbSAzzHUJZ/w3/hU95Girr1uy50pj7K+uv8Y/DiEllZd01e2I5YzhLWXcM31iqLGX9UlYAZSlrUVZLWQGUpaxFWS1lBVCWshZltZQVQFnKWpT1cMce4mO7Yo9w6aznnuLYAAAAAAAAAAAAAAAAAAAAAAAAAAAAnuE8QnxtL+bzSHFuF73z1u5B3n1rt7IWZSlrBmWFUFZRlrKUpayWspQ1g7JCKKsoS1nKUlZLWcqaQVkhlFWUpSxlKaulLGXNoKwQyirKUpaylNVSlrJmUFYIZRVlKUtZymopS1kzKCuEsoqylKUsZbWUpawZlBVCWUVZylKWslrKUtYMygqhrKIsZSlLWS1lKWsGZYVQVlGWspSlrJaylDWDskIoqyhLWcpSVktZyppBWSGUVZSlLGUpq6UsZc2grBDKKspSlrKU9cPe3eM2DMMAGKURNz9Ng+r+p+1SQ93oIYIp970TCNA3iAuVUpay5qCsIpTVKUtZylJWSlnKmoOyilBWpyxlKUtZKWUpaw7KKkJZnbKUpSxlpZSlrDkoqwhldcpSlrKUlVKWsuagrCKU1SlLWcpSVkpZypqDsopQVqcsZSlLWSllKWsOyipCWZ2ylKUsZaWUpaw5KKsIZXXKUpaylJVSlrLmoKwilNUpS1nKUlZKWcqag7KKUFanLGUpS1kpZb3X/VLEI07meqniHgAAAAAAAAAAAAAAAAAAAAAAAAAAAEdYlyJescdSwq6zPpYq1tjt/27tbiUstnYr65eyUsoqQFnK2igrpawClKWsjbJSyipAWcraKCulrAKUpayNslLKKkBZO6ytCGUNs8Zep/yTVlnDXOII11aEsoa5xrtNdFfKGucjjrG0GpQ1yhLHuLUalDXKK47xbDUoa5RndKkTDofK+mv+0bDOcKisUeIoX60EZQ3yGUf5biUoa5BbdLkTPuGV9cPevSgnCANhFA7UCFi1+/5PWx1QGS+YTGXyZ3u+J+g4Z2BdQp1zMMDLfAKUtZIhZPG3haesGQcbeJ0tPGXNONjA6xzRoqyZ6g9nKX0ElDXjY8wKIZoAyrryMmaJbLQoaxU/IZ+zE8uUNVP7SeWL3gRQ1ir6UNTOyqOsGw8PDXX2DpR15eLRzmiw8ijrwtHNUOIkDWVNPN0MQzhYcZQ1cnUzlPh2SFkTVzdDhW+HlDXydTNUOP5HWSM/a1KV9ywo66r21+7FXmilrImHE/BSnwNlTep/0VBspUVZZ97md4UDD5Q18jW/n22j5aEs7bJiUNFaHsrSLqsNKnrLQ1naZUmsHBQWD5R14m7loHDRoqwTX48MRS5alOX2kpV70aIs5bKkLlmZFy3KEi7rELT00dJRlm5ZUeiLYfGdFmWZx12WwCKesj5nL3fJynp6SFmyZR2DoMZSUZZqWU1QNFgyyhItS2zjkD3EU5ZoWXrj+2i7tzSUpVmWyoE/mU+Esjz8kz/F+yFl+b4XZrzWSlmKZeneC8+GaAkoS7CsKPq9MGtfSlmCZUnuSHMPPVCWXllqRxwkRi3K8j5kJT+apiy1shQfRAtM8ZT1V1F4k5U1xVOWWFny03tqWpSlVZbKy/ZyaVHWvwnr3e6BspTKqiqsN2lRllBZlYW1/O9LKUunrOrCWpy1KEumrArDCmET7QXKEikrVhnWwsqUsjTKqmVB+qjf2VOUJVHWropHOs9tO3uGshTKquB0w5JjtEeUVb6sWM0TnVf6xh5QVvGyGvETpEm+o92hrMJlxfK/MVfFtEVZmbqKR/c7X43NUVbJshqRnz75kOPebigrpyy6Sr9uUVZ6WXSVYOimWZ6yipQVu2p37m9tN+0KNiFFKyHpb+3bNWz8zO0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOC3PTgkAAAAABD0/7UnjAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwC4QAmdetsMdqAAAAAElFTkSuQmCC" style="width:80px;height:80px;object-fit:contain"/>
      <h1>FortiCamera Planner</h1>
      <h2>${project.name}</h2>
      ${project.customer?`<h2 style="font-size:15px;color:#555">${project.customer}</h2>`:""}
      <div class="summary-box" style="margin-top:24px;">
        <div class="item"><span class="label">Buildings</span><span class="value">${project.buildings.length}</span></div>
        <div class="item"><span class="label">Total Floors</span><span class="value">${project.buildings.reduce((s,b)=>s+b.floors.length,0)}</span></div>
        <div class="item"><span class="label">Total Cameras</span><span class="value red">${allC.length}</span></div>
        <div class="item"><span class="label">Total PoE</span><span class="value orange">${totPoe}W</span></div>
        <div class="item"><span class="label">Recording</span><span class="value" style="font-size:12px">${recRow?recRow.name:"FortiCamera Cloud"}</span></div>
        <div class="item"><span class="label">Date</span><span class="value" style="font-size:12px">${new Date().toLocaleDateString()}</span></div>
      </div>
      <p>Generated by FortiCamera Planner — Fortinet Partner Pre-Sales Tool</p>
    </div>`;

    // Floor plan pages
    for(const {b,f,url} of floorPages){
      const fCams=f.cameras||[];
      const fPoe=fCams.reduce((s,c)=>{const d=CAMERA_DB.find(x=>x.model===c.model);return s+(d?d.poeBudget:0);},0);
      // Group cameras by model for this floor
      const fCounts={};
      fCams.forEach(c=>{fCounts[c.model]=(fCounts[c.model]||0)+1;});

      html+=`<div class="page floor-page">
        <h2>🏢 ${b.name} — ${f.name}</h2>
        <div style="display:flex;gap:8px;font-size:10px;color:#666;margin-bottom:8px;">
          <span>📷 ${fCams.length} cameras</span>
          <span>⚡ ${fPoe}W PoE</span>
          ${f.pxPerFt?`<span>📐 Scale: ${f.pxPerFt.toFixed(1)}px/ft</span>`:""}
          ${(f.walls||[]).length?`<span>🧱 ${f.walls.length} wall segments</span>`:""}
        </div>
        <img class="floorplan" src="${url}" alt="${b.name} / ${f.name}"/>
        ${fCams.length>0?`
        <h3 style="margin-top:10px;">Camera Placement</h3>
        <table class="cam-table">
          <thead><tr><th>Label</th><th>Model</th><th>Zone / Location</th><th>Rotation</th><th>PoE</th></tr></thead>
          <tbody>
            ${fCams.map(c=>{
              const d=CAMERA_DB.find(x=>x.model===c.model);
              return`<tr>
                <td><strong>${c.label}</strong></td>
                <td class="sku">${d?d.sku:c.model}</td>
                <td>${c.location||"—"}</td>
                <td>${c.rotation}°</td>
                <td>${d?d.poeStd:""}</td>
              </tr>`;
            }).join("")}
          </tbody>
        </table>`:"<p style='font-size:11px;color:#888;margin-top:10px;'>No cameras placed on this floor.</p>"}
      </div>`;
    }

    // BOM page — summary then per-building breakdown
    html+=`<div class="page bom-page">
      <h2>📋 Bill of Materials</h2>
      <div class="summary-box">
        <div class="item"><span class="label">Project</span><span class="value" style="font-size:13px">${project.name}</span></div>
        <div class="item"><span class="label">Customer</span><span class="value" style="font-size:13px">${project.customer||"—"}</span></div>
        <div class="item"><span class="label">Total Cameras</span><span class="value red">${allC.length}</span></div>
        <div class="item"><span class="label">Total PoE Load</span><span class="value orange">${totPoe}W</span></div>
        <div class="item"><span class="label">Date</span><span class="value" style="font-size:12px">${new Date().toLocaleDateString()}</span></div>
      </div>

      <h3>Camera SKU Summary — All Buildings</h3>
      <table class="bom-table">
        <thead><tr><th>SKU</th><th>Description</th><th>Type</th><th>PoE</th><th style="text-align:right">Qty</th></tr></thead>
        <tbody>
          ${Object.entries(globalCounts).map(([m,qty])=>{
            const d=CAMERA_DB.find(x=>x.model===m);
            return`<tr>
              <td class="sku">${d?d.sku:m}</td>
              <td>${d?d.name:m}</td>
              <td style="color:#555;font-size:9px">${d?d.type:""}</td>
              <td>${d?`<span style="background:${d.poeStd==="802.3at"?"#F47920":"#00A651"};color:#fff;padding:1px 5px;border-radius:3px;font-size:9px">${d.poeStd}</span>`:""}</td>
              <td style="text-align:right" class="qty">×${qty}</td>
            </tr>`;
          }).join("")}
        </tbody>
      </table>

      ${recRow?`<h3>Recording</h3>
      <table class="bom-table"><thead><tr><th>SKU</th><th>Description</th><th>Form Factor</th><th>Storage</th><th style="text-align:right">Qty</th></tr></thead>
      <tbody><tr><td class="sku">${recRow.sku}</td><td>${recRow.name}</td><td>${recRow.form}</td><td>${recRow.hdd}</td><td style="text-align:right" class="qty">×1</td></tr></tbody>
      </table>`:""}

      ${accRows.length>0?`<h3>Accessories &amp; Licensing</h3>
      <table class="bom-table"><thead><tr><th>SKU</th><th>Description</th><th>Category</th><th style="text-align:right">Qty</th></tr></thead>
      <tbody>${accRows.map(a=>`<tr><td class="sku">${a.sku}</td><td>${a.name}</td><td>${a.cat}</td><td style="text-align:right" class="qty">×${bomAcc[a.sku]}</td></tr>`).join("")}</tbody>
      </table>`:""}

      ${project.buildings.map(b=>`
      <h3 style="margin-top:16px;border-top:1px solid #eee;padding-top:10px;">🏢 ${b.name} — Detail per Floor</h3>
      ${b.floors.map(f=>{
        const fCams=f.cameras||[];
        if(!fCams.length)return`<p style="font-size:10px;color:#888;margin-left:12px;">📋 ${f.name}: no cameras</p>`;
        const fCounts={};
        fCams.forEach(c=>{fCounts[c.model]=(fCounts[c.model]||0)+1;});
        const fPoe=fCams.reduce((s,c)=>{const d=CAMERA_DB.find(x=>x.model===c.model);return s+(d?d.poeBudget:0);},0);
        return`<div style="margin-left:12px;margin-bottom:10px;">
          <p style="font-size:11px;font-weight:600;color:#1A1A2E;margin-bottom:4px;">📋 ${f.name} — ${fCams.length} cameras, ${fPoe}W PoE</p>
          <table class="bom-table" style="margin-bottom:0">
            <thead><tr><th>SKU</th><th>Description</th><th style="text-align:right">Qty</th><th>Zones / Labels</th></tr></thead>
            <tbody>
              ${Object.entries(fCounts).map(([m,qty])=>{
                const d=CAMERA_DB.find(x=>x.model===m);
                const camsOfModel=fCams.filter(c=>c.model===m);
                const zones=camsOfModel.map(c=>c.location||c.label).join(", ");
                return`<tr>
                  <td class="sku">${d?d.sku:m}</td>
                  <td>${d?d.name:m}</td>
                  <td style="text-align:right" class="qty">×${qty}</td>
                  <td style="font-size:9px;color:#555">${zones}</td>
                </tr>`;
              }).join("")}
            </tbody>
          </table>
        </div>`;
      }).join("")}`).join("")}
    </div>`;

    html+=`</body></html>`;

    const win=window.open("","_blank");
    if(!win){alert("Please allow popups for this site to export PDF.");return;}
    win.document.write(html);
    win.document.close();
    // Give images time to load then print
    win.onload=()=>setTimeout(()=>win.print(),800);
  };

  // ── Scale handlers ────────────────────────────────────────────────────────
  // ── Camera Count Optimizer ─────────────────────────────────────────────────
  // Greedy algorithm — wall-enclosed area only, user-selected model.
  const runOptimizer = () => {
    if(!activeF?.imgW) { alert("Please upload a floor plan first."); return; }
    if(!ppf) { alert("Please set the scale first (needed for accurate IR range)."); return; }
    const walls=activeF.walls||[];
    const covZones=(activeF.zones||[]).filter(z=>z.type==="coverage");
    const excZones=(activeF.zones||[]).filter(z=>z.type==="exclusion");
    if(covZones.length===0){ alert("Draw at least one ✅ Coverage Zone first — this tells the optimizer which area to fill."); return; }
    setOptRunning(true); setOptResult(null);

    // Capture IDs before setTimeout (avoids stale closure)
    const snapBId=activeBId, snapFId=activeFId, snapModel=optModel;

    setTimeout(()=>{
      try{
        const IW=activeF.imgW, IH=activeF.imgH;
        const CELL=10; // grid cell size in px
        const GW=Math.ceil(IW/CELL), GH=Math.ceil(IH/CELL);
        const def=CAMERA_DB.find(d=>d.model===snapModel);
        if(!def){ setOptRunning(false); return; }
        const range=def.irRange*3.281*ppf;
        const halfFov=def.fov>=360?Math.PI:(def.fov*Math.PI)/180/2;

        // ── Zone-based room test ───────────────────────────────────────────
        // A cell is valid if it is inside ANY coverage zone AND
        // NOT inside any exclusion zone.
        const ptInPoly=(px,py,pts)=>{
          let inside=false; const n=pts.length;
          for(let i=0,j=n-1;i<n;j=i++){
            const xi=pts[i].x,yi=pts[i].y,xj=pts[j].x,yj=pts[j].y;
            if(((yi>py)!==(yj>py))&&(px<(xj-xi)*(py-yi)/(yj-yi)+xi)) inside=!inside;
          }
          return inside;
        };
        const ptInRoom=(px,py)=>{
          const inCov=covZones.some(z=>ptInPoly(px,py,z.pts));
          if(!inCov) return false;
          const inExc=excZones.some(z=>ptInPoly(px,py,z.pts));
          return !inExc;
        };

        // Pre-compute which cells are inside the room
        const inRoom=new Uint8Array(GW*GH);
        let roomCellCount=0;
        for(let gy=0;gy<GH;gy++){
          for(let gx=0;gx<GW;gx++){
            if(ptInRoom(gx*CELL+CELL/2, gy*CELL+CELL/2)){
              inRoom[gy*GW+gx]=1;
              roomCellCount++;
            }
          }
        }

        if(roomCellCount===0){
          // Fallback: walls don't enclose a testable area — use full floor
          inRoom.fill(1);
          roomCellCount=GW*GH;
        }

        // Track coverage — only count cells inside the room
        const covered=new Uint8Array(GW*GH);

        // Mark cells covered by a camera (clipped to room)
        const markCoverage=(cx,cy,dirRad,cov)=>{
          const pts=buildVisPolygon(cx,cy,range,dirRad,halfFov,walls);
          if(pts.length<2) return;
          const xs=pts.map(p=>p.x), ys=pts.map(p=>p.y);
          const minX=Math.max(0,Math.floor(Math.min(...xs)/CELL));
          const maxX=Math.min(GW-1,Math.ceil(Math.max(...xs)/CELL));
          const minY=Math.max(0,Math.floor(Math.min(...ys)/CELL));
          const maxY=Math.min(GH-1,Math.ceil(Math.max(...ys)/CELL));
          for(let gy=minY;gy<=maxY;gy++){
            for(let gx=minX;gx<=maxX;gx++){
              if(!inRoom[gy*GW+gx]) continue; // skip outside-room cells
              const px=gx*CELL+CELL/2, py=gy*CELL+CELL/2;
              let inside=false;
              const n=pts.length;
              for(let i=0,j=n-1;i<n;j=i++){
                const xi=pts[i].x,yi=pts[i].y,xj=pts[j].x,yj=pts[j].y;
                if(((yi>py)!==(yj>py))&&(px<(xj-xi)*(py-yi)/(yj-yi)+xi))
                  inside=!inside;
              }
              if(inside) cov[gy*GW+gx]=1;
            }
          }
        };

        const scoreCam=(cx,cy,dirRad,cov)=>{
          // Only score if camera position is inside room
          if(!ptInRoom(cx,cy)) return -1;
          const test=new Uint8Array(GW*GH);
          markCoverage(cx,cy,dirRad,test);
          let newCells=0;
          for(let i=0;i<GW*GH;i++) if(test[i]&&!cov[i]) newCells++;
          return newCells;
        };

        const placedCams=[];
        let coveredCount=0;
        const targetCount=Math.floor(roomCellCount*optTarget/100);
        const MAX_CAMS=20;
        const SAMPLE=Math.max(2,Math.floor(GW/12));
        const DIRS=def.fov>=360?[0]:[0,45,90,135,180,225,270,315].map(d=>d*Math.PI/180);

        while(coveredCount<targetCount && placedCams.length<MAX_CAMS){
          let bestScore=-1, bestX=0, bestY=0, bestDir=0;
          for(let gy=0;gy<GH;gy+=SAMPLE){
            for(let gx=0;gx<GW;gx+=SAMPLE){
              if(!inRoom[gy*GW+gx]) continue; // only sample inside room
              const cx=gx*CELL+CELL/2, cy=gy*CELL+CELL/2;
              for(const dir of DIRS){
                const score=scoreCam(cx,cy,dir,covered);
                if(score>bestScore){bestScore=score;bestX=cx;bestY=cy;bestDir=dir;}
              }
            }
          }
          if(bestScore<=0) break;
          markCoverage(bestX,bestY,bestDir,covered);
          coveredCount=covered.reduce((s,v)=>s+(inRoom[covered.indexOf?0:0]||1)*v,0);
          // Count only in-room covered cells
          coveredCount=0;
          for(let i=0;i<GW*GH;i++) if(covered[i]&&inRoom[i]) coveredCount++;
          placedCams.push({x:bestX,y:bestY,rotation:Math.round(bestDir*180/Math.PI)});
        }

        const coverage=Math.round(coveredCount/roomCellCount*100);
        const newCams=placedCams.map(p=>({
          id:"cam_"+makeId(), model:snapModel,
          x:p.x, y:p.y, rotation:p.rotation,
          label:"OPT-"+String(nid.current++).padStart(2,"0"),
          notes:"Auto-placed by optimizer", location:""
        }));
        setProject(p=>{
          const np=JSON.parse(JSON.stringify(p));
          const b=np.buildings.find(b=>b.id===snapBId); if(!b)return np;
          const f=b.floors.find(f=>f.id===snapFId); if(!f)return np;
          f.cameras=[...f.cameras,...newCams];
          return np;
        });
        setOptResult({count:placedCams.length, coverage});
        setOptRunning(false);
      } catch(e){ console.error(e); setOptRunning(false); }
    },50);
  };

  // ── Zone helpers ─────────────────────────────────────────────────────────
  const zones=(activeF?.zones)||[];
  const updZones=fn=>updFloor(f=>{if(!f.zones)f.zones=[];fn(f.zones);});

  const handleZoneClick=pt=>{
    if(mode!=="zone") return;
    if(!zoneDraft){ setZoneDraft({type:zoneType,pts:[pt]}); return; }
    setZoneDraft(d=>({...d,pts:[...d.pts,pt]}));
  };
  const closeZone=()=>{
    if(!zoneDraft||zoneDraft.pts.length<3) return;
    updZones(zs=>zs.push({id:makeId(),type:zoneDraft.type,pts:zoneDraft.pts}));
    setZoneDraft(null);
  };
  const delZone=id=>updZones(zs=>{const i=zs.findIndex(z=>z.id===id);if(i>=0)zs.splice(i,1);});
  const clearZones=()=>updFloor(f=>{f.zones=[];});

  // Point-in-polygon for zone containment
  const ptInPolygon=(px,py,pts)=>{
    let inside=false;
    const n=pts.length;
    for(let i=0,j=n-1;i<n;j=i++){
      const xi=pts[i].x,yi=pts[i].y,xj=pts[j].x,yj=pts[j].y;
      if(((yi>py)!==(yj>py))&&(px<(xj-xi)*(py-yi)/(yj-yi)+xi)) inside=!inside;
    }
    return inside;
  };

  const applyScale=()=>{
    const ft=parseFloat(scaleFeet);if(!ft||ft<=0)return;
    const pxd=Math.hypot(scalePt2.x-scalePt1.x,scalePt2.y-scalePt1.y);
    updFloor(f=>{f.pxPerFt=pxd/ft;f._scalePt1=null;});
    setScalePt1(null);setScalePt2(null);setMode("camera");
  };

  useEffect(()=>{
    const h=e=>{
      if(e.key==="Escape"){setWallDraft(null);setScalePt1(null);setScalePt2(null);setZoneDraft(null);setMode("camera");setSelWallId(null);setSelAnnotId(null);setEditAnnotId(null);}
      if(e.key==="Delete"&&selWallId&&!editAnnotId){updWalls(ws=>{const i=ws.findIndex(w=>w.id===selWallId);if(i>=0)ws.splice(i,1);});setSelWallId(null);}
      if(e.key==="Delete"&&selCamId&&!editAnnotId){updCams(cs=>{const i=cs.findIndex(c=>c.id===selCamId);if(i>=0)cs.splice(i,1);});setSelCamId(null);}
      if(e.key==="Delete"&&selAnnotId&&!editAnnotId){updFloor(f=>{f.annotations=(f.annotations||[]).filter(a=>a.id!==selAnnotId);});setSelAnnotId(null);}
      if((e.ctrlKey||e.metaKey)&&e.key==="z"&&!e.shiftKey){e.preventDefault();undo();}
      if((e.ctrlKey||e.metaKey)&&(e.key==="y"||(e.key==="z"&&e.shiftKey))){e.preventDefault();redo();}
    };
    window.addEventListener("keydown",h);
    return()=>window.removeEventListener("keydown",h);
  },[selWallId,selCamId]);

  // ── Camera ops ────────────────────────────────────────────────────────────
  const addCamera=()=>{
    if(!activeF)return;
    const CW=activeF.imgW||900,CH=activeF.imgH||550;
    const cx=(CW/2-panX)/zoom+(Math.random()-.5)*40;
    const cy=(CH/2-panY)/zoom+(Math.random()-.5)*40;
    const id="cam_"+makeId();
    updCams(cs=>cs.push({id,model:selModel,x:cx,y:cy,rotation:0,label:"CAM-"+String(nid.current++).padStart(2,"0"),notes:"",location:""}));
    setSelCamId(id);
  };
  const moveCam=(id,x,y)=>updCams(cs=>{const c=cs.find(c=>c.id===id);if(c){c.x=x;c.y=y;}});
  const updCam=(k,v)=>updCams(cs=>{const c=cs.find(c=>c.id===selCamId);if(c)c[k]=v;});
  const delCam=id=>{updCams(cs=>{const i=cs.findIndex(c=>c.id===id);if(i>=0)cs.splice(i,1);});setSelCamId(null);};
  const dupCam=id=>{
    const src=cameras.find(c=>c.id===id); if(!src)return;
    const newId="cam_"+makeId();
    const dup={...JSON.parse(JSON.stringify(src)),id:newId,x:src.x+30,y:src.y+30,
               label:"CAM-"+String(nid.current++).padStart(2,"0")};
    updCams(cs=>cs.push(dup));
    setSelCamId(newId);
  };
  const moveWall=(id,x1,y1,x2,y2)=>updWalls(ws=>{const w=ws.find(w=>w.id===id);if(w){w.x1=x1;w.y1=y1;w.x2=x2;w.y2=y2;}});
  const delWall=id=>{updWalls(ws=>{const i=ws.findIndex(w=>w.id===id);if(i>=0)ws.splice(i,1);});if(selWallId===id)setSelWallId(null);};

  // Annotations stored on the floor: [{id, x, y, text}]
  const annotations=(activeF?.annotations)||[];
  const updAnnots=fn=>updFloor(f=>{if(!f.annotations)f.annotations=[];fn(f.annotations);});
  const handleAnnotationClick=pt=>{
    if(pt.hit){
      // Clicked existing annotation
      setSelAnnotId(pt.hit);
      setEditAnnotId(pt.hit);
      return;
    }
    // Drop new annotation
    const id="ann_"+makeId();
    updAnnots(as=>as.push({id,x:pt.x,y:pt.y,text:"Note"}));
    setSelAnnotId(id);
    setEditAnnotId(id);
  };
  const moveAnnotation=(id,x,y)=>updAnnots(as=>{const a=as.find(a=>a.id===id);if(a){a.x=x;a.y=y;}});
  const updAnnotText=(id,text)=>updAnnots(as=>{const a=as.find(a=>a.id===id);if(a)a.text=text;});
  const delAnnot=id=>{updAnnots(as=>{const i=as.findIndex(a=>a.id===id);if(i>=0)as.splice(i,1);});setSelAnnotId(null);setEditAnnotId(null);};
  const selAnnot=annotations.find(a=>a.id===selAnnotId);
  const selCam=cameras.find(c=>c.id===selCamId);
  const selDef=selCam?CAMERA_DB.find(d=>d.model===selCam.model):null;
  const selWall=walls.find(w=>w.id===selWallId);

  // ── Tree ops ──────────────────────────────────────────────────────────────
  const addBuilding=()=>{const f=defFloor();const bid=makeId();const b={id:bid,name:"Building "+String.fromCharCode(65+project.buildings.length),floors:[f]};updProject(np=>np.buildings.push(b));setActiveBId(bid);setActiveFId(f.id);setSelCamId(null);resetView();};
  const addOutdoorZone=(bid,lat,lng,zoom)=>{
    setMapSearching(true);
    const oz=defOutdoorZone();
    oz.lat=lat; oz.lng=lng; oz.zoom=zoom;
    // Store the URL directly — canvas drawImage loads it cross-origin
    // Use non-@2x (800x600) to keep canvas coords 1:1 with logical pixels
    const url=getMapboxUrl(lat,lng,zoom,800,600).replace('@2x','');
    oz.img=url;
    oz.imgW=800;
    oz.imgH=600;
    // px per meter at this zoom (logical pixels, non-retina)
    oz.pxPerMeter=mapboxPxPerMeter(lat,zoom);
    // pxPerFt for compatibility with scale display
    oz.pxPerFt=oz.pxPerMeter*0.3048;
    updProject(np=>{
      const b=np.buildings.find(b=>b.id===bid);
      if(!b.outdoorZones)b.outdoorZones=[];
      const n=b.outdoorZones.length+1;
      oz.name="Outdoor Zone "+n;
      b.outdoorZones.push(oz);
    });
    setActiveBId(bid);
    setActiveOZId(oz.id);
    setActiveTabType("outdoor");
    setShowMapSearch(false);
    setMapSearching(false);
    setSelCamId(null);
    setTimeout(resetView,100);
  };

  const geocodeAddress=async(query)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+
      encodeURIComponent(query)+'.json?access_token='+MAPBOX_TOKEN+'&limit=1';
    const r=await fetch(url);
    const d=await r.json();
    if(d.features&&d.features.length>0){
      const [lng,lat]=d.features[0].center;
      return{lat,lng};
    }
    return null;
  };

  const addFloor=bid=>{const f=defFloor();f.name="Floor "+((project.buildings.find(b=>b.id===bid)||{floors:[]}).floors.length+1);updProject(np=>{const b=np.buildings.find(b=>b.id===bid);if(b)b.floors.push(f);});setActiveBId(bid);setActiveFId(f.id);setSelCamId(null);resetView();};
  const delBuilding=bid=>{if(project.buildings.length<=1)return;updProject(np=>{np.buildings=np.buildings.filter(b=>b.id!==bid);});const b=project.buildings.find(b=>b.id!==bid);if(b){setActiveBId(b.id);setActiveFId(b.floors[0].id);}};
  const delFloor=(bid,fid)=>{const b=project.buildings.find(b=>b.id===bid);if(!b||b.floors.length<=1)return;updProject(np=>{const bn=np.buildings.find(b=>b.id===bid);if(bn)bn.floors=bn.floors.filter(f=>f.id!==fid);});const r=b.floors.find(f=>f.id!==fid);if(r)setActiveFId(r.id);};
  const renB=(id,n)=>updProject(np=>{const b=np.buildings.find(b=>b.id===id);if(b)b.name=n;});
  const renF=(bid,fid,n)=>updProject(np=>{const b=np.buildings.find(b=>b.id===bid);if(b){const f=b.floors.find(f=>f.id===fid);if(f)f.name=n;}});

  const allCams=project.buildings.flatMap(b=>b.floors.flatMap(f=>f.cameras.map(c=>({...c,bName:b.name,bId:b.id,fName:f.name,fId:f.id}))));
  const totalPoe=allCams.reduce((s,c)=>{const d=CAMERA_DB.find(x=>x.model===c.model);return s+(d?d.poeBudget:0);},0);

  const bomLines=()=>{
    const counts={};allCams.forEach(c=>{counts[c.model]=(counts[c.model]||0)+1;});
    const lines=Object.entries(counts).map(([m,q])=>{const d=CAMERA_DB.find(x=>x.model===m);return{sku:d.sku,desc:d.name,qty:q,cat:"Camera"};});
    if(selRec){const r=RECORDER_DB.find(r=>r.sku===selRec);if(r)lines.push({sku:r.sku,desc:r.name,qty:1,cat:"Recorder"});}
    ACCESSORIES_DB.forEach(a=>{const q=bomAcc[a.sku]||0;if(q>0)lines.push({sku:a.sku,desc:a.name,qty:q,cat:"Accessory"});});
    return lines;
  };

  const qDef=CAMERA_DB.find(d=>d.model===qMod);
  const faceQ=qDef?interp(qDef,qDist,qCond,"face"):0;
  const lprQ =qDef?interp(qDef,qDist,qCond,"lpr"):0;

  // ── Styles ────────────────────────────────────────────────────────────────
  // Dark mode token overrides
  const DM=darkMode?{
    bg:"#0F0F1A", surface:"#1A1A2E", surface2:"#242438", border:"#333355",
    text:"#E8E8F0", textSub:"#9999BB", muted:"#555577",
  }:{
    bg:FT.offWhite, surface:FT.white, surface2:FT.offWhite, border:FT.gray,
    text:FT.text, textSub:FT.textSub, muted:FT.grayMid,
  };

  const S={
    app:{background:DM.bg,height:"100vh",display:"flex",flexDirection:"column",fontFamily:"'Inter','Segoe UI',Arial,sans-serif",color:DM.text,fontSize:13,overflow:"hidden"},
    hdr:{background:FT.navy,padding:"0 12px",display:"flex",alignItems:"center",gap:10,flexShrink:0,height:50},
    lTxt:{fontSize:15,fontWeight:700,color:FT.white,letterSpacing:-0.3},
    lSub:{fontSize:9,color:"rgba(255,255,255,0.45)",letterSpacing:0.5},
    tabs:{display:"flex",marginLeft:"auto"},
    tab:a=>({padding:"0 14px",height:50,display:"flex",alignItems:"center",border:"none",cursor:"pointer",fontSize:12,fontWeight:600,background:a?FT.red:"transparent",color:a?FT.white:"rgba(255,255,255,0.65)",borderBottom:a?"3px solid #FF6B35":"3px solid transparent"}),
    body:{display:"flex",flex:1,overflow:"hidden"},
    tree:(isTiny?{display:"none"}:{width:isNarrow?160:205,background:DM.surface,borderRight:"1px solid "+DM.border,display:"flex",flexDirection:"column",flexShrink:0}),
    tHdr:{padding:"9px 11px",borderBottom:"2px solid "+FT.red,fontSize:10,fontWeight:700,color:FT.navy,textTransform:"uppercase",letterSpacing:1,display:"flex",justifyContent:"space-between",alignItems:"center"},
    tScr:{flex:1,overflowY:"auto"},
    tI:(a,d)=>({padding:`5px ${7+d*13}px`,cursor:"pointer",fontSize:11,background:a?darkMode?"#2A1A1E":"#FFF0EF":"transparent",color:a?FT.red:DM.textSub,borderLeft:a?"3px solid "+FT.red:"3px solid transparent",display:"flex",alignItems:"center",gap:4}),
    tBot:{borderTop:"1px solid "+DM.border,padding:"7px 11px",fontSize:10,color:DM.textSub},
    main:{flex:1,minWidth:0,display:"flex",flexDirection:"column",overflow:"hidden"},
    tbar:{background:DM.surface,borderBottom:"1px solid "+DM.border,padding:"5px 9px",display:"flex",alignItems:"center",gap:5,flexShrink:0,flexWrap:"wrap"},
    cvRow:{flex:1,display:"flex",overflow:"hidden",position:"relative"},
    sb:(isNarrow?{display:"none"}:{width:232,background:DM.surface,borderLeft:"1px solid "+DM.border,overflowY:"auto",padding:9,flexShrink:0}),
    pan:{background:DM.surface,border:"1px solid "+DM.border,borderRadius:5,padding:9,marginBottom:7},
    panR:{background:DM.surface,borderTop:"3px solid "+FT.red,border:"1px solid "+DM.border,borderRadius:5,padding:9,marginBottom:7},
    lbl:{fontSize:9,color:FT.grayMid,textTransform:"uppercase",letterSpacing:1,marginBottom:2},
    sel:{width:"100%",background:DM.surface2,color:DM.text,border:"1px solid "+DM.border,borderRadius:4,padding:"4px 6px",fontSize:11},
    inp:{width:"100%",background:DM.surface2,color:DM.text,border:"1px solid "+DM.border,borderRadius:4,padding:"4px 6px",fontSize:11,boxSizing:"border-box"},
    btn:v=>({padding:"4px 10px",borderRadius:4,border:"none",cursor:"pointer",fontWeight:600,fontSize:11,whiteSpace:"nowrap",
             background:v==="primary"?FT.red:v==="navy"?FT.navy:v==="success"?FT.green:v==="warn"?FT.orange:v==="ghost"?FT.white:v==="blue"?"#4488FF":FT.gray,
             color:v==="ghost"?FT.text:FT.white,border:v==="ghost"?"1px solid "+FT.gray:"none"}),
    mBtn:(a,c)=>({padding:"3px 9px",borderRadius:4,border:"1px solid "+(a?(c||FT.red):FT.gray),cursor:"pointer",fontWeight:600,fontSize:10,background:a?(c||FT.red):FT.white,color:a?FT.white:FT.grayDark}),
    st:{fontSize:10,fontWeight:700,color:darkMode?"#8888CC":FT.navy,textTransform:"uppercase",letterSpacing:1,marginBottom:6,paddingBottom:3,borderBottom:"1px solid "+DM.border},
    bdg:c=>({display:"inline-block",padding:"1px 5px",borderRadius:3,fontSize:9,fontWeight:700,background:c,color:FT.white,marginRight:2}),
    iB:c=>({background:"none",border:"none",cursor:"pointer",color:c||FT.grayMid,fontSize:12,padding:"1px 3px",lineHeight:1}),
    div:{width:1,height:18,background:FT.gray,margin:"0 2px",flexShrink:0},
  };
  const TABS=[["planner","Floor Plan"],["quality","Quality"],["bom","BOM"]];


  return(
    <div style={S.app}>
      <div style={S.hdr}>
        <div style={{display:"flex",alignItems:"center",gap:9}}>
          <FortinetLogo/>
          {!isTiny&&<div><div style={S.lTxt}>FortiCamera Planner</div><div style={S.lSub}>VIDEO SURVEILLANCE DESIGN TOOL</div></div>}
        </div>
        {!isTiny&&<input value={project.name} onChange={e=>updProject(np=>np.name=e.target.value)}
          style={{...S.inp,width:isNarrow?110:150,padding:"2px 7px",fontSize:12,fontWeight:600,background:"rgba(255,255,255,0.1)",color:FT.white,border:"1px solid rgba(255,255,255,0.2)",marginLeft:10}}/>}
        {/* Save / Load */}
        <input type="file" accept=".fcplan,.json" ref={projFileRef} style={{display:"none"}} onChange={loadProject}/>
        <button style={{...S.btn("ghost"),fontSize:10,padding:"3px 9px",marginLeft:6}} onClick={newProject}>🆕 New</button>
        <button style={{...S.btn("ghost"),fontSize:10,padding:"3px 9px"}} onClick={()=>projFileRef.current.click()}>📂 Load</button>
        <button style={{...S.btn("ghost"),fontSize:10,padding:"3px 9px"}} onClick={saveProject}>💾 Save</button>
        <div style={S.tabs}>{TABS.map(([k,l])=><button key={k} style={S.tab(tab===k)} onClick={()=>setTab(k)}>{isTiny?l[0]:l}</button>)}</div>
      </div>

      <div style={S.body}>
        {/* ── Project Tree ─────────────────────────────────────────────────── */}
        <div style={S.tree}>
          <div style={S.tHdr}><span>Project</span><button style={S.iB(FT.red)} onClick={addBuilding} title="Add building">＋🏢</button></div>
          <div style={S.tScr}>
            {project.buildings.map(b=>(
              <div key={b.id}>
                <div style={S.tI(activeBId===b.id,0)} onClick={()=>{setActiveBId(b.id);if(b.floors[0])setActiveFId(b.floors[0].id);setSelCamId(null);}}>
                  {editingName?.id===b.id
                    ?<input autoFocus value={editingName.val} style={{...S.inp,padding:"1px 4px",fontSize:10,flex:1}}
                        onChange={e=>setEditingName(n=>({...n,val:e.target.value}))}
                        onBlur={()=>{renB(b.id,editingName.val);setEditingName(null);}}
                        onKeyDown={e=>{if(e.key==="Enter"){renB(b.id,editingName.val);setEditingName(null);}}}
                        onClick={e=>e.stopPropagation()}/>
                    :<span style={{flex:1,fontWeight:600,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}
                        onDoubleClick={e=>{e.stopPropagation();setEditingName({id:b.id,val:b.name});}}>🏢 {b.name}</span>}
                  <button style={S.iB(FT.green)} onClick={e=>{e.stopPropagation();addFloor(b.id);}}>＋</button>
                  {project.buildings.length>1&&<button style={S.iB(FT.red)} onClick={e=>{e.stopPropagation();delBuilding(b.id);}}>✕</button>}
                </div>
                {b.floors.map(f=>(
                  <div key={f.id} style={S.tI(activeTabType==="floor"&&activeFId===f.id,1)}
                    onClick={()=>{setActiveBId(b.id);setActiveFId(f.id);setActiveTabType("floor");setSelCamId(null);setSelWallId(null);setMode("camera");setWallDraft(null);resetView();}}>
                    {editingName?.id===f.id
                      ?<input autoFocus value={editingName.val} style={{...S.inp,padding:"1px 4px",fontSize:10,flex:1}}
                          onChange={e=>setEditingName(n=>({...n,val:e.target.value}))}
                          onBlur={()=>{renF(b.id,f.id,editingName.val);setEditingName(null);}}
                          onKeyDown={e=>{if(e.key==="Enter"){renF(b.id,f.id,editingName.val);setEditingName(null);}}}
                          onClick={e=>e.stopPropagation()}/>
                      :<span style={{flex:1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}
                          onDoubleClick={e=>{e.stopPropagation();setEditingName({id:f.id,val:f.name});}}>
                          {f.img?"🗺":"📋"} {f.name} <span style={{color:FT.grayMid}}>({f.cameras.length})</span>
                        </span>}
                    {b.floors.length>1&&<button style={S.iB(FT.red)} onClick={e=>{e.stopPropagation();delFloor(b.id,f.id);}}>✕</button>}
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div style={S.tBot}>
            {[["Cameras",allCams.length,FT.red],["Buildings",project.buildings.length,FT.navy],["PoE",totalPoe+"W",FT.orange],
              ["Outdoor",project.buildings.reduce((s,b)=>s+(b.outdoorZones||[]).length,0),"#00A651"]].map(([l,v,c])=>(
              <div key={l} style={{display:"flex",justifyContent:"space-between",marginBottom:2}}><span>{l}</span><strong style={{color:c}}>{v}</strong></div>
            ))}
          </div>
        </div>

        {/* ── Vertical Tool Panel ─────────────────────────────────────────── */}
        {tab==="planner"&&<div style={{
          width:isTiny?40:52,background:DM.surface,borderRight:"1px solid "+DM.border,
          display:"flex",flexDirection:"column",alignItems:"center",
          padding:"6px 0",gap:2,flexShrink:0,overflowY:"auto",
        }}>
          {/* File ops */}
          {(()=>{
            const Btn=({icon,label,onClick,active,color,title})=>(
              <button onClick={onClick} title={title||label}
                style={{width:isTiny?36:44,height:isTiny?36:44,border:"none",borderRadius:6,cursor:"pointer",
                  display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",
                  gap:1,background:active?(color||FT.red):"transparent",
                  color:active?FT.white:DM.textSub,fontSize:18,lineHeight:1,
                  borderLeft:active?"3px solid "+(color||FT.red):"3px solid transparent",
                }}>
                <span style={{fontSize:isTiny?13:16}}>{icon}</span>
                {!isTiny&&<span style={{fontSize:7,fontWeight:600,letterSpacing:0.3,opacity:0.85}}>{label}</span>}
              </button>
            );
            const Div=()=><div style={{width:36,height:1,background:DM.border,margin:"3px 0"}}/>;
            return(<>
              <input type="file" accept="image/*" ref={fileRef} style={{display:"none"}} onChange={handleUpload}/>
              <Btn icon="📂" label="Upload" onClick={()=>fileRef.current.click()} title="Upload floor plan"/>
              {activeF?.img&&<Btn icon="🖨" label="PDF" onClick={exportPDF} title="Export PDF"/>}
              <Div/>
              {/* Scale */}
              {!ppf
                ?<Btn icon="📐" label="Scale" onClick={()=>{setMode("scale");setScalePt1(null);setScalePt2(null);}} active={mode==="scale"||mode==="scale2"||mode==="scale_confirm"} color={FT.orange} title="Set scale calibration"/>
                :<Btn icon="📐" label={ppf.toFixed(0)+"p/f"} onClick={()=>updFloor(f=>{f.pxPerFt=null;})} active color={FT.green} title={`Calibrated: ${ppf.toFixed(1)}px/ft — click to reset`}/>
              }
              <Div/>
              {/* Mode tools */}
              <Btn icon="🎥" label="Camera" onClick={()=>{setMode("camera");setWallDraft(null);setZoneDraft(null);}} active={mode==="camera"} title="Camera mode"/>
              <Btn icon="🧱" label="Wall" onClick={()=>{setMode("wall");setWallDraft(null);}} active={mode==="wall"} color={FT.red} title="Draw walls"/>
              <Btn icon="✏️" label="Edit" onClick={()=>{setMode("wall_edit");setWallDraft(null);}} active={mode==="wall_edit"} color="#4488FF" title="Edit walls"/>
              <Btn icon="📝" label="Notes" onClick={()=>{setMode("annotate");setSelAnnotId(null);setEditAnnotId(null);}} active={mode==="annotate"} color="#E6A000" title="Add notes"/>
              <Div/>
              {/* Zones */}
              <Btn icon="✅" label="Cover" onClick={()=>{setZoneType("coverage");setMode("zone");setZoneDraft(null);}} active={mode==="zone"&&zoneType==="coverage"} color={FT.green} title="Draw coverage zone"/>
              <Btn icon="🚫" label="Excl" onClick={()=>{setZoneType("exclusion");setMode("zone");setZoneDraft(null);}} active={mode==="zone"&&zoneType==="exclusion"} color={FT.red} title="Draw exclusion zone"/>
              {zones.length>0&&<Btn icon="🗑" label="Zones" onClick={()=>{setZoneDraft(null);clearZones();}} color={FT.grayDark} title="Clear all zones"/>}
              <Div/>
              {/* View */}
              <Btn icon={showFov?"👁":"👁‍🗨"} label="FOV" onClick={()=>setShowFov(v=>!v)} active={showFov} color={FT.accent} title="Toggle FOV cones"/>
              <Btn icon="＋" label={Math.round(zoom*100)+"%"} onClick={()=>handleZoom(1.25)} title="Zoom in"/>
              <Btn icon="－" label="Zoom" onClick={()=>handleZoom(1/1.25)} title="Zoom out"/>
              <Btn icon="⊡" label="Fit" onClick={resetView} title="Reset view"/>
              <Div/>
              {/* Undo/Redo */}
              <Btn icon="↩" label="Undo" onClick={undo} active={false} color={FT.grayDark} title="Undo (Ctrl+Z)" style={{opacity:undoStack.length?1:0.3}}/>
              <Btn icon="↪" label="Redo" onClick={redo} active={false} color={FT.grayDark} title="Redo (Ctrl+Y)"/>
              <Div/>
              <Btn icon={darkMode?"☀️":"🌙"} label={darkMode?"Light":"Dark"} onClick={()=>setDarkMode(d=>!d)} title="Toggle dark mode"/>
            </>);
          })()}
        </div>}

        {/* ── Main content ─────────────────────────────────────────────────── */}
        <div style={S.main}>

{/* ════ FLOOR PLAN TAB ════════════════════════════════════════════════════ */}
{tab==="planner"&&<>
  {/* ── Top toolbar: camera controls + context info ────────────────────── */}
  <div style={{background:DM.surface,borderBottom:"1px solid "+DM.border,padding:"5px 10px",
    display:"flex",alignItems:"center",gap:6,flexShrink:0,flexWrap:"nowrap",overflowX:"auto"}}>

    {/* Camera model selector — always visible, full readable size */}
    <select value={selModel} onChange={e=>setSelModel(e.target.value)}
      style={{...S.sel,width:180,fontSize:11,flexShrink:0}}>
      <optgroup label="── Cloud ──">{CAMERA_DB.filter(d=>d.cloudOnly).map(d=><option key={d.model} value={d.model}>{d.model} — {d.resolution} {d.fov}°</option>)}</optgroup>
      <optgroup label="── Recorder ──">{CAMERA_DB.filter(d=>!d.cloudOnly).map(d=><option key={d.model} value={d.model}>{d.model} — {d.resolution} {d.fov}°</option>)}</optgroup>
    </select>
    <button style={{...S.btn("navy"),flexShrink:0}} onClick={addCamera}>＋ Add Camera</button>
    <button style={{...S.btn("success"),flexShrink:0,fontSize:11}} onClick={()=>setShowOptimizer(v=>!v)}>🎯 Optimize</button>

    <div style={{width:1,height:20,background:DM.border,margin:"0 4px",flexShrink:0}}/>

    {/* Context info / mode instructions */}
    <div style={{display:"flex",alignItems:"center",gap:5,fontSize:10,color:DM.textSub,flex:1,overflow:"hidden"}}>
      {mode==="camera"&&<>
        <span style={{color:DM.muted,fontSize:9,whiteSpace:"nowrap"}}>
          <strong style={{color:FT.red}}>{activeB?.name}</strong>/<strong style={{color:darkMode?"#8888CC":FT.navy}}>{activeF?.name}</strong>
          &nbsp;· {cameras.length} cam · {walls.length} wall · {zones.length} zone
        </span>
        {ppf&&<span style={{background:FT.green,color:FT.white,padding:"1px 7px",borderRadius:3,fontWeight:600,fontSize:9,flexShrink:0}}>✓ {ppf.toFixed(1)}px/ft</span>}
      </>}
      {mode==="scale"&&<><span style={{color:FT.orange,fontWeight:700,whiteSpace:"nowrap"}}>📐 SCALE</span><span style={{color:DM.muted,marginLeft:4,whiteSpace:"nowrap"}}>click point 1</span><button style={{...S.btn("ghost"),fontSize:9,marginLeft:"auto"}} onClick={()=>{setMode("camera");setScalePt1(null);}}>✕ Cancel</button></>}
      {mode==="scale2"&&<><span style={{color:FT.orange,fontWeight:700,whiteSpace:"nowrap"}}>📐 SCALE</span><span style={{color:DM.muted,marginLeft:4,whiteSpace:"nowrap"}}>click point 2</span><button style={{...S.btn("ghost"),fontSize:9,marginLeft:"auto"}} onClick={()=>{setMode("camera");setScalePt1(null);}}>✕ Cancel</button></>}
      {mode==="scale_confirm"&&scalePt2&&<>
        <span style={{color:FT.green,fontWeight:700,whiteSpace:"nowrap"}}>✓ Both points set — distance =</span>
        <input type="number" min={1} value={scaleFeet} onChange={e=>setScaleFeet(e.target.value)} style={{...S.inp,width:56,padding:"2px 5px",textAlign:"center"}}/>
        <span>ft</span>
        <button style={S.btn("success")} onClick={applyScale}>✓ Apply</button>
        <button style={S.btn("ghost")} onClick={()=>{setScalePt1(null);setScalePt2(null);setMode("camera");}}>✕</button>
      </>}
      {mode==="wall"&&<><span style={{color:FT.red,fontWeight:700,whiteSpace:"nowrap"}}>🧱 DRAW WALL</span><span style={{color:DM.muted,marginLeft:4,whiteSpace:"nowrap"}}>click start → click end · ESC to exit</span><span style={{marginLeft:8,whiteSpace:"nowrap"}}>Thick:</span><input type="range" min={3} max={24} value={wallThick} onChange={e=>setWallThick(+e.target.value)} style={{width:60,accentColor:FT.red}}/><span style={{width:16}}>{wallThick}</span><label style={{display:"flex",alignItems:"center",gap:3,cursor:"pointer",whiteSpace:"nowrap"}}><input type="checkbox" checked={showSnap} onChange={e=>setShowSnap(e.target.checked)}/> Snap</label>{walls.length>0&&<button style={{...S.btn("ghost"),fontSize:9}} onClick={()=>updWalls(ws=>{ws.length=0;setSelWallId(null);})}>🗑 Walls</button>}</>}
      {mode==="wall_edit"&&<><span style={{color:"#4488FF",fontWeight:700,whiteSpace:"nowrap"}}>✏️ EDIT WALL</span><span style={{color:DM.muted,marginLeft:4,whiteSpace:"nowrap"}}>click · drag endpoints · DEL</span>{selWallId&&<button style={{...S.btn("blue"),fontSize:9,marginLeft:4}} onClick={()=>delWall(selWallId)}>🗑 Delete</button>}{walls.length>0&&<button style={{...S.btn("ghost"),fontSize:9,marginLeft:4}} onClick={()=>updWalls(ws=>{ws.length=0;setSelWallId(null);})}>🗑 All</button>}</>}
      {mode==="annotate"&&<><span style={{color:"#B87800",fontWeight:700,whiteSpace:"nowrap"}}>📝 NOTES</span><span style={{color:DM.muted,marginLeft:4,whiteSpace:"nowrap"}}>click to drop · click to edit · ESC</span></>}
      {mode==="zone"&&<><span style={{color:zoneType==="coverage"?FT.green:FT.red,fontWeight:700,whiteSpace:"nowrap"}}>{zoneType==="coverage"?"✅ COVERAGE":"🚫 EXCLUSION"}</span><span style={{color:DM.muted,marginLeft:4,whiteSpace:"nowrap"}}>{zoneDraft?`${zoneDraft.pts.length} pts — double-click to close`:"click to start"}</span>{zoneDraft&&zoneDraft.pts.length>=3&&<button style={{...S.btn("success"),fontSize:9,marginLeft:4}} onClick={closeZone}>✓ Close</button>}{zoneDraft&&<button style={{...S.btn("ghost"),fontSize:9}} onClick={()=>setZoneDraft(null)}>✕</button>}{zones.length>0&&<button style={{...S.btn("ghost"),fontSize:9}} onClick={()=>{setZoneDraft(null);clearZones();}}>🗑 Zones</button>}<button style={{...S.btn("ghost"),fontSize:9,marginLeft:"auto"}} onClick={()=>{setMode("camera");setZoneDraft(null);}}>✕ Exit</button></>}
    </div>
  </div>
  {/* Floor + Outdoor Zone tabs */}
  <div style={{background:DM.surface,borderBottom:"1px solid "+DM.border,display:"flex",alignItems:"center",gap:0,overflowX:"auto",flexShrink:0}}>
    {activeB?.floors.map(f=>{
      const isAct=activeTabType==="floor"&&activeFId===f.id;
      return<button key={f.id} onClick={()=>{setActiveFId(f.id);setActiveTabType("floor");setSelCamId(null);setSelWallId(null);setSelAnnotId(null);setMode("camera");setWallDraft(null);resetView();}}
        style={{padding:"4px 14px",border:"none",borderRight:"1px solid "+DM.border,borderBottom:isAct?"2px solid "+FT.red:"2px solid transparent",
          background:isAct?darkMode?"#1A0A0E":"#FFF0EF":"transparent",
          color:isAct?FT.red:DM.textSub,cursor:"pointer",fontSize:11,fontWeight:isAct?700:400,
          whiteSpace:"nowrap",flexShrink:0}}>
        {f.img?"🗺 ":"📋 "}{f.name} <span style={{color:DM.muted,fontWeight:400}}>({f.cameras.length})</span>
      </button>;
    })}
    {(activeB?.outdoorZones||[]).map(oz=>{
      const isAct=activeTabType==="outdoor"&&activeOZId===oz.id;
      return<button key={oz.id} onClick={()=>{setActiveOZId(oz.id);setActiveTabType("outdoor");setSelCamId(null);setSelWallId(null);setSelAnnotId(null);setMode("camera");setWallDraft(null);resetView();}}
        style={{padding:"4px 14px",border:"none",borderRight:"1px solid "+DM.border,borderBottom:isAct?"2px solid "+FT.green:"2px solid transparent",
          background:isAct?darkMode?"#0A1A0E":"#F0FFF4":"transparent",
          color:isAct?FT.green:DM.textSub,cursor:"pointer",fontSize:11,fontWeight:isAct?700:400,
          whiteSpace:"nowrap",flexShrink:0}}>
        🛰 {oz.name} <span style={{color:DM.muted,fontWeight:400}}>({oz.cameras.length})</span>
      </button>;
    })}
    <button onClick={()=>addFloor(activeBId)} style={{padding:"4px 10px",border:"none",borderRight:"1px solid "+DM.border,background:"transparent",color:FT.green,cursor:"pointer",fontSize:13,flexShrink:0}} title="Add floor">＋</button>
    <button onClick={()=>setShowMapSearch(true)} style={{padding:"4px 10px",border:"none",borderRight:"1px solid "+DM.border,background:"transparent",color:"#00A651",cursor:"pointer",fontSize:11,flexShrink:0,fontWeight:600}} title="Add outdoor zone">🛰 ＋</button>
  </div>

  <div ref={canvasWrapRef} style={S.cvRow}>
    {importing&&(
      <div style={{position:"absolute",inset:0,zIndex:99,background:"rgba(26,26,46,0.75)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:14,pointerEvents:"none"}}>
        <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
        <svg width="48" height="48" viewBox="0 0 48 48" style={{animation:"spin 0.9s linear infinite"}}>
          <circle cx="24" cy="24" r="20" stroke="#DA291C" strokeWidth="4" fill="none" strokeDasharray="90" strokeLinecap="round"/>
        </svg>
        <span style={{color:"#fff",fontWeight:700,fontSize:14}}>Importing floor plan…</span>
      </div>
    )}
    {/* ── Map Search Dialog ────────────────────────────────────────────── */}
    {showMapSearch&&(
      <div style={{position:"absolute",inset:0,zIndex:200,background:"rgba(0,0,0,0.6)",display:"flex",alignItems:"center",justifyContent:"center"}}>
        <div style={{background:DM.surface,borderRadius:10,padding:20,width:420,boxShadow:"0 8px 32px rgba(0,0,0,0.4)",border:"2px solid "+FT.green}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
            <span style={{fontWeight:700,fontSize:14,color:FT.green}}>🛰 Add Outdoor Zone</span>
            <button style={S.iB(DM.textSub)} onClick={()=>setShowMapSearch(false)}>✕</button>
          </div>
          <div style={{fontSize:11,color:DM.textSub,marginBottom:12}}>
            Search by address or enter GPS coordinates. The satellite map will be used as the floor plan.
          </div>
          <div style={S.lbl}>Address or place name</div>
          <div style={{display:"flex",gap:6,marginBottom:10}}>
            <input style={{...S.inp,flex:1}} value={mapSearchQuery} onChange={e=>setMapSearchQuery(e.target.value)}
              placeholder="e.g. Eiffel Tower, Paris" onKeyDown={e=>e.key==="Enter"&&geocodeAddress(mapSearchQuery).then(r=>{if(r){setMapSearchLat(r.lat.toFixed(6));setMapSearchLng(r.lng.toFixed(6));}})}/>
            <button style={S.btn("success")} onClick={()=>geocodeAddress(mapSearchQuery).then(r=>{if(r){setMapSearchLat(r.lat.toFixed(6));setMapSearchLng(r.lng.toFixed(6));}else alert("Address not found.");})}>Search</button>
          </div>
          <div style={{display:"flex",gap:8,marginBottom:10}}>
            <div style={{flex:1}}>
              <div style={S.lbl}>Latitude</div>
              <input style={S.inp} value={mapSearchLat} onChange={e=>setMapSearchLat(e.target.value)} placeholder="36.1699"/>
            </div>
            <div style={{flex:1}}>
              <div style={S.lbl}>Longitude</div>
              <input style={S.inp} value={mapSearchLng} onChange={e=>setMapSearchLng(e.target.value)} placeholder="-115.1398"/>
            </div>
          </div>
          <div style={S.lbl}>Zoom level: {mapZoomLevel} — {mapZoomLevel<=15?"neighborhood":mapZoomLevel<=17?"block":"building"}</div>
          <input type="range" min={13} max={20} value={mapZoomLevel} onChange={e=>setMapZoomLevel(+e.target.value)}
            style={{width:"100%",marginBottom:4,accentColor:FT.green}}/>
          <div style={{display:"flex",justifyContent:"space-between",fontSize:9,color:DM.muted,marginBottom:12}}>
            <span>13 — neighborhood</span><span>16 — block</span><span>20 — building</span>
          </div>
          {mapSearchLat&&mapSearchLng&&(
            <div style={{marginBottom:12,borderRadius:6,overflow:"hidden",border:"1px solid "+DM.border}}>
              <img src={getMapboxUrl(parseFloat(mapSearchLat),parseFloat(mapSearchLng),mapZoomLevel,400,200)}
                style={{width:"100%",height:160,objectFit:"cover",display:"block"}}
                alt="Map preview"/>
              <div style={{padding:"4px 8px",fontSize:9,color:DM.textSub,background:DM.surface2}}>
                Preview · {parseFloat(mapSearchLat).toFixed(4)}, {parseFloat(mapSearchLng).toFixed(4)} · zoom {mapZoomLevel}
              </div>
            </div>
          )}
          <div style={{display:"flex",gap:8}}>
            <button style={{...S.btn("success"),flex:1,padding:"8px",fontSize:12}}
              disabled={!mapSearchLat||!mapSearchLng||mapSearching}
              onClick={()=>addOutdoorZone(activeBId,parseFloat(mapSearchLat),parseFloat(mapSearchLng),mapZoomLevel)}>
              {mapSearching?"⏳ Loading map…":"🛰 Create Outdoor Zone"}
            </button>
            <button style={{...S.btn("ghost"),flex:1,padding:"8px"}} onClick={()=>setShowMapSearch(false)}>Cancel</button>
          </div>
        </div>
      </div>
    )}

    {showOptimizer&&(
      <div style={{position:"absolute",top:8,left:"50%",transform:"translateX(-50%)",zIndex:50,
        background:FT.white,border:"2px solid "+FT.green,borderRadius:8,padding:14,
        boxShadow:"0 4px 20px rgba(0,0,0,0.25)",minWidth:320,maxWidth:400}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
          <span style={{fontWeight:700,fontSize:13,color:FT.navy}}>🎯 Camera Count Optimizer</span>
          <button style={S.iB(FT.grayMid)} onClick={()=>{setShowOptimizer(false);setOptResult(null);}}>✕</button>
        </div>
        <div style={{fontSize:11,color:FT.textSub,marginBottom:10}}>
          Places cameras only inside <strong>Coverage Zones</strong>, avoiding
          <strong>Exclusion Zones</strong>. Walls still block FOV.
        </div>
        {!ppf&&<div style={{fontSize:11,color:FT.orange,fontWeight:600,marginBottom:8}}>⚠ Set scale first for accurate IR range distances.</div>}
        {(activeF?.zones||[]).filter(z=>z.type==="coverage").length===0&&(
          <div style={{fontSize:11,color:FT.red,fontWeight:600,marginBottom:8}}>
            ⚠ Draw a ✅ Coverage Zone first to define the area to optimize.
          </div>
        )}
        {(activeF?.zones||[]).filter(z=>z.type==="exclusion").length>0&&(
          <div style={{fontSize:11,color:FT.green,marginBottom:8}}>
            ✓ {(activeF?.zones||[]).filter(z=>z.type==="exclusion").length} exclusion zone(s) detected — cameras will avoid those areas.
          </div>
        )}
        <div style={S.lbl}>Camera Model</div>
        <select style={{...S.sel,marginBottom:10}} value={optModel} onChange={e=>setOptModel(e.target.value)}>
          <optgroup label="Cloud">{CAMERA_DB.filter(d=>d.cloudOnly).map(d=><option key={d.model} value={d.model}>{d.model} — {d.resolution} · {d.fov}° · IR {d.irRange}m</option>)}</optgroup>
          <optgroup label="Recorder">{CAMERA_DB.filter(d=>!d.cloudOnly).map(d=><option key={d.model} value={d.model}>{d.model} — {d.resolution} · {d.fov}° · IR {d.irRange}m</option>)}</optgroup>
        </select>
        <div style={S.lbl}>Coverage target: {optTarget}%</div>
        <input type="range" min={50} max={100} step={5} value={optTarget}
          onChange={e=>setOptTarget(+e.target.value)}
          style={{width:"100%",marginBottom:4,accentColor:FT.green}}/>
        <div style={{display:"flex",justifyContent:"space-between",fontSize:9,color:FT.grayMid,marginBottom:10}}>
          <span>50% (faster)</span><span>75%</span><span>100% (slower)</span>
        </div>
        {optResult&&(
          <div style={{background:"#F0FFF4",border:"1px solid "+FT.green,borderRadius:5,padding:"8px 10px",marginBottom:10,fontSize:11}}>
            <div style={{fontWeight:700,color:FT.green,fontSize:13}}>✓ Done — {optResult.count} camera{optResult.count!==1?"s":""} placed</div>
            <div style={{color:FT.textSub}}>Estimated coverage: <strong>{optResult.coverage}%</strong> of floor area</div>
            <div style={{fontSize:10,color:FT.grayMid,marginTop:3}}>Cameras labelled OPT-xx · drag to reposition · rotate as needed</div>
          </div>
        )}
        <div style={{display:"flex",gap:8}}>
          <button style={{...S.btn("success"),flex:1,padding:"8px"}}
            onClick={runOptimizer} disabled={optRunning}>
            {optRunning?"⏳ Optimizing…":"🎯 Run Optimizer"}
          </button>
          <button style={{...S.btn("ghost"),flex:1,padding:"8px"}}
            onClick={()=>{setShowOptimizer(false);setOptResult(null);}}>Close</button>
        </div>
        <div style={{fontSize:9,color:FT.grayMid,marginTop:8}}>
          Draw a <strong>✅ Coverage Zone</strong> around the area to fill, and
          <strong>🚫 Exclusion Zones</strong> over toilets/closets/pantries.
          Click to add vertices, <strong>double-click to close</strong> each zone. Max 20 cameras.
        </div>
      </div>
    )}
    <FloorCanvas
      floor={{...activeCanvas,_scalePt1:scalePt1}}
      cameras={cameras}
      selCamId={selCamId}
      selWallId={selWallId}
      onSelectCam={id=>{setSelCamId(id);if(id)setSelWallId(null);}}
      onSelectWall={id=>{setSelWallId(id);if(id)setSelCamId(null);}}
      onMoveCam={moveCam}
      onMoveWall={moveWall}
      showFov={showFov}
      showSnap={showSnap}
      annotations={annotations}
      zones={zones}
      zoneDraft={zoneDraft}
      selAnnotId={selAnnotId}
      onAnnotationClick={handleAnnotationClick}
      onMoveAnnotation={moveAnnotation}
      onZoneClick={handleZoneClick}
      onZoneDblClick={closeZone}
      mode={mode}
      wallDraft={wallDraft}
      wallThick={wallThick}
      mousePos={mousePos}
      scalePt2={scalePt2}
      onScalePt1={pt=>{updFloor(f=>{f._scalePt1=pt;});setScalePt1(pt);setMode("scale2");}}
      onScalePt2={pt=>{setScalePt2(pt);setMode("scale_confirm");}}
      onWallClick={pt=>{
        if(!wallDraft){setWallDraft(pt);return;}
        updWalls(ws=>ws.push({id:makeId(),x1:wallDraft.x,y1:wallDraft.y,x2:pt.x,y2:pt.y,thickness:wallThick}));
        setWallDraft(null);
      }}
      onCanvasMouseMove={setMousePos}
      zoneType={zoneType}
      zoom={zoom} panX={panX} panY={panY}
      onZoom={handleZoom}
      onPanDelta={handlePanDelta}
      onWrapSize={s=>{
        setContainerSize(s);
        containerSizeRef.current=s; // keep ref current for resetView
        // Auto-fit when container grows and user hasn't manually zoomed
        setZoom(z=>{
          const IW=activeF?.imgW||s.w;
          const IH=activeF?.imgH||s.h;
          const fitZ=Math.min(s.w/IW,s.h/IH);
          if(Math.abs(z-1)<0.01||z<fitZ){
            setPanX(0);
            setPanY(0);
            return fitZ;
          }
          return z;
        });
      }}
    />

    {/* ── Side panel ──────────────────────────────────────────────────────── */}
    <div style={S.sb}>
      <div style={S.panR}>
        <div style={S.st}>Model Info</div>
        {(()=>{const d=CAMERA_DB.find(x=>x.model===selModel);return d&&(
          <div style={{fontSize:10,color:FT.textSub,lineHeight:1.9}}>
            <div style={{fontWeight:700,color:FT.navy,fontSize:11,marginBottom:3}}>{d.name}</div>
            <span style={S.bdg(d.cloudOnly?FT.red:FT.grayDark)}>{d.cloudOnly?"Cloud":"Recorder"}</span>
            <span style={S.bdg(poeColor(d.poeStd))}>{d.poeStd}</span><br/>
            {d.resolution} · FOV {d.fov}° · IR {d.irRange}m{ppf&&<span style={{color:FT.accent}}> ({(d.irRange*3.281).toFixed(0)}ft)</span>}<br/>
            <span style={{fontSize:9,color:FT.grayMid}}>{d.desc}</span>
          </div>
        );})()}
      </div>

      {selCam&&selDef&&<div style={S.pan}>
        <div style={S.st}>📷 {selCam.label}</div>
        <div style={S.lbl}>Label</div><input style={{...S.inp,marginBottom:5}} value={selCam.label} onChange={e=>updCam("label",e.target.value)}/>
        <div style={S.lbl}>Zone</div><input style={{...S.inp,marginBottom:5}} value={selCam.location} onChange={e=>updCam("location",e.target.value)} placeholder="Lobby, Entrance…"/>
        <div style={S.lbl}>Rotation: {selCam.rotation}°</div>
        <input type="range" min={0} max={359} value={selCam.rotation} onChange={e=>updCam("rotation",+e.target.value)} style={{width:"100%",marginBottom:5,accentColor:FT.red}}/>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:2}}>
          <div style={S.lbl} style={{marginBottom:0}}>FOV: {selCam.customFov != null ? selCam.customFov : selDef.fov}° {selCam.customFov != null ? <span style={{color:FT.orange,fontSize:8}}>(custom)</span> : <span style={{color:FT.grayMid,fontSize:8}}>(default)</span>}</div>
          {selCam.customFov != null && <button style={{...S.iB(FT.grayMid),fontSize:9}} onClick={()=>updCam("customFov",null)} title="Reset to default">↺</button>}
        </div>
        <input type="range" min={20} max={360} value={selCam.customFov != null ? selCam.customFov : selDef.fov}
          onChange={e=>updCam("customFov",+e.target.value)}
          style={{width:"100%",marginBottom:5,accentColor:FT.orange}}/>
        <div style={S.lbl}>Notes</div>
        <textarea style={{...S.inp,height:42,resize:"none",marginBottom:6}} value={selCam.notes} onChange={e=>updCam("notes",e.target.value)} placeholder="Mount height…"/>
        <div style={{display:"flex",gap:6,marginTop:1}}>
          <button style={{...S.btn("navy"),flex:1,fontSize:10}} onClick={()=>dupCam(selCam.id)}>⧉ Duplicate</button>
          <button style={{...S.btn("primary"),flex:1,fontSize:10}} onClick={()=>delCam(selCam.id)}>🗑 Remove</button>
        </div>
      </div>}

      {selWall&&<div style={S.pan}>
        <div style={S.st}>🧱 Wall Selected</div>
        <div style={{fontSize:10,color:FT.textSub,lineHeight:1.8,marginBottom:7}}>
          <div>Start: ({selWall.x1.toFixed(0)}, {selWall.y1.toFixed(0)})</div>
          <div>End: ({selWall.x2.toFixed(0)}, {selWall.y2.toFixed(0)})</div>
          <div>Length: {Math.hypot(selWall.x2-selWall.x1,selWall.y2-selWall.y1).toFixed(0)}px
            {ppf&&<span style={{color:FT.accent}}> ({(Math.hypot(selWall.x2-selWall.x1,selWall.y2-selWall.y1)/ppf).toFixed(1)}ft)</span>}
          </div>
        </div>
        <div style={{fontSize:9,color:FT.grayMid,marginBottom:7}}>Drag endpoints · drag midpoint to move · DEL</div>
        <button style={{...S.btn("blue"),width:"100%",marginBottom:4}} onClick={()=>delWall(selWallId)}>🗑 Delete Wall</button>
        <button style={{...S.btn("ghost"),width:"100%",fontSize:10}} onClick={()=>setSelWallId(null)}>Deselect</button>
      </div>}

      {selAnnot&&<div style={S.pan}>
        <div style={S.st}>📝 Note</div>
        <textarea
          autoFocus
          value={selAnnot.text}
          onChange={e=>updAnnotText(selAnnot.id,e.target.value)}
          style={{...S.inp,height:80,resize:"vertical",marginBottom:7,fontSize:11}}
          placeholder="Type your note here…"
        />
        <div style={{fontSize:9,color:DM.muted,marginBottom:7}}>Drag note to reposition · DEL to delete</div>
        <button style={{...S.btn("primary"),width:"100%",marginBottom:4,fontSize:10}} onClick={()=>delAnnot(selAnnot.id)}>🗑 Delete Note</button>
        <button style={{...S.btn("ghost"),width:"100%",fontSize:10}} onClick={()=>{setSelAnnotId(null);setEditAnnotId(null);}}>Done</button>
      </div>}

      {!selCam&&!selWall&&!selAnnot&&<div style={S.pan}>
        <div style={S.st}>Tips</div>
        <div style={{fontSize:10,color:FT.textSub,lineHeight:1.9}}>
          <strong>Camera:</strong> Add → drag → rotate → duplicate<br/>
          <strong>FOV:</strong> adjust per-camera with orange slider<br/>
          <strong>Scale:</strong> Set Scale → 2 pts → enter ft<br/>
          <strong>Draw Wall:</strong> click start → click end<br/>
          <strong>Edit Wall:</strong> click wall → drag endpoints<br/>
          <strong>Notes:</strong> 📝 mode → click to drop → edit<br/>
          <strong>Undo/Redo:</strong> Ctrl+Z / Ctrl+Y<br/>
          <strong>Zoom:</strong> scroll · right-drag to pan<br/>
          <strong>Floors:</strong> tabs below toolbar<br/>
          <strong>Save/Load:</strong> header buttons (.fcplan)
        </div>
      </div>}

      <div style={S.pan}>
        <div style={S.st}>Cameras ({cameras.length})</div>
        {cameras.length===0&&<div style={{fontSize:10,color:FT.grayMid}}>No cameras yet</div>}
        {cameras.map(c=>{const d=CAMERA_DB.find(x=>x.model===c.model);return(
          <div key={c.id} onClick={()=>{setSelCamId(c.id);setSelWallId(null);}}
            style={{background:selCamId===c.id?"#FFF0EF":FT.offWhite,border:"1px solid "+(selCamId===c.id?FT.red:FT.gray),borderLeft:"3px solid "+(selCamId===c.id?FT.red:"transparent"),borderRadius:4,padding:"4px 6px",marginBottom:3,cursor:"pointer"}}>
            <div style={{display:"flex",justifyContent:"space-between"}}>
              <span style={{fontWeight:700,fontSize:10,color:selCamId===c.id?FT.red:FT.navy}}>{c.label}</span>
              <span style={{fontSize:8,color:FT.grayMid}}>{d?d.resolution:""}</span>
            </div>
            {c.location&&<div style={{fontSize:9,color:FT.accent}}>📍 {c.location}</div>}
          </div>
        );})}
      </div>
    </div>
  </div>
</>}

{/* ════ QUALITY TAB ═══════════════════════════════════════════════════════ */}
{tab==="quality"&&<div style={{flex:1,overflow:"auto",padding:12}}>
  <div style={S.panR}><div style={{fontSize:14,fontWeight:800,color:FT.navy,marginBottom:2}}>Image Quality Analyzer</div>
    <div style={{fontSize:11,color:FT.textSub}}>Face recognition &amp; LPR readability by camera, distance, and lighting.</div></div>
  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:9,marginBottom:12}}>
    <div style={S.pan}><div style={S.lbl}>Camera Model</div>
      <select style={S.sel} value={qMod} onChange={e=>setQMod(e.target.value)}>
        <optgroup label="Cloud">{CAMERA_DB.filter(d=>d.cloudOnly).map(d=><option key={d.model} value={d.model}>{d.model} — {d.resolution}</option>)}</optgroup>
        <optgroup label="Recorder">{CAMERA_DB.filter(d=>!d.cloudOnly).map(d=><option key={d.model} value={d.model}>{d.model} — {d.resolution}</option>)}</optgroup>
      </select>
      {qDef&&<div style={{marginTop:4,fontSize:10,color:FT.textSub}}>{qDef.desc}</div>}
    </div>
    <div style={S.pan}><div style={S.lbl}>Distance: {qDist}m ({Math.round(qDist*3.281)}ft)</div>
      <input type="range" min={1} max={60} value={qDist} onChange={e=>setQDist(+e.target.value)} style={{width:"100%",marginBottom:5,accentColor:FT.red}}/>
      <div style={{display:"flex",gap:3,flexWrap:"wrap"}}>
        {[2,5,10,15,20,30,50].map(d=><button key={d} onClick={()=>setQDist(d)}
          style={{padding:"2px 5px",borderRadius:3,border:"1px solid "+(qDist===d?FT.red:FT.gray),background:qDist===d?FT.red:FT.white,color:qDist===d?FT.white:FT.grayDark,cursor:"pointer",fontSize:9,fontWeight:600}}>{d}m</button>)}
      </div>
    </div>
    <div style={S.pan}><div style={S.lbl}>Lighting Condition</div>
      <div style={{display:"flex",gap:7}}>
        <button style={{...S.btn(qCond==="day"?"primary":"ghost"),flex:1}} onClick={()=>setQCond("day")}>☀️ Day</button>
        <button style={{...S.btn(qCond==="night"?"navy":"ghost"),flex:1}} onClick={()=>setQCond("night")}>🌙 Night</button>
      </div>
    </div>
  </div>
  {qDef&&<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:9,marginBottom:12}}>
    {[{type:"face",label:"👤 Face Recognition"},{type:"lpr",label:"🚗 License Plate (LPR)"}].map(({type,label})=>{
      const q=type==="face"?faceQ:lprQ;
      return<div key={type} style={S.panR}>
        <div style={{fontSize:13,fontWeight:700,color:FT.navy,marginBottom:8}}>{label}</div>
        <div style={{position:"relative",height:22,background:FT.gray,borderRadius:11,overflow:"hidden",marginBottom:5}}>
          <div style={{height:"100%",width:q+"%",background:qColor(q),borderRadius:11,transition:"width .4s"}}/>
          <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,color:FT.white,textShadow:"0 1px 2px rgba(0,0,0,0.4)"}}>{q}%</div>
        </div>
        <div style={{textAlign:"center",fontSize:19,fontWeight:800,color:qColor(q)}}>{qLabel(q)}</div>
        <div style={{fontSize:10,color:FT.textSub,textAlign:"center",marginTop:2}}>{qDist}m ({Math.round(qDist*3.281)}ft) · {qCond} · {qDef.resolution}</div>
      </div>;
    })}
  </div>}
  <div style={S.pan}>
    <div style={S.st}>All Models — Face Recognition @ {qCond}</div>
    <div style={{overflowX:"auto"}}>
    <table style={{width:"100%",borderCollapse:"collapse",fontSize:10}}>
      <thead><tr style={{background:FT.navy}}>{["Model","Type","PoE",2,5,10,15,20,30].map((h,i)=><th key={i} style={{textAlign:i<3?"left":"center",padding:"5px 5px",color:FT.white,fontWeight:600}}>{h}{i>=3?"m":""}</th>)}</tr></thead>
      <tbody>{CAMERA_DB.map((def,ri)=><tr key={def.model} style={{borderBottom:"1px solid "+FT.gray,background:def.model===qMod?"#FFF0EF":ri%2===0?FT.white:FT.offWhite}}>
        <td style={{padding:"5px",fontWeight:700,color:def.cloudOnly?FT.red:FT.grayDark,fontSize:9}}>{def.model}</td>
        <td style={{padding:"5px",color:FT.textSub,fontSize:9}}>{def.type.split(" ").pop()}</td>
        <td style={{padding:"5px"}}><span style={{...S.bdg(poeColor(def.poeStd)),fontSize:8}}>{def.poeStd}</span></td>
        {[2,5,10,15,20,30].map(d=>{const q=interp(def,d,qCond,"face");return<td key={d} style={{padding:"5px",textAlign:"center",background:d===qDist?"#FFF0EF":"transparent"}}><span style={{color:qColor(q),fontWeight:700}}>{q}%</span></td>;})}
      </tr>)}</tbody>
    </table></div>
  </div>
</div>}

{/* ════ BOM TAB ═══════════════════════════════════════════════════════════ */}
{tab==="bom"&&<div style={{flex:1,overflow:"auto",padding:12}}>
  <div style={S.panR}><div style={{fontSize:14,fontWeight:800,color:FT.navy,marginBottom:2}}>Bill of Materials &amp; Quote</div>
    <div style={{fontSize:11,color:FT.textSub}}>{project.buildings.length} building(s) · {allCams.length} cameras · {totalPoe}W PoE</div></div>
  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:7,marginBottom:10}}>
    <div style={S.pan}><div style={S.lbl}>Project</div><input style={S.inp} value={project.name} onChange={e=>updProject(np=>np.name=e.target.value)}/></div>
    <div style={S.pan}><div style={S.lbl}>Customer</div><input style={S.inp} value={project.customer||""} onChange={e=>updProject(np=>np.customer=e.target.value)} placeholder="Company"/></div>
    <div style={S.pan}><div style={S.lbl}>Date</div><input style={S.inp} value={new Date().toLocaleDateString()} readOnly/></div>
  </div>
  <div style={{display:"grid",gridTemplateColumns:"2fr 1fr",gap:10}}>
    <div>
      {project.buildings.map(b=>(
        <div key={b.id} style={S.pan}>
          <div style={{...S.st,color:FT.red}}>🏢 {b.name}</div>
          {b.floors.map(f=>{
            if(!f.cameras.length)return null;
            const g={};f.cameras.forEach(c=>{(g[c.model]=g[c.model]||[]).push(c);});
            return<div key={f.id} style={{marginBottom:8}}>
              <div style={{fontSize:10,fontWeight:700,color:FT.navy,marginBottom:3,paddingLeft:5,borderLeft:"3px solid "+FT.red}}>📋 {f.name} ({f.cameras.length})</div>
              <table style={{width:"100%",borderCollapse:"collapse",fontSize:10}}>
                <thead><tr style={{background:FT.navy}}>{["SKU","Name","PoE","Qty","Zones"].map(h=><th key={h} style={{textAlign:"left",padding:"3px 5px",color:FT.white,fontWeight:600}}>{h}</th>)}</tr></thead>
                <tbody>{Object.entries(g).map(([m,cs],ri)=>{const d=CAMERA_DB.find(x=>x.model===m);return<tr key={m} style={{borderBottom:"1px solid "+FT.gray,background:ri%2===0?FT.white:FT.offWhite}}>
                  <td style={{padding:"5px",fontWeight:700,color:d?.cloudOnly?FT.red:FT.grayDark,fontSize:9}}>{d?d.sku:m}</td>
                  <td style={{padding:"5px",fontWeight:600}}>{d?d.name:m}</td>
                  <td style={{padding:"5px"}}><span style={{...S.bdg(poeColor(d?d.poeStd:"")),fontSize:8}}>{d?d.poeStd:""}</span></td>
                  <td style={{padding:"5px",fontSize:17,fontWeight:800,color:FT.red}}>×{cs.length}</td>
                  <td style={{padding:"5px",fontSize:9,color:FT.textSub}}>{cs.map(c=>c.location||c.label).join(", ")}</td>
                </tr>;})}
                </tbody>
              </table>
            </div>;
          })}
          {!b.floors.some(f=>f.cameras.length>0)&&<div style={{fontSize:10,color:FT.grayMid}}>No cameras placed.</div>}
        </div>
      ))}
      <div style={S.pan}>
        <div style={S.st}>🖥 FortiRecorder (On-Prem)</div>
        <select style={S.sel} value={selRec} onChange={e=>setSelRec(e.target.value)}>
          <option value="">— FortiCamera Cloud only (no NVR) —</option>
          {RECORDER_DB.map(r=><option key={r.sku} value={r.sku}>{r.sku} — {r.name}</option>)}
        </select>
        {selRec&&(()=>{const rec=RECORDER_DB.find(r=>r.sku===selRec);if(!rec)return null;
          const over=rec.sku!=="FRC-VM-BASE"&&allCams.length>rec.channels;
          return<div style={{marginTop:6,padding:7,background:FT.offWhite,borderRadius:4,fontSize:10,lineHeight:1.7}}>
            <div style={{fontWeight:700}}>{rec.name}</div><div style={{color:FT.textSub}}>{rec.desc}</div>
            <div style={{color:FT.textSub}}>{rec.form} · {rec.hdd}</div>
            {over&&<div style={{color:FT.red,fontWeight:600}}>⚠ {allCams.length} cams exceed {rec.channels}ch.</div>}
          </div>;
        })()}
      </div>
      <div style={S.pan}>
        <div style={S.st}>🔩 Accessories &amp; Licensing</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:4}}>
          {ACCESSORIES_DB.map(a=>(
            <div key={a.sku} style={{display:"flex",alignItems:"center",gap:4,padding:"4px 6px",background:FT.offWhite,borderRadius:4,border:"1px solid "+FT.gray}}>
              <input type="number" min={0} max={999} value={bomAcc[a.sku]||0} onChange={e=>setBomAcc(p=>({...p,[a.sku]:+e.target.value}))} style={{...S.inp,width:40,padding:"2px 3px",textAlign:"center"}}/>
              <div><div style={{fontSize:10,fontWeight:600}}>{a.name}</div><div style={{fontSize:8,color:FT.grayMid}}>{a.sku}</div></div>
            </div>
          ))}
        </div>
      </div>
    </div>
    <div>
      <div style={S.panR}>
        <div style={S.st}>Full SKU List</div>
        {bomLines().length===0?<div style={{fontSize:10,color:FT.grayMid}}>No items yet.</div>:
        <table style={{width:"100%",borderCollapse:"collapse",fontSize:10}}>
          <thead><tr style={{background:FT.navy}}>{["SKU","Cat","Qty"].map(h=><th key={h} style={{textAlign:"left",padding:"3px 4px",color:FT.white,fontWeight:600}}>{h}</th>)}</tr></thead>
          <tbody>{bomLines().map((l,i)=><tr key={i} style={{borderBottom:"1px solid "+FT.gray,background:i%2===0?FT.white:FT.offWhite}}>
            <td style={{padding:"4px",color:FT.red,fontWeight:700,fontSize:9}}>{l.sku}</td>
            <td style={{padding:"4px",color:FT.textSub}}>{l.cat}</td>
            <td style={{padding:"4px",fontWeight:700,color:FT.navy}}>×{l.qty}</td>
          </tr>)}</tbody>
        </table>}
      </div>
      <div style={S.pan}>
        <div style={S.st}>Project Summary</div>
        {[["Project",project.name||"—"],["Customer",project.customer||"—"],["Buildings",project.buildings.length],["Cameras",allCams.length],["PoE",totalPoe+"W"],["NVR",selRec?RECORDER_DB.find(r=>r.sku===selRec)?.name||"Cloud":"Cloud"],["Date",new Date().toLocaleDateString()]].map(([k,v])=>(
          <div key={k} style={{display:"flex",justifyContent:"space-between",padding:"4px 0",borderBottom:"1px solid "+FT.gray,fontSize:11}}>
            <span style={{color:FT.textSub}}>{k}</span><span style={{fontWeight:600,color:FT.navy}}>{v}</span>
          </div>
        ))}
      </div>
      <button style={{...S.btn("primary"),width:"100%",padding:"8px",fontSize:12,marginBottom:6}} onClick={()=>{
        const lines=bomLines();
        const txt=["FORTINET — BILL OF MATERIALS","=".repeat(42),"Project : "+project.name,"Customer: "+(project.customer||""),"Date    : "+new Date().toLocaleDateString(),"Cameras : "+allCams.length+"  PoE: "+totalPoe+"W","=".repeat(42),...lines.map(l=>" "+String(l.qty).padStart(3)+"  "+l.sku.padEnd(30)+" "+l.cat),"=".repeat(42),...allCams.map(c=>{const d=CAMERA_DB.find(x=>x.model===c.model);return" "+c.label.padEnd(10)+" | "+String(d?d.name:"").padEnd(22)+" | "+c.bName+"/"+c.fName+" | "+(c.location||"—");}),"=".repeat(42)].join("\n");
        const blob=new Blob([txt],{type:"text/plain"});const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="BOM_"+project.name.replace(/\s+/g,"_")+".txt";a.click();
      }}>⬇ Export BOM (.txt)</button>
      <button style={{...S.btn("navy"),width:"100%",padding:"8px",fontSize:12}} onClick={()=>{
        const lines=bomLines();
        const csv=["FORTINET BOM","","Project,"+project.name,"Customer,"+(project.customer||""),"","SKU,Description,Category,Qty",...lines.map(l=>l.sku+',"'+l.desc+'",'+l.cat+","+l.qty),"","Label,Model,Building,Floor,Zone,Rotation",...allCams.map(c=>c.label+","+c.model+","+c.bName+","+c.fName+',"'+c.location+'",'+c.rotation+"°")].join("\n");
        const blob=new Blob([csv],{type:"text/csv"});const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="BOM_"+project.name.replace(/\s+/g,"_")+".csv";a.click();
      }}>📊 Export BOM (.csv)</button>
    </div>
  </div>
</div>}

      </div>
    </div>
  </div>
  );
}