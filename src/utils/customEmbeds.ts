import { Game } from '../types/game';
import { safeStorage } from './storage';
import { CURATED_PRESET_EMBEDS } from '../data/customEmbedPresets';

const CUSTOM_GAMES_KEY = 'nova_arcade_custom_games';
const DELETED_GAMES_KEY = 'nova_arcade_deleted_custom_games';
const BACKUP_SNAPSHOT_KEY = 'nova_arcade_backup_snapshot';

export const customEmbedManager = {
  getCustomGames(): Game[] {
    try {
      const saved = safeStorage.getItem(CUSTOM_GAMES_KEY);
      const parsed = saved ? JSON.parse(saved) : null;
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  },

  saveCustomGames(games: Game[]): void {
    if (Array.isArray(games)) {
      safeStorage.setItem(CUSTOM_GAMES_KEY, JSON.stringify(games));
    }
  },

  archiveDeletedGame(game: Game): void {
    try {
      const archived = this.getArchivedDeletedGames();
      const filtered = archived.filter((g) => g && g.id !== game.id);
      safeStorage.setItem(DELETED_GAMES_KEY, JSON.stringify([game, ...filtered]));
    } catch (e) {
      console.warn('Failed to archive deleted game:', e);
    }
  },

  getArchivedDeletedGames(): Game[] {
    try {
      const saved = safeStorage.getItem(DELETED_GAMES_KEY);
      const parsed = saved ? JSON.parse(saved) : null;
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  },

  getRecoverableBackupGames(): Game[] {
    try {
      const saved = safeStorage.getItem(BACKUP_SNAPSHOT_KEY);
      const parsed = saved ? JSON.parse(saved) : null;
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  },

  recordClearedSafetyBackup(games: Game[]): void {
    if (games.length > 0) {
      safeStorage.setItem(BACKUP_SNAPSHOT_KEY, JSON.stringify(games));
    }
  },

  restoreDefaultPresets(currentGames: Game[]): { updated: Game[]; addedCount: number } {
    const existingIds = new Set(currentGames.map((g) => g.id));
    const toAdd = CURATED_PRESET_EMBEDS.filter((g) => !existingIds.has(g.id));
    const updated = [...toAdd, ...currentGames];
    this.saveCustomGames(updated);
    return { updated, addedCount: toAdd.length };
  },

  exportToJson(games: Game[]): string {
    return JSON.stringify(games, null, 2);
  },

  importFromJson(jsonStr: string, currentGames: Game[] = []): { success: boolean; addedCount: number; error?: string } {
    try {
      const parsed = JSON.parse(jsonStr);
      if (!Array.isArray(parsed)) {
        return { success: false, addedCount: 0, error: 'Imported content must be a JSON array.' };
      }
      const validGames = parsed.filter((g) => g && g.id && g.title) as Game[];
      if (validGames.length === 0) {
        return { success: false, addedCount: 0, error: 'No valid game records found in JSON.' };
      }
      const existingIds = new Set(currentGames.map((g) => g.id));
      const newGames = validGames.filter((g) => !existingIds.has(g.id));
      const merged = [...newGames, ...currentGames];
      this.saveCustomGames(merged);
      return { success: true, addedCount: newGames.length };
    } catch (e: any) {
      return { success: false, addedCount: 0, error: e?.message || 'Invalid JSON format.' };
    }
  }
};
