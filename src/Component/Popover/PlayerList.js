import React, { useState } from 'react';

import { message, Popover } from "antd";

import BasicButton from "../Button/BasicButton";
import PlayerButton from "../Space/PlayerButton";

const PlayerList = ({ text, type, setRecentAction, playAttackTeam, playDefenceTeam, setPlayAttackTeam, setPlayDefenceTeam, teamList, setTeamList,
                        currentAttackPlayerList, currentDefencePlayerList, attackTeamActionList, defenceTeamActionList, setAttackTeamActionList, setDefenceTeamActionList,
                        attackTeamActionIndex, defenceTeamActionIndex, setAttackTeamActionIndex, setDefenceTeamActionIndex }) => {
    const [open, setOpen] = useState(false);
    const badActionList = ['2점 실패',  '3점 실패',   '턴오버', '파울'];

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
                          teamList={teamList} setTeamList={setTeamList}
                          currentAttackPlayerList={currentAttackPlayerList} currentDefencePlayerList={currentDefencePlayerList}
                          attackTeamActionList={attackTeamActionList} defenceTeamActionList={defenceTeamActionList}
                          setAttackTeamActionList={setAttackTeamActionList} setDefenceTeamActionList={setDefenceTeamActionList}
                          attackTeamActionIndex={attackTeamActionIndex} defenceTeamActionIndex={defenceTeamActionIndex}
                          setAttackTeamActionIndex={setAttackTeamActionIndex} setDefenceTeamActionIndex={setDefenceTeamActionIndex}
            />
        }>
            <BasicButton style={{width: '6rem'}} text={text} onClick={() => setOpen(open !== true)} danger={badActionList.includes(text)}/>
        </Popover>
    )
};

export default PlayerList;
