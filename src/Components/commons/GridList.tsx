import React from 'react'
import Lottie from "lottie-react";
import NoResult from "../../Assets/noresultfound.json";
type GridList <T,>= {
    records: T[];
renderItem:(record:T)=>React.ReactNode
}
const GridList =<T,> ({ records, renderItem }: GridList<T>) => {
    return (
      <>
        {records.length > 0 ? (
          records.map((record) => renderItem(record))
        ) : (
          <div className="absolute top-50 left-0 w-full h-full flex justify-center items-center pointer-events-none">
            <Lottie
              animationData={NoResult}
              className="w-64 pointer-events-auto"
            />
          </div>
        )}
      </>
    );

}

export default GridList
