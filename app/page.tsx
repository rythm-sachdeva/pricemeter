import HeroCarousel from '@/Components/HeroCarousel'
import Searchbar from '@/Components/Searchbar'
import Image from 'next/image'
import React from 'react'
import { getAllProducts } from '@/lib/actions'
import ProductCard from '@/Components/ProductCard'

const Home = async () => {
  const products = await getAllProducts();
  return (
    <>
    <section className='px-6  md:px-20 py-24 '>
      <div className='flex max-xl:flex-col gap-16'>
        <div className='flex flex-col justify-center'>
          <p className='small-text'>
            Smart Shopping Starts Here 
            <Image
             src="/assets/icons/arrow-right.svg"
             alt="arrow-right"
             width={18}
             height={18}

            />

          </p>
          <h1 className='head-text'>
            Unleash The Power Of <span className='text-primary'>PriceMeter</span>
          </h1>
          <p className='mt-6'>
          Powerful, self-serve product and growth analytics to help you convert, engage, and retain more.
          </p>
         <Searchbar/>
        </div>
        <HeroCarousel/>
      </div>
    </section>

    <section className='trending-section'>
      <h2 className='section-text'>Trending</h2>
      <div className='flex flex-wrap gap-x-8 gap-y-16'>
        {
          products?.map((product)=>(
            <ProductCard key={product._id} product={product}/>
            ))
        }
      </div>

    </section>
    </>
  )
}

export default Home