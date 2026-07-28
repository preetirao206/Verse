self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then((clientList) => {
      for (const client of clientList) {
        if ('focus' in client) return client.focus();
      }
      if (clients.openWindow) return clients.openWindow('./index.html');
    })
  );
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SHOW_VERSE') {
    const { title, body, tag } = event.data;
    self.registration.showNotification(title, {
      body: body,
      tag: tag,
      icon: 'icon.png',
      badge: 'icon.png',
      requireInteraction: true,
      vibrate: [200, 100, 200]
    });
  }
});
