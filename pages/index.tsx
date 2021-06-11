import { GetServerSideProps } from 'next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import Banner from '../components/Banner'
import VodItem from '../components/VodItem'
import VodType from '../types/VodType'
import Vod from '../types/Vod'
import VodApi from '../services/VodApi'


const getVodsNew = async (num=12) => {
	const res = await VodApi.homeNew({ num })
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
  vodsNewList: Array<VodType>
}

function Home({ vodsNewList }: HomeProps) {
	return (
		<main>
			<Banner></Banner>
			<div className="container pt-4">
			{
				vodsNewList.map((vodsNew: VodType) => (
					<div className="mb-6" key={vodsNew.typeId}>
						<div className="p-4">
							<h2 className="text-lg text-gray-700 dark:text-gray-300 inline-block">最新{vodsNew.typeName}</h2>
							<a className="text-sm text-gray-400 inline-block ml-2" href="#">更多</a>
							<FontAwesomeIcon className="w-2 text-gray-400 inline-block " icon={faChevronRight}/>
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
