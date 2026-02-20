type ProductSkeletonProps = {
  count?: number;
};
export default function ProductSkeleton({ count = 4 }: ProductSkeletonProps) {
  const RenderLists = Array.from({ length: count })
    .fill(0)
    .map((_, idx) => (
      <div key={idx} className="border border-primary rounded animate-pulse">
        <div className="aspect-[4/5] w-full bg-gray-200 rounded" />
        <div className="flex flex-col items-center p-3 gap-2">
          <div className="h-4 w-3/4 bg-gray-200 rounded" />
          <div className="h-3 w-1/3 bg-gray-200 rounded" />
          <div className="h-10 w-full bg-gray-200 rounded mt-2" />
        </div>
      </div>
    ));

  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5 my-5">
      {RenderLists}
    </div>
  );
}
