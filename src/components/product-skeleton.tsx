export function ProductSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="bg-gray-300 aspect-square rounded-lg mb-4"></div>
      <div className="flex gap-2 mb-4">
        <div className="bg-gray-300 w-20 h-20 rounded-lg"></div>
        <div className="bg-gray-300 w-20 h-20 rounded-lg"></div>
        <div className="bg-gray-300 w-20 h-20 rounded-lg"></div>
      </div>
      <div className="bg-gray-300 h-6 rounded mb-2"></div>
      <div className="bg-gray-300 h-4 rounded mb-2 w-3/4"></div>
      <div className="bg-gray-300 h-4 rounded w-1/2"></div>
    </div>
  )
}

export function ProductListSkeleton() {
  return (
    <div className="space-y-4">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="flex gap-4 p-4 bg-base-100 rounded-lg animate-pulse">
          <div className="bg-gray-300 w-20 h-20 rounded-lg flex-shrink-0"></div>
          <div className="flex-1">
            <div className="bg-gray-300 h-4 rounded mb-2"></div>
            <div className="bg-gray-300 h-3 rounded w-2/3"></div>
          </div>
        </div>
      ))}
    </div>
  )
}
