
import React from "react";
import ContentLoader from "react-content-loader";

export default function CategorySkeleton() {
  const RenderLists = Array(5)
    .fill(0)
    .map((_, idx) => (
      <ContentLoader
        key={idx}
        speed={2}
        width={280}
        height={280 + 32} 
        viewBox="0 0 280 272"
        backgroundColor="#fdf7fc"
        foregroundColor="#dcd5d5"
      >
       
        <rect x="0" y="0" rx="8" ry="8" width="280" height="240" />
       
        <rect x="20" y="250" rx="4" ry="4" width="240" height="20" />
      </ContentLoader>
    ));

  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 my-5 justify-items-center">
      {RenderLists}
    </div>
  );
}
