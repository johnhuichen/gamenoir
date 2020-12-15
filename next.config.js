module.exports = {
  webpack: (config, { isServer }) => {
    if (isServer) {
      require("./generateSiteMap");
    }

    return config;
  },
};
