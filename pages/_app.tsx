import { Provider } from "react-redux";
import { store, persistor } from "../src/redux/store";
import Head from 'next'
import { PersistGate } from 'redux-persist/integration/react'
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/js/all.js'
import "../styles/style.css";
import "../styles/radio.css";
// import "../styles/style - in.css";
import "../styles/style - st.css";
function MyApp({ Component, pageProps }: any) {
  return (
    <>
      
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Component {...pageProps} />
        </PersistGate>
      </Provider>
    </>
  )

}

export default MyApp