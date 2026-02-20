import React from 'react'
import { memo } from 'react'
const Heading = memo(({title}: {title:string}) => {
  return (
    <div>
     
      <h2 className="text-primary text-4xl font-bold text-center p-3">{title}</h2>
    </div>
  );
}
)
export default Heading
