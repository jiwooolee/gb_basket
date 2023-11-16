import React, {useEffect, useState} from 'react';

import { Line } from '@ant-design/plots';
import {Button, Card, Col, Row, Spin} from "antd";
import {MinusOutlined, PlusOutlined} from "@ant-design/icons";
import SetTooltipValue from "../Function/SetTooltipValue";
import SetTooltipLabel from "../Function/SetTooltipLabel";

const LineChart = ({ finalRecord, defaultOption, loading }) => {
    const [data, setData] = useState([]);
    const [expansion, setExpansion] = useState(false);

    useEffect(() => {
        if(finalRecord.length > 0) {
            setData(finalRecord);
        } else {
            setData([]);
        }
    }, [finalRecord]);

    const config = {
        data, padding: 'auto', xField: 'date', yField: defaultOption.value,
        point: {size: 3, shape: 'diamond', style: {fill: 'white', stroke: '#5B8FF9'}},
        slider: {start: 0, end: 1},
        tooltip: {
            'formatter': (datum) => ({
                name: defaultOption.label,
                value: SetTooltipValue(datum, defaultOption)
            })
        },
        yAxis: {
            label: {
                'formatter': (value) => (
                    SetTooltipLabel(value, defaultOption)
                ),
            },
        },
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
                        <Spin spinning={loading}>
                            <Line {...config}/>
                        </Spin>
                    </Col>
                </Row>
            </Card>
        </Col>
    );
};

export default LineChart;