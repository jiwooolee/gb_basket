import React, { useState } from 'react';

import { Popover, Typography } from "antd";

import BasicButton from "../Button/BasicButton";
import PlayerButton from "../Space/PlayerButton";

const PlayerList = ({ text, type, attackPlayersList, defencePlayersList, setRecentAction, playAttackTeam, playDefenceTeam, quarter, setPlayAttackTeam, setPlayDefenceTeam, teamList, setTeamList }) => {
    const { Text } = Typography;
    const [open, setOpen] = useState(false);

    return (
        <Popover trigger='click' open={open} content={
            <PlayerButton type={type} attackPlayersList={attackPlayersList} defencePlayersList={defencePlayersList}
                          setOpen={setOpen} setRecentAction={setRecentAction} text={text}
                          playAttackTeam={playAttackTeam} playDefenceTeam={playDefenceTeam}
                          setPlayAttackTeam={setPlayAttackTeam} setPlayDefenceTeam={setPlayDefenceTeam}
                          teamList={teamList} setTeamList={setTeamList} quarter={quarter}
            />
        }>
            <BasicButton shape='circle' size='small' text={<Text>{text}</Text>} onClick={() => setOpen(open !== true)}/>
        </Popover>
    )
};

export default PlayerList;
