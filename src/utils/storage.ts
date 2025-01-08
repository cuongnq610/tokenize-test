export class StoragePersist {
  static save(key: string, value: unknown) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  static get<ReturnType extends object>(key: string): Nullable<ReturnType> {
    try {
      const data = localStorage.getItem(key);

      if (data) {
        return JSON.parse(data) as ReturnType;
      }

      return null;
    } catch {
      return null;
    }
  }
}
