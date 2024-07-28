module.exports = {
  apps: [
    {
      name: "Link Shortener",
      script: "./node_modules/next/dist/bin/next",
      args: "start",
      env: {
        PORT: 5132,
      },
    },
  ],
};
