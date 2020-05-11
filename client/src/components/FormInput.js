import React, { useState } from 'react';
import 'materialize-css';
import { TextInput, Select, Button, Icon } from 'react-materialize';
import { styles } from '../css';
import { Animated } from "react-animated-css";
import { useMutation } from '@apollo/react-hooks';
import { CREATE_MOVIE, GET_MOVIES } from '../services/queries';
import { useHistory } from 'react-router-dom';
import { Error } from '../components';

export default function FormInput(props) {
    const [title, setTitle] = useState('');
    const [overview, setOverview] = useState('');
    const [poster_path, setPoster_path] = useState('');
    const [popularity, setPopularity] = useState(0);
    const [tags, setTags] = useState([]);
    const [ createMovie ] = useMutation(CREATE_MOVIE, {
        refetchQueries: [{ query: GET_MOVIES }]
    });
    const history = useHistory();
    const [message, setMessage] = useState('');

    const actionSubmitMovie = () => {
        if (title === '' || 
            overview === '' || 
            poster_path === '' || 
            popularity === '' || 
            tags.length === 0) {
            setMessage('Input Create cannot be empty!');
            setTimeout(() => {
                setMessage('');
            }, 3000);
        } else  {
            createMovie({ variables: {title, overview, poster_path, popularity: parseFloat(popularity), tags}});
            setTitle('');
            setOverview('');
            setPoster_path('');
            setPopularity(0);
            setTags([]);
            props.setIsVisiButton(true);
            history.push('/movies');
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
            <Animated animationIn="slideInRight" animationOut="slideOutRight" animationInDuration={1000} animationOutDuration={800} isVisible={props.isVisiButton === false}>
                <div style={styles.formInput}>
                    {message !== '' && <Error message={message}/>}
                    <TextInput
                        id="titleID"
                        label="Title"
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <TextInput
                        id="overviewID"
                        label="Overview"
                        onChange={(e) => setOverview(e.target.value)}
                    />
                    <TextInput
                        id="poster_pathID"
                        label="Poster Path"
                        onChange={(e) => setPoster_path(e.target.value)}
                    />
                    <TextInput
                        id="popularityID"
                        label="Popularity"
                        type="number"
                        onChange={(e) => setPopularity(e.target.value)}
                        min='0'
                    />
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
                        <option value="Horror">
                            Horror
                        </option>
                        <option value="Comedy">
                            Comedy
                        </option>
                        <option value="Romantic">
                            Romantic
                        </option>
                    </Select>
                    <Button
                        node="button"
                        waves="light"
                        onClick={props.actionCancel}
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
                        onClick={actionSubmitMovie}
                        style={{margin: '10px'}}
                    >
                        Submit
                        <Icon right>
                            send
                        </Icon>
                    </Button>
                </div>
            </Animated>
        </>
    )
}