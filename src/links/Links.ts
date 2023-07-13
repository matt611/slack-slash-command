import storage from "../storage/Storage";
import { Link } from "../types/types";

export function getLinkByKey(key: string): string {
  return storage.get(key);
}

export function getAllLinks(): Link[] {
  return storage.getAllKeys().map(key => {
    return {
      key,
      dest: storage.get(key)
    }
  });
}