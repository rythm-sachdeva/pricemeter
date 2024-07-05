"use client"
import { scrapeAndStoreProduct } from '@/lib/actions';
import React, { FormEvent, useState } from 'react'


const Searchbar = () => {

  const [SearchPrompt,setSearchPrompt] = useState('');
  const [isLoading,setIsLoading] = useState(false);

 const isValidAmazonProductURL = (url : string)=>{
  try {
    const parsedURL = new URL(url);
    const hostname = parsedURL.hostname;
    if(hostname.includes('amazon.com') || hostname.includes('amazon.') || hostname.endsWith('amazon'))
      {
        return true;
      }
  } catch (error) {
    return false;
  }
  return false;
 }

const handleSubmit= async (event: FormEvent<HTMLFormElement>)=>{
  event.preventDefault()
  const isValidLink = isValidAmazonProductURL(SearchPrompt);
  if(!isValidLink) return alert('Please Provide a valid amazon link')
    try {
      setIsLoading(true);
      const product = await scrapeAndStoreProduct(SearchPrompt);
      

    } catch (error) {

    } finally{
      setIsLoading(false);
    }
}

  return (
   <form className='flex flex-wrap gap-4 mt-12' onSubmit={handleSubmit} >
    <input
    type='text'
    value={SearchPrompt}
    onChange={(e)=>setSearchPrompt(e.target.value)}
    placeholder='Enter Product Link'
    className='searchbar-input'
    />
    <button type='submit' className='searchbar-btn' disabled={SearchPrompt===''}> {isLoading? 'Searching..':'Search'}</button>
   </form>
  )
}

export default Searchbar