'use client';

import { useEffect, useState } from 'react';
import { Thread } from '@/types';
import { store, initializeDemoData } from '@/lib/store';
import ThreadCard from '@/components/ThreadCard';
import CreateThreadModal from '@/components/CreateThreadModal';
import Header from '@/components/Header';
import { Plus } from 'lucide-react';

export default function Home() {
  const [threads, setThreads] = useState<Thread[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(store.getCurrentUser());

  useEffect(() => {
    // Initialize demo data on first load
    initializeDemoData();
    // Load threads from store
    setThreads(store.getAllThreads());
    setCurrentUser(store.getCurrentUser());
  }, []);

  const handleThreadCreated = () => {
    setThreads(store.getAllThreads());
    setShowCreateModal(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header currentUser={currentUser} />
      
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Moment Threads
            </h1>
            <p className="text-gray-600">
              Organize your moments into meaningful stories
            </p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold shadow-lg transition-all hover:shadow-xl"
          >
            <Plus size={20} />
            New Thread
          </button>
        </div>

        {threads.length === 0 ? (
          <div className="text-center py-16">
            <div className="inline-block p-6 bg-white rounded-full shadow-lg mb-4">
              <Plus size={48} className="text-primary-500" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              No threads yet
            </h2>
            <p className="text-gray-600 mb-6">
              Create your first thread to start organizing your moments
            </p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold"
            >
              Create Thread
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {threads.map((thread) => (
              <ThreadCard key={thread.id} thread={thread} />
            ))}
          </div>
        )}
      </main>

      {showCreateModal && (
        <CreateThreadModal
          onClose={() => setShowCreateModal(false)}
          onThreadCreated={handleThreadCreated}
        />
      )}
    </div>
  );
}

