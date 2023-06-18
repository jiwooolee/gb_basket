import React from 'react';
import { useNavigate } from "react-router-dom";

import { Row, Col } from "antd";
import { TeamOutlined } from '@ant-design/icons';

import BackGround from "../Component/Image/BackGround";
import BasicButton from "../Component/Button/BasicButton";

const InitPage = () => {
    const navigate = useNavigate();

    const onClickTeamSetting = () => {
        navigate('/team');
    };

    return (
        <Row gutter={[32, 32]} justify='center'>
            <Col span={24}>
                <BackGround width='100%' preview={false} src={'logo.png'}/>
            </Col>
            <Col>
                <BasicButton type='default' shape='default' size='large'
                             icon={<TeamOutlined/>} text='팀 설정' disabled={false}
                             onClick={onClickTeamSetting}
                />
            </Col>
        </Row>
    )
};

export default InitPage;