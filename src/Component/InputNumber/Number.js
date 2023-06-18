import React from 'react';

import { InputNumber } from "antd";

const Number = ({ min , max, onChange, value, addonAfter }) => {

    return (
        <InputNumber min={min} max={max} onChange={onChange} defaultValue={4}
                     value={value} addonAfter={addonAfter}/>
    );
};

export default Number