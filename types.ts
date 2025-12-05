export interface Episode {
  id: string;
  title: string;
  description: string;
  pubDate: string;
  duration: string;
  audioUrl: string;
  explicit: boolean;
}

export interface PodcastChannel {
  title: string;
  description: string;
  author: string;
  image: string;
  episodes: Episode[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}