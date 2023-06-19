import React, { useEffect, useState } from 'react';

import { Col, Row, Space, Typography } from "antd";

import PlayerList from "./Popover/PlayerList";
import Record from "./Table/Record";
import BasicButton from "./Button/BasicButton";

const ScoreBoard = ({ totalGame, setTotalGame, attackTeam, defenceTeam }) => {
    const { Text, Title } = Typography;
    const [playAttackTeam, setPlayAttackTeam] = useState({});
    const [playDefenceTeam, setPlayDefenceTeam] = useState({});
    const [attackPlayersList, setAttackPlayersList] = useState([]);
    const [defencePlayersList, setDefencePlayersList] = useState([]);
    const [recentAction, setRecentAction] = useState('');
    const actionList = ['2점 성공', '2점 실패', '3점 성공', '3점 실패', '공격 리바', '수비 리바', '어시스트', '스틸', '블락', '턴오버', '파울'];

    useEffect(() => {
        if(Object.keys(attackTeam).length > 0) {
            setAttackPlayersList(attackTeam.players);
            setPlayAttackTeam(attackTeam);
        }
    }, [attackTeam]);

    useEffect(() => {
        if(Object.keys(defenceTeam).length > 0) {
            setDefencePlayersList(defenceTeam.players);
            setPlayDefenceTeam(defenceTeam);
        }
    }, [defenceTeam]);

    useEffect(() => {
        console.log(totalGame)
        console.log(playAttackTeam)
        if(Object.keys(playAttackTeam).length > 0 && totalGame.length > 0) {
            // eslint-disable-next-line array-callback-return
            setTotalGame([...totalGame.map(v => {
                if(v.attack.key === playAttackTeam.key) {
                    return {...v, attack: playAttackTeam}
                } else {
                    return v;
                }
            })])

            console.log(totalGame)
            console.log(playAttackTeam)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [playAttackTeam, totalGame]);

    const actionButton = (type) => {
        return (
            <Row gutter={[16, 16]}>
                {actionList.map((v, i) =>
                        <Col key={i} span={6}>
                            <PlayerList type={type} attackPlayersList={attackPlayersList} defencePlayersList={defencePlayersList} text={v}
                                        playAttackTeam={playAttackTeam} playDefenceTeam={playDefenceTeam}
                                        setPlayAttackTeam={setPlayAttackTeam} setPlayDefenceTeam={setPlayDefenceTeam}
                                        setRecentAction={setRecentAction} totalGame={totalGame} setTotalGame={setTotalGame}/>
                        </Col>
                )}
            </Row>
        );
    };


    const onClickSave = () => {
        console.log(totalGame)
    };

    const onClickChange = () => {

    };

    return (
        <Row gutter={[16, 16]}>
            <Col span={6}>
                {actionButton('attack')}
            </Col>
            <Col span={12}>
                <Row style={{textAlign: 'center'}} gutter={[16, 16]}>
                    <Col span={8}><Title style={{ margin: 0}}>{attackTeam.team}</Title></Col>
                    <Col span={8}><Space direction='vertical'>
                        <BasicButton type='primary' text='저장' size='small' onClick={onClickSave}/>
                        <BasicButton type='primary' text='공수전환' size='small' onClick={onClickChange}/>
                    </Space></Col>
                    <Col span={8}><Title style={{ margin: 0}}>{defenceTeam.team}</Title></Col>
                    <Col span={8}><Title style={{ margin: 0}}>{playAttackTeam.score}</Title></Col>
                    <Col span={8}><Text>{recentAction}</Text></Col>
                    <Col span={8}><Title style={{margin: 0}}>{playDefenceTeam.score}</Title></Col>
                </Row>
            </Col>
            <Col span={6}>
                {actionButton('defence')}
            </Col>
            {Object.keys(playAttackTeam).length > 0 ?
                <Col span={12}>
                    <Record team={playAttackTeam}/>
                </Col>
                : null
            }
            {Object.keys(playDefenceTeam).length > 0 ?
                <Col span={12}>
                    <Record team={playDefenceTeam}/>
                </Col>
                : null
            }
        </Row>
    )
};

export default ScoreBoard;
