# Evercare Pharmaceuticals — Full-Stack Healthcare Web Application

[![Node.js](https://img.shields.io/badge/Node.js-18%2B-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18-blue.svg)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6-purple.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-v4-38bdf8.svg)](https://tailwindcss.com/)
[![Express](https://img.shields.io/badge/Express-4.21-lightgrey.svg)](https://expressjs.com/)
[![Tests](https://img.shields.io/badge/Tests-Vitest%20(9%20passed)-brightgreen.svg)](https://vitest.dev/)

A modern, full-stack web application built for **Evercare Pharmaceuticals**, a trusted global pharmaceutical company delivering certified medications, sterile injectables, oral solid formulations, pediatric liquid syrups, and therapeutic dermatological treatments.

Inspired by premier healthcare and pharmaceutical web designs, Evercare combines a clinical aesthetic with anti-counterfeiting security features, an interactive formulation catalog, pharmaceutical dossiers, sample request workflows, and corporate institutional portals.

---

## 📸 Visual Design & Inspirations

The application layout is inspired by modern healthcare design principles:
- **Clean Clinical Palette:** Medical blue (`#0284c7`, `#0369a1`), healthcare cyan (`#06b6d4`, `#0891b2`), soft mint emerald (`#059669`), crisp slate whites, and subtle pastel card backgrounds.
- **Hero Presentation:** Tagline `"BETTER HEALTH. BRIGHTER FUTURES."`, main headline `"Trusted Healthcare for Every Stage of Life"`, dual action CTAs, trust metric badges, and scientific laboratory imagery accompanied by floating badges (*"Pioneering Science"*, *"Innovation & Better Lives"*).
- **5 Value Pillars:** High Quality Standards, Innovative Formulations, Patient Focused, Affordable Healthcare, and Timely Global Delivery.
- **4 Pastel Product Category Cards:**
  1. *Tablets & Capsules* (Coated, sustained-release, solid oral doses)
  2. *Syrups & Suspensions* (Pediatric drops, suspensions & oral liquid solutions)
  3. *Injectables* (Sterile vials, lyophilized powders & ampoules)
  4. *Ointments & Creams* (Dermal applications, emulgels, and protective barriers)
- **Interactive Medicine Batch Authenticity Checker:** Anti-counterfeiting tracking tool allowing healthcare professionals and patients to verify batch release certificates (CoAs).
- **Institutional Sample Request & Dossier System:** Healthcare institutions, clinics, and pharmacies can inspect active ingredients, therapeutic indications, contraindications, and request verified trial samples.
- **Careers & Mission Portals:** Modals for exploring open scientific roles and corporate governance.

---

## 🛠️ Architecture & Tech Stack

### Frontend
- **Framework:** React 18 with Vite 6
- **Styling:** Tailwind CSS 4 with custom typography (`Plus Jakarta Sans` & `Outfit`) and Lucide React icons
- **Visual Assets:** Handcrafted vector SVGs for pharmaceutical forms (blisters, amber medicine bottles, vials & syringes, dermal tubes, laboratory scientist)

### Backend
- **Server:** Node.js with Express 4
- **Security & Middleware:** CORS, JSON parser, modular routes
- **Testing:** Vitest & Supertest (9 automated unit & integration tests)
- **End-to-End Verification:** Playwright headless browser test suite

---

## 🚀 Key Features

1. **Anti-Counterfeit Medicine Batch Verification:**
   - Real-time serialization validation against Evercare's quality release database.
   - Sample batch numbers provided: `EVR-TAB-2025`, `EVR-SYR-884`, `EVR-INJ-9921`, `EVR-OIN-3304`.
   - Returns Certificate of Analysis (CoA), active purity assay percentage, manufacturing site certification (ISO 9001:2015 & WHO-GMP), release date, expiration date, and QA Analyst signature.

2. **Pharmaceutical Catalog & Live Filter:**
   - Filter medicines across Tablets, Syrups, Injectables, and Ointments.
   - Real-time search query matching product brand, active generic drug name, therapeutic category, and clinical indications.
   - Prescription badge system (`Rx Required` vs `Over-the-Counter`).

3. **Full Pharmaceutical Dossier Modal:**
   - In-depth composition breakdowns, active generic strength, dosage form, and packaging specs.
   - Clinical indications and contraindications/warnings.
   - Storage condition guidelines.
   - Integrated tab for healthcare providers to request free institutional evaluation samples.

4. **Institutional Sample Ordering Workflow:**
   - Multi-field order form submitting directly to `/api/sample-request`.
   - Validates medical license numbers, hospital/clinic affiliation, and contact credentials.

5. **Career Portal & Job Openings:**
   - View open positions across formulation science, regulatory affairs, QA analytical chemistry, and cold-chain supply chain logistics.
   - Modal application flow connected to `/api/careers/apply`.

6. **Interactive Mission & Vision Dialog:**
   - Highlights corporate pillars, WHO-GMP adherence, and patient access initiatives.

7. **Patient & Physician Testimonials:**
   - Verified feedback from medical directors, clinical pharmacologists, and patients.

8. **Corporate Inquiries & Newsletter:**
   - Contact form with subject classification and instant submission confirmation.
   - Newsletter subscription form in the footer with duplicate and invalid email checking.

---

## 📡 API Endpoints Specification

All backend endpoints are prefixed with `/api`.

### 1. Health Check
- **`GET /api/health`**
  - **Response `200 OK`**:
    ```json
    { "status": "ok", "service": "Evercare Pharmaceuticals API", "version": "1.0.0" }
    ```

### 2. Product Catalog
- **`GET /api/products`**
  - Query parameters:
    - `category`: Filter by category (e.g., `Tablets & Capsules`, `Injectables`)
    - `search`: Case-insensitive text query matching drug name or active ingredient
    - `therapy`: Filter by therapeutic area
  - **Response `200 OK`**: Array of product objects.

- **`GET /api/products/:id`**
  - Returns complete drug dossier for specified product ID.
  - **Response `200 OK`**: Product object.
  - **Response `404 Not Found`**: If product does not exist.

### 3. Anti-Counterfeiting Batch Verification
- **`GET /api/verify-batch/:batchId`**
  - Returns lot release records, certificate of analysis, purity assay, and manufacturing facility.
  - **Response `200 OK`**:
    ```json
    {
      "verified": true,
      "batch": {
        "batchNumber": "EVR-TAB-2025",
        "productName": "EverCef-500",
        "activeIngredient": "Cefuroxime Axetil USP 500mg",
        "certificateOfAnalysis": "CoA-2024-99814-QC",
        "assayPurity": "99.8%",
        "manufacturingDate": "2024-11-15",
        "expiryDate": "2027-10-31",
        "facility": "Evercare Biologics & Solids Facility Unit 2, ISO 9001:2015 & WHO-GMP Certified",
        "qaApprover": "Dr. Elena Rostova, Chief QC Analyst",
        "status": "Released for Distribution"
      }
    }
    ```
  - **Response `404 Not Found`**: If batch code cannot be verified.

### 4. Institutional Sample Requests
- **`POST /api/sample-request`**
  - Request body:
    ```json
    {
      "productId": "evercef-500",
      "institutionName": "St. Jude Hospital",
      "contactPerson": "Dr. Sarah Adams",
      "email": "dr.adams@stjude-health.org",
      "phone": "+1 (555) 234-5678",
      "licenseNumber": "MED-NY-883921",
      "sampleUnits": 20
    }
    ```
  - **Response `201 Created`**: Returns confirmation with request ID.

### 5. Inquiries & Contact Submissions
- **`POST /api/contact`**
  - Request body: `{ "name", "email", "phone", "subject", "message" }`
  - **Response `201 Created`**: Returns confirmation message.

### 6. Newsletter Subscription
- **`POST /api/newsletter`**
  - Request body: `{ "email": "healthcare@hospital.org" }`
  - **Response `201 Created`**: Subscription confirmation.

### 7. Careers & Job Applications
- **`GET /api/careers`**
  - Returns list of open job vacancies with requirements and locations.
- **`POST /api/careers/apply`**
  - Request body: `{ "jobId", "fullName", "email", "phone", "experience", "coverNote" }`
  - **Response `201 Created`**: Confirmation of application receipt.

---

## 💻 Getting Started & Development

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18 or higher recommended)
- `npm` (version 9 or higher)

### Installation
```bash
# Clone the repository
git clone <repository_url>
cd <repository_name>

# Install dependencies
npm install
```

### Running in Development Mode
To start both backend and frontend concurrently:
```bash
# Terminal 1: Start Express API server (port 5000)
npm run server

# Terminal 2: Start Vite Frontend dev server (port 5173)
npm run dev
```

Open `http://localhost:5173` in your browser. The Vite development server automatically proxies API requests matching `/api/*` to `http://localhost:5000`.

---

## 🧪 Testing & Verification

### Running Automated API Tests
Unit and integration tests are managed by Vitest:
```bash
npm test
```
This runs 9 tests covering:
- Health check route
- Product listing, category filters, and search queries
- Product dossier detail retrieval
- Batch verification lookup (both valid batches and non-existent IDs)
- Institutional sample request validation
- Contact form submissions

### Building for Production
To compile and bundle frontend assets:
```bash
npm run build
```
Build artifacts will be emitted to `dist/`.

---

## 📂 Project Directory Structure

```
├── .gitignore
├── README.md                      # Project documentation
├── index.html                     # HTML root template with fonts & metadata
├── package.json                   # Project scripts and dependencies
├── vite.config.js                 # Vite configuration with API proxy
│
├── public/                        # Static assets & illustrations
│   ├── images/
│   │   ├── hero/scientist.svg     # Modern laboratory scientist visual
│   │   ├── products/
│   │   │   ├── tablets.svg        # Blister tablet pack illustration
│   │   │   ├── syrups.svg         # Amber syrup bottle & dosage cup
│   │   │   ├── injectables.svg    # Sterile vials & syringe
│   │   │   └── ointments.svg      # Dermal tube & emulgel jar
│   │   ├── about-pills.svg        # Stethoscope & medicinal capsules
│   │   └── family-wellness.svg    # Family wellness outdoor scene
│   └── logo.svg                   # Evercare medical cross shield badge
│
├── server/                        # Express API Backend
│   ├── index.js                   # REST endpoints, router, and middleware
│   ├── data.js                    # In-memory database of medicines, batches & jobs
│   └── server.test.js             # Vitest test suite for API endpoints
│
├── src/                           # React 18 Frontend
│   ├── main.jsx                   # React application mount
│   ├── App.jsx                    # Root layout, modal state & routing
│   ├── index.css                  # Tailwind styles and custom utilities
│   └── components/
│       ├── Navbar.jsx             # Header with logo, nav links, quick batch modal
│       ├── Hero.jsx               # Hero section inspired by reference
│       ├── ValuePillars.jsx       # 5 value pillar cards
│       ├── CategoryCards.jsx      # 4 pastel category cards with vector art
│       ├── ProductCatalog.jsx     # Live searchable & filterable catalogue
│       ├── ProductModal.jsx       # Drug dossier & institutional sample modal
│       ├── AboutUs.jsx            # Company legacy, scientific stats & WHO-GMP
│       ├── HealthWellness.jsx     # Family healthcare section
│       ├── BatchVerificationSection.jsx # Medicine authenticity checker
│       ├── Testimonials.jsx       # Healthcare stakeholder testimonials
│       ├── ContactSection.jsx     # Corporate and medical inquiry form
│       ├── Footer.jsx             # Comprehensive footer with newsletter
│       ├── CareersModal.jsx       # Job application portal modal
│       └── MissionModal.jsx       # Mission & quality pledge modal
│
└── test-results/                  # Playwright visual screenshots
```

---

## ⚖️ Regulatory Compliance Disclaimer

Evercare Pharmaceuticals web applications are built in accordance with international healthcare web safety practices. Prescriptions must be issued by a registered medical practitioner before dispensing Rx medicines. All batch serialization records displayed reflect certified quality control audits under WHO-GMP and ISO 9001:2015 standards.

---

## 📄 License
This project is proprietary and confidential to Evercare Pharmaceuticals Inc. All rights reserved.
