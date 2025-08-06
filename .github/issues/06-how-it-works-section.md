# Create Behind-the-Meter Solution Section

## Description
Build a new section explaining how the surplus interconnection solution works, based on the behind-the-meter configuration diagram. This is crucial for educating visitors about the technical solution.

## Acceptance Criteria
- [ ] Create three-column layout for Configuration/Power/Benefits
- [ ] Build or integrate animated diagram showing the solution
- [ ] Add percentage breakdowns (95% solar+battery, 5% gas backup)
- [ ] Include key benefits box with checkmarks
- [ ] Implement smooth scroll animations
- [ ] Ensure responsive design
- [ ] Add hover effects for interactivity

## Visual Design
```
Section Title: "The Behind-the-Meter Advantage"

Three Columns:
┌──────────────┬──────────────┬──────────────┐
│Configuration │Power Flow    │Key Benefits  │
├──────────────┼──────────────┼──────────────┤
│• Data center │• 95% solar+  │✓ Existing    │
│  behind gas  │  battery     │  connection  │
│• Solar+16hr  │• 5% gas      │✓ 95% clean  │
│  battery     │  backup      │✓ 1-2 years  │
└──────────────┴──────────────┴──────────────┘

[Animated Diagram Below]
Gas Plant ─── Grid
    │
    └── Behind-the-Meter
         │
    Data Center ← Solar + Battery
```

## Technical Implementation
- Use Framer Motion for animations
- SVG for the diagram (can be animated)
- Intersection Observer for scroll animations

## Files to Create
- `/app/components/home/HowItWorksSection.tsx`
- `/app/components/home/BehindTheMeterDiagram.tsx`
- `/public/assets/diagrams/btm-solution.svg` (if using SVG)

## Reference Image
Use the provided behind-the-meter solution image as reference for the diagram design.

## Estimate
**Time:** 6-8 hours  
**Priority:** High  
**Assignee:** Frontend Developer

## Labels
- `frontend`
- `homepage`
- `visualization`
- `education`

## Dependencies
None - Can work in parallel

## Testing
- [ ] Three-column layout displays correctly
- [ ] Diagram is clear and understandable
- [ ] Animations work smoothly
- [ ] Section is responsive
- [ ] Content is accurate to the solution