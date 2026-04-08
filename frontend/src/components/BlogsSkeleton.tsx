const BlogSkeleton = () => (
  <div className="border-b border-slate-200 px-6 py-5 animate-pulse">
    <div className="flex items-center gap-2 mb-3">
      <div className="w-7 h-7 rounded-full bg-slate-200" />
      <div className="h-3 w-24 bg-slate-200 rounded-full" />
      <div className="h-3 w-16 bg-slate-200 rounded-full" />
    </div>
    <div className="h-5 w-2/3 bg-slate-200 rounded-full mb-2" />
    <div className="h-3 w-full bg-slate-200 rounded-full mb-2" />
    <div className="h-3 w-4/5 bg-slate-200 rounded-full mb-4" />
    <div className="h-6 w-16 bg-slate-200 rounded-full" />
  </div>
);

export default BlogSkeleton;
