// Tells Bing (and through it ChatGPT search and Copilot), Yandex and other IndexNow engines
// that pages are new or changed, so they are crawled within hours instead of weeks.
// Run after a deployment is live:
//   npm run indexnow                      all URLs of the live sitemap
//   npm run indexnow -- /de/angebot/ …    only these paths
// The key file public/<key>.txt must be live on the site, or the engines reject the request.
const SITE = 'https://www.noon-sprachdienst.de';
const KEY = '2bc231b4844d33e97317240f951f2147';
const ENDPOINT = 'https://api.indexnow.org/indexnow';
const MAX_URLS = 10000; // IndexNow limit per request

const args = process.argv.slice(2);
let urls;
if (args.length) {
  urls = args.map((path) => new URL(path, SITE).href);
} else {
  const sitemap = await fetch(`${SITE}/sitemap.xml`).then((r) => {
    if (!r.ok) throw new Error(`Live sitemap: HTTP ${r.status}`);
    return r.text();
  });
  urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}
if (!urls.length) throw new Error('No URLs to submit.');

const keyCheck = await fetch(`${SITE}/${KEY}.txt`);
const keyText = keyCheck.ok ? (await keyCheck.text()).trim() : '';
if (keyText !== KEY) throw new Error(`Key file ${SITE}/${KEY}.txt is not live (HTTP ${keyCheck.status}). Deploy first.`);

const response = await fetch(ENDPOINT, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: new URL(SITE).host, key: KEY, keyLocation: `${SITE}/${KEY}.txt`, urlList: urls.slice(0, MAX_URLS) }),
});
// 200 = accepted, 202 = accepted (key check pending); anything else is a failure.
console.log(`IndexNow: ${Math.min(urls.length, MAX_URLS)} URLs submitted → HTTP ${response.status}`);
if (![200, 202].includes(response.status)) {
  console.error(await response.text());
  process.exit(1);
}
