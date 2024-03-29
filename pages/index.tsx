import { GetServerSideProps } from 'next'
import Link from 'next/link'
import BannerCom from '../components/Banner'
import VodItem from '../components/VodItem'
import SEO from '../components/SEO'
import VodType from '../types/VodType'
import Vod from '../types/Vod'
import CommonApi from '../services/CommonApi'
import { useSelector } from 'react-redux'
import { RootState } from '../store'
import Banner from '../types/Banner'
import Seo from '../types/Seo'
import React from 'react'
import { IoChevronForwardOutline } from 'react-icons/io5'
import MarqueeX from '../components/MarqueeX'


const getVodsNew = async (num=12) => {
	const res = await CommonApi.home({ num })
	if (!res.data || res.data.code != 200) {
		return null
	}
	return res.data.data
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	const vodsNewList = await getVodsNew()
	return {
		props: {
			vodsNewList
		}
	}
}

type HomeProps = {
  vodsNewList: VodType[]
}

function Home({ vodsNewList }: HomeProps) {
	const seo: Seo = useSelector((state: RootState) => state.config.seo)
	const banners: Banner[] = useSelector((state: RootState) => state.config.banners)
	return (
		<main>
			<SEO 
				title={`${seo?.seoDescription}-${seo?.seoTitle}`} 
				description={seo?.seoDescription as string} 
				canonical={process.env.site_url} 
			/>
			<BannerCom banners={banners}></BannerCom>
			<MarqueeX />
			<div className="container pt-4">
			{
				vodsNewList.map((vodsNew: VodType) => (
					<div className="mb-6" key={vodsNew.typeId}>
						<div className="p-4 flex items-center">
							<h1 className="text-lg text-gray-700 dark:text-gray-300 inline-block">最新{vodsNew.typeName}</h1>
							<Link href={`/list/${vodsNew.typeId}/全部?orderBy=time`}>
								<a className="text-gray-400 flex items-center">
									<div className="text-sm ml-2">更多</div>
									<IoChevronForwardOutline />
								</a>
							</Link>
						</div>
						<div className="px-4 grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
						{
							vodsNew?.vods?.map((vod: Vod) => <VodItem key={vod.vodId} vod={vod} />)
						}
						</div>
					</div>
				))
			}
			</div>
		</main>
	)
}

export default Home
