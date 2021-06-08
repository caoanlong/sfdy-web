import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faSearch, faBars } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import VodType from '../types/VodType'

type HeaderBarProps = {
    vodTypes: Array<VodType>
}

function HeaderBar({ vodTypes }: HeaderBarProps) {
    const router = useRouter()
    const { typeId='0' } = router.query
    const [ showNavs, setShowNavs ] = useState(false)

    return (
        <div className="w-full h-16 bg-white shadow fixed z-50">
            <div className="container h-full flex">
                <div 
                    className="w-16 h-full flex justify-center items-center lg:hidden" 
                    onClick={() => setShowNavs(!showNavs)}>
                    <FontAwesomeIcon className="w-6 h-6 text-gray-700 cursor-pointer" icon={faBars}/>
                </div>
                <a className="h-full py-2" style={{width: '160px'}} href="/">
                    <img className="h-full" src="/images/logo.png" alt="LOGO" />
                </a>
                <ul className="flex-1 h-full text-gray-600 clear-both hidden lg:block">
                    <li className={`float-left h-full px-4 flex items-center ${typeId === '0' && 'text-purple-500'}`}>
                        <Link href="/">首页</Link>
                    </li>
                    {
                        vodTypes.map((nav: VodType) => (
                            <li 
                                className={`float-left h-full px-4 flex items-center ${+typeId === nav.typeId && 'text-purple-500'}`} 
                                key={nav.typeId}>
                                <Link href={`/list/${nav.typeId}`}><a>{nav.typeName}</a></Link>
                            </li>
                        ))
                    }
                </ul>
                {
                    showNavs && <ul className="w-full absolute left-0 top-16 bg-gray-100 text-gray-700 shadow-md lg:hidden">
                        <li className="container h-14 px-4 flex items-center">
                            <Link href="/">首页</Link>
                        </li>
                        {
                            vodTypes.map((nav: VodType) => (
                                <li className="container h-14 px-4 flex items-center" key={nav.typeId}>
                                    <Link href={`/list/${nav.typeId}`}><a>{nav.typeName}</a></Link>
                                </li>
                            ))
                        }
                    </ul>
                }
                
                <div className="w-64 h-full items-center hidden sm:flex">
                    <div className="h-8 bg-gray-100 border-gray-200 border rounded-3xl flex focus-within:ring-2 focus-within:border-purple-600">
                        <input className="flex-1 h-full px-3 bg-transparent outline-none" type="text" placeholder="请输入关键字"/>
                        <div className="w-8 h-full flex justify-center items-center cursor-pointer">
                            <FontAwesomeIcon className="w-3 h-3 text-gray-400" icon={faSearch}/>
                        </div>
                    </div>
                </div>
                <div className="flex-1 lg:flex-none lg:w-40 h-full flex justify-end items-center px-4">
                    <FontAwesomeIcon className="w-4 h-8 text-gray-700 cursor-pointer" icon={faUser}/>
                </div>
            </div>
        </div>
    )
}

export default HeaderBar