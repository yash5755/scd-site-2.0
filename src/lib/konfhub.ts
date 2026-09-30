'use client';

export const KONFHUB_BUTTONS = {
  GET_TICKETS: 'btn_e09c1e6dcbde',
  SUPER_EARLY_BIRD: 'btn_c13e6c1801b5',
  EARLY_BIRD: 'btn_7129a9d5f0e9',
  REGULAR: 'btn_5e2df9de7c0b',
} as const;

let isInitialized = false;

export function initKonfHub() {
  if (typeof document === 'undefined') return;
  if (isInitialized) return;
  isInitialized = true;

  // Intercept iframe src to append btnColor=23303E so Proceed button is styled
  const appendBtnColor = (urlStr: string) => {
    if (typeof urlStr === 'string' && urlStr.includes('konfhub.com/widget/') && !urlStr.includes('btnColor')) {
      const delimiter = urlStr.includes('?') ? '&' : '?';
      return `${urlStr}${delimiter}btnColor=23303E&btnBg=23303E`;
    }
    return urlStr;
  };

  const originalSrcDesc = Object.getOwnPropertyDescriptor(HTMLIFrameElement.prototype, 'src');
  if (originalSrcDesc && originalSrcDesc.set) {
    Object.defineProperty(HTMLIFrameElement.prototype, 'src', {
      set(val: string) {
        return originalSrcDesc.set!.call(this, appendBtnColor(val));
      },
      get() {
        return originalSrcDesc.get!.call(this);
      },
      configurable: true,
    });
  }

  const originalSetAttribute = HTMLIFrameElement.prototype.setAttribute;
  HTMLIFrameElement.prototype.setAttribute = function (name: string, val: string) {
    if (name.toLowerCase() === 'src') {
      val = appendBtnColor(val);
    }
    return originalSetAttribute.call(this, name, val);
  };

  // Create portal root on document.body
  let portal = document.getElementById('konfhub-portal-root');
  if (!portal) {
    portal = document.createElement('div');
    portal.id = 'konfhub-portal-root';
    document.body.appendChild(portal);
  }

  // Mount a dedicated container and widget script for each button ID sequentially
  const buttonIds = Object.values(KONFHUB_BUTTONS);

  const loadScriptForIndex = (index: number) => {
    if (index >= buttonIds.length) return;
    const buttonId = buttonIds[index];

    let container = document.getElementById(`konfhub-container-${buttonId}`);
    if (!container) {
      container = document.createElement('div');
      container.id = `konfhub-container-${buttonId}`;
      portal!.appendChild(container);
    }

    if (!container.querySelector(`script[button_id="${buttonId}"]`)) {
      const script = document.createElement('script');
      script.src = 'https://widget.konfhub.com/widget.js';
      script.setAttribute('button_id', buttonId);
      script.async = false;
      script.onload = () => {
        loadScriptForIndex(index + 1);
      };
      script.onerror = () => {
        loadScriptForIndex(index + 1);
      };
      container.appendChild(script);
    } else {
      loadScriptForIndex(index + 1);
    }
  };

  loadScriptForIndex(0);

  // MutationObserver for body scroll locking and iframe src adjustment
  const observer = new MutationObserver(() => {
    const modal = document.querySelector('.modal-container-wrapper');
    if (modal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    const iframe = document.querySelector<HTMLIFrameElement>('.konfhub-buttons-ifrm');
    if (iframe && iframe.src && iframe.src.includes('konfhub.com/widget/') && !iframe.src.includes('btnColor')) {
      iframe.src = appendBtnColor(iframe.src);
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });

  // Backdrop click-to-close handler
  const handleBackdropClick = (e: MouseEvent) => {
    const modalWrapper = document.querySelector('.modal-container-wrapper');
    if (!modalWrapper) return;
    const iframeButtons = modalWrapper.querySelector('.iframe-konfhub-buttons');
    if (
      iframeButtons &&
      !iframeButtons.contains(e.target as Node) &&
      modalWrapper.contains(e.target as Node)
    ) {
      const closeBtn = modalWrapper.querySelector<HTMLButtonElement>('.iframe-konfhub-close-btn');
      if (closeBtn) {
        closeBtn.click();
      }
    }
  };

  window.addEventListener('click', handleBackdropClick, true);
}

export function openKonfHub(buttonId: string) {
  if (typeof document === 'undefined') return;

  initKonfHub();

  const container = document.getElementById(`konfhub-container-${buttonId}`);
  const triggerBtn = container?.querySelector<HTMLButtonElement>('.reg-button');
  if (triggerBtn) {
    triggerBtn.click();
    return;
  }

  // Poll briefly if script is still loading
  let attempts = 0;
  const interval = setInterval(() => {
    attempts++;
    const btn = document.querySelector<HTMLButtonElement>(`#konfhub-container-${buttonId} .reg-button`);
    if (btn) {
      clearInterval(interval);
      btn.click();
    } else if (attempts > 30) {
      clearInterval(interval);
    }
  }, 100);
}
