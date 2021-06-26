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
                    {
                        process.env.NODE_ENV === 'production' 
                        ? (<>
                              
                                <script src="https://www.gstatic.com/firebasejs/8.6.8/firebase-app.js"></script>
                                <script src="https://www.gstatic.com/firebasejs/8.6.8/firebase-analytics.js"></script>
                                <script dangerouslySetInnerHTML={{
                                    __html: `
                                    var firebaseConfig = {
                                      apiKey: "AIzaSyBu0HZe7ZFXBh_gBkfqXoMwAP-hjZQ9jZ0",
                                      authDomain: "jyav-3728d.firebaseapp.com",
                                      projectId: "jyav-3728d",
                                      storageBucket: "jyav-3728d.appspot.com",
                                      messagingSenderId: "464543886366",
                                      appId: "1:464543886366:web:23b57381b8d8aaf7fa920f",
                                      measurementId: "G-H0S6J67LXG"
                                    };
                                    firebase.initializeApp(firebaseConfig);
                                    window.analytics = firebase.analytics();
                                    `
                                }} />
                                <script async src="https://www.googletagmanager.com/gtag/js?id=G-2XV487XEMB"></script>
                                <script dangerouslySetInnerHTML={{
                                    __html: `
                                      window.dataLayer = window.dataLayer || [];
                                      function gtag(){dataLayer.push(arguments);}
                                      gtag('js', new Date());
                                      gtag('config', 'G-2XV487XEMB');
                                    `
                                }} />
                            </>)
                        : <></>
                    }
                </body>
            </Html>
        )
    }
}

export default Mydocument