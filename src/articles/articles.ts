import axios from "axios"
import cheerio from 'cheerio'


import { Article } from "../types/types"
import { newsPapers } from "../sites"


const articles: Article[] = []

newsPapers.forEach(newsPaper => {
    axios.get(newsPaper.address).then(response => {
        const html = response.data
        const $ = cheerio.load(html)

        // Store the articles' a tags
        $('a').each((index, element) => {
            const href = $(element).attr('href')
            if (href && (href.includes('article') || href.includes('football') || href.includes('sport'))) {
                const title = $(element).text()
                const url = `https://www.theguardian.com${href}`
                if (title !== '' && !title.includes('comments')){
                    articles.push({
                        title,
                        url,
                        source: newsPaper.name
                    })
                }

            }
        })
    })
})

export { articles }