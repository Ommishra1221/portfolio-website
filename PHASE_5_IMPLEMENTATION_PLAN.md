# Phase 5 implementation plan

## Safety baseline / Phase 5A

Branch: feature/phase-5-cinematic-experience, created from the dirty Phase 4 worktree without discarding changes. Inner branch feature/om-cyberpunk-inner-site has existing personalization changes; it is read-only this phase. Pre-phase outer source is preserved under phase5-artifacts/baseline-source. Phase 4 manual visual acceptance is still outstanding: no new visual pass is inferred from earlier Phase 3 manual confirmation.

Audit: Application updates Camera, then World, then Renderer. Camera currently calls the shared Tween.js update once/frame; Time owns the existing RAF. Camera keys are loading, idle, desk, monitor and orbitControlsStart. UI loadingScreenDone starts the camera and audio; enterMonitor/leftMonitor use camera EventEmitter plus UI notifications; freeCamToggle uses the UI event bus. Existing camera transitions globally remove all tweens and have no owned listener teardown. Loading START is visually hidden before readiness but its click callback is unguarded; resize listeners register during every render. These are targeted lifecycle defects to fix.

## Chosen choreography / Phase 5B

Use the existing Camera only, unchanged keyframe coordinates, projection and monitor framing. A 4.8 second optional intro traverses loading -> desk (3.0s reveal), then desk -> idle (1.8s settle). Desk gives center-workstation emphasis without entering or blocking the iframe. Use existing easing and freeze background keyframe drift during intro. Skip immediately settles idle; native scene click exits intro; monitor/free-camera commands cancel intro and replace only owned tweens. At widths below 768 or reduced motion, enter idle immediately. Resize during a transition settles its destination (intro settles idle); changing reduced motion completes the target and runs the necessary completion callback. Repeated START is ignored; repeated target commands are idempotent. No keyframe-coordinate edits without rendered evidence.

Readiness gates START and Camera intro; pre-ready commands wait for ready. A visible keyboard-operable Skip intro control and polite status supply feedback without autofocus, traps or frame-rate React updates. Camera owns tween cancellation and listener subscriptions, with disposal through Application. Timeline setup errors recover to idle. No new animation loop or audio autoplay.

## Environment / Phase 5C–D

Retain Phase 4 lamp/LED fades and typing feedback, independent of camera states. Add gentle 1.2 second initial fan spin-up via existing room.update, no additional geometry/material/light/shadow/texture. Reduced motion stops fans. Preserve hardware state throughout transitions. Keep mobile warning/fallback, all existing UI controls, iframe bridge and compositor byte-for-byte unchanged. Add only restrained high-contrast intro UI; improve loading listener cleanup and prevent hidden START interaction.

## Verification / Phase 5E and rollback

Record baseline build/geometry/aperture/bridge. Run new real Tween.js camera tests for completion, skip, interruption, resize, repeated commands, external tween isolation, readiness, reduced motion and disposal; DOM UI tests for focus/keyboard. Repeat existing scene, interaction, camera, UI, compositor/aperture, bridge and inner navigation suites; report historical source-hash expectations separately if deliberately changed. Run production build, application tsc, full tsc (known three declarations separately), diff check and a browser attempt. CPU scene counts are not FPS. If Chrome still times out, screenshots/console/rendered camera paths remain pending with a specific manual checklist. Rollback only this phase's changed files against baseline snapshots; never reset prior work. No dependencies, inner edits, commits/deployment or Phase 6.
