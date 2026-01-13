# Evidence-Weighted, Disagreement-Aware Chest X-Ray Report Generation System

A premium, dark-themed dashboard for demonstrating an AI-powered chest X-ray analysis system that generates evidence-grounded radiology reports.

![Dashboard Overview](./docs/dashboard-preview.png)

## 🎯 Project Overview

This system addresses a critical challenge in AI-assisted radiology: **not all evidence is equal**. Traditional retrieval-augmented report generation treats all retrieved cases uniformly, but our approach:

- **Weights evidence** by similarity × CNN confidence
- **Detects disagreement** among retrieved cases
- **Prunes weak/conflicting evidence** before report generation
- **Generates uncertainty-aware reports** that acknowledge minority findings

## ✨ Features

- **📊 Overview Dashboard** - Real-time metrics, pipeline visualization, and latest report preview
- **📤 Upload & Analysis** - Drag-and-drop X-ray upload with animated analysis pipeline
- **🔍 Evidence Explorer** - Browse retrieved cases with filtering and sorting
- **⚠️ Disagreement Simulator** - Interactive threshold adjustment and evidence pruning
- **📝 Report Viewer** - Evidence-grounded highlighting and export options
- **ℹ️ About** - Project information and team details

## 🛠️ Tech Stack

- **React 18** + **TypeScript** + **Vite**
- **TailwindCSS v4** - Utility-first CSS
- **Framer Motion** - Animations and transitions
- **React Router** - Client-side routing
- **Lucide React** - Icon library

## 🚀 Quick Start

```bash
# Clone the repository
git clone <repository-url>
cd Major-proj

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

## 📁 Project Structure

```
src/
├── components/
│   └── layout/
│       ├── Layout.tsx      # Main layout wrapper
│       ├── Sidebar.tsx     # Navigation sidebar
│       └── Topbar.tsx      # Top navigation bar
├── pages/
│   ├── Overview.tsx        # Dashboard overview
│   ├── Upload.tsx          # Upload & analysis
│   ├── Evidence.tsx        # Evidence explorer
│   ├── Disagreement.tsx    # Disagreement simulator
│   ├── Reports.tsx         # Report viewer
│   └── About.tsx           # Project info
├── utils/
│   └── sampleData.ts       # Mock data for demo
├── lib/
│   └── utils.ts            # Utility functions
├── App.tsx                 # Router configuration
├── main.tsx                # Entry point
└── index.css               # Global styles
```

## 🎨 Design Philosophy

- **Dark Theme** - Near-black background with indigo/violet accents
- **Glassmorphism** - Frosted glass card effects
- **Micro-animations** - Subtle hover effects and transitions
- **Clinical Aesthetic** - Professional, research-grade appearance

## 📋 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## 👥 Team

- Project developed for Major Project coursework
- Focus: Evidence-based AI for medical imaging

## 📄 License

This project is for educational purposes.

---

> *"Evidence is not equal. Confidence becomes weight. Disagreement is detected, not hidden."*
