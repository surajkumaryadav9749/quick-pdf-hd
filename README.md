# QuickPDFHD

QuickPDFHD is a full-stack web application for everyday PDF and image tasks. It provides browser-based upload workflows with a React frontend and an Express API that processes uploaded files in memory.

## Features

- Convert up to 20 JPG, JPEG, PNG, or WEBP images into one ordered A4 PDF.
- Reorder image pages before generating an image-to-PDF document.
- Scan document photos into a PDF with white-edge trimming, color/grayscale/black-and-white modes, rotation, page numbering, and PDF-size targets.
- Detect potentially blank or blurry document-photo uploads before generating a scanned PDF.
- Package up to 20 PDF files into a ZIP archive without modifying the PDFs.
- Resize up to 20 JPG, PNG, or WEBP images by pixels, percentage, or common presets; set DPI/resolution metadata independently; choose JPG, PNG, or WEBP output and quality settings.
- Convert Word DOC/DOCX files to PDF, extract selectable PDF text to DOCX, or run OCR on scanned PDFs.
- Convert Excel XLS/XLSX worksheets to PDF, and extract table-like PDF text to XLSX.
- Split a PDF by page range, separate pages, or equal chunks; merge multiple PDFs in order.
- Render PDF pages to JPG images.
- Download generated PDFs, ZIP archives, and resized images directly from the browser.
- Contact form that sends submissions through SMTP.
- Responsive pages for Home, About, Contact, Privacy Policy, Terms, individual tools, All Services, and a 404 page.
- SEO metadata, structured data, sitemap, robots.txt, and dedicated image-to-PDF landing pages.
- Light/dark theme support and toast feedback for uploads and processing actions.

## Tech stack

| Area | Technology |
| --- | --- |
| Frontend | React 19, Vite, React Router, Tailwind CSS |
| UI helpers | React Icons, React Hot Toast, React Dropzone, dnd-kit |
| Backend | Node.js, Express 5, Multer |
| File processing | Sharp, pdf-lib, pdfjs-dist, @napi-rs/canvas, Tesseract.js, Mammoth, SheetJS, docx, custom ZIP writer |
| Email | Nodemailer / SMTP |

## Available tools

| Tool | Input | Output | Limits |
| --- | --- | --- | --- |
| Word to PDF | DOC, DOCX | PDF | 1 file, 15 MB |
| PDF to Word | PDF | DOCX | NO OCR: 25 MB, 40 pages. OCR: 25 MB, 15 pages; English, Hindi, or both |
| Excel to PDF | XLS, XLSX | PDF | 1 file, 15 MB |
| PDF to Excel | PDF with selectable text | XLSX | 1 file, 25 MB, 40 pages |
| Split PDF | PDF | PDF or ZIP of PDFs | 1 file, 25 MB, 200 pages |
| Merge PDF | PDF files | Single PDF | 2–20 files, 25 MB each, 200 pages total |
| PDF to JPG | PDF | JPG or ZIP of JPGs | 1 file, 25 MB, 40 pages |
| JPG / JPEG / PNG / WEBP to PDF | Images | Single A4 PDF | Up to 20 images, 10 MB each |
| Document Scanner | JPG, PNG, WEBP document photos | Scanned A4 PDF | Up to 20 pages, 10 MB each |
| PDF to ZIP | PDF files | ZIP archive | Up to 20 PDFs, 25 MB each |
| Resize Image | JPG, PNG, WEBP images | ZIP archive of resized images | Up to 20 images, 10 MB each; max output dimension 8000 px; optional DPI 36–1200 |

## Project structure

```text
quick-pdf-hd/
├── client/                 # React + Vite application
│   ├── public/             # Logos, sitemap, robots.txt, and static assets
│   └── src/
│       ├── components/     # Tool workspaces, layout, SEO, and shared UI
│       ├── pages/          # Route-level pages
│       ├── services/       # API clients
│       └── routes/         # Client-side routes
├── server/                 # Express API
│   └── src/
│       ├── controllers/    # Request handlers
│       ├── middleware/     # In-memory upload validation
│       ├── routes/         # API routes
│       └── services/       # PDF, ZIP, and email logic
└── README.md
```

## Run locally

### Prerequisites

- Node.js 20 or newer
- npm
- An SMTP account only if you want the contact form to send email

### 1. Install dependencies

Open two terminals from the repository root:

```bash
cd server
npm install
```

```bash
cd client
npm install
```

### 2. Configure environment variables

Create `server/.env`:

```env
PORT=5000
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your-smtp-username
SMTP_PASS=your-smtp-password
SENDER_EMAIL=no-reply@example.com
CONTACT_RECEIVER=you@example.com
```

Create `client/.env`:

```env
VITE_API_URL=http://localhost:5000
```

`VITE_API_URL` must point to the Express server, without a trailing `/api` path.

### 3. Start the application

```bash
cd server
npm start
```

```bash
cd client
npm run dev
```

Open the Vite URL shown in the terminal, normally `http://localhost:5173`. The API health check is available at `http://localhost:5000/`.

## API endpoints

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `GET` | `/` | API health check |
| `POST` | `/api/convert` | Create a PDF from `images` uploads |
| `POST` | `/api/scan` | Create a scanned PDF from `images` uploads and scan settings |
| `POST` | `/api/resize-image` | Resize `images` uploads and return a ZIP |
| `POST` | `/api/pdf-to-zip` | Package `pdfs` uploads into a ZIP |
| `POST` | `/api/pdf-tools/merge` | Merge `files` PDF uploads into one PDF |
| `POST` | `/api/pdf-tools/split` | Split or extract pages from a PDF (`mode`, `range`, `chunkSize`) |
| `POST` | `/api/pdf-tools/pdf-to-jpg` | Render a PDF into JPG images |
| `POST` | `/api/pdf-tools/word-to-pdf` | Convert a DOC/DOCX upload to PDF |
| `POST` | `/api/pdf-tools/excel-to-pdf` | Convert an XLS/XLSX upload to PDF |
| `POST` | `/api/pdf-tools/pdf-to-word` | Extract PDF text or OCR a scan into a DOCX (`ocr`, `language`) |
| `POST` | `/api/pdf-tools/pdf-inspect` | Report page count and whether selectable text is present |
| `POST` | `/api/pdf-tools/pdf-to-excel` | Extract PDF text into an XLSX file |
| `POST` | `/api/contact` | Send a contact-form email |

The upload middleware uses memory storage. The API creates response buffers for the download and does not write uploaded files to its own disk or database.

Word to PDF, Excel to PDF, PDF to Word, and PDF to Excel run entirely on this Node server. They do not call a paid conversion API and do not require extra environment variables. PDF to Word NO OCR extracts selectable text. PDF to Word OCR renders pages and runs Tesseract.js (English, Hindi, or both). OCR language data is cached in the server temp directory on first use. Word and Excel to PDF keep readable content and basic structure, not every desktop-app design feature.

## Production notes

- Set `VITE_API_URL` to the public API URL when building the frontend.
- The client includes Vercel rewrites for all React routes in [`client/vercel.json`](client/vercel.json).
- Add your deployed frontend origin to `allowedOrigins` in [`server/src/app.js`](server/src/app.js) before connecting a new frontend domain.
- Configure the SMTP variables in the server environment for contact-form delivery.

## Scripts

| Directory | Command | Description |
| --- | --- | --- |
| `client` | `npm run dev` | Start the Vite development server |
| `client` | `npm run build` | Create a production frontend build |
| `client` | `npm run lint` | Run ESLint |
| `client` | `npm run preview` | Preview the production build locally |
| `server` | `npm run dev` | Start the API with Nodemon (requires Nodemon to be installed globally) |
| `server` | `npm start` | Start the API with Node.js |

## License

This repository currently does not declare a project-wide license.
