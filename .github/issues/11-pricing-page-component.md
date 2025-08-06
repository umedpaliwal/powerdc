# Build Pricing Page with Tiers

## Description
Create a dedicated pricing page showcasing the three tiers (Explorer, Professional, Enterprise) with clear feature comparisons and CTAs for sign-up.

## Acceptance Criteria
- [ ] Create three pricing cards (Explorer, Professional, Enterprise)
- [ ] Include feature comparison table
- [ ] Add "Most Popular" badge to Professional tier
- [ ] Show pricing clearly ($0, $99/month, Custom)
- [ ] Include CTAs that link to sign-up with plan pre-selected
- [ ] Add FAQ section about pricing
- [ ] Ensure responsive design
- [ ] Include annual vs monthly toggle (if applicable)

## Pricing Structure

### Explorer (Free)
- View all 1,500+ sites
- Basic site information
- 10 site reports/month
- Community support
- [Sign Up Free →]

### Professional ($99/month)
**Most Popular**
- Everything in Explorer, plus:
- Unlimited site reports
- Download CSV/Excel exports
- Advanced filtering & search
- Economic modeling tools
- Land analysis layers
- Priority support
- API access (100 calls/day)
- [Start 14-Day Trial →]

### Enterprise (Custom)
- Everything in Professional, plus:
- Unlimited API access
- Custom analysis
- White-label options
- Dedicated support
- SSO integration
- SLA guarantee
- [Contact Sales →]

## Feature Comparison Table
```
Feature                    Explorer    Professional    Enterprise
─────────────────────────────────────────────────────────────────
View all sites            ✅          ✅              ✅
Basic site info           ✅          ✅              ✅
Site reports/month        10          Unlimited       Unlimited
Data exports              ❌          ✅              ✅
Advanced filtering        ❌          ✅              ✅
Economic modeling         ❌          ✅              ✅
Land analysis            ❌          ✅              ✅
API access               ❌          100/day         Unlimited
Support                  Community    Priority        Dedicated
White-label              ❌          ❌              ✅
SSO                      ❌          ❌              ✅
```

## Files to Create
- `/app/pricing/page.tsx` - Main pricing page
- `/components/pricing/PricingCard.tsx` - Individual pricing card
- `/components/pricing/PricingComparison.tsx` - Feature comparison table
- `/components/pricing/PricingFAQ.tsx` - FAQ section

## Technical Implementation
```typescript
interface PricingTier {
  name: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  ctaText: string;
  ctaLink: string;
  badge?: string;
}

// Handle plan selection in URL
const handlePlanSelect = (plan: string) => {
  router.push(`/signup?plan=${plan}`);
};
```

## FAQ Content
- What's included in the free tier?
- Can I change plans anytime?
- Is there a contract?
- What payment methods do you accept?
- Do you offer discounts for annual billing?
- What happens when I exceed my limits?

## Estimate
**Time:** 6-8 hours  
**Priority:** Medium  
**Assignee:** Frontend Developer

## Labels
- `frontend`
- `pricing`
- `conversion`
- `marketing`

## Dependencies
- Related to: #2 (Sign-up flow)

## Testing
- [ ] All three tiers display correctly
- [ ] Feature comparison is accurate
- [ ] CTAs link to correct sign-up flow
- [ ] Responsive on all devices
- [ ] FAQ accordion works properly