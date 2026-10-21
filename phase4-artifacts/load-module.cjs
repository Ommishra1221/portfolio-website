const fs=require('fs'),path=require('path'),vm=require('vm');
const root=path.resolve(__dirname,'..');
const ts=require(path.join(root,'node_modules/typescript'));
const THREE=require(require.resolve('three',{paths:[root]}));
function createLoader(globals={},overrides={},baseline=false){
 const cache=new Map();
 return function load(file){
  if(cache.has(file))return cache.get(file).exports;
  const mod={exports:{}};cache.set(file,mod);
  const snapshot=path.join(__dirname,'baseline-source',path.relative(root,file)+'.snapshot');
  const source=fs.readFileSync(baseline&&fs.existsSync(snapshot)?snapshot:file,'utf8');
  const code=ts.transpileModule(source,{compilerOptions:{target:ts.ScriptTarget.ES2020,module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.React,esModuleInterop:true,allowJs:true}}).outputText;
  const req=name=>{
   if(Object.hasOwn(overrides,name))return overrides[name];
   if(name==='three')return THREE;
   if(name.startsWith('three/examples/'))return load(path.join(root,'node_modules',name+'.js'));
   if(!name.startsWith('.'))return require(require.resolve(name,{paths:[root]}));
   const base=path.resolve(path.dirname(file),name);
   return load([base,base+'.ts',base+'.tsx',base+'.js'].find(p=>fs.existsSync(p)&&fs.statSync(p).isFile()));
  };
  vm.runInNewContext('(function(require,module,exports){'+code+'\n})',{console,URLSearchParams,Uint8Array,Math,Number,Set,Map,...globals})(req,mod,mod.exports);
  return mod.exports;
 };
}
function metrics(room){
 const result={triangles:0,meshSubmissions:0,instances:0,instanceBatches:0,materials:room.kit.materials.size,geometries:room.kit.geometries.size,textures:room.kit.textures.size,transparentMeshes:0,lights:0,shadowLights:0};
 room.traverse(o=>{
  if(o instanceof THREE.Light){result.lights++;if(o.castShadow)result.shadowLights++;}
  if(!(o instanceof THREE.Mesh))return;
  result.meshSubmissions++;const n=o instanceof THREE.InstancedMesh?o.count:1;result.instances+=n;
  if(o instanceof THREE.InstancedMesh)result.instanceBatches++;
  result.triangles+=(o.geometry.index?o.geometry.index.count:o.geometry.attributes.position.count)/3*n;
  if(o.material.transparent)result.transparentMeshes++;
 });return result;
}
module.exports={root,THREE,createLoader,metrics};
