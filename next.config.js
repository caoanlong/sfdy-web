// const withPWA = require('next-pwa')

// module.exports = withPWA({
//     pwa: {
//         dest: 'public'
//     }
// })

module.exports = {
    env: {
        lang: 'zh-CN',
        theme_color: '#111827',
        title: '巨硬AV',
        site_url: 'https://jyavs.com/',
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
}