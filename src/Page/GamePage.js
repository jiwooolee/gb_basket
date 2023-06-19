import React, { useEffect, useState } from 'react';

import { Collapse } from "antd";


const GamePage = () => {
    const [teamList, setTeamList] = useState([]);
    const [totalGame, setTotalGame] = useState([]);


    useEffect(() => {
        setTeamList(JSON.parse(window.localStorage.getItem('teamList')));
    }, []);

    useEffect(() => {
        if(teamList.length > 0) {
            let temp = [];
            if(teamList.length === 3) {
                for(let i = 1; i < 5; i++) {
                    temp.push({attack: teamList[i < 3 ? 0 : 1], defence: teamList[i < 3 ? 1 : 0]});
                    temp.push({attack: teamList[i < 3 ? 1 : 2], defence: teamList[i < 3 ? 2 : 1]});
                    temp.push({attack: teamList[i < 3 ? 2 : 0], defence: teamList[i < 3 ? 0 : 2]});
                }

            } else if(teamList.length === 2) {
                for(let i = 1; i < 5; i++) {
                    temp.push({attack: teamList[i < 3 ? 0 : 1], defence: teamList[i < 3 ? 1 : 0]});
                }
            }
            setTotalGame(temp.map(v => {
                return {...v, label: v.attack.team + ' VS ' + v.defence.team}
            }));
        }
    }, [teamList]);

    return (
        <Collapse accordion items={totalGame} />
    )
};

export default GamePage;
