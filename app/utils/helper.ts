export default function toArray<T>(res: unknown): T[] {
  if (Array.isArray(res)) return res as T[]
  if (res && typeof res === 'object' && 'data' in res && Array.isArray((res as any).data)) {
    return (res as any).data as T[]
  }
  return []
}
