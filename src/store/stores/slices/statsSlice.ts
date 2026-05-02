import { StateCreator } from 'zustand';
import { StoreState, StatsSlice } from '../../types';

export const createStatsSlice: StateCreator<StoreState, [], [], StatsSlice> = (set) => ({
  updateDailyWordCount: (sceneId, newWordCount) => set((state) => {
    const today = new Date().toISOString().split('T')[0];
    const dailyStats = state.dailyWordCounts[today] || { grossAdded: 0, netChange: 0, totalWords: 0, sceneCounts: {} };
    const oldCount = dailyStats.sceneCounts[sceneId] || 0;
    const diff = newWordCount - oldCount;
    
    // Calculate totalWords by summing all scene counts
    const newSceneCounts = { ...dailyStats.sceneCounts, [sceneId]: newWordCount };
    const totalWords = Object.values(newSceneCounts).reduce((sum, count) => sum + count, 0);
    
    // Get yesterday's total to calculate netChange
    const yesterday = new Date(new Date().setDate(new Date().getDate() - 1)).toISOString().split('T')[0];
    const yesterdayTotal = state.dailyWordCounts[yesterday]?.totalWords || 0;

    return {
      dailyWordCounts: {
        ...state.dailyWordCounts,
        [today]: {
          ...dailyStats,
          grossAdded: dailyStats.grossAdded + Math.max(0, diff),
          netChange: totalWords - yesterdayTotal,
          totalWords: totalWords,
          sceneCounts: newSceneCounts
        }
      }
    };
  }),
  removeSceneFromDailyCount: (sceneId) => set((state) => {
    const today = new Date().toISOString().split('T')[0];
    const dailyStats = state.dailyWordCounts[today];
    if (!dailyStats || !(sceneId in dailyStats.sceneCounts)) return state;

    const oldCount = dailyStats.sceneCounts[sceneId];
    const newSceneCounts = { ...dailyStats.sceneCounts };
    delete newSceneCounts[sceneId];
    
    const totalWords = Object.values(newSceneCounts).reduce((sum, count) => sum + count, 0);
    const yesterday = new Date(new Date().setDate(new Date().getDate() - 1)).toISOString().split('T')[0];
    const yesterdayTotal = state.dailyWordCounts[yesterday]?.totalWords || 0;

    return {
      dailyWordCounts: {
        ...state.dailyWordCounts,
        [today]: {
          ...dailyStats,
          netChange: totalWords - yesterdayTotal,
          totalWords: totalWords,
          sceneCounts: newSceneCounts
        }
      }
    };
  }),
  resetDailyWordCount: (date) => set((state) => {
    const dailyStats = state.dailyWordCounts[date];
    if (!dailyStats) return state;

    return {
      dailyWordCounts: {
        ...state.dailyWordCounts,
        [date]: {
          ...dailyStats,
          grossAdded: 0,
          netChange: 0,
          totalWords: 0,
          sceneCounts: {}
        }
      }
    };
  }),
  updateDailyWordCountManual: (date, grossAdded, netChange, totalWords) => set((state) => {
    const dailyStats = state.dailyWordCounts[date] || { grossAdded: 0, netChange: 0, totalWords: 0, sceneCounts: {} };
    return {
      dailyWordCounts: {
        ...state.dailyWordCounts,
        [date]: {
          ...dailyStats,
          grossAdded,
          netChange,
          totalWords
        }
      }
    };
  }),
});
