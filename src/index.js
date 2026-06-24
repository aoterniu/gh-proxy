/**
 * 全能加速镜像 Worker
 * NPM / PyPI / GitHub Raw / Release / API / Git Clone
 * 路由：gh.aoterniu.online
 */

const HOMEPAGE = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>gh 镜像加速</title>
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','PingFang SC','Microsoft YaHei',sans-serif;background:#0d1117;color:#c9d1d9;min-height:100vh}
.container{max-width:800px;margin:0 auto;padding:40px 20px}
h1{font-size:2rem;margin-bottom:8px;background:linear-gradient(135deg,#58a6ff,#f78166);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.sub{color:#8b949e;margin-bottom:32px;font-size:1rem}
.card{background:#161b22;border:1px solid #30363d;border-radius:12px;padding:20px;margin-bottom:16px}
.card h2{font-size:1.1rem;color:#58a6ff;margin-bottom:8px;display:flex;align-items:center;gap:8px}
.card p{color:#8b949e;font-size:.88rem;margin-bottom:10px}
.code{background:#0d1117;border:1px solid #30363d;border-radius:6px;padding:12px;font-family:'JetBrains Mono',monospace;font-size:.82rem;color:#7ee787;overflow-x:auto;margin-bottom:8px;cursor:pointer;position:relative}
.code:hover{border-color:#58a6ff}
.code::after{content:'复制';position:absolute;top:8px;right:8px;font-size:.7rem;color:#8b949e;background:#21262d;padding:2px 8px;border-radius:4px}
.code:hover::after{color:#58a6ff}
.tag{display:inline-block;background:#1f6feb22;color:#58a6ff;font-size:.72rem;padding:2px 8px;border-radius:99px;margin-bottom:8px}
.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(350px,1fr));gap:16px}
footer{text-align:center;padding:40px 0 20px;color:#484f58;font-size:.78rem}
footer a{color:#58a6ff;text-decoration:none}
</style>
</head>
<body>
<div class="container">
<h1>gh 镜像加速</h1>
<p class="sub">NPM · PyPI · GitHub Raw · Release · API · Git Clone</p>

<div class="grid">

<div class="card">
  <h2>📦 NPM 镜像</h2>
  <span class="tag">registry</span>
  <p>替代 npmjs.org，国内加速</p>
  <div class="code">npm config set registry https://gh.aoterniu.online/npm/</div>
  <div class="code">yarn config set registry https://gh.aoterniu.online/npm/</div>
  <div class="code">pnpm config set registry https://gh.aoterniu.online/npm/</div>
</div>

<div class="card">
  <h2>🐍 PyPI 镜像</h2>
  <span class="tag">pip</span>
  <p>替代 pypi.org，Python 包加速</p>
  <div class="code">pip install -i https://gh.aoterniu.online/pypi/simple/ 包名</div>
  <div class="code">pip config set global.index-url https://gh.aoterniu.online/pypi/simple/</div>
</div>

<div class="card">
  <h2>📄 GitHub Raw 文件</h2>
  <span class="tag">raw</span>
  <p>加速 raw.githubusercontent.com 访问</p>
  <div class="code">https://gh.aoterniu.online/raw/user/repo/branch/path/file</div>
  <p style="margin-top:6px">示例：</p>
  <div class="code">https://gh.aoterniu.online/raw/microsoft/vscode/main/README.md</div>
</div>

<div class="card">
  <h2>⬇️ GitHub Release 下载</h2>
  <span class="tag">release</span>
  <p>加速 release 文件下载</p>
  <div class="code">https://gh.aoterniu.online/release/user/repo/releases/download/tag/file</div>
  <p style="margin-top:6px">示例：</p>
  <div class="code">https://gh.aoterniu.online/release/cli/cli/releases/download/v2.40.0/gh_2.40.0_linux_amd64.tar.gz</div>
</div>

<div class="card">
  <h2>🔗 GitHub API 加速</h2>
  <span class="tag">api</span>
  <p>加速 api.github.com 请求</p>
  <div class="code">https://gh.aoterniu.online/api/repos/user/repo</div>
  <div class="code">https://gh.aoterniu.online/api/repos/user/repo/releases/latest</div>
</div>

<div class="card">
  <h2>🔀 Git Clone 加速</h2>
  <span class="tag">clone</span>
  <p>加速 git clone 操作</p>
  <div class="code">git clone https://gh.aoterniu.online/clone/user/repo.git</div>
  <div class="code">git clone https://gh.aoterniu.online/clone/user/repo</div>
</div>

<div class="card">
  <h2>🌐 GitHub 网页加速</h2>
  <span class="tag">web</span>
  <p>直接访问 GitHub（需配置）</p>
  <div class="code">https://gh.aoterniu.online/github.com/user/repo</div>
</div>

<div class="card">
  <h2>📂 GitHub Pages</h2>
  <span class="tag">pages</span>
  <p>加速 GitHub Pages 访问</p>
  <div class="code">https://gh.aoterniu.online/pages/user/repo/path</div>
</div>

</div>

<footer>
  gh 镜像加速 · gh.aoterniu.online · Powered by Cloudflare Workers · <a href="https://blog.aoterniu.online">技术笔记</a>
</footer>
</div>

<script>
document.querySelectorAll('.code').forEach(el=>{
  el.addEventListener('click',()=>{
    navigator.clipboard.writeText(el.textContent.replace('复制','').trim());
    const orig=el.style.borderColor;
    el.style.borderColor='#3fb950';
    setTimeout(()=>el.style.borderColor=orig,1000);
  });
});
</script>
</body>
</html>`;

// CORS 头
function cors(origin) {
  return {
    'Access-Control-Allow-Origin': origin || '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': '*'
  };
}

// 通用代理函数
async function proxyUpstream(url, request, extraHeaders = {}) {
  const headers = new Headers();

  // 复制原始请求头
  for (const [key, value] of request.headers) {
    if (!['host', 'origin', 'referer'].includes(key.toLowerCase())) {
      headers.set(key, value);
    }
  }

  // 添加额外头
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

    // CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: cors(origin) });
    }

    // 首页
    if (path === '/' || path === '') {
      return new Response(HOMEPAGE, {
        headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-cache' }
      });
    }

    // === NPM 镜像 ===
    if (path.startsWith('/npm/')) {
      const npmPath = path.slice(4); // 保留 /xxx 格式
      const target = `https://registry.npmmirror.com${npmPath}${url.search}`;
      return proxyUpstream(target, request);
    }

    // === PyPI 镜像 ===
    if (path.startsWith('/pypi/')) {
      const pypiPath = path.slice(5);
      const target = `https://mirrors.aliyun.com/pypi${pypiPath}${url.search}`;
      return proxyUpstream(target, request);
    }

    // === GitHub Raw 文件 ===
    if (path.startsWith('/raw/')) {
      // /raw/user/repo/branch/path → raw.githubusercontent.com/user/repo/branch/path
      const rawPath = path.slice(5);
      const target = `https://raw.githubusercontent.com/${rawPath}${url.search}`;
      return proxyUpstream(target, request);
    }

    // === GitHub Release 下载 ===
    if (path.startsWith('/release/')) {
      const releasePath = path.slice(9);
      const target = `https://github.com/${releasePath}${url.search}`;
      return proxyUpstream(target, request, {
        'User-Agent': 'Mozilla/5.0'
      });
    }

    // === GitHub API ===
    if (path.startsWith('/api/')) {
      const apiPath = path.slice(5);
      const target = `https://api.github.com/${apiPath}${url.search}`;
      return proxyUpstream(target, request, {
        'User-Agent': 'gh-proxy/1.0',
        'Accept': 'application/vnd.github.v3+json'
      });
    }

    // === Git Clone 加速 ===
    if (path.startsWith('/clone/')) {
      const clonePath = path.slice(7);
      // 确保有 .git 后缀
      const gitPath = clonePath.endsWith('.git') ? clonePath : clonePath + '.git';
      const target = `https://github.com/${gitPath}${url.search}`;
      return proxyUpstream(target, request, {
        'User-Agent': 'git/2.40.0'
      });
    }

    // === GitHub 网页（通用代理）===
    if (path.startsWith('/github.com/') || path.startsWith('/githubusercontent.com/')) {
      const domain = path.startsWith('/github.com/') ? 'github.com' : 'raw.githubusercontent.com';
      const subPath = path.replace(`/${domain}/`, '');
      const target = `https://${domain}/${subPath}${url.search}`;
      return proxyUpstream(target, request, {
        'User-Agent': 'Mozilla/5.0'
      });
    }

    // === GitHub Pages ===
    if (path.startsWith('/pages/')) {
      // /pages/user/repo/path → user.github.io/repo/path
      const parts = path.slice(7).split('/');
      if (parts.length >= 2) {
        const user = parts[0];
        const repo = parts[1];
        const subPath = parts.slice(2).join('/');
        const target = `https://${user}.github.io/${repo}/${subPath}${url.search}`;
        return proxyUpstream(target, request);
      }
    }

    // === 通用 GitHub 文件代理 ===
    // /user/repo/blob/branch/path → github.com/user/repo/blob/branch/path
    // /user/repo/raw/branch/path → raw.githubusercontent.com/user/repo/branch/path
    if (path.match(/^\/[^\/]+\/[^\/]+\/(blob|raw)\/[^\/]+\/.*/)) {
      const parts = path.slice(1).split('/');
      const user = parts[0];
      const repo = parts[1];
      const type = parts[2]; // blob 或 raw
      const branch = parts[3];
      const filePath = parts.slice(4).join('/');

      if (type === 'raw') {
        const target = `https://raw.githubusercontent.com/${user}/${repo}/${branch}/${filePath}${url.search}`;
        return proxyUpstream(target, request);
      } else {
        // blob 类型，返回 GitHub 页面
        const target = `https://github.com/${user}/${repo}/blob/${branch}/${filePath}${url.search}`;
        return proxyUpstream(target, request, {
          'User-Agent': 'Mozilla/5.0'
        });
      }
    }

    // === 默认：返回使用说明 ===
    return new Response(HOMEPAGE, {
      headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-cache' }
    });
  }
};
