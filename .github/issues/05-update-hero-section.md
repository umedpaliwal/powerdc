# Redesign Hero Section

## Description
Update the hero section with new commercial messaging focused on data center deployment speed. Keep the existing video background but update all text and CTAs.

## Acceptance Criteria
- [ ] Update main headline to: "Deploy Your Data Center in 18 Months, Not 5 Years"
- [ ] Update sub-headline with grid capacity message
- [ ] Add prominent "Explore Dashboard" button above video
- [ ] Update CTA buttons to link to authentication flow
- [ ] Maintain video background with proper overlay
- [ ] Ensure responsive design for all screen sizes
- [ ] Remove academic paper links
- [ ] Add trust signals (data sources, compliance)

## Design Specifications
```
Hero Section Layout:
┌─────────────────────────────────────┐
│     [Explore Live Dashboard]         │  <- New prominent button
│                                      │
│  Deploy Your Data Center in          │  <- Main headline
│  18 Months, Not 5 Years             │
│                                      │
│  Access 1,000 GW of ready grid      │  <- Sub-headline
│  capacity. Skip the 5-year queue     │
│  with surplus interconnection.       │
│                                      │
│  [Start Free Trial] [View Demo]      │  <- CTAs
│                                      │
│  (Video Background Playing)          │
└─────────────────────────────────────┘
```

## Files to Modify
- `/app/components/new-home/HeroSection.tsx`
- `/app/globals.css` (if needed for new styles)

## Current vs New Copy
| Current | New |
|---------|-----|
| "Scarcity to Surplus" | "Deploy Your Data Center in 18 Months, Not 5 Years" |
| "Leveraging Existing Infrastructure..." | "Access 1,000 GW of ready grid capacity..." |
| Technical Reports buttons | Start Free Trial / View Demo buttons |

## Estimate
**Time:** 2-4 hours  
**Priority:** High  
**Assignee:** Frontend Developer

## Labels
- `frontend`
- `homepage`
- `marketing`
- `priority-high`

## Dependencies
- Works in parallel with auth implementation

## Testing
- [ ] New copy is displayed correctly
- [ ] Video background still works
- [ ] CTAs link to correct pages
- [ ] Responsive on mobile/tablet/desktop
- [ ] Text is readable over video