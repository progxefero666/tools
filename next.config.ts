import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: false,
  transpilePackages: ['three'],
  experimental: {
    serverActions: {
      bodySizeLimit: '50mb',
    }
  },
  serverExternalPackages: ['@napi-rs/canvas'],
  webpack: (config: any) => {  // <- Usamos `any` para evitar problemas de tipos
    // Configuración existente
    config.externals.push({
      'canvas': 'commonjs canvas',
      '@napi-rs/canvas': 'commonjs @napi-rs/canvas'
    });

    // Regla SVG (¡esto SÍ funciona con `any`!)
    config.module.rules.push({
      test: /\.svg$/,
      use: ['raw-loader']
    });

    return config;
  }
};

export default nextConfig;