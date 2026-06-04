// ============================================================================
// Fluffy Sprite Library  ─  Path A (multi-sprite) configuration
// ----------------------------------------------------------------------------
// Each entry in SPRITES describes ONE pose for ONE mode. When a pose+mode
// combo is registered here, the SpriteRenderer will use it instead of the
// generic single-sprite fallback. Poses not registered here fall back to the
// `FALLBACK_SPRITE` image (with CSS animations) automatically — so the game
// never breaks when you upload sprites one at a time.
//
// ----------------------------------------------------------------------------
// To register a new pose:
//   1. Upload a TRANSPARENT-BACKGROUND .png to customer-assets (one file per
//      pose, OR a single sheet containing several poses).
//   2. Add an entry below. Two formats are supported:
//
//   Format A — one PNG per pose (RECOMMENDED, easiest):
//      reality: {
//        idle:  { url: '<url-to-idle.png>' },
//        sit:   { url: '<url-to-sit.png>' },
//        walk1: { url: '<url-to-walk1.png>' },
//        walk2: { url: '<url-to-walk2.png>' },
//        ...
//      }
//
//   Format B — sprite-sheet with bounding boxes (for compact uploads):
//      reality: {
//        _sheet: { url: '<url>', naturalWidth: 2048, naturalHeight: 2048 },
//        idle:  { sheet: true, x:   30, y:   60, w: 280, h: 320 },
//        walk1: { sheet: true, x:  340, y:   60, w: 320, h: 300 },
//        ...
//      }
//
//   Both formats can be mixed within a mode.
// ----------------------------------------------------------------------------

export const FALLBACK_SPRITE =
    'https://customer-assets.emergentagent.com/job_nine-lives-quest/artifacts/e7nxl8cp_1.png';

// The pose IDs the renderer knows how to ask for. Order matters for animation
// playback (e.g. WALK_CYCLE alternates walk1 ↔ walk2).
export const POSES = {
    IDLE:    'idle',
    SIT:     'sit',
    WALK_1:  'walk1',
    WALK_2:  'walk2',
    LOOK:    'look',       // head-up, examining
    SNIFF:   'sniff',      // head-down toward object
    PAW:     'paw',        // paw-up, mid-inspect
    PICKUP:  'pickup',     // bending to take
    SLEEP:   'sleep',      // curled up
    GROOM:   'groom',      // licking-paw self-care
    // Fantasy-flavored poses (Fluffy's heroic self-image)
    REGAL:        'regal',
    PROCLAMATION: 'proclamation',
};

export const WALK_CYCLE = [POSES.WALK_1, POSES.WALK_2];

// ─────────────────────────────────────────────────────────────────────────
// Sprite library. Starts empty — every pose currently falls back to the
// single static sprite + CSS animation. Drop entries in as PNGs arrive.
// ─────────────────────────────────────────────────────────────────────────
export const SPRITES = {
    reality: {
        idle:   { url: 'https://customer-assets.emergentagent.com/job_nine-lives-quest/artifacts/3jwy5lys_Fluffy%20reality%20stand.png' },
        walk1:  { url: 'https://customer-assets.emergentagent.com/job_nine-lives-quest/artifacts/49qaak9c_Fluffy%20reality%20walk%201.png' },
        walk2:  { url: 'https://customer-assets.emergentagent.com/job_nine-lives-quest/artifacts/ik3h0w1x_Fluffy%20reality%20walk%202.png' },
        sit:    { url: 'https://customer-assets.emergentagent.com/job_nine-lives-quest/artifacts/wx3v8vk7_Fluffy%20reality%20sit%20Facing%20forward.png' },
        look:   { url: 'https://customer-assets.emergentagent.com/job_nine-lives-quest/artifacts/ajx7ooc3_Fluffy%20reality%20sit%20look%20up.png' },
        sniff:  { url: 'https://customer-assets.emergentagent.com/job_nine-lives-quest/artifacts/41xkdm62_Fluffy%20reality%20play-crouch.png' },
        paw:    { url: 'https://customer-assets.emergentagent.com/job_nine-lives-quest/artifacts/jppqpy3f_Fluffy%20reality%20paw.png' },
        pickup: { url: 'https://customer-assets.emergentagent.com/job_nine-lives-quest/artifacts/f7ngjtgr_Fluffy%20reality%20sit%20look%20down.png' },
        sleep:  { url: 'https://customer-assets.emergentagent.com/job_nine-lives-quest/artifacts/y9utwzsg_Fluffy%20reality%20sleep.png' },
        groom:  { url: 'https://customer-assets.emergentagent.com/job_nine-lives-quest/artifacts/9lpf6zu1_Fluffy%20reality%20sit%20clean.png' },
    },
    fantasy: {
        // Waiting on transparent-background fantasy sprites.
    },
};

/**
 * Resolve the best sprite for a (mode, pose) request.
 * Returns one of:
 *   { kind: 'image', url }
 *   { kind: 'sheet', url, x, y, w, h, naturalWidth, naturalHeight }
 *   { kind: 'fallback', url }   ← single static sprite, animated via CSS
 */
export function resolveSprite(mode, pose) {
    const modeLib = SPRITES[mode] || {};
    const entry   = modeLib[pose];
    if (entry && entry.url) {
        return { kind: 'image', url: entry.url };
    }
    if (entry && entry.sheet && modeLib._sheet) {
        return {
            kind: 'sheet',
            url: modeLib._sheet.url,
            naturalWidth:  modeLib._sheet.naturalWidth,
            naturalHeight: modeLib._sheet.naturalHeight,
            x: entry.x, y: entry.y, w: entry.w, h: entry.h,
        };
    }
    return { kind: 'fallback', url: FALLBACK_SPRITE, pose };
}
