'use client';

import { Thread } from '@/types';
import { formatDistanceToNow } from 'date-fns';
import { Users, Lock, Globe, Clock } from 'lucide-react';
import Link from 'next/link';

interface ThreadCardProps {
  thread: Thread;
}

export default function ThreadCard({ thread }: ThreadCardProps) {
  const privacyIcons = {
    public: Globe,
    friends: Users,
    private: Lock,
    custom: Users,
  };

  const PrivacyIcon = privacyIcons[thread.privacy] || Globe;
  const momentCount = thread.moments.length;
  const timeAgo = formatDistanceToNow(thread.updatedAt, { addSuffix: true });

  return (
    <Link href={`/thread/${thread.id}`}>
      <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer group">
        {thread.coverImage ? (
          <div className="h-48 bg-gradient-to-br from-primary-400 to-primary-600 relative overflow-hidden">
            <img
              src={thread.coverImage}
              alt={thread.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        ) : (
          <div className="h-48 bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
            <div className="text-white text-4xl font-bold opacity-50">
              {thread.title.charAt(0).toUpperCase()}
            </div>
          </div>
        )}
        
        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-2">
              {thread.title}
            </h3>
            <div className="flex items-center gap-1 text-gray-500 ml-2">
              <PrivacyIcon size={16} />
            </div>
          </div>
          
          {thread.description && (
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
              {thread.description}
            </p>
          )}
          
          <div className="flex flex-wrap gap-2 mb-4">
            {thread.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-full"
              >
                #{tag}
              </span>
            ))}
            {thread.tags.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                +{thread.tags.length - 3}
              </span>
            )}
          </div>
          
          <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-100">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Clock size={14} />
                <span>{timeAgo}</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="font-medium">{momentCount}</span>
                <span>{momentCount === 1 ? 'moment' : 'moments'}</span>
              </div>
            </div>
            <div className="flex items-center gap-1 text-gray-400">
              <span className="text-xs">{thread.creator.displayName}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

