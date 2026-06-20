<!-- GSD:project-start source:PROJECT.md -->

## Project

**Focus Timer**

A universal mobile/web Pomodoro focus timer built with React Native and Expo. It helps users manage their focus and break sessions with a clean visual representation of time remaining and customizable audio cues.

**Core Value:** Provide a simple, distraction-free Pomodoro timer that consistently works and respects user state.

### Constraints

- **Tech Stack**: React Native (Expo ~55.0.0, Expo Router ~55.0.0) — Must maintain compatibility with existing version constraints.
- **Ecosystem**: Expo Audio (`expo-audio`) — Audio playback must utilize the `expo-audio` library.
- **Storage**: AsyncStorage (`@react-native-async-storage/async-storage`) — Preference configurations must be persisted using AsyncStorage.
- **UI/Layout**: Simple, dark-themed UI. Timer screen must remain uncluttered by additional controls.

<!-- GSD:project-end -->

<!-- GSD:stack-start source:codebase/STACK.md -->

## Technology Stack

## Languages

- TypeScript 5.9.x - Used for all React Native screens, components, layouts, hooks, and configuration files.
- JavaScript - Configuration files like `eslint.config.js`.

## Runtime

- Node.js v22.22.x - Build time environment.
- Hermes - JavaScript engine running inside the React Native / Expo runtime in production and development.
- npm 9.2.x
- Lockfile: `package-lock.json` present.

## Frameworks

- Expo ~55.0.26 (React Native) - Universal React framework for Android, iOS, and Web.
- Expo Router ~55.0.16 - File-based routing navigation library.
- None configured in the codebase.
- TypeScript Compiler - Typechecking and compilation.
- Expo CLI - Bundling, compilation, and starting dev server.

## Key Dependencies

- `react` 19.2.0 & `react-native` 0.83.6 - Core application library and native runtime.
- `react-native-svg` 15.15.3 - Used for drawing the circular progress indicator in [CircularProgress.tsx](file:///home/hide6644/vscode/focus-timer/components/CircularProgress.tsx).
- `@react-native-async-storage/async-storage` 2.2.0 - Local storage library used for persistent user settings in [useSettings.ts](file:///home/hide6644/vscode/focus-timer/hooks/useSettings.ts).
- `expo-audio` ~55.0.14 - Used for beep sound notifications on session completion in [index.tsx](file:///home/hide6644/vscode/focus-timer/app/(tabs)/index.tsx).
- `react-native-google-mobile-ads` ^16.3.1 - Integration with Google Mobile Ads (AdMob) for display advertising in [AdMob.tsx](file:///home/hide6644/vscode/focus-timer/components/AdMob.tsx).

## Configuration

- No environment variables directly specified in code (mock banner unit IDs are defined statically in `AdMob.web.tsx`).
- `tsconfig.json` - TypeScript compiler config.
- `app.json` - Expo configuration (metadata, orientation, icons, splash screen, plugins, iOS/Android bundles).
- `eas.json` - Expo Application Services configurations for Android/iOS builds.
- `eslint.config.js` - ESLint configuration.

## Platform Requirements

- Android SDK, Xcode (for iOS), Node.js (for Metro bundler).
- Expo Go application on mobile devices or emulators for quick testing.
- Android 6.0+ (API 23+)
- iOS 13.4+
- Web browsers (running via react-native-web)

<!-- GSD:stack-end -->

<!-- GSD:conventions-start source:CONVENTIONS.md -->

## Conventions

## Naming Patterns

- React components and screens: PascalCase for components (e.g. `CircularProgress.tsx`), lowercase for standard tab screen entry points (e.g. `settings.tsx`).
- Layout files: `_layout.tsx` (Expo Router layout specification).
- Hooks: `use` + camelCase (e.g., `usePomodoroTimer.ts`).
- Configs/Constants: PascalCase or camelCase (e.g. `TimerConfig.ts`, `theme.ts`).
- camelCase for functions (e.g., `formatTime`, `loadSettings`).
- Event handlers: `handle` + Event (e.g., `handleSave`, `handleSessionComplete`).
- Action callbacks: Verb (e.g. `toggleTimer`, `resetTimer`).
- camelCase for local variables.
- UPPER_SNAKE_CASE for config parameters and keys (e.g., `DEFAULT_FOCUS_TIME_SEC`, `STORAGE_KEY_FOCUS`).
- PascalCase for type declarations and interfaces (e.g. `CircularProgressProps`).

## Code Style

- Controlled implicitly via TypeScript compiler options and ESLint flat rules.
- 2-space indentation.
- Single quotes for JavaScript strings (except when double quotes are necessary).
- Semicolons used consistently at the end of statements.
- ESLint with flat config in `eslint.config.js`.
- Config extending `eslint-config-expo/flat`.
- Run: `npm run lint`.

## Import Organization

## Error Handling

- Try/Catch blocks are standard for asynchronous boundaries or native execution wrappers (e.g. AsyncStorage fetch, native audio playback triggers).
- Catch blocks should log details to the console using `console.error` (e.g., `console.error('Error saving settings', e)`) or `console.log`.
- In case of failure, system states must fall back to safe presets (e.g., default timer values if AsyncStorage loading fails).

## Logging

- Direct usage of `console.log` for debugging and non-critical info logs (e.g. audio load errors).
- Direct usage of `console.error` for exception stack traces in storage hooks.
- No structured logger library is integrated yet.

## Comments

- Single-line comments starting with `//` to explain logic, specific settings conversions, or state resets.
- Use block comments sparingly for structural file descriptions.

## Function Design

- Core custom hooks encapsulate logic and return an object structure containing state variables and memoized control functions.
- Use `useCallback` for returning function references from hooks to prevent unnecessary component re-renders (e.g. `toggleTimer`, `resetTimer`).

## Module Design

- Named exports are preferred for utilities and hooks (e.g., `export function useSettings()`).
- Default exports are preferred for screen files (e.g., `export default function SettingsScreen()`).

<!-- GSD:conventions-end -->

<!-- GSD:architecture-start source:ARCHITECTURE.md -->

## Architecture

## Pattern Overview

- **Custom Hooks for State & Logic:** Decouples core logic (timer calculations, persistence) from UI rendering.
- **File-Based Routing:** Screen navigation layout is derived entirely from the structure of the `app` directory.
- **Client-Side Storage:** State is persisted entirely on the device (using AsyncStorage), with no backend database or cloud synchronization.
- **Conditional Platform Rendering:** Uses platform-specific file extensions (e.g., `AdMob.tsx` vs `AdMob.web.tsx`) and helper logic to fall back gracefully on unsupported platforms like Web.

## Layers

- **Purpose:** Declare app navigation hierarchy and layout. Connect custom state/logic hooks to UI components.
- **Contains:** Navigation layouts, screen containers, view cycle handlers (`useFocusEffect`).
- **Location:** [app/](file:///home/home/hide6644/vscode/focus-timer/app)
- **Depends on:** `hooks/`, `components/`, `constants/`
- **Purpose:** Encapsulate timer mechanics and local persistence settings.
- **Contains:** State hook definitions, AsyncStorage access wrappers, helper callbacks.
- **Location:** [hooks/](file:///home/home/hide6644/vscode/focus-timer/hooks)
- **Depends on:** `constants/`
- **Purpose:** Reusable UI controls.
- **Contains:** Progress indicators, mock/native advertising slots, custom text/view containers.
- **Location:** [components/](file:///home/home/hide6644/vscode/focus-timer/components)
- **Depends on:** React Native APIs, `constants/`
- **Purpose:** System configurations and design tokens.
- **Contains:** Static timer durations, theme color definitions, system font setups.
- **Location:** [constants/](file:///home/home/hide6644/vscode/focus-timer/constants)
- **Depends on:** Nothing

## Data Flow

## Key Abstractions

- **Purpose:** Main timer logic coordinator. Handles ticks, resets, switching modes, and syncing settings on configuration change.
- **Location:** [usePomodoroTimer.ts](file:///home/hide6644/vscode/focus-timer/hooks/usePomodoroTimer.ts)
- **Pattern:** Custom React Hook with internal state and refs.
- **Purpose:** Encapsulate configuration persistence.
- **Location:** [useSettings.ts](file:///home/hide6644/vscode/focus-timer/hooks/useSettings.ts)
- **Pattern:** Custom React Hook wrapping AsyncStorage CRUD logic.
- **Purpose:** Render a visual representation of progress using an SVG Circle path.
- **Location:** [CircularProgress.tsx](file:///home/hide6644/vscode/focus-timer/components/CircularProgress.tsx)
- **Pattern:** Stateless functional UI component.

## Entry Points

- **Location:** `expo-router/entry` (mapped in `package.json` `"main"` property).
- **Responsibilities:** Registers the root application component and sets up the bundle context.
- **Location:** [app/_layout.tsx](file:///home/hide6644/vscode/focus-timer/app/_layout.tsx)
- **Responsibilities:** Mounts the Expo Router Stack context, configures initial screen setups.

## Error Handling

- **Settings load/save failures:** Wrapped in try/catch in [useSettings.ts](file:///home/hide6644/vscode/focus-timer/hooks/useSettings.ts). On error, details are printed to the console, and default durations are used.
- **Audio playback failures:** Wrapped in try/catch in [index.tsx](file:///home/hide6644/vscode/focus-timer/app/(tabs)/index.tsx) to prevent crashes if `beep.mp3` fails to decode or load in specific host conditions.

## Cross-Cutting Concerns

- Handled via React Native's `StyleSheet.create` utilities. Style properties use color constants defined in [theme.ts](file:///home/hide6644/vscode/focus-timer/constants/theme.ts).
- Handled by system styling matching platforms in [theme.ts](file:///home/hide6644/vscode/focus-timer/constants/theme.ts). Custom systems fonts (like iOS `system-ui` vs Web `-apple-system`) map to defined variables `sans`, `serif`, `rounded`, and `mono`.

<!-- GSD:architecture-end -->

<!-- GSD:skills-start source:skills/ -->

## Project Skills

No project skills found. Add skills to any of: `.agent/skills/`, `.agents/skills/`, `.cursor/skills/`, `.github/skills/`, or `.codex/skills/` with a `SKILL.md` index file.
<!-- GSD:skills-end -->

<!-- GSD:workflow-start source:GSD defaults -->

## GSD Workflow Enforcement

Before using Edit, Write, or other file-changing tools, start work through a GSD command so planning artifacts and execution context stay in sync.

Use these entry points:

- `/gsd-quick` for small fixes, doc updates, and ad-hoc tasks
- `/gsd-debug` for investigation and bug fixing
- `/gsd-execute-phase` for planned phase work

Do not make direct repo edits outside a GSD workflow unless the user explicitly asks to bypass it.
<!-- GSD:workflow-end -->

<!-- GSD:profile-start -->

## Developer Profile

> Generated by GSD from questionnaire. Run `/gsd-profile-user` to update.

| Dimension | Rating | Confidence |
|-----------|--------|------------|
| Communication | terse-direct | MEDIUM |
| Decisions | deliberate-informed | MEDIUM |
| Explanations | detailed | MEDIUM |
| Debugging | fix-first | MEDIUM |
| UX Philosophy | pragmatic | MEDIUM |
| Vendor Choices | conservative | MEDIUM |
| Frustrations | instruction-adherence | MEDIUM |
| Learning | guided | MEDIUM |

**Directives:**

- **Communication:** Keep responses concise and action-oriented. Skip lengthy preambles. Match this developer's direct style.
- **Decisions:** Present options in a structured comparison table with pros/cons. Let the developer make the final call.
- **Explanations:** Explain the approach, key trade-offs, and code structure alongside the implementation. Use headers to organize.
- **Debugging:** Prioritize the fix. Show the corrected code first, then optionally explain what was wrong. Minimize diagnostic preamble.
- **UX Philosophy:** Build clean, usable interfaces without over-engineering. Apply basic design principles (spacing, alignment, contrast).
- **Vendor Choices:** Recommend well-established, widely-adopted tools with strong community support. Avoid bleeding-edge options.
- **Frustrations:** Follow instructions precisely. Re-read constraints before responding. If requirements conflict, flag the conflict rather than silently choosing.
- **Learning:** Explain concepts in context of the developer's codebase. Use their actual code as examples when teaching.

<!-- GSD:profile-end -->
