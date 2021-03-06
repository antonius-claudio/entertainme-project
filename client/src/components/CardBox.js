import React from 'react';
import 'materialize-css';
import { Col } from 'react-materialize';
import { styles } from '../css';

export default function CardBox(props) {
    return (
        <Col
            s={6}
            m={3}
            l={2}
        >
            <div style={styles.cardBox}>
                <img src={props.data.poster_path} className='responsive-img'/>
                <div style={styles.titleMovieBox}>{props.data.title}</div>
            </div>
        </Col>
    )
}