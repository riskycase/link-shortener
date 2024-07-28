module.exports = {
  apps: [
    {
      name: "Link Shortener",
      script: "./node_modules/next/dist/bin/next",
      args: "start",
      env: {
        PORT: 5132,
        NEXTAUTH_URL: "https://short.riskycase.in",
        AUTH_TRUST_HOST: "https://short.riskycase.in",
      },
    },
  ],
};
