# Build Data Center Crisis Section

## Description
Create a compelling problem statement section highlighting the data center power crisis with specific metrics from the AI paper. This section should create urgency for the solution.

## Acceptance Criteria
- [ ] Display key statistics in an engaging grid layout
- [ ] Create timeline comparison visual (traditional vs surplus)
- [ ] Pull accurate data from AI paper document
- [ ] Design responsive statistics cards
- [ ] Add subtle animations for numbers
- [ ] Include source citations where appropriate

## Content Requirements

### Key Statistics to Display
- **500 TWh** - AI data center demand by 2030
- **2,500 GW** - Capacity stuck in interconnection queues  
- **5-6 years** - Average wait time for new connections
- **65-90 GW** - Data center capacity needed by 2029
- **128 GW** - Total US load growth forecast 2025-2029
- **64%** - Only this much of peak load growth covered by planned capacity

### Timeline Visual
```
Traditional Grid Connection:     ━━━━━━━━━━━━━━━━━━━━━━━━━ 5-6 Years
Surplus Interconnection:         ━━━━━━━━ 1-2 Years
                                2025  2026  2027  2028  2029  2030
```

## Design Specifications
- Use card-based layout for statistics
- Implement counter animations for numbers
- Use color coding (red for problems, green for solutions)
- Add icons for each statistic
- Include hover effects for more details

## Files to Create/Modify
- `/app/components/home/DataCenterCrisisSection.tsx`
- `/app/components/home/TimelineComparison.tsx`
- `/app/components/home/StatisticCard.tsx`

## Technical Notes
```typescript
// Example statistic card structure
interface Statistic {
  value: string;
  unit: string;
  label: string;
  description: string;
  icon: ReactNode;
  color: 'danger' | 'warning' | 'info';
}

// Use react-countup for number animations
import CountUp from 'react-countup';
```

## Estimate
**Time:** 4-6 hours  
**Priority:** High  
**Assignee:** Frontend Developer

## Labels
- `frontend`
- `homepage`
- `data-visualization`
- `priority-high`

## Dependencies
None - Can work in parallel

## Testing
- [ ] All statistics display correctly
- [ ] Timeline visual is clear
- [ ] Animations work smoothly
- [ ] Responsive on all devices
- [ ] Data is accurate from source