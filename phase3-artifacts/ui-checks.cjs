const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..');
const ts=require(path.join(root,'node_modules/typescript'));
const {JSDOM}=require(path.join(root,'../portfolio-inner-site/node_modules/.pnpm/jsdom@16.7.0/node_modules/jsdom'));
const dom=new JSDOM('<div id="ui"></div><div id="root"></div><iframe id="computer-screen"></iframe>',{url:'http://localhost:8080/?dev',pretendToBeVisual:true});
Object.assign(global,{window:dom.window,document:dom.window.document});
Object.defineProperty(global,'navigator',{value:dom.window.navigator,configurable:true});
const React=require(require.resolve('react',{paths:[root]}));
const ReactDOM=require(require.resolve('react-dom',{paths:[root]}));
const {act}=require(require.resolve('react-dom/test-utils',{paths:[root]}));
const events=[],listeners=new Map(),synthetic=[];
document.addEventListener('keydown',event=>{if(event.inComputer)synthetic.push(event.key);});
const bus={on(type,fn){listeners.set(type,fn);},dispatch(type,data){events.push({type,data});}};
class WebGLContext {}
dom.window.HTMLCanvasElement.prototype.getContext=function(){return new WebGLContext();};
function load(file){
 const mod={exports:{}};
 const code=ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{target:ts.ScriptTarget.ES2020,module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.React,esModuleInterop:true}}).outputText;
 const localRequire=name=>{
  if(name==='react')return React;
  if(name==='framer-motion')return {motion:{img:({animate,variants,...props})=>React.createElement('img',props)}};
  if(name.includes('EventBus'))return {__esModule:true,default:bus};
  if(name.includes('Animation'))return {Easing:{expOut:[]}};
  if(/\.svg$/.test(name))return name;
  const base=path.resolve(path.dirname(file),name);return load(base+'.ts');
 };
 vm.runInNewContext('(function(require,module,exports){'+code+'\n})',{window,document,console,URLSearchParams,setTimeout,clearTimeout,WebGLRenderingContext:WebGLContext,CustomEvent:window.CustomEvent})(localRequire,mod,mod.exports);
 return mod.exports;
}
const container=document.getElementById('root');
let checks=0;
function check(value,label){assert.ok(value,label);checks++;}
function key(element,type,value,repeat=false){act(()=>{element.dispatchEvent(new window.KeyboardEvent(type,{key:value,repeat,bubbles:true}));});}
const wait=ms=>new Promise(resolve=>setTimeout(resolve,ms));
(async()=>{
 const FreeCam=load(path.join(root,'src/Application/UI/components/FreeCamToggle.tsx')).default;
 act(()=>{ReactDOM.render(React.createElement(FreeCam),container);});
 await act(async()=>{await wait(150);});
 const free=container.querySelector('[role=button]');
 check(free.tabIndex===0 && free.getAttribute('aria-label')==='Toggle free camera','free camera keyboard target');
 key(free,'keydown','Enter');key(free,'keyup','Enter');
 check(free.getAttribute('aria-pressed')==='true'&&events.at(-1).data===true,'Enter enables freecam via same event');
 key(free,'keydown','Enter',true);check(free.getAttribute('aria-pressed')==='true','key repeat ignored');
 key(free,'keydown',' ');key(free,'keyup',' ');
 check(free.getAttribute('aria-pressed')==='false'&&events.at(-1).data===false,'Space disables freecam');
 check(synthetic.includes('_AUTO_'),'existing synthetic dispatch preserved');
 act(()=>{free.dispatchEvent(new window.MouseEvent('mousedown',{bubbles:true}));free.dispatchEvent(new window.MouseEvent('mouseup',{bubbles:true}));});
 check(free.getAttribute('aria-pressed')==='true','mouse freecam path retained');
 act(()=>{ReactDOM.unmountComponentAtNode(container);});
 const Mute=load(path.join(root,'src/Application/UI/components/MuteToggle.tsx')).default;
 act(()=>{ReactDOM.render(React.createElement(Mute),container);});
 const mute=container.querySelector('[role=button]');key(mute,'keydown','Enter');key(mute,'keyup','Enter');
 check(mute.getAttribute('aria-pressed')==='true'&&events.at(-1).type==='muteToggle'&&events.at(-1).data===true,'keyboard mutes');
 key(mute,'keydown',' ');key(mute,'keyup',' ');
 check(mute.getAttribute('aria-pressed')==='false'&&events.at(-1).data===false,'keyboard unmutes');
 act(()=>{ReactDOM.unmountComponentAtNode(container);});
 const Loading=load(path.join(root,'src/Application/UI/components/LoadingScreen.tsx')).default;
 act(()=>{ReactDOM.render(React.createElement(Loading),container);});
 let start=container.querySelector('.bios-start-button');
 check(start.tabIndex===-1,'start not tabbable before resources ready');
 act(()=>{listeners.get('loadedSource')({progress:1,toLoad:13,loaded:13,sourceName:'test-resource'});});
 await act(async()=>{await wait(1650);});
 start=container.querySelector('.bios-start-button');check(start.tabIndex===0,'start enabled after load');
 key(start,'keydown','Enter');
 check(events.at(-1).type==='loadingScreenDone'&&document.getElementById('ui').style.pointerEvents==='none','keyboard start preserves loading event');
 check(container.textContent.includes('Om Kumar Mishra'),'identity retained');
 act(()=>{ReactDOM.unmountComponentAtNode(container);});
 const results={status:'PASS',checks,note:'Actual React/jsdom keyboard/mouse events; no browser hit-testing, focus styling or WebGL claim.'};
 fs.writeFileSync(path.join(__dirname,'ui-results.json'),JSON.stringify(results,null,2));console.log(JSON.stringify(results,null,2));
 dom.window.close();process.exit(0);
})().catch(error=>{console.error(error);process.exit(1);});
