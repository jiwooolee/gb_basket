import React from 'react';

import { Carousel } from "antd";


const Quarter = ({ totalGame }) => {

    return (
        <Carousel>
            {totalGame.map((v, i) =>
                <div style={{border: '1px solid black'}} key={i}>attack: {v.attack.team}   |   defence: {v.defence.team}</div>
            )}
        </Carousel>
    )
};

export default Quarter;
