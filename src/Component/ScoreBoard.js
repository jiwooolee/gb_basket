import React, { useEffect, useState } from 'react';

import { Col, Row, Space, Typography } from "antd";

import PlayerList from "./Popover/PlayerList";
import Record from "./Table/Record";
import BasicButton from "./Button/BasicButton";
import BackGround from "./Image/BackGround";

const ScoreBoard = ({ teamList, setTeamList, attackTeam, defenceTeam }) => {
    const { Text, Title } = Typography;
    const [playAttackTeam, setPlayAttackTeam] = useState({});
    const [playDefenceTeam, setPlayDefenceTeam] = useState({});
    const [attackPlayersList, setAttackPlayersList] = useState([]);
    const [defencePlayersList, setDefencePlayersList] = useState([]);
    const [recentAction, setRecentAction] = useState('');
    const [quarter, setQuarter] = useState(1);
    const actionList = ['2점 성공', '2점 실패', '3점 성공', '3점 실패', '공격 리바', '수비 리바', '어시스트', '스틸', '블락', '턴오버', '파울'];

    useEffect(() => {
        if(Object.keys(attackTeam).length > 0 && teamList.length > 0) {
            setAttackPlayersList(attackTeam.players);
            setPlayAttackTeam(teamList.find(v => v.key === attackTeam.key));
        }
    }, [attackTeam, teamList]);

    useEffect(() => {
        if(Object.keys(defenceTeam).length > 0 && teamList.length > 0) {
            setDefencePlayersList(defenceTeam.players);
            setPlayDefenceTeam(teamList.find(v => v.key === defenceTeam.key));
        }
    }, [defenceTeam, teamList]);

    const actionButton = (type) => {
        return (
            <Row gutter={[16, 16]}>
                {actionList.map((v, i) =>
                        <Col key={i} span={6}>
                            <PlayerList type={type} attackPlayersList={attackPlayersList} defencePlayersList={defencePlayersList} text={v}
                                        playAttackTeam={playAttackTeam} playDefenceTeam={playDefenceTeam} quarter={quarter}
                                        setPlayAttackTeam={setPlayAttackTeam} setPlayDefenceTeam={setPlayDefenceTeam}
                                        setRecentAction={setRecentAction} teamList={teamList} setTeamList={setTeamList}/>
                        </Col>
                )}
            </Row>
        );
    };

    const onClickChange = () => {
        if(quarter < 4) {
            setQuarter(quarter + 1);
        }
    };

    return (
        <Row gutter={[16, 4]}>
            <Col span={6}>
                {actionButton('attack')}
            </Col>
            <Col span={12}>
                <Row style={{textAlign: 'center'}} gutter={[16, 0]}>
                    <Col span={8}>
                        {quarter < 3 ?
                            <Title style={{ margin: 0}}>{attackTeam.team}</Title>
                            :
                            <Title style={{ margin: 0}}>{defenceTeam.team}</Title>
                        }
                    </Col>
                    <Col span={8}>
                        <Space direction='vertical'>
                            <Text strong>{quarter} 쿼터</Text>
                            <BasicButton type='primary' text='다음 쿼터' size='small' onClick={onClickChange} disabled={quarter === 4}/>
                            <BackGround width='100%' preview={false} src='arrow.png'/>
                        </Space>
                    </Col>
                    <Col span={8}>
                        {quarter < 3 ?
                            <Title style={{ margin: 0}}>{defenceTeam.team}</Title>
                            :
                            <Title style={{ margin: 0}}>{attackTeam.team}</Title>
                        }
                    </Col>
                    <Col span={8}>
                        {quarter < 3 ?
                            <Title style={{ margin: 0}}>{playAttackTeam.score}</Title>
                            :
                            <Title style={{margin: 0}}>{playDefenceTeam.score}</Title>
                        }
                    </Col>
                    <Col span={8}>
                        <Text>{recentAction}</Text></Col>
                    <Col span={8}>
                        {quarter < 3 ?
                            <Title style={{margin: 0}}>{playDefenceTeam.score}</Title>
                            :
                            <Title style={{margin: 0}}>{playAttackTeam.score}</Title>
                        }
                    </Col>
                </Row>
            </Col>
            <Col span={6}>
                {actionButton('defence')}
            </Col>
            {Object.keys(playAttackTeam).length > 0 ?
                <Col span={12}>
                    <Record team={quarter < 3 ? playAttackTeam : playDefenceTeam}/>
                </Col>
                : null
            }
            {Object.keys(playDefenceTeam).length > 0 ?
                <Col span={12}>
                    <Record team={quarter < 3 ? playDefenceTeam : playAttackTeam}/>
                </Col>
                : null
            }
        </Row>
    )
};

export default ScoreBoard;
