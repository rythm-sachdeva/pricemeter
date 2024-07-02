import { getProductById } from "@/lib/actions";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { formatNumber } from "@/lib/utils";
import PriceInfoCard from "@/Components/PriceInfoCard";

type Props = {
  params: { id: string };
};

const page = async ({ params: { id } }: Props) => {
  const product = await getProductById(id);
  if (!product) redirect("/");
  return (
    <div className="product-container">
      <div className="flex gap-28 xl:flex-row flex-col ">
        <div className="product-image">
          <Image
            src={product.image}
            alt={product.title}
            width={580}
            height={400}
            className="mx-auto"
          />
        </div>
        <div className="flex-1 flex flex-col">
          <div className="flex justify-between items-start gap-5 flex-wrap pb-6">
            <div className="flex flex-col gap-3">
              <p className="text-[28px] text-secondary font-semibold">
                {" "}
                {product.title}
              </p>
              <Link
                href={product.url}
                target="_blank"
                className="text-base text-black opacity-50 hover:text-blue-700"
              >
                {" "}
                Visit Product
              </Link>
            </div>
            <div className="flex items-center gap-3">
              <div className="product-hearts">
                <Image
                  src="/assets/icons/red-heart.svg"
                  alt="red heart"
                  width={20}
                  height={20}
                />
                <p className="text-base font-semibold text-[#D46F77]">
                  {product.reviewsCount}
                </p>
              </div>
              <div className="p-2 bg-white-200 rounded-10">
                <Image
                  src="/assets/icons/bookmark.svg"
                  alt="Bookmark"
                  height={20}
                  width={20}
                />
              </div>
              <div className="p-2 bg-white-200 rounded-10">
                <Image
                  src="/assets/icons/share.svg"
                  alt="Share"
                  height={20}
                  width={20}
                />
              </div>
            </div>
          </div>
          <div className="product-info">
            <div className="flex flex-col gap-2">
              <p className="text-[34px] text-secondary font-semibold">
                {product.currency} {formatNumber(product.currentPrice)}
              </p>
              <p className="text-[34px] text-black opacity-50 line-through font-semibold">
                {product.currency} {formatNumber(product.originalPrice)}
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex gap-3">
                <div className="product-stars">
                  <Image
                    src="/assets/icons/star.svg"
                    alt="star"
                    width={16}
                    height={16}
                  />
                  <p className="text-sm text-primary-orange font-semibold">
                    {product.stars || "25"}
                  </p>
                </div>
                <div className="product-reviews">
                  <Image
                    src="/assets/icons/comment.svg"
                    alt="comments"
                    width={16}
                    height={16}
                  />
                  <p className="text-sm text-secondary font-semibold">
                    {product.reviewsCount} Reviews
                  </p>
                </div>
              </div>
              <p className="text-sm text-black opacity-50 ">
                <span className="text-primary-green font-semibold">93% </span>{" "}
                of buyers have rcommended this.
              </p>
            </div>
          </div>
          <div className="my-7 flex flex-col gap-5">
            <div className="flex gap-5 flex-wrap">
              <PriceInfoCard
              title="Current Price"
              iconSrc="/assets/icons/price-tag.svg"
              value={`${product.currency} ${formatNumber(product.currentPrice)}`}
             
              />
               <PriceInfoCard
              title="Average Price"
              iconSrc="/assets/icons/chart.svg"
              value={`${product.currency} ${formatNumber(product.averagePrice)}`}
            
              />
               <PriceInfoCard
              title="Highest Price"
              iconSrc="/assets/icons/arrow-up.svg"
              value={`${product.currency} ${formatNumber(product.highestPrice)}`}
              
              />
               <PriceInfoCard
              title="Lowest Price"
              iconSrc="/assets/icons/arrow-down.svg"
              value={`${product.currency} ${formatNumber(product.lowestPrice)}`}
             
              />
            </div>
          </div>
          Modal
        </div>
      </div>
      <div className="flex flex-col gap-16 border-2 border-red-500">
        <div className="flex flex-col gap-5">
          <h1 className="text-2xl text-secondary font-semibold">
            Product Description
          </h1>
          <div className="flex flex-col gap-4">
              {product?.description?.split('\n')}
          </div>

        </div>
        <button className="btn w-fit mx-auto flex items-center justify-center gap-3 min-w-[200px]">
          <Image
          src="/assets/icons/bag.svg"
          alt = "Bag"
          height={22}
          width={22}

          />
          <Link href="/" className="text-base text-white">
          Buy Now
          
          </Link>
        </button>

      </div>
    </div>
  );
};

export default page;
