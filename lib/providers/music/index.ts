import { MusicProvider } from "./types";
import { SoundverseMusicProvider } from "./soundverse-provider";

export function getMusicProvider(): MusicProvider {
  return new SoundverseMusicProvider();
}

export * from "./types";
export * from "./mock-provider";
export * from "./soundverse-provider";
