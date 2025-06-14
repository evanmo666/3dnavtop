import { NextRequest, NextResponse } from 'next/server';
import { allLinks } from '@/app/data/links';

// 内存中的链接数据（用于演示）
let memoryLinks = [...allLinks];

// GET - 获取所有链接
export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      data: memoryLinks,
      total: memoryLinks.length
    });
  } catch (error) {
    console.error('获取链接失败:', error);
    return NextResponse.json(
      { success: false, error: '获取链接失败' },
      { status: 500 }
    );
  }
}

// POST - 添加新链接
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // 验证必填字段
    if (!body.title || !body.url || !body.category) {
      return NextResponse.json(
        { success: false, error: '标题、URL和分类为必填项' },
        { status: 400 }
      );
    }

    // 生成新ID
    const maxId = memoryLinks.reduce((max, link) => {
      const id = parseInt(link._id);
      return isNaN(id) ? max : Math.max(max, id);
    }, 0);
    const newId = (maxId + 1).toString();
    
    // 创建新链接对象
    const newLink = {
      _id: newId,
      title: body.title,
      url: body.url,
      description: body.description || '',
      category: body.category,
      subcategory: body.subcategory || '',
      featured: body.featured || false,
      order: body.order || 0,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // 添加到内存数据
    memoryLinks.push(newLink);

    console.log('新链接添加成功 (内存模式):', newLink.title);

    return NextResponse.json({
      success: true,
      data: newLink,
      message: '链接添加成功 (演示模式 - 重启后数据会丢失)'
    });

  } catch (error) {
    console.error('添加链接失败:', error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : '添加链接失败' },
      { status: 500 }
    );
  }
} 