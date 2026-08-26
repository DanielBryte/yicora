import { VideoProvider } from "./types";
import { MockVideoProvider } from "./mock-provider";

export function getVideoProvider(): VideoProvider {
  // If third-party API key exists (e.g. REPLICATE_API_TOKEN), initialize production provider.
  // Otherwise, safely fallback to developer mock provider.
  return new MockVideoProvider();
}

export * from "./types";
