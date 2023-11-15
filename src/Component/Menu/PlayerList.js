import React, { useEffect, useState } from 'react';
import { Menu } from "antd";
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
        <Menu mode='inline' items={menuItems} onClick={onClickPlayer}/>
    );

};

export default PlayerList;