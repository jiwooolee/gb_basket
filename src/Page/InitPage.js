import React from 'react';
import { useNavigate } from "react-router-dom";

import {Row, Col, Typography, Space, message} from "antd";
import {FundProjectionScreenOutlined, TeamOutlined} from '@ant-design/icons';

import BasicButton from "../Component/Button/BasicButton";

const InitPage = () => {
    const { Title } = Typography;
    const navigate = useNavigate();

    const onClickTeamSetting = () => {
        message.info('폐업중').then();
        // navigate('/team');
    };

    const onClickRecord = () => {
        navigate('/record');
    };

    return (
        <Row style={{textAlign: 'center', minHeight: '100vh', backgroundImage:`url(${process.env.PUBLIC_URL}/Image/Background.jpg)`,
            backgroundRepeat:"no-repeat", backgroundPosition: 'center', backgroundSize: 'cover'}} gutter={[32, 0]} justify='center' align='bottom'>
            <Col span={24}>
                <Space direction='vertical'>
                    <BasicButton style={{width: '10rem'}} type='primary' shape='default' size='large'
                                 icon={<TeamOutlined/>} text='팀 설정' disabled={false}
                                 onClick={onClickTeamSetting}
                    />
                    <BasicButton style={{width: '10rem'}} type='primary' shape='default' size='large'
                                 icon={<FundProjectionScreenOutlined/>} text='기록' disabled={false}
                                 onClick={onClickRecord}
                    />
                </Space>
            </Col>
            <Col span={24}>
                <Title italic style={{fontSize: '6rem'}}>Green Buffalos Stats</Title>
            </Col>
        </Row>
    )
};

export default InitPage;