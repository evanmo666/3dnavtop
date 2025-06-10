import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// 用户模型接口
export interface IUser extends mongoose.Document {
  email: string;
  password: string;
  name: string;
  role: 'admin' | 'user';
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

// 用户模式定义
const UserSchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: [true, 'Email is required'],
    unique: true,
    trim: true, 
    lowercase: true
  },
  password: { 
    type: String, 
    required: [true, 'Password is required'],
    minlength: 6,
    select: false
  },
  name: { 
    type: String, 
    required: [true, 'Name is required'],
    trim: true
  },
  role: { 
    type: String, 
    enum: ['admin', 'user'],
    default: 'user'
  }
}, {
  timestamps: true
});

// 密码加密
UserSchema.pre<IUser>('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error: any) {
    next(error);
  }
});

// 密码比较方法
UserSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

// 避免重复定义模型
export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema); 