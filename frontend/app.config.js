export default {
  expo: {
    // other configurations
    extra: {
      apiUrl: process.env.API_URL || 'http://localhost:5000'
    },
    "expo": {
      "assetBundlePatterns": ["**/*"]
    }
  }
};