import { NextRequest, NextResponse } from 'next/server';
import { allLinks } from '@/app/data/links';
import { addLinkToFile, getEnvironmentInfo } from './file-operations';

// 内存中的链接数据（用于无服务器环境）
let memoryLinks = [...allLinks];

// GET - 获取所有链接
export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      data: allLinks,
      total: allLinks.length
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

    // 检查环境信息
    const envInfo = getEnvironmentInfo();
    console.log('环境信息:', envInfo);
    
    // 创建新链接对象
    const newLink = {
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

    // 根据环境选择存储方式
    if (envInfo.isServerless || !envInfo.hasWritePermission) {
      // 无服务器环境或无写入权限 - 使用内存模式
      const maxId = memoryLinks.reduce((max, link) => {
        const id = parseInt(link._id);
        return isNaN(id) ? max : Math.max(max, id);
      }, 0);
      const newId = (maxId + 1).toString();
      
      const linkWithId = { ...newLink, _id: newId };
      memoryLinks.push(linkWithId);
      
      console.log('新链接添加成功 (内存模式):', newLink.title);
      
      return NextResponse.json({
        success: true,
        data: linkWithId,
        message: '链接添加成功 (演示模式 - 当前环境不支持文件写入)',
        mode: 'memory'
      });
    } else {
      // 本地环境 - 使用文件模式
      try {
        addLinkToFile(newLink);
        
        return NextResponse.json({
          success: true,
          data: { ...newLink, _id: 'generated' }, // ID会在文件操作中生成
          message: '链接添加成功，数据已永久保存到文件',
          mode: 'file'
        });
      } catch (fileError) {
        // 文件操作失败，回退到内存模式
        console.error('文件操作失败，回退到内存模式:', fileError);
        
        const maxId = memoryLinks.reduce((max, link) => {
          const id = parseInt(link._id);
          return isNaN(id) ? max : Math.max(max, id);
        }, 0);
        const newId = (maxId + 1).toString();
        
        const linkWithId = { ...newLink, _id: newId };
        memoryLinks.push(linkWithId);
        
        return NextResponse.json({
          success: true,
          data: linkWithId,
          message: '链接添加成功 (演示模式 - 文件操作失败，已回退到内存模式)',
          mode: 'memory_fallback'
        });
      }
    }

  } catch (error) {
    console.error('添加链接失败:', error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : '添加链接失败' },
      { status: 500 }
    );
  }
} 