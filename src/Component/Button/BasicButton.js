import React from 'react';

import { Button } from "antd";

const BasicButton = ({ type, shape, icon, text, size, disabled, onClick, danger, style }) => {

    return (
        <Button style={style} type={type} shape={shape} icon={icon} size={size} disabled={disabled} onClick={onClick} danger={danger}>
            {text}
        </Button>
    );
};

export default BasicButton;