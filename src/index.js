/**
 * gh-proxy v4 — 对标 akams 设计
 * 节点选择 · 测速 · 暗色/亮色 · 输入链接转换
 */

const HOMEPAGE = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>gh 镜像加速 - GitHub / NPM / PyPI 全链路加速</title>
<meta name="description" content="GitHub 文件加速、NPM 镜像、PyPI 镜像、Release 下载加速、Git Clone 加速">
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>⚡</text></svg>">
<style>
*{box-sizing:border-box;margin:0;padding:0}
:root{--bg:#fff;--card:#f9fafb;--bdr:#e5e7eb;--text:#111827;--sub:#6b7280;--blue:#2563eb;--green:#16a34a;--purple:#7c3aed;--orange:#ea580c;--accent:#2563eb}
[data-theme=dark]{--bg:#0d1117;--card:#161b22;--bdr:#30363d;--text:#e5e7eb;--sub:#9ca3af;--blue:#60a5fa;--green:#4ade80;--purple:#a78bfa;--orange:#fb923c;--accent:#60a5fa}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','PingFang SC','Microsoft YaHei',sans-serif;background:var(--bg);color:var(--text);min-height:100vh;line-height:1.6;transition:background .3s,color .3s}
a{color:var(--blue);text-decoration:none}
a:hover{text-decoration:underline}
header{border-bottom:1px solid var(--bdr);height:64px;display:flex;align-items:center;padding:0 24px;position:sticky;top:0;z-index:100;background:var(--bg);transition:background .3s}
header .logo{display:flex;align-items:center;gap:10px;font-size:1.2rem;font-weight:700;color:var(--text)}
header .logo .icon{width:36px;height:36px;border-radius:8px;background:var(--text);display:flex;align-items:center;justify-content:center}
header .logo .icon svg{width:22px;height:22px;fill:var(--bg)}
header nav{margin-left:auto;display:flex;gap:20px;align-items:center}
header nav a{color:var(--sub);font-weight:500;font-size:.9rem;transition:color .2s}
header nav a:hover{color:var(--text);text-decoration:none}
.theme-btn{background:var(--card);border:1px solid var(--bdr);border-radius:8px;width:36px;height:36px;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:1.1rem;transition:all .2s}
.theme-btn:hover{border-color:var(--accent)}
main{max-width:1000px;margin:0 auto;padding:60px 20px 40px}
.hero{text-align:center;margin-bottom:40px}
.hero h1{font-size:3rem;font-weight:800;margin-bottom:12px;color:var(--text)}
.hero h1 span{color:var(--blue)}
.hero p{color:var(--sub);font-size:1rem;max-width:600px;margin:0 auto}
.input-area{margin-bottom:32px}
.input-row{display:flex;gap:12px;margin-bottom:12px;position:relative}
.input-row input{flex:1;height:48px;padding:0 16px;background:var(--card);border:1px solid var(--bdr);border-radius:8px;font-size:.95rem;color:var(--text);outline:none;font-family:inherit;transition:border .2s}
.input-row input:focus{border-color:var(--blue);ring:2px var(--blue)}
.input-row input::placeholder{color:var(--sub)}
.input-row .go-btn{height:48px;padding:0 28px;background:var(--blue);color:#fff;border:none;border-radius:8px;cursor:pointer;font-weight:700;font-size:1rem;transition:all .15s;white-space:nowrap}
.input-row .go-btn:hover{opacity:.9}
.input-row .go-btn:disabled{opacity:.5;cursor:not-allowed}
.input-row .clear-btn{background:none;border:none;color:var(--sub);cursor:pointer;font-size:1.1rem;padding:0 4px;display:none;flex-shrink:0}
.input-row .clear-btn.show{display:block}
.tabs{display:flex;gap:0;margin-top:16px;background:var(--card);border:1px solid var(--bdr);border-radius:8px;padding:3px;display:none}
.tabs.show{display:flex}
.tabs .tab{flex:1;padding:8px 12px;text-align:center;font-size:.82rem;font-weight:500;color:var(--sub);border:none;background:transparent;cursor:pointer;border-radius:6px;transition:all .15s}
.tabs .tab:hover{color:var(--text)}
.tabs .tab.active{background:var(--bg);color:var(--text);box-shadow:0 1px 3px rgba(0,0,0,.08)}
.tab-panels{display:none;margin-top:12px}
.tab-panels.show{display:block}
.tab-panel{display:none}
.tab-panel.active{display:block}
.tab-panel .cmd-row{display:flex;gap:8px;align-items:center;margin-bottom:8px}
.tab-panel .cmd-row label{font-size:.78rem;color:var(--sub);width:80px;flex-shrink:0;text-align:right}
.tab-panel .cmd-row input{flex:1;height:36px;padding:0 10px;background:var(--card);border:1px solid var(--bdr);border-radius:6px;font-size:.8rem;color:var(--green);font-family:'JetBrains Mono',monospace}
.tab-panel .cmd-row .cmd-btn{height:36px;padding:0 14px;background:var(--blue);color:#fff;border:none;border-radius:6px;cursor:pointer;font-size:.8rem;font-weight:600;white-space:nowrap;transition:all .12s}
.tab-panel .cmd-row .cmd-btn:active{transform:scale(.95)}
.tab-panel .cmd-row .cmd-btn.ok{background:var(--green)}
.tab-panel .cmd-row .open-btn{height:36px;padding:0 14px;background:transparent;color:var(--blue);border:1px solid var(--blue);border-radius:6px;cursor:pointer;font-size:.8rem;font-weight:600;white-space:nowrap;transition:all .12s}
.tab-panel .cmd-row .open-btn:hover{background:#dbeafe}
.node-bar{display:flex;gap:12px;margin-bottom:24px;flex-wrap:wrap;align-items:center}
.node-bar label{font-size:.88rem;color:var(--sub);font-weight:500;white-space:nowrap}
.node-bar select{height:40px;padding:0 12px;background:var(--card);border:1px solid var(--bdr);border-radius:8px;font-size:.88rem;color:var(--text);cursor:pointer;min-width:200px}
.node-bar .speed-btn{height:40px;padding:0 16px;background:var(--card);border:1px solid var(--bdr);border-radius:8px;cursor:pointer;font-size:.85rem;color:var(--sub);display:flex;align-items:center;gap:6px;transition:all .15s}
.node-bar .speed-btn:hover{border-color:var(--accent);color:var(--text)}
.node-bar .speed-btn .dot{width:8px;height:8px;border-radius:50%;background:var(--green)}
.node-bar .speed-btn.testing .dot{background:#fbbf24;animation:pulse 1s infinite}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}
.stats{display:flex;gap:24px;flex-wrap:wrap;font-size:.85rem;color:var(--sub)}
.stats .item b{color:var(--text);font-weight:600}
.notice{background:#fef3c7;border:1px solid #fde68a;color:#92400e;padding:12px 16px;border-radius:8px;font-size:.85rem;margin-bottom:32px;display:flex;align-items:flex-start;gap:8px}
.notice .icon{flex-shrink:0;font-size:1.1rem;margin-top:1px}
[data-theme=dark] .notice{background:#422006;border-color:#854d0e;color:#fbbf24}
.section-title{font-size:1.2rem;font-weight:700;color:var(--text);margin-bottom:16px;padding-bottom:8px;border-bottom:1px solid var(--bdr)}
.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:12px;margin-bottom:32px}
.card{background:var(--card);border:1px solid var(--bdr);border-radius:10px;padding:16px;transition:border-color .2s,transform .15s;cursor:pointer}
.card:hover{border-color:var(--accent);transform:translateY(-2px)}
.card h3{font-size:.95rem;color:var(--text);margin-bottom:6px;display:flex;align-items:center;gap:8px}
.card h3 .emoji{font-size:1.1rem}
.card p{color:var(--sub);font-size:.82rem;margin-bottom:8px;line-height:1.5}
.code{background:var(--bg);border:1px solid var(--bdr);border-radius:6px;padding:8px 12px;font-family:'JetBrains Mono',monospace;font-size:.78rem;color:var(--green);overflow-x:auto;cursor:pointer;transition:border .2s;position:relative}
.code:hover{border-color:var(--accent)}
.code::after{content:'📋';position:absolute;top:4px;right:8px;font-size:.7rem;opacity:.4}
.code:hover::after{opacity:1}
.toast{position:fixed;bottom:24px;left:50%;transform:translateX(-50%);background:var(--green);color:#fff;padding:10px 24px;border-radius:8px;font-size:.88rem;font-weight:600;opacity:0;transition:opacity .3s;pointer-events:none;z-index:999}
.toast.show{opacity:1}
footer{border-top:1px solid var(--bdr);padding:24px 20px;text-align:center;color:var(--sub);font-size:.78rem;margin-top:40px}
footer a{color:var(--sub)}footer a:hover{color:var(--text)}
footer .links{display:flex;justify-content:center;gap:16px;margin-bottom:8px}
@media(max-width:640px){.hero h1{font-size:2rem}.input-row{flex-direction:column}.node-bar{flex-direction:column;align-items:stretch}.grid{grid-template-columns:1fr}}
</style>
</head>
<body>
<header>
  <div class="logo">
    <div class="icon"><svg viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg></div>
    <span>GitHub Proxy</span>
  </div>
  <nav>
    <a href="https://blog.aoterniu.online" target="_blank">博客</a>
    <a href="https://img.aoterniu.online" target="_blank">图床</a>
    <button class="theme-btn" onclick="toggleTheme()" title="切换主题">🌓</button>
  </nav>
</header>

<main>
  <div class="hero">
    <h1>GitHub <span>Proxy</span></h1>
    <p>支持 API、Git Clone、Releases、Archive、Raw、NPM、PyPI 等资源加速下载，提升开发体验。</p>
  </div>

  <div class="input-area">
    <div class="input-row">
      <input type="text" id="linkInput" placeholder="粘贴 GitHub / NPM / PyPI 链接，按回车转换" oninput="onInput()" onpaste="setTimeout(convertLink,100)" onkeydown="if(event.key==='Enter')convertLink()">
      <button class="clear-btn" id="clearBtn" onclick="clearInput()">✕</button>
      <button class="go-btn" id="goBtn" onclick="convertLink()" disabled>Go</button>
    </div>

    <div class="tabs" id="tabs">
      <button class="tab active" data-tab="git-clone" onclick="switchTab('git-clone')">Git Clone</button>
      <button class="tab" data-tab="wget-curl" onclick="switchTab('wget-curl')">Wget &amp; Curl</button>
      <button class="tab" data-tab="direct" onclick="switchTab('direct')">Direct Download</button>
    </div>

    <div class="tab-panels" id="tabPanels">
      <div class="tab-panel active" id="git-clone">
        <div class="cmd-row">
          <label>Git Clone</label>
          <input type="text" id="cmdGit" readonly>
          <button class="cmd-btn" onclick="copyCmd('cmdGit')">复制</button>
        </div>
      </div>
      <div class="tab-panel" id="wget-curl">
        <div class="cmd-row">
          <label>Wget</label>
          <input type="text" id="cmdWget" readonly>
          <button class="cmd-btn" onclick="copyCmd('cmdWget')">复制</button>
        </div>
        <div class="cmd-row">
          <label>Curl</label>
          <input type="text" id="cmdCurl" readonly>
          <button class="cmd-btn" onclick="copyCmd('cmdCurl')">复制</button>
        </div>
      </div>
      <div class="tab-panel" id="direct">
        <div class="cmd-row">
          <label>链接</label>
          <input type="text" id="cmdDirect" readonly>
          <button class="cmd-btn" onclick="copyCmd('cmdDirect')">复制</button>
          <button class="open-btn" onclick="window.open($('#cmdDirect').value,'_blank')">打开</button>
          <button class="open-btn" onclick="dlDirect()">下载 ZIP</button>
        </div>
      </div>
    </div>
    <div class="hint" style="margin-top:8px">💡 提示：输入文件链接直接下载，输入仓库地址可下载 ZIP 包（main 分支）</div>
  </div>
    <label>节点选择：</label>
    <select id="nodeSelect">
      <option value="gh.aoterniu.online" selected>gh.aoterniu.online（默认）</option>
    </select>
    <button class="speed-btn" id="speedBtn" onclick="testSpeed()">
      <span class="dot"></span>
      <span>节点测速</span>
    </button>
    <div class="stats">
      <div class="item">今日: <b id="todayCount">-</b></div>
      <div class="item">累计: <b id="totalCount">-</b></div>
    </div>
  </div>

  <div class="notice">
    <span class="icon">⚠️</span>
    <div>公益加速服务，请勿滥用。加速资源来自热心网友贡献，请合理使用。如遇问题请反馈至 <a href="https://github.com/aoterniu/gh-proxy/issues" target="_blank">GitHub Issues</a>。</div>
  </div>

  <h2 class="section-title">使用方式</h2>
  <div class="grid" id="cards"></div>
</main>

<div class="toast" id="toast"></div>

<footer>
  <div class="links">
    <a href="https://github.com/aoterniu/gh-proxy" target="_blank">GitHub</a>
    <a href="https://blog.aoterniu.online" target="_blank">技术笔记</a>
    <a href="https://img.aoterniu.online" target="_blank">图床</a>
  </div>
  gh 镜像加速 · gh.aoterniu.online · Powered by Cloudflare Workers · 公益免费 © 2026
</footer>

<script>
const $=s=>document.querySelector(s);
let currentDomain='gh.aoterniu.online';

// 主题切换
const prefersDark=window.matchMedia('(prefers-color-scheme:dark)').matches;
const savedTheme=localStorage.getItem('gh-theme');
document.documentElement.setAttribute('data-theme',savedTheme||(prefersDark?'dark':'light'));
function toggleTheme(){
  const t=document.documentElement.getAttribute('data-theme')==='dark'?'light':'dark';
  document.documentElement.setAttribute('data-theme',t);
  localStorage.setItem('gh-theme',t);
}

// 链接转换
function convertLink(){
  const input=$('#linkInput').value.trim();
  if(!input){showToast('请输入链接');return}
  const result=parseLink(input);
  if(!result){showToast('无法识别该链接');return}
  // 三个标签页统一使用 /https://github.com/... 格式
  const proxiedUrl='https://'+currentDomain+'/'+result.raw;
  updateTabs(proxiedUrl);
  fetch('/api/stats/increment',{method:'POST'}).catch(()=>{});
  loadStats();
}

// 标签页切换
function switchTab(id){
  document.querySelectorAll('.tabs .tab').forEach(t=>t.classList.toggle('active',t.dataset.tab===id));
  document.querySelectorAll('.tab-panels .tab-panel').forEach(p=>p.classList.toggle('active',p.id===id));
}

// 更新标签页内容
function updateTabs(url){
  $('#tabs').classList.add('show');
  $('#tabPanels').classList.add('show');
  $('#cmdGit').value='git clone '+url;
  $('#cmdWget').value='wget '+url;
  $('#cmdCurl').value='curl -O '+url;
  $('#cmdDirect').value=url;
}

// 清空输入框
function clearInput(){
  $('#linkInput').value='';
  $('#tabs').classList.remove('show');
  $('#tabPanels').classList.remove('show');
  $('#clearBtn').classList.remove('show');
  $('#goBtn').disabled=true;
  $('#linkInput').focus();
}

// 强制下载（智能识别仓库地址 → ZIP 下载）
function dlDirect(){
  const url=$('#cmdDirect').value;
  if(!url){showToast('请先输入链接');return}
  // 仓库地址自动转 ZIP 下载
  const repoMatch=url.match(new RegExp('github\\.com/([^/]+)/([^/]+?)(?:\\.git)?$'));
  const dlUrl=repoMatch?'https://gh.aoterniu.online/https://github.com/'+repoMatch[1]+'/'+repoMatch[2]+'/archive/refs/heads/main.zip':url;
  const a=document.createElement('a');a.href=dlUrl;a.download='';a.target='_blank';
  document.body.appendChild(a);a.click();document.body.removeChild(a);
}

// 输入框状态
function onInput(){
  const v=$('#linkInput').value.trim();
  $('#goBtn').disabled=!v;
  $('#clearBtn').classList.toggle('show',v.length>0);
}

function copyCmd(id){
  const el=$('#'+id);
  navigator.clipboard.writeText(el.value).then(()=>{
    const btn=el.nextElementSibling;btn.textContent='已复制 ✓';btn.classList.add('ok');showToast('✅ 已复制到剪贴板');
    setTimeout(()=>{btn.textContent='复制';btn.classList.remove('ok')},1500);
  });
}

function parseLink(input){
  const s=input.replace(new RegExp('^https?://'),'').replace('www.','');
  const host=currentDomain;
  if(s.startsWith('raw.githubusercontent.com/')){return{url:'https://'+host+'/raw/'+s.replace('raw.githubusercontent.com/',''),raw:'https://'+s,tag:'GitHub Raw',tagClass:'github',desc:'Raw 文件加速链接'}}
  const blob=s.match(new RegExp('^github\.com/([^/]+)/([^/]+)/blob/([^/]+)/(.+)$'));
  if(blob)return{url:'https://'+host+'/raw/'+blob[1]+'/'+blob[2]+'/'+blob[3]+'/'+blob[4],raw:'https://'+s,tag:'GitHub Raw',tagClass:'github',desc:'文件加速链接'};
  const rel=s.match(new RegExp('^github\.com/([^/]+)/([^/]+)/releases/download/(.+)$'));
  if(rel)return{url:'https://'+host+'/release/'+rel[1]+'/'+rel[2]+'/releases/download/'+rel[3],raw:'https://'+s,tag:'Release',tagClass:'github',desc:'Release 下载加速链接'};
  if(s.startsWith('api.github.com/'))return{url:'https://'+host+'/api/'+s.replace('api.github.com/',''),raw:'https://'+s,tag:'GitHub API',tagClass:'github',desc:'API 加速链接'};
  if(s.includes('registry.npmjs.org'))return{url:'https://'+host+'/npm/'+s.replace(/.*registry.npmjs.org/,''),raw:'https://'+s,tag:'NPM',tagClass:'npm',desc:'NPM 镜像链接'};
  const npm=s.match(new RegExp('npmjs\.com/package/([^/]+)'));if(npm)return{url:'https://'+host+'/npm/'+npm[1],raw:'https://'+s,tag:'NPM',tagClass:'npm',desc:'NPM 包镜像'};
  const pypi=s.match(new RegExp('pypi\.org/project/([^/]+)'));if(pypi)return{url:'https://'+host+'/pypi/simple/'+pypi[1]+'/',raw:'https://'+s,tag:'PyPI',tagClass:'pypi',desc:'PyPI 包镜像'};
  const clone=s.match(new RegExp('^github\.com/([^/]+)/([^/]+)/?$'));if(clone)return{url:'https://'+host+'/clone/'+clone[1]+'/'+clone[2],raw:'https://'+s,tag:'Git Clone',tagClass:'clone',desc:'Git Clone 加速'};
  if(s.startsWith('github.com/'))return{url:'https://'+host+'/'+s.replace('github.com/',''),raw:'https://'+s,tag:'GitHub',tagClass:'github',desc:'GitHub 加速'};
  return null;
}

function copyText(el){
  navigator.clipboard.writeText(el.textContent.replace(/📋$/,'').trim()).then(()=>{
    showToast('✅ 已复制到剪贴板');el.style.borderColor='var(--green)';setTimeout(()=>el.style.borderColor='',1000);
  });
}

function showToast(m){const t=$('#toast');t.textContent=m;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),2000)}

// 节点测速
async function testSpeed(){
  const btn=$('#speedBtn');btn.classList.add('testing');btn.querySelector('span:last-child').textContent='测速中...';
  const start=performance.now();
  try{await fetch('/api/ping',{cache:'no-store'});const ms=Math.round(performance.now()-start);
    btn.querySelector('span:last-child').textContent='延迟 '+ms+'ms';btn.classList.remove('testing');
    setTimeout(()=>btn.querySelector('span:last-child').textContent='节点测速',3000);
  }catch{btn.querySelector('span:last-child').textContent='超时';btn.classList.remove('testing');setTimeout(()=>btn.querySelector('span:last-child').textContent='节点测速',3000)}
}

// 统计
async function loadStats(){try{const d=await(await fetch('/api/stats')).json();$('#todayCount').textContent=d.today||0;$('#totalCount').textContent=d.total||0}catch{}}

// 卡片数据
const cards=[
  {emoji:'📦',title:'NPM 镜像',desc:'替代 registry.npmjs.org',code:'npm config set registry https://gh.aoterniu.online/npm/'},
  {emoji:'🐍',title:'PyPI 镜像',desc:'替代 pypi.org',code:'pip config set global.index-url https://gh.aoterniu.online/pypi/simple/'},
  {emoji:'📄',title:'GitHub Raw',desc:'raw.githubusercontent.com 加速',code:'https://gh.aoterniu.online/raw/user/repo/branch/path'},
  {emoji:'⬇️',title:'Release 下载',desc:'GitHub Release 文件加速',code:'https://gh.aoterniu.online/release/user/repo/releases/download/tag/file'},
  {emoji:'🔗',title:'GitHub API',desc:'api.github.com 加速',code:'https://gh.aoterniu.online/api/repos/user/repo'},
  {emoji:'🔀',title:'Git Clone',desc:'git clone 加速',code:'git clone https://gh.aoterniu.online/clone/user/repo'},
];
$('#cards').innerHTML=cards.map(c=>'<div class="card"><h3><span class="emoji">'+c.emoji+'</span>'+c.title+'</h3><p>'+c.desc+'</p><div class="code" onclick="copyText(this)">'+c.code+'</div></div>').join('');

loadStats();
</script>
</body>
</html>`;

function cors(origin){return{'Access-Control-Allow-Origin':origin||'*','Access-Control-Allow-Methods':'GET,POST,PUT,DELETE,OPTIONS','Access-Control-Allow-Headers':'*'}}
async function proxyUpstream(url,request,extraHeaders={}){const headers=new Headers();for(const[key,value]of request.headers){if(!['host','origin','referer'].includes(key.toLowerCase()))headers.set(key,value)}Object.entries(extraHeaders).forEach(([k,v])=>headers.set(k,v));const response=await fetch(new Request(url,{method:request.method,headers,body:request.method!=='GET'&&request.method!=='HEAD'?request.body:undefined}));const rh=new Headers(response.headers);rh.set('Access-Control-Allow-Origin','*');rh.set('Access-Control-Allow-Methods','GET,POST,PUT,DELETE,OPTIONS');rh.set('Access-Control-Allow-Headers','*');return new Response(response.body,{status:response.status,statusText:response.statusText,headers:rh})}
async function incrementStats(env){try{const today=new Date().toISOString().slice(0,10);const t=parseInt(await env.STATS.get('total')||'0')+1;const d=parseInt(await env.STATS.get('day_'+today)||'0')+1;await Promise.all([env.STATS.put('total',String(t)),env.STATS.put('day_'+today,String(d))])}catch(e){}}
async function getStats(env){try{const today=new Date().toISOString().slice(0,10);return{total:parseInt(await env.STATS.get('total')||'0'),today:parseInt(await env.STATS.get('day_'+today)||'0')}}catch{return{total:0,today:0}}}

export default{async fetch(request,env){const url=new URL(request.url);const origin=request.headers.get('Origin')||'*';const path=url.pathname;if(request.method==='OPTIONS')return new Response(null,{headers:cors(origin)});if(path==='/'||path==='')return new Response(HOMEPAGE,{headers:{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-cache'}});if(path==='/api/ping')return Response.json({ok:true,timestamp:Date.now()},{headers:cors(origin)});if(path==='/api/stats'&&request.method==='GET'){const s=await getStats(env);return Response.json(s,{headers:cors(origin)})}if(path==='/api/stats/increment'&&request.method==='POST'){await incrementStats(env);return Response.json({ok:true},{headers:cors(origin)})}if(path.startsWith('/npm/')){await incrementStats(env);return proxyUpstream('https://registry.npmmirror.com'+path.slice(4)+url.search,request)}if(path.startsWith('/pypi/')){await incrementStats(env);return proxyUpstream('https://mirrors.aliyun.com/pypi'+path.slice(5)+url.search,request)}if(path.startsWith('/raw/')){await incrementStats(env);return proxyUpstream('https://raw.githubusercontent.com/'+path.slice(5)+url.search,request)}if(path.startsWith('/release/')){await incrementStats(env);return proxyUpstream('https://github.com/'+path.slice(9)+url.search,request,{'User-Agent':'Mozilla/5.0'})}if(path.startsWith('/api/')&&!path.startsWith('/api/ping')&&!path.startsWith('/api/stats')){await incrementStats(env);return proxyUpstream('https://api.github.com/'+path.slice(5)+url.search,request,{'User-Agent':'gh-proxy/1.0','Accept':'application/vnd.github.v3+json'})}if(path.startsWith('/clone/')){await incrementStats(env);const gp=path.slice(7).endsWith('.git')?path.slice(7):path.slice(7)+'.git';return proxyUpstream('https://github.com/'+gp+url.search,request,{'User-Agent':'git/2.40.0'})}if(path.startsWith('/github.com/')||path.startsWith('/githubusercontent.com/')){const d=path.startsWith('/github.com/')?'github.com':'raw.githubusercontent.com';return proxyUpstream('https://'+d+'/'+path.replace('/'+d+'/','')+url.search,request,{'User-Agent':'Mozilla/5.0'})}if(path.startsWith('/pages/')){const p=path.slice(7).split('/');if(p.length>=2)return proxyUpstream('https://'+p[0]+'.github.io/'+p[1]+'/'+p.slice(2).join('/')+url.search,request)}if(path.match(/^\/[^\/]+\/[^\/]+\/(blob|raw)\/[^\/]+\//)){const p=path.slice(1).split('/');const[u,r,t,b]=p;const f=p.slice(4).join('/');if(t==='raw')await incrementStats(env);const target=t==='raw'?'https://raw.githubusercontent.com/'+u+'/'+r+'/'+b+'/'+f+url.search:'https://github.com/'+u+'/'+r+'/blob/'+b+'/'+f+url.search;return proxyUpstream(target,request,t!=='raw'?{'User-Agent':'Mozilla/5.0'}:{})}
// /https://github.com/... 通用代理（支持 Git Clone、Wget、Curl、直接下载）
if(path.startsWith('/https://')||path.startsWith('/http://')){await incrementStats(env);const targetUrl=path.substring(1);const extra=targetUrl.includes('raw.githubusercontent.com')?{}:{'User-Agent':'Mozilla/5.0'};return proxyUpstream(targetUrl+url.search,request,extra)}
return new Response(HOMEPAGE,{headers:{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-cache'}})}};
