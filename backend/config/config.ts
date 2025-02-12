const config = {
  serverUrl: process.env.SERVER_URL || `http://192.168.1.2:5000`,
  port: process.env.PORT || 5000,
  isDevelopment: process.env.NODE_ENV === 'development',
  database: {
    uri: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/fashion_store'
  }
};

export default config;