// This file is empty, but some people were reporting that it would not start unless they had an empty file. So here it is! You can delete the comment. Or replace it with your favourite shania twain lyrics.
import dotenv from 'dotenv';

dotenv.config ({ path: '.env' });

export default {
    siteMetadata: {
        title: `Slick&quot;s Slices`,
        siteUrl: `https:gatsby.pizza.com`,
        description: `The best pizza place ever!`,
        twitter: `@slicksslices`,
    },
    plugins: [
        'gatsby-plugin-react-helmet',
        'gatsby-plugin-styled-components',
        {
            resolve: 'gatsby-source-sanity',
            options: {
                projectId: 'knk9mv58',
                dataset: 'production',
                watchMode: true,
                token: process.env.SANITY_TOKEN,

            }
        }
    ]
}