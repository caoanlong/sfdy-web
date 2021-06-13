import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document'


class Mydocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        const initialProps = await Document.getInitialProps(ctx)
        return { ...initialProps }
    }

    render() {
        return (
            <Html lang={process.env.lang}>
                <Head>
                    <script async src="/fastclick.js" />
                    <script
                        dangerouslySetInnerHTML={{
                        __html: `
                            (function (doc) {
                                if (!doc.addEventListener) return;
                                doc.addEventListener('DOMContentLoaded', function() {
                                    FastClick.attach(doc.body);//解决手机浏览器点击事件300ms延迟的bug
                                }, false);
                            })(document, window)

                            if (navigator.userAgent.indexOf('iPhone') > -1) {
                                document.addEventListener('touchstart', function(event) {
                                  if (event.touches.length > 1) {
                                    event.preventDefault()
                                  }
                                })
                                var lastTouchEnd = 0
                                document.addEventListener('touchend', function(event) {
                                  var now = new Date().getTime()
                                  if (now - lastTouchEnd <= 300) {
                                    event.preventDefault()
                                  }
                                  lastTouchEnd = now
                                }, false)
                              }
                              // disable ios scale
                              document.addEventListener('gesturestart', function (event) {
                                event.preventDefault()
                              })
                        `,
                        }}
                    />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default Mydocument