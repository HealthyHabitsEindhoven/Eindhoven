# HTTPS Redirect & iOS Safari Hero Image Fix

## Probleem
Hero-afbeeldingen laden niet op iOS Safari bij eerste page load wanneer site via HTTP wordt geopend.

## Oplossingen Geïmplementeerd

### 1. HTTP → HTTPS Redirect (Cloudflare)

**Voor GitHub Pages met Cloudflare:**

1. Log in op Cloudflare Dashboard
2. Ga naar je domain: `healthyhabits-eindhoven.nl`
3. Ga naar **Rules** → **Redirect Rules** → **Create rule**
4. Maak een redirect rule:

**Rule Name:** `HTTP to HTTPS Redirect`

**If:**
- Field: `URI Scheme`
- Operator: `equals`
- Value: `http`

**Then:**
- Action: `Dynamic Redirect`
- Status Code: `301 - Permanent Redirect`
- Expression: `concat("https://", http.host, http.request.uri.path, if(is_empty(http.request.uri.query), "", concat("?", http.request.uri.query)))`

**OF gebruik Page Rules (oude methode):**

1. Ga naar **Rules** → **Page Rules**
2. Create Page Rule:
   - URL: `http://*healthyhabits-eindhoven.nl/*`
   - Setting: **Always Use HTTPS** → ON
   - Setting: **Forwarding URL** → Status Code: 301, URL: `https://healthyhabits-eindhoven.nl/$1`

### 2. Preload Links Toegevoegd

Alle hero images hebben nu `<link rel="preload">` tags in de `<head>`:
- `index.html`: `intake.jpg`
- `tarieven.html`: `intake.jpg`
- `over-ons.html`: `hoofdfoto.jpg`
- `lidmaatschapstest.html`: `lidmaatschapstest.jpeg`
- `en/index.html`: `intake.jpg`

### 3. Background-Image → IMG Tag

`over-ons.html` gebruikt nu een `<img>` tag in plaats van CSS `background-image` (Safari-proof).

### 4. Expliciete HTTPS URLs in Preload

Alle preload links gebruiken expliciete HTTPS URLs:
```html
<link rel="preload" as="image" href="https://healthyhabits-eindhoven.nl/Eindhoven/assets/images/..." ...>
```

## Test Checklist (iPhone Safari)

1. **Incognito/Private Browsing:**
   - Open Safari in Private Browsing mode
   - Ga naar: `http://healthyhabits-eindhoven.nl/?ved=test`
   - ✅ Controleer: Redirect naar HTTPS
   - ✅ Controleer: Hero image laadt direct

2. **Zonder Cache:**
   - Settings → Safari → Clear History and Website Data
   - Open: `http://healthyhabits-eindhoven.nl/`
   - ✅ Controleer: Hero image laadt bij eerste load

3. **Test op alle pagina's:**
   - `http://healthyhabits-eindhoven.nl/` (index)
   - `http://healthyhabits-eindhoven.nl/tarieven.html`
   - `http://healthyhabits-eindhoven.nl/over-ons.html`
   - `http://healthyhabits-eindhoven.nl/lidmaatschapstest.html`

4. **Network Tab Check:**
   - Open Safari Developer Tools (via Mac Safari → Develop → [iPhone])
   - Check Network tab
   - ✅ Alle image requests moeten HTTPS zijn
   - ✅ Geen mixed content warnings

## Technische Details

### Waarom dit werkt:

1. **HTTPS Redirect:** Forceert altijd HTTPS, voorkomt mixed content
2. **Preload:** Zorgt dat browser hero image met hoge prioriteit laadt
3. **IMG Tag:** Safari behandelt `<img>` tags betrouwbaarder dan CSS background-image bij redirects
4. **Expliciete HTTPS:** Voorkomt protocol-relative URL problemen

### Bestanden Aangepast:

- `index.html` - Preload toegevoegd
- `tarieven.html` - Preload toegevoegd
- `over-ons.html` - Background-image → IMG tag + Preload toegevoegd
- `lidmaatschapstest.html` - Preload toegevoegd
- `en/index.html` - Preload toegevoegd
- `_redirects` - Netlify-style redirects (backup)

## Cloudflare Settings Checklist

- [ ] HTTP → HTTPS Redirect rule aangemaakt
- [ ] SSL/TLS mode: **Full (strict)** of **Full**
- [ ] Always Use HTTPS: **ON** (in SSL/TLS settings)
- [ ] Automatic HTTPS Rewrites: **ON** (optioneel, maar aanbevolen)

## Troubleshooting

Als hero images nog steeds niet laden:

1. **Check Cloudflare cache:** Purge cache na wijzigingen
2. **Check DNS:** Zorg dat A/AAAA records naar Cloudflare wijzen
3. **Check SSL:** Zorg dat SSL certificaat geldig is
4. **Browser cache:** Test in Private Browsing
5. **Network tab:** Check of images daadwerkelijk worden geladen (status 200)
