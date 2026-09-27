# HMR refresh during hydration

Minimal reproduction: saving a server component while the page is still
hydrating logs React's "Can't perform a React state update on a component
that hasn't mounted yet", and a hydration error if the edit changed the
rendered output.

Reproduces with `next@16.4.0-canary.50` (pinned here) and `next@16.3.4`, with
both Turbopack and webpack.

1. `npm install`, then `npm run dev` (`npm run dev:webpack` behaves the same).
2. Open http://localhost:3000 with the browser console open. The page shows
   "Status: hydrating..." for about 8 seconds, then "Status: hydrated".
   `app/slow-hydration.js` renders 200 client components that each block for
   20 ms, so hydration lasts long enough to hit by hand. They only widen the
   window; they don't cause the bug.
3. Reload. While it still says "hydrating...", change `Server text: v1` to
   `Server text: v2` in `app/page.js` and save.
