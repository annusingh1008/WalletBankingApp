import React from 'react'
import Layout from '../Layout'
import wallet from '../../images/wallet.png';
import './style.css';

const Home = () => {
  return (
    <Layout sidebar>
        <img className='image' src={wallet}/>
    </Layout>
  )
}

export default Home
