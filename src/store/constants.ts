import { v4 as uuidv4 } from 'uuid';
import { State } from './types';

export const SCENE_STATUS_COLORS: Record<string, { bg: string; border: string; text: string; dot: string; label: string }> = {
  none: { bg: 'bg-white', border: 'border-stone-200', text: 'text-stone-900', dot: 'bg-stone-200', label: 'Draft' },
  yellow: { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', dot: 'bg-amber-500', label: 'First Draft' },
  green: { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', dot: 'bg-emerald-500', label: 'Finished' },
  blue: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700', dot: 'bg-blue-500', label: 'Revised' },
  red: { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700', dot: 'bg-red-500', label: 'Discarded' },
};

const initialWorkId = uuidv4();
const initialChapterId = uuidv4();
const chapter2Id = uuidv4();
const initialSceneId = uuidv4();
const scene2Id = uuidv4();
const scene3Id = uuidv4();
const initialCharId = uuidv4();
const char2Id = uuidv4();
const char3Id = uuidv4();
const loc1Id = uuidv4();
const loc2Id = uuidv4();
const event1Id = uuidv4();
const event2Id = uuidv4();
const initialBlockId1 = uuidv4();
const initialBlockId2 = uuidv4();

export const initialState: State = {
  works: [
    { id: initialWorkId, title: '沉默的回声', createdAt: Date.now(), order: 0 }
  ],
  characters: [
    { id: initialCharId, workId: initialWorkId, name: '埃利亚斯·索恩 (Elias Thorne)', description: '一位有着困扰过去的侦探。', order: 0 },
    { id: char2Id, workId: initialWorkId, name: '莎拉·万斯 (Sarah Vance)', description: '一位调查记者。', order: 1 },
    { id: char3Id, workId: initialWorkId, name: '马库斯·维恩 (Marcus Vane)', description: '神秘的古董商，可能与案件有关。', order: 2 }
  ],
  locations: [
    { id: loc1Id, workId: initialWorkId, name: '新维里迪亚警察局', description: '阴暗、繁忙的执法中心。', order: 0 },
    { id: loc2Id, workId: initialWorkId, name: '维恩的古董店', description: '堆满了来自旧世界的遗物。', order: 1 }
  ],
  tags: [
    { id: uuidv4(), workId: initialWorkId, name: '关键线索', color: '#ef4444' },
    { id: uuidv4(), workId: initialWorkId, name: '伏笔', color: '#3b82f6' }
  ],
  timelineEvents: [
    { id: event1Id, workId: initialWorkId, title: '发现尸体', timestamp: '2026-04-10 23:00', locationId: loc1Id, description: '在雨夜的巷子里发现了受害者。', characterActions: { [initialCharId]: '到达现场并开始调查。' }, order: 0, importance: 5 },
    { id: event2Id, workId: initialWorkId, title: '第一次审讯', timestamp: '2026-04-11 10:00', locationId: loc1Id, description: '埃利亚斯审问了目击者。', characterActions: { [initialCharId]: '进行审问。', [char2Id]: '在外面偷听。' }, order: 1, importance: 3 }
  ],
  chapters: [
    { id: initialChapterId, workId: initialWorkId, title: '第一章：觉醒', order: 0 },
    { id: chapter2Id, workId: initialWorkId, title: '第二章：阴影', order: 1 }
  ],
  scenes: [
    { id: initialSceneId, chapterId: initialChapterId, title: '场景 1：犯罪现场', order: 0, characterIds: [initialCharId], statusColor: 'yellow' },
    { id: scene2Id, chapterId: initialChapterId, title: '场景 2：审讯室', order: 1, characterIds: [initialCharId, char2Id], statusColor: 'none' },
    { id: scene3Id, chapterId: chapter2Id, title: '场景 1：古董店的秘密', order: 0, characterIds: [initialCharId, char3Id], statusColor: 'none' }
  ],
  blocks: [
    { id: initialBlockId1, documentId: initialSceneId, type: 'text', content: '雨无情地倾泻在新维里迪亚霓虹闪烁的街道上。埃利亚斯站在尸体旁，大衣被雨水浸透，沉甸甸的。', order: 0 },
    { id: initialBlockId2, documentId: initialSceneId, type: 'text', isLens: true, lensColor: 'red', content: '受害者左手紧紧握着一个小巧的银色吊坠。上面刻着旧政权的徽章。', order: 1, notes: '关键证据。与市长有关。', linkedLensIds: [] },
    { id: uuidv4(), documentId: initialSceneId, type: 'text', content: '他叹了口气，知道这个案子将不同寻常。', order: 2 },
    { id: uuidv4(), documentId: scene2Id, type: 'text', content: '审讯室里的灯光刺眼。埃利亚斯盯着桌子对面的男人。', order: 0 },
    { id: uuidv4(), documentId: scene3Id, type: 'text', content: '维恩的古董店里弥漫着陈旧纸张和金属的味道。', order: 0 },
    { id: uuidv4(), documentId: scene3Id, type: 'text', isLens: true, lensColor: 'blue', content: '在柜台后面的阴影里，一个形状奇特的箱子引起了他的注意。', order: 1, notes: '这可能就是我们要找的东西。', linkedLensIds: [initialBlockId2] }
  ],
  deadlines: [
    { id: uuidv4(), workId: initialWorkId, title: '初稿完成', date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], completed: false },
    { id: uuidv4(), workId: initialWorkId, title: '大纲设定', date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], completed: true }
  ],
  notes: [
    { id: uuidv4(), content: '记得给埃利亚斯增加一个经常咳嗽的习惯，暗示他的健康问题。', createdAt: Date.now(), workId: initialWorkId, sceneId: null },
    { id: uuidv4(), content: '吊坠的图案在第三章会再次出现。', createdAt: Date.now() - 3600000, workId: initialWorkId, sceneId: initialSceneId }
  ],
  inboxTags: [
    { id: uuidv4(), name: '灵感', color: '#8b5cf6' },
    { id: uuidv4(), name: '待办', color: '#f59e0b' }
  ],
  snapshots: [],
  metroLines: [
    { id: uuidv4(), workId: initialWorkId, title: '主线剧情', rootNodeId: null, color: '#ef4444' }
  ],
  metroNodes: [],
  scriptDrafts: [],
  dailyWordCounts: {},
  chapterSnapshots: [],
  platformTrackings: [],
  activeWorkId: initialWorkId,
  activeDocumentId: initialSceneId,
  activeTab: 'design',
  appMode: 'design',
  tabConfig: {
    design: [
      { id: 'design', label: 'Writing', visible: true },
      { id: 'timelineEvents', label: 'Timeline Events', visible: true },
      { id: 'metro', label: 'Metro', visible: true },
      { id: 'world', label: 'World', visible: true },
      { id: 'montage', label: 'Montage', visible: true },
      { id: 'script', label: 'Script', visible: true },
      { id: 'inbox', label: 'Notes', visible: false },
      { id: 'blockDescriptions', label: 'Block Descriptions', visible: false },
      { id: 'lenses', label: 'Lenses', visible: false },
      { id: 'deadline', label: 'Deadline', visible: false },
      { id: 'compile', label: 'Compile', visible: false },
      { id: 'dataManagement', label: 'Data Management', visible: false },
      { id: 'publish', label: 'Publishing', visible: false },
    ],
    review: [
      { id: 'design', label: 'Writing', visible: true },
      { id: 'inbox', label: 'Notes', visible: true },
      { id: 'blockDescriptions', label: 'Block Descriptions', visible: true },
      { id: 'lenses', label: 'Lenses', visible: true },
      { id: 'deadline', label: 'Deadline', visible: true },
      { id: 'timelineEvents', label: 'Timeline Events', visible: false },
      { id: 'montage', label: 'Montage', visible: false },
      { id: 'metro', label: 'Metro', visible: false },
      { id: 'world', label: 'World', visible: false },
      { id: 'script', label: 'Script', visible: false },
      { id: 'compile', label: 'Compile', visible: false },
      { id: 'dataManagement', label: 'Data Management', visible: false },
      { id: 'publish', label: 'Publishing', visible: false },
    ],
    management: [
      { id: 'design', label: 'Writing', visible: true },
      { id: 'compile', label: 'Compile', visible: true },
      { id: 'dataManagement', label: 'Data Management', visible: true },
      { id: 'publish', label: 'Publishing', visible: true },
      { id: 'inbox', label: 'Notes', visible: false },
      { id: 'deadline', label: 'Deadline', visible: false },
      { id: 'blockDescriptions', label: 'Block Descriptions', visible: false },
      { id: 'lenses', label: 'Lenses', visible: false },
      { id: 'timelineEvents', label: 'Timeline Events', visible: false },
      { id: 'montage', label: 'Montage', visible: false },
      { id: 'metro', label: 'Metro', visible: false },
      { id: 'world', label: 'World', visible: false },
      { id: 'script', label: 'Script', visible: false },
    ]
  },
  timelineViewMode: 'list',
  deadlineViewMode: 'local',
  activeLensId: null,
  selectedEventId: null,
  fullScreenMode: false,
  focusMode: false,
  scrollMode: false,
  typewriterMode: false,
  disguiseMode: false,
  rightSidebarMode: 'closed',
  lastInspectorTab: 'macro',
  showDescriptions: true,
  letterSpacing: 0,
  editorMargin: 0,
  timelineTableColumns: [],
  supabaseSyncEnabled: false,
  syncStatus: 'idle',
  syncError: null,
  isCheckingCloud: false,
  lastModified: Date.now(),
  lastDevice: 'Desktop',
  disguiseBackgroundText: '2026年度第三季度财务与运营状况分析报告\n\n一、 执行摘要\n本报告旨在全面回顾并分析公司在2026年第三季度的财务表现与核心运营指标。在此期间，尽管面临宏观经济的不确定性及行业内部的激烈竞争，公司依然保持了稳健的增长态势。核心业务板块实现了预期目标，同时在新兴市场的拓展上也取得了突破性进展。\n\n二、 财务概况\n1. 营业收入：Q3实现总营收人民币4.5亿元，同比增长12.5%。\n2. 净利润：归属于母公司股东的净利润为人民币6800万元，同比增长8.2%。\n3. 现金流：经营活动产生的现金流量净额为人民币1.2亿元，现金储备充足，流动性良好。\n\n三、 运营亮点\n- 核心产品线A的市场占有率提升了2.3个百分点，主要得益于本季度推出的重大版本更新。\n- 客户满意度（CSAT）评分达到94分，创历史新高。\n- 供应链优化项目成功落地，整体采购成本降低了4.5%。\n\n四、 风险与挑战\n- 原材料价格波动对毛利率产生了一定压力，需进一步加强成本控制。\n- 部分海外市场的政策合规要求趋严，法务部门正在积极跟进评估。\n\n五、 下季度展望\n展望Q4，我们将继续深化“数字化转型”战略，加大对AI技术在产品中的应用研发投入。预计Q4营收将保持两位数增长，全年业绩目标有望超额完成。',
  darkMode: false,
  labGameState: {
    likes: 0,
    posts: [],
    comments: [],
    commentPool: [
      '太棒了！',
      '期待更新！',
      '写得真好，催更催更！',
      '这个设定很有意思。',
      '支持大大！',
      '很有画面感。',
      '先马住，慢慢看。',
      '很有潜力的一篇。'
    ],
    upgrades: {
      postCount: 1,
      likeRate: 1,
      commentRate: 1,
      commentQuality: 1
    },
    isPaused: false,
    hasWon: false
  }
};
