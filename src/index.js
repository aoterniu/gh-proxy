/**
 * gh-proxy — 全链路加速镜像站 v2
 * NPM / PyPI / GitHub Raw / Release / API / Clone / 一键转换
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

/* 导航 */
.navbar{background:#161b22;border-bottom:1px solid var(--bdr);position:sticky;top:0;z-index:100;height:56px;display:flex;align-items:center;padding:0 24px}
.navbar .logo{font-size:1.15rem;font-weight:700;color:var(--blue);display:flex;align-items:center;gap:8px}
.navbar .logo span{background:linear-gradient(135deg,var(--blue),var(--purple));-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.navbar .nav{margin-left:auto;display:flex;gap:18px;font-size:.88rem}
.navbar .nav a{color:var(--sub);font-weight:500;padding:4px 0;border-bottom:2px solid transparent;transition:all .2s}
.navbar .nav a:hover{color:var(--blue);border-bottom-color:var(--blue);text-decoration:none}

/* Hero */
.hero{background:linear-gradient(180deg,#161b22 0%,var(--bg) 100%);padding:60px 20px 40px;text-align:center}
.hero h1{font-size:2.4rem;font-weight:800;margin-bottom:12px;background:linear-gradient(135deg,var(--blue),var(--purple),var(--orange));-webkit-background-clip:text;-webkit-text-fill-color:transparent;line-height:1.2}
.hero .sub{font-size:1.1rem;color:var(--sub);margin-bottom:8px}
.hero .tags{display:flex;justify-content:center;gap:10px;margin-top:14px;flex-wrap:wrap}
.hero .tag{background:#1f6feb22;color:var(--blue);font-size:.78rem;padding:4px 12px;border-radius:99px}

/* 转换器 */
.converter{max-width:720px;margin:0 auto;padding:0 20px 32px}
.converter-box{background:var(--card);border:1px solid var(--bdr);border-radius:12px;padding:20px}
.converter-box h2{font-size:1rem;color:var(--text);margin-bottom:12px;display:flex;align-items:center;gap:8px}
.input-row{display:flex;gap:10px;margin-bottom:12px}
.input-row input{flex:1;background:var(--bg);border:1px solid var(--bdr);border-radius:8px;padding:12px 16px;color:var(--text);font-size:.95rem;outline:none;font-family:'JetBrains Mono',monospace;transition:border .2s}
.input-row input:focus{border-color:var(--blue)}
.input-row input::placeholder{color:#484f58}
.input-row .go-btn{padding:12px 28px;background:linear-gradient(135deg,var(--blue),var(--purple));color:#fff;border:none;border-radius:8px;cursor:pointer;font-weight:700;font-size:1rem;transition:all .15s;white-space:nowrap}
.input-row .go-btn:hover{opacity:.9;transform:translateY(-1px)}
.input-row .go-btn:active{transform:scale(.97)}
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
.hint{font-size:.78rem;color:#484f58;margin-top:8px}

/* 功能卡片 */
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

/* 特性 */
.features{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:16px;margin-top:20px}
.feature{background:var(--card);border:1px solid var(--bdr);border-radius:10px;padding:16px;text-align:center}
.feature .icon{font-size:1.6rem;margin-bottom:8px}
.feature h4{font-size:.9rem;color:var(--text);margin-bottom:4px}
.feature p{font-size:.78rem;color:var(--sub)}

/* Toast */
.toast{position:fixed;bottom:24px;left:50%;transform:translateX(-50%);background:var(--green);color:var(--bg);padding:10px 24px;border-radius:8px;font-size:.88rem;font-weight:600;opacity:0;transition:opacity .3s;pointer-events:none;z-index:999}
.toast.show{opacity:1}

/* Footer */
footer{text-align:center;padding:32px 20px;color:#484f58;font-size:.78rem;border-top:1px solid var(--bdr);margin-top:40px}
footer .links{display:flex;justify-content:center;gap:20px;margin-bottom:10px;flex-wrap:wrap}
footer .links a{color:var(--sub);font-size:.82rem}

@media(max-width:640px){.hero h1{font-size:1.7rem}.navbar{padding:0 12px}.navbar .nav{gap:12px;font-size:.8rem}.input-row{flex-direction:column}.grid{grid-template-columns:1fr}.container{padding:0 12px 40px}}
</style>
</head>
<body>
<nav class="navbar">
  <div class="logo">⚡ <span>gh 镜像加速</span></div>
  <div class="nav">
    <a href="#converter">转换</a>
    <a href="#services">服务</a>
    <a href="https://blog.aoterniu.online" target="_blank">博客</a>
  </div>
</nav>

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

<div class="converter" id="converter">
  <div class="converter-box">
    <h2>🔗 链接一键转换</h2>
    <div class="input-row">
      <input type="text" id="linkInput" placeholder="粘贴 GitHub / NPM / PyPI 链接..." onkeydown="if(event.key==='Enter')convertLink()">
      <button class="go-btn" onclick="convertLink()">加速 →</button>
    </div>
    <div class="hint">支持：GitHub 文件/Release/API/Clone · NPM 包 · PyPI 包 · 任意 GitHub 链接</div>
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
      <div class="code" onclick="copyText(this)">npm config set registry https://gh.aoterniu.online/npm/</div>
      <div class="code" onclick="copyText(this)" style="margin-top:8px">yarn config set registry https://gh.aoterniu.online/npm/</div>
    </div>

    <div class="card">
      <h3><span class="icon" style="background:#d2992222">🐍</span> PyPI 镜像</h3>
      <p>替代 pypi.org，Python 包极速安装</p>
      <div class="code" onclick="copyText(this)">pip install -i https://gh.aoterniu.online/pypi/simple/ requests</div>
      <div class="code" onclick="copyText(this)" style="margin-top:8px">pip config set global.index-url https://gh.aoterniu.online/pypi/simple/</div>
    </div>

    <div class="card">
      <h3><span class="icon" style="background:#1f6feb22">📄</span> GitHub Raw 加速</h3>
      <p>加速 raw.githubusercontent.com 文件访问</p>
      <div class="code" onclick="copyText(this)">https://gh.aoterniu.online/raw/user/repo/branch/path</div>
    </div>

    <div class="card">
      <h3><span class="icon" style="background:#8957e522">⬇️</span> Release 下载加速</h3>
      <p>加速 GitHub Release 文件下载</p>
      <div class="code" onclick="copyText(this)">https://gh.aoterniu.online/release/user/repo/releases/download/tag/file</div>
    </div>

    <div class="card">
      <h3><span class="icon" style="background:#f7816622">🔗</span> GitHub API 加速</h3>
      <p>加速 api.github.com 请求</p>
      <div class="code" onclick="copyText(this)">https://gh.aoterniu.online/api/repos/user/repo</div>
    </div>

    <div class="card">
      <h3><span class="icon" style="background:#3fb95022">🔀</span> Git Clone 加速</h3>
      <p>加速 git clone 操作</p>
      <div class="code" onclick="copyText(this)">git clone https://gh.aoterniu.online/clone/user/repo</div>
    </div>

  </div>

  <div class="features" style="margin-top:32px">
    <div class="feature">
      <div class="icon">⚡</div>
      <h4>全球 CDN</h4>
      <p>Cloudflare 边缘节点加速</p>
    </div>
    <div class="feature">
      <div class="icon">🔒</div>
      <h4>安全可靠</h4>
      <p>全程 HTTPS 加密传输</p>
    </div>
    <div class="feature">
      <div class="icon">🆓</div>
      <h4>完全免费</h4>
      <p>公益项目，永久免费使用</p>
    </div>
    <div class="feature">
      <div class="icon">📦</div>
      <h4>多协议支持</h4>
      <p>HTTP/HTTPS/Git 协议全覆盖</p>
    </div>
  </div>
</div>

<div class="toast" id="toast">✅ 已复制到剪贴板</div>

<footer>
  <div class="links">
    <a href="https://github.com/aoterniu/gh-proxy" target="_blank">GitHub</a>
    <a href="https://blog.aoterniu.online" target="_blank">技术笔记</a>
    <a href="https://img.aoterniu.online" target="_blank">图床</a>
  </div>
  gh 镜像加速 · gh.aoterniu.online · Powered by Cloudflare Workers · 公益免费
</footer>

<script>
// 链接一键转换
function convertLink(){
  const input=$('#linkInput').value.trim();
  if(!input){showToast('请粘贴链接');return}
  const result=parseLink(input);
  if(!result){showToast('无法识别该链接，请检查格式');return}
  $('#resultBox').classList.add('show');
  const tag=$('#typeTag');
  tag.textContent=result.tag;tag.className='type-tag '+result.tagClass;
  $('#resultLabel').textContent=result.desc;
  $('#resultLink').value=result.url;
}

function parseLink(input){
  const s=input.replace(/^https?:\\/\\//,'').replace(/www\\./,'');

  // GitHub raw: raw.githubusercontent.com/user/repo/branch/path
  if(s.startsWith('raw.githubusercontent.com/')){
    const path=s.replace('raw.githubusercontent.com/','');
    return{url:'https://gh.aoterniu.online/raw/'+path,tag:'GitHub Raw',tagClass:'github',desc:'Raw 文件加速链接'};
  }

  // GitHub blob: github.com/user/repo/blob/branch/path → raw
  const blobMatch=s.match(/^github\\.com\\/([^/]+)\\/([^/]+)\\/blob\\/([^/]+)\\/(.+)$/);
  if(blobMatch){
    return{url:'https://gh.aoterniu.online/raw/'+blobMatch[1]+'/'+blobMatch[2]+'/'+blobMatch[3]+'/'+blobMatch[4],tag:'GitHub Raw',tagClass:'github',desc:'文件加速链接'};
  }

  // GitHub release: github.com/user/repo/releases/download/tag/file
  const releaseMatch=s.match(/^github\\.com\\/([^/]+)\\/([^/]+)\\/releases\\/download\\/(.+)$/);
  if(releaseMatch){
    return{url:'https://gh.aoterniu.online/release/'+releaseMatch[1]+'/'+releaseMatch[2]+'/releases/download/'+releaseMatch[3],tag:'Release',tagClass:'github',desc:'Release 下载加速链接'};
  }

  // GitHub API: api.github.com/...
  if(s.startsWith('api.github.com/')){
    const path=s.replace('api.github.com/','');
    return{url:'https://gh.aoterniu.online/api/'+path,tag:'GitHub API',tagClass:'github',desc:'API 加速链接'};
  }

  // NPM: registry.npmjs.org/... or npmjs.com/package/xxx
  if(s.includes('registry.npmjs.org')){
    const path=s.replace(/.*registry\\.npmjs\\.org/,'');
    return{url:'https://gh.aoterniu.online/npm/'+path,tag:'NPM',tagClass:'npm',desc:'NPM 镜像链接'};
  }
  if(s.match(/npmjs\\.com\\/package\\/([^/]+)/)){
    const pkg=s.match(/npmjs\\.com\\/package\\/([^/]+)/)[1];
    return{url:'https://gh.aoterniu.online/npm/'+pkg,tag:'NPM',tagClass:'npm',desc:'NPM 包镜像链接'};
  }
  if(s.match(/^(?:www\\.)?npmjs\\.com\\/package\\/([^/]+)/)){
    const pkg=s.match(/(?:www\\.)?npmjs\\.com\\/package\\/([^/]+)/)[1];
    return{url:'https://gh.aoterniu.online/npm/'+pkg,tag:'NPM',tagClass:'npm',desc:'NPM 包镜像链接'};
  }

  // PyPI: pypi.org/project/xxx
  if(s.match(/pypi\\.org\\/project\\/([^/]+)/)){
    const pkg=s.match(/pypi\\.org\\/project\\/([^/]+)/)[1];
    return{url:'https://gh.aoterniu.online/pypi/simple/'+pkg+'/',tag:'PyPI',tagClass:'pypi',desc:'PyPI 镜像链接'};
  }

  // GitHub clone: github.com/user/repo
  const cloneMatch=s.match(/^github\\.com\\/([^/]+)\\/([^/]+)\\/?$/);
  if(cloneMatch){
    return{url:'https://gh.aoterniu.online/clone/'+cloneMatch[1]+'/'+cloneMatch[2],tag:'Git Clone',tagClass:'clone',desc:'Git Clone 加速链接'};
  }

  // GitHub pages: user.github.io/repo
  const pagesMatch=s.match(/^([^.]+)\\.github\\.io\\/([^/]+)\\/?(.*)$/);
  if(pagesMatch){
    return{url:'https://gh.aoterniu.online/pages/'+pagesMatch[1]+'/'+pagesMatch[2]+'/'+(pagesMatch[3]||''),tag:'GitHub Pages',tagClass:'github',desc:'Pages 加速链接'};
  }

  // 通用 github.com 路径
  if(s.startsWith('github.com/')){
    const path=s.replace('github.com/','');
    return{url:'https://gh.aoterniu.online/'+path,tag:'GitHub',tagClass:'github',desc:'GitHub 加速链接'};
  }

  return null;
}

function copyResult(){
  const link=$('#resultLink').value;
  navigator.clipboard.writeText(link).then(()=>{
    const btn=$('#copyBtn');btn.textContent='已复制';btn.classList.add('ok');
    showToast('✅ 已复制到剪贴板');
    setTimeout(()=>{btn.textContent='复制';btn.classList.remove('ok')},1500);
  });
}

function copyText(el){
  const text=el.textContent.replace(/[\\u200B-\\u200D\\uFEFF]/g,'').replace(/📋$/,'').trim();
  navigator.clipboard.writeText(text).then(()=>{
    showToast('✅ 已复制到剪贴板');
    el.style.borderColor='var(--green)';setTimeout(()=>el.style.borderColor='',1000);
  });
}

function showToast(msg){
  const t=$('#toast');t.textContent=msg;t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'),2000);
}

function $$(s){return document.querySelector(s)}
const $=$$;

// 示例链接可点击
document.querySelectorAll('.code').forEach(el=>{
  el.addEventListener('click',()=>copyText(el));
});
</script>
</body>
</html>`;

function cors(origin) {
  return {
    'Access-Control-Allow-Origin': origin || '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': '*'
  };
}

async function proxyUpstream(url, request, extraHeaders = {}) {
  const headers = new Headers();
  for (const [key, value] of request.headers) {
    if (!['host', 'origin', 'referer'].includes(key.toLowerCase())) {
      headers.set(key, value);
    }
  }
  Object.entries(extraHeaders).forEach(([k, v]) => headers.set(k, v));

  const upstreamRequest = new Request(url, {
    method: request.method,
    headers,
    body: request.method !== 'GET' && request.method !== 'HEAD' ? request.body : undefined
  });

  const response = await fetch(upstreamRequest);
  const responseHeaders = new Headers(response.headers);
  responseHeaders.set('Access-Control-Allow-Origin', '*');
  responseHeaders.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  responseHeaders.set('Access-Control-Allow-Headers', '*');

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: responseHeaders
  });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const origin = request.headers.get('Origin') || '*';
    const path = url.pathname;

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: cors(origin) });
    }

    if (path === '/' || path === '') {
      return new Response(HOMEPAGE, { headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-cache' } });
    }

    // NPM 镜像
    if (path.startsWith('/npm/')) {
      const npmPath = path.slice(4);
      const target = `https://registry.npmmirror.com${npmPath}${url.search}`;
      return proxyUpstream(target, request);
    }

    // PyPI 镜像
    if (path.startsWith('/pypi/')) {
      const pypiPath = path.slice(5);
      const target = `https://mirrors.aliyun.com/pypi${pypiPath}${url.search}`;
      return proxyUpstream(target, request);
    }

    // GitHub Raw
    if (path.startsWith('/raw/')) {
      const rawPath = path.slice(5);
      const target = `https://raw.githubusercontent.com/${rawPath}${url.search}`;
      return proxyUpstream(target, request);
    }

    // GitHub Release
    if (path.startsWith('/release/')) {
      const releasePath = path.slice(9);
      const target = `https://github.com/${releasePath}${url.search}`;
      return proxyUpstream(target, request, { 'User-Agent': 'Mozilla/5.0' });
    }

    // GitHub API
    if (path.startsWith('/api/')) {
      const apiPath = path.slice(5);
      const target = `https://api.github.com/${apiPath}${url.search}`;
      return proxyUpstream(target, request, { 'User-Agent': 'gh-proxy/1.0', 'Accept': 'application/vnd.github.v3+json' });
    }

    // Git Clone
    if (path.startsWith('/clone/')) {
      const clonePath = path.slice(7);
      const gitPath = clonePath.endsWith('.git') ? clonePath : clonePath + '.git';
      const target = `https://github.com/${gitPath}${url.search}`;
      return proxyUpstream(target, request, { 'User-Agent': 'git/2.40.0' });
    }

    // GitHub 网页
    if (path.startsWith('/github.com/') || path.startsWith('/githubusercontent.com/')) {
      const domain = path.startsWith('/github.com/') ? 'github.com' : 'raw.githubusercontent.com';
      const subPath = path.replace(`/${domain}/`, '');
      const target = `https://${domain}/${subPath}${url.search}`;
      return proxyUpstream(target, request, { 'User-Agent': 'Mozilla/5.0' });
    }

    // GitHub Pages
    if (path.startsWith('/pages/')) {
      const parts = path.slice(7).split('/');
      if (parts.length >= 2) {
        const user = parts[0];
        const repo = parts[1];
        const subPath = parts.slice(2).join('/');
        const target = `https://${user}.github.io/${repo}/${subPath}${url.search}`;
        return proxyUpstream(target, request);
      }
    }

    // 通用 GitHub 文件
    if (path.match(/^\/[^\/]+\/[^\/]+\/(blob|raw)\/[^\/]+\/.*/)) {
      const parts = path.slice(1).split('/');
      const user = parts[0];
      const repo = parts[1];
      const type = parts[2];
      const branch = parts[3];
      const filePath = parts.slice(4).join('/');

      if (type === 'raw') {
        const target = `https://raw.githubusercontent.com/${user}/${repo}/${branch}/${filePath}${url.search}`;
        return proxyUpstream(target, request);
      } else {
        const target = `https://github.com/${user}/${repo}/blob/${branch}/${filePath}${url.search}`;
        return proxyUpstream(target, request, { 'User-Agent': 'Mozilla/5.0' });
      }
    }

    return new Response(HOMEPAGE, { headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-cache' } });
  }
};
