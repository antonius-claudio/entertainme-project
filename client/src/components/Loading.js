import React from 'react';
import ReactLoading from 'react-loading';
import { styles } from '../css';

export default function Loading(){
    return (
        <div style={styles.load}>
            <ReactLoading 
                type={'spin'} 
                color={'#e24141'} 
                height={'10%'} 
                width={'10%'}
            />
        </div>
    )
}