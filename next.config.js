/** @type {import('next').NextConfig} */

const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin'
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(self), interest-cohort=()'
  },
  {
    key: 'Content-Security-Policy',
    value: `
      default-src 'self';
      script-src 'self' 'unsafe-inline' 'unsafe-eval' blob: https://*.stripe.com https://*.supabase.co https://*.mapbox.com https://api.mapbox.com;
      worker-src 'self' blob:;
      child-src 'self' blob:;
      style-src 'self' 'unsafe-inline' https://*.mapbox.com https://api.mapbox.com;
      img-src 'self' data: blob: https://*.stripe.com https://*.supabase.co https://*.mapbox.com https://api.mapbox.com;
      font-src 'self' data:;
      connect-src 'self' https://*.supabase.co https://*.stripe.com https://*.mapbox.com https://api.mapbox.com wss://*.supabase.co https://events.mapbox.com https://api.emailjs.com;
      frame-src 'self' https://*.stripe.com https://*.youtube.com https://youtube.com;
      object-src 'none';
      base-uri 'self';
      form-action 'self';
      frame-ancestors 'self';
      upgrade-insecure-requests;
    `.replace(/\s{2,}/g, ' ').trim()
  }
]

const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['mapbox-gl'],
  async redirects() {
    return [
      {
        source: '/surplus-interconnection',
        destination: '/solution',
        permanent: true,
      },
      {
        source: '/plans',
        destination: '/pricing',
        permanent: true,
      },
    ]
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ]
  },
  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }

    config.module.rules.push({
      test: /mapbox-gl-csp-worker\.js$/,
      use: {
        loader: 'worker-loader',
        options: {
          filename: 'static/[hash].worker.js',
          publicPath: '/_next/',
          // Disable Fast Refresh for this worker
          // @ts-ignore
          worker: {
            options: {
              plugins: []
            }
          }
        },
      },
    });

    return config;
  },
}

module.exports = nextConfig