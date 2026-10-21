const fs = require('node:fs'), path = require('node:path'), vm = require('node:vm');
const assert = require('node:assert/strict'), crypto = require('node:crypto');
const root = path.resolve(__dirname, '..');
const ts = require(path.join(root,'node_modules/typescript'));
const THREE = require(require.resolve('three',{paths:[root]}));
const cache = new Map();
function load(file) {
    if(cache.has(file)) return cache.get(file).exports;
    const mod = {exports:{}}; cache.set(file,mod);
    const source = fs.readFileSync(file,'utf8');
    const code = ts.transpileModule(source,{compilerOptions:{target:ts.ScriptTarget.ES2020,module:ts.ModuleKind.CommonJS,allowJs:true}}).outputText;
    const localRequire = name => {
        if(name==='three') return THREE;
        if(name.startsWith('three/examples/')) return load(path.join(root,'node_modules',name+'.js'));
        const base=path.resolve(path.dirname(file),name);
        return load([base,base+'.ts',base+'.js'].find(p=>fs.existsSync(p)&&fs.statSync(p).isFile()));
    };
    vm.runInNewContext('(function(require,module,exports){'+code+'\n})',{console,URLSearchParams,Uint8Array,Math,Number,Set,Map})(localRequire,mod,mod.exports);
    return mod.exports;
}
const Room = load(path.join(root,'src/Application/World/Cyberpunk/CyberpunkRoom.ts')).default;
const {CENTER_SCREEN} = load(path.join(root,'src/Application/World/Cyberpunk/MonitorArray.ts'));
const {usesLegacyRoom} = load(path.join(root,'src/Application/World/Cyberpunk/RoomMode.ts'));
const room = new Room(); room.updateMatrixWorld(true);
let checks=0;
function check(value,message){assert.ok(value,message);checks++;}
for(const name of ['Architecture','Workstation','MonitorArray','PCTower','Lighting','InteractiveAperture']) check(room.getObjectByName(name),name+' exists');
const center = room.getObjectByName('CenterMonitor');
check(center.position.toArray().join(',')==='0,950,255','center origin');
check(Math.abs(center.rotation.x + 3*Math.PI/180)<1e-12,'center tilt');
check(CENTER_SCREEN.width===1280 && CENTER_SCREEN.height===1024,'CSS screen dimensions');
const keycaps = room.getObjectByName('Keycaps/67');
check(keycaps instanceof THREE.InstancedMesh && keycaps.count===67,'67 keys instanced');
check(room.rotors.length===3,'three cooling rotors');
const deskMaterial=[...room.kit.materials].find(material=>material.name==='desk');
check(deskMaterial.map.encoding===THREE.sRGBEncoding && deskMaterial.roughnessMap.encoding===THREE.LinearEncoding,'color and roughness use appropriate encodings');
check(deskMaterial.color.equals(new THREE.Color('#493f35').convertSRGBToLinear()),'authored desk color converted to linear once');
const cyanMaterial=[...room.kit.materials].find(material=>material.name==='cyan');
check(cyanMaterial.emissive.equals(new THREE.Color('#00e5ff').convertSRGBToLinear()),'emissive palette converted to linear once');
const counts={meshDraws:0,instances:0,triangles:0,lights:0,shadowLights:0,transparentMeshes:0};
room.traverse(object=>{
    if(object instanceof THREE.Light){counts.lights++; if(object.castShadow)counts.shadowLights++;}
    if(!(object instanceof THREE.Mesh))return;
    counts.meshDraws++;
    const instances=object instanceof THREE.InstancedMesh?object.count:1;
    counts.instances+=instances;
    counts.triangles+=(object.geometry.index?object.geometry.index.count:object.geometry.attributes.position.count)/3*instances;
    if(object.material.transparent)counts.transparentMeshes++;
    for(const v of object.geometry.attributes.position.array)check(Number.isFinite(v),'finite geometry coordinate');
});
check(counts.shadowLights===1,'single shadow light');
check(counts.transparentMeshes===1,'single transparent panel');
check(counts.meshDraws<125,'static mesh draw budget');
const raycaster = new THREE.Raycaster();
for(const camera of [new THREE.Vector3(0,950,2600),new THREE.Vector3(0,1800,5500)]) {
    for(const x of [-630,-315,0,315,630])for(const y of [-502,-251,0,251,502]) {
        const target=new THREE.Vector3(x,y,0).applyMatrix4(center.matrixWorld);
        const distance=camera.distanceTo(target);
        raycaster.set(camera,target.clone().sub(camera).normalize());
        raycaster.far=distance-0.5;
        const hits=raycaster.intersectObject(room,true).filter(hit=>!hit.object.material?.transparent);
        check(hits.length===0,`aperture clear from ${camera.toArray()} to ${x},${y}: ${hits.map(h=>h.object.name).join(',')}`);
    }
}
const angles=room.rotors.map(r=>r.rotation.z);
room.update(16,true);
check(room.rotors.every((r,i)=>r.rotation.z===angles[i]),'reduced motion freezes fans');
room.update(16,false);
check(room.rotors.every((r,i)=>r.rotation.z>angles[i]),'normal fan animation');
const after=room.rotors[0].rotation.z; room.update(Infinity,false); room.update(-1,false);
check(room.rotors[0].rotation.z===after,'invalid/backwards delta ignored');
check(usesLegacyRoom('?dev&legacyRoom')&&!usesLegacyRoom('?dev'),'rollback URL independent of dev iframe flag');
// Execute both canvas-art branches with a recording 2D context (not rasterized output).
const drawText=[];
const context2d={fillRect(){},fillText(text){drawText.push(text);},beginPath(){},moveTo(){},lineTo(){},stroke(){}};
let canvasContext=context2d;
const displayModule={exports:{}};
const displayCode=ts.transpileModule(fs.readFileSync(path.join(root,'src/Application/World/Cyberpunk/Displays.ts'),'utf8'),{compilerOptions:{target:ts.ScriptTarget.ES2020,module:ts.ModuleKind.CommonJS}}).outputText;
vm.runInNewContext('(function(require,module,exports){'+displayCode+'\n})',{
    document:{createElement(){return {width:0,height:0,getContext(){return canvasContext;}};}},
    console:{warn(){}},Uint8Array,
})(()=>THREE,displayModule,displayModule.exports);
const Kit=load(path.join(root,'src/Application/World/Cyberpunk/RoomKit.ts')).default;
const displayKit=new Kit();
for(const mode of ['terminal','system']) {
    const texture=displayModule.exports.displayTexture(displayKit,mode);
    check(texture.isCanvasTexture && texture.image.width===768 && texture.image.height===480,'canvas display dimensions');
}
check(drawText.some(text=>text.includes('STATIC DEMO'))&&drawText.some(text=>text.includes('no live metrics')),'demo artwork explicitly labelled');
canvasContext=null;
check(displayModule.exports.displayTexture(displayKit,'terminal').isDataTexture,'decorative canvas failure cannot block portfolio monitor');
displayKit.dispose();
let disposed=0, instancesDisposed=0, instancedMeshes=0;
room.traverse(object=>{if(object instanceof THREE.InstancedMesh){instancedMeshes++;object.addEventListener('dispose',()=>instancesDisposed++);}});
const resourceCount=room.kit.geometries.size+room.kit.materials.size+room.kit.textures.size;
[...room.kit.geometries,...room.kit.materials,...room.kit.textures].forEach(resource=>resource.addEventListener('dispose',()=>disposed++));
room.dispose(); room.dispose();
check(disposed===resourceCount,'all room resources disposed exactly once');
check(instancesDisposed===instancedMeshes,'instanced GPU buffer disposal dispatched exactly once');
check(room.children.length===0,'room hierarchy removed');
const baseline=JSON.parse(fs.readFileSync(path.join(__dirname,'../phase3-artifacts/baseline-manifest.json')));
const hash=p=>crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
for(const [file,expected] of Object.entries(baseline.protected)) {
    if(file==='src/Application/Camera/Camera.ts') continue;
    if(file==='src/Application/Camera/CameraKeyframes.ts') {
      const before=fs.readFileSync(path.join(__dirname,'baseline-source/Application/Camera/CameraKeyframes.ts'),'utf8');
      check(hash(path.join(__dirname,'baseline-source/Application/Camera/CameraKeyframes.ts'))===expected,'keyframe baseline original');
      check(fs.readFileSync(path.join(root,file),'utf8')===before.replace('this.time = new Time();','this.time = new Application().time;'),'camera coordinates unchanged; shared clock only');
      continue;
    }
    const contractPath=path.join(__dirname,'../phase3-artifacts/monitor-fix-contract.json');
    if(file==='src/Application/World/MonitorScreen.ts' && fs.existsSync(contractPath)) {
        // Explicitly authorize only the documented compositor block, not bridge/transform edits.
        const contract=JSON.parse(fs.readFileSync(contractPath));
        const before=path.join(__dirname,'../phase3-artifacts',contract.before);
        check(hash(before)===expected,'original monitor snapshot matches Phase 3 baseline');
        check(fs.readFileSync(path.join(root,file),'utf8')===fs.readFileSync(before,'utf8').replace(contract.oldBlock,contract.newBlock),'only documented alpha-cutout change in monitor');
    } else check(hash(path.join(root,file))===expected,'protected '+file);
}
for(const [file,expected] of Object.entries(baseline.inner))check(hash(path.join(root,'../portfolio-inner-site',file))===expected,'inner unchanged '+file);
const results={status:'PASS',checks,counts,resources:resourceCount,instancedMeshes,note:'Actual Three.js CPU geometry/ray tests; no WebGL rendering, FPS, GPU memory, or visual acceptance claim.'};
fs.writeFileSync(path.join(__dirname,'scene-results.json'),JSON.stringify(results,null,2));
console.log(JSON.stringify(results,null,2));
