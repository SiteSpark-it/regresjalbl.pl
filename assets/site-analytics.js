(() => {
  const ENDPOINT = '/api/collect.php';
  const CONSENT_KEY = 'regresja_analytics_consent';
  const IGNORE_KEY = 'regresja_ignore_analytics';
  const SESSION_KEY = 'regresja_session_id';
  const START_KEY = 'regresja_page_started_at';

  const params = new URLSearchParams(window.location.search);
  if (params.get('analytics_ignore') === '1') {
    localStorage.setItem(IGNORE_KEY, '1');
    localStorage.setItem(CONSENT_KEY, 'denied');
  }

  const ignored = () => localStorage.getItem(IGNORE_KEY) === '1';
  const consent = () => localStorage.getItem(CONSENT_KEY);
  const randomId = () => {
    if (window.crypto?.randomUUID) return window.crypto.randomUUID();
    return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  };

  const sessionId = () => {
    let id = sessionStorage.getItem(SESSION_KEY);
    if (!id) {
      id = randomId();
      sessionStorage.setItem(SESSION_KEY, id);
    }
    return id;
  };

  const basePayload = (event, extra = {}) => ({
    event,
    sessionId: sessionId(),
    page: location.pathname,
    title: document.title,
    referrer: document.referrer || '',
    search: location.search || '',
    hash: location.hash || '',
    language: navigator.language || '',
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || '',
    viewport: `${window.innerWidth}x${window.innerHeight}`,
    screen: `${window.screen?.width || 0}x${window.screen?.height || 0}`,
    userAgent: navigator.userAgent || '',
    timestamp: new Date().toISOString(),
    ...extra
  });

  const send = (event, extra = {}, immediate = false) => {
    if (ignored() || consent() !== 'granted') return;
    const payload = JSON.stringify(basePayload(event, extra));
    if (immediate && navigator.sendBeacon) {
      navigator.sendBeacon(ENDPOINT, new Blob([payload], { type: 'application/json' }));
      return;
    }
    fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: payload,
      keepalive: true
    }).catch(() => {});
  };

  const maxScroll = () => {
    const doc = document.documentElement;
    const scrollable = Math.max(1, doc.scrollHeight - window.innerHeight);
    return Math.min(100, Math.round((window.scrollY / scrollable) * 100));
  };

  const showConsent = () => {
    if (ignored() || consent()) return;
    const banner = document.createElement('div');
    banner.className = 'consent-banner';
    banner.innerHTML = `
      <p style="margin:0;font-weight:800;color:#172a3a">Pomiar strony</p>
      <p style="margin:.38rem 0 0;color:#40505b;font-size:.86rem;line-height:1.45">
        Pomiar pomaga poprawiać treści i kontakt. Zbieramy odsłony, czas sesji i kliknięcia. Nie pokazujemy surowego IP w panelu.
      </p>
      <div style="display:flex;gap:.55rem;flex-wrap:wrap;margin-top:.85rem">
        <button type="button" data-analytics-accept class="button-primary">Akceptuję</button>
        <button type="button" data-analytics-decline class="button-quiet" style="background:#fff">Tylko niezbędne</button>
      </div>
    `;
    document.body.appendChild(banner);
    banner.querySelector('[data-analytics-accept]').addEventListener('click', () => {
      localStorage.setItem(CONSENT_KEY, 'granted');
      banner.remove();
      start();
    });
    banner.querySelector('[data-analytics-decline]').addEventListener('click', () => {
      localStorage.setItem(CONSENT_KEY, 'denied');
      banner.remove();
    });
  };

  let started = false;
  const start = () => {
    if (started || ignored() || consent() !== 'granted') return;
    started = true;
    sessionStorage.setItem(START_KEY, String(Date.now()));
    send('page_view', { scrollDepth: maxScroll() });
  };

  window.RegresjaAnalytics = {
    track(event, extra = {}) {
      send(event, extra);
    },
    ignoreThisDevice() {
      localStorage.setItem(IGNORE_KEY, '1');
      localStorage.setItem(CONSENT_KEY, 'denied');
    }
  };

  document.addEventListener('click', (event) => {
    const link = event.target?.closest?.('a');
    if (!link) return;
    const href = link.getAttribute('href') || '';
    if (href.includes('/sesja/#kontakt') || href.startsWith('mailto:') || href.startsWith('tel:') || href.includes('wa.me/')) {
      send('cta_click', { href, text: link.textContent.trim().slice(0, 120) });
    }
  }, { capture: true });

  const leave = () => {
    if (ignored() || consent() !== 'granted') return;
    const startedAt = Number(sessionStorage.getItem(START_KEY) || Date.now());
    send('page_leave', {
      durationSeconds: Math.max(0, Math.round((Date.now() - startedAt) / 1000)),
      scrollDepth: maxScroll()
    }, true);
  };

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') leave();
  });
  window.addEventListener('pagehide', leave);

  showConsent();
  if (consent() === 'granted') start();
})();
