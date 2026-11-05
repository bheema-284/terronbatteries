# ⚡ TERRON EV MOBILITY - Official Web & Mobile Platform
### SRIDEWI ENERGIES PRIVATE LIMITED (Hyderabad, India)

A mobile-first, high-performance web platform and digital showroom for **TERRON EV MOBILITY**, designed and structured directly according to the official product brochure.

---

## 🛵 The Official 5 EV Models Lineup

| Model | Range | Top Speed | Powertrain | Fast Charge | Chassis Focus |
|---|---|---|---|---|---|
| **CLASSIC SPORT** | 150-175 KM* | 60 KM/H | 4.5 KW | Approx. 5-6 Hrs | Timeless urban commuter with retro-modern front apron & chrome accents |
| **SPORT** | 150-175 KM* | 60 KM/H | 4.5 KW | Approx. 5-6 Hrs | High-agility sport ergonomics, exposed handlebars, 150KG load capacity |
| **NEXA** | 225-270 KM* | 70-80 KM/H | 6.5 KW \| 8 KW | Approx. 5-6 Hrs | Maxi adventure touring with windscreen, projector LEDs & all-terrain tyres |
| **ADVENTURE** | 150-175 KM* | 60 KM/H | 4.5 KW | Approx. 5-6 Hrs | Rugged utility EV with heavy-duty rear cargo rack & front bull-bars |
| **TERRON+** | 225-270 KM | 70-80 KM/H | 6.5 KW \| 8 KW | **~3 Hours (0-80%)*** | Flagship grand tourer with stepped touring saddle & 3-hr rapid charge |

---

## 🌟 Key Features & Engineering

1. **Official Branding & Splash Screen:**
   - Features the official chrome metallic **TERRON** logo on deep navy sapphire background.
   - Cinematic initial launch splash screen with ambient pulse and Smart BMS system check.

2. **Brochure-Aligned Architecture:**
   - **Cover & Philosophy (Page 1 & 7):** *"Powering Mobility. Energizing Progress. Driving the Future."*
   - **Founder's Vision (Page 2):** Leadership message by **Sridevi Kadiyala**, Founder & Managing Director, Sridewi Energies Private Limited.
   - **Interactive Color Swatches (Pages 3-7):** Dynamically preview colorways for each model.
   - **Everyday Convenience (Page 8):** Riding modes (ECO/CITY/SPORT), Cruise control, Reverse assist, Smart BMS, Digital cluster, LED lighting, USB charging, Side-stand cut-off.
   - **Premium Technology (Page 8):** Dual-channel ABS, Traction control, Hill hold, TPMS, Blind-spot alerts, Rear camera, ADAS warnings, and TFT display.
   - **Ordering Guide (Page 8):** *"Choose with clarity. Ride with confidence."* guidance and riding factor disclosures.
   - **Headquarters & Dealers (Page 9):** Madhapur, Hyderabad (+91 7416071115, sales@terronbatteries.com, sepl2578@gmail.com).

3. **Mobile-First Handling (No Heavy Hybrid Bridges):**
   - Pure Web Mobile APIs: Haptic feedback via `navigator.vibrate`, Web Share API, network listener.
   - Sticky bottom navigation bar optimized for smartphone one-thumb usage.
   - Interactive Test Ride booking modal with instant confirmation.

---

## 📁 Project Structure

```
terronbatteries/
├── backend/                  # Node.js + Express REST API
│   ├── src/
│   │   ├── server.js         # Express server, CORS & error handling
│   │   ├── routes/           # Batteries/EV Models, Telemetry (BMS), Warranty, System
│   │   ├── data/             # EV models data & live BMS state
│   │   └── middleware/       # Central error handler
│   ├── test/                 # Server integration test suite
│   ├── .env & .env.example
│   └── package.json
│
├── frontend/                 # React (Vite) + Tailwind CSS Mobile-First App
│   ├── public/
│   │   ├── logo.png          # Official metallic chrome logo
│   │   └── splash.png        # Official splash screen asset
│   ├── src/
│   │   ├── App.jsx           # Master layout with splash screen & banner
│   │   ├── components/
│   │   │   ├── SplashScreen.jsx      # Cinematic launch screen
│   │   │   ├── Banner.jsx            # "Coming Soon" notification banner
│   │   │   ├── Navbar.jsx            # Brand header & desktop actions
│   │   │   ├── Hero.jsx              # Hero showcase & key performance cards
│   │   │   ├── ScooterShowcase.jsx   # 5-model brochure catalog & color swatches
│   │   │   ├── TechnologySection.jsx # Everyday & Premium technology breakdown
│   │   │   ├── FoundersMessage.jsx   # Sridevi Kadiyala executive vision
│   │   │   ├── OrderingGuide.jsx     # "Choose with clarity" checklist
│   │   │   ├── ContactFooter.jsx     # "Thank You" corporate office & inquiries
│   │   │   ├── MobileNav.jsx         # Mobile floating bottom dock
│   │   │   └── TestRideModal.jsx     # Test ride booking drawer
│   │   └── services/
│   │       ├── api.js                # API client with offline fallback
│   │       └── mobileService.js      # Standard mobile Web APIs (vibrate, share)
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── vercel.json           # Vercel SPA deployment config
│
├── vercel.json               # Root Vercel deployment config
├── package.json              # Monorepo root scripts
└── README.md
```

---

## 🚀 Running Locally

### 1. Start the Backend API
```powershell
cd backend
npm run dev
```
*API runs on `http://localhost:5000`.*

### 2. Start the Frontend App
```powershell
cd frontend
npm run dev
```
*Frontend runs on `http://localhost:5173`.*

---

## ☁️ Deploying to Vercel

The project is pre-configured with root and frontend [`vercel.json`](file:///c:/Users/Sreew/terronbatteries/vercel.json) files:

1. Push your repository to GitHub.
2. In the Vercel Dashboard, click **Add New Project** and import `terronbatteries`.
3. Framework Preset: `Vite`
4. Build Command: `cd frontend && npm install && npm run build` (or `npm run build` if Root Directory is `frontend`)
5. Output Directory: `frontend/dist` (or `dist` if Root Directory is `frontend`)
6. Click **Deploy**!
