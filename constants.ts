import { PodcastChannel } from './types';

export const PODCAST_DATA: PodcastChannel = {
  title: "Cosmic Royale with CasTo",
  description: "The cosmic audio realm where CasTo breaks minds, flips realities, and drops raw truth with neon energy.",
  author: "CasTo",
  image: "https://picsum.photos/seed/cosmicroyale/800/800", // Placeholder as requested
  episodes: [
    {
      id: "episode1",
      title: "Why You Feel Stuck (And How To Break Through)",
      description: "You’re not broken — you're blocked. This episode clears the fog and resets your momentum. We dive deep into the energetic stagnation that plagues modern creators.",
      pubDate: "Mon, 01 Dec 2025",
      duration: "10:00",
      audioUrl: "", // Empty for demo purposes, will simulate playback
      explicit: true
    },
    {
      id: "episode2",
      title: "The Hidden Signs You’re Sabotaging Yourself",
      description: "Laziness is a myth — self-sabotage is real. This episode exposes your internal traps, the shadow self, and the subconscious wiring keeping you tethered to the ground.",
      pubDate: "Tue, 02 Dec 2025",
      duration: "12:20",
      audioUrl: "",
      explicit: true
    }
  ]
};

export const INITIAL_CHAT_MESSAGE = "Greetings, traveler. I am the digital echo of CasTo. Ready to ascend? Ask me anything about the episodes or your own cosmic blocks.";