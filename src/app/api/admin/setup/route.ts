import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/app/lib/db';
import User from '@/app/models/User';
import bcrypt from 'bcryptjs';
import memoryDB from '@/app/lib/memorydb';

export async function POST(req: NextRequest) {
  try {
    let useMemoryDB = false;
    
    try {
      // 尝试连接数据库
      const dbConnection = await connectDB();
      // 检查是否使用内存数据库模式
      useMemoryDB = !!(dbConnection as any)?.memoryMode;
      console.log("管理员设置 - 数据库连接模式:", useMemoryDB ? "内存模式" : "MongoDB模式");
    } catch (error) {
      console.error("数据库连接失败，切换到内存模式:", error);
      useMemoryDB = true;
    }
    
    // 在开发环境下，允许强制创建管理员账号（覆盖现有账号）
    const { force } = await req.json().catch(() => ({}));
    const isDev = process.env.NODE_ENV === 'development';
    
    let adminExists;
    
    // 检查是否已有管理员账号
    if (useMemoryDB) {
      adminExists = await memoryDB.findUserByRole('admin');
    } else {
      adminExists = await User.findOne({ role: 'admin' });
    }
    
    if (adminExists) {
      // 如果是开发环境且请求强制创建，则删除现有管理员
      if (isDev && force) {
        if (useMemoryDB) {
          await memoryDB.deleteUsersByRole('admin');
        } else {
          await User.deleteMany({ role: 'admin' });
        }
        console.log('开发环境：已删除现有管理员账号');
      } else {
        return NextResponse.json({ 
          success: false, 
          message: '管理员账号已存在',
          admin: {
            email: adminExists.email,
            name: adminExists.name
          }
        }, { status: 400 });
      }
    }
    
    // 创建默认管理员账号
    const adminEmail = isDev ? 'admin@3dnav.top' : process.env.ADMIN_EMAIL || 'admin@3dnav.top';
    
    // 在开发环境使用简单密码，生产环境使用随机密码或环境变量
    const adminPassword = isDev 
      ? 'admin123456'
      : process.env.ADMIN_PASSWORD || Math.random().toString(36).slice(-10);
    
    let adminUser;
    
    if (useMemoryDB) {
      adminUser = await memoryDB.createUser({
        email: adminEmail,
        password: adminPassword,
        name: 'Admin',
        role: 'admin'
      });
    } else {
      adminUser = await User.create({
        email: adminEmail,
        password: adminPassword,  // 将被自动加密
        name: 'Admin',
        role: 'admin'
      });
    }
    
    return NextResponse.json({ 
      success: true, 
      message: '管理员账号创建成功',
      data: {
        email: adminUser.email,
        name: adminUser.name,
        role: adminUser.role,
        // 仅在开发环境下返回明文密码
        password: isDev ? adminPassword : undefined
      }
    }, { status: 201 });
    
  } catch (error: any) {
    console.error('创建管理员账号失败:', error);
    
    return NextResponse.json({ 
      success: false, 
      message: `创建管理员账号失败: ${error.message}` 
    }, { status: 500 });
  }
} 