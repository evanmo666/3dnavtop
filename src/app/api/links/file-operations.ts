import fs from 'fs';
import path from 'path';

// 数据文件路径
const DATA_FILE_PATH = path.join(process.cwd(), 'src/app/data/links.ts');

// 读取当前数据文件内容
export function readLinksFile(): string {
  try {
    return fs.readFileSync(DATA_FILE_PATH, 'utf8');
  } catch (error) {
    console.error('读取数据文件失败:', error);
    throw new Error('无法读取数据文件');
  }
}

// 写入数据文件
export function writeLinksFile(content: string): void {
  try {
    fs.writeFileSync(DATA_FILE_PATH, content, 'utf8');
    console.log('数据文件更新成功');
  } catch (error) {
    console.error('写入数据文件失败:', error);
    throw new Error('无法写入数据文件');
  }
}

// 解析链接数据
export function parseLinksFromFile(fileContent: string): any[] {
  try {
    // 提取 allLinks 数组内容
    const linksMatch = fileContent.match(/export const allLinks[^=]*=\s*\[([\s\S]*?)\];/);
    if (!linksMatch) {
      throw new Error('无法找到 allLinks 数组');
    }

    // 这里简化处理，实际项目中可能需要更复杂的解析
    // 由于直接解析 TypeScript 代码比较复杂，我们采用动态导入的方式
    return [];
  } catch (error) {
    console.error('解析链接数据失败:', error);
    throw new Error('解析数据失败');
  }
}

// 生成新的链接ID
export function generateNewLinkId(existingLinks: any[]): string {
  const maxId = existingLinks.reduce((max, link) => {
    const id = parseInt(link._id);
    return isNaN(id) ? max : Math.max(max, id);
  }, 0);
  return (maxId + 1).toString();
}

// 格式化链接对象为TypeScript代码
export function formatLinkToCode(link: any, indent: string = '  '): string {
  return `${indent}{
${indent}  _id: '${link._id}',
${indent}  title: '${link.title.replace(/'/g, "\\'")}',
${indent}  url: '${link.url}',
${indent}  description: '${(link.description || '').replace(/'/g, "\\'")}',
${indent}  category: '${link.category}',
${indent}  subcategory: '${link.subcategory || ''}',
${indent}  featured: ${link.featured || false},
${indent}  order: ${link.order || 0},
${indent}  createdAt: new Date(),
${indent}  updatedAt: new Date()
${indent}}`;
}

// 添加新链接到文件
export function addLinkToFile(newLink: any): void {
  const fileContent = readLinksFile();
  
  // 找到数组结束位置
  const arrayEndMatch = fileContent.match(/(\s*)\];(\s*\/\/ 分类数据)/);
  if (!arrayEndMatch) {
    throw new Error('无法找到数组结束位置');
  }

  const indent = arrayEndMatch[1];
  const newLinkCode = formatLinkToCode(newLink, indent);
  
  // 插入新链接
  const updatedContent = fileContent.replace(
    /(\s*)\];(\s*\/\/ 分类数据)/,
    `,\n${newLinkCode}\n$1];$2`
  );

  writeLinksFile(updatedContent);
}

// 更新文件中的链接
export function updateLinkInFile(linkId: string, updatedLink: any): void {
  const fileContent = readLinksFile();
  
  // 找到要更新的链接
  const linkPattern = new RegExp(
    `(\\s*){\\s*_id:\\s*'${linkId}'[\\s\\S]*?}`,
    'g'
  );
  
  const match = linkPattern.exec(fileContent);
  if (!match) {
    throw new Error('未找到要更新的链接');
  }

  const indent = match[1];
  const newLinkCode = formatLinkToCode(updatedLink, indent);
  
  // 替换链接内容
  const updatedContent = fileContent.replace(linkPattern, newLinkCode);
  
  writeLinksFile(updatedContent);
}

// 从文件中删除链接
export function deleteLinkFromFile(linkId: string): void {
  const fileContent = readLinksFile();
  
  // 找到要删除的链接（包括前面的逗号或后面的逗号）
  const linkPattern = new RegExp(
    `,?\\s*{\\s*_id:\\s*'${linkId}'[\\s\\S]*?}\\s*,?`,
    'g'
  );
  
  let updatedContent = fileContent.replace(linkPattern, '');
  
  // 清理可能的多余逗号
  updatedContent = updatedContent.replace(/,(\s*,)+/g, ',');
  updatedContent = updatedContent.replace(/\[(\s*,)/g, '[');
  updatedContent = updatedContent.replace(/,(\s*\];)/g, '$1');
  
  writeLinksFile(updatedContent);
} 