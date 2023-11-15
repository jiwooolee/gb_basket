import React, {useEffect, useState} from 'react';

import { Line } from '@ant-design/plots';
import {Button, Card, Col, Row, Select} from "antd";
import {MinusOutlined, PlusOutlined} from "@ant-design/icons";

const LineChart = ({ finalRecord, defaultOption }) => {
    const [data, setData] = useState([]);
    const [expansion, setExpansion] = useState(false);

    useEffect(() => {
        if(finalRecord.length > 0) {
            setData(finalRecord);
        }
    }, [finalRecord]);

    const config = {
        data, padding: 'auto', xField: 'date', yField: defaultOption.value,
    };

    const onClickExpansion = () => {
        setExpansion((prevState) => !prevState);
    };

    return (
        <Col key={defaultOption.value} span={expansion === false ? 6 : 24}>
            <Card type='inner' title={defaultOption.label} size='small'
                  extra={<Button icon={expansion === false ? <PlusOutlined/> : <MinusOutlined/>} onClick={onClickExpansion}/>}>
                <Row gutter={[16, 16]}>
                    <Col span={24}>
                        <Line {...config}/>
                    </Col>
                </Row>
            </Card>
        </Col>
    );
};

export default LineChart;