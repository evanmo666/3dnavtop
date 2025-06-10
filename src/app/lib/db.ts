import mongoose from 'mongoose';

// 缓存数据库连接
let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { 
    conn: null, 
    promise: null 
  };
}

// 连接到MongoDB
export async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    // 确保有MONGODB_URI环境变量
    const MONGODB_URI = process.env.MONGODB_URI;
    
    if (!MONGODB_URI) {
      throw new Error('请在.env文件中定义MONGODB_URI环境变量');
    }

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }
  
  cached.conn = await cached.promise;
  return cached.conn;
} 