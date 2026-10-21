const fs=require('node:fs'),path=require('node:path');
const {launch}=require('../../phase-2c-artifacts/cdp-browser.cjs');
const result={url:'http://localhost:8080/?dev',browser:'Installed Chrome with fresh profile and software rendering',visualAcceptance:'PENDING'};
(async()=>{
 let browser;
 try {
  browser=await launch();result.profile=browser.profile;
  result.navigation=await browser.cdp.send('Page.navigate',{url:result.url},10000);
  await browser.cdp.send('Page.enable',{},20000);
  await browser.cdp.send('Runtime.enable',{},10000);
  result.page=await browser.cdp.evaluate('({title:document.title,text:document.body.innerText.slice(0,1000)})');
  result.visualAcceptance='PENDING: page accessible, full acceptance procedure still required';
  await browser.cdp.screenshot('phase3-baseline.png');
  result.screenshot='../../phase-2c-artifacts/browser-qa/phase3-baseline.png';
 }catch(error){result.blocked=String(error);}
 finally{if(browser)await browser.close();fs.writeFileSync(path.join(__dirname,'browser-result.json'),JSON.stringify(result,null,2));console.log(JSON.stringify(result,null,2));}
})().then(()=>process.exit(0));
