import { NextRequest, NextResponse } from 'next/server';
import { allLinks } from '@/app/data/links';
import { updateLinkInFile, deleteLinkFromFile, getEnvironmentInfo } from '../file-operations';

// 内存中的链接数据（用于无服务器环境）
let memoryLinks = [...allLinks];

// GET - 获取单个链接
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const link = allLinks.find(l => l._id === params.id);
    
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
    const existingLink = allLinks.find(l => l._id === params.id);
    if (!existingLink) {
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

    // 检查环境信息
    const envInfo = getEnvironmentInfo();
    console.log('环境信息:', envInfo);

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
      createdAt: existingLink.createdAt,
      updatedAt: new Date()
    };

    // 根据环境选择存储方式
    if (envInfo.isServerless || !envInfo.hasWritePermission) {
      // 无服务器环境或无写入权限 - 使用内存模式
      const linkIndex = memoryLinks.findIndex(l => l._id === params.id);
      if (linkIndex !== -1) {
        memoryLinks[linkIndex] = updatedLink;
      }
      
      console.log('链接更新成功 (内存模式):', updatedLink.title);
      
      return NextResponse.json({
        success: true,
        data: updatedLink,
        message: '链接更新成功 (演示模式 - 当前环境不支持文件写入)',
        mode: 'memory'
      });
    } else {
      // 本地环境 - 使用文件模式
      try {
        updateLinkInFile(params.id, updatedLink);
        
        return NextResponse.json({
          success: true,
          data: updatedLink,
          message: '链接更新成功，数据已永久保存到文件',
          mode: 'file'
        });
      } catch (fileError) {
        // 文件操作失败，回退到内存模式
        console.error('文件操作失败，回退到内存模式:', fileError);
        
        const linkIndex = memoryLinks.findIndex(l => l._id === params.id);
        if (linkIndex !== -1) {
          memoryLinks[linkIndex] = updatedLink;
        }
        
        return NextResponse.json({
          success: true,
          data: updatedLink,
          message: '链接更新成功 (演示模式 - 文件操作失败，已回退到内存模式)',
          mode: 'memory_fallback'
        });
      }
    }

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
    const existingLink = allLinks.find(l => l._id === params.id);
    if (!existingLink) {
      return NextResponse.json(
        { success: false, error: '链接不存在' },
        { status: 404 }
      );
    }

    // 检查环境信息
    const envInfo = getEnvironmentInfo();
    console.log('环境信息:', envInfo);

    // 根据环境选择存储方式
    if (envInfo.isServerless || !envInfo.hasWritePermission) {
      // 无服务器环境或无写入权限 - 使用内存模式
      const linkIndex = memoryLinks.findIndex(l => l._id === params.id);
      if (linkIndex !== -1) {
        const deletedLink = memoryLinks.splice(linkIndex, 1)[0];
        console.log('链接删除成功 (内存模式):', deletedLink.title);
      }
      
      return NextResponse.json({
        success: true,
        message: '链接删除成功 (演示模式 - 当前环境不支持文件写入)',
        mode: 'memory'
      });
    } else {
      // 本地环境 - 使用文件模式
      try {
        deleteLinkFromFile(params.id);
        
        return NextResponse.json({
          success: true,
          message: '链接删除成功，数据已永久保存到文件',
          mode: 'file'
        });
      } catch (fileError) {
        // 文件操作失败，回退到内存模式
        console.error('文件操作失败，回退到内存模式:', fileError);
        
        const linkIndex = memoryLinks.findIndex(l => l._id === params.id);
        if (linkIndex !== -1) {
          const deletedLink = memoryLinks.splice(linkIndex, 1)[0];
          console.log('链接删除成功 (内存模式回退):', deletedLink.title);
        }
        
        return NextResponse.json({
          success: true,
          message: '链接删除成功 (演示模式 - 文件操作失败，已回退到内存模式)',
          mode: 'memory_fallback'
        });
      }
    }

  } catch (error) {
    console.error('删除链接失败:', error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : '删除链接失败' },
      { status: 500 }
    );
  }
} 