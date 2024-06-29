import axios from "axios"
import cheerio from 'cheerio'


import { Article } from "../types/types"
import { sites } from "../sites"



export async function getArticles() {
    
    const articles: Article[] = []
    
    const promise = sites.map(async site => {
        await axios.get(site.address).then(response => {
            const html = response.data
            const $ = cheerio.load(html)
     
            // Store the articles' a tags
            $('a').each((index, element) => {
                const href = $(element).attr('href')
                if (href && (href.includes('article') || href.includes('football') || href.includes('sport'))) {
                    
                    let url;
    
                    // Get the artcles urls
                    if (site.name === 'guardian') {
                        let guardianHref = site.base + href
                        
                        if (guardianHref.includes('article') && guardianHref.includes('2024')) {
                            const title = $(element).attr('aria-label')
                            if (title) {
                                articles.push({
                                    title,
                                    url: guardianHref,
                                    source: site.name
                                })
                            }
                        }
    
                    }
    
                    
                    if (site.name === 'telegraph') {
                        if (href.includes('football/2024')) {
                            let telegraphHref = site.base + href
                            const title = $(element).text().replace(/\s+/g, ' ').trim();
                            
                                articles.push({
                                    title,
                                    url: telegraphHref,
                                    source: site.name
                                })
                            
                        }
                    }
                }
            })
        })
    }) 
    
    await Promise.all(promise)
    
    return articles

}
