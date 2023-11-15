import React, { useEffect, useState } from 'react';
import {List, Menu, Space} from "antd";
import { UserOutlined } from "@ant-design/icons";

const PlayerList = ({ playerList, setSelectedPlayer }) => {
    const [menuItems, setMenuItems] = useState([]);

    useEffect(() => {
        if(playerList.length > 0)
            setMenuItems(playerList.map(v => {return {key: v, icon: <UserOutlined/>, label: v}}));
    }, [playerList]);


    const onClickPlayer = (player) => {
        setSelectedPlayer(player.key);
    };

    return (
        <List style={{height: '100vh', overflow: 'auto', padding: '0 16px', border: '1px solid rgba(140, 140, 140, 0.35)',}}
              dataSource={menuItems} renderItem={(item) => (
            <List.Item style={{cursor: 'pointer'}} onClick={() => onClickPlayer(item)}>
                <Space>
                    {item.icon} {item.label}
                </Space>
            </List.Item>
        )}/>
    );

};

export default PlayerList;