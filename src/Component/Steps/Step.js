import React from 'react';

import { Steps } from "antd";

const Step = ({ items, current, setCurrent }) => {
    const onChange = (value) => {
        setCurrent(value);
    };

    return (
        <Steps size='small' direction='horizontal' items={items} current={current} onChange={onChange}/>
    );
};

export default Step;