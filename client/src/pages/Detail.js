import React, { useState, useEffect } from 'react';
import { Nav, Loading, Error } from '../components';
import { styles } from '../css';
import { Animated } from "react-animated-css";
import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_MOVIE, GET_ATVSERIES, DELETE_MOVIE, GET_MOVIES, ADD_FAVORITES, GET_FAVORITES } from '../services/queries';
import { Row, Col, Button, Icon } from 'react-materialize';
import { useParams, useLocation, useHistory, Link } from 'react-router-dom';
import SweetAlert from 'sweetalert2-react';

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
    const [ addFavorites, { data: dataFavorites } ] = useMutation(ADD_FAVORITES);
    const [isDelete, setIsDelete] = useState(false);
    // const { loadingFav, errorFav, dataFav } = useQuery(GET_FAVORITES);
    // const [isNotDuplicate, setIsNotDuplicate] = useState(true);
    const [message, setMessage] = useState('');

    const actionDelete = () => {
        setIsDelete(false);
        deleteMovie({ variables: {id}});
        history.goBack();
    }

    const actionBack = () => {
        history.goBack();
    }

    const actionFavorite = () => {
        if (data) {
            // console.log('masuk if data')
            // if (dataFav) {
            // console.log('masuk if dataFav', dataFav)
            //     dataFav.favorites.find(item => item._id === data.getMovie._id) ? 
            //         setIsNotDuplicate(false) : setIsNotDuplicate(true);
            //     console.log(isNotDuplicate)
            //     isNotDuplicate === true ? console.log('Movie already added!') : console.log('add to fav')
            // } else {
                addFavorites({
                    variables: {
                        id: data.getMovie._id,
                        title: data.getMovie.title, 
                        overview: data.getMovie.overview, 
                        poster_path: data.getMovie.poster_path, 
                        popularity: parseFloat(data.getMovie.popularity), 
                        tags: data.getMovie.tags
                    }
                })
                setMessage('Added to Fav!');
                setTimeout(() => {
                    setMessage('');
                }, 3000);
            // }
        }
    }

    useEffect(() => {
        setisVisible(true);
        setIsDelete(false);
    }, [])
    

    return (
        <>
            <Nav/>
            <div style={styles.content}>
                <Animated animationIn="fadeInUp" animationOut="fadeOutDown" animationInDuration={1000} animationOutDuration={1000} isVisible={isVisible}>
                    <div style={styles.container}>
                        <h4 style={styles.title}>Detail</h4>
                        {message !== '' && <Error message={message}/>}
                        {/* {JSON.stringify(isNotDuplicate)} */}
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
                                            onClick={()=>setIsDelete(true)}
                                        >
                                            Delete
                                            <Icon right>
                                            delete
                                            </Icon>
                                        </Button>
                                        <SweetAlert
                                            show={isDelete}
                                            title="Delete!"
                                            text="Are you sure want to delete this?"
                                            onConfirm={actionDelete}
                                        />
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
                                    {/* <Col 
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
                                    </Col> */}
                                </Col>
                            </Row>
                        }
                    </div>
                </Animated>
            </div>
        </>
    )
}