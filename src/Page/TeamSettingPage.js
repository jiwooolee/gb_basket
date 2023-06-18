import React, { useEffect, useState } from 'react';

import { Row, Col, Space } from "antd";
import { OrderedListOutlined, TeamOutlined, UserOutlined, RightOutlined, LeftOutlined, PlusOutlined } from '@ant-design/icons';

import Step from "../Component/Steps/Step";
import BasicButton from "../Component/Button/BasicButton";
import Transfers from "../Component/Trasfer/Transfers";
import Number from "../Component/InputNumber/Number";
import Lists from "../Component/List/Lists";
import Name from "../Component/Input/Name";

const TeamSettingPage = () => {
    const [current, setCurrent] = useState(0);
    const [teamStatus, setTeamStatus] = useState('wait');
    const [quarterStatus, setQuarterStatus] = useState('wait');
    const [playerStatus, setPlayerStatus] = useState('wait');
    const [initialTeamList, setInitialTeamList] = useState([]);
    const [teamList, setTeamList] = useState([]);
    const [quarter, setQuarter] = useState(4);
    const [whitePlayer, setWhitePlayer] = useState('');
    const [blackPlayer, setBlackPlayer] = useState('');
    const [greenPlayer, setGreenPlayer] = useState('');
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
        type === 'next' ? setCurrent(current + 1) : setCurrent(current - 1);
    };

    const onClickTeamSave = () => {
        setTeamStatus('finish');
    };

    const onClickQuarterSave = () => {
        setQuarterStatus('finish');
    };

    const onChangeQuarter = (value) => {
        setQuarter(value);
    };

    const onClickAddPlayer = (type) => {
        type === 'white' ? setWhitePlayerList([whitePlayer, ...whitePlayerList]) :
            type === 'black' ? setBlackPlayerList([blackPlayer, ...blackPlayerList]) :
                setGreenPlayerList([greenPlayer, ...greenPlayerList]);
    };

    const onClickPlayerSave = () => {
        setPlayerStatus('finish');
    };

    return (
        <Row gutter={[16, 16]} justify='center'>
            <Col span={24}>
                <Step current={current} setCurrent={setCurrent} items={items}/>
            </Col>
            <Col span={3}>
                <BasicButton size='small' icon={<LeftOutlined/>}
                             disabled={current === 0} onClick={() => onClickSteps('prev')}/>
            </Col>
            <Col span={3}>
                <BasicButton size='small' icon={<RightOutlined/>}
                             disabled={current === 2} onClick={() => onClickSteps('next')}/>
            </Col>
            <Col span={24}>

            </Col>
            {current === 0 ?
                <Row gutter={[8, 8]} justify='center'>
                    <Col span={24}>
                        <Transfers initialTeamList={initialTeamList} setTeamList={setTeamList} teamList={teamList}/>
                    </Col>
                    <Col span={6}>
                        <BasicButton disabled={teamList.length < 2} text='팀 저장'
                                     onClick={onClickTeamSave}/>
                    </Col>
                </Row>

                :
                current === 1 ?
                    <Row gutter={[8, 8]} justify='center'>
                        <Col span={12}>
                            <Number min={1} max={10} value={quarter} onChange={onChangeQuarter} addonAfter='쿼터'/>
                        </Col>
                        <Col span={8}>
                            <BasicButton text='쿼터 저장' disabled={teamStatus === 'wait'}
                                         onClick={onClickQuarterSave}/>
                        </Col>

                    </Row>
                    :
                    current === 2 ?
                        <Row gutter={[8, 8]}>
                            {teamList.map(v => (
                                <Col offset={1} span={7} key={v.team}>
                                    <Lists header={v.team} whitePlayerList={whitePlayerList} blackPlayerList={blackPlayerList} greenPlayerList={greenPlayerList} />
                                </Col>
                            ))}
                            {teamList.map(v => (
                                <Col span={8} key={v.team}>
                                    <Space.Compact>
                                        <Name type={v.key} setWhitePlayer={setWhitePlayer} setBlackPlayer={setBlackPlayer} setGreenPlayer={setGreenPlayer} />
                                        <BasicButton icon={<PlusOutlined/>} size='small'
                                                     onClick={() => onClickAddPlayer(v.key)}/>
                                    </Space.Compact>
                                </Col>
                            ))}
                            <Col span={8}>
                                <BasicButton text='선수 저장' disabled={quarterStatus === 'wait'}
                                             onClick={onClickPlayerSave}/>
                            </Col>
                        </Row>
                        :
                        null
            }
        </Row>
    );
};

export default TeamSettingPage;