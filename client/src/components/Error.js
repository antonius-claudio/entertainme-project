import React from 'react';
import { styles } from '../css';

export default function Error(props) {
    return (
        <>
            <div style={styles.toast}>{props.message}</div>
        </>
    )
}