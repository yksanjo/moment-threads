import { User, Thread, Moment, PrivacyLevel } from '@/types';
import { v4 as uuidv4 } from 'uuid';

// In-memory store (replace with real database in production)
class Store {
  private users: Map<string, User> = new Map();
  private threads: Map<string, Thread> = new Map();
  private moments: Map<string, Moment> = new Map();
  private currentUserId: string | null = null;

  // User management
  createUser(username: string, displayName: string, bio?: string): User {
    const user: User = {
      id: uuidv4(),
      username,
      displayName,
      bio,
      createdAt: new Date(),
    };
    this.users.set(user.id, user);
    return user;
  }

  getUser(id: string): User | undefined {
    return this.users.get(id);
  }

  getUserByUsername(username: string): User | undefined {
    return Array.from(this.users.values()).find(u => u.username === username);
  }

  setCurrentUser(userId: string) {
    this.currentUserId = userId;
  }

  getCurrentUser(): User | null {
    if (!this.currentUserId) return null;
    return this.users.get(this.currentUserId) || null;
  }

  // Thread management
  createThread(
    title: string,
    description: string,
    privacy: PrivacyLevel = 'public',
    tags: string[] = []
  ): Thread {
    const currentUser = this.getCurrentUser();
    if (!currentUser) throw new Error('Must be logged in to create thread');

    const thread: Thread = {
      id: uuidv4(),
      title,
      description,
      creatorId: currentUser.id,
      creator: currentUser,
      privacy,
      collaborators: [currentUser.id],
      moments: [],
      tags,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.threads.set(thread.id, thread);
    return thread;
  }

  getThread(id: string): Thread | undefined {
    return this.threads.get(id);
  }

  getAllThreads(): Thread[] {
    const currentUser = this.getCurrentUser();
    if (!currentUser) return [];

    return Array.from(this.threads.values())
      .filter(thread => {
        if (thread.privacy === 'public') return true;
        if (thread.privacy === 'private') {
          return thread.creatorId === currentUser.id || 
                 thread.collaborators.includes(currentUser.id);
        }
        if (thread.privacy === 'custom') {
          return thread.allowedUsers?.includes(currentUser.id) || 
                 thread.collaborators.includes(currentUser.id);
        }
        return thread.collaborators.includes(currentUser.id);
      })
      .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
  }

  updateThread(id: string, updates: Partial<Thread>): Thread | null {
    const thread = this.threads.get(id);
    if (!thread) return null;

    const updated = { ...thread, ...updates, updatedAt: new Date() };
    this.threads.set(id, updated);
    return updated;
  }

  addCollaborator(threadId: string, userId: string): boolean {
    const thread = this.threads.get(threadId);
    if (!thread) return false;

    if (!thread.collaborators.includes(userId)) {
      thread.collaborators.push(userId);
      thread.updatedAt = new Date();
    }
    return true;
  }

  // Moment management
  createMoment(
    threadId: string,
    content: string,
    media?: any[]
  ): Moment | null {
    const currentUser = this.getCurrentUser();
    if (!currentUser) return null;

    const thread = this.threads.get(threadId);
    if (!thread) return null;

    // Check if user can add moments
    if (thread.privacy === 'private' && thread.creatorId !== currentUser.id) {
      return null;
    }
    if (!thread.collaborators.includes(currentUser.id)) {
      return null;
    }

    const moment: Moment = {
      id: uuidv4(),
      threadId,
      authorId: currentUser.id,
      author: currentUser,
      content,
      media: media || [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.moments.set(moment.id, moment);
    thread.moments.push(moment);
    thread.updatedAt = new Date();
    return moment;
  }

  getMoment(id: string): Moment | undefined {
    return this.moments.get(id);
  }

  getMomentsByThread(threadId: string): Moment[] {
    const thread = this.threads.get(threadId);
    if (!thread) return [];
    return thread.moments.sort((a, b) => 
      a.createdAt.getTime() - b.createdAt.getTime()
    );
  }
}

export const store = new Store();

// Initialize with demo data (only once)
let initialized = false;

export function initializeDemoData() {
  if (initialized || typeof window === 'undefined') return;
  initialized = true;

  const demoUser = store.createUser('demo', 'Demo User', 'Welcome to Moment Threads!');
  store.setCurrentUser(demoUser.id);

  const thread1 = store.createThread(
    'My Summer Adventure',
    'Documenting my amazing summer trip across Europe',
    'public',
    ['travel', 'summer', 'europe']
  );

  store.createMoment(
    thread1.id,
    'Just arrived in Paris! The city of lights never disappoints. 🗼',
  );

  store.createMoment(
    thread1.id,
    'Exploring the Louvre today. The art here is absolutely breathtaking.',
  );

  const thread2 = store.createThread(
    'Cooking Experiments',
    'Trying new recipes and documenting the journey',
    'public',
    ['cooking', 'food']
  );

  store.createMoment(
    thread2.id,
    'First attempt at making homemade pasta. Wish me luck! 🍝',
  );
}

