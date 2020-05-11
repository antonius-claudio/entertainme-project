import React, { useState, useEffect } from 'react';
import { Nav, CardBox, Loading } from '../components';
import { styles } from '../css';
import { Animated } from "react-animated-css";
import { useQuery } from '@apollo/react-hooks';
import { GET_MOVIES } from '../services/queries';
import { Row, Button, Icon } from 'react-materialize';
import ReactLoading from 'react-loading';
import { Link, Switch, Route, useRouteMatch, useHistory } from 'react-router-dom';
import { FormInput } from '../components';

export default function Home() {
    const [isVisible, setisVisible] = useState(false);
    const [isVisiButton, setIsVisiButton] = useState(true);
    const { loading, error, data } = useQuery(GET_MOVIES);
    const history = useHistory();
    let { path, url } = useRouteMatch();

    const actionAdd = () => {
        setIsVisiButton(false);
    }

    const actionCancel = () => {
        setIsVisiButton(true);
        setTimeout(() => {
            history.goBack();
        }, 800);
    }

    useEffect(() => {
        setisVisible(true);
        setIsVisiButton(true);
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
                        <h4 style={styles.title}>Movies</h4>
                        {loading === true && <Loading/>}
                        <Switch>
                            {/* <Route path='/movies-add'> */}
                            <Route path={`${path}/add`}>
                                <FormInput 
                                    isVisiButton={isVisiButton} 
                                    actionCancel={actionCancel} 
                                    setIsVisiButton={setIsVisiButton}
                                />
                            </Route>
                        </Switch>
                        {isVisiButton && 
                        // <Link to={{
                        //     pathname:`/add`, 
                        //     state:{ isVisiButton, button:() => {}}
                        // }}>
                        // <Link to='/movies-add'>
                        <Link to={`${url}/add`}>
                            <Button
                                node="a"
                                small
                                waves="light"
                                onClick={actionAdd}
                                style={{marginBottom: '3%'}}
                            >
                                Add
                                <Icon right>
                                add
                                </Icon>
                            </Button>
                        </Link>
                        }
                        {data && data.getMovies && 
                        <Row>
                            {data.getMovies.map(item => (
                                <>
                                <Animated 
                                    animationIn="slideInRight" 
                                    animationOut="slideOutRight" 
                                    animationInDuration={2000} 
                                    animationOutDuration={1000} 
                                    isVisible={loading===false}
                                >
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
                    </div>
                </Animated>
            </div>
        </>
    )
}