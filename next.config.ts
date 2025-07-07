import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    if (isServer) {
      // On the server side, handle native modules
      config.externals = config.externals || []
      config.externals.push({
        '@lazai-labs/alith-darwin-arm64': 'commonjs @lazai-labs/alith-darwin-arm64',
      })
    } else {
      // On the client side, don't bundle native modules
      config.resolve.fallback = {
        ...config.resolve.fallback,
        '@lazai-labs/alith-darwin-arm64': false,
        alith: false,
      }
    }

    return config
  },
  // Mark packages as external for server components
  serverExternalPackages: ['@lazai-labs/alith-darwin-arm64', 'alith'],
}

export default nextConfig
