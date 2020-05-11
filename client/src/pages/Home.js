import React, { useState, useEffect } from 'react';
import { Nav, CardBox, Loading } from '../components';
import { styles } from '../css';
import { Animated } from "react-animated-css";
import { useQuery } from '@apollo/react-hooks';
import { GET_ALL } from '../services/queries';
import { Row } from 'react-materialize';
import { Link } from 'react-router-dom';

export default function Home() {
    const [isVisible, setisVisible] = useState(false);
    const { loading, error, data } = useQuery(GET_ALL);
    // const { loading: loadingMovie, error: errorMovie, data: dataMovie } = useQuery(GET_MOVIE, {
    //     variables: { id: "5eb7976246f2060e6415decf" }
    // });

    useEffect(() => {
        setisVisible(true);
    }, [])

    return (
        <>
            <Nav/>
            <div style={styles.content}>
                <Animated animationIn="fadeInUp" animationOut="fadeOutDown" animationInDuration={1000} animationOutDuration={1000} isVisible={isVisible}>
                    <div style={styles.container}>
                        <h4 style={styles.title}>Home</h4>
                        {loading === true && <Loading/>}
                        {data && data.getMovies && <Row>
                            {data.getMovies.map(item => (
                                <>
                                <Animated animationIn="slideInRight" animationOut="slideOutRight" animationInDuration={2000} animationOutDuration={1000} isVisible={loading===false}>
                                    <Link to={{
                                        pathname: `/movie-detail/${item._id}`, 
                                        state: { type:'Movies' }}}
                                    >
                                        <CardBox key={item._id} data={item}/>
                                    </Link>
                                </Animated>
                                </>
                            ))}
                        </Row>}
                        {data && data.getTvSeries && <Row>
                            {data.getTvSeries.map(item => (
                                <>
                                <Animated animationIn="slideInRight" animationOut="slideOutRight" animationInDuration={3000} animationOutDuration={1000} isVisible={loading===false}>
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
                        {/* {dataMovie && <CardBox data={dataMovie}/>} */}
                        {/* {dataMovie && JSON.stringify(dataMovie)} */}
                        {/* <p>{JSON.stringify(data)}</p> */}
                        {/* <p>{JSON.stringify(data.getMovies)}</p> */}
                    </div>
                </Animated>
            </div>
        </>
    )
}