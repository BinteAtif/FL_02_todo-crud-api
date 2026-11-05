# CSS Cloud Software Solutions — E-Commerce Project Presentation

**Deliverable:** `CSS_Cloud_ECommerce_Presentation.mp4`
**Format:** 1920 × 1080 (16:9), 30 fps, H.264 (CRF 18) + AAC 192 kbps stereo · 3 min 44 s

---

## Scene map

| # | Scene | Length | On-screen content |
|---|-------|--------|-------------------|
| 1 | Company introduction | 17.3 s | Cold-open statement, logo reveal, company name, tagline "We make complexity feel simple.", capability chips, Est. 2011 · Centurion · 9 countries |
| 2 | Who we are | 19.6 s | The company website hero in a laptop mockup, positioning copy, facts, capability chips |
| 3 | Introducing the project | 20.2 s | Project title reveal, website in a browser window, mobile app beside it |
| 4 | The vision | 18.9 s | "One store. Many categories. Endless possibilities." + 8 category tiles |
| 5 | The e-commerce website | 22.2 s | Live-style walkthrough: home → categories → product → cart → checkout → login → orders, with cursor interaction |
| 6 | The mobile application | 17.5 s | Two phones (Android + iOS) cycling eight app screens, "Shop anytime. Anywhere." |
| 7 | One connected system | 18.6 s | Website + mobile app → shared Supabase backend, animated data flow, "one backend / one database / two experiences" |
| 8 | Technology stack | 20.8 s | Lovable · Supabase · FlutterFlow · PayFast · Firebase Cloud Messaging, converging into one system |
| 9 | Customer journey | 16.3 s | Seven-step shopping path with UI thumbnails |
| 10 | Development roadmap | 20.3 s | Four phases, marked as planned |
| 11 | The value | 20.2 s | Three value statements beside the laptop + phone composition |
| 12 | Closing | 18.9 s | Logo, project lockup, tagline, "Turning ideas into digital experiences", fade out |

---

## Sources used

- **Company identity, tagline, services, positioning, location, facts:** the official
  Cloud Software Solutions website (`css-cloud-software-solutions.vercel.app`).
  Copy shown in Scene 2 is taken from the site's own hero and capability list.
- **Project scope, categories, technology stack, roadmap phases:** the brief supplied
  in this conversation (the "Project Plan" document itself was not present in the
  workspace, so its details were taken from the written brief).

## What is real vs. what is a mockup

- The **logo is the official CSS Cloud Software Solutions mark** supplied by the client
  (transparent cut-out, with a dark-letterform variant used on light interface
  backgrounds). It appears in the opening reveal, the website mockup, the storefront
  header, the mobile app header and the closing scene.
- The **e-commerce interface is a designed mockup** (`shop.css.cloud`), rendered from
  scratch. Product names, prices and order numbers are sample data for demonstration.
  It is not a screenshot of a live store.
- The **roadmap is presented as planned phases** (labelled "PLANNED" on screen), and the
  technology stack is labelled "as defined in the project plan" — nothing is claimed to
  be live or completed.
- A closing disclaimer line on screen states the mockup/plan distinction.

## Audio

- Narration: professional male English voice-over, one continuous read per scene,
  timed to the visual beats.
- Music: an original score synthesised for this video (piano, pads, pluck arpeggio,
  soft percussion, rising energy curve), ducked under the voice-over.

## Rebuild

Everything is reproducible from `/home/user/build`:

```
python3 timeline.py      # scene timings derived from the narration audio
python3 audio_build.py   # score + narration mix  -> mix.wav
bash run_render.sh       # renders 6,721 frames and muxes the final MP4
```
