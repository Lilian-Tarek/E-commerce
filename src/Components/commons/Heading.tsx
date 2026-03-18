import { memo } from 'react'
const Heading = memo(({title}: {title:string}) => {
  return (
    <div className="flex flex-col items-center mb-6">
      <h2 className="text-primary text-4xl font-bold text-center p-3">
        {title}
      </h2>
      <div className="w-24 h-1 bg-primary rounded-full mt-2"></div>
    </div>
  );
}
)
export default Heading
