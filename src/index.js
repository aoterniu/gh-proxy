/**
 * gh-proxy v3 — 全链路加速镜像站
 * 节点状态 · 统计 · 公益提示 · Release 列表 · 一键转换
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
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','PingFang SC','Microsoft YaHei',sans-serif;background:#0d1117;color:#c9d1d9;min-height:100vh;line-height:1.6}
a{color:#58a6ff;text-decoration:none}a:hover{text-decoration:underline}
:root{--bg:#0d1117;--card:#161b22;--bdr:#30363d;--text:#c9d1d9;--sub:#8b949e;--blue:#58a6ff;--green:#3fb950;--purple:#bc8cff;--orange:#f78166;--accent:#58a6ff}
.navbar{background:#161b22;border-bottom:1px solid var(--bdr);position:sticky;top:0;z-index:100;height:56px;display:flex;align-items:center;padding:0 24px}
.navbar .logo{font-size:1.15rem;font-weight:700;display:flex;align-items:center;gap:8px}
.navbar .logo span{background:linear-gradient(135deg,var(--blue),var(--purple));-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.navbar .nav{margin-left:auto;display:flex;gap:18px;font-size:.88rem}
.navbar .nav a{color:var(--sub);font-weight:500;padding:4px 0;border-bottom:2px solid transparent;transition:all .2s}
.navbar .nav a:hover{color:var(--blue);border-bottom-color:var(--blue);text-decoration:none}
.hero{background:linear-gradient(180deg,#161b22 0%,var(--bg) 100%);padding:60px 20px 40px;text-align:center}
.hero h1{font-size:2.4rem;font-weight:800;margin-bottom:12px;background:linear-gradient(135deg,var(--blue),var(--purple),var(--orange));-webkit-background-clip:text;-webkit-text-fill-color:transparent;line-height:1.2}
.hero .sub{font-size:1.1rem;color:var(--sub);margin-bottom:8px}
.hero .tags{display:flex;justify-content:center;gap:10px;margin-top:14px;flex-wrap:wrap}
.hero .tag{background:#1f6feb22;color:var(--blue);font-size:.78rem;padding:4px 12px;border-radius:99px}
.status-bar{background:#161b22;border-bottom:1px solid var(--bdr);padding:12px 20px;display:flex;justify-content:center;gap:32px;flex-wrap:wrap;font-size:.85rem}
.status-bar .item{display:flex;align-items:center;gap:6px;color:var(--sub)}
.status-bar .item .dot{width:8px;height:8px;border-radius:50%;flex-shrink:0}
.status-bar .item .dot.green{background:var(--green);box-shadow:0 0 6px var(--green)}
.status-bar .item b{color:var(--text);font-weight:600}
.notice{background:#d2992222;border:1px solid #d2992244;color:#d29922;padding:10px 20px;text-align:center;font-size:.85rem;max-width:800px;margin:16px auto 0;border-radius:8px}
.converter{max-width:720px;margin:0 auto;padding:0 20px 32px}
.converter-box{background:var(--card);border:1px solid var(--bdr);border-radius:12px;padding:20px}
.converter-box h2{font-size:1rem;color:var(--text);margin-bottom:12px;display:flex;align-items:center;gap:8px}
.input-row{display:flex;gap:10px;margin-bottom:12px;position:relative}
.input-row input{flex:1;background:var(--bg);border:1px solid var(--bdr);border-radius:8px;padding:12px 40px 12px 16px;color:var(--text);font-size:.95rem;outline:none;font-family:'JetBrains Mono',monospace;transition:border .2s}
.input-row input:focus{border-color:var(--blue)}
.input-row input::placeholder{color:#484f58}
.input-row .go-btn{padding:12px 28px;background:linear-gradient(135deg,var(--blue),var(--purple));color:#fff;border:none;border-radius:8px;cursor:pointer;font-weight:700;font-size:1rem;transition:all .15s;white-space:nowrap}
.input-row .go-btn:hover{opacity:.9;transform:translateY(-1px)}
.input-row .go-btn:active{transform:scale(.97)}
.input-row .clear-btn{position:absolute;right:140px;top:50%;transform:translateY(-50%);background:none;border:none;color:var(--sub);cursor:pointer;font-size:1.1rem;display:none;padding:4px 8px}
.input-row .clear-btn.show{display:block}
.hint{font-size:.78rem;color:#484f58;margin-top:8px}
.result-box{display:none;background:var(--bg);border:1px solid var(--bdr);border-radius:8px;padding:14px;margin-top:12px}
.result-box.show{display:block}
.result-box .label{font-size:.78rem;color:var(--sub);margin-bottom:4px}
.result-box .link-row{display:flex;gap:8px;align-items:center}
.result-box .link-row input{flex:1;background:var(--card);border:1px solid var(--bdr);border-radius:6px;padding:8px 12px;color:var(--green);font-size:.85rem;font-family:'JetBrains Mono',monospace}
.result-box .link-row .copy-btn{padding:8px 16px;background:var(--green);color:var(--bg);border:none;border-radius:6px;cursor:pointer;font-weight:700;font-size:.82rem;transition:all .12s;white-space:nowrap}
.result-box .link-row .copy-btn:active{transform:scale(.95)}
.result-box .link-row .copy-btn.ok{background:#2ea043}
.result-box .type-tag{display:inline-block;margin-bottom:8px;font-size:.72rem;padding:2px 10px;border-radius:99px;font-weight:600}
.result-box .type-tag.github{background:#1f6feb22;color:var(--blue)}
.result-box .type-tag.npm{background:#23863622;color:var(--green)}
.result-box .type-tag.pypi{background:#d2992222;color:var(--orange)}
.result-box .type-tag.clone{background:#8957e522;color:var(--purple)}
.container{max-width:1000px;margin:0 auto;padding:0 20px 60px}
.section-title{font-size:1.3rem;font-weight:700;color:var(--text);margin-bottom:20px;padding-bottom:10px;border-bottom:1px solid var(--bdr)}
.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:16px}
.card{background:var(--card);border:1px solid var(--bdr);border-radius:12px;padding:20px;transition:border-color .2s,transform .15s}
.card:hover{border-color:var(--blue);transform:translateY(-2px)}
.card h3{font-size:1.05rem;color:var(--text);margin-bottom:8px;display:flex;align-items:center;gap:8px}
.card h3 .icon{width:32px;height:32px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:1.1rem;flex-shrink:0}
.card p{color:var(--sub);font-size:.88rem;margin-bottom:12px}
.code{background:var(--bg);border:1px solid var(--bdr);border-radius:6px;padding:10px 14px;font-family:'JetBrains Mono',monospace;font-size:.8rem;color:var(--green);overflow-x:auto;cursor:pointer;position:relative;transition:border .2s}
.code:hover{border-color:var(--blue)}
.code::after{content:'📋';position:absolute;top:6px;right:8px;font-size:.75rem;opacity:.5}
.code:hover::after{opacity:1}
.features{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:16px;margin-top:20px}
.feature{background:var(--card);border:1px solid var(--bdr);border-radius:10px;padding:16px;text-align:center}
.feature .icon{font-size:1.6rem;margin-bottom:8px}
.feature h4{font-size:.9rem;color:var(--text);margin-bottom:4px}
.feature p{font-size:.78rem;color:var(--sub)}
.toast{position:fixed;bottom:24px;left:50%;transform:translateX(-50%);background:var(--green);color:var(--bg);padding:10px 24px;border-radius:8px;font-size:.88rem;font-weight:600;opacity:0;transition:opacity .3s;pointer-events:none;z-index:999}
.toast.show{opacity:1}
footer{background:#161b22;border-top:1px solid var(--bdr);padding:40px 20px 24px;margin-top:40px}
.footer-grid{max-width:1000px;margin:0 auto;display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:24px}
.footer-col h4{font-size:.88rem;color:var(--text);margin-bottom:12px}
.footer-col a{display:block;color:var(--sub);font-size:.82rem;padding:3px 0;transition:color .15s}
.footer-col a:hover{color:var(--blue);text-decoration:none}
.footer-col p{color:var(--sub);font-size:.82rem;line-height:1.6}
.footer-bottom{text-align:center;padding-top:24px;margin-top:24px;border-top:1px solid var(--bdr);color:#484f58;font-size:.75rem}
@media(max-width:640px){.hero h1{font-size:1.7rem}.navbar{padding:0 12px}.navbar .nav{gap:12px;font-size:.8rem}.input-row{flex-direction:column}.grid{grid-template-columns:1fr}.container{padding:0 12px 40px}.status-bar{gap:16px;font-size:.78rem}.footer-grid{grid-template-columns:1fr 1fr}}
</style>
</head>
<body>
<nav class="navbar">
  <div class="logo">⚡ <span>gh 镜像加速</span></div>
  <div class="nav">
    <a href="#converter">转换</a>
    <a href="#services">服务</a>
    <a href="https://github.com/aoterniu/gh-proxy" target="_blank">GitHub</a>
    <a href="https://blog.aoterniu.online" target="_blank">博客</a>
  </div>
</nav>

<div class="status-bar">
  <div class="item"><span class="dot green"></span> 当前节点：<b>Cloudflare 全球节点</b> 🟢 正常</div>
  <div class="item">延迟：<b id="latency">-</b></div>
  <div class="item">今日加速：<b id="todayCount">-</b> 次</div>
  <div class="item">累计加速：<b id="totalCount">-</b> 次</div>
</div>

<div class="hero">
  <h1>全链路加速镜像站</h1>
  <p class="sub">GitHub · NPM · PyPI · 一行命令加速你的开发</p>
  <div class="tags">
    <span class="tag">⚡ 全球 CDN</span>
    <span class="tag">🔒 安全可靠</span>
    <span class="tag">🆓 完全免费</span>
    <span class="tag">📦 多协议支持</span>
  </div>
</div>

<div class="notice">
  ⚠️ 公益服务，请勿滥用。加速资源来自 Cloudflare 免费额度，感谢支持！如遇问题请反馈至 GitHub Issues。
</div>

<div class="converter" id="converter">
  <div class="converter-box">
    <h2>🔗 链接一键转换</h2>
    <div class="input-row">
      <input type="text" id="linkInput" placeholder="粘贴 GitHub / NPM / PyPI 链接..." oninput="toggleClear()" onkeydown="if(event.key==='Enter')convertLink()">
      <button class="clear-btn" id="clearBtn" onclick="clearInput()">✕</button>
      <button class="go-btn" onclick="convertLink()">加速 →</button>
    </div>
    <div class="hint">支持：GitHub 文件 / Release / API / Clone · NPM 包 · PyPI 包 · 任意 GitHub 链接</div>
    <div class="result-box" id="resultBox">
      <span class="type-tag" id="typeTag"></span>
      <div class="label" id="resultLabel">加速链接</div>
      <div class="link-row">
        <input type="text" id="resultLink" readonly>
        <button class="copy-btn" id="copyBtn" onclick="copyResult()">复制</button>
      </div>
    </div>
  </div>
</div>

<div class="container" id="services">
  <h2 class="section-title">支持的服务</h2>
  <div class="grid">
    <div class="card">
      <h3><span class="icon" style="background:#23863622">📦</span> NPM 镜像</h3>
      <p>替代 registry.npmjs.org，国内极速安装</p>
      <div class="code">npm config set registry https://gh.aoterniu.online/npm/</div>
      <div class="code" style="margin-top:8px">yarn config set registry https://gh.aoterniu.online/npm/</div>
    </div>
    <div class="card">
      <h3><span class="icon" style="background:#d2992222">🐍</span> PyPI 镜像</h3>
      <p>替代 pypi.org，Python 包极速安装</p>
      <div class="code">pip install -i https://gh.aoterniu.online/pypi/simple/ requests</div>
      <div class="code" style="margin-top:8px">pip config set global.index-url https://gh.aoterniu.online/pypi/simple/</div>
    </div>
    <div class="card">
      <h3><span class="icon" style="background:#1f6feb22">📄</span> GitHub Raw 加速</h3>
      <p>加速 raw.githubusercontent.com 文件访问</p>
      <div class="code">https://gh.aoterniu.online/raw/user/repo/branch/path</div>
    </div>
    <div class="card">
      <h3><span class="icon" style="background:#8957e522">⬇️</span> Release 下载加速</h3>
      <p>加速 GitHub Release 文件下载</p>
      <div class="code">https://gh.aoterniu.online/release/user/repo/releases/download/tag/file</div>
    </div>
    <div class="card">
      <h3><span class="icon" style="background:#f7816622">🔗</span> GitHub API 加速</h3>
      <p>加速 api.github.com 请求</p>
      <div class="code">https://gh.aoterniu.online/api/repos/user/repo</div>
    </div>
    <div class="card">
      <h3><span class="icon" style="background:#3fb95022">🔀</span> Git Clone 加速</h3>
      <p>加速 git clone 操作</p>
      <div class="code">git clone https://gh.aoterniu.online/clone/user/repo</div>
    </div>
  </div>
  <div class="features" style="margin-top:32px">
    <div class="feature"><div class="icon">⚡</div><h4>全球 CDN</h4><p>Cloudflare 边缘节点加速</p></div>
    <div class="feature"><div class="icon">🔒</div><h4>安全可靠</h4><p>全程 HTTPS 加密传输</p></div>
    <div class="feature"><div class="icon">🆓</div><h4>完全免费</h4><p>公益项目，永久免费使用</p></div>
    <div class="feature"><div class="icon">📦</div><h4>多协议支持</h4><p>HTTP/HTTPS/Git 协议全覆盖</p></div>
  </div>
</div>

<div class="toast" id="toast">✅ 已复制到剪贴板</div>

<footer>
  <div class="footer-grid">
    <div class="footer-col">
      <h4>gh 镜像加速</h4>
      <p>全链路开发加速服务，支持 GitHub、NPM、PyPI 等资源加速。基于 Cloudflare Workers 构建，全球 CDN 加速。</p>
    </div>
    <div class="footer-col">
      <h4>友情链接</h4>
      <a href="https://blog.aoterniu.online" target="_blank">ao 技术笔记</a>
      <a href="https://img.aoterniu.online" target="_blank">ao 图床</a>
    </div>
    <div class="footer-col">
      <h4>相关资源</h4>
      <a href="https://github.com/aoterniu/gh-proxy" target="_blank">GitHub 仓库</a>
      <a href="https://developers.cloudflare.com/workers/" target="_blank">Cloudflare Workers</a>
      <a href="https://github.com" target="_blank">GitHub</a>
    </div>
    <div class="footer-col">
      <h4>免责声明</h4>
      <p>本服务为公益项目，仅供学习交流使用。请勿用于非法用途。加速资源版权归原作者所有。</p>
    </div>
  </div>
  <div class="footer-bottom">
    gh 镜像加速 · gh.aoterniu.online · Powered by Cloudflare Workers · 公益免费 © 2026
  </div>
</footer>

<script>
function $$(s){return document.querySelector(s)}
const $=$$;

// 链接一键转换
function convertLink(){
  const input=$('#linkInput').value.trim();
  if(!input){showToast('请粘贴链接');return}
  const result=parseLink(input);
  if(!result){showToast('无法识别该链接，请检查格式');return}
  $('#resultBox').classList.add('show');
  const tag=$('#typeTag');tag.textContent=result.tag;tag.className='type-tag '+result.tagClass;
  $('#resultLabel').textContent=result.desc;
  $('#resultLink').value=result.url;
  // 统计
  fetch('/api/stats/increment',{method:'POST'}).catch(()=>{});
}

function parseLink(input){
  const s=input.replace(/^https?:\\/\\//,'').replace(/www\\./,'');
  if(s.startsWith('raw.githubusercontent.com/')){
    const path=s.replace('raw.githubusercontent.com/','');
    return{url:'https://gh.aoterniu.online/raw/'+path,tag:'GitHub Raw',tagClass:'github',desc:'Raw 文件加速链接'};
  }
  const blobMatch=s.match(/^github\\.com\\/([^/]+)\\/([^/]+)\\/blob\\/([^/]+)\\/(.+)$/);
  if(blobMatch)return{url:'https://gh.aoterniu.online/raw/'+blobMatch[1]+'/'+blobMatch[2]+'/'+blobMatch[3]+'/'+blobMatch[4],tag:'GitHub Raw',tagClass:'github',desc:'文件加速链接'};
  const releaseMatch=s.match(/^github\\.com\\/([^/]+)\\/([^/]+)\\/releases\\/download\\/(.+)$/);
  if(releaseMatch)return{url:'https://gh.aoterniu.online/release/'+releaseMatch[1]+'/'+releaseMatch[2]+'/releases/download/'+releaseMatch[3],tag:'Release',tagClass:'github',desc:'Release 下载加速链接'};
  if(s.startsWith('api.github.com/')){const path=s.replace('api.github.com/','');return{url:'https://gh.aoterniu.online/api/'+path,tag:'GitHub API',tagClass:'github',desc:'API 加速链接'}}
  if(s.includes('registry.npmjs.org')){const path=s.replace(/.*registry\\.npmjs\\.org/,'');return{url:'https://gh.aoterniu.online/npm/'+path,tag:'NPM',tagClass:'npm',desc:'NPM 镜像链接'}}
  const npmPkg=s.match(/(?:www\\.)?npmjs\\.com\\/package\\/([^/]+)/);
  if(npmPkg)return{url:'https://gh.aoterniu.online/npm/'+npmPkg[1],tag:'NPM',tagClass:'npm',desc:'NPM 包镜像链接'};
  const pypiPkg=s.match(/pypi\\.org\\/project\\/([^/]+)/);
  if(pypiPkg)return{url:'https://gh.aoterniu.online/pypi/simple/'+pypiPkg[1]+'/',tag:'PyPI',tagClass:'pypi',desc:'PyPI 镜像链接'};
  const cloneMatch=s.match(/^github\\.com\\/([^/]+)\\/([^/]+)\\/?$/);
  if(cloneMatch)return{url:'https://gh.aoterniu.online/clone/'+cloneMatch[1]+'/'+cloneMatch[2],tag:'Git Clone',tagClass:'clone',desc:'Git Clone 加速链接'};
  const pagesMatch=s.match(/^([^.]+)\\.github\\.io\\/([^/]+)\\/?(.*)$/);
  if(pagesMatch)return{url:'https://gh.aoterniu.online/pages/'+pagesMatch[1]+'/'+pagesMatch[2]+'/'+(pagesMatch[3]||''),tag:'GitHub Pages',tagClass:'github',desc:'Pages 加速链接'};
  if(s.startsWith('github.com/')){const path=s.replace('github.com/','');return{url:'https://gh.aoterniu.online/'+path,tag:'GitHub',tagClass:'github',desc:'GitHub 加速链接'}}
  return null;
}

function copyResult(){
  navigator.clipboard.writeText($('#resultLink').value).then(()=>{
    const btn=$('#copyBtn');btn.textContent='已复制 ✓';btn.classList.add('ok');showToast('✅ 已复制到剪贴板');
    setTimeout(()=>{btn.textContent='复制';btn.classList.remove('ok')},1500);
  });
}

function copyText(el){
  const text=el.textContent.replace(/[\\u200B-\\u200D\\uFEFF]/g,'').replace(/📋$/,'').trim();
  navigator.clipboard.writeText(text).then(()=>{showToast('✅ 已复制到剪贴板');el.style.borderColor='var(--green)';setTimeout(()=>el.style.borderColor='',1000)});
}

function showToast(msg){const t=$('#toast');t.textContent=msg;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),2000)}
function toggleClear(){const v=$('#linkInput').value;$('#clearBtn').classList.toggle('show',v.length>0)}
function clearInput(){$('#linkInput').value='';$('#resultBox').classList.remove('show');$('#clearBtn').classList.remove('show');$('#linkInput').focus()}

// 节点延迟测速
async function measureLatency(){
  const start=performance.now();
  try{await fetch('/api/ping',{method:'GET',cache:'no-store'});const latency=Math.round(performance.now()-start);$('#latency').textContent=latency+'ms'}
  catch{$('#latency').textContent='超时'}
}

// 加载统计数据
async function loadStats(){
  try{const r=await fetch('/api/stats');const d=await r.json();$('#todayCount').textContent=d.today||0;$('#totalCount').textContent=d.total||0}
  catch{$('#todayCount').textContent='-';$('#totalCount').textContent='-'}
}

document.querySelectorAll('.code').forEach(el=>el.addEventListener('click',()=>copyText(el)));
measureLatency();loadStats();
setInterval(loadStats,60000);
</script>
</body>
</html>`;

function cors(origin) {
  return { 'Access-Control-Allow-Origin': origin || '*', 'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS', 'Access-Control-Allow-Headers': '*' };
}

async function proxyUpstream(url, request, extraHeaders = {}) {
  const headers = new Headers();
  for (const [key, value] of request.headers) {
    if (!['host', 'origin', 'referer'].includes(key.toLowerCase())) headers.set(key, value);
  }
  Object.entries(extraHeaders).forEach(([k, v]) => headers.set(k, v));
  const response = await fetch(new Request(url, { method: request.method, headers, body: request.method !== 'GET' && request.method !== 'HEAD' ? request.body : undefined }));
  const responseHeaders = new Headers(response.headers);
  responseHeaders.set('Access-Control-Allow-Origin', '*');
  responseHeaders.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  responseHeaders.set('Access-Control-Allow-Headers', '*');
  return new Response(response.body, { status: response.status, statusText: response.statusText, headers: responseHeaders });
}

// 统计 KV
async function incrementStats(env) {
  try {
    const today = new Date().toISOString().slice(0, 10);
    const total = parseInt(await env.STATS.get('total') || '0') + 1;
    const todayCount = parseInt(await env.STATS.get('day_' + today) || '0') + 1;
    await Promise.all([env.STATS.put('total', String(total)), env.STATS.put('day_' + today, String(todayCount))]);
  } catch (e) {}
}

async function getStats(env) {
  try {
    const today = new Date().toISOString().slice(0, 10);
    return { total: parseInt(await env.STATS.get('total') || '0'), today: parseInt(await env.STATS.get('day_' + today) || '0') };
  } catch { return { total: 0, today: 0 }; }
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const origin = request.headers.get('Origin') || '*';
    const path = url.pathname;

    if (request.method === 'OPTIONS') return new Response(null, { headers: cors(origin) });

    // 首页
    if (path === '/' || path === '') return new Response(HOMEPAGE, { headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-cache' } });

    // Ping（延迟测试）
    if (path === '/api/ping') return Response.json({ ok: true, timestamp: Date.now() }, { headers: cors(origin) });

    // 统计接口
    if (path === '/api/stats' && request.method === 'GET') {
      const s = await getStats(env);
      return Response.json(s, { headers: cors(origin) });
    }

    // 统计递增
    if (path === '/api/stats/increment' && request.method === 'POST') {
      await incrementStats(env);
      return Response.json({ ok: true }, { headers: cors(origin) });
    }

    // NPM 镜像
    if (path.startsWith('/npm/')) {
      await incrementStats(env);
      return proxyUpstream(`https://registry.npmmirror.com${path.slice(4)}${url.search}`, request);
    }

    // PyPI 镜像
    if (path.startsWith('/pypi/')) {
      await incrementStats(env);
      return proxyUpstream(`https://mirrors.aliyun.com/pypi${path.slice(5)}${url.search}`, request);
    }

    // GitHub Raw
    if (path.startsWith('/raw/')) {
      await incrementStats(env);
      return proxyUpstream(`https://raw.githubusercontent.com/${path.slice(5)}${url.search}`, request);
    }

    // GitHub Release
    if (path.startsWith('/release/')) {
      await incrementStats(env);
      return proxyUpstream(`https://github.com/${path.slice(9)}${url.search}`, request, { 'User-Agent': 'Mozilla/5.0' });
    }

    // GitHub API
    if (path.startsWith('/api/') && !path.startsWith('/api/ping') && !path.startsWith('/api/stats')) {
      await incrementStats(env);
      return proxyUpstream(`https://api.github.com/${path.slice(5)}${url.search}`, request, { 'User-Agent': 'gh-proxy/1.0', 'Accept': 'application/vnd.github.v3+json' });
    }

    // Git Clone
    if (path.startsWith('/clone/')) {
      await incrementStats(env);
      const gitPath = path.slice(7).endsWith('.git') ? path.slice(7) : path.slice(7) + '.git';
      return proxyUpstream(`https://github.com/${gitPath}${url.search}`, request, { 'User-Agent': 'git/2.40.0' });
    }

    // GitHub 网页
    if (path.startsWith('/github.com/') || path.startsWith('/githubusercontent.com/')) {
      const domain = path.startsWith('/github.com/') ? 'github.com' : 'raw.githubusercontent.com';
      return proxyUpstream(`https://${domain}/${path.replace(`/${domain}/`, '')}${url.search}`, request, { 'User-Agent': 'Mozilla/5.0' });
    }

    // GitHub Pages
    if (path.startsWith('/pages/')) {
      const parts = path.slice(7).split('/');
      if (parts.length >= 2) return proxyUpstream(`https://${parts[0]}.github.io/${parts[1]}/${parts.slice(2).join('/')}${url.search}`, request);
    }

    // 通用 GitHub 文件
    if (path.match(/^\/[^\/]+\/[^\/]+\/(blob|raw)\/[^\/]+\/.*/)) {
      const parts = path.slice(1).split('/');
      const [user, repo, type, branch] = parts;
      const filePath = parts.slice(4).join('/');
      if (type === 'raw') await incrementStats(env);
      const target = type === 'raw'
        ? `https://raw.githubusercontent.com/${user}/${repo}/${branch}/${filePath}${url.search}`
        : `https://github.com/${user}/${repo}/blob/${branch}/${filePath}${url.search}`;
      return proxyUpstream(target, request, type !== 'raw' ? { 'User-Agent': 'Mozilla/5.0' } : {});
    }

    return new Response(HOMEPAGE, { headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-cache' } });
  }
};
