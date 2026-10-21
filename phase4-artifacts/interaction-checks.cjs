const fs=require('fs'),path=require('path'),assert=require('node:assert/strict');
const {root,THREE,createLoader}=require('./load-module.cjs');
const inner=path.resolve(root,'../portfolio-inner-site');
const {JSDOM}=require(path.join(inner,'node_modules/.pnpm/jsdom@16.7.0/node_modules/jsdom'));
const dom=new JSDOM('<div id="surface"></div><button id="other">Other UI</button><iframe id="computer-screen"></iframe><div id="root"></div>',{url:'http://localhost:8080/?dev',pretendToBeVisual:true});
Object.assign(global,{window:dom.window,document:dom.window.document});
Object.defineProperty(global,'navigator',{value:dom.window.navigator,configurable:true});
const globals={window,document,Element:window.Element,MouseEvent:window.MouseEvent,CustomEvent:window.CustomEvent};
const load=createLoader(globals);
const Hardware=load(path.join(root,'src/Application/World/Cyberpunk/HardwareState.ts')).default;
const Controller=load(path.join(root,'src/Application/World/Cyberpunk/HardwareInteraction.ts')).default;
const model=new Hardware();model.setAvailable(true);
const scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(35,1.25,0.1,100);
camera.position.set(0,0,6);camera.lookAt(0,0,0);camera.updateMatrixWorld();
const lamp=new THREE.Mesh(new THREE.BoxGeometry(1,1,1),new THREE.MeshStandardMaterial({emissive:0x003344,emissiveIntensity:0.02}));
const pc=lamp.clone();pc.material=lamp.material.clone();pc.position.x=1.5;scene.add(lamp,pc);scene.updateMatrixWorld(true);
const surface=document.getElementById('surface');surface.style.cursor='crosshair';
let rectWidth=1000;surface.getBoundingClientRect=()=>({left:0,top:0,width:rectWidth,height:800});
let active=true,reduced=false,cameraClicks=0,notifications=0;
document.addEventListener('mousedown',()=>{cameraClicks++;});
const unsubscribe=model.subscribe(()=>{notifications++;});
const oldAdd=document.addEventListener.bind(document),oldRemove=document.removeEventListener.bind(document);
const owned=[],removed=[];let recording=true;
document.addEventListener=(type,fn,options)=>{if(recording)owned.push({type,fn,capture:options===true||!!options?.capture});oldAdd(type,fn,options);};
document.removeEventListener=(type,fn,options)=>{removed.push({type,fn,capture:options===true||!!options?.capture});oldRemove(type,fn,options);};
const controller=new Controller({scene,surface,camera:()=>camera,active:()=>active,reducedMotion:()=>reduced,hardware:model,
 targets:[{id:'lamp',objects:[lamp],highlight:lamp.material},{id:'pc',objects:[pc],highlight:pc.material}]});
recording=false;
let checks=0;function check(value,label){assert.ok(value,label);checks++;}
function down(target=surface,x=500,y=400,extra={}){const e=new window.MouseEvent('mousedown',{bubbles:true,cancelable:true,clientX:x,clientY:y,button:0,...extra});target.dispatchEvent(e);return e;}
function move(x,y){surface.dispatchEvent(new window.MouseEvent('pointermove',{bubbles:true,clientX:x,clientY:y}));controller.update(40);}
function relay(key){const e=new window.CustomEvent('keydown',{bubbles:true,cancelable:true});Object.assign(e,{inComputer:true,key});document.getElementById('computer-screen').dispatchEvent(e);return e;}
move(500,400);check(surface.style.cursor==='pointer'&&lamp.material.emissiveIntensity===0.16,'real ray hover highlights');
document.getElementById('other').focus();const focused=document.activeElement;
const hit=down();check(model.getSnapshot().lampOn===false&&hit.defaultPrevented&&cameraClicks===0,'hardware click toggles and isolates legacy camera mousedown');
check(document.activeElement===focused,'hardware click never steals keyboard focus');
active=false;controller.update(40);down();check(!model.getSnapshot().lampOn&&cameraClicks===1,'freecam/monitor/loading gate leaves camera input untouched');active=true;
down(surface,500,400,{ctrlKey:true});down(surface,500,400,{button:2});check(!model.getSnapshot().lampOn,'modifier/right clicks ignored');
rectWidth=0;down();check(!model.getSnapshot().lampOn,'zero-size surface ignored');rectWidth=1000;
const blocker=new THREE.Mesh(new THREE.BoxGeometry(2,2,0.1),new THREE.MeshBasicMaterial());blocker.position.z=1;scene.add(blocker);
down();check(!model.getSnapshot().lampOn,'opaque nearer geometry blocks target');
blocker.material.transparent=true;blocker.material.opacity=0.1;blocker.material.depthWrite=false;
down();check(model.getSnapshot().lampOn,'visible target through PC glass can be clicked');
blocker.material.opacity=0;blocker.material.depthWrite=true;blocker.material.blending=THREE.NoBlending;
down();check(model.getSnapshot().lampOn,'transparent-black CSS3D cutout remains an occlusion barrier');scene.remove(blocker);
lamp.visible=false;down();check(model.getSnapshot().lampOn,'hidden target cannot be clicked');lamp.visible=true;
const pcPoint=pc.position.clone().project(camera);down(surface,(pcPoint.x+1)*500,(1-pcPoint.y)*400);
check(!model.getSnapshot().pcLedsOn,'second registered control uses correct state');
const prior=notifications;
const native=new window.KeyboardEvent('keydown',{key:'q',bubbles:true,cancelable:true});surface.dispatchEvent(native);
check(model.typingEnergy===0&&!native.defaultPrevented,'native/shortcut keys not captured');
const typing=relay('q');check(model.typingEnergy===1&&!typing.defaultPrevented&&notifications===prior,'validated relay pulse is passive and does not publish React state');
model.typingEnergy=0;relay('_AUTO_x');check(model.typingEnergy===0,'synthetic UI typing excluded');
reduced=true;relay('q');check(model.typingEnergy===0,'reduced motion disables typing pulse');reduced=false;
const beforeRelay=model.getSnapshot();const bridgeMouse=new window.CustomEvent('mousedown',{bubbles:true});Object.assign(bridgeMouse,{inComputer:true});document.getElementById('computer-screen').dispatchEvent(bridgeMouse);
check(model.getSnapshot()===beforeRelay,'iframe bridged mouse notification never toggles hardware');
move(500,400);controller.dispose();controller.dispose();
check(surface.style.cursor==='crosshair'&&lamp.material.emissiveIntensity===0.02,'cursor and hover restored');
check(owned.length===4&&owned.every(a=>removed.some(b=>a.type===b.type&&a.fn===b.fn&&a.capture===b.capture)),'all owned listeners removed with matching capture');
const afterDispose=model.getSnapshot();down();relay('q');check(model.getSnapshot()===afterDispose&&model.typingEnergy===0,'disposed controller no longer responds');
unsubscribe();

// Native React buttons provide the non-pointer alternative, using installed DOM test tools.
const React=require(require.resolve('react',{paths:[root]}));
const ReactDOM=require(require.resolve('react-dom',{paths:[root]}));
const {act}=require(require.resolve('react-dom/test-utils',{paths:[root]}));
const user=require(require.resolve('@testing-library/user-event',{paths:[inner]})).default;
const Controls=load(path.join(root,'src/Application/UI/components/HardwareControls.tsx')).default;
const container=document.getElementById('root');
(async()=>{
 act(()=>{ReactDOM.render(React.createElement(Controls,{hardware:model}),container);});
 const details=container.querySelector('details'),summary=container.querySelector('summary');
 act(()=>{user.click(summary);});check(details.open,'native summary exposes discoverable controls');
 const buttons=container.querySelectorAll('button');
 check(buttons.length===2&&buttons[0].textContent.includes('Desk lamp')&&buttons[1].textContent.includes('PC accent LEDs'),'two labelled native controls');
 summary.focus();act(()=>{user.tab();});check(document.activeElement===buttons[0],'Tab reaches lamp control');
 const lampBefore=model.getSnapshot().lampOn;
 await act(async()=>{await user.keyboard('{Enter}');});
 check(model.getSnapshot().lampOn!==lampBefore&&buttons[0].getAttribute('aria-pressed')===String(!lampBefore),'Enter operates lamp and pressed state');
 act(()=>{user.tab();});check(document.activeElement===buttons[1],'Tab reaches PC control');
 const pcBefore=model.getSnapshot().pcLedsOn;
 await act(async()=>{await user.keyboard(' ');});
 check(model.getSnapshot().pcLedsOn!==pcBefore,'Space operates PC LEDs');
 const clicks=cameraClicks;act(()=>{user.click(buttons[0]);});check(cameraClicks===clicks,'UI pointer control does not toggle camera');
 act(()=>{ReactDOM.unmountComponentAtNode(container);});check(model.listeners.size===0,'React subscription removed on unmount');
 model.dispose();const disposedState=model.getSnapshot();model.toggle('lamp');check(model.getSnapshot()===disposedState,'disposed model ignores control changes');
 // Also exercise both registered controls against the complete actual procedural room.
 const Room=createLoader()(path.join(root,'src/Application/World/Cyberpunk/CyberpunkRoom.ts')).default;
 const actualRoom=new Room(),actualScene=new THREE.Scene();actualScene.add(actualRoom);actualScene.updateMatrixWorld(true);
 const actualCamera=new THREE.PerspectiveCamera(35,1.25,10,900000);
 actualCamera.position.set(-20000,12000,20000);actualCamera.lookAt(0,-1000,0);actualCamera.updateMatrixWorld(true);
 const actualController=new Controller({scene:actualScene,surface,camera:()=>actualCamera,active:()=>true,reducedMotion:()=>false,hardware:actualRoom.hardware,targets:actualRoom.targets});
 for(const [id,name,field] of [['lamp','LampBaseControl','lampOn'],['pc','PCAccentControl','pcLedsOn']]){
  const point=actualRoom.getObjectByName(name).getWorldPosition(new THREE.Vector3()).project(actualCamera);
  const before=actualRoom.hardware.getSnapshot()[field];down(surface,(point.x+1)*500,(1-point.y)*400);
  check(actualRoom.hardware.getSnapshot()[field]!==before,'actual full-scene ray control '+id);
 }
 actualController.dispose();actualRoom.dispose();
 lamp.geometry.dispose();lamp.material.dispose();pc.material.dispose();blocker.geometry.dispose();blocker.material.dispose();
 const result={status:'PASS',checks,note:'Actual Three.js ray tests and React/jsdom/user-event keyboard simulation. Not browser pixels or physical hardware input.'};
 fs.writeFileSync(path.join(__dirname,'interaction-results.json'),JSON.stringify(result,null,2));console.log(JSON.stringify(result,null,2));dom.window.close();process.exit(0);
})().catch(error=>{console.error(error);process.exit(1);});
