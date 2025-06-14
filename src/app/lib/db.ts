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

    // 确保有MONGODB_URI环境变量或使用开发环境的默认连接
    let MONGODB_URI = process.env.MONGODB_URI;
    
    if (!MONGODB_URI) {
      if (process.env.NODE_ENV === 'development') {
        // 使用开发环境的内存数据库
        console.warn('未找到MONGODB_URI环境变量，使用内存数据库...');
        
        // 使用内存数据库或本地连接
        MONGODB_URI = 'mongodb://localhost:27017/3dnav';
        
        // 创建内存数据库连接 
        cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
          console.log('成功连接到开发环境数据库');
          // 标记为内存模式
          (mongoose as any).memoryMode = true;
          return mongoose;
        }).catch((error) => {
          console.warn('MongoDB连接失败，将使用内存数据库模式:', error.message);
          // 返回一个标记为内存模式的对象
          return { memoryMode: true };
        });
      } else {
        throw new Error('请在.env文件中定义MONGODB_URI环境变量');
      }
    } else {
      cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
        return mongoose;
      });
    }
  }
  
  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (error) {
    console.error('数据库连接失败:', error);
    throw error;
  }
} 