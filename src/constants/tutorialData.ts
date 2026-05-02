import { TutorialData } from '../types/tutorial';

export const TUTORIAL_DATA: TutorialData = {
  categories: [
    {
      id: 'design',
      name: '写作',
      pages: [
        {
          title: 'Dear Writers',
          what: '这是你的创作核心区域，采用块状化编辑架构，支持多维度的场景管理。',
          why: '传统的长文本编辑器容易让人在海量文字中迷失。块状化设计能让你像搭积木一样构建故事，随时调整结构而不会破坏整体逻辑。',
          how: '在左侧大纲点击“+”创建章节或场景。在编辑器中，每个段落都是一个独立的“块”，你可以通过快捷键或拖拽来管理它们。',
          image: 'https://picsum.photos/seed/writing/800/450',
          actions: [
            { type: 'highlight', target: 'sidebar', text: '查看左侧大纲' }
          ]
        },
        {
          title: '六大视图模式',
          what: '为了适应不同的写作场景和心境，我们精心设计了六种独特的视图模式：专注模式、打字机模式、长文模式、伪装模式、熬夜模式以及求灵感模式。',
          why: '写作不仅是文字的输出，更是情绪和环境的共鸣。无论是需要绝对的安静、沉浸的氛围，还是在公共场合需要保护隐私，不同的模式能为你提供最契合的创作空间。',
          how: '点击编辑器右下角的“视图设置”按钮即可自由切换：\n\n• 专注模式：隐藏所有侧边栏和多余UI，让你与文字独处。\n• 打字机模式：当前输入行始终保持在屏幕中央，视线无需上下移动。\n• 长文模式：打破场景块的视觉边界，以连续的长文本形式阅读和修改整个章节。\n• 伪装模式：将界面伪装成代码编辑器或工作文档，在公共场合保护你的创作隐私（支持自定义伪装内容）。\n• 熬夜模式：为你点燃一堆篝火，在温暖的火光和白噪音中享受深夜的宁静。\n• 求灵感模式：在屏幕上降下一场淅沥的小雨，配合雨声白噪音，让思绪随着雨滴流淌。',
          image: 'https://picsum.photos/seed/modes/800/450',
          actions: [
            { type: 'toggle', target: 'focusMode', text: '体验专注模式' },
            { type: 'toggle', target: 'disguiseMode', text: '体验伪装模式' },
            { type: 'toggle', target: 'lateNightMode', text: '体验熬夜模式' },
            { type: 'toggle', target: 'inspirationMode', text: '体验求灵感模式' }
          ]
        },
        {
          title: '功能目录',
          what: '这是 DearWriters 的功能全景图，你可以从这里跳转到任何模块的详细介绍。',
          why: '为了让你能快速定位到需要的帮助信息，我们建立了这个互动索引。',
          how: '点击下方的按钮，教程将自动切换到对应的功能模块介绍。',
          actions: [
            { type: 'navigate', target: 'blockDescriptions', text: '📝 块描述：高视角的大纲管理' },
            { type: 'navigate', target: 'lenses', text: '🔍 透镜：多维度的故事检视' },
            { type: 'navigate', target: 'montage', text: '🎬 蒙太奇：自由的结构画板' },
            { type: 'navigate', target: 'metro', text: '🚇 故事树：网状叙事的可视化' },
            { type: 'navigate', target: 'world', text: '📚 世界观：管理你的故事背景' },
            { type: 'navigate', target: 'timelineEvents', text: '⏳ 时间线：掌控故事的发展脉络' },
            { type: 'navigate', target: 'deadline', text: '🎯 死线：设定目标与追踪进度' },
            { type: 'navigate', target: 'compile', text: '📄 编译：导出你的最终稿件' },
            { type: 'navigate', target: 'dataManagement', text: '💾 数据管理：备份与恢复' },
            { type: 'navigate', target: 'publish', text: '🚀 发布：分享你的作品' },
            { type: 'navigate', target: 'inbox', text: '💡 灵感笔记：捕捉每一个闪念' },
            { type: 'navigate', target: 'lab', text: '🧪 实验室：放松与灵感刺激' },
            { type: 'open', target: 'shortcuts', text: '⌨️ 快捷键：让你的写作起飞' }
          ]
        }
      ]
    },
    {
      id: 'world',
      name: '世界观',
      pages: [
        {
          title: '实体管理',
          what: '用于记录和管理故事中的地理位置、组织、物品等设定。',
          why: '宏大的故事需要严谨的设定支持。通过实体管理，你可以确保在写作过程中随时查阅设定，避免逻辑冲突。',
          how: '在“世界观”标签页点击“添加实体”。你可以为每个实体添加详细的描述，并将其关联到特定的场景中。',
          image: 'https://picsum.photos/seed/world/800/450'
        },
        {
          title: '角色档案',
          what: '深度定制你的角色，包括基础信息、性格特征和关系网。',
          why: '角色是故事的灵魂。一个立体的角色需要持续的维护和深挖，角色档案能帮你保持人物的一致性。',
          how: '在世界观模块下切换到“角色”子项。你可以自定义角色的属性字段，记录他们的成长轨迹。',
          image: 'https://picsum.photos/seed/character/800/450',
          actions: [
            { type: 'navigate', target: 'directory', text: '返回功能目录' }
          ]
        }
      ]
    },
    {
      id: 'timelineEvents',
      name: '时间线',
      pages: [
        {
          title: '事件追踪',
          what: '以时间轴的形式展现故事的发展脉络。',
          why: '多线叙事或跨度较大的故事极易出现时间线混乱。可视化时间轴能帮你清晰地掌控每个角色的动向。',
          how: '在“时间线”标签页创建事件，设置时间戳和参与角色。你可以切换不同的视图（列表、表格、编年史）来观察故事走向。',
          image: 'https://picsum.photos/seed/timeline/800/450',
          actions: [
            { type: 'navigate', target: 'directory', text: '返回功能目录' }
          ]
        }
      ]
    },
    {
      id: 'inbox',
      name: '笔记',
      pages: [
        {
          title: '灵感捕捉',
          what: '一个快速记录碎片化灵感的收件箱。',
          why: '灵感总是转瞬即逝。笔记功能让你在不中断当前写作流的情况下，快速记下突发奇想。',
          how: '点击右侧边栏的笔记图标或使用快捷键。你可以为笔记添加标签，并在稍后将其转化为正式的剧情块。',
          image: 'https://picsum.photos/seed/notes/800/450',
          actions: [
            { type: 'navigate', target: 'directory', text: '返回功能目录' }
          ]
        }
      ]
    },
    {
      id: 'blockDescriptions',
      name: '块描述',
      pages: [
        {
          title: '块描述管理',
          what: '集中管理和查看所有文本块的摘要和描述信息。',
          why: '当你的作品越来越长，直接在正文中寻找特定情节会变得困难。块描述为你提供了一个高视角的“大纲”，让你能够快速浏览和定位剧情。',
          how: '在这里，你可以看到每个场景下的所有文本块及其对应的描述。你可以直接编辑这些描述，它们会同步更新到写作界面的对应块中。',
          image: 'https://picsum.photos/seed/blocks/800/450',
          actions: [
            { type: 'navigate', target: 'directory', text: '返回功能目录' }
          ]
        }
      ]
    },
    {
      id: 'lenses',
      name: '透镜',
      pages: [
        {
          title: '透镜视图',
          what: '从不同的维度（如角色出场、地点切换、特定物品）来审视你的整个故事。',
          why: '线性写作容易让人忽略全局的元素分布。透镜视图能帮你发现“某个角色是不是消失太久了”或者“场景切换是不是过于频繁”等结构性问题。',
          how: '选择一个透镜（例如“角色”），系统会高亮显示该元素在各个章节和场景中的分布情况。你可以直观地看到故事的节奏和元素的密度。',
          image: 'https://picsum.photos/seed/lenses/800/450',
          actions: [
            { type: 'navigate', target: 'directory', text: '返回功能目录' }
          ]
        }
      ]
    },
    {
      id: 'montage',
      name: '蒙太奇',
      pages: [
        {
          title: '蒙太奇画板',
          what: '一个自由的二维白板，用于视觉化地排列和组合你的场景或灵感。',
          why: '线性的大纲有时不足以表达复杂的网状叙事或多线并行的情节。蒙太奇画板让你能够像贴便签一样，自由地组织和重构故事结构。',
          how: '你可以将场景卡片拖拽到画板上，自由移动、连线或分组。这非常适合在构思初期进行头脑风暴，或者在后期进行大规模的结构调整。',
          image: 'https://picsum.photos/seed/montage/800/450',
          actions: [
            { type: 'navigate', target: 'directory', text: '返回功能目录' }
          ]
        }
      ]
    },
    {
      id: 'metro',
      name: '故事树',
      pages: [
        {
          title: '故事树 (Metro)',
          what: '以地铁线路图的形式，展示故事的多条支线和它们之间的交汇点。',
          why: '对于多线叙事或包含复杂因果关系的故事，传统的树状图往往不够直观。地铁图模式能清晰地展现不同故事线（如不同角色的视角）是如何并行、交叉和分离的。',
          how: '每条“地铁线”代表一条故事线或一个角色的视角，每个“站点”代表一个关键事件或场景。你可以直观地规划和查看复杂的网状叙事结构。',
          image: 'https://picsum.photos/seed/metro/800/450',
          actions: [
            { type: 'navigate', target: 'directory', text: '返回功能目录' }
          ]
        }
      ]
    },
    {
      id: 'deadline',
      name: '死线',
      pages: [
        {
          title: '截稿日与目标',
          what: '设定写作目标、追踪进度并管理你的截稿日期。',
          why: '写作是一场马拉松，明确的目标和进度反馈是保持动力的关键。死线功能帮你将庞大的写作任务拆解为每日可行的小目标。',
          how: '你可以设定总字数目标和期望完成的日期。系统会自动为你计算每日需要完成的字数，并以直观的图表展示你的写作进度和历史记录。',
          image: 'https://picsum.photos/seed/deadline/800/450',
          actions: [
            { type: 'navigate', target: 'directory', text: '返回功能目录' }
          ]
        }
      ]
    },
    {
      id: 'compile',
      name: '编译',
      pages: [
        {
          title: '作品编译',
          what: '将你分散在各个场景和块中的文字，整合成一个完整的、排版精美的文档或长图。',
          why: '块状化写作虽然灵活，但最终交付给读者或分享到社交平台通常需要标准的文档或美观的图片。编译功能帮你一键完成这种转换。',
          how: '在这里，你可以选择要导出的章节，设置导出格式：\n\n• 导出 .docx：生成标准的 Word 文档，适合正式投稿。\n• 生成长图：生成带有精美排版（羊皮纸背景、古典边框）的长图，非常适合分享到微博、小红书等社交平台。\n• 复制文本：快速获取纯文本内容。',
          image: 'https://picsum.photos/seed/compile/800/450',
          actions: [
            { type: 'navigate', target: 'directory', text: '返回功能目录' }
          ]
        }
      ]
    },
    {
      id: 'dataManagement',
      name: '数据管理',
      pages: [
        {
          title: '数据管理与备份',
          what: '管理你的本地数据，包括手动备份、恢复快照以及清理缓存。',
          why: '数据安全是写作的重中之重。虽然系统有自动保存机制，但提供手动的数据管理功能能让你在进行大规模修改前更有安全感。',
          how: '你可以在这里导出整个作品的数据包作为本地备份，或者从之前的备份文件中恢复数据。同时也可以查看当前数据占用的存储空间。',
          image: 'https://picsum.photos/seed/data/800/450',
          actions: [
            { type: 'navigate', target: 'directory', text: '返回功能目录' }
          ]
        }
      ]
    },
    {
      id: 'publish',
      name: '发布',
      pages: [
        {
          title: '作品发布',
          what: '将你的作品直接发布到支持的平台，或生成可分享的在线链接。',
          why: '写作的最终目的是被阅读。发布功能打通了创作与分享的最后一公里，让你能更便捷地将作品展示给读者。',
          how: '配置好你的发布平台账号后，选择要发布的章节，即可一键推送到目标平台。你也可以生成一个只读的分享链接，发给你的试读者或编辑。',
          image: 'https://picsum.photos/seed/publish/800/450',
          actions: [
            { type: 'navigate', target: 'directory', text: '返回功能目录' }
          ]
        }
      ]
    },
    {
      id: 'lab',
      name: '实验室',
      pages: [
        {
          title: '实验室 (Lab)',
          what: '这里是 DearWriters 的实验性功能测试区，包含了一些有趣的小游戏和创意工具。',
          why: '写作是一项需要高度集中注意力的工作，偶尔的放松和灵感刺激同样重要。实验室提供了一些与文字相关的小游戏，帮助你在卡文时转换思维，或者单纯地放松一下。',
          how: '在“实验室”标签页中，你可以体验各种小游戏，例如“点赞模拟器”、“灵感扭蛋机”、“击碎卡文”、“绝不回头”、“键盘八音盒”和“词汇接龙生存战”。点击对应的卡片即可进入全屏游戏模式。',
          image: 'https://picsum.photos/seed/lab/800/450',
          actions: [
            { type: 'navigate', target: 'directory', text: '返回功能目录' }
          ]
        }
      ]
    }
  ]
};
