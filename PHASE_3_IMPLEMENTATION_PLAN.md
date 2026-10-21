# Phase 3 implementation plan

## Phase 3A audit and checkpoint

Branch: `feature/phase-3-cyberpunk-room`. Created from the current Phase 1 branch without discarding its uncommitted Phase 1/2 changes. The inner checkout is outside the edit scope. Protected file hashes and an initial worktree patch are recorded in `phase3-artifacts/`.

The existing pipeline loads three Blender-exported glTF 2.0 GLBs (computer 113236 bytes, decor 84540, environment 95452) and three baked JPEGs through `Resources`. `BakedModel` assigns a shared, unlit MeshBasicMaterial, with sRGB textures and `flipY=false`, and scales each mesh by 900. GLB nodes have identity transforms with geometry positions already laid out together. Therefore those materials cannot respond to physical scene lights.

Coordinates are Y-up, with the workstation facing +Z. Existing environment bounds place the desk top near Y=-452 and floor near Y=-2980. The new original geometry will use 3000 scene units per nominal meter, a desk top at Y=-450 and floor at Y=-2700. This is an artist-scale convention to fit the established camera, not a claim that the old files use SI units.

The center screen's separate CSS3D and WebGL occlusion planes are 1280x1024, centered at (0,950,255), rotated -3 degrees on X; padding is 32, giving roughly 1216x960 child content. Its video/smudge/depth layers extend forward up to 96 units. New bezels must stay outside the full screen rectangle and no opaque chassis may cross the aperture. Both renderers use the same perspective camera. Keep `MonitorScreen`, bridge/configuration, and keyframe definitions byte-for-byte unchanged.

Camera contracts: loading (-35000,35000,35000), idle around (-20000,12000,20000), desk (0,1800,5500) with responsive/mouse adjustments, monitor (0,950,2000) with responsive Z, orbit start (-15000,10000,15000). Preserve these definitions and event names. The room must be an open-front/open-left cutaway so existing elevated left/front cameras can see the desk. Do not reposition the center monitor to fit an asset.

`World` constructs the scene on `resources.ready`, then updates it through the single existing Application/Time loop. Audio responds to existing document input and UI events; hitbox/raycast cursor classes are currently disabled in World. Actual monitor input is CSS iframe input forwarded through the secured bridge, not GLB mesh raycasts. Retain AudioManager and MonitorScreen creation/update paths.

The renderer already has WebGL, CSS3D, and an inherited shader-overlay renderer. Keep this compositor, sRGB output, pixel-ratio cap of 2, and transparent clear color. Add no bloom/postprocessing pass or renderer. The existing Application destroy lifecycle does not fully clean up every legacy listener/RAF/audio resource; new room resources must own their geometries/materials/textures and dispose independently.

## Architecture decision

Approach A (GLB reconstruction) depends on an editing workflow and asset-specific permissions not currently available. Approach C (procedural hardware plus licensed decorative GLBs) remains a possible future extension, but no decorative GLB has verified provenance here. Approach B is therefore used for all new geometry, integrated with the existing CSS3D compositor; "hybrid" below describes that integration, not the use of newly licensed GLBs.

Use a hybrid **integration architecture**, with original procedural PBR geometry for every new room/hardware object and the established CSS3D/video monitor compositor and audio. No external decorative GLB is needed or eligible until its redistribution rights are verified. Blender is not available on PATH; original procedural geometry avoids blocking on that tool or uncertain assets. Do not edit or duplicate the inherited GLBs/JPEGs.

Replace default World construction of Environment/Decor/Computer/CoffeeSteam with CyberpunkRoom. Retain the old source modules/assets and offer `?legacyRoom` as a reversible comparison path, without changing `?dev`. Filter unused legacy model/bake resources from the default load list; legacy mode retains the previous list and progress lifecycle.

Hierarchy:

```text
CyberpunkRoom
  Architecture (floor, back/right walls, panels, shelving)
  Workstation (desk/frame/mat, instanced keyboard, mouse/accessories/cables)
  MonitorArray (center aperture/frame/stand, two static original demo displays)
  PCTower (chassis, one glass panel, board/GPU/cooling silhouettes, fan rotors)
  Lighting (hemisphere fill, warm practical, cyan/violet accents)
```

Use small modules with a shared geometry/material/texture owner. Batch static box primitives by material, instance repeated keys, and reuse fan geometry. Fan animation uses the existing delta and stops under reduced-motion preference. Introduce no new RAF or event bus. Use one shadow-casting practical light with a bounded 1024 map. Keep transparent glass to one panel and avoid transmission/refraction passes. Generate small deterministic surface textures and original static side-display canvases locally; side displays explicitly identify themselves as illustrative demos, not personal projects or live metrics.

## Lighting and material boundary

New matte/metal objects use shared MeshStandardMaterial. The PC glass uses one restrained MeshPhysicalMaterial with opacity/clearcoat, no transmission rendering. Low hemisphere fill plus warm practical illumination and two limited cyan/violet accents provide separation. Magenta is a small hardware accent only. Do not recolor the iframe or change baked materials to pretend they react to lights. Preserve the existing tone-mapping/compositor settings to reduce monitor contrast risk. Enable a single soft shadow map for new geometry only.

Keep camera easing/keyframes intact. Add a reduced-motion branch to stop procedural fan motion and existing idle/desk drift, and use immediate existing-state transitions when requested; monitor responsive updates remain active. No new auto-camera sequence.

## Asset provenance and licensing

Repository LICENSE.md is MIT, copyright Henry Heffernan 2024, and will remain. Model, audio, font, monitor-texture/video, and contributor-specific grants are not independently established by that code notice. Keep required credits and explicitly record inherited assets as needing review. New geometry and procedural textures are original implementation work, with no downloads, stock art, external fonts, or asset packages. Default room does not instantiate unverified legacy GLBs. Static packaging still contains inherited files under the existing bundler; this is not a legal sign-off to publish them.

## Validation and rollback

Record the outer production baseline before editing. Checkpoint 3B: production build, supported TypeScript validation, actual Three.js scene construction without WebGL, geometric aperture/ray invariants, resource ownership/disposal, bridge regression suite, and protected file/inner-site hashes. Checkpoint 3C: validate light/shadow budget, instancing and static scene counts, reduced-motion fan behavior, final build/TypeScript/diff checks.

Browser startup previously failed at renderer initialization despite reachable DevTools. A manually launched Chrome rendered the old outer app according to the user; complete Phase 2C acceptance was not documented. Try the existing diagnostic once for the new scene; if blocked, explicitly leave visual acceptance, camera/input acceptance, mobile rendering, console inspection, and FPS/GPU measurements pending. Do not invent screenshot/performance evidence.

Rollback points: old model classes/assets remain unchanged and `?legacyRoom` restores their construction. New room is isolated behind World/source selection; protected screen/bridge/keyframe files remain unchanged. No dependency, inner-site, or personal-content edits. Stop if geometric tests show a center-screen aperture obstruction; fix the offending new object before continuing.

Feasibility: procedural construction can preserve the exact screen/camera coordinates, with the existing monitor independent of old GLBs. This is sufficient to proceed to 3B; real rendered acceptance remains a separate pending gate.
