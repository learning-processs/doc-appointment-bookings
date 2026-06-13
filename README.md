# 🩺 Prescripto - Full Stack Doctor Appointment Booking Platform

Prescripto is a production-ready, full-stack medical clinic coordination platform built on the MERN stack. It provides specialized, role-based control dashboards for Platform Administrators, Medical Providers (Doctors), and Patients to seamlessly manage clinic operations, onboarding, scheduling, and billing.

---

## 📋 Table of Contents

- [About the Project](#about-the-project)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Usage Workflow](#usage-workflow)
- [Contributing](#contributing)

---

## 📖 About the Project

Prescripto streamlines the entire lifecycle of medical appointments:
- **The Patient Frontend Portal:** Provides patients with a responsive interface to discover trusted healthcare professionals based on medical specializations, lock in 30-minute availability slots across a rolling 7-day calendar, and fulfill payments online.
- **The Admin & Doctor Dashboards Panel:** Acts as a specialized multi-role interface. Platform managers can onboard medical practitioners via multipart state tracking and evaluate central clinic metrics, while doctors can log into personalized environments to manage schedules, track earnings, and complete or cancel bookings.

---

## ✨ Features

### 👤 Patient Portal
- ✅ **Dynamic Specialization Filters:** Discover certified experts across various medical domains (General Physician, Gynecologist, Dermatologist, Pediatricians, Neurologist, Gastroenterologist) with instantaneous responsive filtering logic.
- ✅ **Intelligent Slot Scheduling:** High-performance calendar algorithms aggregate 30-minute dynamic clinical targets, checking slot availability variables in real time while tracking pre-booked conditions.
- ✅ **Razorpay Payment Gateway:** Interactive checkout routines executing direct verification checks through server-to-server checksum signatures.
- ✅ **Interactive Appointment Tracking:** Real-time state modifiers detailing past and present appointment milestones with distinct visual indicators for `Paid`, `Pay Online`, `Completed`, or `Cancelled`.
- ✅ **Self-Managed Health Profiles:** Comprehensive biological forms to map demographic metrics, contact points, birthdates, and custom health avatar media uploads.

### 💼 Administrator Dashboard Panel
- ✅ **Provider Onboarding Engine:** Robust multi-part form architecture allowing admins to register new medical professionals with picture assets, educational credentials, specializations, fees, and location profiles.
- ✅ **Global Provider Logs:** Central roster management that empowers system admins to globally toggle doctor visibility or check specialized rosters across the database.
- ✅ **Macro Analytical Tracking:** Financial and data summaries reporting global metrics including total active doctor accounts, distinct verified patient metrics, and global app reservation records.
- ✅ **Administrative Direct Interventions:** System overrides allowing platform managers to cancel bookings instantly with clean reactive client states.

### 🩺 Doctor Control Center
- ✅ **Dedicated Session Boundaries:** Cryptographically isolated auth parameters preventing multi-role session leakage across local clients.
- ✅ **Chronological Agenda Streams:** Comprehensive reservation log timelines highlighting active transactional statuses like `Online` card collections or physical `CASH` parameters.
- ✅ **Lifecycle Handlers:** Double-action UI buttons (`cancel_icon` / `tick_icon`) allowing providers to mark visits as completed or issue reactive clinical updates.
- ✅ **Micro-Analytics Dashboards:** Tailored statistical overview cards showcasing local clinic traffic, recent appointment histories, and profile visibility adjustments.

---

## 🛠️ Tech Stack

### Frontend Architecture
| Technology | Purpose |
|---|---|
| React.js | UI Componentization & Performance Lifecycle Hooks |
| Tailwind CSS | Mobile-First Utility Utilities, Flexboxes, & Complex Grid Sheets |
| React Router DOM | Declarative Navigation Schemes & Path Metric Parameter Handling |
| Axios | Promise-Based Network Requests & HTTP Interceptor Mapping |
| React Toastify | Status Feedbacks, Validations, & Interface Operational Alerts |
| Context API | Universal Shared App States, Client Identity Tokens, & Sync Engines |

### Backend API Server Architecture
| Technology | Purpose |
|---|---|
| Express.js (v5.2.x) | Web Server Pipeline Architecture & Routing Context Matrix |
| Node.js | Asynchronous Event-Driven Javascript Execution Environment |
| MongoDB / Mongoose | Elastic Scalable Document Clusters & Rigid Object Schema Validation |
| Razorpay (v2.9.x) | Automated Merchant Transaction Processing & Checksum Verification |
| Cloudinary | Cloud Image Optimization Ingestion & Secure Content Delivery Network |
| JSONWebToken (JWT) | Stateful Cross-Boundary Session Authorization & Token Generation |
| Bcrypt | Salted Non-Reversible Hashing Algorithms for User Password Encryption |
| Multer | Disk/Memory Storage Multipart Buffer Processors for Local Media Uploads |

---

## 📁 Project Structure

```text
doc-appointment-bookings/
│
├── server/                           # Backend API Server Core
│   ├── config/                       # Connection blueprints
│   │   ├── db.js                     # MongoDB database connection initialization
│   │   └── cloudinary.js             # Cloud asset engine authorization integration
│   │
│   ├── controllers/                  # Core operational business rules
│   │   ├── adminController.js        # Administrative portal controls & metrics calculation
│   │   ├── doctorController.js       # Practitioner workflows & diagnostic logs coordination
│   │   └── userController.js         # Patient pipelines, booking logic & checkout verifications
│   │
│   ├── middlewares/                  # Interceptors protecting private streams
│   │   ├── authAdmin.js              # Admin cryptographic token evaluation rules
│   │   ├── authDoctor.js             # Practitioner route gateway checks
│   │   ├── authUser.js               # Patient transaction validation rules
│   │   └── multer.js                 # Binary multi-part asset handler
│   │
│   ├── models/                       # Database collection schema specifications
│   │   ├── adminModel.js             # Platform administrator data templates
│   │   ├── doctorModel.js            # Doctor entities tracking specs & addresses
│   │   └── userModel.js              # Patient identity & baseline health matrix templates
│   │
│   ├── routes/                       # Network entry gateway endpoints
│   │   ├── adminRoute.js             # Management route mappings
│   │   ├── doctorRoute.js            # Clinical operation route mappings
│   │   └── userRoute.js              # End-user profile and payment checkout mappings
│   │
│   ├── uploads/                      # Transient disk folder holding temporary media buffers
│   ├── package.json                  # Node database metadata environment charts
│   └── server.js                     # Root express server bootstrap engine script
│
├── admin/                            # Admin & Doctor Frontend Subsystem Panel
│   ├── public/                       # Global assets folder
│   └── src/
│       ├── App.jsx                   # Central layout workspace wrapper
│       ├── index.css                 # Main global style layers mapping
│       ├── main.jsx                  # UI runtime virtual root mount engine point
│       │
│       ├── assets/                   # Shared local vectors and layouts indices
│       │   └── assets_admin/         # Administrative specific design blueprints
│       │
│       ├── components/               # High-reusability panel interface elements
│       │   ├── Navbar.jsx            # Multi-role authentication responsive status bar
│       │   └── Sidebar.jsx           # Context-dependent navigational panel core
│       │
│       ├── context/                  # Multi-context abstraction state layers
│       │   ├── AdminContext.jsx      # Management endpoints coordination state wrapper
│       │   ├── AppContext.jsx        # Structural helper equations engine wrapper
│       │   └── DoctorContext.jsx     # Clinician operations state tracking wrapper
│       │
│       └── pages/                    # Workspace viewport screen managers
│           ├── Login.jsx             # Combined backend token interceptor gate
│           ├── Admin/                # Protected Administrator control panels view
│           │   ├── AddDoctor.jsx     # Practitioner onboarding data sheet forms
│           │   ├── AllAppointments.jsx # Universal global clinical appointment ledger
│           │   ├── Dashboard.jsx     # Central administrator analytics mapping interface
│           │   └── DoctorsList.jsx   # Managed professional roster view checkboxes
│           └── Doctor/               # Protected Practitioner control panels view
│               ├── DoctorAppointments.jsx # Local clinic calendar schedule log rows
│               ├── DoctorDashboard.jsx # Practitioner metrics evaluation cards
│               └── DoctorProfile.jsx # Clinic pricing thresholds configuration form
│
└── client/                           # Patient Frontend Subsystem Client
    ├── public/                       # Public directory for shared icons and bookmarks
    │   ├── favicon.svg               # Application browser bookmark vector
    │   └── icons.svg                 # Application visual catalog vectors sheet
    │
    └── src/
        ├── App.jsx                   # Primary viewport configuration routing tree blueprint
        ├── index.css                 # Core Tailwind layers styling base sheet
        ├── main.jsx                  # React virtual DOM application mount node entrypoint
        │
        ├── assets/                   # Shared image indices
        │   └── assets_frontend/      # High-fidelity graphics bundles
        │       ├── about_image.png   # Promotional about-us page asset card
        │       ├── appointment_img.png  
        │       └── assets.js         # Unified programmatic dynamic mapping file
        │
        ├── components/               # Highly modular standalone layout components
        │   ├── Banner.jsx            # Dynamic account registration trigger banner
        │   ├── Footer.jsx            # Fluid bottom copyright layout mapping corporate info
        │   ├── Header.jsx            # Root application landing call-to-action component
        │   ├── Navbar.jsx            # Mobile-adaptive user identity bar component
        │   ├── RelatedDoctors.jsx    # Internal recommendation matrix pulling category overlaps
        │   ├── SpecialityMenu.jsx    # Multi-item categorization grid row launcher
        │   └── TopDoctors.jsx        # Landing dashboard professional roster display board
        │
        ├── context/                  # Client-side global cross-boundary context modules
        │   └── AppContext.jsx        # Session tokens & patient analytical data distribution core
        │
        └── pages/                    # Core multi-viewport display assemblies
            ├── About.jsx             # Institutional vision statements profile sheet
            ├── Appointment.jsx       # Rolling 7-day calendar slot verification workspace
            ├── Contact.jsx           # Corporate clinic communications profile sheet
            ├── Doctors.jsx           # Broad provider index panel with custom specialization sidebar filters
            ├── Home.jsx              # Consolidated parent master entry layout
            ├── Login.jsx             # Form controller optimizing signup/signin transitions
            ├── MyAppointments.jsx    # Interactive patient ledger mapping cancellation handlers
            └── Profile.jsx           # Biological demographic file controller module

