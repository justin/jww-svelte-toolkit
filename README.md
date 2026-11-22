# jww-svelte-toolkit

Shared Svelte 5 theme and UI primitives for Justin's web apps. It ships source,
not a build: the consuming app's Vite, Svelte, and Tailwind compile it.

## What it provides

| Import | Contents |
| --- | --- |
| `jww-svelte-toolkit/theme.css` | Tailwind 4 setup, the neutral light and dark tokens, fonts, and base styles |
| `jww-svelte-toolkit/ui/<name>` | shadcn-svelte primitives, such as `ui/button` and `ui/dialog` |
| `jww-svelte-toolkit/utils` | `cn` and the shadcn helper types |
| `jww-svelte-toolkit/hooks/is-mobile.svelte` | `IsMobile` media-query state |
| `jww-svelte-toolkit/mode-toggle.svelte` | Light and dark toggle button; needs `<ModeWatcher />` from `mode-watcher` in the app layout |

## Using it in an app

The app needs SvelteKit or Vite with Svelte 5, `tailwindcss`, and
`@tailwindcss/vite`. Depend on a tagged release tarball, which installs without Git:

```json
"jww-svelte-toolkit": "https://github.com/justin/jww-svelte-toolkit/archive/refs/tags/v0.1.0.tar.gz"
```

Import the theme once, in the root layout or the app's own stylesheet:

```css
@import 'jww-svelte-toolkit/theme.css';
```

```svelte
<script lang="ts">
  import { Button } from 'jww-svelte-toolkit/ui/button';
  import * as Dialog from 'jww-svelte-toolkit/ui/dialog';
</script>
```

Override a token for one app by redefining it after the import, for example
`:root { --primary: ...; }`.

## Changing primitives

Primitives come from the shadcn-svelte registry and carry local edits. Add or
update one with the shadcn-svelte CLI from this directory (`components.json`
points it at `src/lib`), review the diff so local edits survive, then tag a
release and bump the tarball URL in each app.

There is no test suite here. Validate a change by installing it into a consuming
app and running that app's check, test, and build.
