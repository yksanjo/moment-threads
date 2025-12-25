export type PrivacyLevel = 'public' | 'friends' | 'private' | 'custom';

export interface User {
  id: string;
  username: string;
  displayName: string;
  avatar?: string;
  bio?: string;
  createdAt: Date;
}

export interface Thread {
  id: string;
  title: string;
  description?: string;
  coverImage?: string;
  creatorId: string;
  creator: User;
  privacy: PrivacyLevel;
  allowedUsers?: string[]; // For custom privacy
  collaborators: string[]; // User IDs who can add moments
  moments: Moment[];
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Moment {
  id: string;
  threadId: string;
  authorId: string;
  author: User;
  content: string;
  media?: MediaItem[];
  linkedMoments?: string[]; // IDs of moments in other threads
  createdAt: Date;
  updatedAt: Date;
}

export interface MediaItem {
  id: string;
  type: 'image' | 'video' | 'audio';
  url: string;
  thumbnail?: string;
}

export interface ThreadStats {
  threadId: string;
  momentCount: number;
  viewCount: number;
  lastActivity: Date;
}

