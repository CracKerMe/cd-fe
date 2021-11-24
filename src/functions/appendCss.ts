export default function appendCss(...urls: string[]): Promise<string[]> {
  return Promise.all<string>(urls.map((url) => new Promise((resolve, reject) => {
    const parent = document.head || document.body || document.documentElement;
    if (parent.querySelector(`link[href*="${url}"]`)) {
      resolve(url);
      return;
    }
    const link = document.createElement('link');
    const loadend = () => {
      link.onerror = null;
      link.onload = null;
    };
    link.onerror = () => {
      loadend();
      reject(new Error(`加载样式失败: ${url}`));
    };
    link.onload = () => {
      loadend();
      resolve(url);
    };
    link.href = url;
    link.rel = 'stylesheet';
    parent.appendChild(link);
  })));
}
