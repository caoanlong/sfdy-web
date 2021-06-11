import '../styles/globals.css'
import React, { FC } from 'react'
import type { AppContext, AppProps } from 'next/app'
import { wrapper } from '../store'
import Layout from '../components/Layout'
import VodTypeApi from '../services/VodTypeApi'


const WrappedApp = ({ Component, pageProps }: AppProps) => {
	return (
		<Layout>
			<Component { ...pageProps} />
		</Layout>
	)
}

WrappedApp.getInitialProps = wrapper.getInitialAppProps(store => async ({ Component, ctx }: AppContext): Promise<any> => {
	const state = store.getState()
	console.log('初始化...')
	if (!state.typeList || state.typeList.length === 0) {
		const { data } = await VodTypeApi.findAll()
		if (data.code === 200) {
			store.dispatch({
				type: 'SET_TYPES',
				payload: data.data
			})
			console.log('初始化完成...')
		}
	}
	
	
})

// WrappedApp.getServerSideProps = wrapper.getServerSideProps(() => {
// 	console.log('初始化...')
// })


export default wrapper.withRedux(WrappedApp)
