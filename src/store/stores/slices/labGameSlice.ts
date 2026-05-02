import { StateCreator } from 'zustand';
import { StoreState, LabGameSlice, LabPost, LabComment } from '../../types';
import { v4 as uuidv4 } from 'uuid';

export const createLabGameSlice: StateCreator<StoreState, [], [], LabGameSlice> = (set, get) => ({
  addLabPost: (content) => set((state) => {
    const newPost: LabPost = {
      id: uuidv4(),
      content,
      createdAt: Date.now(),
      likes: 0
    };
    return {
      labGameState: {
        ...state.labGameState,
        posts: [newPost, ...state.labGameState.posts]
      }
    };
  }),

  addLabLike: (amount) => set((state) => {
    const { posts } = state.labGameState;
    let newPosts = [...posts];
    if (newPosts.length > 0) {
      // Add manual likes to the most recent post
      newPosts[0] = { ...newPosts[0], likes: newPosts[0].likes + amount };
    }
    return {
      labGameState: {
        ...state.labGameState,
        likes: state.labGameState.likes + amount,
        posts: newPosts
      }
    };
  }),

  buyLabUpgrade: (type, cost) => set((state) => {
    if (state.labGameState.likes < cost) return state;
    
    let newPool = [...state.labGameState.commentPool];
    
    // Unlock new templates if upgrading quality
    if (type === 'commentQuality') {
      const qualityLevel = (state.labGameState.upgrades.commentQuality || 1) + 1;
      const qualityTemplates: Record<number, string[]> = {
        2: [
          '这章的伏笔埋得太深了，我反复看了三遍才发现端倪，作者大大真是逻辑鬼才！',
          '人物的心理描写非常细腻，那种挣扎和矛盾感扑面而来，代入感极强。',
          '文笔越来越老练了，辞藻华丽而不堆砌，读起来像是在欣赏一幅优美的画卷。'
        ],
        3: [
          '世界观的架构非常宏大且严谨，每一个细节都经得起推敲，这种史诗感在同类作品中非常罕见。',
          '剧情反转得猝不及防，却又在情理之中，这种掌控读者的能力实在是太令人佩服了，请收下我的膝盖！',
          '读完这章，我陷入了长久的思考，作品中探讨的人性与命运的议题非常深刻，已经超越了普通网文的范畴。'
        ],
        4: [
          '这是我近年来读过的最震撼人心的文字，每一个字都像是重锤击打在心口，灵魂都随之颤栗。',
          '作者构建的意象群非常独特，充满了哲学思辨的色彩，这种独特的文学风格注定会让这部作品名垂青史。',
          '不仅仅是故事，更是一种精神的洗礼。在浮躁的时代能读到这样沉静而有力量的作品，是读者的幸运。'
        ]
      };
      
      if (qualityTemplates[qualityLevel]) {
        newPool = [...newPool, ...qualityTemplates[qualityLevel]];
      }
    }

    return {
      labGameState: {
        ...state.labGameState,
        likes: state.labGameState.likes - cost,
        commentPool: newPool,
        upgrades: {
          ...state.labGameState.upgrades,
          [type]: (state.labGameState.upgrades[type] || 1) + 1
        }
      }
    };
  }),

  addLabCommentTemplate: (content) => set((state) => ({
    labGameState: {
      ...state.labGameState,
      commentPool: [...state.labGameState.commentPool, content]
    }
  })),

  updateLabCommentTemplate: (index, content) => set((state) => {
    const newPool = [...state.labGameState.commentPool];
    newPool[index] = content;
    return {
      labGameState: {
        ...state.labGameState,
        commentPool: newPool
      }
    };
  }),

  deleteLabCommentTemplate: (index) => set((state) => ({
    labGameState: {
      ...state.labGameState,
      commentPool: state.labGameState.commentPool.filter((_, i) => i !== index)
    }
  })),

  tickLabGame: () => set((state) => {
    const { posts, upgrades, commentPool, likes, comments, isPaused, hasWon } = state.labGameState;
    if (posts.length === 0 || isPaused || hasWon) return state;

    // Calculate passive likes per post
    const likesPerPost = upgrades.likeRate * 0.1;
    let totalPassiveLikes = 0;
    
    let newPosts = posts.map(post => {
      totalPassiveLikes += likesPerPost;
      return { ...post, likes: post.likes + likesPerPost };
    });
    
    // Random comment
    let newComments = [...comments];
    let extraLikes = 0;
    if (Math.random() < upgrades.commentRate * 0.05) { // 5% base chance per tick
      const randomIndex = Math.floor(Math.random() * newPosts.length);
      const randomPost = newPosts[randomIndex];
      const randomTemplate = commentPool[Math.floor(Math.random() * commentPool.length)];
      
      const newComment: LabComment = {
        id: uuidv4(),
        postId: randomPost.id,
        content: randomTemplate,
        createdAt: Date.now()
      };
      
      newComments = [newComment, ...newComments].slice(0, 50); // Keep last 50
      extraLikes = randomTemplate.length; // 1 char = 1 like
      
      // Add extra likes to that specific post
      newPosts[randomIndex] = { ...randomPost, likes: randomPost.likes + extraLikes };
    }

    const newLikes = likes + totalPassiveLikes + extraLikes;
    const victoryThreshold = 1000000;
    const newlyWon = !hasWon && newLikes >= victoryThreshold;

    return {
      labGameState: {
        ...state.labGameState,
        likes: newLikes,
        posts: newPosts,
        comments: newComments,
        hasWon: newlyWon || hasWon
      }
    };
  }),

  toggleLabPause: () => set((state) => ({
    labGameState: {
      ...state.labGameState,
      isPaused: !state.labGameState.isPaused
    }
  })),

  resetLabGame: () => set((state) => ({
    labGameState: {
      ...state.labGameState,
      likes: 0,
      posts: [],
      comments: [],
      hasWon: false,
      isPaused: false,
      upgrades: {
        postCount: 1,
        likeRate: 1,
        commentRate: 1,
        commentQuality: 1
      }
    }
  }))
});
