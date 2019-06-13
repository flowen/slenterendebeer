const autoprefixer = require('autoprefixer')
const mqPacker = require('css-mqpacker') // compresses media queries into a single query
const cssnano = require('css-mqpacker') // super compressor

module.exports = {
  siteMetadata: {
    siteUrl: `https://www.slenterendebeer.nl`,
    title: 'Slenterende beer tour dates',
    description:
      'Improvised electronic music by Joep Slenter & Abel de Beer. We mainly use Korg Volca synths. Watch our full jams on YouTube. Follow us for frequent updates on Instagram, Facebook, Twitter or Tumblr. Download our music from Bandcamp. Stream our music from Spotify, Apple Music, Google Play, Deezer and other services.',
    keywords: 'music, live, the Netherlands, Holland, Nederland',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Slenterende beer`,
        short_name: `Slenterende-beer`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#ffffff`,
        display: `standalone`,
        icon: `src/assets/favicon/icon-512x512.png`,
        include_favicon: true,
      },
    },
    `gatsby-plugin-polyfill-io`,
    'gatsby-plugin-offline', // MUST be after the manifest plugin
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        postCssPlugins: [
          autoprefixer(),
          cssnano({
            preset: [
              'default',
              {
                autoprefixer: true,
                discardUnused: true,
                mergeIdents: true,
                zindex: true,
              },
            ],
          }),
          mqPacker({
            sort: true,
          }),
        ],
      },
    },
    'gatsby-transformer-json',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `events`,
        path: `${__dirname}/data/`,
      },
    },
    // `gatsby-plugin-sharp`,
    // 'gatsby-transformer-sharp',
    // {
    //   resolve: `gatsby-plugin-sharp`,
    //   options: {
    //     useMozJpeg: true,
    //     stripMetadata: true,
    //   },
    // },
    // {
    //   resolve: 'gatsby-plugin-web-font-loader',
    //   options: {
    //     google: {
    //       families: ['Comfortaa:400', 'Modak:400'],
    //     },
    //   },
    // },
    // {
    //   resolve: `gatsby-plugin-google-analytics`,
    //   options: {
    //     trackingId: 'UA-77081345-1',
    //     head: false,
    //     anonymize: true,
    //     respectDNT: true,
    //   },
    // },
  ],
}
