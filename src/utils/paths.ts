/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Resolves any asset, image, or game pathway to work seamlessly across:
 * - Local development (http://localhost:3000/)
 * - AI Studio preview & production containers
 * - GitHub Pages subpath repositories (https://<user>.github.io/<repo>/)
 * - Custom domain roots
 */
export function resolveAssetUrl(path?: string): string {
  if (!path) return '';

  // Return data URIs, blob URIs, or absolute external HTTP(S) URLs as-is
  if (/^(https?:)?\/\/|^data:|^blob:/i.test(path)) {
    return path;
  }

  if (typeof window !== 'undefined' && window.location) {
    try {
      // If path has a leading slash (e.g. "/images/xyz.jpg"), convert it to relative
      // so it respects subfolder repositories on GitHub Pages
      const normalized = path.startsWith('/') ? path.slice(1) : path;
      return new URL(normalized, window.location.href).href;
    } catch {
      // fallback to original path if URL constructor fails
    }
  }

  return path;
}
