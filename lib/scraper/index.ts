import axios from "axios";
import * as cheerio from 'cheerio';
import { extractPrice } from "../utils";

export async function scrapeAmazonProduct(url:string){
    if(!url) return;
    
    // curl --proxy brd.superproxy.io:22225 --proxy-user brd-customer-hl_55d73cc0-zone-pricemeter:gkshf0g8k48p -k "http://geo.brdtest.com/mygeo.json"

    //BrightData Proxy Configuration 
    const username= String(process.env.BRIGHT_DATA_USERNAME);
    const password= String(process.env.BRIGHT_DATA_PASSWORD);
    const port= 22225;
    const session_id = (1000000 * Math.random()) | 0;
    const options = {
        auth:{
            username: `${username}-session-${session_id}`,
            password,
        },
        host: 'brd.superproxy.io',
        port,
        rejectUnauthorized:false,
    }

    try {
        
        const response = await axios.get(url,options)
        // console.log(response.data);
        const $= cheerio.load(response.data);
        const title =$('#productTitle').text().trim();
        // console.log({title});
        const currentPrice = extractPrice(
            $('.priceToPay span.a-price-whole'),
            $('a.size.base.a-color-price'),
            $('.a-button-selected .a-color-base'),
            $('.a-price.a-text-price')
        );
        // console.log({currentPrice});

    } catch (error:any) {
        throw new Error(`Failed to scrape product: ${error.message}`)
    }
}