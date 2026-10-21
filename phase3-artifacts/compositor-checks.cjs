const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..');
const ts=require(path.join(root,'node_modules/typescript'));
const THREE=require(require.resolve('three',{paths:[root]}));
let checks=0;function check(value,label){assert.ok(value,label);checks++;}
function materialFrom(source){
 const mod={exports:{}};
 const code=ts.transpileModule(source,{compilerOptions:{target:ts.ScriptTarget.ES2020,module:ts.ModuleKind.CommonJS}}).outputText;
 const localRequire=name=>{
  if(name==='three')return THREE;
  if(name.includes('CSS3DRenderer'))return {CSS3DObject:class extends THREE.Object3D{constructor(element){super();this.element=element;}}};
  if(name.includes('EventEmitter'))return {default:class{}};
  return {};
 };
 vm.runInNewContext('(function(require,module,exports){'+code+'\n})',{})(localRequire,mod,mod.exports);
 const target={screenSize:new THREE.Vector2(1280,1024),position:new THREE.Vector3(0,950,255),rotation:new THREE.Euler(-3*Math.PI/180,0,0),scene:new THREE.Scene(),cssScene:new THREE.Scene()};
 mod.exports.default.prototype.createCssPlane.call(target,{});
 target.scene.updateMatrixWorld(true);target.cssScene.updateMatrixWorld(true);
 return {target,mesh:target.scene.children[0],css:target.cssScene.children[0]};
}
const contract=JSON.parse(fs.readFileSync(path.join(__dirname,'monitor-fix-contract.json')));
const before=materialFrom(fs.readFileSync(path.join(__dirname,contract.before),'utf8'));
const after=materialFrom(fs.readFileSync(path.join(root,contract.file),'utf8'));
check(before.mesh.material.isMeshLambertMaterial && before.mesh.material.color.getHex()===0xffffff,'old cutout is lit white Lambert');
check(before.mesh.material.opacity===0 && before.mesh.material.blending===THREE.NoBlending && !before.mesh.material.premultipliedAlpha,'old cutout allows RGB independent of zero alpha');
const m=after.mesh.material;
check(m.isMeshBasicMaterial && m.color.getHex()===0,'cutout is unlit black');
check(m.opacity===0 && m.transparent && m.blending===THREE.NoBlending,'cutout replaces framebuffer RGBA with transparent black');
check(m.premultipliedAlpha && !m.toneMapped && !m.fog,'cutout cannot pick up lighting, tone mapping or fog RGB');
check(m.depthWrite && m.depthTest && m.colorWrite,'depth occlusion and alpha-hole writes preserved');
check(after.mesh.matrixWorld.equals(after.css.matrixWorld),'WebGL and CSS3D matrices identical');
check(after.mesh.matrixWorld.equals(before.mesh.matrixWorld),'screen transform unchanged');
check(after.mesh.geometry.parameters.width===1280&&after.mesh.geometry.parameters.height===1024,'screen dimensions unchanged');
const shader=THREE.ShaderLib.lambert.fragmentShader;
check(shader.includes('outgoingLight = reflectedLight.directDiffuse')&&shader.includes('vec4 diffuseColor = vec4( diffuse, opacity )'),'installed Lambert shader has light-dependent RGB and independent opacity');
const camera=new THREE.PerspectiveCamera(35,1440/1000,10,900000);
const points={
 deskLeftFront:[-3300,-450,2000],deskRightFront:[3300,-450,2000],pcOuterFront:[3280,1200,1325],
 monitorTopLeft:new THREE.Vector3(-640,512,0).applyMatrix4(after.mesh.matrixWorld).toArray(),
 monitorBottomRight:new THREE.Vector3(640,-512,0).applyMatrix4(after.mesh.matrixWorld).toArray(),
};
const framing={};
for(const [name,position,target] of [
 ['idle',[-20000,12000,20000],[0,-1000,0]],
 ['deskResponsive',[0,1800,5500+1000/1440*3000-1800],[0,500,0]],
 ['focusResponsive',[0,950,2000+1000/1440*1200-600],[0,950,0]],
]){
 camera.position.set(...position);camera.lookAt(...target);camera.updateMatrixWorld(true);
 framing[name]=Object.fromEntries(Object.entries(points).map(([label,p])=>{
  const ndc=new THREE.Vector3(...p).project(camera);
  return [label,{x:ndc.x,y:ndc.y,inside:Math.abs(ndc.x)<=1&&Math.abs(ndc.y)<=1&&Math.abs(ndc.z)<=1}];
 }));
}
check(framing.idle.deskLeftFront.inside&&framing.idle.deskRightFront.inside&&framing.idle.pcOuterFront.inside,'idle snapshot contains workstation extremes');
check(framing.focusResponsive.monitorTopLeft.inside&&framing.focusResponsive.monitorBottomRight.inside,'focus snapshot contains readable screen extents');
const result={status:'PASS',checks,framing,note:'Actual material/matrix/projection tests and installed shader inspection. No GPU pixels, screenshot, physical hit-test, or Chrome visual acceptance claim. Desk projection may crop workstation edges under unchanged camera definitions.'};
fs.writeFileSync(path.join(__dirname,'compositor-results.json'),JSON.stringify(result,null,2));console.log(JSON.stringify(result,null,2));
