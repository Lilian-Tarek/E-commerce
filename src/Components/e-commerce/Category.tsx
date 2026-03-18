import { Link } from "react-router-dom";
interface IProps {
  id: string;
  title: string;

  prefix: string;
  img: string;
}
const Category = ({title,prefix,img}:IProps) => {
  return (
    <div className="flex justify-center">
      <Link to={`/categories/products/${prefix}`}>
        <div className="my-3 w-[280px] flex flex-col items-center justify-center">
          <img
            className="rounded w-[280px] h-[240px] object-cover block"
            src={img}
            alt={title}
          />
          <h4 className="text-center font-semibold text-2xl mt-2">{title}</h4>
        </div>
      </Link>
    </div>
  );
};

export default Category;
