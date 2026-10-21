const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..');
const ts=require(path.join(root,'node_modules/typescript'));
const THREE=require(require.resolve('three',{paths:[root]}));
const TWEEN=require(require.resolve('@tweenjs/tween.js',{paths:[root]}));
const ease=require(require.resolve('bezier-easing',{paths:[root]}));
const cache=new Map(), callbacks=new Map(), inputListeners=new Map();
const media={matches:false}; const location={search:'?dev'}; const webgl={style:{}};
const counters={monitor:0,audio:0,legacy:0,monitorDisposed:0};
const app={scene:new THREE.Scene(),sizes:{width:1440,height:1000},mouse:{x:720,y:500},time:{elapsed:0,delta:16},resources:{loaded:1,toLoad:1,on(name,fn){callbacks.set(name,fn);},off(name){callbacks.delete(name);}},renderer:{instance:{domElement:{}}}};
class App {constructor(){return app;}}
const bus={on(name,fn){callbacks.set(name,fn);return ()=>callbacks.delete(name);},dispatch(name,data){callbacks.get(name)?.(data);}};
class Controls {constructor(camera){this.object=camera;this.target=new THREE.Vector3();}update(){}dispose(){this.disposed=true;}}
function load(file) {
    if(cache.has(file))return cache.get(file).exports;
    const mod={exports:{}};cache.set(file,mod);
    const code=ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{target:ts.ScriptTarget.ES2020,module:ts.ModuleKind.CommonJS,allowJs:true}}).outputText;
    const localRequire=name=>{
        if(name==='three')return THREE;
        if(name==='@tweenjs/tween.js')return {default:TWEEN};
        if(name==='bezier-easing')return {default:ease};
        if(name.includes('controls/OrbitControls'))return {OrbitControls:Controls};
        if(name.endsWith('/Application'))return {default:App};
        if(name.endsWith('/Time'))return {default:class{constructor(){return app.time;}}};
        if(name.endsWith('/UI/EventBus'))return {default:bus};
        if(name==='./MonitorScreen')return {default:class{constructor(){counters.monitor++;}update(){}dispose(){counters.monitorDisposed++;}}};
        if(name.endsWith('/AudioManager'))return {default:class{constructor(){counters.audio++;}update(){}}};
        if(['./Computer','./Environment','./Decor','./CoffeeSteam'].includes(name))return {default:class{constructor(){counters.legacy++;}update(){}}};
        if(name==='./Cursor'||name==='./Hitboxes')return {};
        if(name.startsWith('three/examples/'))return load(path.join(root,'node_modules',name+'.js'));
        const base=path.resolve(path.dirname(file),name);
        return load([base,base+'.ts',base+'.js'].find(p=>fs.existsSync(p)&&fs.statSync(p).isFile()));
    };
    const globals={console,URLSearchParams,Uint8Array,Math,Number,Set,Map,
        window:{location,matchMedia(){return media;}},
        Element:class{},document:{removeEventListener(type,fn){if(inputListeners.get(type)===fn)inputListeners.delete(type);},addEventListener(type,fn){inputListeners.set(type,fn);},getElementById(){return webgl;}}};
    // Room display textures use the CPU fallback; actual canvas drawing is separately checked below.
    if(file.includes(path.join('Cyberpunk','Displays')))delete globals.document;
    vm.runInNewContext('(function(require,module,exports){'+code+'\n})',globals)(localRequire,mod,mod.exports);
    return mod.exports;
}

let clock=100000;process.hrtime=()=>[Math.floor(clock/1000),(clock%1000)*1e6];
let checks=0;function check(v,n){assert.ok(v,n);checks++;}
const Camera=load(path.join(root,'src/Application/Camera/Camera.ts')).default;
const camera=new Camera(); app.camera=camera;camera.createControls();
const step=ms=>{clock+=ms;app.time.elapsed+=ms;camera.update();};
app.resources.loaded=0;callbacks.get('loadingScreenDone')();check(!camera.introActive,'pre-ready START waits');
app.resources.loaded=1;callbacks.get('ready.cinematic')();check(camera.introActive && camera.targetKeyframe==='desk','ready starts reveal');
const count=TWEEN.getAll().length;callbacks.get('loadingScreenDone')();check(TWEEN.getAll().length===count,'repeated START is idempotent');
step(3100);check(camera.introActive && camera.targetKeyframe==='idle','reveal chains settle');step(2000);check(!camera.introActive && camera.currentKeyframe==='idle','4.8 second intro completes');
let externalDone=false;new TWEEN.Tween({x:0}).to({x:1},50).onComplete(()=>externalDone=true).start();
camera.transition('desk',100);camera.transition('monitor',100);step(200);check(externalDone,'camera cancellation preserves unrelated tweens');check(camera.currentKeyframe==='monitor','replacement transition wins');
camera.transition('desk',100);camera.transition('desk',100);check(TWEEN.getAll().length===2,'duplicate transition owns only two tweens');
app.sizes.width=390;app.sizes.height=700;camera.resize();camera.update();check(!camera.targetKeyframe && camera.currentKeyframe==='desk','resize settles interrupted destination');check(camera.instance.aspect===390/700,'resize updates projection');
app.sizes.width=1440;app.sizes.height=1000;
function intro(){camera.started=false;camera.startExperience();check(camera.introActive,'intro restarts test fixture');}
intro();callbacks.get('skipCinematic')();check(!camera.introActive && camera.currentKeyframe==='idle' && TWEEN.getAll().length===0,'skip settles and clears owned tweens');
intro();camera.resize();check(!camera.introActive && camera.currentKeyframe==='idle','resize cancels intro safely');
intro();callbacks.get('enterPortfolio')();step(2100);check(!camera.introActive && camera.currentKeyframe==='monitor','open portfolio interrupts intro');
intro();callbacks.get('freeCamToggle')(true);camera.trigger('enterMonitor');check(camera.targetKeyframe==='orbitControlsStart','queued iframe hover cannot interrupt freecam entry');step(800);camera.trigger('enterMonitor');check(camera.freeCam && !camera.targetKeyframe,'queued iframe hover does not steal active orbit controls');check(!camera.introActive && camera.freeCam,'free camera interrupts intro');callbacks.get('freeCamToggle')(false);step(4100);check(!camera.freeCam && camera.currentKeyframe==='idle','free camera return');
intro();media.matches=true;camera.update();check(!camera.introActive && camera.currentKeyframe==='idle','live reduced motion skips intro');
camera.started=false;camera.startExperience();check(!camera.introActive && camera.currentKeyframe==='idle','reduced START immediate');
media.matches=false;camera.started=false;app.sizes.width=390;camera.startExperience();check(!camera.introActive && camera.currentKeyframe==='idle','narrow START immediate');app.sizes.width=1440;
camera.transition('desk');callbacks.get('freeCamToggle')(true);media.matches=true;camera.update();check(camera.freeCam,'live reduced motion preserves freecam completion callback');callbacks.get('freeCamToggle')(false);camera.update();check(!camera.freeCam,'reduced freecam exit');
media.matches=false;
intro();step(3000);step(1784);const handoff=camera.position.clone();step(16);check(!camera.introActive && camera.position.distanceTo(handoff)<100,'moving idle target has smooth final-frame handoff');
intro();inputListeners.get('mousedown')({target:{id:'scene'}});check(!camera.introActive && camera.currentKeyframe==='idle','scene click skips intro without hijacking keyboard');
const consoleError=console.error;console.error=()=>{};const deskUpdate=camera.keyframes.desk.update;
camera.keyframes.desk.update=()=>{throw new Error('injected intro failure');};camera.started=false;camera.startExperience();check(!camera.introActive && camera.currentKeyframe==='idle' && TWEEN.getAll().length===0,'intro setup failure recovers stable idle');camera.keyframes.desk.update=deskUpdate;console.error=consoleError;
callbacks.get('enterPortfolio')();step(2100);callbacks.get('returnToRoom')();step(1100);check(camera.currentKeyframe==='desk','keyboard return leaves monitor focus');
callbacks.get('freeCamToggle')(true);step(800);callbacks.get('returnToRoom')();step(4100);check(!camera.freeCam&&camera.currentKeyframe==='idle','keyboard return exits free camera deterministically');
intro();camera.dispose();camera.dispose();check(TWEEN.getAll().length===0 && !camera.introActive,'dispose cancels intro once');check(inputListeners.size===0 && callbacks.size===0,'dispose removes owned document, UI and ready listeners');check(camera.orbitControls.disposed,'orbit controls disposed');
const result={status:'PASS',checks,note:'Real Three.js and Tween.js; DOM/OrbitControls fixtures. No rendered camera-path acceptance.'};fs.writeFileSync(path.join(__dirname,'intro-results.json'),JSON.stringify(result,null,2));console.log(result);
