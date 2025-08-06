/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['mapbox-gl'],
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