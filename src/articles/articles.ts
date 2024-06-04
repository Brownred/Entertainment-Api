import axios from "axios"
import cheerio from 'cheerio'


import { Article } from "../types/types"
import { sites } from "../sites"


const articles: Article[] = []

sites.forEach(site => {
    axios.get(site.address).then(response => {
        const html = response.data
        const $ = cheerio.load(html)

        // Store the articles' a tags
        $('a').each((index, element) => {
            const href = $(element).attr('href')
            if (href && (href.includes('article') || href.includes('football') || href.includes('sport'))) {
                let url;

                // Article validation
                if (site.name === 'thetimes' || site.name === 'guardian') {
                    if (!href.includes('article') && !href.includes('sport')) {
                        console.log('no article or sport here')
                        return
                    }
                    if (site.name === 'guardian') {
                        url = `${site.base}${href}`
                    } else {
                        url = `${site.base}${href}`
                    }
                }
                if (site.name === 'telegraph') {
                    if (!href.includes('2024')) {
                        console.log('no 2024 here')
                        return
                    }
                    url = `${site.base}${href}`
                }

                if (url === undefined) {
                    console.log('no url here')
                    return
                }

                const title = $(element).text()
                if (title !== '' && !title.includes('comments')){
                    articles.push({
                        title,
                        url,
                        source: site.name
                    })
                }

            }
        })
    })
})

export { articles }