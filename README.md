# Ahmad Farooq Portfolio — Neo-Brutalism Edition

A bold, Neo-Brutalism portfolio built with React and Vite. Thick borders, offset shadows, acid colors, and raw aesthetics.

## Quick Deploy

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Locally

```bash
npm run dev
```

Open `http://localhost:5173` in your browser.

### 3. Build for Production

```bash
npm run build
```

Output goes to the `dist` folder.

---

## Deploy to Vercel (Recommended)

### Option A: Push to GitHub, then Connect

```bash
# Initialize git
git init
git add .
git commit -m "Neo-Brutalism portfolio"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

Then:
1. Go to vercel.com and sign in with GitHub
2. Click "New Project"
3. Import your repository
4. Vercel auto-detects Vite. Click "Deploy"
5. Your site is live at `your-project.vercel.app`

### Option B: Vercel CLI (Faster)

```bash
npm i -g vercel
vercel
```

Follow the prompts. Done in 30 seconds.

---

## How to Add Your Profile Photo

### Step 1: Prepare the Image

For the clean floating look, remove the background first:
- Go to remove.bg and upload your photo
- Download the transparent PNG

### Step 2: Add to Project

Save your photo as `profile.png` in the `public/assets/images/` folder.

### Step 3: Update the Code

In `src/App.jsx`, find the hero section with "Your Photo Here" and replace the placeholder div with:

```jsx
<img
  src="/assets/images/profile.png"
  alt="Ahmad Farooq"
  style={{
    width: 260,
    height: 320,
    objectFit: "cover",
    border: "4px solid #1A1A1A",
    boxShadow: "8px 8px 0 #1A1A1A",
    transform: "rotate(2deg)",
  }}
/>
```

Keep the "THAT'S ME" annotation sticker below the image for the brutalism effect.

---

## How to Set Up Email Collection (Formspree)

The portfolio uses Formspree for email subscriptions on the Blog and Playbook pages.

### Step 1: Create Your Formspree Form

1. Go to formspree.io and create a free account
2. Click "New Form" and name it "Portfolio Subscribers"
3. Copy your form ID (looks like `xabcdefg`)

### Step 2: Update the Code

In `src/App.jsx`, search for `formspree.io/f/xpznqkao` and replace `xpznqkao` with your form ID.

There are two places to update:
- Blog page subscribe form
- Playbook page notify form

### Step 3: Test

Deploy, then submit a test email. Check your Formspree dashboard.

### Free Plan

50 submissions per month on free tier. Upgrade for more, or switch to ConvertKit, Mailchimp, or Buttondown.

---

## How to Add Calendly Booking

Replace the calendar mockup on the Book page:

1. Sign up at calendly.com
2. Create a 30 minute event type
3. Get your link (like `calendly.com/yourname/30min`)
4. In the Book page component, replace the calendar mockup with:

```jsx
<iframe
  src="https://calendly.com/yourname/30min"
  width="100%"
  height="650"
  frameBorder="0"
  style={{
    border: "3px solid #1A1A1A",
    boxShadow: "5px 5px 0 #1A1A1A",
  }}
/>
```

---

## Custom Domain

### On Vercel

1. Project Settings > Domains > Add your domain
2. Add DNS records at your registrar:
   - Type: A, Name: @, Value: 76.76.21.21
   - Type: CNAME, Name: www, Value: cname.vercel-dns.com
3. SSL is automatic

---

## Project Structure

```
portfolio-neobrutalism/
├── index.html              # Entry HTML with font imports
├── package.json            # Dependencies and scripts
├── vite.config.js          # Vite configuration
├── .gitignore
├── public/
│   └── assets/
│       ├── fonts/          # Self-hosted fonts (optional)
│       ├── icons/          # SVG icons
│       └── images/         # Profile photo, project images
└── src/
    ├── index.jsx           # React entry point
    ├── App.jsx             # Complete application
    └── styles/
        ├── global.css      # CSS variables and resets
        ├── animations.css  # All keyframe animations
        └── brutalism.css   # Neo-Brutalism component styles
```

---

## Updating Content

### Add a New Service

In `App.jsx`, add a new entry to the `SVC` object following the existing pattern:

```jsx
newservice: {
  title: "Service Name",
  ac: P.orange,  // accent color
  overview: "Description...",
  inc: [{ t: "Feature", d: "Description" }],
  cases: [{ v: "visual", name: "Case Study", challenge: "...", solution: "...", results: "..." }],
  process: [{ t: "Step", d: "Description" }],
}
```

Then add routing in the `render()` function and navigation in the Header.

### Add a New Design Project

Add a new entry to the `StudioProject` component's `projects` object and include it in the DesignPage projects array.

### Update Client List

In the HomePage component, modify the `clients` array with name and brand color.

---

## Redeploying

After any changes:

```bash
git add .
git commit -m "Updated portfolio"
git push
```

Vercel auto-deploys in 30 to 60 seconds.

---

## Design System

| Element | Style |
|---------|-------|
| Borders | 3px solid #1A1A1A |
| Shadows | 5px 5px 0 #1A1A1A |
| Hover Shadow | 8px 8px 0 #1A1A1A |
| Background | #FFF5E1 (warm cream) |
| Primary | #FF4D00 (orange) |
| Accent | #A6FF00 (acid lime) |
| Secondary | #0066FF, #FF6B9D, #7B2FFF |
| Heading Font | Outfit (300-900) |
| Body Font | Sora (300-700) |
