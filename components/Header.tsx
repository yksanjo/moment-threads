'use client';

import { User } from '@/types';
import { MessageSquare, User as UserIcon } from 'lucide-react';

interface HeaderProps {
  currentUser: User | null;
}

export default function Header({ currentUser }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4 py-4 max-w-6xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary-100 rounded-lg">
              <MessageSquare className="text-primary-600" size={24} />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Moment Threads</h1>
          </div>
          
          {currentUser && (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-gray-700">
                <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-white font-semibold">
                  {currentUser.displayName.charAt(0).toUpperCase()}
                </div>
                <span className="font-medium">{currentUser.displayName}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

