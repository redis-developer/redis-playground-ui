interface ICappedCollection {
  [key: string]: {
    limit: number;
    keys: string[];
  };
}

class ApiCacheCls {
  private store: Record<string, any> = {};
  private cappedCollection: ICappedCollection = {};

  getCacheKey(prefixKey: string, suffixArr?: string[]) {
    let retValue = prefixKey;
    if (suffixArr && suffixArr.length > 0) {
      retValue = `${prefixKey}-${suffixArr.join("-")}`;
    }
    return retValue;
  }

  getApiCache(cacheKey: string) {
    let cacheValue = null;
    if (this.store[cacheKey]) {
      cacheValue = this.store[cacheKey];
    }
    return cacheValue;
  }

  setApiCache(cacheKey: string, cacheValue: any) {
    if (cacheKey && cacheValue) {
      this.store[cacheKey] = cacheValue;
    }
  }

  setCappedCollection(collectionName: string, limit: number) {
    this.cappedCollection[collectionName] = {
      limit,
      keys: [],
    };
  }

  setCappedApiCache(collectionName: string, cacheKey: string, cacheValue: any) {
    if (!this.cappedCollection[collectionName]) {
      throw new Error(`Capped collection "${collectionName}" not initialized`);
    }

    const collection = this.cappedCollection[collectionName];

    // add new key to the end
    collection.keys.push(cacheKey);

    // Remove oldest entry if we exceed the limit
    if (collection.keys.length > collection.limit) {
      const oldestKey = collection.keys.shift();
      if (oldestKey) {
        delete this.store[oldestKey];
      }
    }

    // Set the new cache value
    this.setApiCache(cacheKey, cacheValue);
  }
}

const apiCacheInst = new ApiCacheCls();

export { apiCacheInst };
