import React from 'react';

import { Input } from 'antd';
import { UserOutlined } from "@ant-design/icons";

const Name = ({ type, setWhitePlayer, setBlackPlayer, setGreenPlayer }) => {

    const onChangePlayer = (e) => {
        type === 'white' ?
            setWhitePlayer({key: e.target.value, name: e.target.value}) :
            type === 'black' ?
                setBlackPlayer({key: e.target.value, name: e.target.value}) :
                setGreenPlayer({key: e.target.value, name: e.target.value});
    };

    return (
        <Input size='small' placeholder='이름 입력'
               prefix={<UserOutlined />} onChange={onChangePlayer}/>
    );
};

export default Name;