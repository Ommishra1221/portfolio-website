# Phase 3 monitor and material follow-up

## White-screen diagnosis and fix

Found a compositor defect matching the reported white-screen symptom. The WebGL plane used to cut a hole for CSS3D was a **default-white MeshLambertMaterial**, with opacity 0 and NoBlending. The newly introduced room lights illuminate its RGB. The installed Three r137 Lambert shader computes light-dependent RGB separately from opacity; NoBlending replaces the framebuffer instead of attenuating that RGB by alpha. The default WebGL canvas expects premultiplied alpha, so a bright RGB/zero-alpha pixel can visibly add brightness above the iframe.

Changed only that cutout material block to **unlit black MeshBasicMaterial**, with zero opacity, NoBlending, premultiplied alpha, depth testing/writing retained, and fog/tone mapping disabled. It writes transparent black while preserving the existing depth/alpha-hole compositor. CSS3D and WebGL transforms/dimensions remain identical. No iframe source, listener, origin/source/schema validator, or coordinate-mapping code changed.

The before-material snapshot matches the original Phase 3 baseline hash. The updated invariant test permits only the exact documented material-block replacement; all remaining MonitorScreen source must match the snapshot. This is a code/material regression confirmation, **not an observed before/after GPU-pixel pass**.

## Iframe evidence

- Inner root and outer `?dev` both return HTTP 200. Neither checked response has X-Frame-Options or CSP, and neither HTML document has a CSP meta declaration.
- The existing `?dev` configuration selects `http://localhost:3000/`; the bridge suite exercises iframe creation with that source.
- Eight inner routes and six desktop navigation actions pass through the actual inner App in jsdom. This does not establish Chrome rendering or actual frame load events.
- No source, frame-security, or inner-app change was justified by this evidence. The bright cutout plane is independent of whether the child document successfully loads.
- Live frame load events, actual CSS3D computed transforms, browser console/network errors, and physical input remain uninspected because Chrome's page-renderer session still times out. The user-reported manual rendering is not presented as a new automated pass.

## Exact production files changed in this follow-up

1. `src/Application/World/MonitorScreen.ts` — replace the lit cutout material only.
2. `src/Application/World/Cyberpunk/RoomKit.ts` — convert authored sRGB color/emissive literals to linear material values for Three r137. Previously these were interpreted as linear and then encoded to sRGB at output, contributing to the pale/washed appearance.
3. `src/Application/World/Cyberpunk/Materials.ts` — distinguish blue-black walls, neutral charcoal floor, warm dark desk, black hardware and brushed metal; add a shared 64x64 mineral roughness texture/fabric micro-bump; refine keyboard reflectance and reduce LED emission.
4. `src/Application/World/Cyberpunk/Lighting.ts` — reduce broad fill, use a cooler directional key, strengthen the local warm practical, shorten cyan/violet accent reach, and convert light colors consistently. Keep the existing five-light/one-shadow-map budget.
5. `src/Application/World/Cyberpunk/PCTower.ts` — correct glass tint encoding, reduce opacity/clearcoat and soften its roughness. Still one transparent panel, with no transmission/refraction pass.

Geometry modules, camera code/keyframes, renderer/exposure, monitor coordinates, inner-site source, personal content, credits, dependencies, and lockfiles were not edited in this follow-up. Bezel appearance changes through the existing shared black/graphite/metal materials. Legacy monitor texture/video layers remain unchanged to isolate the confirmed cutout defect.

Verification additions/updates: `phase3-artifacts/compositor-checks.cjs`, `scene-checks.cjs`, `monitor-before-fix.snapshot`, `monitor-fix-contract.json`, this report, and generated follow-up logs/JSON evidence.

## Results

| Check | Result |
| --- | --- |
| Production build | PASS; three webpack size/performance warnings. `phase3-artifacts/monitor-followup-build.log` |
| Application TypeScript (`--skipLibCheck`) | PASS |
| Full TypeScript | Same three installed declaration errors: AbortSignal in @types/node and two generic Server errors in @types/ws. `monitor-followup-typescript-full.log` |
| Compositor/material/matrix/projection checks | PASS, 12 assertions. `compositor-results.json` |
| Geometry/ownership/invariants | PASS, including 50 aperture rays, color/data encoding checks, exact permitted monitor edit and unchanged inner hashes |
| Camera/World/source integration | PASS, 20 assertions with actual Three.js/Tween.js and DOM/audio/iframe test doubles |
| Bridge validation/forwarding | PASS, 46 mock-DOM assertions |
| Inner routes/navigation | PASS in React/jsdom: eight direct routes, six navigation actions |
| Outer controls | PASS, 12 React/jsdom assertions |
| `git diff --check` | PASS |
| Actual integrated Chrome, console/network and screenshots | BLOCKED: navigation accepted, then `CDP timeout: Page.enable`; no screenshots or application-console pass claimed |

The new room remains 85 mesh submissions before shadow/compositor passes, 52,146 triangles, five lights, one shadow map, and one transparent mesh. One small shared data texture was added; no new renderer, draw pass, bloom, geometry batch, or dependency was added. These are CPU scene counts, not measured FPS or GPU timings.

## Camera review and remaining acceptance

At a representative 1440x1000 projection, the unchanged idle camera contains the desk/PC extremes, and the focus camera contains the full tilted center screen. The unchanged **desk close-up crops the outer desk and PC edges**. This is now documented in `compositor-results.json`; no keyframe was changed because approval is required for such changes. Projection checks do not replace rendered composition/readability review.

In manually launched Chrome, reload `http://localhost:8080/?dev`, wait for START, and confirm the actual desktop now appears through the screen aperture. Check hover/click/key navigation, focus/return/free-camera, and both frame consoles. Compare idle/desk/focus framing and capture real screenshots. Material/light tuning also needs that rendered review; it is not declared visually accepted here.

No commit, push, merge, deployment, dependency installation, or Phase 4 work was performed.
