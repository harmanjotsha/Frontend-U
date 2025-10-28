const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Try Atlas first, then fall back to local MongoDB
    const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/udaan';
    
    console.log('Attempting to connect to:', uri.includes('mongodb+srv') ? 'MongoDB Atlas' : 'Local MongoDB');
    
    await mongoose.connect(uri, { 
      useNewUrlParser: true, 
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
    });
    
    console.log('✅ MongoDB connected successfully');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    
    // If Atlas fails, try local MongoDB
    if (process.env.MONGO_URI && process.env.MONGO_URI.includes('mongodb+srv')) {
      console.log('🔄 Atlas connection failed, trying local MongoDB...');
      try {
        await mongoose.connect('mongodb://localhost:27017/udaan', {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
        console.log('✅ Connected to local MongoDB successfully');
        console.log('💡 Note: Using local database. To use Atlas, please whitelist your IP address.');
        return;
      } catch (localErr) {
        console.error('❌ Local MongoDB also failed:', localErr.message);
        console.log('💡 Install MongoDB locally or fix Atlas connection.');
      }
    }
    
    console.log('\n🔧 SOLUTIONS:');
    console.log('1. Whitelist your IP in MongoDB Atlas (see instructions below)');
    console.log('2. Install MongoDB locally: https://docs.mongodb.com/manual/installation/');
    console.log('3. Use MongoDB Atlas with correct IP whitelist\n');
    
    // Don't exit, let the app run without DB for now
    console.log('⚠️  Server will continue running without database connection');
  }
};

module.exports = connectDB;
