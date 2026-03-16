// Service Worker - 离线缓存

const CACHE_NAME = 'xiaoan-recipes-v2';  // 每次更新代码时递增版本号
const urlsToCache = [
  './',
  './index.html',
  './recipe.html',
  './css/style.css',
  './js/app.js',
  './js/recipe.js',
  './data/recipes.js',
  './manifest.json'
];

// 安装 - 缓存资源
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache opened:', CACHE_NAME);
        return cache.addAll(urlsToCache);
      })
      .catch(err => console.log('Cache failed:', err))
  );
  self.skipWaiting();
});

// 激活 - 清理旧缓存并通知客户端
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      // 通知所有客户端有新的版本
      return self.clients.claim().then(() => {
        return self.clients.matchAll().then(clients => {
          clients.forEach(client => {
            client.postMessage({ type: 'UPDATE_AVAILABLE' });
          });
        });
      });
    })
  );
});

// 拦截请求 - 网络优先，缓存备用
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request)
      .then(response => {
        // 网络请求成功，更新缓存
        if (response && response.status === 200 && response.type === 'basic') {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseToCache);
          });
        }
        return response;
      })
      .catch(() => {
        // 网络失败，回退到缓存
        return caches.match(event.request);
      })
  );
});