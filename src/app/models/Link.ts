import mongoose from 'mongoose';

// 链接模型接口
export interface ILink {
  _id: string;
  title: string;
  url: string;
  description?: string;
  category: string;
  subcategory?: string;
  icon?: string;
  featured?: boolean;
  order?: number;
  createdAt: Date;
  updatedAt: Date;
}

// 链接模式定义
const LinkSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: [true, 'Title is required'], 
    trim: true 
  },
  url: { 
    type: String, 
    required: [true, 'URL is required'], 
    trim: true,
    unique: true
  },
  description: { 
    type: String, 
    trim: true 
  },
  category: { 
    type: String, 
    required: [true, 'Category is required'], 
    trim: true 
  },
  subcategory: { 
    type: String, 
    trim: true 
  },
  icon: { 
    type: String, 
    default: 'link' 
  },
  featured: { 
    type: Boolean, 
    default: false 
  },
  order: { 
    type: Number, 
    default: 0 
  }
}, {
  timestamps: true
});

// 避免重复定义模型
export default mongoose.models.Link || mongoose.model<ILink>('Link', LinkSchema); 