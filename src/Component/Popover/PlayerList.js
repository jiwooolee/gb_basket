import React, { useState } from 'react';

import { message, Popover, Typography } from "antd";

import BasicButton from "../Button/BasicButton";
import PlayerButton from "../Space/PlayerButton";

const PlayerList = ({ text, type, setRecentAction, playAttackTeam, playDefenceTeam, quarter, setPlayAttackTeam, setPlayDefenceTeam, teamList, setTeamList, currentAttackPlayerList, currentDefencePlayerList }) => {
    const { Text } = Typography;
    const [open, setOpen] = useState(false);

    const onOpenChange = (isOpen) => {
        if(isOpen === true) {
            if((type === 'attack' && currentAttackPlayerList.length < 5) || (type === 'defense' && currentDefencePlayerList.length < 5)) {
                message.error({content: '출전 선수 5명을 채워주세요.'}).then();
                setTimeout(() => {
                    setOpen(false);
                });
            }
        }
    };

    return (
        <Popover trigger='click' open={open} onOpenChange={onOpenChange} content={
            <PlayerButton type={type}
                          setOpen={setOpen} setRecentAction={setRecentAction} text={text}
                          playAttackTeam={playAttackTeam} playDefenceTeam={playDefenceTeam}
                          setPlayAttackTeam={setPlayAttackTeam} setPlayDefenceTeam={setPlayDefenceTeam}
                          teamList={teamList} setTeamList={setTeamList} quarter={quarter}
                          currentAttackPlayerList={currentAttackPlayerList} currentDefencePlayerList={currentDefencePlayerList}
            />
        }>
            <BasicButton shape='circle' size='small' text={<Text>{text}</Text>} onClick={() => setOpen(open !== true)}/>
        </Popover>
    )
};

export default PlayerList;
