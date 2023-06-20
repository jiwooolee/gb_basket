import React from 'react';

import { Input } from 'antd';
import { UserOutlined } from "@ant-design/icons";

const Name = ({ type, setWhitePlayer, setBlackPlayer, setGreenPlayer }) => {

    const onChangePlayer = (e) => {
        type === 'white' ?
            setWhitePlayer({key: e.target.value, name: e.target.value, 'PQ': 0,
                'FG%': 0, '2PA': 0, '2PM': 0, '2P%': 0, '3PA': 0, '3PM': 0, '3P%': 0, 'PTS': 0,
                'TR': 0, 'OR': 0, 'DR': 0, 'AST': 0, 'STL': 0, 'BLK': 0, 'TOV': 0, 'PF': 0, 'BEFF': 0
            }) :
            type === 'black' ?
                setBlackPlayer({key: e.target.value, name: e.target.value, 'PQ': 0,
                    'FG%': 0, '2PA': 0, '2PM': 0, '2P%': 0, '3PA': 0, '3PM': 0, '3P%': 0, 'PTS': 0,
                    'TR': 0, 'OR': 0, 'DR': 0, 'AST': 0, 'STL': 0, 'BLK': 0, 'TOV': 0, 'PF': 0, 'BEFF': 0
                }) :
                setGreenPlayer({key: e.target.value, name: e.target.value, 'PQ': 0,
                    'FG%': 0, '2PA': 0, '2PM': 0, '2P%': 0, '3PA': 0, '3PM': 0, '3P%': 0, 'PTS': 0,
                    'TR': 0, 'OR': 0, 'DR': 0, 'AST': 0, 'STL': 0, 'BLK': 0, 'TOV': 0, 'PF': 0, 'BEFF': 0
                });
    };

    return (
        <Input size='small' placeholder='이름 입력' prefix={<UserOutlined />} onChange={onChangePlayer} allowClear/>
    );
};

export default Name;