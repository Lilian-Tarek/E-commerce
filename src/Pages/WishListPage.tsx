import React from 'react'
import Heading from '@components/commons/Heading'
import { Loading } from "@components/feedback";
import GridList from "@components/commons/GridList";
import Product from "@components/e-commerce/Product";
import useWishlist from '@hooks/useWishlist';
const WishListPage = () => {
  const {loading,error,Records } = useWishlist();
  return (
    <div>
      <Heading title={"Wishlist"} />
      <Loading
        loading={loading}
        error={error}
        type={"product"}
        count={Records.length || 5}
      >
        <div className='relative w-full'>
          <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4 my-5">
            <GridList
              records={Records}
              renderItem={(record) => <Product key={record.id} {...record} />}
            />
          </div>
        </div>
      </Loading>
    </div>
  );
}

export default WishListPage
