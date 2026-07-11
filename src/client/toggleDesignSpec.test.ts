import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { toggleDesignSpec } from "./toggleDesignSpec";
import { TOGGLE_EVENT } from "../shared/constants";

/* Node env (no jsdom): stand in a minimal `window` that can receive events.
   That's all toggleDesignSpec touches — it dispatches and returns. */

describe("toggleDesignSpec", () => {
  let target: EventTarget;

  beforeEach(() => {
    target = new EventTarget();
    vi.stubGlobal("window", target);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("dispatches the toggle event with no force by default", () => {
    const seen: (boolean | undefined)[] = [];
    target.addEventListener(TOGGLE_EVENT, (e) => {
      seen.push((e as CustomEvent<{ force?: boolean }>).detail?.force);
    });
    toggleDesignSpec();
    expect(seen).toEqual([undefined]);
  });

  it("passes force=true / force=false through the event detail", () => {
    const seen: (boolean | undefined)[] = [];
    target.addEventListener(TOGGLE_EVENT, (e) => {
      seen.push((e as CustomEvent<{ force?: boolean }>).detail?.force);
    });
    toggleDesignSpec(true);
    toggleDesignSpec(false);
    expect(seen).toEqual([true, false]);
  });

  it("is a no-op without a window (SSR)", () => {
    vi.unstubAllGlobals();
    // In node there is no global `window`; the guard must simply return.
    expect(() => toggleDesignSpec(true)).not.toThrow();
  });
});
