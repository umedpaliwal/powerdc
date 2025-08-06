# PowerDC GitHub Issues & Worktrees Setup

## Worktrees Created

The following worktrees have been created for parallel development:

```bash
PowerDC/
├── PowerDC-Web/              # Main branch
├── PowerDC-Web-auth/         # feature/authentication
├── PowerDC-Web-homepage/     # feature/homepage-redesign  
├── PowerDC-Web-pricing/      # feature/pricing-billing
└── PowerDC-Web-dashboard/    # feature/dashboard-access
```

### Working with Worktrees

To work on a specific feature:
```bash
# Navigate to the worktree
cd ../PowerDC-Web-auth

# Install dependencies
npm install

# Start development
npm run dev

# Make changes and commit
git add .
git commit -m "feat: implement authentication"

# Push to remote
git push origin feature/authentication
```

## Issues to Create on GitHub

### Milestone 1: Authentication System (Priority: HIGH)
1. **[#1] Setup Supabase Authentication** - 4-6 hours
2. **[#2] Create Sign Up Flow with Plan Selection** - 8-12 hours  
3. **[#3] Create Sign In Page** - 4-6 hours
4. **[#4] Implement Protected Routes & Middleware** - 6-8 hours

**Worktree:** `PowerDC-Web-auth`

### Milestone 2: Homepage Redesign (Priority: HIGH)
5. **[#5] Redesign Hero Section** - 2-4 hours
6. **[#6] Create Behind-the-Meter Solution Section** - 6-8 hours
7. **[#7] Build Data Center Crisis Section** - 4-6 hours
8. **[#8] Create Gas Plant vs Surplus Comparison Table** - 4-5 hours
9. **[#9] Build Platform Features Grid** - 4-5 hours

**Worktree:** `PowerDC-Web-homepage`

### Milestone 3: Pricing & Billing (Priority: MEDIUM)
10. **[#10] Create Subscription Database Schema** - 4-6 hours
11. **[#11] Build Pricing Page with Tiers** - 6-8 hours

**Worktree:** `PowerDC-Web-pricing`

### Milestone 4: Dashboard Access Control (Priority: HIGH)
12. **[#12] Implement Dashboard Access Control** - 8-10 hours
13. **[#13] Create User Account Management Pages** - 10-12 hours

**Worktree:** `PowerDC-Web-dashboard`

## How to Create Issues on GitHub

1. Go to your repository: https://github.com/umedpaliwal/powerdc/issues
2. Click "New Issue"
3. Copy the content from each markdown file in this directory
4. Create the issue with appropriate labels

### Suggested Labels to Create
- `frontend` - Frontend development
- `backend` - Backend development
- `fullstack` - Requires both frontend and backend
- `authentication` - Auth related
- `homepage` - Homepage updates
- `dashboard` - Dashboard modifications
- `database` - Database schema
- `priority-high` - Must be done first
- `priority-medium` - Important but not blocking
- `priority-low` - Nice to have

## Development Workflow

### For Team Members

1. **Pick an Issue**
   - Assign yourself to an issue
   - Move it to "In Progress" on the project board

2. **Switch to Appropriate Worktree**
   ```bash
   cd ../PowerDC-Web-[feature]
   ```

3. **Create Feature Branch** (if needed)
   ```bash
   git checkout -b feature/issue-number-description
   ```

4. **Development**
   - Make changes
   - Test thoroughly
   - Commit with meaningful messages

5. **Create Pull Request**
   ```bash
   git push origin feature/branch-name
   ```
   - Reference issue number in PR description
   - Request review from team members

6. **After Merge**
   - Delete feature branch
   - Move issue to "Done"

## Priority Order

### Week 1-2: Critical Path
- Issues #1-4 (Authentication) - One developer
- Issues #5-6 (Hero & How It Works) - Another developer
- Issue #10 (Database Schema) - Backend developer

### Week 2-3: Core Features  
- Issues #7-9 (Homepage sections) - Frontend team
- Issue #11 (Pricing page) - One developer
- Issue #12 (Dashboard access) - Full-stack developer

### Week 3-4: Polish
- Issue #13 (Account pages) - Full-stack developer
- Testing and bug fixes
- Documentation

## Git Commands Reference

### List all worktrees
```bash
git worktree list
```

### Remove a worktree after merging
```bash
git worktree remove ../PowerDC-Web-auth
```

### Clean up deleted remote branches
```bash
git remote prune origin
```

### Check branch status
```bash
git branch -a
```

## Environment Variables Required

Create `.env.local` in each worktree:
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_key

# Stripe (for payments)
STRIPE_SECRET_KEY=your_stripe_secret
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_public

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Questions?

For any questions about the issues or worktrees:
1. Check this README first
2. Ask in the team Slack/Discord
3. Create a discussion on GitHub

---

**Total Estimated Hours:** ~80-100 hours
**Team Size Recommended:** 3-4 developers
**Timeline:** 3-4 weeks with parallel work