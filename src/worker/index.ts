/// <reference lib="webworker" />

// eslint-disable-next-line no-undef
export declare const self: ServiceWorkerGlobalScope

importScripts('https://cdn.flarelane.com/ServiceWorker.js')

self.addEventListener('install', (e) => {
  console.log('👀 - install', e)
  e.waitUntil(self.skipWaiting())
})

self.addEventListener('activate', (e) => {
  console.log('👀 - activate', e)
})

self.addEventListener('push', (e) => {
  if (!e.data) return

  const msg = e.data.json()
  console.log('👀 - pushMessage', msg)
  if (msg.isFlareLane) return

  const showingNotification = self.registration.showNotification(msg.title, {
    body: msg.body,
    icon: msg.icon,
    data: msg.data.url,
  })

  e.waitUntil(showingNotification)
})

self.addEventListener('notificationclick', (e) => {
  self.clients.openWindow(e.notification.data)
})

// listen to message event from window
self.addEventListener('message', (e) => {
  // HOW TO TEST THIS?
  // Run this in your browser console:
  //     window.navigator.serviceWorker.controller.postMessage({command: 'log', message: 'hello world'})
  // OR use next-pwa injected workbox object
  //     window.workbox.messageSW({command: 'log', message: 'hello world'})
  console.log(e.data)
})
