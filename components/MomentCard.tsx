'use client';

import { Moment } from '@/types';
import { formatDistanceToNow } from 'date-fns';

interface MomentCardProps {
  moment: Moment;
  index: number;
}

export default function MomentCard({ moment, index }: MomentCardProps) {
  const timeAgo = formatDistanceToNow(moment.createdAt, { addSuffix: true });

  return (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start gap-4">
        {/* Timeline indicator */}
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 font-bold">
            {index + 1}
          </div>
          {index < 10 && (
            <div className="w-0.5 h-full bg-primary-200 mt-2 min-h-[40px]" />
          )}
        </div>

        {/* Moment content */}
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center text-white font-semibold">
              {moment.author.displayName.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="font-semibold text-gray-900">
                {moment.author.displayName}
              </div>
              <div className="text-sm text-gray-500">{timeAgo}</div>
            </div>
          </div>

          <p className="text-gray-800 text-lg leading-relaxed mb-4 whitespace-pre-wrap">
            {moment.content}
          </p>

          {moment.media && moment.media.length > 0 && (
            <div className="grid grid-cols-2 gap-2 mb-4">
              {moment.media.map((item) => (
                <div
                  key={item.id}
                  className="aspect-video bg-gray-100 rounded-lg overflow-hidden"
                >
                  {item.type === 'image' && (
                    <img
                      src={item.url}
                      alt="Moment media"
                      className="w-full h-full object-cover"
                    />
                  )}
                  {item.type === 'video' && (
                    <video
                      src={item.url}
                      controls
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
              ))}
            </div>
          )}

          {moment.linkedMoments && moment.linkedMoments.length > 0 && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="text-sm text-gray-600">
                <span className="font-medium">Linked to:</span>{' '}
                {moment.linkedMoments.length} other moment(s)
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

