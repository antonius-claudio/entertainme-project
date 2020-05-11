import React, { useState, useEffect } from 'react';
import { Nav, Loading } from '../components';
import { styles } from '../css';
import { Animated } from "react-animated-css";
import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_MOVIE, GET_ATVSERIES, DELETE_MOVIE, GET_MOVIES } from '../services/queries';
import { Row, Col, Button, Icon } from 'react-materialize';
import { gql } from 'apollo-boost';
import { useParams, useLocation, useHistory, Link } from 'react-router-dom';

export default function Detail() {
    const [isVisible, setisVisible] = useState(false);
    const { id } = useParams();
    const location = useLocation();
    const history = useHistory();
    const { loading, error, data } = useQuery(GET_MOVIE, {
        variables: { id: id }
    });
    const { loading:loadingTv, error:errorTv, data:dataTv } = useQuery(GET_ATVSERIES, {
        variables: { id: id }
    });
    const [ deleteMovie ] = useMutation(DELETE_MOVIE, {
        refetchQueries: [{ query: GET_MOVIES }]
    });

    const actionDelete = () => {
        deleteMovie({ variables: {id}});
        history.goBack();
    }

    const actionBack = () => {
        history.goBack();
    }

    const actionFavorite = () => {
        console.log('action fav');
    }

    useEffect(() => {
        setisVisible(true);
    }, [])
    

    return (
        <>
            <Nav/>
            <div style={styles.content}>
                <Animated animationIn="fadeInUp" animationOut="fadeOutDown" animationInDuration={1000} animationOutDuration={1000} isVisible={isVisible}>
                    <div style={styles.container}>
                        <h4 style={styles.title}>Detail</h4>
                        {location.state.type ==='Movies' && loading === true && <Loading/>}
                        {location.state.type !=='Movies' && loadingTv === true && <Loading/>}
                        {location.state.type ==='Movies' && data && 
                            <Row style={styles.contentDetail}>
                                <Col 
                                    s={12}
                                    m={12}
                                    l={3}
                                >
                                    <img src={data.getMovie.poster_path} className='responsive-img'/>
                                </Col>
                                <Col 
                                    s={12}
                                    m={8}
                                    l={9}
                                >
                                    <Row style={styles.contentDetailRight}>
                                        <Col 
                                            s={4}
                                            m={6}
                                            l={3}
                                        >
                                            <div>
                                                <strong>Title</strong>
                                            </div>
                                            <div>
                                                <strong>Overview</strong>
                                            </div>
                                            <div>
                                                <strong>Popularity</strong>
                                            </div>
                                            <div>
                                                <strong>Tags</strong>
                                            </div>
                                        </Col>
                                        <Col 
                                            s={8}
                                            m={6}
                                            l={9}
                                        >
                                            <div>
                                                {data.getMovie.title}
                                            </div>
                                            <div>
                                                {data.getMovie.overview}
                                            </div>
                                            <div>
                                                {data.getMovie.popularity}
                                            </div>
                                            <div>
                                                {data.getMovie.tags.join(', ')}
                                            </div>
                                        </Col>
                                    </Row>
                                    <Col 
                                            s={6}
                                            m={6}
                                            l={3}
                                    >
                                        <Button
                                            node="button"
                                            waves="light"
                                            onClick={actionBack}
                                        >
                                            Back
                                            <Icon right>
                                            arrow_back
                                            </Icon>
                                        </Button>
                                    </Col>
                                    <Col 
                                            s={6}
                                            m={6}
                                            l={3}
                                    >
                                        <Link to={`${location.pathname}/edit`}>
                                            <Button
                                                node="button"
                                                waves="light"
                                            >
                                                Edit
                                                <Icon right>
                                                edit
                                                </Icon>
                                            </Button>
                                        </Link>
                                    </Col>
                                    <Col 
                                            s={6}
                                            m={6}
                                            l={3}
                                    >
                                        <Button
                                            node="button"
                                            waves="light"
                                            onClick={actionDelete}
                                        >
                                            Delete
                                            <Icon right>
                                            delete
                                            </Icon>
                                        </Button>
                                    </Col>
                                    <Col 
                                            s={6}
                                            m={6}
                                            l={3}
                                    >
                                        <Button
                                            node="button"
                                            waves="light"
                                            onClick={actionFavorite}
                                        >
                                            Favorite
                                            <Icon right>
                                            add
                                            </Icon>
                                        </Button>
                                    </Col>
                                </Col>
                            </Row>
                        }
                        {location.state.type !=='Movies' && dataTv && 
                            <Row style={styles.contentDetail}>
                                <Col 
                                    s={12}
                                    m={12}
                                    l={3}
                                >
                                    <img src={dataTv.getATvSeries.poster_path} className='responsive-img'/>
                                </Col>
                                <Col 
                                    s={12}
                                    m={8}
                                    l={9}
                                >
                                    <Row style={styles.contentDetailRight}>
                                        <Col 
                                            s={4}
                                            m={6}
                                            l={3}
                                        >
                                            <div>
                                                <strong>Title</strong>
                                            </div>
                                            <div>
                                                <strong>Overview</strong>
                                            </div>
                                            <div>
                                                <strong>Popularity</strong>
                                            </div>
                                            <div>
                                                <strong>Tags</strong>
                                            </div>
                                        </Col>
                                        <Col 
                                            s={8}
                                            m={6}
                                            l={9}
                                        >
                                            <div>
                                                {dataTv.getATvSeries.title}
                                            </div>
                                            <div>
                                                {dataTv.getATvSeries.overview}
                                            </div>
                                            <div>
                                                {dataTv.getATvSeries.popularity}
                                            </div>
                                            <div>
                                                {dataTv.getATvSeries.tags.join(', ')}
                                            </div>
                                        </Col>
                                    </Row>
                                    <Col 
                                            s={6}
                                            m={6}
                                            l={4}
                                    >
                                        <Button
                                            node="button"
                                            waves="light"
                                            onClick={actionBack}
                                        >
                                            Back
                                            <Icon right>
                                            arrow_back
                                            </Icon>
                                        </Button>
                                    </Col>
                                    <Col 
                                            s={6}
                                            m={6}
                                            l={4}
                                    >
                                        <Button
                                            node="button"
                                            waves="light"
                                            onClick={actionFavorite}
                                        >
                                            Favorite
                                            <Icon right>
                                            add
                                            </Icon>
                                        </Button>
                                    </Col>
                                </Col>
                            </Row>
                        }
                    </div>
                </Animated>
            </div>
        </>
    )
}