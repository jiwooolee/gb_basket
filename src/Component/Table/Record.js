import React from 'react';

import { message, Table } from "antd";

const Record = ({ team, currentPlayerList, setCurrentPlayerList }) => {
    const columns = [
        {title: 'Name', dataIndex: 'name', align: 'center', width: 100, fixed: 'left'},
        {title: 'PQ', dataIndex: 'PQ', align: 'center'},
        {title: 'FG%', dataIndex: 'FG%', align: 'center', render: (text) => `${text}%`},
        {title: '2PA', dataIndex: '2PA', align: 'center'},
        {title: '2PM', dataIndex: '2PM', align: 'center'},
        {title: '2P%', dataIndex: '2P%', align: 'center', render: (text) => `${text}%`},
        {title: '3PA', dataIndex: '3PA', align: 'center'},
        {title: '3PM', dataIndex: '3PM', align: 'center'},
        {title: '3P%', dataIndex: '3P%', align: 'center', render: (text) => `${text}%`},
        {title: 'PTS', dataIndex: 'PTS', align: 'center'},
        {title: 'TR', dataIndex: 'TR', align: 'center'},
        {title: 'OR', dataIndex: 'OR', align: 'center'},
        {title: 'DR', dataIndex: 'DR', align: 'center'},
        {title: 'AST', dataIndex: 'AST', align: 'center'},
        {title: 'STL', dataIndex: 'STL', align: 'center'},
        {title: 'BLK', dataIndex: 'BLK', align: 'center'},
        {title: 'TOV', dataIndex: 'TOV', align: 'center'},
        {title: 'PF', dataIndex: 'PF', align: 'center'},
        {title: 'BEFF', dataIndex: 'BEFF', align: 'center'},
    ];

    const onClickRow = (row) => {
        return {
            onClick: () => {
                if(currentPlayerList.length === 5) {
                    if(currentPlayerList.findIndex(v => v.key === row.key) !== -1) {
                        setCurrentPlayerList(currentPlayerList.filter(v => v.key !== row.key));
                    } else {
                        message.error({content: '5명을 넘을 수 없습니다.'}).then();
                    }
                } else {
                    if(currentPlayerList.findIndex(v => v.key === row.key) === -1) {
                        setCurrentPlayerList([...currentPlayerList, row]);
                    } else {
                        setCurrentPlayerList(currentPlayerList.filter(v => v.key !== row.key));
                    }
                }
            }
        }
    };

    const rowClassName = (row) => {
        return currentPlayerList.find(v => v.key === row.key) === undefined ? null : 'HighLight'
    };

    return (
        <Table className='Table_Hover' rowKey='key' dataSource={[...team.players]} size='small'
               columns={columns} scroll={{x: 950}} pagination={false} onRow={onClickRow} rowClassName={rowClassName}/>
    )
};

export default Record;
