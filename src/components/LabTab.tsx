import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Play, RotateCcw, Trophy, Heart, MessageCircle, TrendingUp, Plus, Edit2, Trash2, Send, Zap, ChevronLeft, Target, MousePointer2, Dices, Hammer, Type, Music, Flame } from 'lucide-react';
import { useStore } from '../store/stores/useStore';
import { useShallow } from 'zustand/react/shallow';
import { cn } from '../lib/utils';

export function LabTab() {
  const [activeLab, setActiveLab] = useState<'catch' | 'likes' | 'gacha' | 'breaker' | 'noBackspace' | 'zen' | 'wordChain' | null>(null);
  
  return (
    <div className="flex-1 w-full h-full flex flex-col bg-stone-50">
      <div className="flex-1 overflow-hidden">
        {!activeLab ? (
          <div className="h-full overflow-y-auto p-6 md:p-10 lg:p-20 bg-stone-50/50">
            <div className="w-full">
              <div className="mb-20 text-center">
                <h1 className="text-5xl md:text-6xl font-serif font-bold text-stone-900 mb-8 tracking-tight">实验性功能</h1>
                <p className="text-stone-500 text-2xl max-w-4xl mx-auto leading-relaxed">
                  这里是创意孵化器。我们在这里测试一些有趣的小工具，帮助你缓解写作压力，或者激发新的灵感。
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-12">
                {/* Like Simulator Card */}
                <button
                  onClick={() => setActiveLab('likes')}
                  className="group relative bg-white border border-stone-200 rounded-3xl p-8 text-left transition-all hover:shadow-xl hover:shadow-wood-900/5 hover:-translate-y-1 overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Heart size={120} fill="currentColor" className="text-wood-600" />
                  </div>
                  
                  <div className="w-14 h-14 bg-wood-100 rounded-2xl flex items-center justify-center text-wood-600 mb-6 group-hover:scale-110 transition-transform">
                    <Heart size={28} fill="currentColor" />
                  </div>
                  
                  <h3 className="text-xl font-serif font-bold text-stone-900 mb-3">点赞模拟器</h3>
                  <p className="text-stone-500 text-sm leading-relaxed mb-6">
                    体验成为“百万点赞”作家的快感。发布动态，吸引粉丝，升级你的创作影响力。这是一个轻松的挂机游戏，让你在写作间隙享受被鼓励的快乐。
                  </p>
                  
                  <div className="flex items-center text-wood-600 text-sm font-bold gap-2">
                    立即开始 <Play size={14} fill="currentColor" />
                  </div>
                </button>

                {/* Catch Game Card */}
                <button
                  onClick={() => setActiveLab('catch')}
                  className="group relative bg-white border border-stone-200 rounded-3xl p-8 text-left transition-all hover:shadow-xl hover:shadow-blue-900/5 hover:-translate-y-1 overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Target size={120} className="text-blue-600" />
                  </div>
                  
                  <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform">
                    <MousePointer2 size={28} />
                  </div>
                  
                  <h3 className="text-xl font-serif font-bold text-stone-900 mb-3">灵感接球</h3>
                  <p className="text-stone-500 text-sm leading-relaxed mb-6">
                    灵感总是转瞬即逝？在这个快节奏的小游戏中，你需要接住不断落下的“灵感球”。锻炼你的反应力，在动感中找回创作的状态。
                  </p>
                  
                  <div className="flex items-center text-blue-600 text-sm font-bold gap-2">
                    立即开始 <Play size={14} fill="currentColor" />
                  </div>
                </button>

                {/* Gacha Game Card */}
                <button
                  onClick={() => setActiveLab('gacha')}
                  className="group relative bg-white border border-stone-200 rounded-3xl p-8 text-left transition-all hover:shadow-xl hover:shadow-purple-900/5 hover:-translate-y-1 overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Dices size={120} className="text-purple-600" />
                  </div>
                  
                  <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600 mb-6 group-hover:scale-110 transition-transform">
                    <Dices size={28} />
                  </div>
                  
                  <h3 className="text-xl font-serif font-bold text-stone-900 mb-3">灵感扭蛋机</h3>
                  <p className="text-stone-500 text-sm leading-relaxed mb-6">
                    卡文了？来摇一摇！随机组合人物、场景和冲突，强行碰撞出荒诞又有趣的火花，为你提供意想不到的脑洞。
                  </p>
                  
                  <div className="flex items-center text-purple-600 text-sm font-bold gap-2">
                    立即开始 <Play size={14} fill="currentColor" />
                  </div>
                </button>

                {/* Breaker Game Card */}
                <button
                  onClick={() => setActiveLab('breaker')}
                  className="group relative bg-white border border-stone-200 rounded-3xl p-8 text-left transition-all hover:shadow-xl hover:shadow-orange-900/5 hover:-translate-y-1 overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Hammer size={120} className="text-orange-600" />
                  </div>
                  
                  <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-600 mb-6 group-hover:scale-110 transition-transform">
                    <Hammer size={28} />
                  </div>
                  
                  <h3 className="text-xl font-serif font-bold text-stone-900 mb-3">击碎“卡文”</h3>
                  <p className="text-stone-500 text-sm leading-relaxed mb-6">
                    物理层面上发泄写不出来的挫败感。控制灵感小球，击碎“拖延症”、“完美主义”等写作烦恼，找回畅快的输出状态。
                  </p>
                  
                  <div className="flex items-center text-orange-600 text-sm font-bold gap-2">
                    立即开始 <Play size={14} fill="currentColor" />
                  </div>
                </button>

                {/* No Backspace Game Card */}
                <button
                  onClick={() => setActiveLab('noBackspace')}
                  className="group relative bg-white border border-stone-200 rounded-3xl p-8 text-left transition-all hover:shadow-xl hover:shadow-rose-900/5 hover:-translate-y-1 overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Type size={120} className="text-rose-600" />
                  </div>
                  
                  <div className="w-14 h-14 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-600 mb-6 group-hover:scale-110 transition-transform">
                    <Type size={28} />
                  </div>
                  
                  <h3 className="text-xl font-serif font-bold text-stone-900 mb-3">绝不回头</h3>
                  <p className="text-stone-500 text-sm leading-relaxed mb-6">
                    极限速写挑战。退格键被禁用，必须硬着头皮写下去。专治完美主义，强制进入纯粹的输出心流。
                  </p>
                  
                  <div className="flex items-center text-rose-600 text-sm font-bold gap-2">
                    立即开始 <Play size={14} fill="currentColor" />
                  </div>
                </button>

                {/* Zen Game Card */}
                <button
                  onClick={() => setActiveLab('zen')}
                  className="group relative bg-white border border-stone-200 rounded-3xl p-8 text-left transition-all hover:shadow-xl hover:shadow-teal-900/5 hover:-translate-y-1 overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Music size={120} className="text-teal-600" />
                  </div>
                  
                  <div className="w-14 h-14 bg-teal-50 rounded-2xl flex items-center justify-center text-teal-600 mb-6 group-hover:scale-110 transition-transform">
                    <Music size={28} />
                  </div>
                  
                  <h3 className="text-xl font-serif font-bold text-stone-900 mb-3">键盘八音盒</h3>
                  <p className="text-stone-500 text-sm leading-relaxed mb-6">
                    极度放松的视听玩具。敲击键盘，弹奏属于你的无规律音乐，在水彩晕染的特效中清空大脑。
                  </p>
                  
                  <div className="flex items-center text-teal-600 text-sm font-bold gap-2">
                    立即开始 <Play size={14} fill="currentColor" />
                  </div>
                </button>

                {/* Word Chain Game Card */}
                <button
                  onClick={() => setActiveLab('wordChain')}
                  className="group relative bg-white border border-stone-200 rounded-3xl p-8 text-left transition-all hover:shadow-xl hover:shadow-red-900/5 hover:-translate-y-1 overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Flame size={120} className="text-red-600" />
                  </div>
                  
                  <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center text-red-600 mb-6 group-hover:scale-110 transition-transform">
                    <Flame size={28} />
                  </div>
                  
                  <h3 className="text-xl font-serif font-bold text-stone-900 mb-3">词汇接龙生存战</h3>
                  <p className="text-stone-500 text-sm leading-relaxed mb-6">
                    激活大脑词汇库。在不断缩短的倒计时内完成词语接龙，紧张刺激的快节奏热身运动。
                  </p>
                  
                  <div className="flex items-center text-red-600 text-sm font-bold gap-2">
                    立即开始 <Play size={14} fill="currentColor" />
                  </div>
                </button>
              </div>

              <div className="mt-16 p-6 bg-stone-100/50 rounded-2xl border border-dashed border-stone-300 text-center">
                <p className="text-stone-400 text-xs font-medium uppercase tracking-widest">
                  更多实验功能正在开发中...
                </p>
              </div>
            </div>
          </div>
        ) : activeLab === 'catch' ? (
          <CatchGame onBack={() => setActiveLab(null)} />
        ) : activeLab === 'gacha' ? (
          <InspirationGacha onBack={() => setActiveLab(null)} />
        ) : activeLab === 'breaker' ? (
          <BlockBreakerGame onBack={() => setActiveLab(null)} />
        ) : activeLab === 'noBackspace' ? (
          <NoBackspaceGame onBack={() => setActiveLab(null)} />
        ) : activeLab === 'zen' ? (
          <TypingZenGame onBack={() => setActiveLab(null)} />
        ) : activeLab === 'wordChain' ? (
          <WordChainGame onBack={() => setActiveLab(null)} />
        ) : (
          <LikeGame onBack={() => setActiveLab(null)} />
        )}
      </div>
    </div>
  );
}

function LikeGame({ onBack }: { onBack: () => void }) {
  const { 
    gameState, 
    addPost, 
    addLike, 
    buyUpgrade, 
    addTemplate, 
    updateTemplate, 
    deleteTemplate, 
    tick,
    togglePause,
    resetGame
  } = useStore(useShallow(state => ({
    gameState: state.labGameState,
    addPost: state.addLabPost,
    addLike: state.addLabLike,
    buyUpgrade: state.buyLabUpgrade,
    addTemplate: state.addLabCommentTemplate,
    updateTemplate: state.updateLabCommentTemplate,
    deleteTemplate: state.deleteLabCommentTemplate,
    tick: state.tickLabGame,
    togglePause: state.toggleLabPause,
    resetGame: state.resetLabGame
  })));

  const [newPostContent, setNewPostContent] = useState('');
  const [newTemplateContent, setNewTemplateContent] = useState('');
  const [editingTemplateIndex, setEditingTemplateIndex] = useState<number | null>(null);
  const [editTemplateContent, setEditTemplateContent] = useState('');
  const [danmakus, setDanmakus] = useState<{ id: string, text: string, top: number, duration: number }[]>([]);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const lastCommentCount = useRef(gameState.comments.length);

  // Game Tick
  useEffect(() => {
    const interval = setInterval(() => {
      tick();
    }, 1000);
    return () => clearInterval(interval);
  }, [tick]);

  // Danmaku logic
  useEffect(() => {
    if (gameState.comments.length > lastCommentCount.current) {
      const numNew = gameState.comments.length - lastCommentCount.current;
      const newComments = gameState.comments.slice(0, numNew);
      const newDanmakus = newComments.map(c => ({
        id: c.id,
        text: c.content,
        top: Math.random() * 80 + 10, // 10% to 90%
        duration: 5 + Math.random() * 5 // 5s to 10s
      }));
      
      setDanmakus(prev => {
        const existingIds = new Set(prev.map(d => d.id));
        const uniqueNew = newDanmakus.filter(d => !existingIds.has(d.id));
        return [...prev, ...uniqueNew];
      });
      
      // Cleanup danmaku after they finish
      newDanmakus.forEach(d => {
        setTimeout(() => {
          setDanmakus(prev => prev.filter(item => item.id !== d.id));
        }, d.duration * 1000);
      });
    }
    lastCommentCount.current = gameState.comments.length;
  }, [gameState.comments]);

  const handleAddPost = () => {
    if (newPostContent.trim()) {
      addPost(newPostContent.trim());
      setNewPostContent('');
    }
  };

  const handleAddTemplate = () => {
    if (newTemplateContent.trim()) {
      addTemplate(newTemplateContent.trim());
      setNewTemplateContent('');
    }
  };

  const lps = (gameState.posts.length * gameState.upgrades.likeRate * 0.1).toFixed(1);

  return (
    <div className="fixed inset-0 z-[100] flex flex-col lg:flex-row bg-stone-50 overflow-hidden">
      {/* Main Content Container with Blur when paused */}
      <div className={cn(
        "flex flex-col lg:flex-row flex-1 overflow-hidden transition-all duration-500",
        gameState.isPaused && "blur-md grayscale-[0.2] pointer-events-none"
      )}>
        {/* Column 1: Social Feed (Simulator) */}
        <div className="flex-1 flex flex-col border-r border-stone-200 bg-white overflow-hidden relative">
          {/* Danmaku Layer */}
          <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
            {danmakus.map(d => (
              <div 
                key={d.id}
                className="absolute whitespace-nowrap text-sm font-bold text-wood-600/80 bg-white/40 backdrop-blur-[1px] px-2 py-1 rounded-full border border-wood-200/30 shadow-sm animate-danmaku"
                style={{ 
                  top: `${d.top}%`, 
                  animationDuration: `${d.duration}s`,
                  left: '100%'
                }}
              >
                {d.text}
              </div>
            ))}
          </div>

          <div className="p-4 border-b border-stone-100 bg-stone-50/50 z-20">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => onBack()}
                  className="p-2 hover:bg-stone-200 rounded-full transition-colors mr-1"
                  title="返回实验室首页"
                >
                  <ChevronLeft size={20} className="text-stone-500" />
                </button>
                <div className="p-2 bg-wood-100 rounded-lg text-wood-600">
                  <Heart size={24} fill="currentColor" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-stone-900 tabular-nums">{Math.floor(gameState.likes).toLocaleString()}</p>
                  <p className="text-xs text-stone-500 flex items-center gap-1">
                    <TrendingUp size={12} />
                    {lps} Likes/sec
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={togglePause}
                  className={cn(
                    "p-2 rounded-lg transition-all",
                    gameState.isPaused ? "bg-amber-100 text-amber-600" : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                  )}
                  title={gameState.isPaused ? "继续游戏" : "暂停游戏"}
                >
                  {gameState.isPaused ? <Play size={20} fill="currentColor" /> : <Zap size={20} className={cn(!gameState.isPaused && "animate-pulse")} />}
                </button>
                <button
                  onClick={() => setShowResetConfirm(true)}
                  className="p-2 bg-stone-100 text-stone-600 hover:bg-red-50 hover:text-red-600 rounded-lg transition-all"
                  title="重置游戏"
                >
                  <RotateCcw size={20} />
                </button>
                <button 
                  onClick={() => addLike(1)}
                  className="px-4 py-2 bg-wood-600 hover:bg-wood-700 text-white rounded-full font-bold shadow-lg hover:shadow-wood-200 transition-all active:scale-95 text-sm"
                >
                  点赞 +1
                </button>
              </div>
            </div>

            <div className="flex gap-2">
              <textarea
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                placeholder="发布一条新动态，开启模拟..."
                className="flex-1 p-3 text-sm border border-stone-200 rounded-xl focus:ring-2 focus:ring-wood-500 focus:border-transparent outline-none resize-none h-20"
              />
              <button
                onClick={handleAddPost}
                disabled={gameState.posts.length >= gameState.upgrades.postCount * 3}
                className="px-4 bg-wood-50 text-wood-600 hover:bg-wood-100 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                title={gameState.posts.length >= gameState.upgrades.postCount * 3 ? "达到当前发布上限" : "发布动态"}
              >
                <Send size={20} />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-stone-50/30 z-0">
            {gameState.posts.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-stone-400 opacity-60">
                <MessageCircle size={48} className="mb-2" />
                <p>还没有动态，快去发布第一条吧！</p>
              </div>
            ) : (
              gameState.posts.map(post => (
                <div key={post.id} className="bg-white p-4 rounded-xl border border-stone-200 shadow-sm animate-in fade-in slide-in-from-bottom-2">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-stone-200" />
                      <div>
                        <p className="text-sm font-bold text-stone-800">创作者</p>
                        <p className="text-[10px] text-stone-400">{new Date(post.createdAt).toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-stone-700 mb-3 whitespace-pre-wrap">{post.content}</p>
                  <div className="flex items-center gap-4 text-stone-500 text-xs border-t border-stone-50 pt-3">
                    <span className="flex items-center gap-1 text-wood-600 font-medium">
                      <Heart size={14} fill="currentColor" /> {Math.floor(post.likes).toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle size={14} /> {gameState.comments.filter(c => c.postId === post.id).length}
                    </span>
                  </div>
                  
                  {/* Comments for this post */}
                  <div className="mt-3 space-y-2">
                    {gameState.comments.filter(c => c.postId === post.id).slice(0, 3).map(comment => (
                      <div key={comment.id} className="bg-stone-50 p-2 rounded-lg text-[11px] text-stone-600 animate-in fade-in slide-in-from-left-2">
                        <span className="font-bold text-stone-800 mr-1">粉丝:</span>
                        {comment.content}
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Column 2: Shop & Upgrades */}
        <div className="w-full lg:w-72 flex flex-col border-r border-stone-200 bg-stone-50/50 overflow-hidden">
          <div className="p-4 border-b border-stone-200 bg-white">
            <h3 className="text-xs font-bold text-stone-400 uppercase tracking-widest flex items-center gap-2">
              <Zap size={14} /> 升级商店
            </h3>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            <UpgradeCard
              title="发布上限"
              description="允许同时存在更多动态"
              level={gameState.upgrades.postCount || 1}
              cost={Math.floor(100 * Math.pow(1.5, (gameState.upgrades.postCount || 1) - 1))}
              onBuy={() => buyUpgrade('postCount', Math.floor(100 * Math.pow(1.5, (gameState.upgrades.postCount || 1) - 1)))}
              canAfford={gameState.likes >= Math.floor(100 * Math.pow(1.5, (gameState.upgrades.postCount || 1) - 1))}
            />
            <UpgradeCard
              title="点赞频率"
              description="提升每条动态的基础产出"
              level={gameState.upgrades.likeRate || 1}
              cost={Math.floor(50 * Math.pow(1.6, (gameState.upgrades.likeRate || 1) - 1))}
              onBuy={() => buyUpgrade('likeRate', Math.floor(50 * Math.pow(1.6, (gameState.upgrades.likeRate || 1) - 1)))}
              canAfford={gameState.likes >= Math.floor(50 * Math.pow(1.6, (gameState.upgrades.likeRate || 1) - 1))}
            />
            <UpgradeCard
              title="评论频率"
              description="粉丝更有可能发表长评"
              level={gameState.upgrades.commentRate || 1}
              cost={Math.floor(200 * Math.pow(1.8, (gameState.upgrades.commentRate || 1) - 1))}
              onBuy={() => buyUpgrade('commentRate', Math.floor(200 * Math.pow(1.8, (gameState.upgrades.commentRate || 1) - 1)))}
              canAfford={gameState.likes >= Math.floor(200 * Math.pow(1.8, (gameState.upgrades.commentRate || 1) - 1))}
            />
            <UpgradeCard
              title="评论质量"
              description="解锁更高级、更长篇的评论模板"
              level={gameState.upgrades.commentQuality || 1}
              cost={Math.floor(1000 * Math.pow(10, (gameState.upgrades.commentQuality || 1) - 1))}
              onBuy={() => buyUpgrade('commentQuality', Math.floor(1000 * Math.pow(10, (gameState.upgrades.commentQuality || 1) - 1)))}
              canAfford={gameState.likes >= Math.floor(1000 * Math.pow(10, (gameState.upgrades.commentQuality || 1) - 1))}
            />
          </div>
        </div>

        {/* Column 3: Comment Template Pool (Waterfall Layout) */}
        <div className="w-full lg:w-80 flex flex-col bg-stone-50 overflow-hidden">
          <div className="p-4 border-b border-stone-200 bg-white">
            <h3 className="text-xs font-bold text-stone-400 uppercase tracking-widest flex items-center gap-2">
              <MessageCircle size={14} /> 评论模版池
            </h3>
            <div className="mt-3 flex gap-1">
              <input
                type="text"
                value={newTemplateContent}
                onChange={(e) => setNewTemplateContent(e.target.value)}
                placeholder="添加新评论模板..."
                className="flex-1 text-xs p-2 border border-stone-200 rounded-lg outline-none focus:ring-1 focus:ring-wood-500"
              />
              <button 
                onClick={handleAddTemplate}
                className="p-2 bg-wood-50 text-wood-600 hover:bg-wood-100 rounded-lg transition-colors"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4">
            <div className="columns-2 gap-2 space-y-2">
              {gameState.commentPool.map((template, index) => (
                <div 
                  key={index} 
                  className="break-inside-avoid bg-white p-3 rounded-xl border border-stone-200 shadow-sm group hover:border-wood-300 transition-all"
                >
                  {editingTemplateIndex === index ? (
                    <div className="flex flex-col gap-2">
                      <textarea
                        autoFocus
                        value={editTemplateContent}
                        onChange={(e) => setEditTemplateContent(e.target.value)}
                        className="w-full text-xs p-2 border border-wood-200 rounded-lg outline-none resize-none h-20"
                      />
                      <div className="flex justify-end gap-1">
                        <button 
                          onClick={() => setEditingTemplateIndex(null)}
                          className="px-2 py-1 text-[10px] text-stone-500 hover:bg-stone-100 rounded"
                        >
                          取消
                        </button>
                        <button 
                          onClick={() => {
                            updateTemplate(index, editTemplateContent);
                            setEditingTemplateIndex(null);
                          }}
                          className="px-2 py-1 text-[10px] bg-wood-600 text-white rounded"
                        >
                          保存
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <p className="text-xs text-stone-700 leading-relaxed mb-2">{template}</p>
                      <div className="flex items-center justify-between pt-2 border-t border-stone-50 opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-[10px] text-stone-400">{template.length} 字</span>
                        <div className="flex items-center gap-1">
                          <button 
                            onClick={() => {
                              setEditingTemplateIndex(index);
                              setEditTemplateContent(template);
                            }}
                            className="p-1 text-stone-400 hover:text-wood-600"
                          >
                            <Edit2 size={12} />
                          </button>
                          <button 
                            onClick={() => deleteTemplate(index)}
                            className="p-1 text-stone-400 hover:text-red-600"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Reset Confirmation Overlay */}
      {showResetConfirm && (
        <div className="absolute inset-0 z-[60] flex items-center justify-center bg-stone-900/40 backdrop-blur-sm p-6 animate-in fade-in duration-300">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl border border-stone-200 animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center text-red-600 mx-auto mb-6">
              <RotateCcw size={32} />
            </div>
            <h3 className="text-xl font-serif font-bold text-stone-900 text-center mb-2">确定要重置吗？</h3>
            <p className="text-stone-500 text-sm text-center mb-8 leading-relaxed">
              这将清除所有点赞、博文和升级进度。此操作不可撤销。
            </p>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => {
                  resetGame();
                  setShowResetConfirm(false);
                }}
                className="w-full py-3 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-all shadow-lg"
              >
                确认重置
              </button>
              <button
                onClick={() => setShowResetConfirm(false)}
                className="w-full py-3 bg-stone-100 text-stone-600 rounded-xl font-bold hover:bg-stone-200 transition-all"
              >
                取消
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Victory Overlay */}
      {gameState.hasWon && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-stone-900/40 backdrop-blur-sm p-6 animate-in fade-in duration-500">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl text-center border-4 border-wood-500 animate-in zoom-in-95 duration-300">
            <div className="w-20 h-20 bg-wood-100 rounded-full flex items-center justify-center mx-auto mb-6 text-wood-600 animate-bounce">
              <Trophy size={40} />
            </div>
            <h2 className="text-2xl font-serif font-bold text-stone-900 mb-2">传奇作家！</h2>
            <p className="text-stone-600 text-sm mb-8 leading-relaxed">
              你的作品已经突破了百万点赞！你现在是文学界的璀璨明星。
            </p>
            <button
              onClick={resetGame}
              className="w-full py-3 bg-wood-600 text-white rounded-xl font-bold hover:bg-wood-700 transition-all shadow-lg flex items-center justify-center gap-2"
            >
              <RotateCcw size={18} /> 开启新篇章
            </button>
          </div>
        </div>
      )}

      {/* Pause Overlay */}
      {gameState.isPaused && !gameState.hasWon && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-stone-900/10 backdrop-blur-md transition-all animate-in fade-in duration-300">
          <div className="bg-white rounded-3xl p-8 shadow-2xl border border-stone-200 flex flex-col items-center gap-6 max-w-xs w-full animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center text-amber-600">
              <Play size={32} fill="currentColor" />
            </div>
            <div className="text-center">
              <h3 className="text-xl font-serif font-bold text-stone-900 mb-1">游戏已暂停</h3>
              <p className="text-stone-500 text-sm">休息一下，稍后继续创作</p>
            </div>
            <div className="flex flex-col w-full gap-3">
              <button 
                onClick={togglePause}
                className="w-full py-3 bg-wood-600 text-white rounded-xl font-bold hover:bg-wood-700 transition-all shadow-lg flex items-center justify-center gap-2"
              >
                <Play size={18} fill="currentColor" /> 继续游戏
              </button>
              <button 
                onClick={() => setShowResetConfirm(true)}
                className="w-full py-3 bg-stone-100 text-stone-600 rounded-xl font-bold hover:bg-stone-200 transition-all flex items-center justify-center gap-2"
              >
                <RotateCcw size={18} /> 重来
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function UpgradeCard({ title, description, level, cost, onBuy, canAfford }: { 
  title: string, description: string, level: number, cost: number, onBuy: () => void, canAfford: boolean 
}) {
  return (
    <button
      onClick={onBuy}
      disabled={!canAfford}
      className={cn(
        "w-full p-3 rounded-xl border text-left transition-all group",
        canAfford 
          ? "bg-white border-stone-200 hover:border-wood-300 hover:shadow-md" 
          : "bg-stone-100 border-stone-200 opacity-60 grayscale"
      )}
    >
      <div className="flex justify-between items-start mb-1">
        <h4 className="font-bold text-stone-800 text-sm">{title}</h4>
        <span className="text-[10px] bg-wood-50 text-wood-600 px-1.5 py-0.5 rounded font-bold">Lv.{level}</span>
      </div>
      <p className="text-[10px] text-stone-500 mb-2">{description}</p>
      <div className="flex items-center justify-between mt-auto">
        <span className={cn("text-xs font-bold", canAfford ? "text-wood-600" : "text-stone-400")}>
          {cost.toLocaleString()} Likes
        </span>
        <div className={cn(
          "p-1 rounded-full transition-colors",
          canAfford ? "bg-wood-50 text-wood-600 group-hover:bg-wood-600 group-hover:text-white" : "bg-stone-200 text-stone-400"
        )}>
          <Plus size={12} />
        </div>
      </div>
    </button>
  );
}

function CatchGame({ onBack }: { onBack: () => void }) {
  const [gameActive, setGameActive] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { blocks } = useStore(useShallow(state => ({
    blocks: state.blocks
  })));

  // Game logic
  useEffect(() => {
    if (!gameActive || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const words = blocks.map(b => b.content.split(/\s+/)).flat().filter(w => w.length > 1);
    const gameWords: { x: number, y: number, text: string, speed: number, size: number }[] = [];
    let playerX = canvas.width / 2;
    const playerWidth = 80;
    const playerHeight = 10;

    const spawnWord = () => {
      if (words.length === 0) return;
      const text = words[Math.floor(Math.random() * words.length)];
      gameWords.push({
        x: Math.random() * (canvas.width - 50),
        y: -20,
        text: text.substring(0, 15),
        speed: 1 + Math.random() * 2 + (score / 10),
        size: 12 + Math.random() * 8
      });
    };

    let lastSpawn = 0;
    const render = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Spawn
      if (time - lastSpawn > 1000 - Math.min(score * 10, 500)) {
        spawnWord();
        lastSpawn = time;
      }

      // Draw Player
      ctx.fillStyle = '#8b0000';
      ctx.fillRect(playerX - playerWidth / 2, canvas.height - 30, playerWidth, playerHeight);
      ctx.strokeStyle = '#f4ebd8';
      ctx.strokeRect(playerX - playerWidth / 2, canvas.height - 30, playerWidth, playerHeight);

      // Update and Draw Words
      ctx.font = 'bold 14px serif';
      ctx.textAlign = 'center';
      
      for (let i = gameWords.length - 1; i >= 0; i--) {
        const w = gameWords[i];
        w.y += w.speed;

        // Collision check
        if (w.y > canvas.height - 40 && w.y < canvas.height - 20 && 
            w.x > playerX - playerWidth / 2 && w.x < playerX + playerWidth / 2) {
          setScore(s => s + 1);
          gameWords.splice(i, 1);
          continue;
        }

        // Out of bounds
        if (w.y > canvas.height) {
          setGameActive(false);
          return;
        }

        ctx.fillStyle = '#2c241b';
        ctx.fillText(w.text, w.x, w.y);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      playerX = e.clientX - rect.left;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, [gameActive, blocks, score]);

  useEffect(() => {
    if (score > highScore) setHighScore(score);
  }, [score, highScore]);

  const startGame = () => {
    setScore(0);
    setGameActive(true);
  };

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-stone-50 overflow-hidden">
      <div className="absolute top-4 left-4 z-50">
        <button
          onClick={() => onBack()}
          className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm border border-stone-200 rounded-full text-stone-600 hover:text-stone-900 shadow-sm transition-all"
        >
          <ChevronLeft size={18} />
          返回
        </button>
      </div>
      <div className="flex-1 p-6 space-y-6 w-full flex flex-col">
        <div className="flex items-center justify-between mt-12 md:mt-0">
        <div>
          <h2 className="text-2xl font-serif font-semibold text-stone-800 flex items-center">
            <Sparkles className="mr-2 text-wood-600" size={24} />
            实验室：灵感接球
          </h2>
          <p className="text-stone-600">接住从天而降的词汇，不要让灵感落地。</p>
        </div>
        <div className="flex items-center gap-4 bg-stone-100 p-3 rounded-lg border border-stone-200">
          <div className="text-center">
            <p className="text-xs uppercase tracking-wider text-stone-500">当前得分</p>
            <p className="text-xl font-bold text-wood-700">{score}</p>
          </div>
          <div className="w-px h-8 bg-stone-300" />
          <div className="text-center">
            <p className="text-xs uppercase tracking-wider text-stone-500">最高纪录</p>
            <p className="text-xl font-bold text-stone-700">{highScore}</p>
          </div>
        </div>
      </div>

      <div className="flex-1 relative bg-[#f4ebd8] rounded-xl border-4 border-double border-[#5c4a3d] shadow-inner overflow-hidden flex items-center justify-center">
        {!gameActive && (
          <div className="absolute inset-0 z-10 bg-black/20 backdrop-blur-[2px] flex flex-col items-center justify-center p-8 text-center">
            <div className="bg-white p-8 rounded-2xl shadow-2xl border border-stone-200 max-w-sm">
              <Trophy className="mx-auto mb-4 text-amber-500" size={48} />
              <h3 className="text-xl font-bold text-stone-800 mb-2">准备好了吗？</h3>
              <p className="text-stone-600 mb-6 text-sm">
                使用鼠标移动底部的托盘，接住从你的故事中掉落的词汇。如果词汇掉到地上，游戏结束。
              </p>
              <button
                onClick={startGame}
                className="w-full py-3 bg-wood-600 hover:bg-wood-700 text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-wood-200"
              >
                <Play size={20} />
                {score > 0 ? '再来一局' : '开始游戏'}
              </button>
            </div>
          </div>
        )}
        
        <canvas
          ref={canvasRef}
          width={800}
          height={500}
          className={cn(
            "max-w-full h-auto cursor-none",
            gameActive ? "opacity-100" : "opacity-50"
          )}
        />
      </div>
    </div>
  </div>
  );
}

const GACHA_CHARACTERS = ['晕血的刺客', '退休的魔法师', '失忆的AI', '破产的首富', '患有社恐的恶龙', '重度拖延症的死神', '热爱烘焙的星际海盗', '能听懂植物说话的侦探', '不敢看恐怖片的除妖师'];
const GACHA_SETTINGS = ['在深夜的自助洗衣店', '在即将坠毁的飞船上', '在充满丧尸的超市里', '在时间停止的电梯里', '在只有猫的平行宇宙', '在世界末日的前一天', '在一家永远走不出去的宜家', '在深海的废弃潜艇中', '在正在喷发的火山口'];
const GACHA_CONFLICTS = ['突然捡到一个会说话的钱包', '发现自己是一本小说里的配角', '必须在5分钟内拆除炸弹', '遇到了初恋的前任', '身体开始变得透明', '被告知明天就是世界末日', '发现所有人都在对自己撒谎', '不小心触发了时间循环', '和死对头互换了身体'];

function InspirationGacha({ onBack }: { onBack: () => void }) {
  const [spinning, setSpinning] = useState(false);
  const [results, setResults] = useState(['点击摇杆', '获取你的', '专属灵感']);
  const [history, setHistory] = useState<string[][]>([]);

  const spin = () => {
    if (spinning) return;
    setSpinning(true);
    
    let ticks = 0;
    const maxTicks = 20;
    
    const interval = setInterval(() => {
      setResults([
        GACHA_CHARACTERS[Math.floor(Math.random() * GACHA_CHARACTERS.length)],
        GACHA_SETTINGS[Math.floor(Math.random() * GACHA_SETTINGS.length)],
        GACHA_CONFLICTS[Math.floor(Math.random() * GACHA_CONFLICTS.length)]
      ]);
      
      ticks++;
      if (ticks >= maxTicks) {
        clearInterval(interval);
        setSpinning(false);
        const finalResults = [
          GACHA_CHARACTERS[Math.floor(Math.random() * GACHA_CHARACTERS.length)],
          GACHA_SETTINGS[Math.floor(Math.random() * GACHA_SETTINGS.length)],
          GACHA_CONFLICTS[Math.floor(Math.random() * GACHA_CONFLICTS.length)]
        ];
        setResults(finalResults);
        setHistory(prev => [finalResults, ...prev].slice(0, 10)); // Keep last 10
      }
    }, 100);
  };

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-stone-50 overflow-hidden">
      <div className="absolute top-4 left-4 z-50">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm border border-stone-200 rounded-full text-stone-600 hover:text-stone-900 shadow-sm transition-all"
        >
          <ChevronLeft size={18} />
          返回
        </button>
      </div>
      
      <div className="flex-1 p-6 md:p-12 lg:p-20 flex flex-col items-center justify-center overflow-y-auto">
        <div className="max-w-4xl w-full flex flex-col lg:flex-row gap-12 items-center">
          
          {/* Gacha Machine */}
          <div className="flex-1 w-full bg-white p-8 rounded-3xl border border-stone-200 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500" />
            
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 text-purple-600 rounded-2xl mb-4">
                <Dices size={32} />
              </div>
              <h2 className="text-3xl font-serif font-bold text-stone-900 mb-2">灵感扭蛋机</h2>
              <p className="text-stone-500">拉动摇杆，碰撞出意想不到的火花</p>
            </div>

            <div className="flex flex-col gap-4 mb-10">
              {results.map((text, i) => (
                <div 
                  key={i}
                  className={cn(
                    "p-6 rounded-2xl border-2 text-center transition-all duration-100",
                    spinning ? "bg-stone-100 border-stone-200 text-stone-400 scale-[0.98]" : "bg-white border-purple-200 text-stone-800 shadow-sm scale-100",
                    !spinning && text !== '点击摇杆' && text !== '获取你的' && text !== '专属灵感' && "font-bold text-lg"
                  )}
                >
                  {text}
                </div>
              ))}
            </div>

            <button
              onClick={spin}
              disabled={spinning}
              className={cn(
                "w-full py-5 rounded-2xl font-bold text-xl transition-all flex items-center justify-center gap-3",
                spinning 
                  ? "bg-stone-200 text-stone-400 cursor-not-allowed" 
                  : "bg-purple-600 hover:bg-purple-700 text-white shadow-lg hover:shadow-purple-200 active:scale-95"
              )}
            >
              {spinning ? (
                <Sparkles className="animate-spin" />
              ) : (
                <Dices />
              )}
              {spinning ? '正在生成脑洞...' : '拉动摇杆'}
            </button>
          </div>

          {/* History / Output */}
          <div className="w-full lg:w-80 flex flex-col gap-4">
            <h3 className="text-sm font-bold text-stone-400 uppercase tracking-widest px-2">最近的脑洞</h3>
            {history.length === 0 ? (
              <div className="p-8 text-center border border-dashed border-stone-300 rounded-2xl text-stone-400 text-sm">
                还没有生成任何灵感，快去摇一摇吧！
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {history.map((h, i) => (
                  <div key={i} className="p-4 bg-white border border-stone-200 rounded-2xl shadow-sm text-sm text-stone-600 leading-relaxed">
                    <span className="font-bold text-purple-600">{h[0]}</span>，
                    <span className="font-bold text-blue-600">{h[1]}</span>，
                    <span className="font-bold text-rose-600">{h[2]}</span>。
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

function NoBackspaceGame({ onBack }: { onBack: () => void }) {
  const [text, setText] = useState('');
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutes
  const [gameActive, setGameActive] = useState(false);
  const [warning, setWarning] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const inactivityRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (gameActive && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setGameActive(false);
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (inactivityRef.current) clearTimeout(inactivityRef.current);
    };
  }, [gameActive, timeLeft]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' || e.key === 'Delete') {
      e.preventDefault();
      setWarning(true);
      setTimeout(() => setWarning(false), 500);
    }
    
    // Reset inactivity timer
    if (inactivityRef.current) clearTimeout(inactivityRef.current);
    inactivityRef.current = setTimeout(() => {
      // Trigger warning if inactive for 5 seconds
      setWarning(true);
      setTimeout(() => setWarning(false), 500);
    }, 5000);
  };

  const startGame = () => {
    setText('');
    setTimeLeft(180);
    setGameActive(true);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-stone-50 overflow-hidden">
      <div className="absolute top-4 left-4 z-50">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm border border-stone-200 rounded-full text-stone-600 hover:text-stone-900 shadow-sm transition-all"
        >
          <ChevronLeft size={18} />
          返回
        </button>
      </div>
      
      <div className="flex-1 p-6 md:p-12 lg:p-20 flex flex-col items-center">
        <div className="max-w-3xl w-full flex flex-col gap-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-serif font-bold text-stone-900 flex items-center">
                <Type className="mr-3 text-rose-600" size={32} />
                绝不回头
              </h2>
              <p className="text-stone-500 mt-2">极限速写挑战：禁用退格键，保持输出。</p>
            </div>
            <div className={cn(
              "px-6 py-3 rounded-full font-mono text-2xl font-bold border-2",
              timeLeft < 30 ? "bg-rose-100 text-rose-700 border-rose-300 animate-pulse" : "bg-white text-stone-800 border-stone-200"
            )}>
              {formatTime(timeLeft)}
            </div>
          </div>

          <div className={cn(
            "relative flex-1 min-h-[400px] bg-white rounded-3xl border-2 p-8 shadow-inner transition-all duration-200",
            warning ? "border-rose-500 ring-4 ring-rose-100" : "border-stone-200"
          )}>
            {!gameActive && (
              <div className="absolute inset-0 z-10 bg-white/90 backdrop-blur-sm flex flex-col items-center justify-center p-8 text-center rounded-3xl">
                <h3 className="text-2xl font-bold text-stone-900 mb-4">准备好进入心流了吗？</h3>
                <p className="text-stone-600 mb-8 max-w-sm">
                  在接下来的3分钟内，你不能删除任何字符。如果停顿超过5秒，也会收到警告。开始吧！
                </p>
                <button
                  onClick={startGame}
                  className="px-8 py-4 bg-rose-600 hover:bg-rose-700 text-white rounded-2xl font-bold text-lg transition-all shadow-lg hover:shadow-rose-500/30 active:scale-95"
                >
                  开始速写
                </button>
              </div>
            )}
            
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={!gameActive}
              className="w-full h-full resize-none outline-none font-serif text-lg leading-relaxed text-stone-800 placeholder:text-stone-300"
              placeholder="在这里开始你的速写..."
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function BlockBreakerGame({ onBack }: { onBack: () => void }) {
  const [gameActive, setGameActive] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [hasWon, setHasWon] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Game logic
  useEffect(() => {
    if (!gameActive || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    
    // Game state
    const paddle = {
      x: canvas.width / 2 - 50,
      y: canvas.height - 20,
      width: 100,
      height: 10,
      color: '#d97706' // amber-600
    };

    const ball = {
      x: canvas.width / 2,
      y: canvas.height - 30,
      dx: 4 * (Math.random() > 0.5 ? 1 : -1),
      dy: -4,
      radius: 6,
      color: '#f59e0b' // amber-500
    };

    const brickRowCount = 4;
    const brickColumnCount = 6;
    const brickWidth = 110;
    const brickHeight = 30;
    const brickPadding = 15;
    const brickOffsetTop = 50;
    const brickOffsetLeft = (canvas.width - (brickColumnCount * (brickWidth + brickPadding) - brickPadding)) / 2;

    const brickLabels = ["拖延症", "逻辑漏洞", "大纲卡壳", "刷手机", "完美主义", "词穷", "自我怀疑", "灵感枯竭"];

    const bricks: any[][] = [];
    for (let c = 0; c < brickColumnCount; c++) {
      bricks[c] = [];
      for (let r = 0; r < brickRowCount; r++) {
        bricks[c][r] = { 
          x: 0, 
          y: 0, 
          status: 1, 
          label: brickLabels[Math.floor(Math.random() * brickLabels.length)],
          color: ['#ef4444', '#f97316', '#eab308', '#22c55e'][r] // Different colors per row
        };
      }
    }

    let rightPressed = false;
    let leftPressed = false;

    const keyDownHandler = (e: KeyboardEvent) => {
      if (e.key === "Right" || e.key === "ArrowRight") rightPressed = true;
      else if (e.key === "Left" || e.key === "ArrowLeft") leftPressed = true;
    };

    const keyUpHandler = (e: KeyboardEvent) => {
      if (e.key === "Right" || e.key === "ArrowRight") rightPressed = false;
      else if (e.key === "Left" || e.key === "ArrowLeft") leftPressed = false;
    };

    const mouseMoveHandler = (e: MouseEvent) => {
      const relativeX = e.clientX - canvas.getBoundingClientRect().left;
      if (relativeX > 0 && relativeX < canvas.width) {
        paddle.x = relativeX - paddle.width / 2;
      }
    };

    window.addEventListener("keydown", keyDownHandler, false);
    window.addEventListener("keyup", keyUpHandler, false);
    canvas.addEventListener("mousemove", mouseMoveHandler, false);

    const collisionDetection = () => {
      let activeBricks = 0;
      for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
          const b = bricks[c][r];
          if (b.status === 1) {
            activeBricks++;
            if (
              ball.x > b.x &&
              ball.x < b.x + brickWidth &&
              ball.y > b.y &&
              ball.y < b.y + brickHeight
            ) {
              ball.dy = -ball.dy;
              b.status = 0;
              setScore(s => s + 10);
            }
          }
        }
      }
      if (activeBricks === 0) {
        setHasWon(true);
        setGameActive(false);
      }
    };

    const drawBall = () => {
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
      ctx.fillStyle = ball.color;
      ctx.fill();
      ctx.shadowBlur = 10;
      ctx.shadowColor = ball.color;
      ctx.closePath();
      ctx.shadowBlur = 0; // reset
    };

    const drawPaddle = () => {
      ctx.beginPath();
      ctx.roundRect(paddle.x, paddle.y, paddle.width, paddle.height, 5);
      ctx.fillStyle = paddle.color;
      ctx.fill();
      ctx.closePath();
    };

    const drawBricks = () => {
      for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
          if (bricks[c][r].status === 1) {
            const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
            const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
            bricks[c][r].x = brickX;
            bricks[c][r].y = brickY;
            
            ctx.beginPath();
            ctx.roundRect(brickX, brickY, brickWidth, brickHeight, 4);
            ctx.fillStyle = bricks[c][r].color;
            ctx.fill();
            ctx.closePath();

            // Draw text
            ctx.fillStyle = "#ffffff";
            ctx.font = "bold 14px sans-serif";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(bricks[c][r].label, brickX + brickWidth / 2, brickY + brickHeight / 2);
          }
        }
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      drawBricks();
      drawBall();
      drawPaddle();
      collisionDetection();

      if (ball.x + ball.dx > canvas.width - ball.radius || ball.x + ball.dx < ball.radius) {
        ball.dx = -ball.dx;
      }
      if (ball.y + ball.dy < ball.radius) {
        ball.dy = -ball.dy;
      } else if (ball.y + ball.dy > canvas.height - ball.radius) {
        if (ball.x > paddle.x && ball.x < paddle.x + paddle.width) {
          // Add some english (spin) based on where it hit the paddle
          let hitPoint = ball.x - (paddle.x + paddle.width / 2);
          ball.dx = hitPoint * 0.15;
          ball.dy = -ball.dy;
        } else {
          setGameActive(false);
          return; // Game over
        }
      }

      if (rightPressed && paddle.x < canvas.width - paddle.width) {
        paddle.x += 7;
      } else if (leftPressed && paddle.x > 0) {
        paddle.x -= 7;
      }

      ball.x += ball.dx;
      ball.y += ball.dy;

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("keydown", keyDownHandler);
      window.removeEventListener("keyup", keyUpHandler);
      canvas.removeEventListener("mousemove", mouseMoveHandler);
    };
  }, [gameActive]);

  useEffect(() => {
    if (score > highScore) setHighScore(score);
  }, [score, highScore]);

  const startGame = () => {
    setScore(0);
    setHasWon(false);
    setGameActive(true);
  };

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-stone-50 overflow-hidden">
      <div className="absolute top-4 left-4 z-50">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm border border-stone-200 rounded-full text-stone-600 hover:text-stone-900 shadow-sm transition-all"
        >
          <ChevronLeft size={18} />
          返回
        </button>
      </div>
      <div className="flex-1 p-6 space-y-6 w-full flex flex-col max-w-5xl mx-auto">
        <div className="flex items-center justify-between mt-12 md:mt-0">
        <div>
          <h2 className="text-2xl font-serif font-semibold text-stone-800 flex items-center">
            <Hammer className="mr-2 text-orange-600" size={24} />
            击碎“卡文”
          </h2>
          <p className="text-stone-600">控制灵感小球，击碎所有写作烦恼。</p>
        </div>
        <div className="flex items-center gap-4 bg-white p-3 rounded-xl border border-stone-200 shadow-sm">
          <div className="text-center px-4">
            <p className="text-xs uppercase tracking-wider text-stone-500 mb-1">当前得分</p>
            <p className="text-2xl font-bold text-orange-600 leading-none">{score}</p>
          </div>
          <div className="w-px h-10 bg-stone-200" />
          <div className="text-center px-4">
            <p className="text-xs uppercase tracking-wider text-stone-500 mb-1">最高纪录</p>
            <p className="text-2xl font-bold text-stone-700 leading-none">{highScore}</p>
          </div>
        </div>
      </div>

      <div className="flex-1 relative bg-stone-900 rounded-2xl border-4 border-stone-800 shadow-2xl overflow-hidden flex items-center justify-center min-h-[500px]">
        {!gameActive && (
          <div className="absolute inset-0 z-10 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center p-8 text-center">
            <div className="bg-white p-10 rounded-3xl shadow-2xl border border-stone-200 max-w-md w-full">
              {hasWon ? (
                <div className="w-20 h-20 bg-yellow-100 text-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Trophy size={40} />
                </div>
              ) : (
                <div className="w-20 h-20 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Hammer size={40} />
                </div>
              )}
              <h3 className="text-2xl font-bold text-stone-900 mb-3">
                {hasWon ? '大获全胜！' : score > 0 ? '游戏结束' : '准备好了吗？'}
              </h3>
              <p className="text-stone-500 mb-8 leading-relaxed">
                {hasWon ? '你已经击碎了所有的卡文烦恼，现在的你文思泉涌！' : '使用鼠标或左右方向键移动底部的挡板，弹射灵感小球击碎上方的“卡文”砖块。'}
              </p>
              <button
                onClick={startGame}
                className="w-full py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-orange-500/30 active:scale-95"
              >
                <Play size={20} fill="currentColor" />
                {score > 0 || hasWon ? '再来一局' : '开始发泄'}
              </button>
            </div>
          </div>
        )}
        
        <canvas
          ref={canvasRef}
          width={800}
          height={500}
          className={cn(
            "max-w-full h-auto",
            gameActive ? "opacity-100 cursor-none" : "opacity-50"
          )}
        />
      </div>
    </div>
  </div>
  );
}

function TypingZenGame({ onBack }: { onBack: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Resize canvas
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    let animationFrameId: number;
    const particles: any[] = [];

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life -= 0.01;
        p.radius += 2;
        
        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${Math.floor(p.life * 255).toString(16).padStart(2, '0')}`;
        ctx.fill();
        ctx.closePath();
      }

      animationFrameId = requestAnimationFrame(draw);
    };
    draw();

    // Audio setup
    const initAudio = () => {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }
    };

    // Pentatonic scale
    const scale = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25, 783.99, 880.00, 1046.50];
    const colors = ['#14b8a6', '#0ea5e9', '#8b5cf6', '#ec4899', '#f43f5e', '#f59e0b', '#10b981'];

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.repeat) return; // Ignore held down keys
      initAudio();

      // Visuals
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: 10,
        life: 1,
        color: colors[e.keyCode % colors.length]
      });

      // Audio
      if (audioCtxRef.current) {
        const osc = audioCtxRef.current.createOscillator();
        const gain = audioCtxRef.current.createGain();
        
        osc.type = 'sine';
        osc.frequency.value = scale[e.keyCode % scale.length];
        
        osc.connect(gain);
        gain.connect(audioCtxRef.current.destination);
        
        const now = audioCtxRef.current.currentTime;
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.3, now + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 2);
        
        osc.start(now);
        osc.stop(now + 2);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('keydown', handleKeyDown);
      cancelAnimationFrame(animationFrameId);
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-stone-900 overflow-hidden no-invert">
      <div className="absolute top-4 left-4 z-50">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white/80 hover:text-white hover:bg-white/20 shadow-sm transition-all"
        >
          <ChevronLeft size={18} />
          返回
        </button>
      </div>
      
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10">
        <Music className="text-white/5 mb-8" size={120} />
        <h2 className="text-4xl font-serif font-bold text-white/20 tracking-widest mb-4">键盘八音盒</h2>
        <p className="text-white/20 tracking-widest">随意敲击键盘，聆听你的专属禅意</p>
      </div>

      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
    </div>
  );
}

function WordChainGame({ onBack }: { onBack: () => void }) {
  const [currentWord, setCurrentWord] = useState('灵感');
  const [inputValue, setInputValue] = useState('');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [gameActive, setGameActive] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [errorShake, setErrorShake] = useState(false);
  const [usedWords, setUsedWords] = useState<string[]>([]);
  const [duplicateWarnings, setDuplicateWarnings] = useState(0);
  const [warningMessage, setWarningMessage] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const maxTime = Math.max(2, 10 - score * 0.5);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (gameActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 0.1) {
            setGameActive(false);
            setGameOver(true);
            return 0;
          }
          return prev - 0.1;
        });
      }, 100);
    }
    return () => clearInterval(timer);
  }, [gameActive, timeLeft]);

  useEffect(() => {
    if (score > highScore) setHighScore(score);
  }, [score, highScore]);

  const startGame = () => {
    const starters = ['灵感', '世界', '故事', '宇宙', '时间', '生命', '未来', '幻想'];
    const starter = starters[Math.floor(Math.random() * starters.length)];
    setCurrentWord(starter);
    setUsedWords([starter]);
    setDuplicateWarnings(0);
    setWarningMessage('');
    setScore(0);
    setTimeLeft(10);
    setGameOver(false);
    setGameActive(true);
    setInputValue('');
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!gameActive) return;

    const trimmed = inputValue.trim();
    if (trimmed.length < 2) {
      triggerError('词语太短啦！');
      return;
    }

    const lastChar = currentWord.charAt(currentWord.length - 1);
    const firstChar = trimmed.charAt(0);

    if (firstChar !== lastChar) {
      triggerError('首字不匹配！');
      return;
    }

    if (usedWords.includes(trimmed)) {
      const newWarnings = duplicateWarnings + 1;
      setDuplicateWarnings(newWarnings);
      if (newWarnings >= 3) {
        setGameActive(false);
        setGameOver(true);
      } else {
        triggerError(`"${trimmed}" 已经用过啦！警告 ${newWarnings}/3`);
      }
      return;
    }

    setCurrentWord(trimmed);
    setUsedWords(prev => [...prev, trimmed]);
    setScore(s => s + 1);
    setInputValue('');
    setWarningMessage('');
    setTimeLeft(Math.max(2, 10 - (score + 1) * 0.5));
  };

  const triggerError = (msg: string) => {
    setWarningMessage(msg);
    setErrorShake(true);
    setTimeout(() => setErrorShake(false), 500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-stone-50 overflow-hidden">
      <div className="absolute top-4 left-4 z-50">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm border border-stone-200 rounded-full text-stone-600 hover:text-stone-900 shadow-sm transition-all"
        >
          <ChevronLeft size={18} />
          返回
        </button>
      </div>
      
      <div className="flex-1 p-6 md:p-12 flex flex-col items-center justify-center">
        <div className="max-w-4xl w-full flex flex-col lg:flex-row gap-8 items-start justify-center">
          
          {/* Main Game Area */}
          <div className="flex-1 w-full max-w-2xl flex flex-col items-center gap-8">
            <div className="text-center">
              <h2 className="text-3xl font-serif font-bold text-stone-900 flex items-center justify-center mb-2">
                <Flame className="mr-3 text-red-500" size={32} />
                词汇接龙生存战
              </h2>
              <p className="text-stone-500">输入以中心词最后一个字开头的词语，生存下去！</p>
            </div>

            <div className="flex gap-8 w-full justify-center">
              <div className="bg-white px-6 py-3 rounded-2xl border border-stone-200 shadow-sm text-center min-w-[120px]">
                <p className="text-xs text-stone-400 font-bold tracking-widest uppercase mb-1">连击</p>
                <p className="text-3xl font-bold text-red-500">{score}</p>
              </div>
              <div className="bg-white px-6 py-3 rounded-2xl border border-stone-200 shadow-sm text-center min-w-[120px]">
                <p className="text-xs text-stone-400 font-bold tracking-widest uppercase mb-1">最高</p>
                <p className="text-3xl font-bold text-stone-700">{highScore}</p>
              </div>
            </div>

            <div className="w-full bg-white rounded-3xl border-2 border-stone-200 p-10 shadow-xl relative overflow-hidden">
              {/* Progress Bar Background */}
              <div 
                className="absolute bottom-0 left-0 h-2 bg-red-500 transition-all duration-100 ease-linear"
                style={{ width: `${(timeLeft / maxTime) * 100}%` }}
              />

              {!gameActive && !gameOver ? (
                <div className="text-center py-10">
                  <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Flame size={40} />
                  </div>
                  <h3 className="text-2xl font-bold text-stone-900 mb-4">准备好挑战词汇量了吗？</h3>
                  <button
                    onClick={startGame}
                    className="px-8 py-4 bg-red-500 hover:bg-red-600 text-white rounded-2xl font-bold text-lg transition-all shadow-lg hover:shadow-red-500/30 active:scale-95"
                  >
                    开始生存战
                  </button>
                </div>
              ) : gameOver ? (
                <div className="text-center py-10">
                  <h3 className="text-3xl font-bold text-stone-900 mb-2">
                    {duplicateWarnings >= 3 ? '重复太多次啦！' : '时间到！'}
                  </h3>
                  <p className="text-stone-500 mb-8">你达成了 <span className="font-bold text-red-500 text-xl">{score}</span> 连击</p>
                  <button
                    onClick={startGame}
                    className="px-8 py-4 bg-red-500 hover:bg-red-600 text-white rounded-2xl font-bold text-lg transition-all shadow-lg hover:shadow-red-500/30 active:scale-95"
                  >
                    再来一次
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-10">
                  <div className="text-6xl font-serif font-bold text-stone-900 tracking-widest">
                    {currentWord}
                  </div>
                  
                  <div className="w-full max-w-sm relative flex flex-col items-center">
                    <form onSubmit={handleSubmit} className="w-full relative">
                      <input
                        ref={inputRef}
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder={`输入以"${currentWord.charAt(currentWord.length - 1)}"开头的词...`}
                        className={cn(
                          "w-full px-6 py-4 text-xl text-center border-2 rounded-2xl outline-none transition-all",
                          errorShake ? "border-red-500 bg-red-50" : "bg-stone-50 border-stone-200 focus:border-red-400 focus:bg-white"
                        )}
                        autoFocus
                      />
                      <button 
                        type="submit"
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-red-100 text-red-600 rounded-xl flex items-center justify-center hover:bg-red-200 transition-colors"
                      >
                        <Send size={18} />
                      </button>
                    </form>
                    
                    {/* Warning Message */}
                    <div className={cn(
                      "absolute -bottom-8 text-sm font-bold transition-opacity",
                      warningMessage ? "opacity-100 text-red-500" : "opacity-0"
                    )}>
                      {warningMessage}
                    </div>
                  </div>
                  
                  <div className="text-4xl font-mono font-bold text-stone-300">
                    {timeLeft.toFixed(1)}s
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Used Words Sidebar */}
          {(gameActive || gameOver) && (
            <div className="w-full lg:w-64 bg-white border border-stone-200 rounded-3xl p-6 shadow-sm h-[400px] flex flex-col">
              <h3 className="text-sm font-bold text-stone-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <RotateCcw size={14} />
                已用词语 ({usedWords.length})
              </h3>
              <div className="flex-1 overflow-y-auto pr-2 space-y-2">
                {usedWords.map((word, idx) => (
                  <div key={idx} className="text-stone-600 bg-stone-50 px-3 py-2 rounded-lg text-sm border border-stone-100">
                    {word}
                  </div>
                ))}
                {usedWords.length === 0 && (
                  <div className="text-stone-400 text-sm text-center py-4">
                    暂无记录
                  </div>
                )}
              </div>
              <div className="mt-4 pt-4 border-t border-stone-100">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-stone-500">重复警告</span>
                  <div className="flex gap-1">
                    {[0, 1, 2].map(i => (
                      <div 
                        key={i} 
                        className={cn(
                          "w-3 h-3 rounded-full",
                          i < duplicateWarnings ? "bg-red-500" : "bg-stone-200"
                        )}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
