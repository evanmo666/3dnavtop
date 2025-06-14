import { NextRequest, NextResponse } from 'next/server';
import { allLinks } from '@/app/data/links';

// 内存中的链接数据（用于演示）
let memoryLinks = [...allLinks];

// GET - 获取单个链接
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const link = memoryLinks.find(l => l._id === params.id);
    
    if (!link) {
      return NextResponse.json(
        { success: false, error: '链接不存在' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: link
    });
  } catch (error) {
    console.error('获取链接失败:', error);
    return NextResponse.json(
      { success: false, error: '获取链接失败' },
      { status: 500 }
    );
  }
}

// PUT - 更新链接
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    
    // 检查链接是否存在
    const linkIndex = memoryLinks.findIndex(l => l._id === params.id);
    if (linkIndex === -1) {
      return NextResponse.json(
        { success: false, error: '链接不存在' },
        { status: 404 }
      );
    }

    // 验证必填字段
    if (!body.title || !body.url || !body.category) {
      return NextResponse.json(
        { success: false, error: '标题、URL和分类为必填项' },
        { status: 400 }
      );
    }

    // 创建更新后的链接对象
    const updatedLink = {
      _id: params.id,
      title: body.title,
      url: body.url,
      description: body.description || '',
      category: body.category,
      subcategory: body.subcategory || '',
      featured: body.featured || false,
      order: body.order || 0,
      createdAt: memoryLinks[linkIndex].createdAt,
      updatedAt: new Date()
    };

    // 更新内存中的链接
    memoryLinks[linkIndex] = updatedLink;

    console.log('链接更新成功 (内存模式):', updatedLink.title);

    return NextResponse.json({
      success: true,
      data: updatedLink,
      message: '链接更新成功 (演示模式 - 重启后数据会丢失)'
    });

  } catch (error) {
    console.error('更新链接失败:', error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : '更新链接失败' },
      { status: 500 }
    );
  }
}

// DELETE - 删除链接
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // 检查链接是否存在
    const linkIndex = memoryLinks.findIndex(l => l._id === params.id);
    if (linkIndex === -1) {
      return NextResponse.json(
        { success: false, error: '链接不存在' },
        { status: 404 }
      );
    }

    // 从内存中删除链接
    const deletedLink = memoryLinks.splice(linkIndex, 1)[0];

    console.log('链接删除成功 (内存模式):', deletedLink.title);

    return NextResponse.json({
      success: true,
      message: '链接删除成功 (演示模式 - 重启后数据会恢复)'
    });

  } catch (error) {
    console.error('删除链接失败:', error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : '删除链接失败' },
      { status: 500 }
    );
  }
} 