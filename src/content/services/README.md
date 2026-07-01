# NOON service content

This folder contains the text/data used by the `/leistungen` service page.

## Main file

- `sheets.jsx`

This file now holds the service page content that was previously inside `src/components/Services.jsx`.

## How to edit content

1. German is the master content.
2. Edit the German service objects first, for example:
   - `DOLMETSCHER_SHEET`
   - `POINT_GRID_SHEETS`
   - `IT_SOFTWARE_SHEET`
3. Add or update translated lines in `SERVICE_SHEET_TEXT_TRANSLATIONS`.
4. Keep the same meaning as the German source. Do not summarize unless the design specifically needs shorter text.

## Why this exists

Keeping service content outside the React component makes it easier to:

- review German source text,
- translate line by line,
- avoid mixed German text on Arabic, English, Turkish, Russian, French, or Ukrainian pages,
- keep UI code separate from content.

