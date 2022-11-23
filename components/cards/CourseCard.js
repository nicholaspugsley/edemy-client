import Link from "next/link";
import { currencyFormatter } from "../../utils/helpers";

const CourseCard = ({ course }) => {
  const { name, instructor, price, image, slug, paid, category } = course;
  return (
    <Link href={`/course/${slug}`}>
      <a>
        <div className="card h-auto w-96 bg-base-300 shadow-xl">
          <figure>
            <img
              className="object-cover h-48 w-96 p-2"
              src={image.Location}
              alt={name}
            />
          </figure>
          <div className="card-body">
            <div className="card-title ">
              <div className="text-xl font-bold">{name}</div>
              <div className="badge badge-primary ml-4" count={category}>
                {category}
              </div>
            </div>
            <div className="text-xl font-bold">by {instructor.name}</div>
            <div className="text-xl font-bold">
              {paid
                ? currencyFormatter({ amount: price, currency: "usd" })
                : "Free"}
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default CourseCard;
