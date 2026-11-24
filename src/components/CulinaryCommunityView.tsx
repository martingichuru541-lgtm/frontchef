import React, { useState } from 'react';
import {
  Users,
  Award,
  Heart,
  MessageSquare,
  Sparkles,
  ShieldCheck,
  PlusCircle,
  X,
  Star,
  MapPin,
} from 'lucide-react';
import { KENYA_COUNTIES } from '../data/kenyaCounties.ts';

interface CommunityPost {
  id: string;
  author: string;
  county: string;
  dishTitle: string;
  content: string;
  likes: number;
  commentsCount: number;
  timestamp: string;
  verifiedHeritage: boolean;
}

export const CulinaryCommunityView: React.FC = () => {
  const [posts, setPosts] = useState<CommunityPost[]>([
    {
      id: 'p1',
      author: 'Wanjiku Mwangi',
      county: 'Nyeri',
      dishTitle: 'My Grandmother’s Kahurura (Pumpkin Leaf) Mukimo',
      content: 'In our village in Mukurwe-ini, we never boil potatoes first without salting the green maize and kahurura leaves. The secret is pounding with an indigenous wooden mwiko while steam is still trapped.',
      likes: 42,
      commentsCount: 9,
      timestamp: '2 hours ago',
      verifiedHeritage: true,
    },
    {
      id: 'p2',
      author: 'Khadija Said',
      county: 'Lamu',
      dishTitle: 'Authentic Lamu Kaimati with Cardamom Syrup',
      content: 'Real Kaimati must be fried in samli (pure ghee) and coated in sugar syrup that has been infused with crushed green cardamom and saffron while hot. Crisp on the outside, hollow inside.',
      likes: 67,
      commentsCount: 14,
      timestamp: '5 hours ago',
      verifiedHeritage: true,
    },
    {
      id: 'p3',
      author: 'Otieno Kevin',
      county: 'Kisumu',
      dishTitle: 'Lake Victoria Ngege (Tilapia) & Traditional Aliya',
      content: 'Fresh Tilapia from Dunga Beach deep-fried with only salt, then simmered in a light tomato-onion broth alongside sautéed Osuga and Mitoo indigenous greens.',
      likes: 58,
      commentsCount: 11,
      timestamp: '1 day ago',
      verifiedHeritage: true,
    },
  ]);

  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCounty, setNewCounty] = useState('Nairobi');
  const [newStory, setNewStory] = useState('');
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});

  const handleLike = (id: string) => {
    setLikedPosts(prev => ({ ...prev, [id]: !prev[id] }));
    setPosts(prev =>
      prev.map(p =>
        p.id === id ? { ...p, likes: likedPosts[id] ? p.likes - 1 : p.likes + 1 } : p
      )
    );
  };

  const handleAddPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newStory.trim()) return;

    const newPost: CommunityPost = {
      id: `post_${Date.now()}`,
      author: 'Martin Gichuru',
      county: newCounty,
      dishTitle: newTitle.trim(),
      content: newStory.trim(),
      likes: 1,
      commentsCount: 0,
      timestamp: 'Just now',
      verifiedHeritage: false, // Pending verification
    };

    setPosts([newPost, ...posts]);
    setIsSubmitModalOpen(false);
    setNewTitle('');
    setNewStory('');
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 text-stone-100">
      {/* Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-stone-900/90 via-stone-900 to-stone-950 border border-white/10 backdrop-blur-2xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">
            <Users className="w-4 h-4" />
            <span>KenyaOne Culinary Community Hub</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Kenyan Food Stories & Heritage
          </h2>
          <p className="text-xs sm:text-sm text-stone-300 max-w-xl">
            Share ancestral recipes, community cooking wisdom, and kitchen memories from all 47 counties of Kenya.
          </p>
        </div>

        <button
          onClick={() => setIsSubmitModalOpen(true)}
          className="px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-xl border border-emerald-400/30 transition cursor-pointer active:scale-95 flex-shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Share Kitchen Story</span>
        </button>
      </div>

      {/* Community Feed */}
      <div className="space-y-4">
        {posts.map(post => (
          <div
            key={post.id}
            className="p-6 rounded-3xl bg-stone-900/80 border border-white/10 backdrop-blur-xl shadow-lg space-y-3.5 text-left"
          >
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-2xl bg-emerald-500/20 text-emerald-400 font-bold text-xs flex items-center justify-center border border-emerald-500/30">
                  {post.author[0]}
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white flex items-center gap-2">
                    <span>{post.author}</span>
                    <span className="text-[11px] font-mono text-stone-400 font-normal">
                      • {post.county} County
                    </span>
                  </h4>
                  <div className="text-[10px] text-stone-500">{post.timestamp}</div>
                </div>
              </div>

              {post.verifiedHeritage ? (
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Verified Heritage
                </span>
              ) : (
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-mono font-bold">
                  Review in Progress
                </span>
              )}
            </div>

            <div>
              <h3 className="font-bold text-base text-white">{post.dishTitle}</h3>
              <p className="text-xs sm:text-sm text-stone-300 mt-1 leading-relaxed">
                {post.content}
              </p>
            </div>

            <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs text-stone-400">
              <button
                onClick={() => handleLike(post.id)}
                className={`flex items-center gap-1.5 transition cursor-pointer ${
                  likedPosts[post.id] ? 'text-red-400 font-bold' : 'hover:text-white'
                }`}
              >
                <Heart className={`w-4 h-4 ${likedPosts[post.id] ? 'fill-current text-red-500' : ''}`} />
                <span>{post.likes} Likes</span>
              </button>

              <div className="flex items-center gap-1.5 text-stone-400">
                <MessageSquare className="w-4 h-4" />
                <span>{post.commentsCount} Comments</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Share Story Modal */}
      {isSubmitModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-stone-900 border border-white/15 rounded-3xl max-w-lg w-full p-6 text-stone-100 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-lg text-white">Share Your Kenyan Culinary Memory</h3>
              <button
                onClick={() => setIsSubmitModalOpen(false)}
                className="p-1 rounded-lg hover:bg-stone-800 text-stone-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddPost} className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-stone-300 block mb-1">
                  County Origin
                </label>
                <select
                  value={newCounty}
                  onChange={e => setNewCounty(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-xs text-white"
                >
                  {KENYA_COUNTIES.map(c => (
                    <option key={c.code} value={c.name}>
                      {c.name} County
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-300 block mb-1">
                  Dish or Tradition Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Grandma's Muthokoi with Pigeon Peas"
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-300 block mb-1">
                  Story & Preparation Technique
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Share the steps, memory, and advice passed down to you..."
                  value={newStory}
                  onChange={e => setNewStory(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs"
              >
                Publish Story to KenyaOne Community
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
