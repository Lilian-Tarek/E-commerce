import Category from '@components/e-commerce/Category'
import { Loading } from '@components/feedback';
import GridList from '@components/commons/GridList';
import Heading from '@components/commons/Heading';
import useCategories from '@hooks/useCategories';

const Categories = () => {

  const { loading, error,categories } = useCategories();
  return (
    <>
      <Heading title={"Categories"}/>
      <Loading loading={loading} error={error} type={"category"}>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 my-5">
          <GridList
            records={categories}
            renderItem={(record) => <Category key={record.id} {...record} />}
          />
        </div>
      </Loading>
    </>
  );

};

  

export default Categories
