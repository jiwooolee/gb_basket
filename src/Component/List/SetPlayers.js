import React, {useEffect, useState} from 'react';

import { List } from "antd";

const SetPlayers = ({ header, whitePlayerList, blackPlayerList, greenPlayerList }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        header === 'White' ?
            setData(whitePlayerList) :
            header === 'Black' ?
                setData(blackPlayerList) : setData(greenPlayerList);
    }, [blackPlayerList, greenPlayerList, header, whitePlayerList]);

    return (
        <List header={header} dataSource={data} size='small'
              renderItem={(item) => (
                  <List.Item key={item.key}>
                      {item.name}
                  </List.Item>
              )}
        />
    );
};

export default SetPlayers;