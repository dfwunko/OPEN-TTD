/**
 * Resolves relative asset URLs reliably for GitHub Pages or subpath deployments
 */
export function resolveAssetUrl(path: string): string {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path;
  }
  
  // Strip leading dot or slash
  const cleanPath = path.replace(/^\.?\//, '');
  
  // Resolve base path from window location if in GitHub Pages subpath environment
  return `${import.meta.env.BASE_URL || '/'}${cleanPath}`.replace(/\/+/g, '/');
}
