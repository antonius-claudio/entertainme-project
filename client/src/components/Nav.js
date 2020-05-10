import React from 'react';
import 'materialize-css';
import { Navbar, NavItem, Icon } from 'react-materialize';
import { Link } from 'react-router-dom';
import { styles } from '../css';

export default function Nav() {
    return (
        <Navbar
            alignLinks="right"
            brand={<a className="brand-logo" href="#">Logo</a>}
            id="mobile-nav"
            menuIcon={<Icon>menu</Icon>}
            options={{
                draggable: true,
                edge: 'left',
                inDuration: 250,
                onCloseEnd: null,
                onCloseStart: null,
                onOpenEnd: null,
                onOpenStart: null,
                outDuration: 200,
                preventScrolling: true
            }}
            style={styles.navHead}
        >
            <Link to='/'>
                Home
            </Link>
            <Link to='/movies'>
                Movies
            </Link>
            <Link to='/tvseries'>
                TV Series
            </Link>
        </Navbar>
    )
}