import { getFrame } from "./frames";

export interface ParsedCustomization {
  frameName?: string;
  note?: string;
}

/** Reads the `customization` field, which stores JSON `{ frame, note }` for
 *  customizer-created items, but falls back to treating older/plain values
 *  as a freeform note. */
export function parseCustomization(raw?: string | null): ParsedCustomization {
  if (!raw) return {};
  try {
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === "object") {
      return {
        frameName: parsed.frame ? getFrame(parsed.frame).name : undefined,
        note: parsed.note || undefined,
      };
    }
  } catch {
    return { note: raw };
  }
  return {};
}
