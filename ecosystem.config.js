module.exports = {
  apps: [
    {
      name: "Link Shortener",
      script: "./.next/standalone/server.js",
      env: {
        PORT: 5132,
        NEXTAUTH_URL: "https://short.riskycase.in",
        AUTH_TRUST_HOST: "https://short.riskycase.in",
      },
    },
  ],
};
