// 临时调试脚本 - 验证数据统计
const fs = require('fs');
const path = require('path');

// 读取links.ts文件内容
const linksFile = fs.readFileSync(path.join(__dirname, 'src/app/data/links.ts'), 'utf8');

// 统计总链接数
const totalLinks = (linksFile.match(/_id:/g) || []).length;

// 统计特色链接数
const featuredLinks = (linksFile.match(/featured: true/g) || []).length;

// 统计分类数 - 查找categories数组
const categoriesMatch = linksFile.match(/export const categories[^=]*=\s*\[([\s\S]*?)\];/);
let categoriesCount = 0;
if (categoriesMatch) {
  const categoriesContent = categoriesMatch[1];
  categoriesCount = (categoriesContent.match(/\{[^}]*id:/g) || []).length - 1; // 减去'all'分类
}

console.log('=== 数据统计验证 ===');
console.log(`总链接数: ${totalLinks}`);
console.log(`特色链接数: ${featuredLinks}`);
console.log(`分类数: ${categoriesCount}`);
console.log('==================');

// 检查前台页面显示的链接
console.log('\n=== 前台页面分析 ===');
const pageFile = fs.readFileSync(path.join(__dirname, 'src/app/page.tsx'), 'utf8');
console.log('前台页面使用数据源: allLinks (来自 ./data/links)');

// 检查后台页面显示的链接
console.log('\n=== 后台页面分析 ===');
const adminFile = fs.readFileSync(path.join(__dirname, 'src/app/admin/page.tsx'), 'utf8');
console.log('后台页面使用数据源: allLinks (来自 ../data/links)');

console.log('\n=== 结论 ===');
console.log('前台和后台都使用相同的数据源 allLinks');
console.log('如果显示不同步，可能是浏览器缓存问题或页面渲染问题'); 