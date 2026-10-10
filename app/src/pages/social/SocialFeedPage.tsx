import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { MOCK_SOCIAL_POSTS, MOCK_SOCIAL_REELS, type SocialItem, type SocialComment } from '../../lib/socialMockData';

export default function SocialFeedPage() {
  const { userRole, currentCreator, currentBrand } = useAuth();
  const isCreator = userRole === 'creator';

  // Feed type: 'posts' (Pinterest pins) vs 'reels' (TikTok / Shorts vertical video)
  const [activeTab, setActiveTab] = useState<'posts' | 'reels'>('posts');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Interactive local states for posts and reels
  const [posts, setPosts] = useState<SocialItem[]>(MOCK_SOCIAL_POSTS);
  const [reels, setReels] = useState<SocialItem[]>(MOCK_SOCIAL_REELS);

  // Modals & Viewers
  const [inspectPost, setInspectPost] = useState<SocialItem | null>(null);
  const [activeReelIndex, setActiveReelIndex] = useState<number | null>(null);
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [showBrandNoticeModal, setShowBrandNoticeModal] = useState<boolean>(false);

  // Comment input state
  const [commentText, setCommentText] = useState<string>('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Video playback state for reels
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // New post / reel form state
  const [createType, setCreateType] = useState<'post' | 'reel'>('post');
  const [createTitle, setCreateTitle] = useState('');
  const [createCaption, setCreateCaption] = useState('');
  const [createMediaUrl, setCreateMediaUrl] = useState('');
  const [createVideoUrl, setCreateVideoUrl] = useState('');
  const [createCategory, setCreateCategory] = useState('Botanical & Beauty');
  const [createPrompt, setCreatePrompt] = useState('');
  const [createTools, setCreateTools] = useState<string[]>(['FLUX.1 Dev', 'Midjourney v6.1']);
  const [createAudioTrack, setCreateAudioTrack] = useState('🎵 Original Generative Audio');

  // Trigger Toast
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  // Categories list
  const categories = [
    'All',
    'Botanical & Beauty',
    'Luxury Packshots',
    'Virtual Fashion',
    'Automotive & CGI',
    'VFX & Motion',
    'Spatial Architecture'
  ];

  // Filtered Items
  const currentList = activeTab === 'posts' ? posts : reels;
  const filteredItems = useMemo(() => {
    return currentList.filter(item => {
      const matchCat = selectedCategory === 'All' || item.category === selectedCategory;
      const matchSearch =
        searchQuery === '' ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.creator_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.prompt && item.prompt.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCat && matchSearch;
    });
  }, [currentList, selectedCategory, searchQuery]);

  // Like Toggle
  const handleToggleLike = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    const updateFn = (items: SocialItem[]) =>
      items.map(item => {
        if (item.id === id) {
          const isLiked = !item.is_liked;
          return {
            ...item,
            is_liked: isLiked,
            likes_count: isLiked ? item.likes_count + 1 : item.likes_count - 1
          };
        }
        return item;
      });

    if (activeTab === 'posts') {
      setPosts(updateFn);
    } else {
      setReels(updateFn);
    }

    if (inspectPost && inspectPost.id === id) {
      setInspectPost(prev => prev ? {
        ...prev,
        is_liked: !prev.is_liked,
        likes_count: !prev.is_liked ? prev.likes_count + 1 : prev.likes_count - 1
      } : null);
    }
  };

  // Save / Bookmark Toggle
  const handleToggleSave = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    const updateFn = (items: SocialItem[]) =>
      items.map(item => {
        if (item.id === id) {
          const isSaved = !item.is_saved;
          return {
            ...item,
            is_saved: isSaved,
            saves_count: isSaved ? item.saves_count + 1 : item.saves_count - 1
          };
        }
        return item;
      });

    if (activeTab === 'posts') {
      setPosts(updateFn);
    } else {
      setReels(updateFn);
    }

    showToast('Saved to your inspiration board!');
  };

  // Copy Prompt
  const handleCopyPrompt = (promptText: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    navigator.clipboard.writeText(promptText);
    showToast('Prompt copied to clipboard!');
  };

  // Copy Share Link
  const handleShare = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    const url = `${window.location.origin}${isCreator ? '/creator/feed' : '/brand/feed'}#${id}`;
    navigator.clipboard.writeText(url);
    showToast('Link copied to clipboard!');
  };

  // Add Comment
  const handleAddComment = (itemId: string, e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    const authorName = isCreator ? (currentCreator?.display_name || 'Elena Vance') : (currentBrand?.company_name || 'Aura Botanica');
    const authorAvatar = isCreator
      ? (currentCreator?.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80')
      : (currentBrand?.cover_url || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80');

    const newComment: SocialComment = {
      id: `c-${Date.now()}`,
      user_name: authorName,
      user_avatar: authorAvatar,
      user_role: isCreator ? 'creator' : 'brand',
      text: commentText.trim(),
      created_at: 'Just now',
      likes: 0
    };

    const updateComments = (items: SocialItem[]) =>
      items.map(item => {
        if (item.id === itemId) {
          return {
            ...item,
            comments_count: item.comments_count + 1,
            comments: [newComment, ...item.comments]
          };
        }
        return item;
      });

    if (activeTab === 'posts') {
      setPosts(updateComments);
    } else {
      setReels(updateComments);
    }

    if (inspectPost && inspectPost.id === itemId) {
      setInspectPost(prev => prev ? {
        ...prev,
        comments_count: prev.comments_count + 1,
        comments: [newComment, ...prev.comments]
      } : null);
    }

    setCommentText('');
    showToast('Comment posted!');
  };

  // Handle Create Post / Reel submission
  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!createTitle.trim()) return;

    const newItem: SocialItem = {
      id: `custom-${Date.now()}`,
      type: createType,
      creator_id: 'c-elena-vance',
      creator_name: currentCreator?.display_name || 'Elena Vance',
      creator_avatar: currentCreator?.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      creator_headline: currentCreator?.headline || 'Pro AI Director ✦ Milan / Berlin',
      title: createTitle,
      caption: createCaption || 'New generative exploration drop.',
      media_url: createMediaUrl || (createType === 'reel'
        ? 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=85'
        : 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=85'),
      video_url: createType === 'reel' ? (createVideoUrl || 'https://assets.mixkit.co/videos/preview/mixkit-cyberpunk-city-street-with-neon-lights-41007-large.mp4') : undefined,
      aspect_ratio: createType === 'reel' ? '9:16' : '3:4',
      ai_tools: createTools,
      prompt: createPrompt || 'Masterpiece generative AI artwork --v 6.1 --quality 2',
      category: createCategory,
      tags: ['#NewDrop', '#GenerativeArt', '#InoFeed', `#${createCategory.replace(/\s+/g, '')}`],
      likes_count: 1,
      is_liked: true,
      comments_count: 0,
      shares_count: 0,
      saves_count: 0,
      views_count: 1,
      audio_track: createType === 'reel' ? createAudioTrack : undefined,
      created_at: 'Just now',
      comments: []
    };

    if (createType === 'post') {
      setPosts([newItem, ...posts]);
      setActiveTab('posts');
    } else {
      setReels([newItem, ...reels]);
      setActiveTab('reels');
    }

    setShowCreateModal(false);
    setCreateTitle('');
    setCreateCaption('');
    setCreateMediaUrl('');
    setCreateVideoUrl('');
    setCreatePrompt('');
    showToast(`Published new ${createType === 'post' ? 'Visual Pin' : 'Reel'}!`);
  };

  // Current active reel for modal player
  const activeReel = activeReelIndex !== null ? reels[activeReelIndex] : null;

  return (
    <div className="w-full pb-20">
      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-5 py-3 rounded-2xl bg-on-surface text-surface font-label text-xs font-semibold shadow-2xl flex items-center gap-2 animate-bounce">
          <span className="material-symbols-outlined text-[18px] text-secondary">check_circle</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Banner / Feed Controls */}
      <section className="mb-8">
        <div className="bg-surface-container-lowest rounded-3xl p-6 sm:p-8 border border-outline-variant/20 shadow-xs">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-outline-variant/15">
            <div>
              <div className="flex items-center gap-2.5 mb-2">
                <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-pulse" />
                <span className="text-xs font-label uppercase tracking-widest text-secondary font-bold">
                  InoMark Social Feed
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-secondary/10 text-secondary text-[11px] font-label font-semibold">
                  Pinterest & Reels Mode
                </span>
              </div>
              <h1 className="font-headline text-2xl sm:text-3xl font-bold text-on-surface tracking-tight">
                Community Discover & Reels
              </h1>
              <p className="font-body text-sm text-on-surface-variant mt-1 max-w-2xl">
                Explore generative visual art pins, high-fashion prompt breakdowns, and immersive 9:16 cinematic video reels created by verified AI directors.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              {isCreator ? (
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-secondary to-primary hover:opacity-95 text-white font-label text-xs font-semibold shadow-md hover:shadow-lg transition-all cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[20px]">add_circle</span>
                  <span>Post Visual / Reel</span>
                </button>
              ) : (
                <button
                  onClick={() => setShowBrandNoticeModal(true)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface font-label text-xs font-medium border border-outline-variant/30 transition-all cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px] text-secondary">lock</span>
                  <span>Creator Publishing Only</span>
                </button>
              )}
            </div>
          </div>

          {/* Sub Navigation Bar: Tab Switcher & Search */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6">
            {/* View Mode Toggle: Posts vs Reels */}
            <div className="inline-flex p-1.5 rounded-full bg-surface-container-low border border-outline-variant/20 self-start">
              <button
                onClick={() => setActiveTab('posts')}
                className={`inline-flex items-center gap-2 px-5 py-2 rounded-full font-label text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === 'posts'
                    ? 'bg-secondary text-white shadow-xs'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">push_pin</span>
                <span>Visual Pins ({posts.length})</span>
              </button>
              <button
                onClick={() => setActiveTab('reels')}
                className={`inline-flex items-center gap-2 px-5 py-2 rounded-full font-label text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === 'reels'
                    ? 'bg-primary text-white shadow-xs'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">smart_display</span>
                <span>Shorts & Reels ({reels.length})</span>
              </button>
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-72">
              <span className="material-symbols-outlined text-[18px] text-outline absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
                search
              </span>
              <input
                type="text"
                placeholder="Search art, prompts, #tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-full bg-surface-container-low border border-outline-variant/20 text-xs font-body text-on-surface placeholder:text-outline focus:outline-none focus:border-secondary transition-colors"
              />
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-4 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-label whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-on-surface text-surface font-semibold shadow-xs'
                    : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 1. POSTS VIEW (Pinterest-Style Masonry Grid)                             */}
      {/* ========================================================================= */}
      {activeTab === 'posts' && (
        <section>
          {filteredItems.length === 0 ? (
            <div className="p-12 text-center bg-surface-container-lowest rounded-3xl border border-outline-variant/20">
              <span className="material-symbols-outlined text-4xl text-outline mb-2">image_not_supported</span>
              <h3 className="font-headline text-lg font-semibold text-on-surface">No visual pins match your search</h3>
              <p className="font-body text-xs text-on-surface-variant mt-1">Try another category or clear the search query.</p>
            </div>
          ) : (
            <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-3 gap-6 space-y-6">
              {filteredItems.map((post) => (
                <div
                  key={post.id}
                  className="break-inside-avoid bg-surface-container-lowest rounded-3xl overflow-hidden border border-outline-variant/20 shadow-xs hover:shadow-xl transition-all duration-300 group flex flex-col cursor-pointer"
                  onClick={() => setInspectPost(post)}
                >
                  {/* Media Wrapper */}
                  <div className="relative overflow-hidden bg-surface-container-high">
                    <img
                      src={post.media_url}
                      alt={post.title}
                      className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />

                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-between">
                      {/* Top quick badges */}
                      <div className="flex items-center justify-between gap-2">
                        <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-label font-medium">
                          {post.category}
                        </span>

                        <button
                          onClick={(e) => handleToggleSave(post.id, e)}
                          title="Save to Inspiration Board"
                          className={`w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                            post.is_saved
                              ? 'bg-secondary text-white'
                              : 'bg-white/80 hover:bg-white text-on-surface'
                          }`}
                        >
                          <span className="material-symbols-outlined text-[18px]">
                            {post.is_saved ? 'bookmark_added' : 'bookmark_border'}
                          </span>
                        </button>
                      </div>

                      {/* Bottom quick actions */}
                      <div className="flex items-center justify-between text-white">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={(e) => handleToggleLike(post.id, e)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-md text-xs font-label cursor-pointer"
                          >
                            <span
                              className="material-symbols-outlined text-[16px] text-red-400"
                              style={post.is_liked ? { fontVariationSettings: "'FILL' 1" } : {}}
                            >
                              favorite
                            </span>
                            <span>{post.likes_count}</span>
                          </button>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setInspectPost(post);
                            }}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-md text-xs font-label cursor-pointer"
                          >
                            <span className="material-symbols-outlined text-[16px]">chat_bubble</span>
                            <span>{post.comments_count}</span>
                          </button>
                        </div>

                        <button
                          onClick={(e) => handleShare(post.id, e)}
                          title="Copy Link"
                          className="w-8 h-8 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-md flex items-center justify-center text-white cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[16px]">share</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Pin Info & Prompt */}
                  <div className="p-5 flex flex-col gap-3">
                    <h3 className="font-headline text-base font-bold text-on-surface leading-snug group-hover:text-secondary transition-colors">
                      {post.title}
                    </h3>

                    <p className="font-body text-xs text-on-surface-variant line-clamp-2 leading-relaxed">
                      {post.caption}
                    </p>

                    {/* AI Tool Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {post.ai_tools.map((tool, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-0.5 rounded-full bg-surface-container text-on-surface-variant text-[10px] font-label font-medium"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>

                    {/* Prompt Box */}
                    {post.prompt && (
                      <div className="p-2.5 rounded-xl bg-surface-container-low border border-outline-variant/20 flex items-start justify-between gap-2">
                        <p className="font-body text-[11px] text-outline font-mono line-clamp-1 italic">
                          "{post.prompt}"
                        </p>
                        <button
                          onClick={(e) => handleCopyPrompt(post.prompt!, e)}
                          title="Copy Prompt"
                          className="text-on-surface-variant hover:text-secondary shrink-0 cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[15px]">content_copy</span>
                        </button>
                      </div>
                    )}

                    {/* Creator Identity Footer */}
                    <div className="pt-3 border-t border-outline-variant/15 flex items-center justify-between">
                      <Link
                        to={`/creators/${post.creator_id}`}
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-2 group/creator"
                      >
                        <img
                          src={post.creator_avatar}
                          alt={post.creator_name}
                          className="w-7 h-7 rounded-full object-cover ring-1 ring-outline-variant/30"
                        />
                        <div className="flex flex-col min-w-0">
                          <span className="font-label text-xs font-bold text-on-surface group-hover/creator:text-secondary transition-colors truncate">
                            {post.creator_name}
                          </span>
                          <span className="text-[10px] text-outline truncate font-label">
                            {post.created_at}
                          </span>
                        </div>
                      </Link>

                      <div className="flex items-center gap-2 text-xs font-label text-on-surface-variant">
                        <button
                          onClick={(e) => handleToggleLike(post.id, e)}
                          className="inline-flex items-center gap-1 hover:text-red-500 transition-colors cursor-pointer"
                        >
                          <span
                            className={`material-symbols-outlined text-[16px] ${post.is_liked ? 'text-red-500' : ''}`}
                            style={post.is_liked ? { fontVariationSettings: "'FILL' 1" } : {}}
                          >
                            favorite
                          </span>
                          <span>{post.likes_count}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* ========================================================================= */}
      {/* 2. REELS & SHORTS VIEW (TikTok / Shorts Vertical Video Feed)              */}
      {/* ========================================================================= */}
      {activeTab === 'reels' && (
        <section>
          {filteredItems.length === 0 ? (
            <div className="p-12 text-center bg-surface-container-lowest rounded-3xl border border-outline-variant/20">
              <span className="material-symbols-outlined text-4xl text-outline mb-2">videocam_off</span>
              <h3 className="font-headline text-lg font-semibold text-on-surface">No reels found in this category</h3>
              <p className="font-body text-xs text-on-surface-variant mt-1">Check another category or clear the filter.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredItems.map((reel, idx) => (
                <div
                  key={reel.id}
                  onClick={() => setActiveReelIndex(idx)}
                  className="group relative rounded-3xl overflow-hidden aspect-[9/16] bg-black shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer border border-outline-variant/20 flex flex-col justify-between p-4"
                >
                  {/* Poster Thumbnail / Video Background */}
                  <img
                    src={reel.media_url}
                    alt={reel.title}
                    className="absolute inset-0 w-full h-full object-cover filter brightness-90 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/40" />

                  {/* Top Header Badge */}
                  <div className="relative z-10 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-label font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                      <span>{reel.views_count.toLocaleString()} views</span>
                    </span>

                    <button
                      onClick={(e) => handleToggleSave(reel.id, e)}
                      title="Bookmark Reel"
                      className={`w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md transition-colors cursor-pointer ${
                        reel.is_saved ? 'bg-secondary text-white' : 'bg-black/50 text-white hover:bg-black/80'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[16px]">
                        {reel.is_saved ? 'bookmark_added' : 'bookmark_border'}
                      </span>
                    </button>
                  </div>

                  {/* Play Center Indicator on Hover */}
                  <div className="relative z-10 self-center w-14 h-14 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center text-white opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all shadow-xl">
                    <span className="material-symbols-outlined text-[32px] translate-x-0.5">play_arrow</span>
                  </div>

                  {/* Bottom Reel Details */}
                  <div className="relative z-10 space-y-2 text-white">
                    <div className="flex items-center gap-2">
                      <img
                        src={reel.creator_avatar}
                        alt={reel.creator_name}
                        className="w-7 h-7 rounded-full object-cover ring-1 ring-white/50"
                      />
                      <span className="font-label text-xs font-bold text-white drop-shadow truncate">
                        {reel.creator_name}
                      </span>
                    </div>

                    <h4 className="font-headline text-sm font-semibold line-clamp-2 leading-tight">
                      {reel.title}
                    </h4>

                    {reel.audio_track && (
                      <div className="flex items-center gap-1.5 text-[11px] font-label text-white/80 truncate">
                        <span className="material-symbols-outlined text-[14px]">music_note</span>
                        <span className="truncate">{reel.audio_track}</span>
                      </div>
                    )}

                    {/* Stats */}
                    <div className="flex items-center justify-between pt-1 border-t border-white/10 text-xs font-label text-white/90">
                      <span className="flex items-center gap-1">
                        <span
                          className={`material-symbols-outlined text-[15px] ${reel.is_liked ? 'text-red-400' : ''}`}
                          style={reel.is_liked ? { fontVariationSettings: "'FILL' 1" } : {}}
                        >
                          favorite
                        </span>
                        {reel.likes_count}
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[15px]">chat_bubble</span>
                        {reel.comments_count}
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[15px]">share</span>
                        {reel.shares_count}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* ========================================================================= */}
      {/* 3. EXPANDED PINTEREST PIN MODAL                                          */}
      {/* ========================================================================= */}
      {inspectPost && (
        <div
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          onClick={() => setInspectPost(null)}
        >
          <div
            className="bg-surface-container-lowest rounded-3xl max-w-4xl w-full overflow-hidden border border-outline-variant/30 shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Left: High-Res Image View */}
            <div className="md:w-1/2 bg-black flex items-center justify-center relative p-4 overflow-hidden">
              <img
                src={inspectPost.media_url}
                alt={inspectPost.title}
                className="max-h-[80vh] w-full object-contain rounded-2xl"
              />
              <span className="absolute top-6 left-6 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-label">
                {inspectPost.category}
              </span>
            </div>

            {/* Right: Comments, Metadata, & Actions */}
            <div className="md:w-1/2 flex flex-col justify-between p-6 sm:p-8 overflow-y-auto">
              <div className="space-y-6">
                {/* Header Actions */}
                <div className="flex items-center justify-between pb-4 border-b border-outline-variant/15">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleToggleLike(inspectPost.id)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-surface-container hover:bg-surface-container-high text-xs font-label font-semibold text-on-surface transition-colors cursor-pointer"
                    >
                      <span
                        className={`material-symbols-outlined text-[18px] ${inspectPost.is_liked ? 'text-red-500' : ''}`}
                        style={inspectPost.is_liked ? { fontVariationSettings: "'FILL' 1" } : {}}
                      >
                        favorite
                      </span>
                      <span>{inspectPost.likes_count} Likes</span>
                    </button>

                    <button
                      onClick={() => handleToggleSave(inspectPost.id)}
                      className={`px-4 py-2 rounded-full text-xs font-label font-semibold transition-colors cursor-pointer ${
                        inspectPost.is_saved
                          ? 'bg-secondary text-white'
                          : 'bg-surface-container hover:bg-surface-container-high text-on-surface'
                      }`}
                    >
                      {inspectPost.is_saved ? 'Saved' : 'Save Pin'}
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleShare(inspectPost.id)}
                      title="Copy Share Link"
                      className="w-9 h-9 rounded-full bg-surface-container hover:bg-surface-container-high flex items-center justify-center text-on-surface cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[18px]">share</span>
                    </button>
                    <button
                      onClick={() => setInspectPost(null)}
                      className="w-9 h-9 rounded-full bg-surface-container hover:bg-surface-container-high flex items-center justify-center text-on-surface cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[20px]">close</span>
                    </button>
                  </div>
                </div>

                {/* Creator Identity */}
                <div className="flex items-center justify-between">
                  <Link
                    to={`/creators/${inspectPost.creator_id}`}
                    className="flex items-center gap-3 group"
                  >
                    <img
                      src={inspectPost.creator_avatar}
                      alt={inspectPost.creator_name}
                      className="w-11 h-11 rounded-full object-cover ring-2 ring-secondary/30"
                    />
                    <div>
                      <h4 className="font-headline font-bold text-sm text-on-surface group-hover:text-secondary transition-colors flex items-center gap-1">
                        {inspectPost.creator_name}
                        <span className="material-symbols-outlined text-[16px] text-secondary">verified</span>
                      </h4>
                      <p className="font-label text-[11px] text-outline truncate max-w-[200px]">
                        {inspectPost.creator_headline}
                      </p>
                    </div>
                  </Link>

                  {!isCreator && (
                    <Link
                      to={`/creators/${inspectPost.creator_id}`}
                      className="px-4 py-1.5 rounded-full bg-primary hover:bg-primary/90 text-on-primary text-xs font-label font-semibold shadow-xs"
                    >
                      Invite / Brief
                    </Link>
                  )}
                </div>

                {/* Content Details */}
                <div>
                  <h2 className="font-headline text-xl font-bold text-on-surface mb-2">
                    {inspectPost.title}
                  </h2>
                  <p className="font-body text-xs text-on-surface-variant leading-relaxed">
                    {inspectPost.caption}
                  </p>
                </div>

                {/* Prompt Metadata Inspection */}
                {inspectPost.prompt && (
                  <div className="p-3.5 rounded-2xl bg-surface-container-low border border-outline-variant/20 space-y-2">
                    <div className="flex items-center justify-between text-xs font-label font-bold text-secondary">
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">auto_awesome</span>
                        Generative Prompt Recipe
                      </span>
                      <button
                        onClick={() => handleCopyPrompt(inspectPost.prompt!)}
                        className="text-primary hover:underline flex items-center gap-1 text-[11px] cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[14px]">content_copy</span>
                        Copy
                      </button>
                    </div>
                    <p className="font-mono text-[11px] text-on-surface-variant leading-relaxed bg-surface-container-lowest p-2.5 rounded-xl border border-outline-variant/15">
                      {inspectPost.prompt}
                    </p>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {inspectPost.ai_tools.map((t, idx) => (
                        <span key={idx} className="px-2.5 py-0.5 rounded-full bg-secondary/10 text-secondary text-[10px] font-label font-semibold">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Comments List */}
                <div className="space-y-3 pt-2">
                  <h4 className="font-headline text-xs font-bold text-on-surface uppercase tracking-wider">
                    Discussion ({inspectPost.comments.length})
                  </h4>

                  <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
                    {inspectPost.comments.length === 0 ? (
                      <p className="text-xs text-outline italic">No comments yet. Start the conversation!</p>
                    ) : (
                      inspectPost.comments.map((c) => (
                        <div key={c.id} className="p-3 rounded-2xl bg-surface-container-low border border-outline-variant/15 flex items-start gap-2.5">
                          <img
                            src={c.user_avatar}
                            alt={c.user_name}
                            className="w-7 h-7 rounded-full object-cover shrink-0 mt-0.5"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-label text-xs font-bold text-on-surface">
                                {c.user_name}
                              </span>
                              <span className={`text-[10px] font-label px-2 py-0.2 rounded-full ${c.user_role === 'brand' ? 'bg-primary/10 text-primary font-semibold' : 'bg-secondary/10 text-secondary'}`}>
                                {c.user_role === 'brand' ? 'Brand Patron' : 'Creator'}
                              </span>
                              <span className="text-[10px] text-outline ml-auto">{c.created_at}</span>
                            </div>
                            <p className="font-body text-xs text-on-surface-variant leading-relaxed">
                              {c.text}
                            </p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>

              {/* Submit Comment Input Form */}
              <form onSubmit={(e) => handleAddComment(inspectPost.id, e)} className="pt-4 border-t border-outline-variant/15 mt-4">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder={`Comment as ${isCreator ? (currentCreator?.display_name || 'Elena Vance') : (currentBrand?.company_name || 'Aura Botanica')}...`}
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    className="flex-1 px-4 py-2.5 rounded-full bg-surface-container-low border border-outline-variant/20 text-xs font-body text-on-surface focus:outline-none focus:border-secondary transition-colors"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-full bg-secondary hover:bg-secondary/90 text-white font-label text-xs font-semibold shadow-xs cursor-pointer"
                  >
                    Post
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. IMMERSIVE FULLSCREEN REEL PLAYER (TikTok / Shorts Modal)               */}
      {/* ========================================================================= */}
      {activeReel && activeReelIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-lg flex items-center justify-center p-2 sm:p-4"
          onClick={() => setActiveReelIndex(null)}
        >
          {/* Main Reel Viewer Container */}
          <div
            className="relative w-full max-w-sm sm:max-w-md aspect-[9/16] bg-black rounded-3xl overflow-hidden shadow-2xl border border-white/20 flex flex-col justify-between"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Background Video Player */}
            <video
              ref={videoRef}
              src={activeReel.video_url}
              poster={activeReel.media_url}
              autoPlay
              loop
              muted={isMuted}
              playsInline
              className="absolute inset-0 w-full h-full object-cover cursor-pointer"
              onClick={() => {
                if (videoRef.current) {
                  if (isPlaying) {
                    videoRef.current.pause();
                    setIsPlaying(false);
                  } else {
                    videoRef.current.play();
                    setIsPlaying(true);
                  }
                }
              }}
            />

            {/* Dark Gradient Overlay for legible UI */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/50 pointer-events-none" />

            {/* Top Bar Controls */}
            <div className="relative z-20 flex items-center justify-between p-4 text-white">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                <span className="font-label text-xs uppercase tracking-wider font-bold">
                  InoReels
                </span>
                <span className="text-white/60 text-xs">• {activeReel.category}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="w-9 h-9 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/70 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {isMuted ? 'volume_off' : 'volume_up'}
                  </span>
                </button>
                <button
                  onClick={() => setActiveReelIndex(null)}
                  className="w-9 h-9 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/70 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[20px]">close</span>
                </button>
              </div>
            </div>

            {/* Floating Action Column on Right */}
            <div className="absolute right-3 bottom-24 z-20 flex flex-col items-center gap-4 text-white">
              {/* Like Button */}
              <button
                onClick={() => handleToggleLike(activeReel.id)}
                className="flex flex-col items-center gap-1 group cursor-pointer"
              >
                <div className="w-11 h-11 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center group-hover:scale-110 transition-transform">
                  <span
                    className={`material-symbols-outlined text-[24px] ${activeReel.is_liked ? 'text-red-500' : 'text-white'}`}
                    style={activeReel.is_liked ? { fontVariationSettings: "'FILL' 1" } : {}}
                  >
                    favorite
                  </span>
                </div>
                <span className="text-[11px] font-label font-bold">{activeReel.likes_count}</span>
              </button>

              {/* Comment Button (Opens post modal) */}
              <button
                onClick={() => {
                  setInspectPost(activeReel);
                  setActiveReelIndex(null);
                }}
                className="flex flex-col items-center gap-1 group cursor-pointer"
              >
                <div className="w-11 h-11 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-[22px]">chat_bubble</span>
                </div>
                <span className="text-[11px] font-label font-bold">{activeReel.comments_count}</span>
              </button>

              {/* Save Button */}
              <button
                onClick={() => handleToggleSave(activeReel.id)}
                className="flex flex-col items-center gap-1 group cursor-pointer"
              >
                <div className={`w-11 h-11 rounded-full backdrop-blur-md flex items-center justify-center group-hover:scale-110 transition-transform ${activeReel.is_saved ? 'bg-secondary text-white' : 'bg-black/50 text-white'}`}>
                  <span className="material-symbols-outlined text-[22px]">
                    {activeReel.is_saved ? 'bookmark_added' : 'bookmark_border'}
                  </span>
                </div>
                <span className="text-[11px] font-label font-bold">{activeReel.saves_count}</span>
              </button>

              {/* Share Button */}
              <button
                onClick={() => handleShare(activeReel.id)}
                className="flex flex-col items-center gap-1 group cursor-pointer"
              >
                <div className="w-11 h-11 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-[22px]">share</span>
                </div>
                <span className="text-[11px] font-label font-bold">{activeReel.shares_count}</span>
              </button>

              {/* Spinning Disc for Audio */}
              <div className="w-10 h-10 rounded-full border-2 border-white/60 overflow-hidden animate-spin shadow-lg">
                <img
                  src={activeReel.creator_avatar}
                  alt="Audio"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Bottom Info Overlay */}
            <div className="relative z-20 p-5 space-y-2 text-white max-w-[80%]">
              <div className="flex items-center gap-2">
                <Link
                  to={`/creators/${activeReel.creator_id}`}
                  className="flex items-center gap-2 group"
                >
                  <img
                    src={activeReel.creator_avatar}
                    alt={activeReel.creator_name}
                    className="w-8 h-8 rounded-full object-cover ring-2 ring-white/60"
                  />
                  <span className="font-label text-sm font-bold text-white group-hover:underline flex items-center gap-1">
                    {activeReel.creator_name}
                    <span className="material-symbols-outlined text-[16px] text-secondary">verified</span>
                  </span>
                </Link>

                {!isCreator && (
                  <Link
                    to={`/creators/${activeReel.creator_id}`}
                    className="px-3 py-1 rounded-full bg-secondary hover:bg-secondary/90 text-white text-[11px] font-label font-semibold shadow-xs"
                  >
                    Commission
                  </Link>
                )}
              </div>

              <h3 className="font-headline text-base font-bold text-white leading-tight">
                {activeReel.title}
              </h3>

              <p className="font-body text-xs text-white/90 line-clamp-2 leading-relaxed">
                {activeReel.caption}
              </p>

              {activeReel.audio_track && (
                <div className="flex items-center gap-1.5 text-xs font-label text-white/80 pt-1">
                  <span className="material-symbols-outlined text-[16px]">music_note</span>
                  <span className="truncate">{activeReel.audio_track}</span>
                </div>
              )}
            </div>

            {/* Previous & Next Navigation Arrows */}
            <div className="absolute top-1/2 left-3 -translate-y-1/2 z-20">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveReelIndex(prev => (prev !== null && prev > 0 ? prev - 1 : reels.length - 1));
                }}
                className="w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-md flex items-center justify-center text-white cursor-pointer"
              >
                <span className="material-symbols-outlined text-[24px]">chevron_left</span>
              </button>
            </div>

            <div className="absolute top-1/2 right-3 -translate-y-1/2 z-20">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveReelIndex(prev => (prev !== null && prev < reels.length - 1 ? prev + 1 : 0));
                }}
                className="w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-md flex items-center justify-center text-white cursor-pointer"
              >
                <span className="material-symbols-outlined text-[24px]">chevron_right</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. CREATOR PUBLISHING MODAL (Only Creators Can Post)                      */}
      {/* ========================================================================= */}
      {showCreateModal && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setShowCreateModal(false)}
        >
          <div
            className="bg-surface-container-lowest rounded-3xl max-w-xl w-full p-6 sm:p-8 border border-outline-variant/30 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-outline-variant/15 mb-6">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center text-white shadow-xs">
                  <span className="material-symbols-outlined text-[20px]">auto_awesome</span>
                </div>
                <div>
                  <h3 className="font-headline text-lg font-bold text-on-surface">Publish New AI Drop</h3>
                  <p className="text-xs text-on-surface-variant font-body">Share your generative art or vertical cinematic reels.</p>
                </div>
              </div>
              <button
                onClick={() => setShowCreateModal(false)}
                className="w-8 h-8 rounded-full bg-surface-container hover:bg-surface-container-high flex items-center justify-center text-on-surface cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            {/* Drop Type Switcher */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <button
                type="button"
                onClick={() => setCreateType('post')}
                className={`p-3.5 rounded-2xl border text-left flex items-center gap-3 transition-all cursor-pointer ${
                  createType === 'post'
                    ? 'border-secondary bg-secondary/10 text-on-surface ring-1 ring-secondary'
                    : 'border-outline-variant/30 bg-surface-container-low text-on-surface-variant'
                }`}
              >
                <span className="material-symbols-outlined text-[24px] text-secondary">push_pin</span>
                <div>
                  <span className="font-label text-xs font-bold block">Visual Pin (Post)</span>
                  <span className="text-[11px] text-outline font-body">Pinterest-style image & prompt</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setCreateType('reel')}
                className={`p-3.5 rounded-2xl border text-left flex items-center gap-3 transition-all cursor-pointer ${
                  createType === 'reel'
                    ? 'border-primary bg-primary/10 text-on-surface ring-1 ring-primary'
                    : 'border-outline-variant/30 bg-surface-container-low text-on-surface-variant'
                }`}
              >
                <span className="material-symbols-outlined text-[24px] text-primary">smart_display</span>
                <div>
                  <span className="font-label text-xs font-bold block">Video Reel (Short)</span>
                  <span className="text-[11px] text-outline font-body">9:16 vertical video & sound</span>
                </div>
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleCreateSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-label font-bold text-on-surface mb-1">
                  Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sensorial Dew Droplets in Emerald Forest"
                  value={createTitle}
                  onChange={(e) => setCreateTitle(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/30 text-xs font-body text-on-surface focus:outline-none focus:border-secondary"
                />
              </div>

              <div>
                <label className="block text-xs font-label font-bold text-on-surface mb-1">
                  Category *
                </label>
                <select
                  value={createCategory}
                  onChange={(e) => setCreateCategory(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/30 text-xs font-body text-on-surface focus:outline-none focus:border-secondary"
                >
                  {categories.filter(c => c !== 'All').map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              {/* Media URL */}
              <div>
                <label className="block text-xs font-label font-bold text-on-surface mb-1">
                  {createType === 'post' ? 'Image / Visual URL' : 'Poster Thumbnail Image URL'}
                </label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={createMediaUrl}
                  onChange={(e) => setCreateMediaUrl(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/30 text-xs font-body text-on-surface focus:outline-none focus:border-secondary"
                />
              </div>

              {/* Video URL for Reels */}
              {createType === 'reel' && (
                <div>
                  <label className="block text-xs font-label font-bold text-on-surface mb-1">
                    9:16 Video MP4 Link (CDN or Sample)
                  </label>
                  <input
                    type="url"
                    placeholder="https://assets.mixkit.co/videos/preview/..."
                    value={createVideoUrl}
                    onChange={(e) => setCreateVideoUrl(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/30 text-xs font-body text-on-surface focus:outline-none focus:border-primary"
                  />
                  <div className="flex items-center gap-2 mt-1.5">
                    <button
                      type="button"
                      onClick={() => setCreateVideoUrl('https://assets.mixkit.co/videos/preview/mixkit-cyberpunk-city-street-with-neon-lights-41007-large.mp4')}
                      className="text-[10px] text-secondary hover:underline cursor-pointer"
                    >
                      + Use Sample Cyberpunk Loop
                    </button>
                    <button
                      type="button"
                      onClick={() => setCreateVideoUrl('https://assets.mixkit.co/videos/preview/mixkit-ink-swirling-in-water-43387-large.mp4')}
                      className="text-[10px] text-secondary hover:underline cursor-pointer"
                    >
                      + Use Fluid Dye ASMR
                    </button>
                  </div>
                </div>
              )}

              {/* Prompt recipe */}
              <div>
                <label className="block text-xs font-label font-bold text-on-surface mb-1">
                  Generative Prompt & Parameters
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Cinematic macro shot of iridescent silk in wind, volumetric rays, 8k resolution --ar 3:4"
                  value={createPrompt}
                  onChange={(e) => setCreatePrompt(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl bg-surface-container-low border border-outline-variant/30 text-xs font-mono text-on-surface focus:outline-none focus:border-secondary"
                />
              </div>

              {/* Caption */}
              <div>
                <label className="block text-xs font-label font-bold text-on-surface mb-1">
                  Caption & Context
                </label>
                <textarea
                  rows={2}
                  placeholder="Tell clients and creators about your technique or workflow..."
                  value={createCaption}
                  onChange={(e) => setCreateCaption(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl bg-surface-container-low border border-outline-variant/30 text-xs font-body text-on-surface focus:outline-none focus:border-secondary"
                />
              </div>

              <div className="pt-3 border-t border-outline-variant/15 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-5 py-2.5 rounded-full bg-surface-container hover:bg-surface-container-high text-xs font-label font-semibold text-on-surface cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-secondary hover:bg-secondary/90 text-white text-xs font-label font-semibold shadow-md cursor-pointer"
                >
                  Publish to Community Feed
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 6. BRAND USER NOTICE MODAL                                               */}
      {/* ========================================================================= */}
      {showBrandNoticeModal && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setShowBrandNoticeModal(false)}
        >
          <div
            className="bg-surface-container-lowest rounded-3xl max-w-md w-full p-6 sm:p-8 border border-outline-variant/30 shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-12 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center">
              <span className="material-symbols-outlined text-[28px]">verified_user</span>
            </div>

            <div>
              <h3 className="font-headline text-xl font-bold text-on-surface">
                Creator Exclusive Publishing
              </h3>
              <p className="font-body text-xs text-on-surface-variant leading-relaxed mt-2">
                As a registered enterprise brand, you have full access to explore the community feed, bookmark generative recipes, like, comment, and commission top AI creators.
              </p>
              <p className="font-body text-xs text-on-surface-variant leading-relaxed mt-2">
                To maintain curated high-fashion and commercial production quality, only verified Creator Hub members can publish new visual pins and video reels.
              </p>
            </div>

            <div className="pt-3 border-t border-outline-variant/15 flex items-center justify-end gap-2">
              <button
                onClick={() => setShowBrandNoticeModal(false)}
                className="px-5 py-2.5 rounded-full bg-surface-container hover:bg-surface-container-high text-xs font-label font-semibold text-on-surface cursor-pointer"
              >
                Got it
              </button>
              <Link
                to="/brand/briefs/create"
                onClick={() => setShowBrandNoticeModal(false)}
                className="px-5 py-2.5 rounded-full bg-primary hover:bg-primary/90 text-white text-xs font-label font-semibold shadow-xs"
              >
                Post Brand Brief
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
