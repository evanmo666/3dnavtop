import bcrypt from 'bcryptjs';

// 简单的内存数据库模拟
class MemoryDatabase {
  private users: Map<string, any> = new Map();
  private links: Map<string, any> = new Map();
  private nextUserId = 1;
  private nextLinkId = 1;

  // 用户管理
  async findUserByEmail(email: string) {
    return this.users.get(email.toLowerCase());
  }

  async findUserById(id: string) {
    const users = Array.from(this.users.values());
    return users.find(user => user._id.toString() === id);
  }

  async createUser(userData: any) {
    // 检查用户是否已存在
    if (this.users.has(userData.email.toLowerCase())) {
      throw new Error('用户已存在');
    }

    // 加密密码
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userData.password, salt);

    // 创建用户
    const newUser = {
      _id: this.nextUserId++,
      ...userData,
      email: userData.email.toLowerCase(),
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // 保存用户
    this.users.set(newUser.email, newUser);
    
    console.log(`内存数据库: 用户 ${newUser.email} 已创建`);
    return newUser;
  }

  async deleteUsersByRole(role: string) {
    let count = 0;
    for (const [email, user] of this.users.entries()) {
      if (user.role === role) {
        this.users.delete(email);
        count++;
      }
    }
    console.log(`内存数据库: 已删除 ${count} 个 ${role} 角色的用户`);
    return count;
  }

  async findUserByRole(role: string) {
    for (const user of this.users.values()) {
      if (user.role === role) {
        return user;
      }
    }
    return null;
  }

  async comparePassword(plainPassword: string, hashedPassword: string) {
    return bcrypt.compare(plainPassword, hashedPassword);
  }

  // 链接管理
  async findAllLinks() {
    return Array.from(this.links.values());
  }

  async findLinkById(id: string) {
    const links = Array.from(this.links.values());
    return links.find(link => link._id.toString() === id);
  }

  async createLink(linkData: any) {
    const newLink = {
      _id: this.nextLinkId++,
      ...linkData,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.links.set(newLink._id.toString(), newLink);
    return newLink;
  }

  // 数据库状态
  async clearAll() {
    this.users.clear();
    this.links.clear();
    this.nextUserId = 1;
    this.nextLinkId = 1;
    console.log('内存数据库: 已清空所有数据');
  }

  async getStats() {
    return {
      users: this.users.size,
      links: this.links.size
    };
  }
}

// 单例模式
const memoryDB = new MemoryDatabase();
export default memoryDB; 