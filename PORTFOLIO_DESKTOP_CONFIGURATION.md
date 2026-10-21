# Portfolio desktop configuration

Local development: run the inner site on http://localhost:3000 and open the room at http://localhost:8080/?dev. The dev query selects the local desktop. Opening / without dev uses deployment configuration, even on localhost.

Production: after deploying the inner site, set the runtime configuration in src/index.html before the webpack application script runs:

```html
<script>
  window.portfolioRuntimeConfig = {
    innerSiteUrl: 'https://YOUR-DEPLOYED-INNER-SITE.example/'
  };
</script>
```

Replace the placeholder with the real deployed inner-site HTTPS URL. Rebuild the outer site after editing this template, or supply the same configuration before its bundle in your hosting setup. Never use localhost as a production fallback. Missing/invalid URLs intentionally create no iframe and show a non-blocking monitor notice.

On the deployed inner site, configure its existing REACT_APP_ALLOWED_PARENT_ORIGINS to the exact deployed outer origin. REACT_APP_PARENT_ORIGIN may explicitly select that same allowed origin. These CRA build-time values require rebuilding the inner site. Its frame-ancestors/X-Frame-Options hosting policies must also permit that outer origin. Do not use wildcard origins or change bridge validation. No inner configuration or deployment is changed by this fix.

If TS1323 persists after changing TypeScript/webpack configuration, stop the old outer dev process in its owning terminal and restart npm.cmd run dev from portfolio-website. Confirm it uses port 8080, prints compiled successfully, and then reload /?dev. A fresh compiler uses the shared explicit src/tsconfig.json (module esnext); an already-running ts-loader instance can retain old compiler options.
