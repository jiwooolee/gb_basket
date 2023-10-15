import React from 'react';
import { useNavigate } from "react-router-dom";

import {Row, Col, Typography, message, Space} from "antd";
import {LineChartOutlined, TeamOutlined} from '@ant-design/icons';

import BasicButton from "../Component/Button/BasicButton";

const InitPage = () => {
    const { Title } = Typography;
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();

    const onClickTeamSetting = () => {
        messageApi.info('이 기능은 폐업 했어요').then();
    };

    const onClickRecord = () => {
        navigate('/record');
    };

    return (
        <Row style={{textAlign: 'center', minHeight: '100vh', backgroundImage:`url(${process.env.PUBLIC_URL}/Image/Background.jpg)`,
            backgroundRepeat:"no-repeat", backgroundPosition: 'center', backgroundSize: 'cover'}} gutter={[32, 0]} justify='center' align='bottom'>
            {contextHolder}
            <Col span={24}>
                <Space direction='vertical'>
                    <BasicButton style={{size: '2rem'}} type='primary' shape='default' size='large'
                                 icon={<TeamOutlined/>} text='팀 설정' disabled={false}
                                 onClick={onClickTeamSetting}
                    />
                    <BasicButton style={{size: '2rem'}} type='primary' shape='default' size='large'
                                 icon={<LineChartOutlined />} text='기록실' disabled={false}
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