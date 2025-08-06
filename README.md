# PowerDC Web Application

PowerDC is a comprehensive web application for analyzing and visualizing power generation data, renewable energy potential, and thermal plant performance. Built with Next.js, TypeScript, and Material-UI, it provides interactive dashboards and data visualization tools for energy sector analysis.

## Features

- **Interactive Dashboards**: Multiple specialized dashboards for different energy analysis scenarios
- **Data Visualization**: Charts, maps, and statistical displays using Highcharts, Chart.js, and Mapbox GL
- **Authentication System**: Secure user authentication with Supabase integration
- **Responsive Design**: Mobile-first design with Material-UI components
- **Real-time Analytics**: Dynamic data filtering and analysis capabilities

## Technology Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **UI Framework**: Material-UI (MUI), Tailwind CSS
- **Authentication**: Supabase Auth
- **Database**: Supabase
- **Mapping**: Mapbox GL JS, React Leaflet
- **Charts**: Highcharts, Chart.js, D3.js
- **Testing**: Jest, React Testing Library
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn package manager
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd PowerDC-Web
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   
   Create a `.env.local` file in the root directory and add your environment variables:
   ```env
   # Supabase Configuration
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   
   # Mapbox Configuration
   NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=your_mapbox_access_token
   
   # Other configuration
   NEXTAUTH_SECRET=your_nextauth_secret
   NEXTAUTH_URL=http://localhost:3000
   ```

4. **Database Setup**
   
   Set up your Supabase database with the required tables and schemas. Refer to the database schema documentation in the `/docs` folder.

5. **Run the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Available Scripts

### Development
- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Run ESLint and fix auto-fixable issues

### Code Quality
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run typecheck` - Run TypeScript type checking

### Testing
- `npm run test` - Run tests once
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage report
- `npm run test:ci` - Run tests in CI mode (no watch, with coverage)

## Project Structure

```
PowerDC-Web/
├── app/                    # Next.js App Router pages and layouts
│   ├── api/               # API routes
│   ├── components/        # Page-specific components
│   ├── dashboard/         # Dashboard pages
│   ├── auth/             # Authentication pages
│   └── layout.tsx        # Root layout
├── components/            # Shared/reusable components
│   ├── auth/             # Authentication components
│   └── ui/               # UI components
├── contexts/             # React contexts
├── lib/                  # Utility libraries and configurations
├── hooks/                # Custom React hooks
├── types/                # TypeScript type definitions
├── public/               # Static assets
├── __tests__/            # Test files
└── docs/                 # Documentation
```

## Key Components

### Authentication
- **SignInForm**: User login interface with email/password and Google OAuth
- **SignUpForm**: User registration interface
- **ProtectedRoute**: Route protection wrapper
- **AuthContext**: Authentication state management

### Dashboards
- **Main Dashboard**: General power generation overview
- **RE Dashboard**: Renewable energy analysis
- **Thermal Dashboard**: Thermal plant performance analysis

### Data Visualization
- **StatisticCard**: Animated statistic display cards
- **Interactive Maps**: Mapbox GL and Leaflet implementations
- **Charts**: Various chart types using Highcharts and Chart.js

## Testing

The application uses Jest and React Testing Library for comprehensive testing:

### Running Tests
```bash
# Run all tests
npm run test

# Run tests in watch mode during development
npm run test:watch

# Generate coverage report
npm run test:coverage
```

### Test Structure
- **Unit Tests**: Individual component and function tests
- **Integration Tests**: Component interaction tests
- **Mocking**: Comprehensive mocking of external dependencies

### Coverage Goals
- **Statements**: >70%
- **Branches**: >70%
- **Functions**: >70%
- **Lines**: >70%

## API Routes

The application includes several API endpoints:

- `/api/user/profile` - User profile management
- `/api/saved-searches` - Saved search functionality
- `/api/subscriptions` - Subscription management
- `/api/usage` - Usage tracking

## Database Schema

The application uses Supabase with the following main tables:
- `users` - User information and profiles
- `saved_searches` - User saved search queries
- `usage_tracking` - API usage tracking
- `subscriptions` - User subscription data

## Deployment

### Vercel (Recommended)

1. **Connect your repository to Vercel**
2. **Configure environment variables** in the Vercel dashboard
3. **Deploy** - Vercel will automatically build and deploy your application

### Manual Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Start the production server**
   ```bash
   npm run start
   ```

## Contributing

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Make your changes**
4. **Run tests** (`npm run test`)
5. **Commit your changes** (`git commit -m 'Add some amazing feature'`)
6. **Push to the branch** (`git push origin feature/amazing-feature`)
7. **Open a Pull Request**

### Development Guidelines

- **Code Style**: Follow the ESLint and Prettier configurations
- **Testing**: Write tests for new components and functions
- **Type Safety**: Use TypeScript for all new code
- **Commits**: Use conventional commit messages
- **Documentation**: Update documentation for significant changes

## Performance Optimization

- **Image Optimization**: Using Next.js Image component
- **Code Splitting**: Automatic code splitting with Next.js
- **Bundle Analysis**: Run `npm run build` to see bundle analysis
- **Caching**: Implemented caching strategies for API calls

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Troubleshooting

### Common Issues

1. **Build Errors**
   - Check Node.js version (>=18.x required)
   - Clear node_modules and reinstall: `rm -rf node_modules package-lock.json && npm install`

2. **Environment Variables**
   - Ensure all required environment variables are set
   - Restart development server after changing .env.local

3. **Database Connection**
   - Verify Supabase configuration
   - Check database permissions and RLS policies

4. **Map Loading Issues**
   - Verify Mapbox access token
   - Check browser console for API errors

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support and questions:
- **Issues**: Open a GitHub issue
- **Documentation**: Check the `/docs` folder
- **Email**: [your-email@domain.com]

## Acknowledgments

- **GridLab** - Research and development support
- **UC Berkeley** - Academic partnership
- **Supabase** - Backend services
- **Vercel** - Deployment platform