# Explore Victoria Falls — Premium Store Redesign

Built as a minimalist premium Victoria Falls lifestyle store using only the supplied images.

## Frontend included
- Animated hero t-shirt carousel
- Right-side hero logo block
- Product hover image changes
- Working cart calculation
- Delivery fee calculation
- WhatsApp backup checkout through Zvakho
- Product IDs and order totals included in checkout payload
- Schema JSON-LD added
- sitemap.xml and robots.txt
- Favicon generated from supplied favicon PNG
- Images converted/renamed to WebP where appropriate

## Important setup
In assets/app.js, replace workerBaseUrl with your deployed Cloudflare Worker URL when ready.

## Backend included
Inside /worker:
- worker.js — Cloudflare Worker API for products, orders, Paynow initiation and Paynow result callback
- schema.sql — Cloudflare D1 retail database schema with products, inventory, orders, order items, inventory movements and payment attempts

## D1 setup example
wrangler d1 create victoria_falls_store
wrangler d1 execute victoria_falls_store --file=worker/schema.sql

Paynow endpoint details should be verified with your live Paynow dashboard before production.


## Mobile optimization update
This version includes a responsive CSS patch for:
- mobile header spacing
- mobile hero carousel
- desktop/tablet/mobile product grids
- mobile product modal
- full-width mobile cart drawer
- touch-device hover fallback
- large desktop refinement
