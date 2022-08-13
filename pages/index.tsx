import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

import { useIntl } from "react-intl";
import { useRouter } from 'next/router'
import HomaPage from './[language]/index'
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {

  return (
    <>
      
      <HomaPage />

    </>
  )
};

export default Home;
