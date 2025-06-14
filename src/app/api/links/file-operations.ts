import fs from 'fs';
import path from 'path';

// 数据文件路径
const DATA_FILE_PATH = path.join(process.cwd(), 'src/app/data/links.ts');

// 备份文件路径
const BACKUP_FILE_PATH = path.join(process.cwd(), 'src/app/data/links.backup.ts');

// 创建备份
function createBackup(): void {
  try {
    if (fs.existsSync(DATA_FILE_PATH)) {
      fs.copyFileSync(DATA_FILE_PATH, BACKUP_FILE_PATH);
      console.log('数据文件备份成功');
    }
  } catch (error) {
    console.error('创建备份失败:', error);
  }
}

// 检查文件是否存在
function checkFileExists(): boolean {
  try {
    return fs.existsSync(DATA_FILE_PATH);
  } catch (error) {
    console.error('检查文件存在性失败:', error);
    return false;
  }
}

// 读取当前数据文件内容
export function readLinksFile(): string {
  try {
    console.log('尝试读取文件:', DATA_FILE_PATH);
    
    if (!checkFileExists()) {
      throw new Error(`数据文件不存在: ${DATA_FILE_PATH}`);
    }
    
    const content = fs.readFileSync(DATA_FILE_PATH, 'utf8');
    console.log('文件读取成功，内容长度:', content.length);
    return content;
  } catch (error) {
    console.error('读取数据文件失败:', error);
    console.error('当前工作目录:', process.cwd());
    console.error('尝试的文件路径:', DATA_FILE_PATH);
    throw new Error(`无法读取数据文件: ${error instanceof Error ? error.message : '未知错误'}`);
  }
}

// 写入数据文件
export function writeLinksFile(content: string): void {
  try {
    console.log('尝试写入文件:', DATA_FILE_PATH);
    
    // 创建备份
    createBackup();
    
    // 确保目录存在
    const dir = path.dirname(DATA_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    fs.writeFileSync(DATA_FILE_PATH, content, 'utf8');
    console.log('数据文件更新成功');
  } catch (error) {
    console.error('写入数据文件失败:', error);
    throw new Error(`无法写入数据文件: ${error instanceof Error ? error.message : '未知错误'}`);
  }
}

// 解析链接数据从文件内容
export function parseLinksFromFile(fileContent: string): any[] {
  try {
    // 提取 allLinks 数组内容
    const linksMatch = fileContent.match(/export const allLinks[^=]*=\s*\[([\s\S]*?)\];/);
    if (!linksMatch) {
      throw new Error('无法找到 allLinks 数组');
    }

    // 简单计数现有链接（通过_id字段）
    const idMatches = fileContent.match(/_id:\s*['"`](\d+)['"`]/g);
    return idMatches ? idMatches.map((match, index) => ({ _id: match.match(/\d+/)?.[0] || index.toString() })) : [];
  } catch (error) {
    console.error('解析链接数据失败:', error);
    throw new Error('解析数据失败');
  }
}

// 生成新的链接ID
export function generateNewLinkId(fileContent: string): string {
  try {
    // 从文件内容中提取所有现有的ID
    const idMatches = fileContent.match(/_id:\s*['"`](\d+)['"`]/g);
    let maxId = 0;
    
    if (idMatches) {
      idMatches.forEach(match => {
        const id = parseInt(match.match(/\d+/)?.[0] || '0');
        if (id > maxId) {
          maxId = id;
        }
      });
    }
    
    return (maxId + 1).toString();
  } catch (error) {
    console.error('生成新ID失败:', error);
    return Date.now().toString(); // 备用方案：使用时间戳
  }
}

// 格式化链接对象为TypeScript代码
export function formatLinkToCode(link: any, indent: string = '  '): string {
  const escapedTitle = link.title.replace(/'/g, "\\'").replace(/"/g, '\\"');
  const escapedDescription = (link.description || '').replace(/'/g, "\\'").replace(/"/g, '\\"');
  const escapedSubcategory = (link.subcategory || '').replace(/'/g, "\\'").replace(/"/g, '\\"');
  
  return `${indent}{
${indent}  _id: '${link._id}',
${indent}  title: '${escapedTitle}',
${indent}  url: '${link.url}',
${indent}  description: '${escapedDescription}',
${indent}  category: '${link.category}',
${indent}  subcategory: '${escapedSubcategory}',
${indent}  featured: ${link.featured || false},
${indent}  order: ${link.order || 0},
${indent}  createdAt: new Date(),
${indent}  updatedAt: new Date()
${indent}}`;
}

// 添加新链接到文件
export function addLinkToFile(newLink: any): void {
  try {
    const fileContent = readLinksFile();
    
    // 生成新ID
    newLink._id = generateNewLinkId(fileContent);
    
    // 找到数组结束位置 - 寻找最后一个 }，然后是可选的逗号和空白，然后是 ];
    const arrayEndPattern = /(\s*})(\s*,?\s*)\];(\s*\/\/ 分类数据|$)/;
    const arrayEndMatch = fileContent.match(arrayEndPattern);
    
    if (!arrayEndMatch) {
      throw new Error('无法找到数组结束位置');
    }

    // 获取缩进
    const lastItemMatch = fileContent.match(/(\s+)}\s*,?\s*\];/);
    const indent = lastItemMatch ? lastItemMatch[1] : '  ';
    
    const newLinkCode = formatLinkToCode(newLink, indent);
    
    // 插入新链接 - 在最后一个链接后添加逗号，然后添加新链接
    const updatedContent = fileContent.replace(
      arrayEndPattern,
      `$1,\n${newLinkCode}\n${indent.substring(2)}];$3`
    );

    writeLinksFile(updatedContent);
    console.log('新链接添加成功:', newLink.title);
  } catch (error) {
    console.error('添加链接到文件失败:', error);
    throw error;
  }
}

// 更新文件中的链接
export function updateLinkInFile(linkId: string, updatedLink: any): void {
  try {
    const fileContent = readLinksFile();
    
    // 找到要更新的链接 - 更精确的匹配
    const linkPattern = new RegExp(
      `(\\s*){\\s*_id:\\s*['"\`]${linkId}['"\`][\\s\\S]*?}`,
      'g'
    );
    
    const match = linkPattern.exec(fileContent);
    if (!match) {
      throw new Error('未找到要更新的链接');
    }

    const indent = match[1];
    updatedLink._id = linkId; // 保持原ID
    const newLinkCode = formatLinkToCode(updatedLink, indent);
    
    // 替换链接内容
    const updatedContent = fileContent.replace(linkPattern, newLinkCode);
    
    writeLinksFile(updatedContent);
    console.log('链接更新成功:', updatedLink.title);
  } catch (error) {
    console.error('更新链接失败:', error);
    throw error;
  }
}

// 从文件中删除链接
export function deleteLinkFromFile(linkId: string): void {
  try {
    const fileContent = readLinksFile();
    
    // 找到要删除的链接（包括前面的逗号或后面的逗号）
    const linkPattern = new RegExp(
      `\\s*,?\\s*{\\s*_id:\\s*['"\`]${linkId}['"\`][\\s\\S]*?}\\s*,?`,
      'g'
    );
    
    let updatedContent = fileContent.replace(linkPattern, '');
    
    // 清理可能的多余逗号和格式
    updatedContent = updatedContent.replace(/,(\s*,)+/g, ','); // 多个连续逗号
    updatedContent = updatedContent.replace(/\[(\s*,)/g, '['); // 数组开始后的逗号
    updatedContent = updatedContent.replace(/,(\s*\];)/g, '$1'); // 数组结束前的逗号
    updatedContent = updatedContent.replace(/,(\s*}\s*\];)/g, '$1'); // 最后一个元素后的逗号
    
    writeLinksFile(updatedContent);
    console.log('链接删除成功:', linkId);
  } catch (error) {
    console.error('删除链接失败:', error);
    throw error;
  }
}

// 恢复备份
export function restoreFromBackup(): boolean {
  try {
    if (fs.existsSync(BACKUP_FILE_PATH)) {
      fs.copyFileSync(BACKUP_FILE_PATH, DATA_FILE_PATH);
      console.log('从备份恢复成功');
      return true;
    }
    return false;
  } catch (error) {
    console.error('恢复备份失败:', error);
    return false;
  }
} 