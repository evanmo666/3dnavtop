# 3DNAV.TOP - 3D设计师导航网站

一个为3D设计师打造的导航网站，提供精选的Cinema 4D和Blender资源链接。本项目使用Next.js 15构建，集成MongoDB数据库，支持响应式设计，并包含后台管理系统。

## 功能特点

- 📱 响应式设计：PC和移动端完美适配
- 🔍 SEO优化：优化元数据和规范链接
- 🗂️ 分类筛选：在首页直接切换不同类别的资源
- 🔎 即时搜索：快速查找所需资源
- ✨ 视觉特效：包含平滑动画和交互效果
- ⭐ 特色链接：突出显示最有价值的资源
- 🔐 后台管理：管理链接、类别和用户
- 🔄 实时更新：无需重新部署即可更新内容

## 技术栈

- **前端框架**：Next.js 15 (App Router)
- **语言**：TypeScript
- **样式**：Tailwind CSS
- **动画**：Framer Motion
- **数据库**：MongoDB
- **认证**：NextAuth.js
- **部署**：Vercel

## 项目结构

```
3dnav/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── api/                  # API路由
│   │   │   ├── auth/             # 认证API
│   │   │   └── links/            # 链接CRUD API
│   │   ├── components/           # UI组件
│   │   │   └── ui/               # 通用UI组件
│   │   ├── lib/                  # 工具库
│   │   ├── models/               # 数据模型
│   │   ├── admin/                # 管理员页面
│   │   ├── categories/           # 类别页面
│   │   ├── about/                # 关于页面
│   │   ├── login/                # 登录页面
│   │   ├── providers.tsx         # Provider组件
│   │   ├── layout.tsx            # 根布局
│   │   └── page.tsx              # 首页
│   └── types/                    # 类型定义
├── public/                       # 静态资源
├── .env.local                    # 环境变量
├── next.config.ts                # Next.js配置
└── tailwind.config.js            # Tailwind配置
```

## 安装与运行

1. 克隆仓库：
   ```bash
   git clone https://github.com/yourusername/3dnav.git
   cd 3dnav
   ```

2. 安装依赖：
   ```bash
   npm install
   ```

3. 创建环境变量文件`.env.local`：
   ```
   MONGODB_URI=your_mongodb_connection_string
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_nextauth_secret_key
   ```

4. 运行开发服务器：
   ```bash
   npm run dev
   ```

5. 构建生产版本：
   ```bash
   npm run build
   ```

## 数据库设置

本项目使用MongoDB作为数据库。在使用前，您需要：

1. 创建MongoDB数据库（可使用MongoDB Atlas免费层）
2. 在`.env.local`文件中设置`MONGODB_URI`
3. 数据库将自动创建必要的集合（links和users）

## 管理员账户设置

首次使用时，需要手动在MongoDB中创建一个管理员账户：

```javascript
{
  "email": "admin@example.com",
  "password": "已加密密码", // 使用bcrypt加密
  "name": "Admin",
  "role": "admin"
}
```

## 页面特性

### 首页
- **资源筛选**：通过类别标签直接筛选不同类型的资源
- **搜索功能**：实时搜索所有资源
- **特色资源**：突出显示精选资源
- **响应式布局**：适配不同设备屏幕
- **视觉特效**：
  - 鼠标跟踪光效
  - 平滑动画过渡
  - 交互式UI元素
  - 卡片悬浮效果

### 更新日志

#### 2023-06-10
- 重构首页，将所有资源直接呈现在首页
- 添加类别筛选功能，无需跳转页面
- 集成Framer Motion实现平滑动画效果
- 添加鼠标跟踪光效和交互特效
- 优化搜索体验，支持实时搜索结果展示

## 部署到Vercel

1. 在[Vercel](https://vercel.com)创建账户
2. 导入GitHub仓库
3. 配置环境变量（MONGODB_URI, NEXTAUTH_SECRET）
4. 部署

## 贡献

欢迎贡献代码或提供改进建议！请提交Pull Request或创建Issue。

## 许可证

MIT
