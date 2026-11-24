<div align="center">

<img src="https://raw.githubusercontent.com/Studio1HQ/Studio1HQ/main/assets/banners/realestate-agent.webp" alt="Real Estate Agent with CopilotKit: A chat assistant that finds Dubai rentals and shows them on a map" width="100%" />

<br />
<br />

# Real Estate Agent with CopilotKit

### A chat assistant that finds Dubai rentals and shows them on a map

A Next.js app with a CopilotKit chat next to a Google Map. The copilot reads a rental listings dataset, recommends properties and pins them on the map with Google Places details.

<br />

[![Built by Studio1](https://img.shields.io/badge/Built_by_Studio1-f97316?style=for-the-badge&logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNjAgMTYwIiBmaWxsPSJub25lIj48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTAgMzVDMCAxNi42ODA3IDE0LjA3NDQgMS42NDg0NCAzMiAwLjEyNjk1M1YxNDFINTEuMDUyM0M1Mi40MzA4IDEzNy4zNDQgNTQuNzQ0NiAxMzMuNjg5IDU3Ljk5MzggMTMwLjAzM0M2MS4xNDQ2IDEyNi41MDggNjQuNjg5MiAxMjMuNDQgNjguNjI3NyAxMjAuODI5QzcyLjU2NjIgMTE4LjM0OSA3Ni4zNTY5IDExNi43ODIgODAgMTE2LjEyOVY4Ni43NTQ0Qzc1LjQ3MDggODcuOTI5MiA3MS4zODQ2IDg5LjY5MTkgNjcuNzQxNSA5Mi4wNDE1QzY0IDk0LjUyMjUgNjAuNzUwOCA5Ny40NiA1Ny45OTM4IDEwMC44NTRDNTYuNTM0NSAxMDIuNzIgNTUuMjU0NSAxMDQuNjU5IDU0LjE1MzkgMTA2LjY3MVYwSDEyNUMxNDQuMzMgMCAxNjAgMTUuNjY5OSAxNjAgMzVWMTI1QzE2MCAxNDQuMzMgMTQ0LjMzIDE2MCAxMjUgMTYwSDEyNFYxOEgxMDQuOTQ4QzEwMy41NjkgMjEuNjgxNiAxMDEuMjU1IDI1LjM2MjggOTguMDA2MiAyOS4wNDQ0Qzk0Ljg1NTQgMzIuNTk0MiA5MS4zMTA4IDM1LjY4NDEgODcuMzcyMyAzOC4zMTRDODMuNDMzOCA0MC44MTIgNzkuNjQzMSA0Mi4zODk2IDc2IDQzLjA0NzRWNzIuNjMwNEM4MC41MjkyIDcxLjQ0NzMgODQuNjE1NCA2OS42NzI0IDg4LjI1ODUgNjcuMzA1N0M5MiA2NC44MDc2IDk1LjI0OTIgNjEuODQ5MSA5OC4wMDYyIDU4LjQzMDdDOTkuNDY1NSA1Ni41NTEzIDEwMC43NDUgNTQuNTk4NiAxMDEuODQ2IDUyLjU3MjNWMTYwSDM1QzE1LjY3IDE2MCAwIDE0NC4zMyAwIDEyNVYzNVoiIGZpbGw9IiNmZmZmZmYiLz48L3N2Zz4K)](https://studio1hq.com)
[![Built with CopilotKit](https://img.shields.io/badge/Built_with_CopilotKit-141414?style=for-the-badge)](https://copilotkit.ai)

[CopilotKit docs](https://docs.copilotkit.ai) &nbsp;·&nbsp; [CopilotKit](https://copilotkit.ai) &nbsp;·&nbsp; [More examples](https://github.com/Studio1HQ) &nbsp;·&nbsp; [studio1hq.com](https://studio1hq.com)

</div>

<br />

## Overview

A real estate assistant built with Next.js and [CopilotKit](https://copilotkit.ai). The page is split in two: a Google Map on the left and a CopilotKit chat on the right. You ask for properties in plain language. The copilot reads the listings, suggests matches and pins them on the map. A pin shows the rent and, when Google Places finds the property, extra details such as address, rating, phone, website and opening hours.

The listings come from `properties.json`, a dataset of rentals in the UAE with prices in AED. The chat greets you as a real estate agent for Dubai.

## Features

- **Copilot with listing context**: `useCopilotReadable` gives the model the loaded properties.
- **Map pins from chat**: The `showPropertyOnMap` action takes the fields of a property (address, rent, beds, baths, type, area, location, coordinates and more) and shows it on the map.
- **Place details**: `/api/google` looks up the address with Google Places (find place, then place details) and the result appears in the map info window.
- **Listings API**: `/api/property` serves the first 100 listings from `properties.json`.
- **CopilotKit chat UI**: `CopilotChat` with a custom title and welcome message.

## Tech stack

| Layer | Tool |
| --- | --- |
| Framework | [Next.js](https://nextjs.org/) 15, React 19, TypeScript |
| Copilot | [CopilotKit](https://copilotkit.ai) (`react-core`, `react-ui`, Copilot Cloud public API key) |
| Maps | [Google Maps JavaScript API](https://developers.google.com/maps) via `@react-google-maps/api`, Google Places API |
| Styling | [Tailwind CSS](https://tailwindcss.com/) 4 |

## Getting started

### Prerequisites

- Node.js 18.18 or later and npm
- A CopilotKit public API key, from [Copilot Cloud](https://cloud.copilotkit.ai)
- A Google Maps API key with the Maps JavaScript API and Places API enabled

### Installation

```bash
git clone https://github.com/Studio1HQ/realestate-agent.git
cd realestate-agent
npm install
```

### Environment variables

Create `.env.local` in the project root.

| Variable | Description |
| --- | --- |
| `NEXT_PUBLIC_COPILOTKIT_API_KEY` | CopilotKit public API key, passed to `CopilotKit` as `publicApiKey`. |
| `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` | Google Maps key, used by the map and by the Places lookup route. Restrict it by HTTP referrer because it is exposed to the browser. |

### Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Other scripts: `npm run build`, `npm run start`, `npm run lint`.

## How it works

- `app/layout.tsx` wraps the app in `CopilotKit` and a `PropertiesProvider`.
- `hooks/use-properties.tsx` fetches `/api/property`, exposes the list to the copilot and registers `showPropertyOnMap`. When called, it fetches place details from `/api/google` and stores the property to show.
- `app/page.tsx` renders the map, marker and info window, plus the `CopilotChat`.
- `types/property.types.ts` defines the `Property` shape: address, rent, frequency, beds, baths, type, area, furnishing, purpose, posted date, location, city and coordinates.

## Resources

- [CopilotKit docs](https://docs.copilotkit.ai): readables, actions and Copilot Cloud.
- [CopilotKit](https://copilotkit.ai): the copilot framework used here.
- [Google Maps Platform docs](https://developers.google.com/maps/documentation): Maps JavaScript and Places APIs.

<br />

---

<div align="center">

<a href="https://studio1hq.com">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/Studio1HQ/website/main/brand/studio1-logo-on-dark.svg" />
    <img src="https://raw.githubusercontent.com/Studio1HQ/website/main/brand/studio1-logo-on-light.svg" alt="Studio1" width="160" />
  </picture>
</a>

Built by **[Studio1](https://studio1hq.com)**, the technical content and DevRel partner for devtool teams. Made with [CopilotKit](https://copilotkit.ai).<br />
Browse more open-source examples at [github.com/Studio1HQ](https://github.com/Studio1HQ).

[![Website](https://img.shields.io/badge/studio1hq.com-0b0807?style=for-the-badge&logo=googlechrome&logoColor=white)](https://studio1hq.com)
[![Book a call](https://img.shields.io/badge/Book_a_strategy_call-f97316?style=for-the-badge&logo=googlecalendar&logoColor=white)](https://cal.com/studio1/collab)
[![X](https://img.shields.io/badge/%40Studio1HQ-141414?style=for-the-badge&logo=x&logoColor=white)](https://x.com/Studio1HQ)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0a66c2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/company/studio1hq/)

<sub><a href="https://studio1hq.com">studio1hq.com</a> · Technical content, docs, video and DevRel for devtools</sub>

</div>
