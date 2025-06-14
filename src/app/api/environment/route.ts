import { NextResponse } from 'next/server';
import { getEnvironmentInfo } from '../links/file-operations';

export async function GET() {
  try {
    const envInfo = getEnvironmentInfo();
    
    return NextResponse.json({
      success: true,
      data: {
        ...envInfo,
        nodeVersion: process.version,
        platform: process.platform,
        environment: {
          VERCEL: process.env.VERCEL,
          NETLIFY: process.env.NETLIFY,
          AWS_LAMBDA_FUNCTION_NAME: process.env.AWS_LAMBDA_FUNCTION_NAME,
          NODE_ENV: process.env.NODE_ENV
        },
        recommendedMode: envInfo.isServerless || !envInfo.hasWritePermission ? 'memory' : 'file'
      }
    });
  } catch (error) {
    console.error('获取环境信息失败:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: '获取环境信息失败',
        data: {
          isServerless: true,
          hasWritePermission: false,
          currentWorkingDirectory: process.cwd(),
          recommendedMode: 'memory'
        }
      },
      { status: 500 }
    );
  }
} 