# Fluffy: Nine Lives, Nine Legends — PRD

## Original Problem Statement
A premium narrative point-and-click adventure inspired by LucasArts SCUMM, Broken Sword, and Ren'Py. Player controls Fluffy, a black housecat who believes he is the Demon Destroyer of Worlds. Core feature: contrast between Fluffy's epic fantasy interpretation of reality and the ordinary neighborhood reality. Nine interconnected chapters; hand-painted environments; inventory puzzles; Ren'Py dialogue presentation; quest journal; fantasy↔reality toggle.

## User Choices Locked
- **Scope**: Polished playable Chapter 1 (vertical slice) with full mechanics
- **AI**: NONE — fully scripted, hand-crafted content (no API keys)
- **Persistence**: localStorage save (no backend auth)
- **Art**: Curated illustration assets provided by design agent
- **Universal Key**: not used (user opted out)

## Architecture
- **Frontend**: React + Tailwind + Shadcn (single-page game, no SSR).
  - `src/data/chapter1.js` — all scripted rooms, items, dialogue trees, quests, combos.
  - `src/store/GameContext.jsx` — useReducer-based game state + auto-save to localStorage.
  - `src/pages/MainMenu.jsx` — title screen with New Game / Continue / Chapters / Settings / Credits.
  - `src/pages/Game.jsx` — game stage composing scene viewport + HUD.
  - `src/components/game/*` — SceneViewport, VerbPanel, InventoryBar, DialogueBox, MonologueCaption, FantasyToggle, TopBar, QuestJournal, EndingOverlay, SettingsModal, CreditsModal, ChaptersModal.
- **Backend**: untouched template (no game data persisted server-side).
- **Routing**: `/` main menu, `/game` chapter 1.
- **Fonts**: IM Fell English (display/SC), Pirata One (script), Cormorant Garamond (dialogue), Crimson Text (body) — Google Fonts.
- **Art assets**: design-agent generated illustrations (main menu, fantasy/reality scenes, portraits, ornate UI).

## Chapter 1 Content (Implemented)
- **Rooms**: bedroom (Sanctum of Eternal Slumber), livingroom (Hall of the Cursed Throne), garden (Forbidden Realm of the Stone Mage). Each has fantasy + reality versions of titles and entry monologues.
- **Hotspots** (~13 total) with Look/Use/Take/Talk responses, all dual-narrated.
- **Items**: Whisker (Key of Awakening), Catnip (Pouch of Wild Madness), Yarn (Orb of Binding Fates), Hair Tie (Ring of Mortal Weakness), Talisman of Ferocity (combine).
- **Dialogue tree**: full branching tree with Grumbleknot the Stone Sage (the garden gnome).
- **Puzzle**: Combine catnip + yarn → Talisman → Use on vacuum → Chapter ending.
- **Quest journal**: 5 quests with derived status, relic codex, chronicle log.
- **Fantasy/Reality toggle**: applies to scene backgrounds, all titles, all narration, all hotspot labels, all item names, all quest text.
- **Auto-save**: every state change persisted to localStorage under `fluffy_save_v1`.

## What's Implemented (2026-02-01)
- ✅ Main menu with hero background, 5 menu actions, candle ambience.
- ✅ Game scene with hand-painted bg, animated hotspots, vignette, title.
- ✅ SCUMM verbs (Examine/Use/Speak/Claim) + Combine mode.
- ✅ Ren'Py-style dialogue box with portraits, typewriter, branching choices.
- ✅ Monologue caption (Fluffy's internal narration) with portrait and dismiss.
- ✅ Fantasy ↔ Reality toggle with full content duality.
- ✅ Inventory bar with relic glyphs, hover names, select-for-use, combine flow.
- ✅ Quest journal modal with tabs (Quests / Relics / Chronicle).
- ✅ Room map with locked/visited/active states.
- ✅ Chapter ending overlay.
- ✅ Settings + Credits + Chapters modals.
- ✅ Custom paw cursor, ornate frames, candlelight glow, parchment surfaces.
- ✅ Lint-clean.

## What's Implemented (2026-06-03)
- ✅ Main menu **Reality** view now uses a dedicated handcrafted background (apartment-study-with-cat-tree-throne artwork) instead of the previous color-filtered fantasy bg. Left side has a stronger vertical veil so the title block stays readable; right side is left mostly clear so the cat is the hero of the frame.
- ✅ **Settings → Atmospheric Volume** is now wired to the live ambient music. The slider directly drives `music.setVolume()` and persists via the music hook's own `fluffy_music_vol` localStorage key (single source of truth). New inline mute button shows live `♪ 70%` / `𝄽 MUTED` state. Moving the slider while muted auto-unmutes (good UX).
- 🧹 Removed the duplicate, non-functional `volume` field that used to live inside `fluffy_settings_v1` — settings modal no longer owns audio state.
- ✅ **`useAmbientMusic` refactored to a module-level singleton.** One shared `<audio>` element is reused across MainMenu, Game and Trailer — navigating between screens just swaps the src with a soft crossfade. Verified: only 1 Audio instance is ever created during a full menu → game → menu cycle, and the menu intro track no longer keeps playing on top of the in-game track. Volume/mute notify all subscribers so any screen's controls stay in sync.
- ✅ **Fluffy himself is now interactable.** Clicking the Fluffy sprite triggers the current verb (`Look` / `Touch` / `Talk` / `Take`) against a special `'self'` hotspot id. New `FLUFFY_SELF` data table in `chapter1.js` provides cycling fantasy + reality lines per verb, plus per-room overrides for `look` (bedroom / livingroom / garden). Visual: subtle gold+green glow on hover.

## What's Implemented (2026-06-04)
- ✅ **New room artwork swapped in** for Bedroom (Fantasy + Reality), Living Room (Fantasy) and Backyard/Garden (Fantasy + Reality). Fixed a latent bug where `livingroom.bgFantasy` was incorrectly pointing at the reality asset.
- ✅ **Movement system (Path D — bridge phase)**: Fluffy now walks to the target hotspot instead of teleporting. Walk duration is distance-proportional (22 ms/% with min 180 / max 700 ms). Monologue/dialogue fires at ~60% of the walk (Monkey-Island SE feel) so the game stays responsive; verb-specific arrival pose lands when he arrives. Clicking Fluffy himself skips the walk.
- ✅ **Expanded CSS animation library** on the existing single sprite: new keyframes for `walking` (squash bob), `paw`, `pickup`, `sniff`, `sleep` (breathing), plus reworked `examine/touch/talk/take`. Walk-cycle frame swap happens in JS every 180 ms via `WALK_CYCLE`.
- ✅ **Ambient idle drift**: when Fluffy is idle for >3.5–8 s, his pose subtly drifts between `idle / sit / look / (rare) sleep` instead of being a statue.
- ✅ **Sprite library scaffolding (Path A foundation)**: new `data/sprites.js` + `components/game/SpriteRenderer.jsx`. Supports two upload formats — one PNG per pose **or** a single sheet with bounding boxes — and falls back to the existing single sprite when a pose isn't registered. You can drop in pose PNGs one at a time without breaking the game.
- ✅ **Reality Fluffy sprite set fully wired** (2026-06-04): 10 transparent PNG poses uploaded and mapped — `idle (stand)`, `walk1`, `walk2`, `sit (forward)`, `look (look-up)`, `sniff (play-crouch)`, `paw (touch)`, `pickup (look-down)`, `sleep (curled)`, `groom (cleaning)`. Engine now renders each pose contextually per verb. `/preview` shows all 10 as `CUSTOM SPRITE`.
- ✅ **Concept Art Bible** authored at `/app/memory/CONCEPT_ART_BIBLE.md` — full art briefs for chapters II–IX (Reality + Fantasy + key objects), with copy-paste-ready image prompts and special direction for Queen LaSqueeka's debut in Ch. III.
- ✅ **Future-chapter scaffolding** at `data/futureChapters.js` — pre-set room ids / titles / spawnX / music wiring for chapters II–IX so dropping in real art is a 2-URL swap.
- ✅ **`/preview` developer route**: Fluffy Poses tab + Room Backgrounds tab, side-by-side Reality vs Fantasy panes, live status badges (`CUSTOM SPRITE` / `FALLBACK` for sprites, `LIVE` / `placeholder art` for rooms).

## Prioritized Backlog
- **P0** — None blocking.
- **P1** — Add subtle ambient audio loop (would need user upload or stock SFX).
- **P1** — More hotspot interactions per room for puzzle depth.
- **P2** — Animated transitions when changing rooms (fade-to-black).
- **P2** — Chapter II onward.
- **P2** — Account-based cloud saves (would require backend auth — currently deferred).
- **P2** — TTS narration for Fluffy's monologue (user opted out of integrations).

## Personas
- **Adventure-game fan (Primary)** — wants SCUMM-style puzzles, environmental humor, beautiful art.
- **Casual narrative reader** — drawn in by Fluffy's POV and dual-reality gag.
- **Cat lover** — there for the cat. Stays for the cat.
