import React, { useEffect, useState } from 'react';
import { read, utils } from 'xlsx';
import {Card, Col, Layout, Row, Select, Space, Typography} from "antd";
import PlayerList from "../Component/Menu/PlayerList";
import LineChart from "../Component/Chart/LineChart";
import {UserOutlined} from "@ant-design/icons";
const { Content, Sider } = Layout;

const RecordPage = () => {
    const [excelFile, setExcelFile] = useState([]);
    const [playerList, setPlayerList] = useState([]);
    const [selectedPlayer, setSelectedPlayer] = useState(null);
    const [selectedRecord, setSelectedRecord] = useState([]);
    const [finalRecord, setFinalRecord] = useState([]);
    const [type, setType] = useState('pq');
    const [loading, setLoading] = useState(false);
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

    useEffect(() => {(
        async() => {
            const f = await (await fetch('/excel/record.xlsx')).arrayBuffer();
            const wb = read(f);
            const ws = wb.Sheets[wb.SheetNames[0]];
            const data = utils.sheet_to_json(ws);
            setExcelFile(data);
        })(
    )}, []);

    useEffect(() => {
        if(excelFile.length > 0) {
            const uniqueObjArr = excelFile.filter((obj, idx) => {
                const isFirstFindIdx = excelFile.findIndex((obj2) => obj2.name === obj.name);
                return isFirstFindIdx === idx;
            });
            setPlayerList(uniqueObjArr.map(v => v.name).sort((a, b) => a.localeCompare(b)));
        }
    } ,[excelFile]);

    useEffect(() => {
        if(selectedPlayer !== null && excelFile.length > 0) {
            setSelectedRecord(excelFile.filter(v => v.name === selectedPlayer));
            setFinalRecord([]);
        }
    }, [selectedPlayer, excelFile, type]);

    useEffect(() => {
        if(selectedRecord.length > 0) {
            setLoading(true);
            const temp = selectedRecord;
            let arr = [];
            for(let i = 0; i < selectedRecord.length; i++) {
                if(i === 0)
                    arr.push(temp[i]);
                else {
                    if(arr.find(v => v.date === selectedRecord[i].date) === undefined) {
                        arr.push(selectedRecord[i]);
                    } else {
                        let index = arr.findIndex(v => v.date === selectedRecord[i].date);
                        arr[index] = {...arr[index],
                            assist: arr[index].assist + selectedRecord[i].assist,
                            beff: arr[index].beff + selectedRecord[i].beff,
                            block: arr[index].block + selectedRecord[i].block,
                            defensiveRebound: arr[index].defensiveRebound + selectedRecord[i].defensiveRebound,
                            fg: arr[index].fg + selectedRecord[i].fg,
                            foul: arr[index].foul + selectedRecord[i].foul,
                            offensiveRebound: arr[index].offensiveRebound + selectedRecord[i].offensiveRebound,
                            points: arr[index].points + selectedRecord[i].points,
                            pq: arr[index].pq + selectedRecord[i].pq,
                            steal: arr[index].steal + selectedRecord[i].steal,
                            threeMade: arr[index].threeMade + selectedRecord[i].threeMade,
                            threePer: arr[index].threePer + selectedRecord[i].threePer,
                            threeTry: arr[index].threeTry + selectedRecord[i].threeTry,
                            totalRebound: arr[index].totalRebound + selectedRecord[i].totalRebound,
                            turnOver: arr[index].turnOver + selectedRecord[i].turnOver,
                            twoMade: arr[index].twoMade + selectedRecord[i].twoMade,
                            twoPer: arr[index].twoPer + selectedRecord[i].twoPer,
                            twoTry: arr[index].twoTry + selectedRecord[i].twoTry,
                        };
                    }
                }
            }
            setFinalRecord(arr.map(v => {
                const divider = type === 'pq' ? v[type] : type;
                return {...v,
                    assist: (v.assist / divider),
                    beff: (v.beff / divider),
                    block: (v.block / divider),
                    defensiveRebound: (v.defensiveRebound / divider),
                    fg: (v.fg / divider),
                    foul: (v.foul / divider),
                    offensiveRebound: (v.offensiveRebound / divider),
                    points: (v.points / divider),
                    steal: (v.steal / divider),
                    threeMade: (v.threeMade / divider),
                    threePer: (v.threePer / divider),
                    threeTry: (v.threeTry / divider),
                    totalRebound: (v.totalRebound / divider),
                    turnOver: (v.turnOver / divider),
                    twoMade: (v.twoMade / divider),
                    twoPer: (v.twoPer / divider),
                    twoTry: (v.twoTry / divider),
                }
            }));
            setTimeout(() => {
                setLoading(false);
                }, 1000);

        }
    }, [selectedRecord]);

    const title = () => (
        <Row justify='space-between'>
            <Col span={4}>
                <Space size='large'>
                    <Typography.Text strong>Record</Typography.Text>
                    {finalRecord.length > 0 ?
                        <Typography.Text strong><UserOutlined/>{finalRecord[0].name}</Typography.Text> : <></>
                    }
                </Space>
            </Col>

            <Col span={4}>
                <Select style={{width: '100%'}} onChange={onChangeType} defaultValue='pq'
                        options={[{value: 'pq', label: '쿼터'}, {value: 2.7, label: '경기'}]}/>
            </Col>
        </Row>
    );

    const onChangeType = (value) => {
        setType(value);
        setSelectedRecord([]);
        setFinalRecord([]);
    };

    return (
        <Layout>
            <Sider style={{background: 'white'}}>
                <PlayerList playerList={playerList} setSelectedPlayer={setSelectedPlayer}/>
            </Sider>
            <Content>
                <Card title={title()}>
                    <Row gutter={[16, 16]}>
                        {optionList.map(v =>
                            <LineChart key={v.value} finalRecord={finalRecord} defaultOption={v} loading={loading}/>
                        )}
                    </Row>
                </Card>
            </Content>
        </Layout>
    );
};

export default RecordPage;