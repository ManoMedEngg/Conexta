# 🌐 CONEXTA v2.0 - Futuristic Medical Device Management

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Status](https://img.shields.io/badge/status-Active-success.svg)
![Version](https://img.shields.io/badge/version-2.0.0-purple.svg)

> **"Experiencing the future of medical IoT management today."**

## 🚀 Overview

**Conexta** is a cutting-edge Medical Device Management Platform designed with a **futuristic, glassmorphism-inspired UI**. It bridges the gap between powerful backend processing and seamless frontend interactivity using **PyScript** and **Next.js**.

Imagine a dashboard that feels like it's from 2077—neon accents, real-time data scanning, and a sleek dark mode interface—empowering doctors and administrators to monitor patient vitals and device status with unparalleled clarity.

---

## ✨ Key Features

- **🎨 Futuristic UI/UX**: Built with **Tailwind CSS**, featuring glassmorphism panels, neon glows, and scanline animations.
- **🐍 Python in the Browser**: Utilizes **PyScript** to run Python logic directly in the client for dynamic interactions.
- **⚡ High-Performance Backend**: Powered by **Next.js** for robust API handling.
- **💾 Local Persistence**: Integrated **SQLite** database for reliable data storage.
- **📊 Real-time Monitoring**: Visualizes system health, active users, and alerts (simulated).
- **🌓 Adaptive Theming**: Native dark mode support with a sci-fi aesthetic.

---

## 🛠️ Tech Stack

| Component | Technology | Description |
| :--- | :--- | :--- |
| **Frontend** | HTML5, Tailwind CSS | Structure & Styling |
| **Logic** | 🐍 **PyScript** | Frontend logic written in Python |
| **Backend** | ⚛️ **Next.js** | API Routes & Server Logic |
| **Database** | 🗄️ **SQLite** | `better-sqlite3` for local storage |
| **Icons** | 🔸 **Lucide** | Modern, clean vector icons |

---

## 📦 Installation & Setup

Follow these steps to deploy the system locally:

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+)
- [Python](https://www.python.org/) (v3.10+)

### 1. Clone the Repository
```bash
git clone https://github.com/ManoMedEngg/Conexta.git
cd Conexta
```

### 2. Install Dependencies
Initialize the backend and install required packages:
```bash
cd backend
npm install
cd ..
```

### 3. Run the System 🚀
We have provided a unified startup script for convenience:

```bash
chmod +x start.sh  # Make script executable (first time only)
./start.sh
```

This will:
1.  Start the **Next.js Backend** on port `3000`.
2.  Start the **Python Frontend Server** on port `8000`.
3.  Automatically manage both processes.

> **Note**: Open your browser to `http://localhost:8000` to view the application.

---

## 📸 Screenshots

*(Add your screenshots here)*

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<p align="center">
  Made with ❤️ and ☕ by <b>ManoMedEngg</b>
</p>