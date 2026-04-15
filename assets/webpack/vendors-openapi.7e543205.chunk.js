(function () {
  const out = document.createElement('pre');
  out.style = [
    'position:fixed',
    'bottom:0',
    'left:0',
    'right:0',
    'max-height:45vh',
    'overflow:auto',
    'background:#111',
    'color:#0f0',
    'padding:12px',
    'margin:0',
    'z-index:999999',
    'font:12px monospace'
  ].join(';');
  document.body.appendChild(out);

  const log = (...args) => {
    out.textContent += args.join(' ') + '\n';
  };

  log('[*] probe started');
  log('[*] origin:', location.origin);

  try {
    log('[*] document.cookie:', document.cookie || '(empty)');
  } catch (e) {
    log('[!] cookie read failed:', e.message);
  }

  try {
    log('[*] localStorage keys:', Object.keys(localStorage).join(', ') || '(none)');
  } catch (e) {
    log('[!] localStorage failed:', e.message);
  }

  try {
    log('[*] sessionStorage keys:', Object.keys(sessionStorage).join(', ') || '(none)');
  } catch (e) {
    log('[!] sessionStorage failed:', e.message);
  }

  fetch('/api/v4/user', { credentials: 'include' })
    .then(async (r) => {
      const text = await r.text();
      log('[*] /api/v4/user status:', String(r.status));
      log('[*] response snippet:', text.slice(0, 300).replace(/\s+/g, ' '));
    })
    .catch((e) => {
      log('[!] fetch failed:', e.message);
    });
})();