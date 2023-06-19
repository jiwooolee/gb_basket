import React, {useEffect, useState} from 'react';

import { List, Space } from "antd";
import { MinusOutlined } from "@ant-design/icons";

import BasicButton from "../Button/BasicButton";

const SetPlayers = ({ header, whitePlayerList, blackPlayerList, greenPlayerList, setWhitePlayerList, setBlackPlayerList, setGreenPlayerList }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        header === 'White' ?
            setData(whitePlayerList) :
            header === 'Black' ?
                setData(blackPlayerList) : setData(greenPlayerList);
    }, [blackPlayerList, greenPlayerList, header, whitePlayerList]);

    const onClickDeletePlayer = (item) => {
        header === 'White' ? setWhitePlayerList([...whitePlayerList.filter(v => v.key !== item.key)]) :
            header === 'Black' ? setBlackPlayerList([...blackPlayerList.filter(v => v.key !== item.key)]) :
                setGreenPlayerList([...greenPlayerList.filter(v => v.key !== item.key)]);
    };

    return (
        <List header={header} dataSource={data} size='small'
              renderItem={(item) => (
                  <List.Item style={{justifyContent: 'center'}} key={item.key}>
                      <Space>{item.name} <BasicButton size='small' shape='circle' danger={true} icon={<MinusOutlined/>} onClick={() => onClickDeletePlayer(item)}/></Space>
                  </List.Item>
              )}
        />
    );
};

export default SetPlayers;