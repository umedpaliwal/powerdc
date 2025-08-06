# Build Platform Features Grid

## Description
Create a comprehensive features grid showcasing the PowerDC platform capabilities organized into three pillars: Power Plant Analysis, Adjacent Site Intelligence, and Optimal Portfolio Builder.

## Acceptance Criteria
- [ ] Create three-column grid layout
- [ ] Include icons for each feature
- [ ] Add hover effects for feature cards
- [ ] Display specific metrics and capabilities
- [ ] Ensure responsive design (stacks on mobile)
- [ ] Include "Learn More" links where appropriate
- [ ] Add subtle animations

## Feature Categories

### Power Plant Analysis
- 1,500+ thermal plants analyzed
- Real-time capacity factors
- Variable cost tracking
- Interconnection capacity available
- Operating patterns & utilization
- Plant retirement schedules
- Emissions data

### Adjacent Site Intelligence  
- Land availability within 6 miles
- Satellite imagery analysis
- Zoning & permitting status
- Solar/wind resource quality
- Distance to fiber networks
- Environmental constraints
- Urban area percentage

### Optimal Portfolio Builder
- Hourly generation modeling (8,760 hours)
- Solar + wind + battery optimization
- LCOE calculations with IRA incentives
- Multiple clean energy scenarios (50%, 75%, 95%)
- 20-year economic projections
- Payback period analysis
- Carbon reduction metrics

## Design Specifications
```
Platform Features Section
┌─────────────────┬─────────────────┬─────────────────┐
│ 🏭 Power Plant  │ 🗺️ Site Intel   │ 📊 Portfolio    │
│    Analysis     │                 │    Builder      │
├─────────────────┼─────────────────┼─────────────────┤
│ • 1,500+ plants │ • Land analysis │ • Hourly model  │
│ • Capacity data │ • Satellite img │ • LCOE w/ IRA   │
│ • Cost tracking │ • Zoning info   │ • Optimization  │
│ • Grid capacity │ • Wind/solar    │ • 20-yr forecast│
└─────────────────┴─────────────────┴─────────────────┘
```

## Files to Create
- `/app/components/home/PlatformFeaturesGrid.tsx`
- `/app/components/home/FeatureCard.tsx`
- `/app/components/home/FeatureIcon.tsx`

## Technical Implementation
```typescript
interface Feature {
  icon: ReactNode;
  title: string;
  items: string[];
  color: string;
  link?: string;
}

// Use CSS Grid for layout
.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}
```

## Estimate
**Time:** 4-5 hours  
**Priority:** Medium  
**Assignee:** Frontend Developer

## Labels
- `frontend`
- `homepage`
- `features`
- `marketing`

## Dependencies
None - Can work in parallel

## Testing
- [ ] All three columns display correctly
- [ ] Features are accurately described
- [ ] Responsive design works
- [ ] Hover effects are smooth
- [ ] Icons load properly