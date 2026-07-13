# Builtium Website - AI Builder Instructions

## Design System

### Color Palette
- **Primary Background:** #ffffff (white)
- **Primary Text:** #000000 (black)
- **Accent Color:** #3a7bff (bright blue)
- **Secondary/Shadow Color:** #cfe8ff (light blue)

### Typography
- **Font Family:** Poppins (all text)
- **Import:** Google Fonts - Poppins (weights: 400, 500, 600, 700)

### Spacing & Layout
- Grid-based layout with consistent padding
- No border radius (sharp corners)
- High contrast maintained throughout

---

## Page Structure & Sections

### Global Settings
- **Body Background:** #ffffff
- **Body Text Color:** #000000
- **Font Family:** Poppins
- **Line Height:** 1.6 for body text, 1.2 for headings

---

## Section 1: Hero Section

**Background:** #ffffff
**Layout:** Full viewport height, centered content

**Headline:**
- Text: "We build digital foundations for people shaping the future."
- Font Size: 64px
- Font Weight: 700
- Color: #000000
- Line Height: 1.2
- Margin Bottom: 24px

**Subheading:**
- Text: "A digital studio focused on modern brands, clean websites, and structured launches."
- Font Size: 20px
- Font Weight: 400
- Color: #000000
- Opacity: 0.8
- Margin Bottom: 40px

**CTA Button:**
- Text: "Start a project"
- Background: #3a7bff
- Text Color: #ffffff
- Font Size: 16px
- Font Weight: 600
- Padding: 16px 32px
- Border: none
- Cursor: pointer
- Hover State: Darken background slightly or add #cfe8ff shadow

**Spacing:**
- Top/Bottom Padding: 80px
- Horizontal Padding: 40px

---

## Section 2: Services Section

**Background:** #ffffff
**Border Top:** 1px solid #cfe8ff

**Section Headline:**
- Text: "Services"
- Font Size: 48px
- Font Weight: 700
- Color: #000000
- Margin Bottom: 60px

**Services List:** Three items, displayed as cards or simple list items

**Each Service Item:**

1. **Service Title**
   - Font Size: 24px
   - Font Weight: 600
   - Color: #000000
   - Margin Bottom: 12px

2. **Service Description**
   - Font Size: 16px
   - Font Weight: 400
   - Color: #000000
   - Opacity: 0.7
   - Margin Bottom: 32px

**Services Content:**

1. **Brand identity & visual systems**
   - "Build consistent, recognizable visual language across all touchpoints."

2. **Modern website design & development**
   - "Fast, accessible, beautifully designed websites that convert."

3. **Digital launch support & structure**
   - "Structured guidance to launch with clarity and credibility."

**Supporting Copy (below services list):**
- Text: "Designed to help founders and businesses launch with clarity and credibility."
- Font Size: 18px
- Font Weight: 400
- Color: #000000
- Opacity: 0.7
- Margin Top: 60px

**Spacing:**
- Top/Bottom Padding: 80px
- Horizontal Padding: 40px

---

## Section 3: Positioning / Rationale Section

**Background:** #cfe8ff
**Text Color:** #000000

**Headline:**
- Text: "Why we exist now"
- Font Size: 48px
- Font Weight: 700
- Color: #000000
- Margin Bottom: 40px

**Body Copy:**
- Text: "Builtium exists to build credibility first — through real projects, real results, and disciplined design. We build for others today. We build the tools tomorrow."
- Font Size: 20px
- Font Weight: 400
- Color: #000000
- Line Height: 1.8
- Max Width: 600px

**Spacing:**
- Top/Bottom Padding: 80px
- Horizontal Padding: 40px

---

## Section 4: Vision Section

**Background:** #ffffff
**Border Top:** 1px solid #cfe8ff

**Headline:**
- Text: "The future"
- Font Size: 48px
- Font Weight: 700
- Color: #000000
- Margin Bottom: 40px

**Body Copy:**
- Text: "Builtium is evolving into a business-building platform — helping founders plan, build, and launch companies with structured guidance and AI-powered tools."
- Font Size: 20px
- Font Weight: 400
- Color: #000000
- Opacity: 0.8
- Line Height: 1.8
- Max Width: 600px

**Spacing:**
- Top/Bottom Padding: 80px
- Horizontal Padding: 40px

---

## Section 5: Contact Section

**Background:** #ffffff
**Border Top:** 1px solid #cfe8ff

**Headline:**
- Text: "Start a conversation"
- Font Size: 48px
- Font Weight: 700
- Color: #000000
- Margin Bottom: 40px

**Email Link:**
- Text: "hello@builtiumco.com"
- Font Size: 28px
- Font Weight: 600
- Color: #3a7bff
- Text Decoration: none
- Hover State: Underline + slight color shift
- Link: mailto:hello@builtiumco.com

**Spacing:**
- Top/Bottom Padding: 80px
- Horizontal Padding: 40px

---

## Navigation (Optional)

**Position:** Fixed top, or sticky header
**Background:** #ffffff
**Border Bottom:** 1px solid #cfe8ff

**Navigation Items:**
- About (anchor to Services)
- Services (anchor to Services)
- Vision (anchor to Vision)
- Contact (anchor to Contact)

**Font Size:** 14px
**Font Weight:** 500
**Color:** #000000
**Hover Color:** #3a7bff

**Padding:** 20px 40px

---

## Responsive Design

### Tablet (768px - 1024px)
- Hero Headline: 48px
- Section Headlines: 36px
- Padding: 40px 24px
- Button: 16px 28px

### Mobile (320px - 767px)
- Hero Headline: 36px
- Section Headlines: 28px
- Body Text: 16px
- Padding: 24px 16px
- Button: 14px 24px
- Font Size: 16px minimum for tap targets

---

## General Requirements

- **Scroll Behavior:** Smooth scrolling enabled
- **Images:** No stock photography; use typography-led design
- **Animations:** Minimal fade-in on scroll (optional, subtle)
- **Load Time:** Optimize for fast performance
- **SEO:** Include meta tags (title, description, og:image, og:url)
- **Accessibility:** 
  - ARIA labels where needed
  - Color contrast meets WCAG AA standards
  - Keyboard navigation functional
  - Semantic HTML

---

## Deployment

- **Protocol:** HTTPS enabled
- **Domain:** builtiumco.com
- **Hosting:** Fast, reliable hosting (Vercel, Netlify, or similar)
- **Performance:** Optimize CSS and minimize unused code

---

## Notes for Builder

1. Maintain black/white + blue color discipline — no additional colors
2. Use #cfe8ff as subtle divider/background accent only
3. Typography is the primary design element — leverage font weight and size
4. Keep spacing generous and consistent
5. All buttons and links use #3a7bff as primary interactive color
6. No complex animations — minimize for performance
7. Ensure mobile-first responsive approach

---

## Success Checklist

- [ ] All sections render correctly on desktop, tablet, mobile
- [ ] Typography hierarchy is clear and consistent
- [ ] Color palette is applied correctly throughout
- [ ] Email link is functional
- [ ] Page loads in under 3 seconds
- [ ] Mobile touch targets are 44px+ minimum
- [ ] Navigation anchors work smoothly
- [ ] Meta tags are populated
- [ ] Accessibility standards met (WCAG AA)