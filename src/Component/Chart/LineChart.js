import React, {useEffect, useState} from 'react';

import { Line } from '@ant-design/plots';
import {Card, Col, Row, Select} from "antd";

const LineChart = ({ finalRecord }) => {
    const [data, setData] = useState([]);
    const optionList = [
        {value: 'fg', label: '야투율'},
        {value: 'twoTry', label: '2점 시도'},
        {value: 'twoMade', label: '2점 성공'},
        {value: 'twoPer', label: '2점 성공률'},
        {value: 'threeTry', label: '3점 시도'},
        {value: 'threeMade', label: '3점 성공'},
        {value: 'threePer', label: '3점 성공률'},
        {value: 'points', label: '득점'},
        {value: 'totalRebound', label: '총 리바운드'},
        {value: 'offensiveRebound', label: '공격 리바운드'},
        {value: 'defensiveRebound', label: '수비 리바운드'},
        {value: 'assist', label: '어시스트'},
        {value: 'steal', label: '스틸'},
        {value: 'block', label: '블락'},
        {value: 'turnOver', label: '턴오버'},
        {value: 'foul', label: '파울'},
        {value: 'beff', label: '종합 지표'}
    ];
    const [selectedOption, setSelectedOption] = useState('points');

    useEffect(() => {
        if(finalRecord.length > 0) {
            setData(finalRecord);
        }
    }, [finalRecord]);

    const config = {
        data, padding: 'auto', xField: 'date', yField: selectedOption,
    };

   const onChangeOption = (value) => {
       setSelectedOption(value);
   };

    return (

        <Card title='Record' size='small'>
            <Row gutter={[16, 16]}>
                <Col span={4}>
                    <Select style={{width: '100%'}} options={optionList} defaultValue='points' onChange={onChangeOption} />
                </Col>
                <Col span={16}/>
                <Col span={24}>
                    <Line {...config}/>
                </Col>
            </Row>
        </Card>
    );
};

export default LineChart;