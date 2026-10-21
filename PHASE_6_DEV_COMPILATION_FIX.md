# Phase 6 development compiler correction

## Root cause and evidence

The live webpack server on port 8080 reported the exact TS1323 diagnostic for src/script.ts over ws://localhost:8080/ws. That is saved in live-before.json; the overlay was not merely stale browser HTML.

Before changing application code, a fresh run of the actual webpack development configuration passed. ts-loader logged TypeScript 4.9.5 and the absolute src/tsconfig.json path. That file already contains module: esnext. webpack.dev.js and webpack.prod.js both merge webpack.common.js, which had only use: ts-loader and no compilerOptions/configFile override. There is no root tsconfig.json.

The difference is the long-running compiler's cached state. Installed ts-loader initializes compilerOptions once per instance; its watch callback refreshes source/dependency caches, not the original module option. The earlier server was still compiling the dynamic import under its prior settings. This diagnosis follows from the simultaneously failing live server, passing fresh development compiler, and loader lifecycle inspection; the private old process compiler object was not directly inspected. Fresh production builds and standalone tsc read the corrected on-disk config, explaining why those passed.

Earlier Phase 6 verification missed this stateful running development compiler. The explicit loader path removes config-discovery ambiguity, but a process restart is still required to discard the existing cached instance. Changing only source text or refreshing Chrome is insufficient.

## Correction and exact changes

Only application/build file changed in this follow-up: bundler/webpack.common.js. Its ts-loader rule now explicitly sets configFile to path.resolve(__dirname, ../src/tsconfig.json), shared by development and production. No new module override is introduced. Existing esnext output remains, preserving webpack dynamic import/code splitting.

src/script.ts, all TypeScript compiler settings, inner repository, graphics/mobile/accessibility/camera/hardware code and the protected center monitor/security files were not edited in this follow-up. Required notices, dependencies and lockfiles remain unchanged.

Documentation: this report and a follow-up note in PHASE_6_FINAL_REPORT.md. Added verification scripts/results/logs under phase6-artifacts/dev-fix; inherited generated Phase 6 test results were refreshed. The standalone compiler's copied output directory was removed after preserving its stats/log evidence, avoiding an unnecessary duplicate static-asset tree.

## Actual development compiler/server verification

- Fresh development compilation before correction: PASS using webpack.dev.js, with ts-loader logging src/tsconfig.json.
- Corrected development server at http://localhost:8081/?dev: PASS, zero compiler errors and warnings, successful subsequent watch compilations.
- Actual dev-server WebSocket reports type: ok, not errors. Root HTML and its referenced bundle return HTTP 200. Evidence: served-verification.json and live-dev-result.json.
- Actual development chunks include a non-initial Application CSS/JS chunk and a non-initial vendor chunk. Dynamic loading is preserved.
- Entry execution/config tests: nine assertions PASS. At 390px the real bootstrap does not request/construct Application until Explore is activated; at 1440px it requests/constructs Application. Application is a constructor fixture, so this is not rendered WebGL acceptance.

The existing process on 8080 (PID 1724) could not be stopped: Windows returned Access is denied. It still needs restarting from its owning terminal. The corrected verification server is left running on 8081. This port is a compiler test, not an alternate trusted parent-origin deployment; iframe origin checks were not expanded to allow it.

Required user action: in the terminal running the old outer server, press Ctrl+C, then run npm.cmd run dev from portfolio-website. Verify it binds 8080 and says compiled successfully, then reload http://localhost:8080/?dev. Restarting on the original port preserves the configured parent origin. Do not interpret testing on 8081 as browser acceptance of the integrated message bridge.

## Other verification

- Production build: PASS, one existing asset-size warning.
- Full browser-project TypeScript: PASS, without skipLibCheck.
- Application TypeScript: PASS.
- All 20 Phase 6 runner entries: PASS, including quality/recovery, responsive entry, lifecycle/disposal, intro/camera/React/hardware, geometry, 50-ray aperture, compositor, secure bridge, inner navigation/windows, protected source hashes and diff check.
- git diff --check: PASS.
- No dependencies installed, commits, pushes, merges, deployment or Phase 7 work.

Chrome 156 launched with a fresh profile and connected to DevTools, but Page.navigate to the corrected server timed out. No rendered screenshot/console or physical desktop initialization pass is claimed. Evidence: browser-chrome-result.json. After restarting 8080, manually confirm desktop START/intro/monitor input and narrow direct-entry/Explore behavior in the user's working Chrome.
