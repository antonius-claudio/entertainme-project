import React, { useState, useEffect } from 'react';
import { Nav, CardBox, Loading } from '../components';
import { styles } from '../css';
import { Animated } from "react-animated-css";
import { useQuery } from '@apollo/react-hooks';
import { GET_FAVORITES } from '../services/queries';
import { Row } from 'react-materialize';

export default function Favorites() {
    const [isVisible, setisVisible] = useState(false);
    const { loading, error, data } = useQuery(GET_FAVORITES);

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
                        <h4 style={styles.title}>Favorites</h4>
                        {loading === true && <Loading/>}
                        {data && data.favorites && 
                        <Row>
                            {data.favorites.map(item => (
                                <>
                                <Animated 
                                    animationIn="slideInRight" 
                                    animationOut="slideOutRight" 
                                    animationInDuration={2000} 
                                    animationOutDuration={1000} 
                                    isVisible={loading===false}
                                >
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