# 🚀 MERN AI Resume Builder SaaS

A full-stack, AI-powered application designed to create ATS-optimized, professional resumes in real-time. Built using the MERN stack and integrated with Google's Gemini 3.5 Flash AI model to automatically generate action-driven, quantified bullet points for work experiences and technical projects.

## ✨ Key Features

* **🔐 Authentication & Security:** Secure JWT-based authentication, bcrypt password hashing, and user-isolated data stored in MongoDB Atlas.
* **🤖 Dual Gemini AI Generators:** Integrated `@google/genai` API endpoints generating tailored bullet points for both professional roles and software development projects.
* **⚡ Live Split-Screen Editor:** Real-time state synchronization updating a sticky A4 preview panel as you type across 6 collapsible accordion sections.
* **🎨 4 ATS-Optimized Templates:** Switch dynamically between **Modern**, **Classic**, **Minimal**, and **Tech** (monospace/skills-first) layouts crafted with Tailwind CSS v4.
* **📄 Native A4 PDF Export:** Flawless document isolation and printing powered by `react-to-print` with exact millimeter sizing (`210mm x 297mm`).
* **🛡️ Production Safeguards:** Rate-limiting on AI endpoints (`express-rate-limit`) to prevent API abuse and strict schema validation.

## 🛠️ Tech Stack

* **Frontend:** React 19, Vite, Tailwind CSS v4, React Router v7, Axios, `react-to-print`
* **Backend:** Node.js, Express 5, MongoDB Atlas, Mongoose 9, JSON Web Tokens (JWT)
* **Artificial Intelligence:** Google Gemini 3.5 Flash (`@google/genai`)

## 🚀 Quick Start (Local Development)

### Prerequisites
* Node.js (v18+)
* MongoDB Atlas Cluster Connection String
* Google AI Studio API Key (`AQ.` format)

### 1. Backend Setup
```bash
cd resume-builder-backend
npm install