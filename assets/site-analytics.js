(() => {
  const ENDPOINT = '/api/collect.php';
  const CONSENT_KEY = 'regresja_analytics_consent';
  const IGNORE_KEY = 'regresja_ignore_analytics';
  const SESSION_KEY = 'regresja_session_id';
  const SESSION_START_KEY = 'regresja_session_started_at';
  const START_KEY = 'regresja_page_started_at';
  const ENTRY_PAGE_KEY = 'regresja_entry_page';
  const PREVIOUS_PAGE_KEY = 'regresja_previous_page';
  const PAGE_SEQUENCE_KEY = 'regresja_page_sequence';

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
      sessionStorage.setItem(SESSION_START_KEY, new Date().toISOString());
      sessionStorage.setItem(ENTRY_PAGE_KEY, location.pathname);
      sessionStorage.setItem(PAGE_SEQUENCE_KEY, '0');
    }
    return id;
  };

  const pageSequence = () => {
    const current = Number(sessionStorage.getItem(PAGE_SEQUENCE_KEY) || '0') + 1;
    sessionStorage.setItem(PAGE_SEQUENCE_KEY, String(current));
    return current;
  };

  const deviceType = () => {
    const width = window.innerWidth || 0;
    if (width < 640) return 'mobile';
    if (width < 1024) return 'tablet';
    return 'desktop';
  };

  const utm = new URLSearchParams(window.location.search);
  const pageStartedAt = new Date().toISOString();
  sessionId();
  const currentPageSequence = pageSequence();
  let activeSeconds = 0;
  let visibleStartedAt = Date.now();

  const basePayload = (event, extra = {}) => ({
    event,
    sessionId: sessionId(),
    sessionStartedAt: sessionStorage.getItem(SESSION_START_KEY) || '',
    pageStartedAt,
    pageSequence: currentPageSequence,
    entryPage: sessionStorage.getItem(ENTRY_PAGE_KEY) || location.pathname,
    previousPage: sessionStorage.getItem(PREVIOUS_PAGE_KEY) || '',
    page: location.pathname,
    title: document.title,
    referrer: document.referrer || '',
    search: location.search || '',
    hash: location.hash || '',
    language: navigator.language || '',
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || '',
    viewport: `${window.innerWidth}x${window.innerHeight}`,
    screen: `${window.screen?.width || 0}x${window.screen?.height || 0}`,
    device: deviceType(),
    utmSource: utm.get('utm_source') || '',
    utmMedium: utm.get('utm_medium') || '',
    utmCampaign: utm.get('utm_campaign') || '',
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
    },
    context() {
      return {
        sessionId: sessionId(),
        sessionStartedAt: sessionStorage.getItem(SESSION_START_KEY) || '',
        entryPage: sessionStorage.getItem(ENTRY_PAGE_KEY) || location.pathname,
        previousPage: sessionStorage.getItem(PREVIOUS_PAGE_KEY) || '',
        pageSequence: currentPageSequence
      };
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

  const updateActiveSeconds = () => {
    if (document.visibilityState !== 'visible') return;
    const now = Date.now();
    activeSeconds += Math.max(0, Math.round((now - visibleStartedAt) / 1000));
    visibleStartedAt = now;
  };

  let formStarted = false;
  document.addEventListener('focusin', (event) => {
    if (formStarted || !event.target?.closest?.('[data-lead-form]')) return;
    formStarted = true;
    send('form_start', { scrollDepth: maxScroll() });
  });

  const leave = () => {
    if (ignored() || consent() !== 'granted') return;
    updateActiveSeconds();
    const startedAt = Number(sessionStorage.getItem(START_KEY) || Date.now());
    send('page_leave', {
      durationSeconds: Math.max(0, Math.round((Date.now() - startedAt) / 1000)),
      activeSeconds,
      scrollDepth: maxScroll()
    }, true);
    sessionStorage.setItem(PREVIOUS_PAGE_KEY, location.pathname);
  };

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      leave();
    } else {
      visibleStartedAt = Date.now();
    }
  });
  window.addEventListener('pagehide', leave);

  window.setInterval(() => {
    if (ignored() || consent() !== 'granted' || document.visibilityState !== 'visible') return;
    updateActiveSeconds();
    send('engagement_ping', {
      durationSeconds: Math.max(0, Math.round((Date.now() - Number(sessionStorage.getItem(START_KEY) || Date.now())) / 1000)),
      activeSeconds,
      scrollDepth: maxScroll()
    });
  }, 30000);

  showConsent();
  if (consent() === 'granted') start();
})();
