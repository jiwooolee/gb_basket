import React, { useEffect, useState } from 'react';

import { Card, Col, Row, Space, Typography } from "antd";
import { UndoOutlined } from "@ant-design/icons";

import PlayerList from "./Popover/PlayerList";
import Record from "./Table/Record";
import BasicButton from "./Button/BasicButton";
import BackGround from "./Image/BackGround";
import ActionList from "./Drawer/ActionList";

const ScoreBoard = ({ teamList, setTeamList, attackTeam, defenceTeam }) => {
    const { Text, Paragraph, Title } = Typography;
    const [open, setOpen] = useState(false);
    const [playAttackTeam, setPlayAttackTeam] = useState({});
    const [playDefenceTeam, setPlayDefenceTeam] = useState({});
    const [currentAttackPlayerList, setCurrentAttackPlayerList] = useState([]);
    const [currentDefencePlayerList, setCurrentDefencePlayerList] = useState([]);
    const [attackTeamActionList, setAttackTeamActionList] = useState([]);
    const [defenceTeamActionList, setDefenceTeamActionList] = useState([]);
    const [recentAction, setRecentAction] = useState({key: '', team: '', name: '', action: ''});
    const [quarter, setQuarter] = useState(1);
    const [attackTeamActionIndex, setAttackTeamActionIndex] = useState(1);
    const [defenceTeamActionIndex, setDefenceTeamActionIndex] = useState(1);
    const actionList = ['2점 성공','3점 성공', '2점 실패', '3점 실패', '공격 리바', '수비 리바', '어시스트', '스틸', '블락', '턴오버', '파울', '앤드원'];

    useEffect(() => {
        if(Object.keys(attackTeam).length > 0 && teamList.length > 0) {
            setPlayAttackTeam(teamList.find(v => v.key === attackTeam.key));
        }
    }, [attackTeam, teamList]);

    useEffect(() => {
        if(Object.keys(defenceTeam).length > 0 && teamList.length > 0) {
            setPlayDefenceTeam(teamList.find(v => v.key === defenceTeam.key));
        }
    }, [defenceTeam, teamList]);

    const actionButton = (type) => {
        return (
            <Row gutter={[4, 16]}>
                {actionList.map((v, i) =>
                        <Col key={i} span={12}>
                            <PlayerList type={type} text={v}
                                        playAttackTeam={playAttackTeam} playDefenceTeam={playDefenceTeam}
                                        setPlayAttackTeam={setPlayAttackTeam} setPlayDefenceTeam={setPlayDefenceTeam}
                                        setRecentAction={setRecentAction} teamList={teamList} setTeamList={setTeamList}
                                        currentAttackPlayerList={currentAttackPlayerList} currentDefencePlayerList={currentDefencePlayerList}
                                        attackTeamActionList={attackTeamActionList} defenceTeamActionList={defenceTeamActionList}
                                        setAttackTeamActionList={setAttackTeamActionList} setDefenceTeamActionList={setDefenceTeamActionList}
                                        attackTeamActionIndex={attackTeamActionIndex} defenceTeamActionIndex={defenceTeamActionIndex}
                                        setAttackTeamActionIndex={setAttackTeamActionIndex} setDefenceTeamActionIndex={setDefenceTeamActionIndex}
                            />
                        </Col>
                )}
            </Row>
        );
    };

    const onClickChange = () => {
        if(quarter < 4) {
            setCurrentAttackPlayerList([]);
            setCurrentDefencePlayerList([]);
            setQuarter(quarter + 1);
        }
    };

    const onClickUndo = (team) => {
        if(team === 'attack' && attackTeamActionList.length > 0) {
            let temp = attackTeamActionList[attackTeamActionList.length - 1];
            setAttackTeamActionList(attackTeamActionList.filter(v => v.key !== temp.key));
            actDeleteAction(temp.name, team, temp.action);
        } else if(team === 'defence' && defenceTeamActionList.length > 0) {
            let temp = defenceTeamActionList[defenceTeamActionList.length - 1];
            setDefenceTeamActionList(defenceTeamActionList.filter(v => v.key !== temp.key));
            actDeleteAction(temp.name, team, temp.action);
        }
    };

    const calPercent = (a, b) => {
        if(b === 0) return 0;
        else return (a / b) * 100;
    };

    const calBeff = (pts, tr, ast, stl, blk, pa2, pa3, pm2, pm3, tov, pq) => {
        return (((pts + 0.5 * tr + (ast + stl + blk)) - (0.5 * (pa2 + pa3) - (pm2 + pm3) + tov)) / pq).toFixed(2);
    };

    const actDeleteAction = (player, type, action) => {
        let temp = type === 'attack' ? playAttackTeam : playDefenceTeam;

        // eslint-disable-next-line array-callback-return
        temp = {...temp,
            score: action === '2점 성공' ? (temp.score - 2) : action === '3점 성공' ? (temp.score - 3) : action === '앤드원' ? (temp.score - 1) : temp.score,
            // eslint-disable-next-line array-callback-return
            players: [...temp.players.map(v => {
                if(v.key === player) {
                    if(action === '2점 성공') {
                        return {...v, '2PA': (v['2PA'] - 1), '2PM': (v['2PM'] - 1), '2P%': parseInt(calPercent((v['2PM'] - 1), (v['2PA'] - 1))), 'PTS': (v['PTS'] - 2),
                            'FG%': parseInt(calPercent((v['2PM'] - v['3PM'] - 1), (v['2PA'] - v['3PA'] - 1))),
                            'BEFF': calBeff((v['PTS'] - 2), v['TR'], v['AST'], v['STL'], v['BLK'], (v['2PA'] - 1), v['3PA'], (v['2PM'] - 1), v['3PM'], v['TOV'], v['PQ'])};
                    } else if(action === '2점 실패') {
                        return {...v, '2PA': (v['2PA'] - 1), '2P%': parseInt(calPercent((v['2PM']), (v['2PA'] - 1))),
                            'FG%': parseInt(calPercent((v['2PM'] - v['3PM']), (v['2PA'] - v['3PA'] - 1))),
                            'BEFF': calBeff(v['PTS'], v['TR'], v['AST'], v['STL'], v['BLK'], (v['2PA'] - 1), v['3PA'], v['2PM'], v['3PM'], v['TOV'], v['PQ'])};
                    } else if(action === '3점 성공') {
                        return {...v, '3PA': (v['3PA'] - 1), '3PM': (v['3PM'] - 1), '3P%': parseInt(calPercent((v['3PM'] - 1), (v['3PA'] - 1))), 'PTS': (v['PTS'] - 3),
                            'FG%': parseInt(calPercent((v['2PM'] - v['3PM'] - 1), (v['2PA'] - v['3PA'] - 1))),
                            'BEFF': calBeff((v['PTS'] - 3), v['TR'], v['AST'], v['STL'], v['BLK'], v['2PA'], (v['3PA'] - 1), v['2PM'], (v['3PM'] - 1), v['TOV'], v['PQ'])};
                    } else if(action === '3점 실패') {
                        return {...v, '3PA': (v['3PA'] - 1), '3P%': parseInt(calPercent((v['3PM']), (v['3PA'] - 1))),
                            'FG%': parseInt(calPercent((v['2PM'] - v['3PM']), (v['2PA'] - v['3PA'] - 1))),
                            'BEFF': calBeff(v['PTS'], v['TR'], v['AST'], v['STL'], v['BLK'], v['2PA'], (v['3PA'] - 1), v['2PM'], v['3PM'], v['TOV'], v['PQ'])};
                    } else if(action === '공격 리바') {
                        return {...v, 'OR': (v['OR'] - 1), 'TR': (v['TR'] - 1),
                            'BEFF': calBeff(v['PTS'], (v['TR'] - 1), v['AST'], v['STL'], v['BLK'], v['2PA'], v['3PA'], v['2PM'], v['3PM'], v['TOV'], v['PQ'])};
                    } else if(action === '수비 리바') {
                        return {...v, 'DR': (v['DR'] - 1), 'TR': (v['TR'] - 1),
                            'BEFF': calBeff(v['PTS'], (v['TR'] - 1), v['AST'], v['STL'], v['BLK'], v['2PA'], v['3PA'], v['2PM'], v['3PM'], v['TOV'], v['PQ'])};
                    } else if(action === '어시스트') {
                        return {...v, 'AST': (v['AST'] - 1),
                            'BEFF': calBeff(v['PTS'], v['TR'], (v['AST'] - 1), v['STL'], v['BLK'], v['2PA'], v['3PA'], v['2PM'], v['3PM'], v['TOV'], v['PQ'])};
                    } else if(action === '스틸') {
                        return {...v, 'STL': (v['STL'] - 1),
                            'BEFF': calBeff(v['PTS'], v['TR'], v['AST'], (v['STL'] - 1), v['BLK'], v['2PA'], v['3PA'], v['2PM'], v['3PM'], v['TOV'], v['PQ'])};
                    } else if(action === '블락') {
                        return {...v, 'BLK': (v['BLK'] - 1),
                            'BEFF': calBeff(v['PTS'], v['TR'], v['AST'], v['STL'], (v['BLK'] - 1), v['2PA'], v['3PA'], v['2PM'], v['3PM'], v['TOV'], v['PQ'])};
                    } else if(action === '턴오버') {
                        return {...v, 'TOV': (v['TOV'] - 1),
                            'BEFF': calBeff(v['PTS'], v['TR'], v['AST'], v['STL'], v['BLK'], v['2PA'], v['3PA'], v['2PM'], v['3PM'], (v['TOV'] - 1), v['PQ'])};
                    } else if(action === '파울') {
                        return {...v, 'PF': (v['PF'] - 1)};
                    } else if(action === '앤드원') {
                        return {...v, 'PTS': (v['PTS'] - 1),
                            'BEFF': calBeff(v['PTS'], v['TR'], v['AST'], v['STL'], v['BLK'], v['2PA'], v['3PA'], v['2PM'], v['3PM'], v['TOV'], v['PQ'])};
                    }
                } else {
                    return v;
                }
            })]};
        type === 'attack' ? setPlayAttackTeam({...playAttackTeam, players: temp.players, score: temp.score}) : setPlayDefenceTeam({...playDefenceTeam, players: temp.players, score: temp.score});
        setTeamList(teamList.map(v => {
            if(v.key === temp.key) {
                return {...v, players: temp.players, score: temp.score};
            } else {
                return v;
            }
        }));
    };

    const onClickActionList = () => {
        setOpen(true);
    };

    return (
        <Row gutter={[8, 8]}>
            <Col span={6}>
                {quarter < 3 ? actionButton('attack') : actionButton('defense')}
            </Col>
            <Col span={12}>
                <Row style={{textAlign: 'center'}} gutter={[16, 8]}>
                    <Col span={10}>
                        {quarter < 3 ?
                            <Title style={{ margin: 0 }}>{attackTeam.team}</Title>
                            :
                            <Title style={{ margin: 0 }}>{defenceTeam.team}</Title>
                        }
                    </Col>
                    <Col span={4}>
                        <Space direction='vertical'>
                            <Text strong>{quarter} 쿼터</Text>
                            <BasicButton type='primary' text='다음 쿼터' size='small' onClick={onClickChange} disabled={quarter === 4}/>
                            <BackGround width='100%' preview={false} src='AttackArrow.png'/>
                        </Space>
                    </Col>
                    <Col span={10}>
                        {quarter < 3 ?
                            <Title style={{ margin: 0 }}>{defenceTeam.team}</Title>
                            :
                            <Title style={{ margin: 0 }}>{attackTeam.team}</Title>
                        }
                    </Col>
                    <Col span={10}>
                        <Space direction='vertical' size='large'>
                            <Title style={{ margin: 0 }}>{quarter < 3 ? playAttackTeam.score : playDefenceTeam.score}</Title>
                            <UndoOutlined style={{fontSize: '32px'}} onClick={() => onClickUndo(quarter < 3 ? 'attack' : 'defence')}/>
                        </Space>
                    </Col>
                    <Col span={4}>
                        <Card title='최근 액션' headStyle={{ padding: '5px', fontSize: '12px' }} bodyStyle={{ padding: '5px' }}>
                            <Paragraph style={{margin: '5px'}}>
                                {recentAction.team === '' ? '' : (recentAction.team + ' 팀')}
                            </Paragraph>
                            <Paragraph style={{margin: '5px'}}>
                                {recentAction.name + ' ' + recentAction.action}
                            </Paragraph>
                        </Card>
                    </Col>
                    <Col span={10}>
                        <Space direction='vertical' size='large'>
                            <Title style={{ margin: 0 }}>{quarter < 3 ? playDefenceTeam.score : playAttackTeam.score}</Title>
                            <UndoOutlined style={{fontSize: '32px'}} onClick={() => onClickUndo(quarter < 3 ? 'defence' : 'attack')}/>
                        </Space>
                    </Col>
                    <Col span={10}/>
                    <Col span={4}>
                        <BasicButton type='primary' text='액션 리스트' size='small' onClick={onClickActionList}
                                     disabled={attackTeamActionList.length === 0 && defenceTeamActionList.length === 0}/>
                    </Col>
                    <Col span={10}/>
                </Row>
            </Col>
            <Col span={6}>
                {quarter < 3 ? actionButton('defense') : actionButton('attack')}
            </Col>
            {Object.keys(playAttackTeam).length > 0 ?
                <Col span={12}>
                    <Record team={quarter < 3 ? playAttackTeam : playDefenceTeam}
                            teamList={teamList} setTeamList={setTeamList}
                            playAttackTeam={playAttackTeam} playDefenceTeam={playDefenceTeam}
                            setPlayAttackTeam={setPlayAttackTeam} setPlayDefenceTeam={setPlayDefenceTeam}
                            currentPlayerList={quarter < 3 ? currentAttackPlayerList : currentDefencePlayerList}
                            setCurrentPlayerList={quarter < 3 ? setCurrentAttackPlayerList : setCurrentDefencePlayerList}
                    />
                </Col>
                : null
            }
            {Object.keys(playDefenceTeam).length > 0 ?
                <Col span={12}>
                    <Record team={quarter < 3 ? playDefenceTeam : playAttackTeam}
                            teamList={teamList} setTeamList={setTeamList}
                            playAttackTeam={playAttackTeam} playDefenceTeam={playDefenceTeam}
                            setPlayAttackTeam={setPlayAttackTeam} setPlayDefenceTeam={setPlayDefenceTeam}
                            currentPlayerList={quarter < 3 ? currentDefencePlayerList : currentAttackPlayerList}
                            setCurrentPlayerList={quarter < 3 ? setCurrentDefencePlayerList : setCurrentAttackPlayerList}
                    />
                </Col>
                : null
            }
            <ActionList open={open} setOpen={setOpen} quarter={quarter}
                        teamList={teamList} setTeamList={setTeamList}
                        playAttackTeam={playAttackTeam} playDefenceTeam={playDefenceTeam}
                        setPlayAttackTeam={setPlayAttackTeam} setPlayDefenceTeam={setPlayDefenceTeam}
                        attackTeamActionList={attackTeamActionList} defenceTeamActionList={defenceTeamActionList}
                        setAttackTeamActionList={setAttackTeamActionList} setDefenceTeamActionList={setDefenceTeamActionList}
            />
        </Row>
    )
};

export default ScoreBoard;
