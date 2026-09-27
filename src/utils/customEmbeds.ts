import { Game } from '../types/game';
import { safeStorage } from './storage';
import { DEFAULT_CUSTOM_EMBED_PRESETS } from '../data/customEmbedPresets';

const STORAGE_CUSTOM_KEY = 'nova_arcade_custom_games';
const STORAGE_BACKUP_KEY = 'nova_arcade_custom_games_backup';
const STORAGE_ARCHIVE_KEY = 'nova_arcade_deleted_embeds_archive';
const STORAGE_LAST_CLEARED_KEY = 'nova_arcade_last_cleared_backup';

export const customEmbedManager = {
  // Get active custom games from storage
  getCustomGames: (): Game[] => {
    try {
      const raw = safeStorage.getItem(STORAGE_CUSTOM_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  },

  // Save active custom games and automatically update backup snapshot
  saveCustomGames: (games: Game[]): void => {
    safeStorage.setItem(STORAGE_CUSTOM_KEY, JSON.stringify(games));
    if (games.length > 0) {
      safeStorage.setItem(STORAGE_BACKUP_KEY, JSON.stringify(games));
    }
  },

  // Archive a deleted custom game so it can be restored anytime
  archiveDeletedGame: (game: Game): void => {
    try {
      const raw = safeStorage.getItem(STORAGE_ARCHIVE_KEY);
      const list: Game[] = raw ? JSON.parse(raw) : [];
      // Avoid exact duplicates in archive
      const filtered = list.filter((g) => g.id !== game.id);
      filtered.unshift(game);
      safeStorage.setItem(STORAGE_ARCHIVE_KEY, JSON.stringify(filtered.slice(0, 30)));
    } catch (e) {
      console.warn('Failed to archive deleted game:', e);
    }
  },

  // Get list of archived deleted custom games
  getArchivedDeletedGames: (): Game[] => {
    try {
      const raw = safeStorage.getItem(STORAGE_ARCHIVE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  },

  // Clear archive
  clearArchive: (): void => {
    safeStorage.removeItem(STORAGE_ARCHIVE_KEY);
  },

  // Record a safety snapshot when clearing all data
  recordClearedSafetyBackup: (clearedGames: Game[]): void => {
    if (clearedGames && clearedGames.length > 0) {
      safeStorage.setItem(STORAGE_LAST_CLEARED_KEY, JSON.stringify(clearedGames));
      // Also preserve in general backup
      safeStorage.setItem(STORAGE_BACKUP_KEY, JSON.stringify(clearedGames));
    }
  },

  // Get any available safety backups (last cleared or last known snapshot)
  getRecoverableBackupGames: (): Game[] => {
    try {
      const rawCleared = safeStorage.getItem(STORAGE_LAST_CLEARED_KEY);
      if (rawCleared) {
        const parsed = JSON.parse(rawCleared);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }

      const rawBackup = safeStorage.getItem(STORAGE_BACKUP_KEY);
      if (rawBackup) {
        const parsed = JSON.parse(rawBackup);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // ignore
    }
    return [];
  },

  // Restore curated preset embeds (merging without duplicates)
  restoreDefaultPresets: (currentGames: Game[]): { updated: Game[]; addedCount: number } => {
    const existingIds = new Set(currentGames.map((g) => g.id));
    const toAdd = DEFAULT_CUSTOM_EMBED_PRESETS.filter((p) => !existingIds.has(p.id));
    const updated = [...toAdd, ...currentGames];
    customEmbedManager.saveCustomGames(updated);
    return { updated, addedCount: toAdd.length };
  },

  // Export custom games as formatted JSON string
  exportToJson: (games: Game[]): string => {
    const exportData = {
      app: 'Nova Arcade',
      version: '1.0',
      exportedAt: new Date().toISOString(),
      customGames: games
    };
    return JSON.stringify(exportData, null, 2);
  },

  // Import custom games from JSON string
  importFromJson: (
    jsonStr: string,
    currentGames: Game[]
  ): { success: boolean; games: Game[]; addedCount: number; error?: string } => {
    try {
      const parsed = JSON.parse(jsonStr.trim());
      let candidateList: Game[] = [];

      if (Array.isArray(parsed)) {
        candidateList = parsed;
      } else if (parsed && Array.isArray(parsed.customGames)) {
        candidateList = parsed.customGames;
      } else if (parsed && typeof parsed.title === 'string' && (parsed.src || parsed.customHtml)) {
        candidateList = [parsed];
      } else {
        return { success: false, games: currentGames, addedCount: 0, error: 'Invalid JSON format: no games found.' };
      }

      const validList: Game[] = [];
      const currentIds = new Set(currentGames.map((g) => g.id));

      for (const item of candidateList) {
        if (!item || !item.title) continue;
        const validGame: Game = {
          id: item.id && !currentIds.has(item.id) ? item.id : `custom_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
          title: String(item.title).trim(),
          category: item.category || 'arcade',
          description: item.description || 'Imported custom embed.',
          longDescription: item.longDescription || 'Imported custom game running in unblocked sandbox iframe.',
          src: item.src || '',
          customHtml: item.customHtml || undefined,
          isCustom: true,
          aspectRatio: item.aspectRatio || '16/9',
          controls: Array.isArray(item.controls) ? item.controls : [{ key: 'Controls', action: 'Standard' }],
          instructions: Array.isArray(item.instructions) ? item.instructions : ['Play within the sandbox.'],
          tips: Array.isArray(item.tips) ? item.tips : [],
          plays: typeof item.plays === 'number' ? item.plays : 1,
          rating: typeof item.rating === 'number' ? item.rating : 5.0,
          ratingCount: typeof item.ratingCount === 'number' ? item.ratingCount : 1,
          badge: item.badge || 'Imported',
          iconName: item.iconName || 'Code2',
          accentColor: item.accentColor || '#38bdf8',
          releaseYear: item.releaseYear || new Date().getFullYear(),
          thumbnailUrl: item.thumbnailUrl
        };
        validList.push(validGame);
        currentIds.add(validGame.id);
      }

      if (validList.length === 0) {
        return { success: false, games: currentGames, addedCount: 0, error: 'No valid custom games could be extracted.' };
      }

      const merged = [...validList, ...currentGames];
      customEmbedManager.saveCustomGames(merged);
      return { success: true, games: merged, addedCount: validList.length };
    } catch (err: any) {
      return { success: false, games: currentGames, addedCount: 0, error: err?.message || 'Failed to parse JSON string.' };
    }
  }
};
