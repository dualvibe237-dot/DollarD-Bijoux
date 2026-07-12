import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

// Helper to sanitize HTML/SVG tags to prevent layout break or injection
function escapeHtml(str: string): string {
  if (!str) return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // 1. Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", time: new Date().toISOString() });
  });

  // 2. High-end OpenGraph / Twitter dynamic Social card SVG endpoint
  app.get("/api/og", (req, res) => {
    const {
      type = "general",
      name = "Maison DollarD",
      category = "Haute Joaillerie & Horlogerie",
      price,
      metal,
      stone,
      image,
      lang = "FR"
    } = req.query as Record<string, string>;

    const safeName = escapeHtml(name);
    const safeCategory = escapeHtml(category);
    const safePrice = price ? escapeHtml(price) : "";
    const safeMetal = metal ? escapeHtml(metal) : "";
    const safeStone = stone ? escapeHtml(stone) : "";
    
    // Default high-end Unsplash watchmaking background image if none specified
    const defaultImage = "https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&q=80&w=1200";
    const safeImage = escapeHtml(image || defaultImage);

    // Dynamic brand text and localization
    const brandText = "MAISON DOLLARD BIJOUX";
    const taglineText = lang === "FR"
      ? "Authenticité Souveraine & Excellence d'Art — Douala • Yaoundé"
      : "Sovereign Authenticity & Fine Contemporary Artistry — Cameroon";

    // Build elegant golden detail rows on the left side
    const details: string[] = [];
    let xOffset = 0;

    if (safeMetal) {
      details.push(`
        <g transform="translate(${xOffset}, 0)">
          <text fill="#8c8c8c" font-family="'Inter', sans-serif" font-size="11" letter-spacing="0.15em" font-weight="600">${lang === "FR" ? "MÉTAL" : "METAL"}</text>
          <text fill="#ffffff" font-family="'Cinzel', serif" font-size="15" font-weight="600" y="24">${safeMetal.toUpperCase()}</text>
        </g>
      `);
      xOffset += 180;
    }

    if (safeStone) {
      details.push(`
        <g transform="translate(${xOffset}, 0)">
          <text fill="#8c8c8c" font-family="'Inter', sans-serif" font-size="11" letter-spacing="0.15em" font-weight="600">${lang === "FR" ? "GEMME" : "STONE"}</text>
          <text fill="#ffffff" font-family="'Cinzel', serif" font-size="15" font-weight="600" y="24">${safeStone.toUpperCase()}</text>
        </g>
      `);
      xOffset += 170;
    }

    if (safePrice) {
      details.push(`
        <g transform="translate(${xOffset}, 0)">
          <text fill="#c5a880" font-family="'Inter', sans-serif" font-size="11" letter-spacing="0.15em" font-weight="600">${lang === "FR" ? "ESTIMATION" : "VALUE"}</text>
          <text fill="#e2c99f" font-family="'Cinzel', serif" font-size="17" font-weight="700" y="24">${safePrice}</text>
        </g>
      `);
    }

    const detailsGroup = details.length > 0 
      ? `<g transform="translate(80, 360)">${details.join("\n")}</g>` 
      : "";

    // Decide if we display an embedded image or a majestic branded vector art seal
    const displayImage = image && image.startsWith("http");

    const rightPanelContent = displayImage 
      ? `
        <!-- Dynamic Product Photo Frame with Golden Glowing Accent Rings -->
        <g>
          <!-- Outer circular glow -->
          <circle cx="930" cy="315" r="200" fill="none" stroke="url(#gold-metallic)" stroke-width="0.5" stroke-opacity="0.3" />
          <circle cx="930" cy="315" r="195" fill="none" stroke="#ffffff" stroke-width="1" stroke-opacity="0.05" />
          
          <!-- Masked Image -->
          <circle cx="930" cy="315" r="180" fill="#0d0d0d" />
          <image x="750" y="135" width="360" height="360" href="${safeImage}" clip-path="url(#circle-clip)" preserveAspectRatio="xMidYMid slice" />
          
          <!-- Inner elegant framing ring -->
          <circle cx="930" cy="315" r="180" fill="none" stroke="url(#gold-metallic)" stroke-width="2" stroke-opacity="0.6" />
        </g>
      `
      : `
        <!-- High-end Branded Monogram / Master Craftsman Seal -->
        <g transform="translate(930, 315)">
          <!-- Outer delicate gold gear-like structure representing horology -->
          <circle cx="0" cy="0" r="180" fill="none" stroke="url(#gold-metallic)" stroke-opacity="0.08" stroke-width="1" />
          <circle cx="0" cy="0" r="160" fill="none" stroke="url(#gold-metallic)" stroke-opacity="0.2" stroke-width="1.5" />
          <circle cx="0" cy="0" r="140" fill="none" stroke="#ffffff" stroke-opacity="0.03" stroke-width="1" />
          
          <!-- Golden teeth pointers -->
          ${Array.from({ length: 12 }).map((_, i) => {
            const angle = (i * 30 * Math.PI) / 180;
            const x1 = Math.cos(angle) * 160;
            const y1 = Math.sin(angle) * 160;
            const x2 = Math.cos(angle) * 170;
            const y2 = Math.sin(angle) * 170;
            return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="url(#gold-metallic)" stroke-opacity="0.35" stroke-width="1.5" />`;
          }).join("\n")}
          
          <!-- Central majestic crest -->
          <circle cx="0" cy="0" r="100" fill="#0c0c0c" stroke="url(#gold-metallic)" stroke-width="1.5" stroke-opacity="0.7" />
          <circle cx="0" cy="0" r="92" fill="none" stroke="#ffffff" stroke-opacity="0.05" stroke-width="0.5" />
          
          <!-- Majestic 'D' Monogram in golden metal style -->
          <path d="M-22 -40 L5 -40 C28 -40 40 -25 40 0 C40 25 28 40 5 40 L-22 40 Z M-10 -28 L-10 28 L3 28 C18 28 26 18 26 0 C26 -18 18 -28 3 -28 Z" fill="url(#gold-metallic)" />
          
          <!-- Aesthetic Year of Foundation -->
          <text fill="#c5a880" font-family="'Inter', sans-serif" font-size="8" font-weight="600" letter-spacing="0.3em" text-anchor="middle" y="60">EST. 2012</text>
        </g>
      `;

    // High-fidelity social preview SVG card (1200x630 OpenGraph dimensions)
    const svg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Dynamic high-end fonts loaded directly for exact rendering in social previews -->
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&amp;family=Inter:wght@400;500;600;700&amp;family=Playfair+Display:ital,wght@1,500&amp;display=swap');
      
      .brand-title {
        font-family: 'Cinzel', serif;
        font-weight: 700;
        fill: url(#gold-grad);
        letter-spacing: 0.05em;
      }
      .brand-header {
        font-family: 'Cinzel', serif;
        font-weight: 600;
        letter-spacing: 0.28em;
        fill: #ffffff;
      }
      .serif-italic {
        font-family: 'Playfair Display', serif;
        font-style: italic;
        fill: #c5a880;
      }
    </style>
    
    <!-- Deep premium charcoal gradient for back panel -->
    <linearGradient id="back-grad" x1="0" y1="0" x2="1200" y2="630" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#050505" />
      <stop offset="45%" stop-color="#121212" />
      <stop offset="100%" stop-color="#020202" />
    </linearGradient>
    
    <!-- Signature Sovereign Gold gradient -->
    <linearGradient id="gold-grad" x1="0" y1="0" x2="800" y2="0" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#e2c99f" />
      <stop offset="35%" stop-color="#b89355" />
      <stop offset="65%" stop-color="#fdf1d6" />
      <stop offset="100%" stop-color="#936d31" />
    </linearGradient>

    <!-- Border Framing gold gradient -->
    <linearGradient id="gold-border" x1="0" y1="0" x2="1200" y2="630" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#8a6f27" />
      <stop offset="30%" stop-color="#fdf1d6" stop-opacity="0.7" />
      <stop offset="60%" stop-color="#b89355" />
      <stop offset="90%" stop-color="#e2c99f" stop-opacity="0.8" />
      <stop offset="100%" stop-color="#4e3b12" />
    </linearGradient>

    <!-- Circle Clip for Product Image -->
    <clipPath id="circle-clip">
      <circle cx="930" cy="315" r="180" />
    </clipPath>
  </defs>

  <!-- Deep Velvet Back Panel -->
  <rect width="1200" height="630" fill="url(#back-grad)" />
  
  <!-- Precision Inner Gold Framework Border -->
  <rect x="30" y="30" width="1140" height="570" rx="16" fill="none" stroke="url(#gold-border)" stroke-width="1.5" stroke-opacity="0.7" />
  <rect x="42" y="42" width="1116" height="546" rx="12" fill="none" stroke="#ffffff" stroke-width="0.75" stroke-opacity="0.04" />

  <!-- Soft abstract guilloché line designs representing horology craftsmanship -->
  <circle cx="930" cy="315" r="460" fill="none" stroke="#b89355" stroke-opacity="0.02" stroke-width="1" />
  <circle cx="930" cy="315" r="380" fill="none" stroke="#b89355" stroke-opacity="0.03" stroke-width="1" stroke-dasharray="10 6" />
  <circle cx="930" cy="315" r="280" fill="none" stroke="#b89355" stroke-opacity="0.04" stroke-width="1.5" />

  <!-- Top Brand Seal Header -->
  <g transform="translate(80, 85)">
    <!-- Golden crown icon -->
    <path d="M 0 -6 L 5 -13 L 10 -9 L 15 -13 L 20 -6 Z M 0 -3 L 20 -3 L 20 -1 L 0 -1 Z" fill="url(#gold-grad)" />
    <text class="brand-header" font-size="12" x="35" y="6">${brandText}</text>
  </g>

  <!-- Category Flag -->
  <text fill="#c5a880" font-family="'Inter', sans-serif" font-weight="700" font-size="12" letter-spacing="0.22em" x="80" y="195">${safeCategory.toUpperCase()}</text>

  <!-- Majestic Product Name (Adjusts font-size for very long text) -->
  <text class="brand-title" font-size="${safeName.length > 20 ? '36' : '44'}" x="80" y="255">${safeName}</text>

  <!-- Elegant separation ribbon -->
  <line x1="80" y1="285" x2="350" y2="285" stroke="url(#gold-grad)" stroke-width="1.5" stroke-opacity="0.65" />

  <!-- Dynamic specification details block -->
  ${detailsGroup}

  <!-- Footer signature & fine certification text -->
  <text class="serif-italic" font-size="15" x="80" y="525">${taglineText}</text>
  
  <!-- Right Side Visual Showcase -->
  ${rightPanelContent}
</svg>
`;

    res.setHeader("Content-Type", "image/svg+xml");
    res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
    res.status(200).send(svg.trim());
  });

  // 3. Vite middleware for development, static serve for production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite development server mounted as Express middleware.");
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("Serving production static assets from dist/ folder.");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Maison DollarD custom backend running on port ${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Critical: Failed to boot custom full-stack backend:", err);
  process.exit(1);
});
