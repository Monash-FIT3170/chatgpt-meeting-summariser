import React, { useState } from 'react';
import BasicStyles from './Basic.module.css';

function HeaderPill({name, onClick, isActive}) {
    return (
        <div className={BasicStyles.headerPill} onClick={onClick}>
            {name}
            <svg width="171" height="5" viewBox="0 0 171 5" fill="none" xmlns="http://www.w3.org/2000/svg" className={BasicStyles.headerSmallPill} style={{
                display: isActive ? "flex" : "none"
            }}>
                <rect width="171" height="5" rx="2" fill="#FF8B28" />
            </svg>
        </div>
    )
}

export {HeaderPill};