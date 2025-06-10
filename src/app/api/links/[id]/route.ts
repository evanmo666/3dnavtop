import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/app/lib/db';
import Link from '@/app/models/Link';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

// 获取单个链接
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    
    const link = await Link.findById(params.id);
    
    if (!link) {
      return NextResponse.json({ error: '链接不存在' }, { status: 404 });
    }
    
    return NextResponse.json(link);
  } catch (error) {
    console.error('获取链接失败', error);
    return NextResponse.json({ error: '获取链接失败' }, { status: 500 });
  }
}

// 更新链接
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    
    // 检查身份验证
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: '未授权' }, { status: 401 });
    }
    
    const body = await req.json();
    
    const updatedLink = await Link.findByIdAndUpdate(
      params.id,
      { $set: body },
      { new: true, runValidators: true }
    );
    
    if (!updatedLink) {
      return NextResponse.json({ error: '链接不存在' }, { status: 404 });
    }
    
    return NextResponse.json(updatedLink);
  } catch (error: any) {
    console.error('更新链接失败', error);
    
    if (error.code === 11000) {
      return NextResponse.json({ error: '链接URL已存在' }, { status: 400 });
    }
    
    return NextResponse.json({ error: '更新链接失败' }, { status: 500 });
  }
}

// 删除链接
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    
    // 检查身份验证
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: '未授权' }, { status: 401 });
    }
    
    const deletedLink = await Link.findByIdAndDelete(params.id);
    
    if (!deletedLink) {
      return NextResponse.json({ error: '链接不存在' }, { status: 404 });
    }
    
    return NextResponse.json({ message: '链接已删除' });
  } catch (error) {
    console.error('删除链接失败', error);
    return NextResponse.json({ error: '删除链接失败' }, { status: 500 });
  }
} 