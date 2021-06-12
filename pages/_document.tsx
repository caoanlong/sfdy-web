import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document'


class Mydocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        const initialProps = await Document.getInitialProps(ctx)
        return { ...initialProps }
    }

    render() {
        return (
            <Html lang="zh-CN">
                <Head />
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default Mydocument