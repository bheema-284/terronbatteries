# ⚡ Terron Batteries - Full-Stack & Mobile Platform

A cross-platform battery management, telemetry, and enterprise warranty platform for **Terron Batteries**. Built with:
- **Backend:** Node.js & Express RESTful API
- **Frontend:** React (Vite) + Tailwind CSS + Lucide Icons
- **Mobile (Android & iOS):** Capacitor 6 native container with native hardware plugins (Device, Haptics, Network, Status Bar, Preferences)

---

## 📁 Project Structure

```
terronbatteries/
├── backend/
│   ├── src/
│   │   ├── server.js              # Express app entrypoint & middleware
│   │   ├── routes/
│   │   │   ├── system.js          # Health check & system status
│   │   │   ├── batteries.js       # Battery products & datasheets API
│   │   │   ├── telemetry.js       # Live BMS telemetry & simulation API
│   │   │   └── warranty.js        # Warranty registration & verification
│   │   ├── data/
│   │   │   └── batteryStore.js    # In-memory battery models & live BMS state
│   │   └── middleware/
│   │       └── errorHandler.js    # Central error handler
│   ├── test/
│   │   └── server.test.js         # API integration test suite
│   ├── .env.example
│   └── package.json
│
├── frontend/
│   ├── capacitor.config.json      # Capacitor configuration (appId, appName, webDir)
│   ├── tailwind.config.js         # Tailwind CSS styling & brand palette
│   ├── vite.config.js             # Vite build configuration
│   ├── src/
│   │   ├── App.jsx                # Main application component
│   │   ├── main.jsx               # React DOM bootstrap
│   │   ├── index.css              # Tailwind directives & safe-area styles
│   │   ├── components/
│   │   │   ├── Navbar.jsx         # Navigation bar & live backend ping badge
│   │   │   ├── TelemetryMonitor.jsx # Real-time BMS pack & 16-cell balance monitor
│   │   │   ├── ProductsCatalog.jsx  # Battery models catalog & technical datasheets
│   │   │   ├── WarrantyLookup.jsx   # Warranty lookup & serial number registration
│   │   │   └── NativeDevicePanel.jsx# Capacitor mobile hardware status & actions
│   │   └── services/
│   │       ├── api.js             # API client with automatic offline fallback
│   │       └── capacitorService.js# Capacitor native plugin bridge with web fallbacks
│   ├── android/                   # Native Android Studio Gradle project
│   ├── ios/                       # Native Xcode project
│   └── package.json
│
├── package.json                   # Root workspace management
└── README.md
```

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js** (v18+ or v20 LTS recommended)
- **npm** (v10+ recommended)
- **For Android Development:** Android Studio + Android SDK (API Level 24+)
- **For iOS Development:** macOS with Xcode 15+ & CocoaPods

---

### 2. Running the Backend Server (Express)

```bash
cd backend
npm install
npm run dev
```

The Express API will start on **`http://localhost:5000`**.

#### Key API Endpoints:
- `GET  /api/system/health` — System uptime and status
- `GET  /api/batteries` — Battery product catalog and specifications
- `GET  /api/batteries/:id` — Single battery datasheet
- `GET  /api/telemetry/live` — Real-time BMS telemetry (Voltage, Current, Temp, 16 Cell voltages)
- `POST /api/telemetry/simulate` — Simulate load changes / charging states
- `GET  /api/warranty/lookup/:serialNumber` — Check warranty status (try demo: `TRN-2026-99014`)
- `POST /api/warranty/register` — Register a newly installed battery warranty

To run the backend integration test suite:
```bash
cd backend
npm test
```

---

### 3. Running the Frontend (React + Tailwind CSS)

```bash
cd frontend
npm install
npm run dev
```

Open **`http://localhost:5173`** in your browser.

- The application automatically connects to `http://localhost:5000/api`.
- If the backend is not yet started, the frontend gracefully falls back to simulated offline telemetry, ensuring zero interruption.

---

### 4. ☁️ Deploying to Vercel

The project includes pre-configured [`vercel.json`](file:///c:/Users/Sreew/terronbatteries/vercel.json) files both at the root workspace and in the `frontend/` directory.

#### Option A: Deploy via Vercel CLI
```bash
npm i -g vercel
vercel
```

#### Option B: Deploy via Vercel Web Dashboard (GitHub / GitLab / Bitbucket)
1. Push your repository to GitHub.
2. In the Vercel Dashboard, click **Add New Project** and import `terronbatteries`.
3. If deploying from the repository root:
   - **Framework Preset:** Vite
   - **Build Command:** `cd frontend && npm install && npm run build`
   - **Output Directory:** `frontend/dist`
4. If setting the Root Directory to `frontend` in Vercel project settings:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. (Optional) In **Environment Variables**, set:
   - `VITE_API_BASE_URL`: URL of your deployed Express backend (e.g. on Railway, Render, or a VPS). If left blank, the frontend seamlessly operates in client-side demonstration mode with realistic battery telemetry.
6. Click **Deploy**!

---

### 5. 📱 Mobile Development with Capacitor (Android & iOS)

Capacitor bridges the React web application into 100% native Android and iOS apps.

#### Syncing Web Assets with Native Platforms:
Whenever you update frontend code or install new Capacitor plugins:
```bash
cd frontend
npm run build
npx cap sync
```

#### Android:
To open the native Android project in **Android Studio**:
```bash
cd frontend
npx cap open android
```
- In Android Studio, connect your physical Android phone (with USB Debugging enabled) or start an Android Virtual Device (AVD).
- Click **Run** (`Shift + F10`) to compile and launch the app.

#### iOS (macOS required):
To open the native Xcode workspace in **Xcode**:
```bash
cd frontend
npx cap open ios
```
- In Xcode, select your target simulator or provisioned iPhone.
- Click **Run** (`Cmd + R`) to build and run the app.

---

## ⚡ Capacitor Native Features Included

1. **`@capacitor/device`:** Reads physical device model, operating system, and hardware battery level.
2. **`@capacitor/network`:** Real-time cellular / WiFi connectivity detection.
3. **`@capacitor/haptics`:** Tactile vibration feedback on button presses and alarms.
4. **`@capacitor/status-bar`:** Configures dark theme styling matching battery status.
5. **`@capacitor/preferences`:** Persistent local mobile key-value storage.

---

## 🛠️ Root Workspace Scripts

From the root `terronbatteries` folder:
- `npm run backend` — Start the Node.js Express server
- `npm run frontend` — Start the Vite React development server
- `npm run build:frontend` — Build production bundle for web and mobile
- `npm run cap:sync` — Sync production bundle to Android and iOS folders
- `npm run cap:android` — Launch Android Studio
- `npm run cap:ios` — Launch Xcode (macOS)

