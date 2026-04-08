
import { Link } from 'react-router-dom';
import { formatDate } from '../pages/Blog';

interface BlogCardProps {
  author: {
    name: string;
  };
  title: string;
  content: string;
  publishedAt : string;
  id: string | number;
}


export const AvatarIcon = ({ name }: { name: string }) => (
  <div className="flex items-center justify-center w-7 h-7 rounded-full bg-slate-400 text-slate-700 text-xs font-medium shrink-0">
    {name?.length > 0 ? name[0].toUpperCase() : 'U'}
  </div>
);

const BlogCard = ({ author, title, content, publishedAt, id }: BlogCardProps) => {
  const readTime = Math.ceil(content.length / 200);

  return (
    <Link
      to={`/blog/${id}`}
      className="group border-b border-slate-200 px-6 py-5 hover:bg-slate-50 transition-all duration-150 block cursor-pointer"
    >
      {/* Author row */}
      <div className="flex items-center gap-2 mb-3">
        <AvatarIcon name={author.name} />
        <span className="text-sm font-medium text-slate-800">{author.name}</span>
        <span className="w-1 h-1 rounded-full bg-slate-300" />
        <span className="text-sm text-slate-400">{formatDate(publishedAt) || '02 April 2026'}</span>
      </div>

      <h3 className="text-xl font-semibold text-slate-900 leading-snug mb-2">{title}</h3>

      <p className="text-sm text-slate-500 leading-relaxed line-clamp-2 mb-4">{content}</p>

      <div className="flex items-center justify-between">
        <span className="text-xs text-slate-400 bg-slate-100 rounded-full px-3 py-1">
          {readTime} min read
        </span>
        <span className="text-slate-300 text-sm group-hover:translate-x-1 group-hover:text-slate-500 transition-all duration-150">
          →
        </span>
      </div>
    </Link>
  );
};

export default BlogCard;
