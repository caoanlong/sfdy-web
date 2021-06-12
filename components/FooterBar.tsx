const links = [
    {
        name: '撸先生',
        url: 'https://luxiansheng.life/'
    },{
        name: '上林仙馆',
        url: 'https://fenglou11.com/'
    },{
        name: '绅士之家',
        url: 'https://kksports.news/'
    },{
        name: '香蕉漫画',
        url: 'https://xjmh.live/'
    }
]
function FooterBar() {
    return (
        <footer className="bg-gray-700 dark:bg-gray-900 text-sm sm:text-base">
            <div className="container text-gray-400 dark:text-gray-600 text-center leading-loose py-8 md:py-14">
                <div className="flex justify-center">
                    <div>友情链接：</div>
                    <ul className="text-gray-400">
                        {
                            links.map((link, i) => (
                                <li key={i} className="inline-block mr-2">
                                    <a 
                                        className="hover:text-gray-100" 
                                        target="_blank" 
                                        href={link.url}>
                                        {link.name}
                                    </a>
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <p>商户合作请联系 Telegram:<a className="text-white dark:text-gray-400" href="https://t.me/jyavs" target="_blank">@jyavs</a></p>
                <p>Copyright © 2021 巨硬AV</p>
            </div>
        </footer>
    )
}

export default FooterBar