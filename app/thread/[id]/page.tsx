'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Thread, Moment } from '@/types';
import { store } from '@/lib/store';
import { ArrowLeft, Plus, Globe, Users, Lock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import MomentCard from '@/components/MomentCard';
import CreateMomentModal from '@/components/CreateMomentModal';

export default function ThreadPage() {
  const params = useParams();
  const router = useRouter();
  const threadId = params.id as string;
  
  const [thread, setThread] = useState<Thread | null>(null);
  const [moments, setMoments] = useState<Moment[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(store.getCurrentUser());

  useEffect(() => {
    const loadedThread = store.getThread(threadId);
    if (loadedThread) {
      setThread(loadedThread);
      setMoments(store.getMomentsByThread(threadId));
    }
  }, [threadId]);

  const handleMomentCreated = () => {
    const updatedThread = store.getThread(threadId);
    if (updatedThread) {
      setThread(updatedThread);
      setMoments(store.getMomentsByThread(threadId));
    }
    setShowCreateModal(false);
  };

  if (!thread) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Thread not found</h2>
          <button
            onClick={() => router.push('/')}
            className="text-primary-600 hover:text-primary-700 font-semibold"
          >
            Go back home
          </button>
        </div>
      </div>
    );
  }

  const privacyIcons = {
    public: Globe,
    friends: Users,
    private: Lock,
    custom: Users,
  };

  const PrivacyIcon = privacyIcons[thread.privacy] || Globe;
  const canAddMoments = currentUser && thread.collaborators.includes(currentUser.id);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 max-w-4xl">
          <button
            onClick={() => router.push('/')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="font-medium">Back to threads</span>
          </button>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Thread Header */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <h1 className="text-3xl font-bold text-gray-900">{thread.title}</h1>
                <div className="flex items-center gap-1 text-gray-500">
                  <PrivacyIcon size={20} />
                </div>
              </div>
              {thread.description && (
                <p className="text-gray-600 text-lg mb-4">{thread.description}</p>
              )}
              <div className="flex flex-wrap gap-2 mb-4">
                {thread.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-primary-100 text-primary-700 text-sm rounded-full font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span>Created by {thread.creator.displayName}</span>
                <span>•</span>
                <span>Updated {formatDistanceToNow(thread.updatedAt, { addSuffix: true })}</span>
                <span>•</span>
                <span>{moments.length} {moments.length === 1 ? 'moment' : 'moments'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Moments */}
        <div className="mb-6">
          {canAddMoments && (
            <button
              onClick={() => setShowCreateModal(true)}
              className="w-full flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-4 rounded-lg font-semibold shadow-lg transition-all hover:shadow-xl mb-6"
            >
              <Plus size={20} />
              Add Moment
            </button>
          )}

          {moments.length === 0 ? (
            <div className="bg-white rounded-xl shadow-md p-12 text-center">
              <div className="inline-block p-6 bg-primary-100 rounded-full mb-4">
                <Plus size={48} className="text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                No moments yet
              </h3>
              <p className="text-gray-600 mb-6">
                {canAddMoments
                  ? 'Be the first to add a moment to this thread!'
                  : 'This thread doesn\'t have any moments yet.'}
              </p>
              {canAddMoments && (
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold"
                >
                  Add First Moment
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              {moments.map((moment, index) => (
                <MomentCard key={moment.id} moment={moment} index={index} />
              ))}
            </div>
          )}
        </div>
      </main>

      {showCreateModal && (
        <CreateMomentModal
          threadId={threadId}
          onClose={() => setShowCreateModal(false)}
          onMomentCreated={handleMomentCreated}
        />
      )}
    </div>
  );
}

