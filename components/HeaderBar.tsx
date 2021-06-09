import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faSearch, faBars } from '@fortawesome/free-solid-svg-icons'
import { useState, MouseEvent, createRef, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import VodType from '../types/VodType'

type HeaderBarProps = {
    vodTypes: Array<VodType>
}

function HeaderBar({ vodTypes }: HeaderBarProps) {
    const router = useRouter()
    const [ showNavs, setShowNavs ] = useState(false)
    const keywordsRef = createRef<HTMLInputElement>()
    
    const changePage = (e: MouseEvent<HTMLLIElement>, tId: number) => {
        e.stopPropagation()
        setShowNavs(false)
        router.push(`/list/${tId}`)
    }

    const handleSearch = () => {
        const keyword = keywordsRef.current?.value
        if (keyword) {
            router.push(`/search?keyword=${keyword}`)
        }
    }
    const handleEnter = (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSearch()
        }
    }

    useEffect(() => {
        keywordsRef.current?.addEventListener('keyup', handleEnter)
        return () => {
            keywordsRef.current?.removeEventListener('keyup', handleEnter)
        }
    })

    return (
        <div className="w-full h-12 sm:h-16 fixed z-50 shadow bg-white dark:bg-gray-900">
            <div className="container h-full flex">
                <div 
                    className="w-16 h-full flex justify-center items-center lg:hidden" 
                    onClick={() => setShowNavs(!showNavs)}>
                    <FontAwesomeIcon className="w-6 h-6 text-gray-600 cursor-pointer" icon={faBars}/>
                </div>
                <a className="h-full py-2" style={{width: '160px'}} href="/">
                    <img className="h-full" src="/images/logo.png" alt="LOGO" />
                </a>
                <ul className="flex-1 h-full clear-both hidden lg:block">
                    <li className={`float-left h-full px-4 flex items-center ${router.asPath === '/' ? 'text-purple-500' : 'text-gray-600 hover:text-purple-500'}`}>
                        <Link href="/">首页</Link>
                    </li>
                    {
                        vodTypes.map((nav: VodType) => (
                            <li 
                                className={`float-left h-full px-4 flex items-center ${router.asPath === '/list/' + nav.typeId ? 'text-purple-500' : 'text-gray-600 dark:text-gray-500 hover:text-purple-500'}`} 
                                key={nav.typeId}>
                                <Link href={`/list/${nav.typeId}`}><a>{nav.typeName}</a></Link>
                            </li>
                        ))
                    }
                </ul>
                {
                    showNavs && <div 
                        className="w-full fixed left-0 top-12 right-0 bottom-0 bg-black bg-opacity-50 backdrop-filter backdrop-blur" 
                        onClick={() => setShowNavs(false)}>
                        <ul className="w-full absolute left-0 top-0 sm:top-16 bg-gray-100 dark:bg-gray-800 shadow-md lg:hidden">
                            <li className={`container h-14 px-4 flex items-center ${router.asPath === '/' ? 'text-purple-500' : 'text-gray-600'}`}>
                                <Link href="/">首页</Link>
                            </li>
                            {
                                vodTypes.map((nav: VodType) => (
                                    <li 
                                        className={`container h-14 px-4 flex items-center ${router.asPath === '/list/' + nav.typeId ? 'text-purple-500' : 'text-gray-600 dark:text-gray-500'}`} 
                                        key={nav.typeId} 
                                        onClick={(e: MouseEvent<HTMLLIElement>) => changePage(e, nav.typeId)}>
                                        {nav.typeName}
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                }
                
                <div className="w-64 h-full items-center hidden sm:flex">
                    <div 
                        className="h-8 bg-gray-100 dark:bg-gray-700 border-gray-200 dark:border-gray-600 border rounded-3xl flex focus-within:ring-2 focus-within:border-purple-600">
                        <input ref={keywordsRef} className="flex-1 h-full px-3 bg-transparent outline-none dark:text-white" type="text" placeholder="请输入关键字"/>
                        <div className="w-8 h-full flex justify-center items-center cursor-pointer" onClick={handleSearch}>
                            <FontAwesomeIcon className="w-3 h-3 text-gray-400" icon={faSearch}/>
                        </div>
                    </div>
                </div>
                <div className="flex-1 lg:flex-none lg:w-40 h-full flex justify-end items-center px-4">
                    <FontAwesomeIcon className="w-4 h-8 text-gray-600 cursor-pointer" icon={faUser}/>
                </div>
            </div>
        </div>
    )
}

export default HeaderBar