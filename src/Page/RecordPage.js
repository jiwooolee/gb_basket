import React, { useEffect, useState } from 'react';
import { read, utils } from 'xlsx';
import { Layout } from "antd";
import PlayerList from "../Component/Menu/PlayerList";
const { Content, Sider } = Layout;

const RecordPage = () => {
    const [excelFile, setExcelFile] = useState([]);
    const [playerList, setPlayerList] = useState([]);

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
            setPlayerList(uniqueObjArr.map(v => v.name).sort((a, b) => a.localeCompare(b)));
        }
    } ,[excelFile]);

    useEffect(() => {
        console.log(playerList)
    }, [playerList]);

    return (
        <Layout>
            <Sider>
                <PlayerList playerList={playerList}/>
            </Sider>
            <Content>
                b
            </Content>
        </Layout>
    );
};

export default RecordPage;