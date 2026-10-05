# pnwsvc.org

The informational website for the Pacific Northwest Summer Volleyball Classic. It's a static site built with [Eleventy](https://www.11ty.dev/). There's no database and no server to maintain, and it can be hosted free on Netlify or Cloudflare Pages.

## Where content lives

All text, dates, prices, links and sponsors are in **`src/_data/`**:

| File | What's in it |
|---|---|
| `site.json` | Dates, prices, venue, Register link, contact info, social links, check-mailing info, Kit signup |
| `sponsors.json` | Title ("Presented by") sponsor, sponsor tiers, which sponsors show in every page footer |
| `rules.json` | Divisions and every rule section on Tournament Info |
| `faq.json` | FAQ questions and answers |
| `recruiting.json` | Combine and seminar details, registration links, panel |
| `pastEvents.json` | Past years, team lists, AES result links |
| `directors.json` | Director names and bios |

Photos are in `src/assets/photos/`. The logo is in `src/assets/img/`.

### Common updates
- **Fill the title sponsor:** in `sponsors.json`, set `title.name` (plus `url` and `logo` if you have them). The "Title Sponsorship Available" spots on the homepage, Sponsors page and footer switch over automatically.
- **Add a sponsor logo:** drop a transparent PNG or SVG in `src/assets/photos/` and set that sponsor's `logo` to `/assets/photos/filename.png`. Without a logo, the sponsor's name shows as text.
- **Turn on Kit signup:** in Kit, create a form, copy its action URL (it looks like `https://app.kit.com/forms/1234567/subscriptions`), and paste it into `site.json` → `kit.formAction`.
- **Open combine/seminar registration:** paste the link into `recruiting.json` → `combine.registerUrl` / `seminar.registerUrl`.
- **New season:** update `site.json` (year, weekends, schedules link) and add the finished year to the top of `pastEvents.json`.

## Editing without code: Pages CMS
1. Put this folder in a GitHub repository (GitHub Desktop is the easiest way).
2. Go to https://app.pagescms.org, sign in with GitHub, and open the repo.
3. Edit forms for event settings, sponsors, rules, FAQ, recruiting, past events and directors. `.pages.yml` defines these forms.
4. Every save commits to GitHub and your host rebuilds the site in about a minute.

## Hosting

**Netlify:** "Add new site" → "Import from Git" → pick the repo. The build settings come from `netlify.toml`.
**Cloudflare Pages:** "Create project" → connect the repo. Build command `npm run build`, output directory `_site`.

**Quick look:** open `_preview/index.html` by double-clicking it. That copy uses relative links so it works straight from your computer. You can also drag the `_preview` folder onto https://app.netlify.com/drop for a free test URL. Rebuild it with `npm run preview`.

**Domain:** in your host's "Custom domains" settings, add `pnwsvc.org` and `www.pnwsvc.org`, then update the DNS records where the domain is registered. Your host shows you the exact records. Old Wix URLs (`/team-registration`, `/about`, `/schedules-25`, etc.) redirect to the new pages through `src/_redirects`.

## Working on it locally
```
npm install
npm start        # live preview at http://localhost:8080
npm run build    # writes the finished site to _site/
```
