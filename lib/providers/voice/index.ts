import { VoiceProvider } from "./types";
import { MockVoiceProvider } from "./mock-provider";

export function getVoiceProvider(): VoiceProvider {
  return new MockVoiceProvider();
}

export * from "./types";
export * from "./mock-provider";
