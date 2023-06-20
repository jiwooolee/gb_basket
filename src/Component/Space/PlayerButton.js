import React from 'react';

import { Space, Typography } from "antd";

import BasicButton from "../Button/BasicButton";

const PlayerButton = ({ type, setOpen, setRecentAction, text, playAttackTeam, playDefenceTeam, setPlayAttackTeam, setPlayDefenceTeam, teamList, setTeamList, currentAttackPlayerList, currentDefencePlayerList }) => {
    const { Text } = Typography;

    const calPercent = (a, b) => {
        return (a / b) * 100;
    };

    const onClickPlayer = (player, type, action) => {
        setRecentAction(player.name + ' ' + action);
        setOpen(false);

        let temp = type === 'attack' ? playAttackTeam : playDefenceTeam;
        // eslint-disable-next-line array-callback-return
        temp = {...temp,
            score: action === '2점 성공' ? (temp.score + 2) : action === '3점 성공' ? (temp.score + 3) : temp.score,
            // eslint-disable-next-line array-callback-return
            players: [...temp.players.map(v => {
                if(v.key === player.key) {
                    if(action === '2점 성공') {
                        return {...v, '2PA': (v['2PA'] + 1), '2PM': (v['2PM'] + 1), '2P%': parseInt(calPercent((v['2PM'] + 1), (v['2PA'] + 1))), 'PTS': (v['PTS'] + 2),
                            'FG%': parseInt(calPercent((v['2PM'] + v['3PM'] + 1), (v['2PA'] + v['3PA'] + 1)))};
                    } else if(action === '2점 실패') {
                        return {...v, '2PA': (v['2PA'] + 1), '2P%': parseInt(calPercent((v['2PM']), (v['2PA'] + 1))),
                            'FG%': parseInt(calPercent((v['2PM'] + v['3PM']), (v['2PA'] + v['3PA'] + 1)))};
                    } else if(action === '3점 성공') {
                        return {...v, '3PA': (v['3PA'] + 1), '3PM': (v['3PM'] + 1), '3P%': parseInt(calPercent((v['3PM'] + 1), (v['3PA'] + 1))), 'PTS': (v['PTS'] + 3),
                            'FG%': parseInt(calPercent((v['2PM'] + v['3PM'] + 1), (v['2PA'] + v['3PA'] + 1)))};
                    } else if(action === '3점 실패') {
                        return {...v, '3PA': (v['3PA'] + 1), '3P%': parseInt(calPercent((v['3PM']), (v['3PA'] + 1))),
                            'FG%': parseInt(calPercent((v['2PM'] + v['3PM']), (v['2PA'] + v['3PA'] + 1)))};
                    } else if(action === '공격 리바') {
                        return {...v, 'OR': (v['OR'] + 1), 'TR': (v['TR'] + 1)};
                    } else if(action === '수비 리바') {
                        return {...v, 'DR': (v['DR'] + 1), 'TR': (v['TR'] + 1)};
                    } else if(action === '어시스트') {
                        return {...v, 'AST': (v['AST'] + 1)};
                    } else if(action === '스틸') {
                        return {...v, 'STL': (v['STL'] + 1)};
                    } else if(action === '블락') {
                        return {...v, 'BLK': (v['BLK'] + 1)};
                    } else if(action === '턴오버') {
                        return {...v, 'TOV': (v['TOV'] + 1)};
                    } else if(action === '파울') {
                        return {...v, 'PF': (v['PF'] + 1)};
                    }
                } else {
                    return v;
                }
        })]};
        type === 'attack' ? setPlayAttackTeam({...playAttackTeam, players: temp.players, score: temp.score}) : setPlayDefenceTeam({...playAttackTeam, players: temp.players, score: temp.score});
        setTeamList(teamList.map(v => {
            if(v.key === temp.key) {
                return {...v, players: temp.players, score: temp.score};
            } else {
                return v;
            }
        }))
    };

    return (
        <Space>
            {(type === 'attack' ? currentAttackPlayerList : currentDefencePlayerList).map((v, i) =>
                <BasicButton key={i} shape='circle' size='small' text={<Text>{v.name}</Text>} onClick={() => onClickPlayer(v, type, text)}/>
            )}
        </Space>
    )
};

export default PlayerButton;