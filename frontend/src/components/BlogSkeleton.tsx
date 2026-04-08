const BlogPageSkeleton = () => {
  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-12 px-10 w-full pt-2 max-w-7xl">
        {/* Left: Main content — col-span-8 */}
        <div className="col-span-8 pr-8">
          {/* Title */}
          <div className="space-y-3">
            <div className="h-10 bg-gray-200 rounded-md animate-pulse w-full" />
            <div className="h-10 bg-gray-200 rounded-md animate-pulse w-3/4" />
          </div>

          {/* Published date */}
          <div className="pt-3">
            <div className="h-4 bg-gray-200 rounded animate-pulse w-48" />
          </div>

          {/* Content paragraphs */}
          <div className="pt-6 space-y-3">
            <div className="h-4 bg-gray-200 rounded animate-pulse w-full" />
            <div className="h-4 bg-gray-200 rounded animate-pulse w-full" />
            <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6" />
            <div className="h-4 bg-gray-200 rounded animate-pulse w-full" />
            <div className="h-4 bg-gray-200 rounded animate-pulse w-4/5" />
            <div className="h-4 bg-gray-200 rounded animate-pulse w-full" />
            <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
            <div className="h-4 bg-gray-200 rounded animate-pulse w-full" />
            <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6" />
          </div>
        </div>

        {/* Right: Author sidebar — col-span-4 */}
        <div className="col-span-4 pl-4 border-l border-gray-100">
          {/* "Author" label */}
          <div className="h-4 bg-gray-200 rounded animate-pulse w-12 mb-3" />

          {/* Avatar + Name row */}
          <div className="flex pt-2 items-center gap-4">
            {/* Avatar circle */}
            <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse flex-shrink-0" />
            {/* Author name */}
            <div className="h-6 bg-gray-200 rounded animate-pulse w-32" />
          </div>

          {/* Catchphrase */}
          <div className="mt-3 space-y-2">
            <div className="h-4 bg-gray-200 rounded animate-pulse w-full" />
            <div className="h-4 bg-gray-200 rounded animate-pulse w-4/5" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPageSkeleton;
