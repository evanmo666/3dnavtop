import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/app/lib/db';
import Link from '@/app/models/Link';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

// 获取所有链接
export async function GET(req: NextRequest) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');
    
    const query: any = {};
    
    if (category) {
      query.category = category;
    }
    
    if (featured === 'true') {
      query.featured = true;
    }
    
    const links = await Link.find(query).sort({ order: 1, createdAt: -1 });
    
    return NextResponse.json(links);
  } catch (error) {
    console.error('获取链接失败', error);
    return NextResponse.json({ error: '获取链接失败' }, { status: 500 });
  }
}

// 创建新链接
export async function POST(req: NextRequest) {
  try {
    await connectDB();
    
    // 检查身份验证
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: '未授权' }, { status: 401 });
    }
    
    const body = await req.json();
    
    const newLink = await Link.create(body);
    
    return NextResponse.json(newLink, { status: 201 });
  } catch (error: any) {
    console.error('创建链接失败', error);
    
    if (error.code === 11000) {
      return NextResponse.json({ error: '链接URL已存在' }, { status: 400 });
    }
    
    return NextResponse.json({ error: '创建链接失败' }, { status: 500 });
  }
} 