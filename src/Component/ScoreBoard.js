import React from 'react';
import { Col, Row } from "antd";


const ScoreBoard = () => {


    return (
        <Row gutter={[16, 16]}>
            <Col span={6}></Col>
            <Col span={6}></Col>
            <Col span={6}></Col>
            <Col span={6}></Col>
        </Row>
    )
};

export default ScoreBoard;
