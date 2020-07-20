module.exports = {
  webpack: (config, { dev }) => {
    if (dev) {
      // config.devtool = 'eval';
      config.devtool = 'cheap-module-source-map';
    }

    return config;
  },
};
