# Moment Threads

A modern social media platform where posts are organized into meaningful "threads" of related moments, creating context-rich narratives instead of isolated posts.

🔗 **Repository**: [https://github.com/yksanjo/moment-threads](https://github.com/yksanjo/moment-threads)

## Features

- **Thread-based Organization** - Group related posts into story threads
- **Collaborative Threads** - Multiple users can contribute to shared threads
- **Contextual Discovery** - Find threads by topic, location, or time period
- **Privacy Controls** - Thread-level privacy (public, friends, private, or custom groups)
- **Rich Media Support** - Support for photos, videos, audio notes, and text
- **Beautiful UI** - Modern, responsive design with smooth animations

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library
- **date-fns** - Date formatting utilities

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn

### Installation

1. Install dependencies:
```bash
npm install
# or
yarn install
```

2. Run the development server:
```bash
npm run dev
# or
yarn dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
moment-threads/
├── app/                    # Next.js app directory
│   ├── page.tsx           # Home page with thread feed
│   ├── thread/[id]/       # Individual thread pages
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── Header.tsx         # App header
│   ├── ThreadCard.tsx     # Thread card component
│   ├── MomentCard.tsx     # Moment card component
│   ├── CreateThreadModal.tsx
│   └── CreateMomentModal.tsx
├── lib/                   # Utility libraries
│   └── store.ts           # In-memory data store
├── types/                 # TypeScript type definitions
│   └── index.ts           # Core types
└── package.json
```

## Core Concepts

### Threads
A thread is a collection of related moments organized around a topic, event, or experience. Threads have:
- Title and description
- Privacy settings
- Tags for discovery
- Collaborators who can add moments

### Moments
Individual posts within a thread. Moments can include:
- Text content
- Media (images, videos, audio)
- Links to other moments
- Author and timestamp

### Privacy Levels
- **Public** - Anyone can view
- **Friends** - Only friends can view
- **Private** - Only the creator
- **Custom** - Specific users

## Current Implementation

This is a prototype with:
- In-memory data store (replace with database in production)
- Basic authentication (demo user)
- Core thread and moment functionality
- Beautiful, responsive UI

## Future Enhancements

- [ ] Real authentication system
- [ ] Database integration (PostgreSQL/MongoDB)
- [ ] File upload for media
- [ ] Real-time updates
- [ ] Search and discovery
- [ ] Thread analytics
- [ ] Mobile app
- [ ] Social features (likes, comments, shares)

## License

MIT

