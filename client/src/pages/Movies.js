import React, { useState, useEffect } from 'react';
import { Nav, CardBox } from '../components';
import { styles } from '../css';
import { Animated } from "react-animated-css";
import { useQuery } from '@apollo/react-hooks';
import { GET_MOVIES } from '../services/queries';
import { Row } from 'react-materialize';
import ReactLoading from 'react-loading';
import { Link, Switch, Route, useRouteMatch } from 'react-router-dom';

export default function Home() {
    const [isVisible, setisVisible] = useState(false);
    const { loading, error, data } = useQuery(GET_MOVIES);

    useEffect(() => {
        setisVisible(true);
    }, [])

    return (
        <>
            <Nav/>
            <div style={styles.content}>
                <Animated animationIn="fadeInUp" animationOut="fadeOutDown" animationInDuration={1000} animationOutDuration={1000} isVisible={isVisible}>
                    <div style={styles.container}>
                        <h4 style={styles.title}>Movies</h4>
                        {loading === true && <div style={styles.load}>
                            <ReactLoading type={'spin'} color={'#e24141'} height={'10%'} width={'10%'}/>
                        </div>}
                        {data && data.getMovies && <Row>
                            {data.getMovies.map(item => (
                                <>
                                <Animated animationIn="slideInRight" animationOut="slideOutRight" animationInDuration={2000} animationOutDuration={1000} isVisible={loading===false}>
                                    <CardBox key={item._id} data={item}/>
                                </Animated>
                                </>
                            ))}
                        </Row>}
                    </div>
                </Animated>
            </div>
        </>
    )
}