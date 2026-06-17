# NOON Search Console Launch Checklist

Use this after `noon-sprachdienst.de` points to the Vercel production project.

## 1. Verify Domain Ownership

1. Open Google Search Console.
2. Add a new property as `Domain`.
3. Enter `noon-sprachdienst.de`.
4. Add the TXT record that Google gives you inside the domain DNS provider.
5. Wait for DNS propagation.
6. Click `Verify`.

If DNS access is not available, use a URL-prefix property for:

- `https://noon-sprachdienst.de/`
- `https://www.noon-sprachdienst.de/`

## 2. Submit Sitemap

Submit:

```txt
https://noon-sprachdienst.de/sitemap.xml
```

After submission, check that Google can fetch it and that the URL count looks correct.

## 3. Inspect Important URLs

Use URL Inspection for:

- `https://noon-sprachdienst.de/`
- `https://noon-sprachdienst.de/preise/`
- `https://noon-sprachdienst.de/de/beglaubigte-uebersetzungen/`
- `https://noon-sprachdienst.de/de/dolmetschen/`
- `https://noon-sprachdienst.de/de/fachuebersetzungen/`
- `https://noon-sprachdienst.de/de/fuehrerschein-uebersetzung/`
- `https://noon-sprachdienst.de/de/heiratsurkunde-uebersetzung/`
- `https://noon-sprachdienst.de/de/standesamt-dolmetscher/`
- `https://noon-sprachdienst.de/de/standorte/osnabrueck/`
- `https://noon-sprachdienst.de/de/standorte/berlin/`

For each URL:

1. Click `Test Live URL`.
2. Confirm it is indexable.
3. Confirm Google sees the canonical URL correctly.
4. Request indexing for the most important pages after launch.

## 4. Check Indexing Reports

Review:

- Pages indexed
- Crawled - currently not indexed
- Discovered - currently not indexed
- Duplicate without user-selected canonical
- Alternate page with proper canonical
- Not found 404
- Blocked by robots.txt

Fix technical errors first, then improve thin pages.

## 5. Check Enhancements

After Google recrawls the site, check whether Search Console reports:

- Breadcrumb structured data
- FAQ structured data where eligible
- Valid pages in Core Web Vitals

Structured data is a help signal, not a ranking guarantee.

## 6. Monthly SEO Review

Every month, export:

- Top queries
- Top pages
- Countries
- Devices
- Average CTR
- Average position

Then improve pages that have:

- many impressions but low CTR
- positions between 4 and 15
- traffic but weak lead conversion

## 7. Client-Owned Tasks

The client must provide or manage:

- Google account access
- Google Business Profile ownership
- branch verification
- real branch photos
- real customer reviews
- domain DNS access
