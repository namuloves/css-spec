/** Default mount path for the dev-only design-spec API route. The client
    component fetches here unless given an `apiPath` prop; the consumer mounts
    `createDesignSpecHandler()` at the matching route. */
export const DEFAULT_API_PATH = "/api/design-spec-dev";

/** Window event dispatched by `toggleDesignSpec()`; the mounted overlay
    listens for it and flips (or forces) its enabled state. */
export const TOGGLE_EVENT = "css-spec:toggle";
