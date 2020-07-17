module.exports = {
  webpack: (config, { dev }) => {
    if (dev) {
      config.devtool = 'eval';
    }

    return config;
  },
};
