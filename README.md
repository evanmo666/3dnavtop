# 3D设计师导航网站 (3dnav.top)

一个专为3D设计师打造的资源导航网站，基于Next.js 15 + TypeScript构建。

## 🚀 项目特色

- **现代化技术栈**: Next.js 15 + TypeScript + Tailwind CSS
- **响应式设计**: 完美适配桌面端和移动端
- **智能搜索**: 支持实时搜索和分类筛选
- **后台管理**: 完整的链接管理系统
- **文件存储**: 基于文件的数据管理，无需数据库

## 📊 项目数据

- **总链接数**: 60个精选资源
- **特色链接**: 15个重点推荐
- **分类数量**: 9个主要分类
- **管理模式**: 文件模式 - 直接修改数据文件

## 🛠️ 技术架构

### 前端技术
- **框架**: Next.js 15 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **动画**: Framer Motion
- **图标**: Heroicons

### 后台管理
- **数据存储**: 基于文件系统 (src/app/data/links.ts)
- **API路由**: Next.js API Routes
- **文件操作**: 自定义文件操作工具
- **权限控制**: 简化的管理界面

### 数据管理
- **主数据文件**: `src/app/data/links.ts`
- **文件操作**: `src/app/api/links/file-operations.ts`
- **API端点**: 
  - `GET /api/links` - 获取所有链接
  - `POST /api/links` - 添加新链接
  - `GET /api/links/[id]` - 获取单个链接
  - `PUT /api/links/[id]` - 更新链接
  - `DELETE /api/links/[id]` - 删除链接

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
│   │   │       └── file-operations.ts # 文件操作工具
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
- ✅ 添加新链接
- ✅ 编辑链接信息
- ✅ 删除链接
- ✅ 分类管理
- ✅ 搜索和筛选
- ✅ 统计信息展示

### 数据管理
- ✅ 文件系统存储
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

3. 点击"添加链接"保存

### 编辑链接

1. 在链接管理页面点击"编辑"
2. 修改链接信息
3. 点击"更新链接"保存
4. 或点击"删除链接"删除

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

## 📈 更新日志

### v1.3.0 (2024-06-14)
- ✅ 实现基于文件的后台管理系统
- ✅ 创建文件操作工具函数
- ✅ 重写所有后台管理页面
- ✅ 添加统计信息展示
- ✅ 优化用户界面和交互
- ✅ 修复类型兼容性问题

### v1.2.0 (2024-06-13)
- ✅ 修复搜索框交互问题
- ✅ 统一前后台数据源
- ✅ 优化构建和部署流程
- ✅ 添加详细调试信息

### v1.1.0 (2024-06-12)
- ✅ 完成基础前台功能
- ✅ 实现响应式设计
- ✅ 添加搜索和筛选功能
- ✅ 集成动画效果

### v1.0.0 (2024-06-11)
- ✅ 项目初始化
- ✅ 基础架构搭建
- ✅ 数据结构设计

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 📞 联系方式

- 网站: [3dnav.top](https://3dnav.top)
- 邮箱: contact@3dnav.top

---

**注意**: 本项目使用文件模式进行数据管理，所有数据修改都会直接写入 `src/app/data/links.ts` 文件。建议定期备份数据文件，并使用Git进行版本控制。
