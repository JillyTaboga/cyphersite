'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "assets/AssetManifest.json": "99914b932bd37a50b983c5e7c90ae93b",
"assets/FontManifest.json": "7b2a36307916a9721811788013e65289",
"assets/fonts/MaterialIcons-Regular.otf": "95db9098c58fd6db106f1116bae85a0b",
"assets/NOTICES": "9ed9465ed1d97b3215981f9945ab81dc",
"canvaskit/canvaskit.js": "c2b4e5f3d7a3d82aed024e7249a78487",
"canvaskit/canvaskit.wasm": "4b83d89d9fecbea8ca46f2f760c5a9ba",
"canvaskit/profiling/canvaskit.js": "ae2949af4efc61d28a4a80fffa1db900",
"canvaskit/profiling/canvaskit.wasm": "95e736ab31147d1b2c7b25f11d4c32cd",
"cyphersite/.git/COMMIT_EDITMSG": "d778d8b1f42d0dd1bb284e5ca9549187",
"cyphersite/.git/config": "d5dd45003f5d91e90c37d6ddb46e0e3b",
"cyphersite/.git/description": "a0a7c3fff21f2aea3cfa1d0316dd816c",
"cyphersite/.git/FETCH_HEAD": "72620ba81a9d484bbcdfdb4a710b845d",
"cyphersite/.git/HEAD": "cf7dd3ce51958c5f13fece957cc417fb",
"cyphersite/.git/hooks/applypatch-msg.sample": "ce562e08d8098926a3862fc6e7905199",
"cyphersite/.git/hooks/commit-msg.sample": "579a3c1e12a1e74a98169175fb913012",
"cyphersite/.git/hooks/fsmonitor-watchman.sample": "ea587b0fae70333bce92257152996e70",
"cyphersite/.git/hooks/post-update.sample": "2b7ea5cee3c49ff53d41e00785eb974c",
"cyphersite/.git/hooks/pre-applypatch.sample": "054f9ffb8bfe04a599751cc757226dda",
"cyphersite/.git/hooks/pre-commit.sample": "305eadbbcd6f6d2567e033ad12aabbc4",
"cyphersite/.git/hooks/pre-merge-commit.sample": "39cb268e2a85d436b9eb6f47614c3cbc",
"cyphersite/.git/hooks/pre-push.sample": "2c642152299a94e05ea26eae11993b13",
"cyphersite/.git/hooks/pre-rebase.sample": "56e45f2bcbc8226d2b4200f7c46371bf",
"cyphersite/.git/hooks/pre-receive.sample": "2ad18ec82c20af7b5926ed9cea6aeedd",
"cyphersite/.git/hooks/prepare-commit-msg.sample": "2b5c047bdb474555e1787db32b2d2fc5",
"cyphersite/.git/hooks/push-to-checkout.sample": "c7ab00c7784efeadad3ae9b228d4b4db",
"cyphersite/.git/hooks/update.sample": "647ae13c682f7827c22f5fc08a03674e",
"cyphersite/.git/index": "02821279a13e59e88920f1b65390f3e0",
"cyphersite/.git/info/exclude": "036208b4a1ab4a235d75c181e685e5a3",
"cyphersite/.git/logs/HEAD": "cbe67a2752930acdad413e9f7e15e2a3",
"cyphersite/.git/logs/refs/heads/main": "cbe67a2752930acdad413e9f7e15e2a3",
"cyphersite/.git/logs/refs/remotes/origin/main": "24be5967cb817a91e1635e0e34fca943",
"cyphersite/.git/objects/6a/54b697d664fea75f74730701f997f1e74e0270": "fade8bd9601b8e57d768c6ba88902959",
"cyphersite/.git/objects/6f/9509c88bed7080d496fc5e1d87a9315e30549d": "c02716d7aaed30ce1c5697a2fb40d317",
"cyphersite/.git/objects/df/e0770424b2a19faf507a501ebfc23be8f54e7b": "76f8baefc49c326b504db7bf751c967d",
"cyphersite/.git/refs/heads/main": "ec2448a821dea4562f71995ba0169b37",
"cyphersite/.git/refs/remotes/origin/main": "ec2448a821dea4562f71995ba0169b37",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"flutter.js": "0816e65a103ba8ba51b174eeeeb2cb67",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"index.html": "3e1b931a30e14dfe223787e7a2a1b38e",
"/": "3e1b931a30e14dfe223787e7a2a1b38e",
"main.dart.js": "9b208d079c8a56ce47709836a230deaf",
"manifest.json": "b6dc1b7b79eb7623384c2fcfe0ab17de",
"version.json": "c020a2dcd503a0ff1ff2d136116e9a21"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "main.dart.js",
"index.html",
"assets/NOTICES",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache.
        return response || fetch(event.request).then((response) => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
