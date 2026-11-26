<script lang="ts" module>
	import { type VariantProps, tv } from "tailwind-variants";

	export const alertVariants = tv({
		base: "grid gap-0.5 rounded-lg border px-4 py-3 text-left text-sm has-[>svg]:grid-cols-[auto_1fr] has-[>svg]:gap-x-2.5 *:[svg]:row-span-2 *:[svg]:translate-y-0.5 *:[svg]:text-current *:[svg:not([class*='size-'])]:size-4 group/alert relative w-full",
		variants: {
			variant: {
				default: "bg-muted/60 text-card-foreground shadow-sm",
				warning: "border-warning/40 bg-warning/15 text-warning-foreground",
				success: "border-success/40 bg-success/10 shadow-sm *:[svg]:text-success",
				destructive: "border-destructive/40 bg-destructive/10 text-destructive shadow-sm *:data-[slot=alert-description]:text-destructive/90 *:[svg]:text-current",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	});

	export type AlertVariant = VariantProps<typeof alertVariants>["variant"];
</script>

<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import XIcon from "@lucide/svelte/icons/x";
	import { Button } from "#lib/components/ui/button/index.js";
	import { cn, type WithElementRef } from "#lib/utils.js";
	import Action from "./alert-action.svelte";

	let {
		ref = $bindable(null),
		class: className,
		variant = "default",
		dismissible = true,
		dismissLabel = "Dismiss alert",
		ondismiss,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		variant?: AlertVariant;
		dismissible?: boolean;
		dismissLabel?: string;
		ondismiss?: () => void;
	} = $props();

	let dismissed = $state(false);

	function dismiss() {
		dismissed = true;
		ondismiss?.();
	}
</script>

{#if !dismissed}
	<div
		bind:this={ref}
		data-slot="alert"
		role="alert"
		class={cn(alertVariants({ variant }), dismissible && "pr-18", className)}
		{...restProps}
	>
		{@render children?.()}
		{#if dismissible}
			<Action>
				<Button variant="ghost" size="icon-sm" onclick={dismiss} aria-label={dismissLabel}>
					<XIcon />
				</Button>
			</Action>
		{/if}
	</div>
{/if}
