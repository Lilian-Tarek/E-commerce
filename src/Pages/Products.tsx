import Product from '@components/e-commerce/Product'
import { Loading } from "@components/feedback";
import GridList from '@components/commons/GridList';
import Heading from '@components/commons/Heading';
import useProducts from '@hooks/useProducts';
const Products = () => {
  const {loading,error,params,ProductsFullInfo } = useProducts();
  return (
    <>
      <Heading title={`${params.prefix} Products`} />
      <Loading loading={loading} error={error} type={"product"} count={ProductsFullInfo.length||5}>
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5 my-5">
          <GridList
            records={ProductsFullInfo}
            renderItem={(record) => <Product key={record.id} {...record} />}
          />
        </div>
      </Loading>
    </>
  );
}

export default Products
