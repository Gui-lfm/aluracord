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
        ::-webkit-scrollbar {
          width: 20px;
        }
        ::-webkit-scrollbar-track {
          box-shadow: inset 0 0 5px grey; 
          border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb {
          background: #006668; 
          border-radius: 10px;
        }
        a {
          text-decoration: none;
          color: white
        }
        span {
          color: coral;
          line-height: 2;
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
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  )
}