/** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   swcMinify: true,
// };

const withTM = require('next-transpile-modules')(['opize-design-system']);
module.exports = {
    ...withTM({}),
    images: {
        domains: ['lh3.googleusercontent.com', 's3.hyuns.dev', 'static.hyuns.dev', 'media.discordapp.net'],
    },
    swcMinify: false,
    compiler: {
        styledComponents: true,
    },
};
