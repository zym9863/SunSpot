[中文](./README.md)

# 🌻 SunSpot - Dynamic Mood Weather Station

> Record your daily mood with sunshine

SunSpot is a dynamic mood weather station application built with [Astro](https://astro.build). It combines real weather with personal mood records, helping you track and review your emotional changes through a beautiful visualization diary system.

## ✨ Features

- **🌤️ Real-time Weather** - Dynamically fetch and display current weather information
- **😊 Mood Recorder** - Record your emotional state using five mood types
  - ☀️ Sunny
  - ☁️ Cloudy
  - 🌧️ Rainy
  - ⛈️ Stormy
  - 🌈 Rainbow
- **📔 Markdown Diary** - Write beautiful diary content using Markdown
- **📅 Calendar View** - Calendar with mood markers for intuitive history viewing
- **🎨 Dynamic Themes** - Interface colors change dynamically with weather and mood
- **📱 Responsive Design** - Perfectly adapted for desktop and mobile

## 🛠️ Tech Stack

- **[Astro](https://astro.build)** - High-performance static site generator
- **[React](https://react.dev)** - Used for interactive components (Dynamic Islands)
- **[TypeScript](https://typescriptlang.org)** - Type safety
- **SSR + Prerendering** - Hybrid rendering strategy
- **Content Collections** - Astro Content Management API

## 📁 Project Structure

```text
/
├── public/
│   └── favicon.svg
├── src/
│   ├── assets/              # Static Assets
│   ├── components/          # Components
│   │   ├── Calendar.astro       # Calendar Component
│   │   ├── DiaryCard.astro      # Diary Card
│   │   ├── MoodRecorder.tsx     # Mood Recorder (React)
│   │   └── WeatherStation.astro # Weather Station
│   ├── diary/               # Markdown Diary Content
│   ├── layouts/             # Layout Templates
│   ├── lib/                 # Utility Functions
│   ├── pages/               # Page Routes
│   │   ├── index.astro          # Home Page
│   │   └── diary/               # Diary Page
│   └── styles/              # Global Styles
├── astro.config.mjs         # Astro Configuration
├── content.config.ts        # Content Collections Configuration
└── package.json
```

## 🚀 Quick Start

### Install Dependencies

```bash
pnpm install
```

### Start Development Server

```bash
pnpm dev
```

Server will start at `http://localhost:4321`

### Build for Production

```bash
pnpm build
```

### Preview Production Build

```bash
pnpm preview
```

## 📝 Writing Diaries

Create Markdown files in the `src/diary/` directory to add new diaries. Suggested filename format is `YYYY-MM-DD-title.md`.

### Diary Template

```markdown
---
title: "Today is a good day"
date: 2026-01-17
mood: sunny
tags:
  - life
  - thoughts
excerpt: "A sunny day..."
---

Write your content here using Markdown...
```

### Mood Types

| Mood | Value | Icon |
|:-----|:---|:-----|
| Sunny | `sunny` | ☀️ |
| Cloudy | `cloudy` | ☁️ |
| Rainy | `rainy` | 🌧️ |
| Stormy | `stormy` | ⛈️ |
| Rainbow | `rainbow` | 🌈 |

## 🧞 Command List

| Command | Description |
|:-----|:-----|
| `pnpm install` | Install dependencies |
| `pnpm dev` | Start dev server (`localhost:4321`) |
| `pnpm build` | Build for production to `./dist/` |
| `pnpm preview` | Preview production build locally |
| `pnpm astro ...` | Run Astro CLI commands |
| `pnpm astro -- --help` | Get Astro CLI help |

## 📚 Learn More

- [Astro Documentation](https://docs.astro.build)
- [Astro Discord Community](https://astro.build/chat)

## 📄 License

MIT License
