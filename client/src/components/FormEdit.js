import React, { useState, useEffect } from 'react';
import 'materialize-css';
import { TextInput, Select, Button, Icon } from 'react-materialize';
import { Nav, Error } from '../components';
import { styles } from '../css';
import { Animated } from "react-animated-css";
import { useMutation, useQuery } from '@apollo/react-hooks';
import { UPDATE_MOVIE, GET_MOVIE, GET_MOVIES } from '../services/queries';
import { useHistory, useParams } from 'react-router-dom';

export default function FormInput(props) {
    const [isVisible, setisVisible] = useState(false);
    const { id } = useParams();
    const { loading, error, data } = useQuery(GET_MOVIE, {
        variables: { id: id }
    });
    const [title, setTitle] = useState('');
    const [overview, setOverview] = useState('');
    const [poster_path, setPoster_path] = useState('');
    const [popularity, setPopularity] = useState(0);
    const [tags, setTags] = useState([]);
    const [ updateMovie ] = useMutation(UPDATE_MOVIE, {
        refetchQueries: [{ query: GET_MOVIES }]
    });
    const history = useHistory();
    const [message, setMessage] = useState('');

    useEffect(() => {
        setisVisible(true);
    }, [])

    useEffect(() => {
        if (data) {
            setTitle(data.getMovie.title);
            setOverview(data.getMovie.overview);
            setPoster_path(data.getMovie.poster_path);
            setPopularity(data.getMovie.popularity);
            setTags(data.getMovie.tags);
        }
    }, [data])

    const actionCancel = () => {
        setTitle('');
        setOverview('');
        setPoster_path('');
        setPopularity(0);
        setTags([]);
        history.goBack();
    }

    const actionUpdateMovie = () => {
        if (title === '' || 
            overview === '' || 
            poster_path === '' || 
            popularity === '' || 
            tags.length === 0) {
            setMessage('Input Update cannot be empty!');
            setTimeout(() => {
                setMessage('');
            }, 3000);
        } else  {
            updateMovie({ 
                variables: {
                    id,
                    title, 
                    overview, 
                    poster_path, 
                    popularity: parseFloat(popularity), 
                    tags
                }
            });
            setTitle('');
            setOverview('');
            setPoster_path('');
            setPopularity(0);
            setTags([]);
            history.goBack();
        }
    }

    const cekIsSelect = (value) => {
        if(data) {
            return data.getMovie.tags.find(tag => tag === value) ? true : false;
        }
    }

    const handleChange= function(e) {
        var options = e.target.options;
        var value = [];
        for (var i = 0, l = options.length; i < l; i++) {
            if (options[i].selected) {
            value.push(options[i].value);
            }
        }
        setTags(value);
    }

    return (
        <>
         <Nav/>
            <div style={styles.content}>
                <Animated animationIn="fadeInUp" animationOut="fadeOutDown" animationInDuration={1000} animationOutDuration={1000} isVisible={isVisible}>
                    <div style={styles.container}>
                        {message !== '' && <Error message={message}/>}
                        <h4 style={styles.title}>Update Movie</h4>
                        <div style={styles.formInput}>
                            {data ? <TextInput
                                id="titleID"
                                label="Title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            /> : <TextInput
                                id="titleID"
                                label="Title"
                                onChange={(e) => setTitle(e.target.value)}
                            /> }
                            {data ? <TextInput
                                id="overviewID"
                                label="Overview"
                                value={overview}
                                onChange={(e) => setOverview(e.target.value)}
                            /> : <TextInput
                                id="overviewID"
                                label="Overview"
                                onChange={(e) => setOverview(e.target.value)}
                            />}
                            {data ? <TextInput
                                id="poster_pathID"
                                label="Poster Path"
                                value={poster_path}
                                onChange={(e) => setPoster_path(e.target.value)}
                            /> : <TextInput
                                id="poster_pathID"
                                label="Poster Path"
                                onChange={(e) => setPoster_path(e.target.value)}
                            />}
                            {data ? <TextInput
                                id="popularityID"
                                label="Popularity"
                                type="number"
                                value={popularity}
                                onChange={(e) => setPopularity(e.target.value)}
                            /> : <TextInput
                                id="popularityID"
                                label="Popularity"
                                type="number"
                                onChange={(e) => setPopularity(e.target.value)}
                            />}
                            
                            <Select
                                id="tagsID"
                                multiple
                                options={{
                                    classes: '',
                                    dropdownOptions: {
                                    alignment: 'left',
                                    autoTrigger: true,
                                    closeOnClick: true,
                                    constrainWidth: true,
                                    coverTrigger: true,
                                    hover: false,
                                    inDuration: 150,
                                    onCloseEnd: null,
                                    onCloseStart: null,
                                    onOpenEnd: null,
                                    onOpenStart: null,
                                    outDuration: 250
                                    }
                                }}
                                onChange={(e) => handleChange(e)}
                                >
                                <option
                                    disabled
                                    value=""
                                >
                                    Choose your option
                                </option>
                                {data ? 
                                    <option value="Horror" selected={cekIsSelect('Horror')}>
                                        Horror
                                    </option> : 
                                    <option value="Horror">
                                        Horror
                                    </option>
                                }
                                {data ? 
                                    <option value="Comedy" selected={cekIsSelect('Comedy')}>
                                        Comedy
                                    </option> : 
                                    <option value="Comedy">
                                        Comedy
                                    </option>
                                }
                                {data ? 
                                    <option value="Romantic" selected={cekIsSelect('Romantic')}>
                                        Romantic
                                    </option> : 
                                    <option value="Romantic">
                                        Romantic
                                    </option>
                                }
                            </Select>
                            <Button
                                node="button"
                                waves="light"
                                onClick={actionCancel}
                                style={{margin: '10px'}}
                            >
                                Cancel
                                <Icon right>
                                    cancel
                                </Icon>
                            </Button>
                            <Button
                                node="button"
                                waves="light"
                                onClick={actionUpdateMovie}
                                style={{margin: '10px'}}
                            >
                                Update
                                <Icon right>
                                    send
                                </Icon>
                            </Button>
                        </div>
                    </div>
                </Animated>
            </div>
        </>
    )
}