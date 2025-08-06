# Create New Gas Plant vs Surplus Interconnection Comparison

## Description
Build a compelling comparison table showing why surplus interconnection is superior to building new gas plants. Use checkmarks and X marks for visual impact.

## Acceptance Criteria
- [ ] Create comparison table with 8+ comparison points
- [ ] Use visual checkmarks (✅) and X marks (❌)
- [ ] Include timeline comparisons
- [ ] Add hover tooltips for more information
- [ ] Ensure mobile-responsive table design
- [ ] Highlight the advantages clearly
- [ ] Add subtle animations on scroll

## Comparison Points

| Challenge | New Gas Plant | Surplus Interconnection |
|-----------|---------------|------------------------|
| Turbine Delivery | ❌ 5-6 year backlog | ✅ Turbine already installed |
| Grid Studies | ❌ 2-3 years | ✅ Expedited process (6 months) |
| Transmission Upgrades | ❌ Required ($10M+) | ✅ Uses existing infrastructure |
| Transformer Wait | ❌ 2-4 years | ✅ Already in place |
| Permitting | ❌ Complex new facility | ✅ Add-on to existing site |
| Total Timeline | ❌ 5-8 years | ✅ 1-2 years |
| Carbon Profile | ❌ 100% fossil | ✅ 95% clean energy |
| Stranded Asset Risk | ❌ High | ✅ Flexible, modular |
| Capital Efficiency | ❌ $1B+ for new plant | ✅ $200-400M for solar+battery |
| Grid Reliability | ❌ Single source | ✅ Dual source (solar+gas) |

## Design Requirements
- Use alternating row colors for readability
- Make the checkmarks green and X marks red
- Add subtle shadow/border for the table
- Include a title: "Why Not Just Build New Gas Plants?"
- Add a summary statement below the table

## Files to Create
- `/app/components/home/ComparisonTable.tsx`
- `/app/components/home/ComparisonRow.tsx`

## Technical Implementation
```typescript
interface ComparisonItem {
  challenge: string;
  newGasPlant: {
    status: 'negative' | 'positive';
    text: string;
    tooltip?: string;
  };
  surplusInterconnection: {
    status: 'negative' | 'positive';
    text: string;
    tooltip?: string;
  };
}
```

## Estimate
**Time:** 4-5 hours  
**Priority:** High  
**Assignee:** Frontend Developer

## Labels
- `frontend`
- `homepage`
- `comparison`
- `visualization`

## Dependencies
None - Can work in parallel

## Testing
- [ ] Table displays all comparison points
- [ ] Visual indicators are clear
- [ ] Tooltips work on hover
- [ ] Table is responsive on mobile
- [ ] Content is factually accurate