import React, { useEffect } from 'react'
import Layout from '../Layout'
import { Container, Row, Col } from 'react-bootstrap'
import './style.css';
import { useDispatch, useSelector } from 'react-redux';
import { getUserBalance } from '../../actions/balance.action';

const CheckBalance = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        const email = localStorage.getItem('email');
        dispatch(getUserBalance(email));
    }, [dispatch])

    const balance = useSelector(state => state.balance);
    const auth = useSelector(state => state.auth);

    return (
        <Layout sidebar>
            <Container className='container'>
                <Row md={12}>
                    <Col>
                        <div className='heading'>Current Balance</div>
                        <div className='balance'>Rs. {balance.amount}</div>
                    </Col>
                </Row>
            </Container>
        </Layout>
    )
}

export default CheckBalance
