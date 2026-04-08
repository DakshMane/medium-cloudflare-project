
interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

const cache = new Map<string, CacheEntry<any>>();
const TTL = 5 * 60 * 1000; // 5 minutes

export const cacheGet = <T>(key: string): T | null => {
  const entry = cache.get(key);
  if (!entry) return null;
  if (Date.now() - entry.timestamp > TTL) {
    cache.delete(key);
    return null;
  }
  return entry.data as T;
};

export const cacheSet = <T>(key: string, data: T): void => {
  cache.set(key, { data, timestamp: Date.now() });
};
