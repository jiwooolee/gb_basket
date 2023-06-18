import React from 'react';

import { Button } from "antd";

const BasicButton = ({ type, shape, icon, text, size, disabled, onClick }) => {

    return (
        <Button type={type} shape={shape} icon={icon} size={size} disabled={disabled} onClick={onClick}>
            {text}
        </Button>
    );
};

export default BasicButton;