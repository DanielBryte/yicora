import { MusicProvider } from "./types";
import { MockMusicProvider } from "./mock-provider";

export function getMusicProvider(): MusicProvider {
  return new MockMusicProvider();
}

export * from "./types";
export * from "./mock-provider";
