const fs = require('node:fs');
const path = require('node:path');
const {spawn} = require('node:child_process');
const delay = ms => new Promise(resolve => setTimeout(resolve,ms));
const output = path.join(__dirname, 'browser-qa');
class CDP {
    constructor(ws) {
        this.ws = ws; this.id = 0; this.pending = new Map(); this.events = [];
        ws.addEventListener('message',event => {
            const message = JSON.parse(String(event.data));
            if (message.id) {
                const p = this.pending.get(message.id);
                if (!p) return;
                clearTimeout(p.timer); this.pending.delete(message.id);
                message.error ? p.reject(Error(JSON.stringify(message.error))) : p.resolve(message.result);
            } else {
                this.events.push(message);
                if (this.onEvent) this.onEvent(message);
            }
        });
    }
    send(method,params = {},timeout = 20000) {
        const id = ++this.id;
        return new Promise((resolve,reject)=>{
            const timer = setTimeout(()=>{this.pending.delete(id);reject(Error(`CDP timeout: ${method}`));},timeout);
            this.pending.set(id,{resolve,reject,timer}); this.ws.send(JSON.stringify({id,method,params}));
        });
    }
    async evaluate(expression,contextId) {
        const result = await this.send('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true,...(contextId ? {contextId} : {})});
        if(result.exceptionDetails) throw Error(JSON.stringify(result.exceptionDetails));
        return result.result.value;
    }
    async screenshot(name) {
        const result = await this.send('Page.captureScreenshot',{format:'png',captureBeyondViewport:false},30000);
        fs.writeFileSync(path.join(output,name),Buffer.from(result.data,'base64'));
    }
}
async function launch() {
    const engine = process.env.QA_BROWSER || 'chrome';
    fs.mkdirSync(output,{recursive:true});
    const profile = path.join(output,`qa-profile-${Date.now()}`);
    const log = fs.createWriteStream(path.join(output,`qa-${engine}-startup.log`));
    const child = spawn(engine === 'edge' ? 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe' : 'C:/Program Files/Google/Chrome/Application/chrome.exe',[
        ...(process.env.QA_HEADFUL === '1' ? ['--window-position=-2000,-2000'] : ['--headless']),'--no-first-run','--no-default-browser-check','--disable-background-networking',
        '--remote-debugging-port=0',`--user-data-dir=${profile}`,
        'about:blank',
    ],{windowsHide:true,stdio:['ignore','pipe','pipe']});
    child.stdout.pipe(log,{end:false}); child.stderr.pipe(log,{end:false});
    let port;
    for(let i=0;i<100;i++) {
        try{port = Number(fs.readFileSync(path.join(profile,'DevToolsActivePort'),'utf8').split('\n')[0]);}catch{}
        if(port) break;
        if(child.exitCode !== null) throw Error(`Chrome exited: ${child.exitCode}`);
        await delay(200);
    }
    if(!port){child.kill();throw Error('Chrome debugging endpoint unavailable');}
    const targets = await fetch(`http://127.0.0.1:${port}/json/list`,{signal:AbortSignal.timeout(5000)}).then(r=>r.json());
    const target = targets.find(t=>t.type==='page');
    const ws = new WebSocket(target.webSocketDebuggerUrl);
    await new Promise((resolve,reject)=>{ws.addEventListener('open',resolve,{once:true});ws.addEventListener('error',reject,{once:true});});
    const cdp = new CDP(ws);
    const browserWs = new WebSocket((await fetch(`http://127.0.0.1:${port}/json/version`).then(r=>r.json())).webSocketDebuggerUrl);
    await new Promise((resolve,reject)=>{browserWs.addEventListener('open',resolve,{once:true});browserWs.addEventListener('error',reject,{once:true});});
    const browserCDP = new CDP(browserWs);
    console.log('Browser CDP:',JSON.stringify(await browserCDP.send('Browser.getVersion',{},5000)));
    console.log('Browser processes:',JSON.stringify(await browserCDP.send('SystemInfo.getProcessInfo',{},5000)));
    return {cdp,profile,child, async close(){
        fs.writeFileSync(path.join(output,`qa-${engine}-cdp-events.json`),JSON.stringify(cdp.events,null,2));
        browserWs.close(); ws.close(); child.kill(); log.end();
    }};
}
module.exports = {launch,delay,output};
