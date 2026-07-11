import { TOGGLE_EVENT } from "../shared/constants";

/** Programmatically toggle the overlay — the imperative twin of pressing ⌥D.
    Pass `force` to set an explicit on/off state instead of flipping. Useful for
    host-page "Inspect" buttons, dev toolbars, or Storybook. No-op when no
    overlay is mounted (including production, where the overlay never mounts). */
export function toggleDesignSpec(force?: boolean): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(TOGGLE_EVENT, { detail: { force } }));
}
