class BrowserCache {
  static getItem = (key: string) => {
    return localStorage.getItem(key);
  };

  static setItem = (key: string, value: string) => {
    localStorage.setItem(key, value);
  };

  static removeItem = (key: string) => {
    localStorage.removeItem(key);
  };
}

const USER_ID_KEY = "userId";

export { BrowserCache, USER_ID_KEY };
