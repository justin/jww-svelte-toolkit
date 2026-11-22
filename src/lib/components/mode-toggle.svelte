<script lang="ts">
	import MoonIcon from '@lucide/svelte/icons/moon';
	import SunIcon from '@lucide/svelte/icons/sun';
	import { Button } from '#lib/components/ui/button/index.js';
	import { toggleMode } from 'mode-watcher';
</script>

<Button aria-label="Toggle theme" onclick={toggleMode} size="icon" variant="outline">
	<SunIcon class="scale-100 rotate-0 transition-transform dark:scale-0 dark:-rotate-90" />
	<MoonIcon class="absolute scale-0 rotate-90 transition-transform dark:scale-100 dark:rotate-0" />
	<span class="sr-only">Toggle theme</span>
</Button>
