import React, { useEffect, useState } from 'react';
import { read, utils } from 'xlsx';
import {Card, Col, Layout, Row} from "antd";
import PlayerList from "../Component/Menu/PlayerList";
import LineChart from "../Component/Chart/LineChart";
const { Content, Sider } = Layout;

const RecordPage = () => {
    const [excelFile, setExcelFile] = useState([]);
    const [playerList, setPlayerList] = useState([]);
    const [selectedPlayer, setSelectedPlayer] = useState(null);
    const [selectedRecord, setSelectedRecord] = useState([]);
    const [finalRecord, setFinalRecord] = useState([]);
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
            console.log(excelFile)
            const uniqueObjArr = excelFile.filter((obj, idx) => {
                const isFirstFindIdx = excelFile.findIndex((obj2) => obj2.name === obj.name);
                return isFirstFindIdx === idx;
            });
            console.log(excelFile)
            setPlayerList(uniqueObjArr.map(v => v.name).sort((a, b) => a.localeCompare(b)));
        }
    } ,[excelFile]);

    useEffect(() => {
        console.log(playerList)
    }, [playerList]);

    useEffect(() => {
        if(selectedPlayer !== null && excelFile.length > 0) {
            // const playerRecord = excelFile.filter(v => v.name === selectedPlayer);
            setSelectedRecord(excelFile.filter(v => v.name === selectedPlayer));
            // playerRecord.reduce((acc, cur) => {
            //     if(acc.length > 0 && acc.find(v => v.date === cur.date) !== undefined) {
            //         const temp = acc;
            //         temp.map((v) => {
            //             if(v.date === cur.date) {
            //                 Object.keys(v).map(b => {
            //                     if(b !== 'name' && b !== 'date')
            //                         v[b] = v[b] + cur[b];
            //                 });
            //             }
            //             return v;
            //         });
            //         return temp;
            //     } else {
            //         return acc;
            //     }
            // }, []);
        }
    }, [selectedPlayer, excelFile]);

    useEffect(() => {
        if(selectedRecord.length > 0) {
            const temp = selectedRecord;
            let arr = [];
            console.log(temp)
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
                return {...v,
                    assist: (v.assist / v.pq),
                    beff: (v.beff / v.pq),
                    block: (v.block / v.pq),
                    defensiveRebound: (v.defensiveRebound / v.pq),
                    fg: (v.fg / v.pq),
                    foul: (v.foul / v.pq),
                    offensiveRebound: (v.offensiveRebound / v.pq),
                    points: (v.points / v.pq),
                    steal: (v.steal / v.pq),
                    threeMade: (v.threeMade / v.pq),
                    threePer: (v.threePer / v.pq),
                    threeTry: (v.threeTry / v.pq),
                    totalRebound: (v.totalRebound / v.pq),
                    turnOver: (v.turnOver / v.pq),
                    twoMade: (v.twoMade / v.pq),
                    twoPer: (v.twoPer / v.pq),
                    twoTry: (v.twoTry / v.pq),
                }
            }));
        }
    }, [selectedRecord]);

    useEffect(() => {
        if(finalRecord.length > 0) {
            console.log(finalRecord)
        }
    }, [finalRecord]);

    return (
        <Layout>
            <Sider style={{background: 'white'}}>
                <PlayerList playerList={playerList} setSelectedPlayer={setSelectedPlayer}/>
            </Sider>
            <Content>
                <Card title='Record'>
                    <Row gutter={[16, 16]}>
                        {optionList.map(v =>
                            <LineChart key={v.value} finalRecord={finalRecord} defaultOption={v}/>
                        )}
                    </Row>
                </Card>
            </Content>
        </Layout>
    );
};

export default RecordPage;