import React, { useState } from 'react';

import { Transfer } from 'antd';

const Transfers = ({ initialTeamList, setTeamList, teamList }) => {
    const [targetKeys, setTargetKeys] = useState([...teamList.map(v => v.key)]);
    const [selectedKeys, setSelectedKeys] = useState([]);

    const onChange = (nextTargetKeys) => {
        setTargetKeys(nextTargetKeys);
        setTeamList(initialTeamList.filter(v => nextTargetKeys.includes(v.key)));
    };

    const onSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
        setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
    };

    return (
        <Transfer dataSource={initialTeamList}
                  titles={['대기', '등록']}
                  targetKeys={targetKeys}
                  selectedKeys={selectedKeys}
                  render={(item) => item.team}
                  onSelectChange={onSelectChange}
                  onChange={onChange}
        />
    );
};

export default Transfers;