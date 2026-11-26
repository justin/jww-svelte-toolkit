<script lang="ts">
  import { Button } from 'jww-svelte-toolkit/ui/button';
  import * as Alert from 'jww-svelte-toolkit/ui/alert';

  let { busy = false, disabled = false, onclick }: {
    busy?: boolean;
    disabled?: boolean;
    onclick?: () => void;
  } = $props();
</script>

<Button {busy} {disabled} {onclick} busyLabel="Saving">Save</Button>
<Button href="#details" {busy} {onclick}>Details</Button>
<Alert.Root variant="warning" dismissible={false} role="note">Unsaved changes</Alert.Root>
<Alert.Root>Saved</Alert.Root>
