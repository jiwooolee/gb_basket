import React, { useEffect, useState } from 'react';

import { Collapse } from "antd";

import ScoreBoard from "../Component/ScoreBoard";

const GamePage = () => {
    const [teamList, setTeamList] = useState([]);
    const [totalGame, setTotalGame] = useState([]);

    useEffect(() => {
        setTeamList(JSON.parse(window.localStorage.getItem('teamList')));
    }, []);

    useEffect(() => {
        console.log(teamList)
    }, [teamList]);

    useEffect(() => {
        if(teamList.length > 0) {
            let temp = [];
            if(teamList.length === 3) {
                temp.push({attack: teamList[0], defence: teamList[1], label: teamList[0].team + ' VS ' + teamList[1].team,
                    children: <ScoreBoard teamList={teamList} setTeamList={setTeamList} attackTeam={teamList[0]} defenceTeam={teamList[1]}/>});
                temp.push({attack: teamList[1], defence: teamList[2], label: teamList[1].team + ' VS ' + teamList[2].team,
                    children: <ScoreBoard teamList={teamList} setTeamList={setTeamList} attackTeam={teamList[1]} defenceTeam={teamList[2]}/>});
                temp.push({attack: teamList[2], defence: teamList[0], label: teamList[2].team + ' VS ' + teamList[0].team,
                    children: <ScoreBoard teamList={teamList} setTeamList={setTeamList} attackTeam={teamList[2]} defenceTeam={teamList[0]}/>});
            } else if(teamList.length === 2) {
                temp.push({attack: teamList[0], defence: teamList[1], label: teamList[0].team + ' VS ' + teamList[1].team,
                    children: <ScoreBoard teamList={teamList} setTeamList={setTeamList} attackTeam={teamList[0]} defenceTeam={teamList[1]}/>});
            }
            setTotalGame(temp);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [teamList]);

    return (
        <Collapse accordion items={totalGame} />
    )
};

export default GamePage;
