// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     domains: ['cdn.myanimelist.net',"img1.ak.crunchyroll.com","images.wondershare.com","lh3.googleusercontent.com","s.gravatar.com"],
//   },
// }

// module.exports = nextConfig

// @ts-check

/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
!process.env.SKIP_ENV_VALIDATION && (await import("./env.mjs"));

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  experimental: { appDir: false },
  /**
   * If you have the "experimental: { appDir: true }" setting enabled, then you
   * must comment the below `i18n` config out.
   *
   * @see https://github.com/vercel/next.js/issues/41980
   */
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  images: {
    domains: ['cdn.myanimelist.net',"img1.ak.crunchyroll.com","images.wondershare.com","lh3.googleusercontent.com","s.gravatar.com"],
  },
};
export default config;