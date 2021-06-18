const withPWA = require('next-pwa')
const withSitemap = require("next-with-sitemap")

module.exports = withSitemap(withPWA({
    sitemap: {
        baseUrl: "https://jyavs.com",
        dest: 'public',
        pages: 'pages',
        robots: true,
        sitemap: true
    },
    pwa: {
        dest: 'public'
    },
    env: {
        lang: 'zh-CN',
        theme_color: '#111827',
        title: process.env.SITE_NAME,
        site_url: process.env.SITE_URL,
        api_url: process.env.API_URL,
        description: '搞笑的免费在线短视频预告片分享,最新免费成人影片',
        keywords: '短视频,搞笑视频,视频分享,免费视频,在线视频,预告片'
    },
    async redirects() {
        return [
            {
                source: '/404',
                destination: '/',
                permanent: true,
            }
        ]
    }
}))