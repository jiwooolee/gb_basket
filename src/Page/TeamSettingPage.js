import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

import { Row, Col, Space, message } from "antd";
import { OrderedListOutlined, TeamOutlined, UserOutlined, RightOutlined, LeftOutlined, PlusOutlined } from '@ant-design/icons';

import Step from "../Component/Steps/Step";
import BasicButton from "../Component/Button/BasicButton";
import Transfers from "../Component/Trasfer/Transfers";
import Number from "../Component/InputNumber/Number";
import SetPlayers from "../Component/List/SetPlayers";
import Name from "../Component/Input/Name";

const TeamSettingPage = () => {
    const navigate = useNavigate();
    const [current, setCurrent] = useState(0);
    const [teamStatus, setTeamStatus] = useState('wait');
    const [quarterStatus, setQuarterStatus] = useState('wait');
    const [playerStatus, setPlayerStatus] = useState('wait');
    const [initialTeamList, setInitialTeamList] = useState([]);
    const [teamList, setTeamList] = useState([]);
    const [quarter, setQuarter] = useState(4);
    const [whitePlayer, setWhitePlayer] = useState({});
    const [blackPlayer, setBlackPlayer] = useState({});
    const [greenPlayer, setGreenPlayer] = useState({});
    const [whitePlayerList, setWhitePlayerList] = useState([]);
    const [blackPlayerList, setBlackPlayerList] = useState([]);
    const [greenPlayerList, setGreenPlayerList] = useState([]);

    useEffect(() => {
        setInitialTeamList([
            { key: 'white', team: 'White', players: whitePlayerList },
            { key: 'black', team: 'Black', players: blackPlayerList },
            { key: 'green', team: 'Green', players: greenPlayerList }
        ]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const items = [
        {title: '팀 설정', status: teamStatus, icon: <TeamOutlined/>,},
        {title: '쿼터 설정', status: quarterStatus, icon: <OrderedListOutlined/>,},
        {title: '선수 설정', status: playerStatus, icon: <UserOutlined/>,}
    ];

    const onClickSteps = (type) => {
        if(teamList.length < 2) {
            message.error({content: '2팀 이상 설정 해주세요.'}).then();
            return;
        }
        type === 'next' ? setCurrent(current + 1) : setCurrent(current - 1);
    };

    const onClickTeamSave = () => {
        setTeamStatus('finish');
        setCurrent(current + 1);
    };

    const onClickQuarterSave = () => {
        setQuarterStatus('finish');
        setCurrent(current + 1);
    };

    const onChangeQuarter = (value) => {
        setQuarter(value);
    };

    const onClickAddPlayer = (type) => {
        if(type === 'white') {
            if(Object.keys(whitePlayer).length === 0 || whitePlayer.key === '') {
                message.error({content: '공백을 채워주세요.'}).then();
            } else {
                if(whitePlayerList.find(v => v.key === whitePlayer.key) === undefined) {
                    message.success({content: whitePlayer.key + ' 등록'}).then();
                    setWhitePlayerList([...whitePlayerList, whitePlayer]);
                } else {
                    message.error({content: whitePlayer.key + ' 이름 중복'}).then();
                }
            }
        } else if(type === 'black') {
            if(Object.keys(blackPlayer).length === 0 || blackPlayer.key === '') {
                message.error({content: '공백을 채워주세요.'}).then();
            } else {
                if(blackPlayerList.find(v => v.key === blackPlayer.key) === undefined) {
                    message.success({content: blackPlayer.key + ' 등록'}).then();
                    setBlackPlayerList([...blackPlayerList, blackPlayer]);
                } else {
                    message.error({content: blackPlayer.key + ' 이름 중복'}).then();
                }
            }
        } else {
            if(Object.keys(greenPlayer).length === 0 || greenPlayer.key === '') {
                message.error({content: '공백을 채워주세요.'}).then();
            } else {
                if(greenPlayerList.find(v => v.key === greenPlayer.key) === undefined) {
                    message.success({content: greenPlayer.key + ' 등록'}).then();
                    setGreenPlayerList([...greenPlayerList, greenPlayer]);
                } else {
                    message.error({content: greenPlayer.key + ' 이름 중복'}).then();
                }
            }
        }
    };

    const onClickPlayerSave = () => {
        const temp = [];
        if(teamList.length > 0) {
            teamList.map(v => {
                if(v.key === 'white') {
                    if(whitePlayerList.length === 0) {
                        temp.push(true);
                    }
                } else if(v.key === 'black') {
                    if(blackPlayerList.length === 0) {
                        temp.push(true);
                    }
                } else {
                    if(greenPlayerList.length === 0) {
                        temp.push(true);
                    }
                }
                return v;
            });
        }
        if(temp.length > 0) {
            message.error({content: '각 팀당 최소 1명 이상 채워주세요.'}).then();
        } else {
            message.success({content: '선수 저장 완료.'}).then();
            setPlayerStatus('finish');
        }
    };

    const onClickNextButton = () => {
        // eslint-disable-next-line array-callback-return
        window.localStorage.setItem('teamList', JSON.stringify([...teamList.map(v => {
            if(v.key === 'white')
                return {...v, players: whitePlayerList, score: 0};
            else if(v.key === 'black')
                return {...v, players: blackPlayerList, score: 0};
            else
                return {...v, players: greenPlayerList, score: 0};
        })]));
        navigate('/game');
    };

    return (
        <Row style={{paddingTop: '2rem'}} gutter={[16, 16]} justify='center'>
            <Col span={24}>
                <Row style={{justifyContent: 'center'}}>
                    <Col span={8}>
                        <Step current={current} setCurrent={setCurrent} items={items}/>
                    </Col>
                </Row>
            </Col>
            <Col span={12}>
                <div style={{textAlign: 'right'}}>
                    <BasicButton size='small' icon={<LeftOutlined/>} disabled={current === 0} onClick={() => onClickSteps('prev')}/>
                </div>
            </Col>
            <Col span={12}>
                <div style={{textAlign: 'left'}}>
                    <BasicButton size='small' icon={<RightOutlined/>} disabled={current === 2} onClick={() => onClickSteps('next')}/>
                </div>
            </Col>
            <Col span={24}/>
            {current === 0 ?
                <Row gutter={[8, 8]} justify='center' style={{textAlign: 'center', padding: '1rem'}}>
                    <Col span={24}>
                        <div style={{textAlign: 'center'}}>
                            <Transfers initialTeamList={initialTeamList} setTeamList={setTeamList} teamList={teamList}/>
                        </div>
                    </Col>
                    <Col span={24}>
                        <div style={{textAlign: 'center'}}>
                            <BasicButton disabled={teamList.length < 2} text='팀 저장' onClick={onClickTeamSave}/>
                        </div>
                    </Col>
                </Row>
                :
                current === 1 ?
                    <Row gutter={[8, 8]} justify='center'>
                        <Col span={12}>
                            <Number min={1} max={10} value={quarter} onChange={onChangeQuarter} addonAfter='쿼터'/>
                        </Col>
                        <Col span={24}>
                            <div style={{textAlign: 'center'}}>
                                <BasicButton text='쿼터 저장' disabled={teamStatus === 'wait'} onClick={onClickQuarterSave}/>
                            </div>
                        </Col>

                    </Row>
                    :
                    current === 2 ?
                        <Row gutter={[8, 8]} style={{textAlign: 'center'}}>
                            {teamList.map(v => (
                                <Col span={teamList.length === 3 ? 8 : 12} key={v.team}>
                                    <SetPlayers header={v.team} whitePlayerList={whitePlayerList} blackPlayerList={blackPlayerList} greenPlayerList={greenPlayerList}
                                                setWhitePlayerList={setWhitePlayerList} setBlackPlayerList={setBlackPlayerList} setGreenPlayerList={setGreenPlayerList}/>
                                </Col>
                            ))}
                            {teamList.map(v => (
                                <Col span={teamList.length === 3 ? 8 : 12} key={v.team}>
                                    <Space.Compact style={{width: '100%'}}>
                                        <Name type={v.key} setWhitePlayer={setWhitePlayer} setBlackPlayer={setBlackPlayer} setGreenPlayer={setGreenPlayer} />
                                        <BasicButton icon={<PlusOutlined/>} size='small' onClick={() => onClickAddPlayer(v.key)}/>
                                    </Space.Compact>
                                </Col>
                            ))}
                            <Col span={24}>
                                <div style={{textAlign: 'center'}}>
                                    <BasicButton text='선수 저장' disabled={quarterStatus === 'wait'} onClick={onClickPlayerSave}/>
                                </div>
                            </Col>
                        </Row>
                        :
                        null
            }
            <Col span={24}>
                <div style={{textAlign: 'center'}}>
                    <BasicButton disabled={!(quarterStatus === 'finish' && teamStatus === 'finish' && playerStatus === 'finish')} text='다음' onClick={onClickNextButton}/>
                </div>
            </Col>
        </Row>
    );
};

export default TeamSettingPage;