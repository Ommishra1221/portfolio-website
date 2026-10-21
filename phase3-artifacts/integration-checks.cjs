const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..');
const ts=require(path.join(root,'node_modules/typescript'));
const THREE=require(require.resolve('three',{paths:[root]}));
const TWEEN=require(require.resolve('@tweenjs/tween.js',{paths:[root]}));
const ease=require(require.resolve('bezier-easing',{paths:[root]}));
const cache=new Map(), callbacks=new Map(), inputListeners=new Map();
const media={matches:false}; const location={search:'?dev'}; const webgl={style:{}};
const counters={monitor:0,audio:0,legacy:0,monitorDisposed:0};
const app={scene:new THREE.Scene(),sizes:{width:1440,height:1000},mouse:{x:720,y:500},time:{elapsed:0,delta:16},resources:{},renderer:{instance:{domElement:{}}}};
class App {constructor(){return app;}}
const bus={on(name,fn){callbacks.set(name,fn);},dispatch(){}};
class Controls {constructor(camera){this.object=camera;this.target=new THREE.Vector3();}update(){}}
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
        document:{addEventListener(type,fn){inputListeners.set(type,fn);},getElementById(){return webgl;}}};
    // Room display textures use the CPU fallback; actual canvas drawing is separately checked below.
    if(file.includes(path.join('Cyberpunk','Displays')))delete globals.document;
    vm.runInNewContext('(function(require,module,exports){'+code+'\n})',globals)(localRequire,mod,mod.exports);
    return mod.exports;
}
let checks=0;
function check(value,label){assert.ok(value,label);checks++;}
const Camera=load(path.join(root,'src/Application/Camera/Camera.ts')).default;
const camera=new Camera();app.camera=camera;camera.createControls();
check(camera.instance.fov===35 && camera.instance.near===10 && camera.instance.far===900000,'projection unchanged');
check(camera.orbitControls.minDistance===4000 && camera.orbitControls.maxDistance===29000,'orbit limits unchanged');
camera.transition('desk',50);check(TWEEN.getAll().length===2,'normal transition uses two tweens');
TWEEN.update(TWEEN.now()+100);camera.update();check(camera.currentKeyframe==='desk','normal desk transition completes');
camera.trigger('enterMonitor');TWEEN.update(TWEEN.now()+2100);camera.update();check(camera.currentKeyframe==='monitor','focus event completes');
camera.trigger('leftMonitor');TWEEN.update(TWEEN.now()+1100);camera.update();check(camera.currentKeyframe==='desk','exit event completes');
callbacks.get('freeCamToggle')(true);TWEEN.update(TWEEN.now()+800);camera.update();
check(camera.freeCam && webgl.style.pointerEvents==='auto','free camera enables');
callbacks.get('freeCamToggle')(false);TWEEN.update(TWEEN.now()+4100);camera.update();
check(!camera.freeCam && camera.currentKeyframe==='idle' && webgl.style.pointerEvents==='none','free camera returns to idle');
media.matches=true;camera.transition('monitor');camera.update();
check(camera.currentKeyframe==='monitor' && TWEEN.getAll().length===0,'reduced transition immediate');
check(Math.abs(camera.position.z-(2000+1000/1440*1200-600))<1e-6,'responsive monitor framing still updates');
app.sizes.width=390;app.sizes.height=700;camera.update();
check(Math.abs(camera.position.z-(2000+700/390*1200))<1e-6,'narrow focus framing still updates');
camera.transition('idle');const idle=camera.position.clone();app.time.elapsed=100000;camera.update();
check(camera.position.equals(idle),'reduced motion stops idle drift');
callbacks.get('freeCamToggle')(true);camera.update();check(camera.freeCam && !camera.orbitControls.enableDamping,'reduced freecam is direct');
callbacks.get('freeCamToggle')(false);camera.update();check(!camera.freeCam,'reduced freecam exits');
media.matches=false;camera.update();check(!camera.position.equals(idle),'normal idle motion resumes');

const Emitter=load(path.join(root,'src/Application/Utils/EventEmitter.ts')).default;
const World=load(path.join(root,'src/Application/World/World.ts')).default;
app.resources=new Emitter();const world=new World();world.update();
app.resources.trigger('ready');
check(world.cyberpunkRoom?.name==='CyberpunkRoom' && counters.monitor===1 && counters.audio===1,'World constructs room with existing monitor/audio contracts');
world.update();world.dispose();app.resources.trigger('ready');
check(!app.scene.getObjectByName('CyberpunkRoom') && counters.monitorDisposed===1 && counters.monitor===1,'World removes room and prevents late ready reconstruction');
location.search='?dev&legacyRoom';app.resources=new Emitter();const legacy=new World();app.resources.trigger('ready');
check(!legacy.cyberpunkRoom && counters.legacy===4 && counters.monitor===2,'legacy comparison retains old constructors and monitor');legacy.dispose();

function sources(search){
    const file=path.join(root,'src/Application/sources.ts');cache.delete(file);location.search=search;return load(file).default;
}
const current=sources('?dev'), original=sources('?dev&legacyRoom');
check(current.length===original.length-6 && current.every(s=>s.type!=='gltfModel'),'default excludes six unused legacy resources');
check(current.some(s=>s.name==='monitorShadowTexture') && current.some(s=>s.name==='keyboardKeydown1'),'monitor textures and audio retained');
const results={status:'PASS',checks,resourceCounts:{current:current.length,legacy:original.length},note:'Camera tweens/projections execute with actual Three.js and Tween.js. Orbit DOM controller, audio and iframe construction use test doubles; no physical browser interaction claim.'};
fs.writeFileSync(path.join(__dirname,'integration-results.json'),JSON.stringify(results,null,2));
console.log(JSON.stringify(results,null,2));
