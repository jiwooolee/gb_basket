import React from 'react';
import { useNavigate } from "react-router-dom";

import { Row, Col, Typography } from "antd";
import { TeamOutlined } from '@ant-design/icons';

import BasicButton from "../Component/Button/BasicButton";

const InitPage = () => {
    const { Title } = Typography;
    const navigate = useNavigate();

    const onClickTeamSetting = () => {
        navigate('/team');
    };

    return (
        <Row style={{textAlign: 'center', minHeight: '100vh', backgroundImage:`url(${process.env.PUBLIC_URL}/Image/Background.jpg)`,
            backgroundRepeat:"no-repeat", backgroundPosition: 'center', backgroundSize: 'cover'}} gutter={[16, 0]} justify='center'>
            <Col span={24}/>
            <Col span={24}>
                <BasicButton style={{width: '10rem'}} type='primary' shape='default' size='large'
                             icon={<TeamOutlined/>} text='팀 설정' disabled={false}
                             onClick={onClickTeamSetting}
                />
            </Col>
            <Col span={24}>
                <Title italic style={{fontSize: '6rem', color: 'white'}}>Green Buffalos Stats</Title>
            </Col>
        </Row>
    )
};

export default InitPage;