const mongoose = require('mongoose');

const dbConnect = async () => {
  // Connection states: 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
  const readyState = mongoose.connection.readyState;

  if (readyState !== 1) { // If not connected
    try {
      await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('MongoDB connected');
    } catch (error) {
      console.error('MongoDB connection error:', error);
      // Handle connection error (e.g., retry connection, log error, etc.)
    }
  } else {
    console.log('MongoDB connection already established');
  }
};

export default dbConnect;