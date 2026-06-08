/**
 * Resolves the full URL of an image given its key and a base storage URL.
 * If the key is already a full HTTP URL (e.g. from OAuth providers), it returns it as is.
 *
 * @param key The image key stored in the database.
 * @param baseUrl The base URL of the object storage CDN.
 * @returns The fully resolvable URL of the image, or undefined if no key is provided.
 */
export function getImageUrl(key?: string | null, baseUrl?: string): string | undefined {
  if (!key) return undefined;
  
  if (key.startsWith('http://') || key.startsWith('https://')) {
    return key;
  }
  
  if (!baseUrl) {
    // Fallback if the config hasn't loaded yet, though ideally it should wait.
    return undefined;
  }

  // Remove trailing slashes from baseUrl if any
  const cleanBaseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
  
  return `${cleanBaseUrl}/${key}`;
}
