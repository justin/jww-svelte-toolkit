# jww-svelte-toolkit

The theme and UI primitives I share across my Svelte 5 apps. It ships source,
not a build, so your app's Vite, Svelte, and Tailwind compile it.

This is mostly for me. I'm not maintaining it for anyone else's use, so expect
it to change whenever my apps need it to. Take whatever's useful.

## What's in it

| Import | What you get |
| --- | --- |
| `jww-svelte-toolkit/theme.css` | Tailwind 4 setup, the neutral light and dark tokens, fonts, and base styles |
| `jww-svelte-toolkit/ui/<name>` | shadcn-svelte primitives, like `ui/button` and `ui/dialog` |
| `jww-svelte-toolkit/utils` | `cn` and the shadcn helper types |
| `jww-svelte-toolkit/hooks/is-mobile.svelte` | `IsMobile` media-query state |
| `jww-svelte-toolkit/mode-toggle.svelte` | Light and dark toggle. Needs `<ModeWatcher />` from `mode-watcher` in your layout |

## Using it

You need SvelteKit or Vite with Svelte 5, plus `tailwindcss` and
`@tailwindcss/vite`.

Depend on a release tarball. It installs without Git, which keeps Docker
builds simple:

```json
"jww-svelte-toolkit": "https://github.com/justin/jww-svelte-toolkit/archive/refs/tags/0.1.0.tar.gz"
```

Import the theme once, in your root layout or stylesheet:

```css
@import 'jww-svelte-toolkit/theme.css';
```

Then use the primitives:

```svelte
<script lang="ts">
  import { Button } from 'jww-svelte-toolkit/ui/button';
  import * as Dialog from 'jww-svelte-toolkit/ui/dialog';
</script>
```

To change a token for one app, redefine it after the import:
`:root { --primary: ...; }`.

## Changing primitives

The primitives come from the shadcn-svelte registry, and some carry local
edits. Add or update one with the shadcn-svelte CLI from this directory;
`components.json` points it at `src/lib`. Check the diff so the local edits
survive, tag a release, and bump the tarball URL in each app.

Dependabot doesn't track the tarball URL, so those bumps are manual.

There's no test suite here. To validate a change, install it into an app and
run that app's check, test, and build.
