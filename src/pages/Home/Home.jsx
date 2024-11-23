import React from 'react';
import {Tab, Tabs} from '@mui/material'
import './Home.css'
import { Link } from 'react-router-dom';

export const Home = () => {
    return (
        <>
            <div className='TabsContainer'>
                <Tabs
                    className='Tabs'
                >
                    <Link to="/tender-platform">
                        <Tab label="Тендерная платформа"/>
                    </Link>
                    <Link to="/contest-requirements">
                        <Tab label="Требования к конкурсам"/>
                    </Link>
                    <Link to="/launch-trading">
                        <Tab label="Запустить торги"/>
                    </Link>
                    <Link to="/scheduled-trading">
                        <Tab label="Запланированные торги"/>
                    </Link>
                    <Link to="/current-trading">
                        <Tab label="Текущие торги"/>
                    </Link>
                    <Link to="/archive-bidding">
                        <Tab label="Архив торгов"/>
                    </Link>
                </Tabs>
            </div>
            
        </>
    );
};
