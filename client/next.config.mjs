/** @type {import('next').NextConfig} */
const nextConfig = {
    serverRuntimeConfig: {
        // API URI For server-side
        apiUri: process.env.API_URI,
      },    
};

export default nextConfig;
