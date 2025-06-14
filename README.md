# 3D设计师导航网站 (3dnav.top)

一个专为3D设计师打造的资源导航网站，基于Next.js 15 + TypeScript构建。

## 🚀 项目特色

- **现代化技术栈**: Next.js 15 + TypeScript + Tailwind CSS
- **响应式设计**: 完美适配桌面端和移动端
- **智能搜索**: 支持实时搜索和分类筛选
- **后台管理**: 完整的链接管理系统
- **演示模式**: 内存数据管理，重启后恢复原始数据

## 📊 项目数据

- **总链接数**: 59个精选资源
- **特色链接**: 15个重点推荐
- **分类数量**: 9个主要分类
- **管理模式**: 演示模式 - 使用内存数据，重启后恢复

## 🛠️ 技术架构

### 前端技术
- **框架**: Next.js 15 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **动画**: Framer Motion
- **图标**: Heroicons

### 后台管理
- **数据存储**: 内存数据 + 静态文件备份
- **API路由**: Next.js API Routes
- **演示模式**: 避免文件系统权限问题
- **权限控制**: 简化的管理界面

### 数据管理
- **主数据文件**: `src/app/data/links.ts` (静态数据)
- **运行时数据**: 内存中的数据副本
- **API端点**: 
  - `GET /api/links` - 获取所有链接
  - `POST /api/links` - 添加新链接 (演示模式)
  - `GET /api/links/[id]` - 获取单个链接
  - `PUT /api/links/[id]` - 更新链接 (演示模式)
  - `DELETE /api/links/[id]` - 删除链接 (演示模式)

## 📁 项目结构

```
3dnav/
├── src/
│   ├── app/
│   │   ├── data/
│   │   │   └── links.ts          # 主数据文件
│   │   ├── api/
│   │   │   └── links/
│   │   │       ├── route.ts      # 链接API路由
│   │   │       ├── [id]/route.ts # 单个链接API
│   │   │       └── file-operations.ts # 文件操作工具(备用)
│   │   ├── admin/
│   │   │   └── links/
│   │   │       ├── page.tsx      # 链接管理页面
│   │   │       ├── new/page.tsx  # 添加链接页面
│   │   │       └── [id]/page.tsx # 编辑链接页面
│   │   ├── components/           # 可复用组件
│   │   ├── globals.css          # 全局样式
│   │   ├── layout.tsx           # 根布局
│   │   └── page.tsx             # 首页
│   └── ...
├── public/                      # 静态资源
├── package.json                 # 项目依赖
├── tailwind.config.ts          # Tailwind配置
├── tsconfig.json               # TypeScript配置
└── README.md                   # 项目文档
```

## 🎯 功能特性

### 前台功能
- ✅ 响应式首页设计
- ✅ 智能搜索功能
- ✅ 分类筛选
- ✅ 特色链接展示
- ✅ 链接卡片动画
- ✅ 移动端适配

### 后台管理
- ✅ 链接列表管理
- ✅ 添加新链接 (演示模式)
- ✅ 编辑链接信息 (演示模式)
- ✅ 删除链接 (演示模式)
- ✅ 分类管理
- ✅ 搜索和筛选
- ✅ 统计信息展示

### 数据管理
- ✅ 内存数据存储 (演示模式)
- ✅ 自动ID生成
- ✅ 数据格式验证
- ✅ 错误处理
- ✅ 数据备份（Git版本控制）

## 🚀 快速开始

### 环境要求
- Node.js 18+
- npm 或 yarn

### 安装步骤

1. **克隆项目**
```bash
git clone <repository-url>
cd 3dnav
```

2. **安装依赖**
```bash
npm install
```

3. **启动开发服务器**
```bash
npm run dev
```

4. **访问应用**
- 前台: http://localhost:3000
- 后台管理: http://localhost:3000/admin/links

### 构建部署

```bash
# 构建生产版本
npm run build

# 启动生产服务器
npm start
```

## 📝 使用说明

### 演示模式说明

当前项目运行在**演示模式**下：
- ✅ 所有功能正常工作
- ⚠️ 数据存储在内存中
- ⚠️ 重启服务器后数据会恢复到原始状态
- ✅ 适合演示和测试使用

### 添加新链接

1. 访问 `/admin/links/new`
2. 填写链接信息：
   - 标题 (必填)
   - URL (必填)
   - 描述 (可选)
   - 分类 (必填)
   - 子分类 (可选)
   - 是否特色
   - 排序权重

3. 点击"添加链接"保存 (演示模式)

### 编辑链接

1. 在链接管理页面点击"编辑"
2. 修改链接信息
3. 点击"更新链接"保存 (演示模式)
4. 或点击"删除链接"删除 (演示模式)

### 数据文件结构

```typescript
interface ILink {
  _id: string;           // 唯一ID
  title: string;         // 链接标题
  url: string;          // 链接URL
  description?: string;  // 描述信息
  category: string;     // 主分类
  subcategory?: string; // 子分类
  featured?: boolean;   // 是否特色
  order?: number;       // 排序权重
  createdAt: Date;      // 创建时间
  updatedAt: Date;      // 更新时间
}
```

## 🔧 开发指南

### 添加新分类

在 `src/app/data/links.ts` 中的 `categories` 数组添加新分类：

```typescript
export const categories = [
  // ... 现有分类
  { id: 'new-category', title: 'New Category', icon: '🆕' },
];
```

### 修改样式

项目使用 Tailwind CSS，主要样式文件：
- `src/app/globals.css` - 全局样式
- 组件内联样式 - 使用 Tailwind 类名

### API扩展

在 `src/app/api/links/` 目录下添加新的API路由。

## 🐛 问题修复记录

### v1.5.0 (2024-12-14)
- ✅ **修复添加链接失败问题**: 改为演示模式，使用内存数据避免文件系统权限问题
- ✅ **优化错误处理**: 添加详细的错误信息和调试日志
- ✅ **更新界面提示**: 所有后台页面显示演示模式标识
- ✅ **统一中文界面**: 确保所有后台管理页面使用中文

### v1.4.0 (2024-12-14)
- ✅ **修复搜索框交互问题**: 解决发光效果遮挡点击事件
- ✅ **完善后台管理功能**: 添加编辑页面和删除功能
- ✅ **修复分类不匹配问题**: 统一前后台分类数据源
- ✅ **优化文件操作**: 改进文件读写和错误处理

### v1.3.0 (2024-12-14)
- ✅ **修复数据同步问题**: 统一前后台数据源
- ✅ **添加调试信息**: 验证数据一致性
- ✅ **优化构建流程**: 改进部署和构建过程

## 🔮 未来计划

- [ ] 实现真实数据库模式 (可选)
- [ ] 添加用户认证系统
- [ ] 支持批量导入链接
- [ ] 添加链接有效性检测
- [ ] 实现数据导出功能
- [ ] 添加访问统计功能

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📞 联系方式

- 网站: https://3dnav.top
- GitHub: [项目仓库](https://github.com/evanmo666/3dnavtop)
