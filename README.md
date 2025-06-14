# 3D设计师导航网站 (3dnav.top)

## 项目概述
3D设计师导航网站是一个为Cinema 4D和Blender用户提供优质资源链接的导航平台。网站汇集了大量3D设计相关的工具、插件、教程、素材和灵感资源，帮助设计师提高工作效率。

## 技术栈
- **前端框架**: Next.js 15
- **编程语言**: TypeScript
- **样式解决方案**: TailwindCSS
- **数据库**: MongoDB (支持内存数据库模式)
- **身份验证**: NextAuth.js

## 主要功能
- 分类展示3D设计资源
- 资源搜索功能
- 响应式设计，支持移动设备
- 管理员后台系统
- 内存数据库模式（无需MongoDB）

## 安装和运行
1. 克隆仓库
```bash
git clone https://github.com/evanmo666/3dnavtop.git
cd 3dnavtop
```

2. 安装依赖
```bash
npm install
```

3. 创建`.env.local`文件并添加以下环境变量
```
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_secret_key
# 可选: MONGODB_URI=your_mongodb_connection_string
```

4. 运行开发服务器
```bash
npm run dev
```

5. 访问 http://localhost:3000

## 管理员设置
1. 访问 http://localhost:3000/admin/setup
2. 创建管理员账户
3. 使用创建的账户登录系统

## 开发历程
- 初始版本：分类卡片导航到子页面
- 第一次改版：所有资源直接显示在首页，通过顶部标签切换
- 第二次改版：左侧固定分类菜单，右侧内容区域
- **2024年最新更新**：
  - 添加了自定义favicon.ico图标
  - 在顶部导航栏的3DNAV.TOP文字左侧添加了LOGO.png
  - 优化了网站品牌视觉识别
  - 使用Next.js Image组件优化图片加载性能

## 许可证
MIT License

## 联系方式
- 作者: EvanMo
- GitHub: [evanmo666](https://github.com/evanmo666)
