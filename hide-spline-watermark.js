/**
 * hide-spline-watermark.js
 * For https://github.com/cybertarr-A/cybertarr-portfolio
 * Removes the "Built with Spline" badge from every Spline scene (background + robot)
 */

(() => {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', removeBadges);
  } else {
    removeBadges();
  }

  function removeBadges() {
    const iframes = document.querySelectorAll('iframe[src*="spline.design"]');
    if (iframes.length === 0) return;

    iframes.forEach(iframe => {
      iframe.addEventListener('load', () => {
        // Inside the iframe
        try {
          const doc = iframe.contentDocument || iframe.contentWindow?.document;
          if (doc) {
            const badge = doc.querySelector('.spline-badge, [class*="badge"], a[href*="spline.design"]');
            if (badge) badge.remove();
          }
        } catch (e) { /* cross-origin – ignore */ }

        // Outside the iframe (overlay)
        const parent = iframe.parentNode;
        const overlay = parent.querySelector('a[href*="spline.design"], div[class*="badge"]');
        if (overlay) overlay.remove();

        // Final sweep for any late-injected badge
        setTimeout(() => {
          document.querySelectorAll('*').forEach(el => {
            if (el.textContent && /Built\s*with\s*Spline/i.test(el.textContent)) {
              el.remove();
            }
          });
        }, 800);
      });
    });
  }
})();
