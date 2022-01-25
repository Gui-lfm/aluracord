function GlobalStyle() { //min-height: 100vh arruma a altura da aplicação
    return (
        <style global jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          list-style: none;
        }
        body {
          font-family: 'Open Sans', sans-serif;
        }
        span {
          color: coral
        }
        /* App fit Height */ 
        html, body, #__next {
          min-height: 100vh; 
          display: flex;
          flex: 1;
        }
        #__next {
          flex: 1;
        }
        #__next > * {
          flex: 1;
        }
        /* ./App fit Height */ 
      `}</style>
    );
}

export default function MyApp({ Component, pageProps }) {
    return (
        <>
            <GlobalStyle/>
            <Component {...pageProps} />
        </>
    )
}