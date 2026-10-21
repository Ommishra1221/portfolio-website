# Phase 4 implementation plan

## 4A audit and safety checkpoint

Dedicated branch: `feature/phase-4-hardware-interactions`. All existing uncommitted work is retained. Full initial source snapshots are under `phase4-artifacts/baseline-source/`; protected hashes cover the corrected monitor/compositor, bridge, camera and keyframes, renderer, identity, manifests/license, and inner checkout. Do not restore entire worktrees: compare/restore only this phase's subsystem snapshots if required.

Audited CyberpunkRoom, RoomKit, shared materials, five-light system, monitor housings, workstation/accessories, PC/fans, World lifecycle, React UI, input/camera listeners and the disabled old Hitboxes implementation. New room ownership already disposes shared geometry/material/texture resources and instance buffers, with animation through World's existing delta. Reduced motion stops fans/camera drift; START/mute/free-camera already support keyboard operation.

Baseline: 52,146 triangles, 85 mesh submissions before shadow/compositor passes, 39 instance batches, one transparent PC panel and one shadow map. Baseline production build and scene checks are recorded before implementation. The user's manual Chrome acceptance of the corrected Phase 3 room is retained as user-reported evidence, not an automated Phase 4 pass. Automated renderer startup remains a known limitation.

## 4B hardware boundaries

- Monitors: preserve the complete center aperture, screen transform, mask fix and pointer/security code. Add rear vents, fasteners, mounting collars and routed cables behind/outside the aperture; keep side-screen artwork static and explicitly demonstrative.
- Keyboard: replace the costly repeated rounded boxes with one original, lower-poly tapered/dished keycap geometry; retain 67 instances and spacing/spacebar proportions. Add seams, status LEDs and connector detail. No external font/legend asset is needed.
- PC: reuse fan geometry; add batched grille details, ports/power control surface, motherboard components, radiator/GPU details and cable combs. Keep one glass panel and no new lights/shadow maps.
- Accessories: scroll-wheel treads, headphone padding, mug coaster, lamp switch, mat seams, cable clips and chair collars. Static box additions remain batchable.
- Materials: keep the corrected sRGB/linear boundary; add modest shared polymer/brushed roughness detail without changing the approved lighting/exposure or adding transparency.

## 4C interaction design

Implement only two meaningful controls: desk lamp practical-light toggle and PC decorative accent-LED toggle. Neither controls the computer/iframe or fan power. Provide a compact native HTML Room controls panel with labelled keyboard-operable buttons and pressed states. Native pointer, touch and focus behaviors remain; the panel does not steal focus.

Use a small shared HardwareState model, owned by World and passed explicitly to the room/UI. React subscribes only to boolean state changes; animation never causes React frame rerenders. Lamp/LED transitions run in the existing update loop, with immediate changes under reduced motion. Typing feedback is a small status-LED pulse from the existing validated bridged CustomEvent only, excluding synthetic UI typing. Do not listen inside the iframe or collect/store/log text.

Do not activate the old Hitboxes class. A new centralized interaction controller registers only actual lamp-base and PC-control meshes. It maps the viewport pointer to camera rays, checks eligible targets first, and checks nearer scene occlusion only on a candidate hit. Hover raycasts are bounded in frequency; no separate RAF. Gate input until the normal experience starts and while camera state is stable, outside monitor focus/free camera. Ignore iframe, UI, native typing and bridged CustomEvents for object clicks. Consume only confirmed hardware mousedown hits in capture phase so the existing document camera click does not also fire. No focus calls or shortcut interception. Restore cursor/material state and remove every owned listener on dispose.

## 4D/4E budgets and checkpoints

Keep the center monitor, camera definitions and compositor byte-for-byte unchanged. Run the existing 50-ray clearance checks after monitor details, plus the compositor and bridge suites. Compare static triangles/draw submissions/material counts/instances/transparency/shadow maps against baseline. Lower-poly keycaps should fund the new detail budget. Do not claim actual draw calls, FPS, memory or GPU timings from CPU graph inspection.

Checkpoints: baseline build -> hardware geometry/aperture checks -> accessible state/raycast/typing tests -> reduced-motion and disposal -> production build, application TypeScript, diff check and protected hashes -> browser attempt and final report. Full tsc declaration conflicts remain separately reported. Do not modify dependencies or inner source. If browser startup remains blocked, leave Phase 4 visual acceptance pending and provide concrete manual checks.

## Rollback boundaries and licensing

Monitor detail rollback is confined to MonitorArray/Displays; the screen and bridge are separate and protected. Keyboard/accessory rollback is confined to Workstation/HardwareDetails. PC detail rollback is confined to PCTower. State/controller/UI integration can be removed independently of the geometry. Each module has a pre-phase snapshot. Fix any aperture or event-flow regression before continuing.

All additions use original procedural geometry/data/canvas art and existing dependencies/system fonts only. Inherited asset redistribution review remains unresolved; preserve notices and do not introduce downloaded assets. No commit, push, merge, deployment or Phase 5 implementation is authorized.

Feasibility: details can be added behind the protected aperture; interaction candidates have native accessible alternatives and isolated state. Proceed with the sequential checkpoints.
