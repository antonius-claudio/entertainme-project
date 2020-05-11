import React, { useState, useEffect } from 'react';
import { Nav, CardBox, Loading } from '../components';
import { styles } from '../css';
import { Animated } from "react-animated-css";
import { useQuery } from '@apollo/react-hooks';
import { GET_TVSERIES } from '../services/queries';
import { Row } from 'react-materialize';
import ReactLoading from 'react-loading';
import { Link, useHistory } from 'react-router-dom';

export default function Home() {
    const [isVisible, setisVisible] = useState(false);
    const { loading, error, data } = useQuery(GET_TVSERIES);

    useEffect(() => {
        setisVisible(true);
    }, [])

    return (
        <>
            <Nav/>
            <div style={styles.content}>
                <Animated 
                    animationIn="fadeInUp" 
                    animationOut="fadeOutDown" 
                    animationInDuration={1000} 
                    animationOutDuration={1000} 
                    isVisible={isVisible}
                >
                    <div style={styles.container}>
                        <h4 style={styles.title}>Tv Series</h4>
                        {loading === true && <Loading/>}
                        {data && data.getTvSeries && 
                        <Row>
                            {data.getTvSeries.map(item => (
                                <>
                                <Animated 
                                    animationIn="slideInRight" 
                                    animationOut="slideOutRight" 
                                    animationInDuration={2000} 
                                    animationOutDuration={1000} 
                                    isVisible={loading===false}
                                >
                                    <Link to={{
                                        pathname: `/tvseries-detail/${item._id}`, 
                                        state: { type:'TvSeries' }}}
                                    >
                                        <CardBox key={item._id} data={item}/>
                                    </Link>
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