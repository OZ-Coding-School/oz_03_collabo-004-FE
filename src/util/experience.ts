import { accountApi } from "../api";
import { EXPERIENCE } from "../config/const";

export const calculateUserLevelAndExperience = (count: number) => {
    // 총 경험치를 기준으로 현재 레벨 계산
    let level = Math.floor(count / 3); // 3마다 레벨이 1씩 증가
    let experience = ((count % 3) / 3) * 100; // 남은 count로 경험치 퍼센트 계산

    // 최대 레벨을 넘지 않도록 조정
    if (level > Object.keys(EXPERIENCE).length - 1) {
        level = Object.keys(EXPERIENCE).length - 1;
        experience = 100; // 최대 레벨에 도달하면 경험치 100%
    }

    return {
        userLevel: level,
        experience: Number(experience.toFixed(2)), // 경험치 퍼센트를 소수점 2자리로 고정
    };
};

export const calculateUserLevel = async (currentLevel: number, userId: number, count: number) => {
    const result = calculateUserLevelAndExperience(count);

    if (result.userLevel > currentLevel) {
        await accountApi.userLevelUpdate(userId, result.userLevel);
    }

    return result;
};
