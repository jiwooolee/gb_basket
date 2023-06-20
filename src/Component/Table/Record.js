import React from 'react';

import { message, Table } from "antd";

const Record = ({ team, teamList, setTeamList, playAttackTeam, playDefenceTeam, setPlayAttackTeam, setPlayDefenceTeam, currentPlayerList, setCurrentPlayerList }) => {
    const columns = [
        {title: 'Name', dataIndex: 'name', align: 'center', width: 70, fixed: 'left', className: 'TableFontSize'},
        {title: 'PQ', dataIndex: 'PQ', align: 'center', className: 'TableFontSize'},
        {title: 'FG%', dataIndex: 'FG%', align: 'center', className: 'TableFontSize', render: (text) => `${text}%`},
        {title: '2PA', dataIndex: '2PA', align: 'center', className: 'TableFontSize'},
        {title: '2PM', dataIndex: '2PM', align: 'center', className: 'TableFontSize'},
        {title: '2P%', dataIndex: '2P%', align: 'center', className: 'TableFontSize', render: (text) => `${text}%`},
        {title: '3PA', dataIndex: '3PA', align: 'center', className: 'TableFontSize'},
        {title: '3PM', dataIndex: '3PM', align: 'center', className: 'TableFontSize'},
        {title: '3P%', dataIndex: '3P%', align: 'center', className: 'TableFontSize', render: (text) => `${text}%`},
        {title: 'PTS', dataIndex: 'PTS', align: 'center', className: 'TableFontSize'},
        {title: 'TR', dataIndex: 'TR', align: 'center', className: 'TableFontSize'},
        {title: 'OR', dataIndex: 'OR', align: 'center', className: 'TableFontSize'},
        {title: 'DR', dataIndex: 'DR', align: 'center', className: 'TableFontSize'},
        {title: 'AST', dataIndex: 'AST', align: 'center', className: 'TableFontSize'},
        {title: 'STL', dataIndex: 'STL', align: 'center', className: 'TableFontSize'},
        {title: 'BLK', dataIndex: 'BLK', align: 'center', className: 'TableFontSize'},
        {title: 'TOV', dataIndex: 'TOV', align: 'center', className: 'TableFontSize'},
        {title: 'PF', dataIndex: 'PF', align: 'center', className: 'TableFontSize'},
        {title: 'BEFF', dataIndex: 'BEFF', align: 'center', className: 'TableFontSize'},
    ];

    const onClickRow = (row) => {
        return {
            onClick: () => {
                if(currentPlayerList.length === 5) {
                    if(currentPlayerList.findIndex(v => v.key === row.key) !== -1) {
                        setCurrentPlayerList(currentPlayerList.filter(v => v.key !== row.key));
                        if(playAttackTeam.players.find(v => v.key === row.key) !== undefined) {
                            let temp = playAttackTeam;
                            temp = {...temp,
                                players: [...temp.players.map(v => {
                                    if(v.key === row.key) {
                                        return {...v, 'PQ': (v['PQ'] - 1)};
                                    } else {
                                        return v;
                                    }
                                })]
                            };
                            setPlayAttackTeam({...playAttackTeam, players: temp.players});
                            setTeamList(teamList.map(v => {
                                if(v.key === temp.key) {
                                    return {...v, players: temp.players};
                                } else {
                                    return v;
                                }
                            }));
                        } else if(playDefenceTeam.players.find(v => v.key === row.key) !== undefined) {
                            let temp = playDefenceTeam;
                            temp = {...temp,
                                players: [...temp.players.map(v => {
                                    if(v.key === row.key) {
                                        return {...v, 'PQ': (v['PQ'] - 1)};
                                    } else {
                                        return v;
                                    }
                                })]
                            };
                            setPlayDefenceTeam({...playDefenceTeam, players: temp.players});
                            setTeamList(teamList.map(v => {
                                if(v.key === temp.key) {
                                    return {...v, players: temp.players};
                                } else {
                                    return v;
                                }
                            }));
                        }
                    } else {
                        message.error({content: '5명을 넘을 수 없습니다.'}).then();
                    }
                } else {
                    if(currentPlayerList.findIndex(v => v.key === row.key) === -1) {
                        setCurrentPlayerList([...currentPlayerList, row]);
                        if(playAttackTeam.players.find(v => v.key === row.key) !== undefined) {
                            let temp = playAttackTeam;
                            temp = {...temp,
                                players: [...temp.players.map(v => {
                                    if(v.key === row.key) {
                                        return {...v, 'PQ': (v['PQ'] + 1)};
                                    } else {
                                        return v;
                                    }
                                })]
                            };
                            setPlayAttackTeam({...playAttackTeam, players: temp.players});
                            setTeamList(teamList.map(v => {
                                if(v.key === temp.key) {
                                    return {...v, players: temp.players};
                                } else {
                                    return v;
                                }
                            }));
                        } else if(playDefenceTeam.players.find(v => v.key === row.key) !== undefined) {
                            let temp = playDefenceTeam;
                            temp = {...temp,
                                players: [...temp.players.map(v => {
                                    if(v.key === row.key) {
                                        return {...v, 'PQ': (v['PQ'] + 1)};
                                    } else {
                                        return v;
                                    }
                                })]
                            };
                            setPlayDefenceTeam({...playDefenceTeam, players: temp.players});
                            setTeamList(teamList.map(v => {
                                if(v.key === temp.key) {
                                    return {...v, players: temp.players};
                                } else {
                                    return v;
                                }
                            }));
                        }
                    } else {
                        setCurrentPlayerList(currentPlayerList.filter(v => v.key !== row.key));
                        if(playAttackTeam.players.find(v => v.key === row.key) !== undefined) {
                            let temp = playAttackTeam;
                            temp = {...temp,
                                players: [...temp.players.map(v => {
                                    if(v.key === row.key) {
                                        return {...v, 'PQ': (v['PQ'] - 1)};
                                    } else {
                                        return v;
                                    }
                                })]
                            };
                            setPlayAttackTeam({...playAttackTeam, players: temp.players});
                            setTeamList(teamList.map(v => {
                                if(v.key === temp.key) {
                                    return {...v, players: temp.players};
                                } else {
                                    return v;
                                }
                            }));
                        } else if(playDefenceTeam.players.find(v => v.key === row.key) !== undefined) {
                            let temp = playDefenceTeam;
                            temp = {...temp,
                                players: [...temp.players.map(v => {
                                    if(v.key === row.key) {
                                        return {...v, 'PQ': (v['PQ'] - 1)};
                                    } else {
                                        return v;
                                    }
                                })]
                            };
                            setPlayDefenceTeam({...playDefenceTeam, players: temp.players});
                            setTeamList(teamList.map(v => {
                                if(v.key === temp.key) {
                                    return {...v, players: temp.players};
                                } else {
                                    return v;
                                }
                            }));
                        }
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
