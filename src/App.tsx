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
  { model:"FCM-FE120B",  sku:"FCM-FE120B",  name:"FortiCamera FE120B",  cloudOnly:false, type:"Fisheye",                 resolution:"12MP/9MP",fov:360, irRange:20, poeStd:"802.3at", poeBudget:13, color:FT.grayDark, desc:"12MP fisheye, 1.22mm, IP66/IK10",
    faceQ:{day:{"2":95,"4":78,"6":58,"8":38,"10":20},night:{"2":75,"4":55,"6":35,"8":18,"10":8}}, lprQ:{day:{"2":85,"4":65,"6":45,"8":25,"10":10},night:{"2":65,"4":45,"6":25,"8":10,"10":3}} },
  { model:"FCM-FE120B-CA", sku:"FCM-FE120B-CA", name:"FortiCamera FE120B-CA", cloudOnly:true, type:"AI Fisheye",             resolution:"12MP",    fov:360, irRange:20, poeStd:"802.3at", poeBudget:13, color:FT.red, desc:"12MP AI fisheye, 1.22mm, built-in analytics, IP66/IK10, 1TB SD",
    faceQ:{day:{"2":98,"4":85,"6":68,"8":48,"10":28},night:{"2":82,"4":65,"6":45,"8":25,"10":12}}, lprQ:{day:{"2":90,"4":72,"6":52,"8":32,"10":15},night:{"2":72,"4":52,"6":32,"8":15,"10":5}} },
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






// Bitrate reference: Mbps per camera by resolution & codec (typical Fortinet defaults)
// Formula: Daily GB = Bitrate × 3600 × recHours × (motionPct/100) / 8 / 1024
const CAM_BITRATE = {
  "5MP":{"H.264":4.0,"H.265":2.5},
  "8MP":{"H.264":8.0,"H.265":5.0},
  "12MP":{"H.264":12.0,"H.265":7.0},
  "12MP/9MP":{"H.264":12.0,"H.265":7.0}, // fisheye — use 12MP value
};
// SD card sizes per cloud camera model (GB)
const CAM_SD = {
  "FCM-MC51-C":512,"FCM-CD51-C":512,"FCM-CD55-C":512,
  "FCM-FD55-CA":512,"FCM-FB85-CA":1024,"FCM-FE120B-CA":1024,
};
// Idle background upload bandwidth per cloud camera (Mbps) — metadata + thumbnail
const CAM_IDLE_BW = 0.8;
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
const MAPBOX_TOKEN=import.meta.env.VITE_MAPBOX_TOKEN||"";
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
                      onSetCamRange,
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
  const onSetCamRangeRef=useRef(onSetCamRange);
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
    onSetCamRangeRef.current=onSetCamRange;
  }); // no deps = after every render, before paint
  const floorRef=useRef(floor);
  useEffect(()=>{floorRef.current=floor;},[floor]);
  const zoomRef=useRef(zoom); useEffect(()=>{zoomRef.current=zoom;},[zoom]);
  const panXRef=useRef(panX); useEffect(()=>{panXRef.current=panX;},[panX]);
  const panYRef=useRef(panY); useEffect(()=>{panYRef.current=panY;},[panY]);
  const camerasRef=useRef(cameras); useEffect(()=>{camerasRef.current=cameras;},[cameras]);
  const selCamIdRef=useRef(selCamId); useEffect(()=>{selCamIdRef.current=selCamId;},[selCamId]);
  const ppfRef=useRef(null);

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
    ppfRef.current=ppf;
    const walls=floor.walls||[];

    // ── FOV cones ────────────────────────────────────────────────────────────
    // Range quality: green=excellent, yellow=fair, orange=poor, red=unusable
    const rangeQualityColor=(rangePx,maxRangePx)=>{
      if(!maxRangePx||maxRangePx<=0) return "#00A651";
      const ratio=rangePx/maxRangePx;
      if(ratio<=0.45) return "#00A651";   // green — excellent
      if(ratio<=0.70) return "#E6C700";   // yellow — fair
      if(ratio<=0.90) return "#F47920";   // orange — poor
      return "#DA291C";                    // red — unusable
    };
    if(showFov){
      cameras.forEach(cam=>{
        const def=CAMERA_DB.find(d=>d.model===cam.model); if(!def)return;
        const isSel=selCamId===cam.id, isHov=hovCam===cam.id;
        const maxRangePx=ppf?def.irRange*3.281*ppf:70;
        const range=cam.customRange!=null?cam.customRange:maxRangePx;
        const dirRad=(cam.rotation*Math.PI)/180;
        const qColor=rangeQualityColor(range,maxRangePx);
        ctx.save();
        if(def.fov>=360){
          const pts=buildVisPolygon(cam.x,cam.y,range,dirRad,Math.PI,walls);
          if(pts.length>2){
            const g=ctx.createRadialGradient(cam.x,cam.y,0,cam.x,cam.y,range);
            g.addColorStop(0,qColor+"88"); g.addColorStop(1,qColor+"11");
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
          ctx.globalAlpha=0.09; ctx.fillStyle=qColor;
          ctx.beginPath(); ctx.moveTo(cam.x,cam.y);
          ctx.arc(cam.x,cam.y,range,dirRad-halfFov,dirRad+halfFov);
          ctx.closePath(); ctx.fill();
          // Visible polygon
          if(visPts.length>1){
            const g=ctx.createRadialGradient(cam.x,cam.y,0,cam.x,cam.y,range);
            g.addColorStop(0,qColor+(isSel?"CC":"88"));
            g.addColorStop(0.5,qColor+(isSel?"77":"55"));
            g.addColorStop(1,qColor+"11");
            ctx.fillStyle=g; ctx.globalAlpha=isSel||isHov?1:0.9;
            ctx.beginPath(); ctx.moveTo(cam.x,cam.y);
            visPts.forEach(p=>ctx.lineTo(p.x,p.y));
            ctx.closePath(); ctx.fill();
            ctx.globalAlpha=0.5; ctx.strokeStyle=qColor; ctx.lineWidth=1.2/zoom;
            ctx.stroke();
          }
          // ── Range handle (diamond) at cone tip — only for selected cam ──
          if(isSel){
            const hx=cam.x+Math.cos(dirRad)*range;
            const hy=cam.y+Math.sin(dirRad)*range;
            const hs=8/zoom;
            // Distance label above handle
            const distFt=ppf?(range/ppf).toFixed(1)+"ft / "+(range/ppf/3.281).toFixed(1)+"m":"drag to set range";
            const qualLabel=range<=maxRangePx*0.45?"● Excellent":range<=maxRangePx*0.70?"● Fair":range<=maxRangePx*0.90?"● Poor":"● Unusable";
            const fullLabel=distFt+" — "+qualLabel;
            ctx.save();
            ctx.font=`bold ${9/zoom}px Inter,sans-serif`;
            const tw=ctx.measureText(fullLabel).width;
            const lx=hx-tw/2, ly=hy-hs-8/zoom;
            ctx.fillStyle="rgba(26,26,46,0.88)";
            ctx.beginPath();
            ctx.roundRect?ctx.roundRect(lx-3/zoom,ly-9/zoom,tw+6/zoom,13/zoom,3/zoom):ctx.rect(lx-3/zoom,ly-9/zoom,tw+6/zoom,13/zoom);
            ctx.fill();
            ctx.fillStyle=qColor;
            ctx.fillText(fullLabel,lx,ly+1/zoom);
            ctx.restore();
            // Diamond handle
            ctx.save();
            ctx.fillStyle=qColor;
            ctx.strokeStyle=FT.white;
            ctx.lineWidth=1.5/zoom;
            ctx.beginPath();
            ctx.moveTo(hx, hy-hs);
            ctx.lineTo(hx+hs, hy);
            ctx.lineTo(hx, hy+hs);
            ctx.lineTo(hx-hs, hy);
            ctx.closePath();
            ctx.fill(); ctx.stroke();
            ctx.restore();
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

    // Range handle hit-test (only for selected cam in camera mode)
    const selCamForHandle=selCamIdRef.current?camerasRef.current.find(c=>c.id===selCamIdRef.current):null;
    if(selCamForHandle){
      const def=CAMERA_DB.find(d=>d.model===selCamForHandle.model);
      if(def&&def.fov<360){
        const ppfNow=ppfRef.current;
        const maxRangePx=ppfNow?def.irRange*3.281*ppfNow:70;
        const range=selCamForHandle.customRange!=null?selCamForHandle.customRange:maxRangePx;
        const dirRad=(selCamForHandle.rotation*Math.PI)/180;
        const hx=selCamForHandle.x+Math.cos(dirRad)*range;
        const hy=selCamForHandle.y+Math.sin(dirRad)*range;
        const htol=12/zoomRef.current;
        if(Math.hypot(ip.x-hx,ip.y-hy)<htol){
          dragState.current={type:"range",id:selCamForHandle.id};
          return;
        }
      }
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

    // Drag range handle
    if(dragState.current?.type==="range"){
      const ds=dragState.current;
      const cam=camerasRef.current.find(c=>c.id===ds.id); if(!cam) return;
      const dirRad=(cam.rotation*Math.PI)/180;
      const dx=ip.x-cam.x, dy=ip.y-cam.y;
      // Project mouse onto direction vector
      const newRange=Math.max(20/zoomRef.current, dx*Math.cos(dirRad)+dy*Math.sin(dirRad));
      onSetCamRangeRef.current(ds.id, newRange);
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
    if(dragState.current?.type==="range")return"ns-resize";
    if(m==="scale"||m==="scale2"||m==="wall")return"crosshair";
    if(m==="wall_edit"){if(hovWall)return hovWall.part==="body"?"move":"crosshair"; return"default";}
    if(hovCam)return"grab";
    return"default";
  };

  return(
    <div ref={wrapRef} style={{flex:1,minWidth:0,overflow:"hidden",background:"#1e2333",position:"relative"}}>
      <canvas ref={cvRef} width={IW} height={IH}
        style={{
          display:"block", width:"100%", height:"auto", maxHeight:"100%",
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
  const [cmpVendor,setCmpVendor]=useState("All");
  const [cmpSearch,setCmpSearch]=useState("");
  const [cmpForm,setCmpForm]=useState("All");
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
  const [licenseYears,setLicenseYears]=useState(1);
  const [selRec,setSelRec]=useState("");
  const [deployMode,setDeployMode]=useState("cloud"); // "cloud"|"onprem"|"hybrid"
  // Sizing tab state
  const [sizMode,setSizMode]=useState("cloud"); // "cloud" | "onprem"
  const [sizCodec,setSizCodec]=useState("H.265");
  const [sizMotion,setSizMotion]=useState(20); // % motion
  const [sizHours,setSizHours]=useState(24);   // recording hours/day
  const [sizHddTb,setSizHddTb]=useState(8);    // on-prem total HDD TB
  const [sizConcurrent,setSizConcurrent]=useState(1); // live viewers per camera
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
      .page{padding:12mm;}
      .cover{display:flex;flex-direction:column;align-items:center;padding-top:40mm;gap:8px;}
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
    html+=`<div class="page cover" style="page-break-after:always">
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

      html+=`<div class="page floor-page" style="page-break-after:always">
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

      ${(cloudCamCount>0||accRows.length>0)?`<h3>Accessories &amp; Licensing</h3>
      <table class="bom-table"><thead><tr><th>SKU</th><th>Description</th><th>Category</th><th style="text-align:right">Qty</th></tr></thead>
      <tbody>
        ${cloudCamCount>0?`<tr>
          <td class="sku">${licSku}</td>
          <td>${licenseYears}-Year FortiCamera Cloud + FortiCare Premium (per camera)</td>
          <td>License</td>
          <td style="text-align:right" class="qty">×${cloudCamCount}</td>
        </tr>`:""}
        ${accRows.map(a=>`<tr><td class="sku">${a.sku}</td><td>${a.name}</td><td>${a.cat}</td><td style="text-align:right" class="qty">×${bomAcc[a.sku]}</td></tr>`).join("")}
      </tbody>
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

  const cloudCamCount=allCams.filter(c=>{const d=CAMERA_DB.find(x=>x.model===c.model);return d&&d.cloudOnly;}).length;
  const onpremCamCount=allCams.length-cloudCamCount;
  // Cloud license SKU suffix: -12=1yr, -36=3yr, -60=5yr
  const licSkuMap={1:"FC1-10-FCCLD-518-02-12",3:"FC1-10-FCCLD-518-02-36",5:"FC1-10-FCCLD-518-02-60"};
  const licSku=licSkuMap[licenseYears]||"FC1-10-FCCLD-518-02-12";
  const licDesc=`FortiCamera Cloud + FortiCare (${licenseYears}yr/cam)`;

  // VM stackable license calculator — returns array of {sku,desc,qty} to reach camCount
  const vmStackLines=(camCount)=>{
    // Base includes 10 cams; add stacking licenses to cover the rest
    const needed=Math.max(0,camCount-10);
    const stacks=[];
    let rem=needed;
    if(rem>=100){stacks.push({sku:"FRC-VM-100",desc:"FortiRecorder VM — 100 additional cameras",qty:Math.floor(rem/100),cat:"Recorder"});rem=rem%100;}
    if(rem>=50){stacks.push({sku:"FRC-VM-50",desc:"FortiRecorder VM — 50 additional cameras",qty:Math.floor(rem/50),cat:"Recorder"});rem=rem%50;}
    if(rem>0){stacks.push({sku:"FRC-VM-10",desc:"FortiRecorder VM — 10 additional cameras",qty:Math.ceil(rem/10),cat:"Recorder"});}
    return stacks;
  };

  const bomLines=()=>{
    const counts={};allCams.forEach(c=>{counts[c.model]=(counts[c.model]||0)+1;});
    const lines=Object.entries(counts).map(([m,q])=>{const d=CAMERA_DB.find(x=>x.model===m);return{sku:d.sku,desc:d.name,qty:q,cat:"Camera"};});

    if(deployMode==="cloud"){
      // Pure cloud: license for every cloud-capable camera placed
      if(cloudCamCount>0)lines.push({sku:licSku,desc:licDesc,qty:cloudCamCount,cat:"License"});
    }
    else if(deployMode==="onprem"){
      // Pure on-prem: FortiRecorder + VM stacking if needed, no cloud licenses
      if(selRec){
        const r=RECORDER_DB.find(r=>r.sku===selRec);
        if(r){
          lines.push({sku:r.sku,desc:r.name,qty:1,cat:"Recorder"});
          if(r.sku==="FRC-VM-BASE")vmStackLines(allCams.length).forEach(l=>lines.push(l));
        }
      }
    }
    else if(deployMode==="hybrid"){
      // Hybrid: FortiRecorder (on-prem) + cloud management of all cameras
      // 1. FortiRecorder appliance or VM base
      if(selRec){
        const r=RECORDER_DB.find(r=>r.sku===selRec);
        if(r){
          lines.push({sku:r.sku,desc:r.name,qty:1,cat:"Recorder"});
          if(r.sku==="FRC-VM-BASE")vmStackLines(allCams.length).forEach(l=>lines.push(l));
        }
      }
      // 2. FRC-CLM-20: cloud management of FortiRecorder cameras (stackable 20-cam blocks, perpetual)
      const clmBlocks=Math.ceil(allCams.length/20);
      if(clmBlocks>0)lines.push({sku:"FRC-CLM-20",desc:"FortiRecorder Cloud Mode — 20 cameras (perpetual, stackable)",qty:clmBlocks,cat:"License"});
      // 3. FortiCamera Cloud subscription for cloud analytics per camera
      if(allCams.length>0)lines.push({sku:licSku,desc:licDesc,qty:allCams.length,cat:"License"});
    }

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
  const TABS=[["planner","Floor Plan"],["quality","Quality"],["bom","BOM"],["sizing","Sizing"],["comparison","Comparison"],["info","Info"]];


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
              <Btn icon="🏢" label="Upload Floor Plan" onClick={()=>fileRef.current.click()} title="Upload floor plan"/>
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
    {/* Quick Add / Floor Plan toggle — only for floor tabs, not outdoor zones */}
    {activeTabType==="floor"&&activeF&&(
      <div style={{marginLeft:"auto",display:"flex",gap:0,borderLeft:"1px solid "+DM.border,flexShrink:0}}>
        <button
          onClick={()=>updFloor(f=>{f.quickAdd=false;})}
          style={{padding:"4px 12px",border:"none",borderRight:"1px solid "+DM.border,
            background:!activeF.quickAdd?(darkMode?"#1A0A0E":"#FFF0EF"):"transparent",
            color:!activeF.quickAdd?FT.red:DM.textSub,
            cursor:"pointer",fontSize:11,fontWeight:!activeF.quickAdd?700:400,whiteSpace:"nowrap",flexShrink:0}}
          title="Floor plan mode — place cameras on a map">
          🗺 Floor Plan
        </button>
        <button
          onClick={()=>updFloor(f=>{f.quickAdd=true;})}
          style={{padding:"4px 12px",border:"none",
            background:activeF.quickAdd?(darkMode?"#0A1A0E":"#F0FFF4"):"transparent",
            color:activeF.quickAdd?FT.green:DM.textSub,
            cursor:"pointer",fontSize:11,fontWeight:activeF.quickAdd?700:400,whiteSpace:"nowrap",flexShrink:0}}
          title="Quick Add — add cameras by model and quantity">
          📋 Quick Add
        </button>
      </div>
    )}
  </div>

  {/* ── Quick Add mode — shows when floor has quickAdd:true ─────────────── */}
  {activeTabType==="floor"&&activeF?.quickAdd?(
    <div style={{flex:1,overflow:"auto",padding:16,background:DM.bg}}>
      <div style={{maxWidth:800,margin:"0 auto"}}>
        <div style={{...S.panR,marginBottom:12}}>
          <div style={{fontSize:14,fontWeight:800,color:FT.navy,marginBottom:4}}>📋 Quick Add — {activeF.name}</div>
          <div style={{fontSize:11,color:DM.textSub}}>Add cameras by model and quantity without a floor plan. All cameras appear in the BOM and sizing calculations. Switch to 🗺 Floor Plan mode to place them on a map.</div>
          {activeF.cameras.length>0&&(
            <div style={{marginTop:8,display:"flex",gap:8,flexWrap:"wrap",alignItems:"center"}}>
              <span style={{background:FT.green,color:FT.white,padding:"2px 10px",borderRadius:3,fontWeight:700,fontSize:11}}>
                {activeF.cameras.length} camera{activeF.cameras.length!==1?"s":""} added
              </span>
              <button style={{...S.btn("primary"),fontSize:10}}
                onClick={()=>updCams(cs=>{cs.splice(0,cs.length);})}>
                🗑 Clear all cameras
              </button>
            </div>
          )}
        </div>

        {/* Cloud cameras */}
        <div style={{marginBottom:10,fontWeight:700,fontSize:12,color:FT.red,letterSpacing:0.5}}>☁ CLOUD CAMERAS (FortiCamera Cloud)</div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(230px,1fr))",gap:8,marginBottom:16}}>
          {CAMERA_DB.filter(d=>d.cloudOnly).map(d=>{
            const qty=activeF.cameras.filter(c=>c.model===d.model).length;
            return(
              <div key={d.model} style={{background:DM.surface,border:"1px solid "+(qty>0?FT.red:DM.border),borderLeft:"3px solid "+(qty>0?FT.red:DM.border),borderRadius:6,padding:"10px 12px"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:4}}>
                  <div>
                    <div style={{fontWeight:700,fontSize:11,color:qty>0?FT.red:DM.text}}>{d.model}</div>
                    <div style={{fontSize:9,color:DM.textSub}}>{d.resolution} · {d.fov}° FOV · IR {d.irRange}m</div>
                    <div style={{fontSize:9,color:DM.muted,marginTop:2}}>{d.desc}</div>
                  </div>
                  {qty>0&&<span style={{background:FT.red,color:FT.white,borderRadius:10,padding:"1px 7px",fontSize:10,fontWeight:700,flexShrink:0,marginLeft:4}}>{qty}</span>}
                </div>
                <div style={{display:"flex",gap:4,alignItems:"center",marginTop:6}}>
                  <button
                    style={{width:26,height:26,border:"1px solid "+DM.border,borderRadius:4,background:DM.bg,color:DM.text,cursor:qty>0?"pointer":"not-allowed",fontSize:15,lineHeight:1,opacity:qty>0?1:0.35,fontWeight:700}}
                    disabled={qty===0}
                    onClick={()=>updCams(cs=>{const i=cs.findLastIndex?cs.findLastIndex(c=>c.model===d.model):([...cs].reverse().findIndex(c=>c.model===d.model)!==-1?cs.length-1-([...cs].reverse().findIndex(c=>c.model===d.model)):-1);if(i>=0)cs.splice(i,1);})}>
                    −
                  </button>
                  <span style={{minWidth:28,textAlign:"center",fontWeight:700,fontSize:13,color:qty>0?FT.red:DM.textSub}}>{qty}</span>
                  <button
                    style={{width:26,height:26,border:"none",borderRadius:4,background:FT.red,color:FT.white,cursor:"pointer",fontSize:15,lineHeight:1,fontWeight:700}}
                    onClick={()=>updCams(cs=>{cs.push({id:"cam_"+makeId(),model:d.model,x:0,y:0,rotation:0,label:"CAM-"+String(nid.current++).padStart(2,"0"),notes:"",location:"",quickAdd:true});})}>
                    ＋
                  </button>
                  <div style={{flex:1,display:"flex",gap:3}}>
                    {[5,10,20].map(n=>(
                      <button key={n} style={{flex:1,padding:"3px 0",border:"1px solid "+DM.border,borderRadius:3,background:DM.bg,color:DM.textSub,cursor:"pointer",fontSize:9,fontWeight:600}}
                        onClick={()=>updCams(cs=>{for(let i=0;i<n;i++)cs.push({id:"cam_"+makeId(),model:d.model,x:0,y:0,rotation:0,label:"CAM-"+String(nid.current++).padStart(2,"0"),notes:"",location:"",quickAdd:true});})}>
                        +{n}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Recorder cameras */}
        <div style={{marginBottom:10,fontWeight:700,fontSize:12,color:FT.navy,letterSpacing:0.5}}>🖥 RECORDER CAMERAS (FortiRecorder)</div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(230px,1fr))",gap:8}}>
          {CAMERA_DB.filter(d=>!d.cloudOnly).map(d=>{
            const qty=activeF.cameras.filter(c=>c.model===d.model).length;
            return(
              <div key={d.model} style={{background:DM.surface,border:"1px solid "+(qty>0?FT.navy:DM.border),borderLeft:"3px solid "+(qty>0?FT.navy:DM.border),borderRadius:6,padding:"10px 12px"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:4}}>
                  <div>
                    <div style={{fontWeight:700,fontSize:11,color:qty>0?FT.navy:DM.text}}>{d.model}</div>
                    <div style={{fontSize:9,color:DM.textSub}}>{d.resolution} · {d.fov}° FOV · IR {d.irRange}m</div>
                    <div style={{fontSize:9,color:DM.muted,marginTop:2}}>{d.desc}</div>
                  </div>
                  {qty>0&&<span style={{background:FT.navy,color:FT.white,borderRadius:10,padding:"1px 7px",fontSize:10,fontWeight:700,flexShrink:0,marginLeft:4}}>{qty}</span>}
                </div>
                <div style={{display:"flex",gap:4,alignItems:"center",marginTop:6}}>
                  <button
                    style={{width:26,height:26,border:"1px solid "+DM.border,borderRadius:4,background:DM.bg,color:DM.text,cursor:qty>0?"pointer":"not-allowed",fontSize:15,lineHeight:1,opacity:qty>0?1:0.35,fontWeight:700}}
                    disabled={qty===0}
                    onClick={()=>updCams(cs=>{const i=cs.findLastIndex?cs.findLastIndex(c=>c.model===d.model):([...cs].reverse().findIndex(c=>c.model===d.model)!==-1?cs.length-1-([...cs].reverse().findIndex(c=>c.model===d.model)):-1);if(i>=0)cs.splice(i,1);})}>
                    −
                  </button>
                  <span style={{minWidth:28,textAlign:"center",fontWeight:700,fontSize:13,color:qty>0?FT.navy:DM.textSub}}>{qty}</span>
                  <button
                    style={{width:26,height:26,border:"none",borderRadius:4,background:FT.navy,color:FT.white,cursor:"pointer",fontSize:15,lineHeight:1,fontWeight:700}}
                    onClick={()=>updCams(cs=>{cs.push({id:"cam_"+makeId(),model:d.model,x:0,y:0,rotation:0,label:"CAM-"+String(nid.current++).padStart(2,"0"),notes:"",location:"",quickAdd:true});})}>
                    ＋
                  </button>
                  <div style={{flex:1,display:"flex",gap:3}}>
                    {[5,10,20].map(n=>(
                      <button key={n} style={{flex:1,padding:"3px 0",border:"1px solid "+DM.border,borderRadius:3,background:DM.bg,color:DM.textSub,cursor:"pointer",fontSize:9,fontWeight:600}}
                        onClick={()=>updCams(cs=>{for(let i=0;i<n;i++)cs.push({id:"cam_"+makeId(),model:d.model,x:0,y:0,rotation:0,label:"CAM-"+String(nid.current++).padStart(2,"0"),notes:"",location:"",quickAdd:true});})}>
                        +{n}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  ):(
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
      onSetCamRange={(id,rangePx)=>updCams(cs=>{const c=cs.find(c=>c.id===id);if(c)c.customRange=rangePx;})}
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
        {(()=>{
          const maxRangePx=ppf?selDef.irRange*3.281*ppf:null;
          const curRangePx=selCam.customRange!=null?selCam.customRange:maxRangePx;
          const curRangeFt=ppf&&curRangePx!=null?(curRangePx/ppf).toFixed(1):null;
          const maxRangeFt=ppf&&selDef.irRange?(selDef.irRange*3.281).toFixed(1):null;
          const qColor=maxRangePx&&curRangePx?(curRangePx/maxRangePx<=0.45?"#00A651":curRangePx/maxRangePx<=0.70?"#E6C700":curRangePx/maxRangePx<=0.90?FT.orange:FT.red):FT.green;
          const qLabel=maxRangePx&&curRangePx?(curRangePx/maxRangePx<=0.45?"Excellent":curRangePx/maxRangePx<=0.70?"Fair":curRangePx/maxRangePx<=0.90?"Poor":"Unusable"):"—";
          return(<>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:2}}>
              <div style={S.lbl} style={{marginBottom:0}}>
                Range{curRangeFt?`: ${curRangeFt}ft`:""}{maxRangeFt?` / max ${maxRangeFt}ft`:""}&nbsp;
                <span style={{color:qColor,fontWeight:700,fontSize:8}}>{qLabel}</span>
                {selCam.customRange!=null&&<span style={{color:FT.orange,fontSize:8}}> (custom)</span>}
              </div>
              {selCam.customRange!=null&&<button style={{...S.iB(FT.grayMid),fontSize:9}} onClick={()=>updCam("customRange",null)} title="Reset to default">↺</button>}
            </div>
            {maxRangePx!=null?<input type="range" min={Math.round(maxRangePx*0.05)} max={Math.round(maxRangePx*1.5)}
              value={curRangePx!=null?Math.round(curRangePx):Math.round(maxRangePx)}
              onChange={e=>updCam("customRange",+e.target.value)}
              style={{width:"100%",marginBottom:5,accentColor:qColor}}/>
            :<div style={{fontSize:9,color:FT.grayMid,marginBottom:5}}>Set scale to enable range control · drag ◇ handle on cone</div>}
          </>);
        })()}
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
  )/* end floor plan / quick-add conditional */}
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
{tab==="sizing"&&(()=>{
  // ── build per-model summary from allCams ──────────────────────────────
  const camGroups={};
  allCams.forEach(c=>{
    const d=CAMERA_DB.find(x=>x.model===c.model);
    if(!d)return;
    if(!camGroups[c.model])camGroups[c.model]={d,count:0};
    camGroups[c.model].count++;
  });
  const rows=Object.values(camGroups);
  const totalCams=allCams.length;
  const cloudRows=rows.filter(r=>r.d.cloudOnly);
  const onpremRows=rows.filter(r=>!r.d.cloudOnly);

  // Per-row calculations
  const calcRow=(r,codec,motionPct,hoursPerDay)=>{
    const res=r.d.resolution;
    const brBase=(CAM_BITRATE[res]||{"H.264":4,"H.265":2.5})[codec]||2.5;
    // Daily GB/cam = bitrate(Mbps) × 3600s × hours × motionRatio / 8bits / 1024 MB→GB
    const dailyGbPerCam=brBase*3600*hoursPerDay*(motionPct/100)/8/1024;
    return{br:brBase,dailyGbPerCam};
  };

  // ── BANDWIDTH section ─────────────────────────────────────────────────
  let totalIdleBw=0, totalLiveBw=0;
  cloudRows.forEach(r=>{
    totalIdleBw+=r.count*CAM_IDLE_BW;
    totalLiveBw+=r.count*sizConcurrent*(CAM_BITRATE[r.d.resolution]||{"H.264":4,"H.265":2.5})[sizCodec];
  });

  // ── STORAGE section ───────────────────────────────────────────────────
  // Cloud: SD-card retention per model
  const cloudStorageRows=cloudRows.map(r=>{
    const{dailyGbPerCam}=calcRow(r,sizCodec,sizMotion,sizHours);
    const sdGb=CAM_SD[r.d.model]||512;
    const retDays=dailyGbPerCam>0?Math.floor(sdGb/dailyGbPerCam):999;
    return{...r,dailyGbPerCam,sdGb,retDays};
  });
  // On-prem: all cameras share the FortiRecorder HDD pool
  const onpremTotalDailyGb=rows.reduce((sum,r)=>{
    const{dailyGbPerCam}=calcRow(r,sizCodec,sizMotion,sizHours);
    return sum+dailyGbPerCam*r.count;
  },0);
  const onpremRetDays=onpremTotalDailyGb>0?Math.floor(sizHddTb*1024/onpremTotalDailyGb):999;

  const panS={background:darkMode?"#252535":"#fff",border:"1px solid "+(darkMode?"#3A3A5A":FT.gray),borderRadius:6,padding:10,marginBottom:10};
  const stS={fontSize:11,fontWeight:800,color:FT.red,textTransform:"uppercase",letterSpacing:1,marginBottom:8,paddingBottom:4,borderBottom:"2px solid "+FT.red};
  const tblHead={background:FT.navy};
  const thS={textAlign:"left",padding:"4px 6px",color:FT.white,fontWeight:600,fontSize:10};
  const tdS=(i)=>({padding:"5px 6px",fontSize:10,background:i%2===0?(darkMode?"#1e1e30":FT.white):(darkMode?"#252535":FT.offWhite),borderBottom:"1px solid "+(darkMode?"#3A3A5A":FT.gray)});
  const inputS={...S.inp,width:70,padding:"3px 5px",textAlign:"center"};
  const labelS={fontSize:10,color:FT.textSub,marginRight:4};

  return<div style={{flex:1,overflow:"auto",padding:12}}>
    {/* header */}
    <div style={S.panR}>
      <div style={{fontSize:14,fontWeight:800,color:FT.navy,marginBottom:2}}>📐 Bandwidth &amp; Storage Sizing</div>
      <div style={{fontSize:11,color:FT.textSub}}>{totalCams} camera{totalCams!==1?"s":""} · {cloudRows.reduce((s,r)=>s+r.count,0)} cloud · {onpremRows.reduce((s,r)=>s+r.count,0)} on-prem</div>
    </div>

    {/* Global settings */}
    <div style={{...panS,display:"flex",flexWrap:"wrap",gap:14,alignItems:"center",padding:"8px 12px"}}>
      <div style={{display:"flex",alignItems:"center",gap:6}}>
        <span style={{...labelS,fontWeight:700}}>Mode:</span>
        {[["cloud","☁ Cloud"],["onprem","🖥 On-Prem"]].map(([k,l])=>(
          <button key={k} onClick={()=>setSizMode(k)}
            style={{padding:"3px 11px",fontSize:10,fontWeight:700,borderRadius:3,
              border:"1px solid "+(sizMode===k?FT.red:FT.gray),
              background:sizMode===k?FT.red:FT.white,
              color:sizMode===k?FT.white:FT.grayDark,cursor:"pointer"}}>{l}</button>
        ))}
      </div>
      <div style={{display:"flex",alignItems:"center",gap:4}}>
        <span style={labelS}>Codec:</span>
        {["H.264","H.265"].map(c=>(
          <button key={c} onClick={()=>setSizCodec(c)}
            style={{padding:"3px 10px",fontSize:10,fontWeight:700,borderRadius:3,
              border:"1px solid "+(sizCodec===c?FT.navy:FT.gray),
              background:sizCodec===c?FT.navy:FT.white,
              color:sizCodec===c?FT.white:FT.grayDark,cursor:"pointer"}}>{c}</button>
        ))}
      </div>
      <div style={{display:"flex",alignItems:"center",gap:4}}>
        <span style={labelS}>Motion %:</span>
        <input type="number" min={1} max={100} value={sizMotion} onChange={e=>setSizMotion(Math.min(100,Math.max(1,+e.target.value)))} style={inputS}/>
      </div>
      <div style={{display:"flex",alignItems:"center",gap:4}}>
        <span style={labelS}>Rec hrs/day:</span>
        <input type="number" min={1} max={24} value={sizHours} onChange={e=>setSizHours(Math.min(24,Math.max(1,+e.target.value)))} style={inputS}/>
      </div>
      {sizMode==="onprem"&&<div style={{display:"flex",alignItems:"center",gap:4}}>
        <span style={labelS}>NVR HDD (TB):</span>
        <input type="number" min={1} max={500} value={sizHddTb} onChange={e=>setSizHddTb(Math.max(1,+e.target.value))} style={inputS}/>
      </div>}
      {sizMode==="cloud"&&<div style={{display:"flex",alignItems:"center",gap:4}}>
        <span style={labelS}>Live viewers/cam:</span>
        <input type="number" min={0} max={20} value={sizConcurrent} onChange={e=>setSizConcurrent(Math.max(0,+e.target.value))} style={inputS}/>
      </div>}
    </div>

    {totalCams===0&&<div style={{...panS,padding:20,textAlign:"center",color:FT.grayMid,fontSize:12}}>
      No cameras placed yet. Add cameras on the Floor Plan tab to see sizing estimates.
    </div>}

    {/* ── BANDWIDTH (cloud mode only) ─── */}
    {sizMode==="cloud"&&totalCams>0&&<div style={panS}>
      <div style={stS}>☁ Cloud Upload Bandwidth</div>
      <div style={{fontSize:10,color:FT.textSub,marginBottom:8}}>
        Idle = continuous background upload (metadata, thumbnails, motion clips). Live = on-demand stream per active viewer.
      </div>
      {cloudRows.length===0?<div style={{fontSize:10,color:FT.grayMid}}>No cloud cameras placed.</div>:
      <table style={{width:"100%",borderCollapse:"collapse",marginBottom:10}}>
        <thead><tr style={tblHead}>
          {["Model","Qty","Resolution","Bitrate (Mbps)","Idle Bw (Mbps)","Live Bw ×"+sizConcurrent+"v (Mbps)"].map(h=><th key={h} style={thS}>{h}</th>)}
        </tr></thead>
        <tbody>{cloudRows.map((r,i)=>{
          const br=(CAM_BITRATE[r.d.resolution]||{"H.264":4,"H.265":2.5})[sizCodec]||2.5;
          const idle=(r.count*CAM_IDLE_BW).toFixed(1);
          const live=(r.count*sizConcurrent*br).toFixed(1);
          return<tr key={r.d.model}>
            {[r.d.name,r.count,r.d.resolution,br.toFixed(1),idle,live].map((v,j)=>(
              <td key={j} style={{...tdS(i),fontWeight:j===0?600:400,color:j===0?FT.navy:"inherit"}}>{v}</td>
            ))}
          </tr>;
        })}</tbody>
        <tfoot><tr style={{background:FT.navy}}>
          <td colSpan={4} style={{...thS,textAlign:"right"}}>Total</td>
          <td style={thS}>{totalIdleBw.toFixed(1)} Mbps</td>
          <td style={thS}>{totalLiveBw.toFixed(1)} Mbps</td>
        </tr></tfoot>
      </table>}
      <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
        {[["Total Idle Upload",totalIdleBw.toFixed(1)+" Mbps",FT.navy],
          ["Peak Live Streams ("+sizConcurrent+" viewer/cam)",(totalIdleBw+totalLiveBw).toFixed(1)+" Mbps",FT.red],
          ["Recommended WAN",(Math.ceil((totalIdleBw+totalLiveBw)*1.3*10)/10).toFixed(1)+" Mbps",FT.orange]
        ].map(([label,val,col])=>(
          <div key={label} style={{flex:1,minWidth:120,background:FT.offWhite,borderRadius:5,padding:"8px 12px",borderLeft:"4px solid "+col}}>
            <div style={{fontSize:9,color:FT.textSub,fontWeight:600,textTransform:"uppercase",letterSpacing:0.5}}>{label}</div>
            <div style={{fontSize:18,fontWeight:800,color:col,marginTop:2}}>{val}</div>
          </div>
        ))}
      </div>
    </div>}

    {/* ── CLOUD STORAGE (SD card retention) ─── */}
    {sizMode==="cloud"&&totalCams>0&&<div style={panS}>
      <div style={stS}>☁ Cloud — SD Card Retention per Camera</div>
      <div style={{fontSize:10,color:FT.textSub,marginBottom:8}}>
        Formula: Daily GB/cam = Bitrate × {sizHours}h × {sizMotion}% motion ÷ 8 ÷ 1024 · Retention = SD size ÷ Daily GB
      </div>
      {cloudRows.length===0?<div style={{fontSize:10,color:FT.grayMid}}>No cloud cameras placed.</div>:
      <table style={{width:"100%",borderCollapse:"collapse"}}>
        <thead><tr style={tblHead}>
          {["Model","Qty","Resolution","Bitrate","SD Card","Daily GB/cam","Retention (days)"].map(h=><th key={h} style={thS}>{h}</th>)}
        </tr></thead>
        <tbody>{cloudStorageRows.map((r,i)=>(
          <tr key={r.d.model}>
            <td style={{...tdS(i),fontWeight:600,color:FT.navy}}>{r.d.name}</td>
            <td style={tdS(i)}>{r.count}</td>
            <td style={tdS(i)}>{r.d.resolution}</td>
            <td style={tdS(i)}>{((CAM_BITRATE[r.d.resolution]||{"H.264":4,"H.265":2.5})[sizCodec]||2.5).toFixed(1)} Mbps</td>
            <td style={tdS(i)}>{r.sdGb>=1024?(r.sdGb/1024)+"TB":r.sdGb+"GB"}</td>
            <td style={tdS(i)}>{r.dailyGbPerCam.toFixed(2)} GB</td>
            <td style={{...tdS(i),fontWeight:700,color:r.retDays>=14?FT.green:r.retDays>=7?FT.orange:FT.red}}>{r.retDays} days</td>
          </tr>
        ))}</tbody>
      </table>}
    </div>}

    {/* ── ON-PREM BANDWIDTH ─── */}
    {sizMode==="onprem"&&totalCams>0&&<div style={panS}>
      <div style={stS}>🖥 On-Prem Network Bandwidth</div>
      <div style={{fontSize:10,color:FT.textSub,marginBottom:8}}>
        LAN bandwidth from cameras to FortiRecorder (does not consume WAN).
      </div>
      <table style={{width:"100%",borderCollapse:"collapse",marginBottom:10}}>
        <thead><tr style={tblHead}>
          {["Model","Qty","Resolution","Bitrate/cam","Total (Mbps)"].map(h=><th key={h} style={thS}>{h}</th>)}
        </tr></thead>
        <tbody>{rows.map((r,i)=>{
          const br=(CAM_BITRATE[r.d.resolution]||{"H.264":4,"H.265":2.5})[sizCodec]||2.5;
          const total=(r.count*br).toFixed(1);
          return<tr key={r.d.model}>
            <td style={{...tdS(i),fontWeight:600,color:r.d.cloudOnly?FT.red:FT.navy}}>{r.d.name}</td>
            <td style={tdS(i)}>{r.count}</td>
            <td style={tdS(i)}>{r.d.resolution}</td>
            <td style={tdS(i)}>{br.toFixed(1)} Mbps</td>
            <td style={{...tdS(i),fontWeight:700}}>{total} Mbps</td>
          </tr>;
        })}</tbody>
        <tfoot><tr style={{background:FT.navy}}>
          <td colSpan={4} style={{...thS,textAlign:"right"}}>Total LAN</td>
          <td style={thS}>{rows.reduce((s,r)=>s+r.count*((CAM_BITRATE[r.d.resolution]||{"H.264":4,"H.265":2.5})[sizCodec]||2.5),0).toFixed(1)} Mbps</td>
        </tr></tfoot>
      </table>
    </div>}

    {/* ── ON-PREM STORAGE (FortiRecorder HDD) ─── */}
    {sizMode==="onprem"&&totalCams>0&&<div style={panS}>
      <div style={stS}>🖥 On-Prem — FortiRecorder Retention</div>
      <div style={{fontSize:10,color:FT.textSub,marginBottom:8}}>
        All cameras share the NVR HDD pool. Formula: Daily GB = Bitrate × {sizHours}h × {sizMotion}% motion ÷ 8 ÷ 1024
      </div>
      <table style={{width:"100%",borderCollapse:"collapse",marginBottom:10}}>
        <thead><tr style={tblHead}>
          {["Model","Qty","Resolution","Bitrate/cam","Daily GB/cam","Daily GB total"].map(h=><th key={h} style={thS}>{h}</th>)}
        </tr></thead>
        <tbody>{rows.map((r,i)=>{
          const{br,dailyGbPerCam}=calcRow(r,sizCodec,sizMotion,sizHours);
          return<tr key={r.d.model}>
            <td style={{...tdS(i),fontWeight:600,color:r.d.cloudOnly?FT.red:FT.navy}}>{r.d.name}</td>
            <td style={tdS(i)}>{r.count}</td>
            <td style={tdS(i)}>{r.d.resolution}</td>
            <td style={tdS(i)}>{br.toFixed(1)} Mbps</td>
            <td style={tdS(i)}>{dailyGbPerCam.toFixed(2)} GB</td>
            <td style={{...tdS(i),fontWeight:700}}>{(dailyGbPerCam*r.count).toFixed(1)} GB</td>
          </tr>;
        })}</tbody>
        <tfoot><tr style={{background:FT.navy}}>
          <td colSpan={5} style={{...thS,textAlign:"right"}}>Total daily</td>
          <td style={thS}>{onpremTotalDailyGb.toFixed(1)} GB</td>
        </tr></tfoot>
      </table>
      <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
        {[["NVR HDD Capacity",sizHddTb+" TB",FT.navy],
          ["Daily Storage Used",onpremTotalDailyGb.toFixed(1)+" GB",FT.grayDark],
          ["Estimated Retention",onpremRetDays+" days",onpremRetDays>=30?FT.green:onpremRetDays>=14?FT.orange:FT.red]
        ].map(([label,val,col])=>(
          <div key={label} style={{flex:1,minWidth:120,background:FT.offWhite,borderRadius:5,padding:"8px 12px",borderLeft:"4px solid "+col}}>
            <div style={{fontSize:9,color:FT.textSub,fontWeight:600,textTransform:"uppercase",letterSpacing:0.5}}>{label}</div>
            <div style={{fontSize:18,fontWeight:800,color:col,marginTop:2}}>{val}</div>
          </div>
        ))}
      </div>
    </div>}

    {/* ── PER-CAMERA DETAIL (collapsible info) ─── */}
    {totalCams>0&&<div style={panS}>
      <div style={stS}>📊 Camera Bitrate Reference</div>
      <table style={{width:"100%",borderCollapse:"collapse"}}>
        <thead><tr style={tblHead}>
          {["Resolution","H.264 Mbps","H.265 Mbps","Note"].map(h=><th key={h} style={thS}>{h}</th>)}
        </tr></thead>
        <tbody>{[
          ["5MP","4.0","2.5","Standard dome/bullet/cube"],
          ["8MP","8.0","5.0","High-res AI bullet (FB85-CA)"],
          ["12MP","12.0","7.0","Fisheye (FE120B / FE120B-CA)"],
        ].map(([res,h264,h265,note],i)=>(
          <tr key={res}>
            <td style={{...tdS(i),fontWeight:700}}>{res}</td>
            <td style={tdS(i)}>{h264}</td>
            <td style={{...tdS(i),color:FT.green,fontWeight:600}}>{h265}</td>
            <td style={{...tdS(i),color:FT.textSub}}>{note}</td>
          </tr>
        ))}</tbody>
      </table>
      <div style={{fontSize:9,color:FT.grayMid,marginTop:6}}>
        Bitrates are typical values at medium quality. Actual rates depend on scene complexity, motion level, and camera settings. Motion %: percentage of time cameras record at full bitrate vs. idle background rate.
      </div>
    </div>}
  </div>;
})()}

{tab==="bom"&&<div style={{flex:1,overflow:"auto",padding:12}}>
  <div style={S.panR}><div style={{fontSize:14,fontWeight:800,color:FT.navy,marginBottom:2}}>Bill of Materials &amp; Quote</div>
    <div style={{fontSize:11,color:FT.textSub}}>{project.buildings.length} building(s) · {allCams.length} cameras · {totalPoe}W PoE · {deployMode==="cloud"?"☁ Cloud Only":deployMode==="onprem"?"🖥 On-Prem Only":"⚡ Hybrid"}</div></div>
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
      {/* ── Deployment Mode ──────────────────────────── */}
      <div style={S.pan}>
        <div style={S.st}>🌐 Deployment Mode</div>
        <div style={{display:"flex",gap:4,marginBottom:10}}>
          {[["cloud","☁ Cloud Only","All cameras managed via FortiCamera Cloud. No on-prem NVR."],
            ["onprem","🖥 On-Prem Only","FortiRecorder NVR locally. No cloud connectivity."],
            ["hybrid","⚡ Hybrid","FortiRecorder on-prem + cloud management & analytics for all cameras."]
          ].map(([val,label,tip])=>(
            <button key={val} title={tip} onClick={()=>setDeployMode(val)} style={{
              flex:1,padding:"7px 4px",fontSize:10,fontWeight:700,borderRadius:4,cursor:"pointer",
              border:"2px solid "+(deployMode===val?FT.green:FT.gray),
              background:deployMode===val?FT.green:FT.white,
              color:deployMode===val?FT.white:FT.grayDark,
              transition:"all .15s"
            }}>{label}</button>
          ))}
        </div>
        {deployMode==="cloud"&&<div style={{fontSize:10,color:FT.textSub,lineHeight:1.6,padding:"6px 8px",background:FT.offWhite,borderRadius:4}}>
          All cameras connect directly to FortiCamera Cloud. Requires cloud-capable SKUs (marked ☁). License required per camera.
        </div>}
        {deployMode==="onprem"&&<div style={{fontSize:10,color:FT.textSub,lineHeight:1.6,padding:"6px 8px",background:FT.offWhite,borderRadius:4}}>
          All cameras record locally to a FortiRecorder NVR. FortiCamera, 3rd-party ONVIF, and legacy cameras all supported. No cloud connectivity or licenses required.
        </div>}
        {deployMode==="hybrid"&&<div style={{fontSize:10,color:FT.textSub,lineHeight:1.6,padding:"6px 8px",background:"#EAF7EE",borderRadius:4,borderLeft:"3px solid "+FT.green}}>
          <b style={{color:FT.green}}>Hybrid mode:</b> FortiRecorder stores footage on-prem. All cameras (FortiCamera, 3rd-party, legacy) are also managed and their analytics accessed via FortiCamera Cloud.<br/>
          Requires: <b>FRC-CLM-20</b> (cloud management of FortiRecorder, 20-cam blocks) + <b>FC1-10-FCCLD</b> subscription per camera for cloud analytics.
        </div>}
      </div>

      {/* ── FortiRecorder (on-prem or hybrid) ───────── */}
      {(deployMode==="onprem"||deployMode==="hybrid")&&<div style={S.pan}>
        <div style={S.st}>🖥 FortiRecorder</div>
        <select style={S.sel} value={selRec} onChange={e=>setSelRec(e.target.value)}>
          <option value="">— Select a FortiRecorder model —</option>
          {RECORDER_DB.map(r=><option key={r.sku} value={r.sku}>{r.sku} — {r.name}</option>)}
        </select>
        {selRec&&(()=>{
          const rec=RECORDER_DB.find(r=>r.sku===selRec);if(!rec)return null;
          const over=rec.sku!=="FRC-VM-BASE"&&allCams.length>rec.channels;
          const vmStacks=rec.sku==="FRC-VM-BASE"?vmStackLines(allCams.length):[];
          return<div style={{marginTop:6,padding:7,background:FT.offWhite,borderRadius:4,fontSize:10,lineHeight:1.7}}>
            <div style={{fontWeight:700}}>{rec.name}</div>
            <div style={{color:FT.textSub}}>{rec.desc}</div>
            <div style={{color:FT.textSub}}>{rec.form} · {rec.hdd}</div>
            {over&&<div style={{color:FT.red,fontWeight:600}}>⚠ {allCams.length} cameras exceed {rec.channels}ch limit.</div>}
            {vmStacks.length>0&&<div style={{marginTop:5,padding:"4px 6px",background:"#EAF7EE",borderRadius:3,borderLeft:"3px solid "+FT.green}}>
              <div style={{fontWeight:700,color:FT.green,marginBottom:2}}>VM Stacking licenses needed ({allCams.length} cameras, base covers 10):</div>
              {vmStacks.map(s=><div key={s.sku} style={{color:FT.navy}}>× {s.qty} &nbsp;<b>{s.sku}</b> — {s.desc}</div>)}
            </div>}
          </div>;
        })()}
        {!selRec&&<div style={{fontSize:10,color:FT.red,marginTop:5}}>⚠ Please select a FortiRecorder model.</div>}
      </div>}

      {/* ── Licensing ────────────────────────────────── */}
      <div style={S.pan}>
        <div style={S.st}>🔩 Licensing &amp; Accessories</div>
        {/* Cloud license subscription term */}
        {(deployMode==="cloud"||deployMode==="hybrid")&&<div style={{padding:"6px 0 10px",borderBottom:"1px solid "+FT.gray,marginBottom:8}}>
          <div style={{fontSize:10,fontWeight:700,color:FT.navy,marginBottom:4}}>
            {deployMode==="hybrid"?"☁ Cloud Analytics Subscription (all cameras)":"☁ FortiCamera Cloud License"}
          </div>
          <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap",marginBottom:4}}>
            <div style={{fontSize:10,color:FT.textSub}}>
              <b style={{color:FT.red}}>{deployMode==="hybrid"?allCams.length:cloudCamCount}</b> camera{(deployMode==="hybrid"?allCams.length:cloudCamCount)!==1?"s":""}
              {deployMode==="hybrid"?" (all — FortiCamera + 3rd-party)":" detected"}
            </div>
            <div style={{display:"flex",alignItems:"center",gap:4}}>
              <span style={{fontSize:10,color:FT.textSub}}>Term:</span>
              {[1,3,5].map(y=><button key={y} onClick={()=>setLicenseYears(y)}
                style={{padding:"2px 10px",fontSize:10,fontWeight:700,borderRadius:3,cursor:"pointer",
                  border:"1px solid "+(licenseYears===y?FT.red:FT.gray),
                  background:licenseYears===y?FT.red:FT.white,
                  color:licenseYears===y?FT.white:FT.grayDark}}>
                {y}yr</button>)}
            </div>
          </div>
          <div style={{fontSize:9,color:FT.grayMid}}>{licSku} × {deployMode==="hybrid"?allCams.length:cloudCamCount}</div>
          {deployMode==="hybrid"&&allCams.length>0&&(()=>{
            const blocks=Math.ceil(allCams.length/20);
            return<div style={{marginTop:6,padding:"4px 6px",background:"#EAF7EE",borderRadius:3,borderLeft:"3px solid "+FT.green,fontSize:9,color:FT.navy}}>
              <b>FRC-CLM-20</b> × {blocks} — FortiRecorder Cloud Mode, {blocks*20}-camera block{blocks>1?"s":""} (perpetual)
            </div>;
          })()}
        </div>}
        {deployMode==="onprem"&&<div style={{padding:"6px 0 10px",borderBottom:"1px solid "+FT.gray,marginBottom:8,fontSize:10,color:FT.textSub}}>
          ✅ No cloud licenses required for on-prem only deployment.
        </div>}
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
        {[["Project",project.name||"—"],["Customer",project.customer||"—"],["Buildings",project.buildings.length],["Cameras",allCams.length],["PoE",totalPoe+"W"],["Mode",deployMode==="cloud"?"☁ Cloud Only":deployMode==="onprem"?"🖥 On-Prem Only":"⚡ Hybrid"],["NVR",(deployMode==="onprem"||deployMode==="hybrid")?(selRec?RECORDER_DB.find(r=>r.sku===selRec)?.name||selRec:"— not selected —"):"N/A (Cloud)"],["Date",new Date().toLocaleDateString()]].map(([k,v])=>(
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
        // ── SheetJS cell-style helpers ────────────────────────────────────
        // Colors (6-char hex, no alpha prefix — SheetJS uses rgb not argb)
        // HTML-table-as-Excel: full color support, no paid library needed
        const C={navy:"#1A1A2E",red:"#DA291C",green:"#00A651",white:"#FFFFFF",
                 off:"#F5F5F5",gray:"#E0E0E0",sub:"#555555",orange:"#F47920"};
        const catC={Camera:C.navy,Recorder:C.green,License:C.red,Accessory:C.orange};
        const bd="1px solid "+C.gray;
        const td=(v,{bg="",fg="#000000",bold=false,align="left",sz=10,colspan=1,italic=false}={})=>{
          const s=`background:${bg||C.white};color:${fg};font-weight:${bold?"bold":"normal"};`
                 +`font-style:${italic?"italic":"normal"};text-align:${align};`
                 +`font-size:${sz}pt;font-family:Arial,sans-serif;`
                 +`border:${bd};padding:3px 6px;white-space:nowrap;`;
          return `<td style="${s}"${colspan>1?` colspan="${colspan}"`:""}>${v??""}</td>`;
        };
        const tr=(...cells)=>`<tr>${cells.join("")}</tr>`;
        const lines=bomLines();

        // ══ Sheet 1 — BOM Summary ════════════════════════════════════════
        const infoRows=[
          ["Project",project.name||"—"],
          ["Customer",project.customer||"—"],
          ["Date",new Date().toLocaleDateString()],
          ["Deployment",deployMode==="cloud"?"Cloud Only":deployMode==="onprem"?"On-Prem Only":"Hybrid (On-Prem + Cloud)"],
          ["Cameras",`${allCams.length} total · ${cloudCamCount} cloud-native · ${onpremCamCount} on-prem/3rd-party`],
          ["Total PoE",`${totalPoe} W`],
          ["NVR",(deployMode==="onprem"||deployMode==="hybrid")?(selRec?RECORDER_DB.find(r=>r.sku===selRec)?.name||selRec:"— not selected —"):"FortiCamera Cloud (no NVR)"],
        ];
        const s1rows=[
          tr(td("FORTINET — BILL OF MATERIALS",{bg:C.navy,fg:C.white,bold:true,align:"center",sz:13,colspan:4})),
          ...infoRows.map(([k,v])=>tr(
            td(k,{fg:C.sub,bold:true,sz:9}),
            td(v,{sz:10,colspan:3}),
          )),
          tr(td("",{colspan:4})),
          tr(td("SKU",{bg:C.navy,fg:C.white,bold:true,align:"center"}),td("Description",{bg:C.navy,fg:C.white,bold:true,align:"center"}),td("Category",{bg:C.navy,fg:C.white,bold:true,align:"center"}),td("Qty",{bg:C.navy,fg:C.white,bold:true,align:"center"})),
          ...lines.map((l,i)=>{
            const bg=i%2===0?C.white:C.off;
            const ac=catC[l.cat]||C.navy;
            return tr(
              td(l.sku,{bg,fg:ac,bold:true}),
              td(l.desc,{bg}),
              td(l.cat,{bg:ac,fg:C.white,bold:true,align:"center",sz:9}),
              td(l.qty,{bg,fg:ac,bold:true,align:"center",sz:11}),
            );
          }),
          tr(td("",{bg:C.navy}),td("TOTAL UNITS",{bg:C.navy,fg:C.white,bold:true,align:"right"}),td("",{bg:C.navy}),td(lines.reduce((s,l)=>s+l.qty,0),{bg:C.navy,fg:C.white,bold:true,align:"center",sz:11})),
          tr(td("",{colspan:4})),
          tr(td("PoE Note",{fg:C.sub,bold:true,sz:9}),td(`802.3af ≤15.4W/port · 802.3at ≤30W/port · Project total: ${totalPoe} W`,{fg:C.sub,sz:9,colspan:3})),
          tr(td("",{colspan:4})),
          tr(td("Legend",{fg:C.sub,bold:true,sz:9}),td("Category color key",{fg:C.sub,bold:true,sz:9,colspan:3})),
          ...([
            {cat:"Camera",col:C.navy,lbl:"Navy — on-prem camera"},
            {cat:"Recorder",col:C.green,lbl:"Green — FortiRecorder NVR"},
            {cat:"License",col:C.red,lbl:"Red — cloud license"},
            {cat:"Accessory",col:C.orange,lbl:"Orange — mount / accessory"},
          ].map(({cat,col,lbl})=>tr(td(cat,{bg:col,fg:C.white,bold:true,align:"center",sz:9}),td(lbl,{fg:col,sz:9,colspan:3})))),
        ];
        const sheet1=`<table>${s1rows.join("")}</table>`;

        // ══ Sheet 2 — Camera Detail ════════════════════════════════════════
        const s2rows=[
          tr(td("FortiCamera Planner — Camera Placement Detail",{bg:C.navy,fg:C.white,bold:true,align:"center",sz:12,colspan:7})),
          tr(...["Label","Model","Camera Name","Building","Floor","Zone / Location","Rotation"].map(h=>td(h,{bg:C.navy,fg:C.white,bold:true,align:"center"}))),
          ...allCams.map((c,i)=>{
            const d=CAMERA_DB.find(x=>x.model===c.model);
            const bg=i%2===0?C.white:C.off;
            const tc=d?.cloudOnly?C.red:C.navy;
            return tr(
              td(c.label,{bg,fg:tc,bold:true}),
              td(c.model,{bg,fg:tc,bold:true}),
              td(d?d.name:c.model,{bg}),
              td(c.bName,{bg}),
              td(c.fName,{bg}),
              td(c.location||"—",{bg,fg:C.sub}),
              td(c.rotation+"°",{bg,fg:C.sub,align:"center"}),
            );
          }),
          tr(td("",{colspan:7})),
          tr(td("Cloud-only SKUs shown in red  ·  On-prem SKUs shown in navy",{fg:C.sub,sz:9,colspan:7})),
        ];
        const sheet2=`<table>${s2rows.join("")}</table>`;

        // ── Multi-sheet HTML workbook ─────────────────────────────────────
        const html=`<html xmlns:o="urn:schemas-microsoft-com:office:office"
          xmlns:x="urn:schemas-microsoft-com:office:excel"
          xmlns="http://www.w3.org/TR/REC-html40">
<head><meta charset="UTF-8">
<!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets>
<x:ExcelWorksheet><x:Name>BOM Summary</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet>
<x:ExcelWorksheet><x:Name>Camera Detail</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet>
</x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->
</head><body>
<div id="BOM_Summary">${sheet1}</div>
<div id="Camera_Detail" style="page-break-before:always">${sheet2}</div>
</body></html>`;

        const blob=new Blob([html],{type:"application/vnd.ms-excel;charset=UTF-8"});
        const a=document.createElement("a");
        a.href=URL.createObjectURL(blob);
        a.download="BOM_"+project.name.replace(/\s+/g,"_")+".xls";
        a.click();
      }}>📊 Export BOM (.xls)</button>
      <button style={{...S.btn("success"),width:"100%",padding:"8px",fontSize:12,marginTop:4}} onClick={exportPDF}>🖨 Export PDF (all floors + BOM)</button>
    </div>
  </div>
</div>}

{/* ════ COMPARISON TAB ════════════════════════════════════════════════════ */}
{tab==="comparison"&&(()=>{
  const COMP_DB=[
    // ── AXIS ──────────────────────────────────────────────────────────────
    {vendor:"Axis",  model:"P3265-V",     form:"Indoor Dome",          res:"2MP",   fov:100, ir:0,  poe:"af",  ai:true,  cloud:false, desc:"2MP indoor dome, deep learning analytics (ACAP), varifocal 3.4–8.9mm, IP52/IK10",
     fortinet:"FCM-CD51-C", fortiDesc:"Cloud-managed dome, 5MP, 103° FOV, IR 20m — higher resolution + built-in cloud mgmt vs Axis VMS dependency"},
    {vendor:"Axis",  model:"P3265-LV",    form:"Indoor/Outdoor Dome",  res:"2MP",   fov:100, ir:40, poe:"af",  ai:true,  cloud:false, desc:"2MP dome with IR 40m, deep learning, varifocal, IP66/IK10",
     fortinet:"FCM-FD55-CA", fortiDesc:"5MP AI dome, 105° FOV, IR 50m — higher resolution, longer IR, integrated AI analytics, cloud-ready"},
    {vendor:"Axis",  model:"P3267-LVE",   form:"Outdoor Dome",         res:"5MP",   fov:104, ir:40, poe:"af",  ai:true,  cloud:false, desc:"5MP outdoor dome, varifocal, IR 40m, OptimizedIR, deep learning",
     fortinet:"FCM-FD55-CA", fortiDesc:"5MP AI dome, IR 50m, 105° FOV — matched resolution with longer IR range and cloud analytics option"},
    {vendor:"Axis",  model:"P3268-LVE",   form:"Outdoor Dome",         res:"8MP",   fov:100, ir:40, poe:"at",  ai:true,  cloud:false, desc:"8MP 4K dome, varifocal, IR 40m, deep learning analytics",
     fortinet:"FCM-FB85-CA", fortiDesc:"8MP AI bullet, IR 50m — matched resolution, superior IR range, built-in AI + FortiCamera cloud option"},
    {vendor:"Axis",  model:"M3106-LVE",   form:"Mini Dome",            res:"4MP",   fov:103, ir:15, poe:"af",  ai:false, cloud:false, desc:"4MP mini dome, fixed lens, IR 15m, IP66/IK10, budget tier",
     fortinet:"FCM-CD51-C", fortiDesc:"5MP cloud dome — higher resolution, 20m IR, full cloud platform vs standalone NVR"},
    {vendor:"Axis",  model:"M3116-LVE",   form:"Mini Dome",            res:"4MP",   fov:130, ir:20, poe:"af",  ai:false, cloud:false, desc:"4MP mini dome, wide 130° FOV, IR 20m, IP66/IK10",
     fortinet:"FCM-MC51-C", fortiDesc:"5MP mini-cube, 103° FOV, IR 8m — higher MP, cloud-managed, adds FortiCamera Cloud analytics"},
    {vendor:"Axis",  model:"Q3538-LVE",   form:"Outdoor Dome",         res:"8MP",   fov:103, ir:40, poe:"at",  ai:true,  cloud:false, desc:"8MP 4K outdoor dome, varifocal, IR 40m, deep learning, IP66/IK10",
     fortinet:"FCM-FB85-CA", fortiDesc:"8MP AI bullet, IR 50m — matched resolution, superior IR, FortiCamera Cloud option for cloud-managed analytics"},
    {vendor:"Axis",  model:"M4206-V",     form:"Multi-sensor",         res:"4×2MP", fov:360, ir:0,  poe:"at",  ai:false, cloud:false, desc:"4-sensor 360° multi-sensor, 8MP total, no IR, indoor/outdoor",
     fortinet:"FCM-FE120B-CA", fortiDesc:"12MP AI fisheye, 360° FOV, IR 20m — single unit equivalent, adds AI analytics + IR night vision"},
    {vendor:"Axis",  model:"Q6125-LE",    form:"PTZ Outdoor",          res:"2MP",   fov:64,  ir:200,poe:"at",  ai:false, cloud:false, desc:"PTZ outdoor, 1080p, 32× optical zoom, IR 200m, IP66",
     fortinet:"FCM-FB85-CA", fortiDesc:"Fixed AI bullet — no PTZ equivalent in FortiCamera line yet; FB85-CA covers most analytics use cases without PTZ"},

    // ── VERKADA ───────────────────────────────────────────────────────────
    {vendor:"Verkada",model:"CD22",       form:"Indoor Dome",          res:"3MP",   fov:100, ir:10, poe:"af",  ai:true,  cloud:true,  desc:"3MP indoor dome, cloud-managed, person/vehicle detection, 30-day cloud storage included",
     fortinet:"FCM-CD51-C", fortiDesc:"5MP cloud dome — higher resolution, longer IR 20m, FortiCamera Cloud platform with FortiGate integration"},
    {vendor:"Verkada",model:"CD22-E",     form:"Outdoor Dome",         res:"3MP",   fov:100, ir:20, poe:"af",  ai:true,  cloud:true,  desc:"3MP outdoor dome, cloud-managed, IP66, person/vehicle AI, 30-day storage",
     fortinet:"FCM-CD51-C", fortiDesc:"5MP cloud dome — higher resolution, same IR range, Fortinet ecosystem integration (FortiGate/FortiNAC)"},
    {vendor:"Verkada",model:"CD62",       form:"Indoor Dome",          res:"4K",    fov:116, ir:30, poe:"af",  ai:true,  cloud:true,  desc:"4K indoor dome, cloud-managed, 90-day storage, people analytics, license plate recognition",
     fortinet:"FCM-FD55-CA", fortiDesc:"5MP AI dome — comparable analytics, no mandatory cloud subscription, integrates with on-prem FortiRecorder or hybrid"},
    {vendor:"Verkada",model:"CD62-E",     form:"Outdoor Dome",         res:"4K",    fov:116, ir:30, poe:"af",  ai:true,  cloud:true,  desc:"4K outdoor dome, IP66, cloud-managed, 90-day storage, AI analytics",
     fortinet:"FCM-FD55-CA", fortiDesc:"5MP AI dome — no per-camera cloud subscription lock-in, hybrid or on-prem options, FortiSIEM integration"},
    {vendor:"Verkada",model:"CD63-E",     form:"Outdoor Dome",         res:"4K",    fov:116, ir:30, poe:"af",  ai:true,  cloud:true,  desc:"4K outdoor dome, latest gen, cloud-managed, 365-day storage option, advanced AI",
     fortinet:"FCM-FD55-CA", fortiDesc:"5MP AI dome — Fortinet offers flexible licensing (perpetual + cloud) vs Verkada subscription-only model"},
    {vendor:"Verkada",model:"CB62-E",     form:"Outdoor Bullet",       res:"4K",    fov:90,  ir:50, poe:"af",  ai:true,  cloud:true,  desc:"4K outdoor bullet, cloud-managed, long-range IR, person/vehicle AI",
     fortinet:"FCM-FB85-CA", fortiDesc:"8MP AI bullet — higher resolution, matched IR range, flexible cloud/on-prem/hybrid deployment"},
    {vendor:"Verkada",model:"CF81-E",     form:"Outdoor Fisheye",      res:"12MP",  fov:360, ir:0,  poe:"at",  ai:true,  cloud:true,  desc:"12MP outdoor fisheye, 360° view, cloud-managed, AI crowd analytics, no IR",
     fortinet:"FCM-FE120B-CA", fortiDesc:"12MP AI fisheye, IR 20m — matched resolution + adds IR night vision, same 360° coverage without cloud-only lock-in"},
    {vendor:"Verkada",model:"CM61",       form:"Mini Dome",            res:"4K",    fov:103, ir:15, poe:"af",  ai:true,  cloud:true,  desc:"4K mini dome, cloud-managed, discreet ceiling mount, AI analytics",
     fortinet:"FCM-MC51-C", fortiDesc:"5MP mini-cube, 103° FOV, IR 8m — competitive resolution, same FOV, lower TCO without mandatory cloud subscription"},
    {vendor:"Verkada",model:"CP52-E",     form:"PTZ",                  res:"5MP",   fov:65,  ir:0,  poe:"at",  ai:true,  cloud:true,  desc:"5MP PTZ, cloud-managed, 5× optical zoom, AI object tracking",
     fortinet:"FCM-FB85-CA", fortiDesc:"Fixed AI bullet — no PTZ in FortiCamera range; FB85-CA offers 84° FOV with AI as closest alternative"},

    // ── MERAKI ────────────────────────────────────────────────────────────
    {vendor:"Meraki", model:"MV2",        form:"Indoor Mini",          res:"2MP",   fov:134, ir:8,  poe:"af",  ai:true,  cloud:true,  desc:"1080p indoor mini, cloud-managed, Wi-Fi, person detection, 30-day cloud storage",
     fortinet:"FCM-MC51-C", fortiDesc:"5MP mini-cube, 103° FOV, IR 8m — higher resolution, wired PoE reliability, lower cloud licensing cost"},
    {vendor:"Meraki", model:"MV12W",      form:"Indoor Dome",          res:"2MP",   fov:132, ir:15, poe:"af",  ai:true,  cloud:true,  desc:"1080p indoor dome, cloud-managed, Wi-Fi, heatmaps, historical person tracking",
     fortinet:"FCM-MC51-C", fortiDesc:"5MP mini-cube — higher resolution, FortiCamera Cloud includes motion analytics, no per-camera Meraki licensing"},
    {vendor:"Meraki", model:"MV22X",      form:"Indoor/Outdoor Dome",  res:"4MP",   fov:115, ir:20, poe:"af",  ai:true,  cloud:true,  desc:"4MP dome, varifocal, cloud-managed, 512GB onboard, person/vehicle detection",
     fortinet:"FCM-CD55-C", fortiDesc:"5MP cloud dome, varifocal, IR 20m — higher resolution, same IR range, FortiGate integration, no Cisco licensing overhead"},
    {vendor:"Meraki", model:"MV72X",      form:"Outdoor Dome",         res:"4MP",   fov:115, ir:20, poe:"af",  ai:true,  cloud:true,  desc:"4MP outdoor dome, IP67/IK10, varifocal, cloud-managed, 512GB onboard",
     fortinet:"FCM-FD55-CA", fortiDesc:"5MP AI dome, IR 50m — higher resolution, significantly longer IR range, integrated AI analytics"},
    {vendor:"Meraki", model:"MV32",       form:"Fisheye",              res:"4MP",   fov:180, ir:0,  poe:"af",  ai:true,  cloud:true,  desc:"4MP fisheye 180°, cloud-managed, ceiling mount, no IR, person tracking",
     fortinet:"FCM-FE120B-CA", fortiDesc:"12MP AI fisheye, full 360°, IR 20m — 3× higher resolution, adds IR, full 360° vs 180°"},
    {vendor:"Meraki", model:"MV52",       form:"Long-range Bullet",    res:"4K",    fov:37,  ir:50, poe:"at",  ai:true,  cloud:true,  desc:"4K outdoor bullet, cloud-managed, long-range varifocal 12–37°, IR 50m, 1TB onboard",
     fortinet:"FCM-FB85-CA", fortiDesc:"8MP AI bullet, IR 50m — comparable specs, no Meraki licensing cost, FortiCamera Cloud optional"},

    // ── AVIGILON (Motorola Solutions) ─────────────────────────────────────
    {vendor:"Avigilon",model:"H6SL Dome 2MP",  form:"Indoor/Outdoor Dome",  res:"2MP",   fov:101, ir:30, poe:"af",  ai:true,  cloud:false, desc:"2MP varifocal dome, Alta/Unity platform, IP52 indoor/IP66 outdoor, IR 30m, Avigilon AI analytics",
     fortinet:"FCM-CD51-C", fortiDesc:"5MP cloud dome, IR 20m — higher resolution, FortiCamera Cloud platform, no Motorola VMS license required"},
    {vendor:"Avigilon",model:"H6SL Dome 5MP",  form:"Indoor/Outdoor Dome",  res:"5MP",   fov:101, ir:40, poe:"af",  ai:true,  cloud:false, desc:"5MP varifocal dome, Alta/Unity, IP52/IP66, IR 40m (tele), self-learning appearance search",
     fortinet:"FCM-FD55-CA", fortiDesc:"5MP AI dome, IR 50m — matched resolution, longer IR, Fortinet ecosystem integration vs proprietary ACC/Ava VMS"},
    {vendor:"Avigilon",model:"H6SL Bullet",    form:"Outdoor Bullet",       res:"2MP",   fov:101, ir:50, poe:"af",  ai:true,  cloud:false, desc:"2MP varifocal bullet, IP66/IP67, IR 50m (tele), IEEE 802.3af, -40°C operating range",
     fortinet:"FCM-FB85-CA", fortiDesc:"8MP AI bullet, IR 50m — 4× higher resolution, same IR range, FortiCamera Cloud optional, FortiGate integration"},
    {vendor:"Avigilon",model:"H5A Fisheye 8MP", form:"Fisheye",             res:"8MP",   fov:360, ir:20, poe:"af",  ai:true,  cloud:false, desc:"8MP 360° fisheye, IR 20m variant, IEEE 802.3af, indoor/outdoor, appearance search",
     fortinet:"FCM-FE120B-CA", fortiDesc:"12MP AI fisheye, IR 20m — 50% higher resolution, same IR, built-in AI + no per-camera Avigilon Cloud license"},
    {vendor:"Avigilon",model:"H5A Fisheye 12MP",form:"Fisheye",             res:"12MP",  fov:360, ir:0,  poe:"af",  ai:true,  cloud:false, desc:"12MP 360° fisheye, no IR, IEEE 802.3af, appearance search, indoor/outdoor surface mount",
     fortinet:"FCM-FE120B-CA", fortiDesc:"12MP AI fisheye, adds IR 20m night vision — matched resolution, more complete feature set at lower platform cost"},
    {vendor:"Avigilon",model:"Ava Dome 5MP",   form:"Outdoor Dome",         res:"5MP",   fov:105, ir:30, poe:"af",  ai:true,  cloud:false, desc:"5MP Ava dome, AI video + audio analytics (4 built-in mics), IP66/IK10, varifocal, cloud-capable",
     fortinet:"FCM-FD55-CA", fortiDesc:"5MP AI dome, IR 50m — matched resolution, longer IR range, flexible cloud/on-prem deployment without Avigilon Cloud subscription"},
    {vendor:"Avigilon",model:"H6A PTZ 2MP",    form:"PTZ",                  res:"2MP",   fov:53,  ir:0,  poe:"at",  ai:true,  cloud:false, desc:"2MP PTZ, 30× optical zoom, 360° pan/95° tilt, PoE+, auto-tracking, outdoor IP66/IK10",
     fortinet:"FCM-FB85-CA", fortiDesc:"Fixed 8MP AI bullet — no PTZ in FortiCamera range; FB85-CA covers wide-area analytics without PTZ complexity"},

    // ── UBIQUITI (UniFi Protect) ───────────────────────────────────────────
    {vendor:"Ubiquiti", model:"G5 Turret Ultra",form:"Indoor/Outdoor Dome", res:"4MP",   fov:102, ir:30, poe:"af",  ai:true,  cloud:false, desc:"4MP 2K dome, 102° FOV, IR 30m, IP66, tamper-resistant, AI person/vehicle detection, UniFi Protect",
     fortinet:"FCM-CD51-C", fortiDesc:"5MP cloud dome, IR 20m — higher resolution, enterprise cloud platform vs prosumer UniFi Protect ecosystem"},
    {vendor:"Ubiquiti", model:"G5 Pro",         form:"Outdoor Dome",        res:"8MP",   fov:110, ir:25, poe:"at",  ai:true,  cloud:false, desc:"8MP 4K dome, 3× optical zoom, IR 25m, IP65, PoE+, AI detection, UniFi Protect cloud option",
     fortinet:"FCM-FB85-CA", fortiDesc:"8MP AI bullet, IR 50m — matched resolution, longer IR range, enterprise-grade FortiCamera Cloud vs prosumer Ubiquiti stack"},
    {vendor:"Ubiquiti", model:"G5 Bullet",      form:"Outdoor Bullet",      res:"4MP",   fov:84,  ir:9,  poe:"af",  ai:true,  cloud:false, desc:"4MP bullet, 84° FOV, IR 9m, IP55, 3-axis adjustable, AI detection, UniFi Protect",
     fortinet:"FCM-FB85-CA", fortiDesc:"8MP AI bullet, IR 50m — 2× resolution, 5× longer IR, enterprise platform vs consumer-grade IP55 rating"},
    {vendor:"Ubiquiti", model:"G5 Dome Ultra",  form:"Indoor Dome",         res:"4MP",   fov:102, ir:20, poe:"af",  ai:true,  cloud:false, desc:"4MP indoor dome, IR 20m, IK06, AI detection, ceiling mount, flush-mount option, UniFi Protect",
     fortinet:"FCM-CD51-C", fortiDesc:"5MP cloud dome, IR 20m — higher resolution, same IR range, IK10 vs IK06 impact rating, enterprise management platform"},
    {vendor:"Ubiquiti", model:"G5 Dome",        form:"Indoor Dome",         res:"4MP",   fov:102, ir:9,  poe:"af",  ai:true,  cloud:false, desc:"4MP ceiling dome, IR 9m, 2-way audio, IPX4, AI detection, compact form factor, UniFi Protect",
     fortinet:"FCM-MC51-C", fortiDesc:"5MP mini-cube, 103° FOV, IR 8m — higher resolution, same form factor class, enterprise-grade IP67 vs IPX4 splash-only"},
    {vendor:"Ubiquiti", model:"G5 Flex",        form:"Indoor Mini",         res:"4MP",   fov:102, ir:6,  poe:"af",  ai:true,  cloud:false, desc:"4MP compact cam, 102° FOV, IR 6m, IPX4, flexible mounting, AI detection, budget UniFi tier",
     fortinet:"FCM-MC51-C", fortiDesc:"5MP mini-cube, 103° FOV, IR 8m — higher resolution, longer IR, true IP67 rating vs IPX4, enterprise cloud platform"},
    {vendor:"Ubiquiti", model:"G5 PTZ",         form:"PTZ",                 res:"4MP",   fov:100, ir:20, poe:"at",  ai:true,  cloud:false, desc:"4MP PTZ, 2× optical zoom, LED spotlight for color night vision, IP66, auto person tracking, UniFi Protect",
     fortinet:"FCM-FB85-CA", fortiDesc:"Fixed 8MP AI bullet — no PTZ in FortiCamera range; FB85-CA delivers 2× resolution with wide-area AI analytics"},
  ];

  const vendors=["Axis","Verkada","Meraki","Avigilon","Ubiquiti"];
  const vColors={Axis:"#003366",Verkada:"#006EFF",Meraki:"#67B346",Avigilon:"#CC0000",Ubiquiti:"#0069FF"};
  const vBg={Axis:"#E8EFF8",Verkada:"#E6F0FF",Meraki:"#EDF7E6",Avigilon:"#FDEAEA",Ubiquiti:"#E6F2FF"};
  const forms=[...new Set(COMP_DB.map(c=>c.form.split(" ").pop()))].sort();
  const filtered=COMP_DB.filter(c=>{
    if(cmpVendor!=="All"&&c.vendor!==cmpVendor)return false;
    if(cmpForm!=="All"&&!c.form.includes(cmpForm))return false;
    if(cmpSearch){
      const q=cmpSearch.toLowerCase();
      return c.model.toLowerCase().includes(q)||c.vendor.toLowerCase().includes(q)||
             c.form.toLowerCase().includes(q)||c.res.toLowerCase().includes(q)||
             c.fortinet.toLowerCase().includes(q)||c.desc.toLowerCase().includes(q);
    }
    return true;
  });

  return<div style={{flex:1,overflow:"auto",padding:12,background:DM.bg}}>
    <div style={{...S.panR,marginBottom:12}}>
      <div style={{fontSize:14,fontWeight:800,color:FT.navy,marginBottom:4}}>🔄 Competitive Camera Comparison</div>
      <div style={{fontSize:11,color:DM.textSub}}>Find the closest Fortinet FortiCamera equivalent for Axis, Verkada, and Meraki competitor cameras.</div>
    </div>

    {/* Search + filters */}
    <div style={{display:"flex",gap:8,marginBottom:12,flexWrap:"wrap",alignItems:"center"}}>
      <div style={{position:"relative",flex:1,minWidth:180}}>
        <span style={{position:"absolute",left:8,top:"50%",transform:"translateY(-50%)",fontSize:14,pointerEvents:"none"}}>🔍</span>
        <input
          value={cmpSearch} onChange={e=>setCmpSearch(e.target.value)}
          placeholder="Search by model, resolution, form factor…"
          style={{...S.inp,paddingLeft:28,width:"100%",fontSize:11}}
        />
        {cmpSearch&&<button onClick={()=>setCmpSearch("")}
          style={{position:"absolute",right:6,top:"50%",transform:"translateY(-50%)",border:"none",background:"none",cursor:"pointer",fontSize:13,color:DM.muted}}>✕</button>}
      </div>
      {/* Vendor filter */}
      <div style={{display:"flex",gap:4,flexShrink:0}}>
        {["All",...vendors].map(v=>(
          <button key={v} onClick={()=>setCmpVendor(v)}
            style={{padding:"4px 10px",borderRadius:4,border:"1px solid "+(cmpVendor===v?(vColors[v]||FT.navy):DM.border),
              background:cmpVendor===v?(vBg[v]||"#E8EFF8"):"transparent",
              color:cmpVendor===v?(vColors[v]||FT.navy):DM.textSub,
              cursor:"pointer",fontSize:11,fontWeight:cmpVendor===v?700:400}}>
            {v==="All"?"All Vendors":v}
          </button>
        ))}
      </div>
      {/* Form factor filter */}
      <select value={cmpForm} onChange={e=>setCmpForm(e.target.value)} style={{...S.sel,fontSize:11,flexShrink:0}}>
        <option value="All">All Types</option>
        {forms.map(f=><option key={f} value={f}>{f}</option>)}
      </select>
    </div>

    {/* Result count */}
    <div style={{fontSize:10,color:DM.muted,marginBottom:8}}>
      Showing {filtered.length} of {COMP_DB.length} cameras
    </div>

    {/* Table */}
    <div style={{overflowX:"auto"}}>
      <table style={{width:"100%",borderCollapse:"collapse",fontSize:11}}>
        <thead>
          <tr style={{background:FT.navy,color:FT.white}}>
            {["Vendor","Competitor Model","Type","Res","FOV","IR","PoE","AI","Fortinet Equivalent","Why Fortinet"].map(h=>(
              <th key={h} style={{padding:"7px 8px",textAlign:"left",fontWeight:700,fontSize:10,whiteSpace:"nowrap"}}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filtered.map((c,i)=>{
            const ft=CAMERA_DB.find(x=>x.model===c.fortinet);
            return<tr key={c.vendor+c.model} style={{borderBottom:"1px solid "+DM.border,background:i%2===0?DM.surface:DM.bg}}>
              {/* Vendor */}
              <td style={{padding:"6px 8px",whiteSpace:"nowrap"}}>
                <span style={{background:vBg[c.vendor],color:vColors[c.vendor],padding:"2px 7px",borderRadius:3,fontWeight:700,fontSize:10}}>{c.vendor}</span>
              </td>
              {/* Model */}
              <td style={{padding:"6px 8px",whiteSpace:"nowrap"}}>
                <div style={{fontWeight:700,color:DM.text,fontSize:11}}>{c.model}</div>
                <div style={{fontSize:9,color:DM.muted,marginTop:1,maxWidth:160}}>{c.desc}</div>
              </td>
              {/* Type */}
              <td style={{padding:"6px 8px",color:DM.textSub,fontSize:10,whiteSpace:"nowrap"}}>{c.form}</td>
              {/* Resolution */}
              <td style={{padding:"6px 8px",fontWeight:600,color:DM.text,whiteSpace:"nowrap"}}>{c.res}</td>
              {/* FOV */}
              <td style={{padding:"6px 8px",color:DM.textSub,whiteSpace:"nowrap"}}>{c.fov}°</td>
              {/* IR */}
              <td style={{padding:"6px 8px",whiteSpace:"nowrap"}}>
                {c.ir>0?<span style={{color:FT.green,fontWeight:600}}>{c.ir}m</span>:<span style={{color:DM.muted}}>—</span>}
              </td>
              {/* PoE */}
              <td style={{padding:"6px 8px",whiteSpace:"nowrap"}}>
                <span style={{...S.bdg(c.poe==="at"?FT.orange:FT.grayDark),fontSize:8}}>802.3{c.poe}</span>
              </td>
              {/* AI */}
              <td style={{padding:"6px 8px",textAlign:"center"}}>
                {c.ai?<span style={{color:FT.green,fontSize:13}}>✓</span>:<span style={{color:DM.muted,fontSize:11}}>—</span>}
              </td>
              {/* Fortinet Equivalent */}
              <td style={{padding:"6px 8px",whiteSpace:"nowrap"}}>
                <div style={{fontWeight:700,color:ft?.cloudOnly?FT.red:FT.navy,fontSize:11}}>{c.fortinet}</div>
                {ft&&<div style={{fontSize:9,color:DM.muted,marginTop:1}}>{ft.resolution} · {ft.fov}° · IR {ft.irRange}m</div>}
              </td>
              {/* Why Fortinet */}
              <td style={{padding:"6px 8px",fontSize:10,color:DM.textSub,minWidth:200,maxWidth:280}}>
                <span style={{color:FT.green,fontWeight:700,marginRight:4}}>▶</span>{c.fortiDesc}
              </td>
            </tr>;
          })}
        </tbody>
      </table>
    </div>

    {filtered.length===0&&(
      <div style={{textAlign:"center",padding:"40px 20px",color:DM.muted,fontSize:12}}>
        No cameras match your filter. Try adjusting the vendor or search term.
      </div>
    )}

    {/* Legend */}
    <div style={{...S.pan,marginTop:12}}>
      <div style={S.st}>Legend</div>
      <div style={{display:"flex",gap:16,flexWrap:"wrap",fontSize:10,color:DM.textSub}}>
        <span><span style={{color:FT.red,fontWeight:700}}>Red model name</span> = FortiCamera Cloud (cloud-managed)</span>
        <span><span style={{color:FT.navy,fontWeight:700}}>Navy model name</span> = FortiCamera (recorder/on-prem)</span>
        <span><span style={{color:FT.green,fontWeight:700}}>✓</span> AI = on-camera deep learning analytics</span>
        <span><span style={{...S.bdg(FT.orange),fontSize:8}}>802.3at</span> = PoE+ (up to 30W)</span>
        <span><span style={{...S.bdg(FT.grayDark),fontSize:8}}>802.3af</span> = PoE std (up to 15.4W)</span>
      </div>
    </div>
  </div>;
})()}

{tab==="info"&&<div style={{flex:1,overflow:"auto",padding:16,maxWidth:800,margin:"0 auto",width:"100%"}}>

  {/* Header */}
  <div style={{marginBottom:20}}>
    <div style={{fontSize:16,fontWeight:800,color:DM.text,marginBottom:4}}>ℹ FortiCamera Planner — Feature Reference</div>
    <div style={{fontSize:12,color:DM.muted}}>Quick guide to tools, handles, and how coverage quality is calculated.</div>
  </div>

  {/* Range Handle section */}
  <div style={{...S.pan,marginBottom:12}}>
    <div style={S.st}>◇ Draggable Range Handle</div>
    <div style={{fontSize:12,color:DM.textSub,lineHeight:1.6,marginBottom:10}}>
      When a directional camera is selected on the floor plan, a <strong style={{color:DM.text}}>◇ diamond handle</strong> appears at the tip of the FOV cone.
      Drag it along the camera's aim direction to set the effective IR coverage distance.
      The cone color updates live based on coverage quality relative to the camera's rated IR spec.
    </div>
    <ol style={{paddingLeft:18,fontSize:12,color:DM.textSub,lineHeight:1.8}}>
      <li><strong style={{color:DM.text}}>Set floor scale first</strong> — click the ruler, mark two points, enter the real-world distance. Without a scale the distance label shows "drag to set range."</li>
      <li><strong style={{color:DM.text}}>Select a camera</strong> — click any camera on the canvas.</li>
      <li><strong style={{color:DM.text}}>Drag the ◇ handle</strong> — only forward/backward motion along the aim line adjusts the range; sideways drag has no effect.</li>
      <li><strong style={{color:DM.text}}>Read the label</strong> — a bubble shows distance in ft / m and the quality rating.</li>
      <li><strong style={{color:DM.text}}>Use the sidebar slider</strong> — the camera panel also has a Range slider and a ↺ reset button to restore the camera's default IR spec.</li>
    </ol>
  </div>

  {/* Quality thresholds table */}
  <div style={{...S.pan,marginBottom:12}}>
    <div style={S.st}>Coverage Quality Thresholds</div>
    <div style={{fontSize:11,color:DM.muted,marginBottom:8}}>Thresholds are ratios of the current range to the camera's rated IR spec — they apply equally regardless of unit system.</div>
    <table style={{width:"100%",borderCollapse:"collapse",fontSize:11}}>
      <thead>
        <tr style={{background:FT.navy}}>
          {["Quality","Cone Color","Threshold (% of IR max)","Use Case"].map(h=><th key={h} style={{color:"#fff",padding:"7px 10px",textAlign:"left",fontWeight:600,letterSpacing:"0.04em"}}>{h}</th>)}
        </tr>
      </thead>
      <tbody>
        {[
          {q:"● Excellent",c:FT.green, hex:"#00A651",range:"≤ 45%",use:"Entrances, license plates, face ID"},
          {q:"● Fair",     c:"#C8A800",hex:"#E6C700",range:"46 – 70%",use:"General area coverage, motion detection"},
          {q:"● Poor",     c:FT.orange,hex:"#F47920",range:"71 – 90%",use:"Silhouette only — overlap recommended"},
          {q:"● Unusable", c:FT.red,   hex:"#DA291C",range:"> 90%",use:"Night coverage unreliable — re-design"},
        ].map((r,i)=><tr key={i} style={{borderBottom:`1px solid ${DM.border}`,background:i%2===0?DM.bg:DM.surface}}>
          <td style={{padding:"8px 10px",fontWeight:700,color:r.c}}>{r.q}</td>
          <td style={{padding:"8px 10px"}}>
            <span style={{display:"inline-block",width:12,height:12,borderRadius:3,background:r.hex,verticalAlign:"middle",marginRight:5}}></span>
            <span style={{fontFamily:"monospace",fontSize:10,color:DM.textSub}}>{r.hex}</span>
          </td>
          <td style={{padding:"8px 10px",fontFamily:"monospace",fontSize:11,color:DM.text}}>{r.range}</td>
          <td style={{padding:"8px 10px",color:DM.textSub}}>{r.use}</td>
        </tr>)}
      </tbody>
    </table>
  </div>

  {/* Per-model breakpoints */}
  <div style={{...S.pan,marginBottom:12}}>
    <div style={S.st}>Range Breakpoints by FortiCamera Model</div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))",gap:10,marginTop:4}}>
      {[
        {model:"FCM-MC51-C",    ir:8,  zones:[3.6,5.6,7.2]},
        {model:"FCM-CD51-C",    ir:20, zones:[9,14,18]},
        {model:"FCM-FD50/FD51", ir:30, zones:[13.5,21,27]},
        {model:"FCM-FD55-CA / FB85-CA", ir:50, zones:[22.5,35,45]},
      ].map(({model,ir,zones})=>(
        <div key={model} style={{background:DM.bg,border:`1px solid ${DM.border}`,borderRadius:8,padding:"10px 12px"}}>
          <div style={{fontSize:10,fontWeight:700,color:DM.muted,letterSpacing:"0.04em",marginBottom:2}}>{model}</div>
          <div style={{fontSize:13,fontWeight:800,fontFamily:"monospace",color:DM.text,marginBottom:6}}>{ir} m / {Math.round(ir*3.281)} ft IR</div>
          {[
            {label:"● Excellent",c:FT.green, val:`≤ ${zones[0]} m`},
            {label:"● Fair",     c:"#C8A800",val:`${zones[0]}–${zones[1]} m`},
            {label:"● Poor",     c:FT.orange,val:`${zones[1]}–${zones[2]} m`},
            {label:"● Unusable", c:FT.red,   val:`> ${zones[2]} m`},
          ].map(z=>(
            <div key={z.label} style={{display:"flex",justifyContent:"space-between",fontSize:10,marginBottom:2}}>
              <span style={{color:z.c,fontWeight:600}}>{z.label}</span>
              <span style={{fontFamily:"monospace",color:DM.text}}>{z.val}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  </div>

  {/* Tips */}
  <div style={{...S.pan,marginBottom:12}}>
    <div style={S.st}>Quick Tips</div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:8,marginTop:4}}>
      {[
        {t:"Stay in the green",d:"Keep identification-critical zones (entrances, cashiers, exits) at Excellent range — ≤ 45% of IR spec."},
        {t:"Fair for wide areas",d:"General aisles and lobbies are fine in Fair range — reliable detection, sufficient for incident review."},
        {t:"Overlap in poor zones",d:"If a zone falls orange, add a second camera or choose a model with a higher IR rating."},
        {t:"Red = re-design",d:"Red means nighttime coverage is unreliable at that distance. Shorten range or upgrade the camera."},
        {t:"Custom vs. default",d:'The sidebar shows “(custom)” when the default range is overridden. Reset any time with the ↺ button.'},
        {t:"Adding competitors",d:'Add entries to the COMP_DB array in App.tsx — one object per model following the existing template.'},
      ].map(({t,d})=>(
        <div key={t} style={{background:DM.bg,border:`1px solid ${DM.border}`,borderRadius:8,padding:"10px 12px",fontSize:12}}>
          <div style={{fontWeight:700,color:DM.text,marginBottom:3}}>{t}</div>
          <div style={{color:DM.textSub,lineHeight:1.5}}>{d}</div>
        </div>
      ))}
    </div>
  </div>

</div>}

        </div>
      </div>
    </div>
  );
}
