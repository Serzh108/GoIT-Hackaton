import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'inharmony-v2.h.goit.study',
        port: '',
        pathname: '/images/all/**',
      },
    ],
  },
  //! Webpack (build/prod) — увімкнути SVGR і прибрати svg з дефолтного лоадера картинок
  webpack(config) {
    const fileLoaderRule = config.module.rules.find((rule: any) =>
      rule.test?.test?.('.svg')
    );
    if (fileLoaderRule) {
      fileLoaderRule.exclude = /\.svg$/i;
    }
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            svgo: true,
            svgoConfig: {
              plugins: [
                { name: 'removeViewBox', active: false },
                { name: 'removeAttrs', params: { attrs: '(fill|stroke)' } },
              ],
            },
            titleProp: true,
          },
        },
      ],
    });

    return config;
  },
  //! Turbopack (dev) — вмикаємо SVGR і тут
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
};

export default nextConfig;
