import { useMemo } from "react";
import { LEVEL_TITLE } from "../config/const";

const useLevelTitle = (level: number) => {
    const levelTitle = useMemo(() => {
        if (level < 1 || level > 100) return null;

        const range = LEVEL_TITLE.find((range) => level <= range.maxLevel);
        return range ? range.title : null;
    }, [level]);

    return levelTitle;
};

export default useLevelTitle;
