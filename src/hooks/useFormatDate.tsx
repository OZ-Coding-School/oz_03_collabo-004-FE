import { useMemo } from "react";

const useFormatDate = (dateString: string) => {
    return useMemo(() => {
        if (!dateString) return "";

        const [datePart] = dateString.split("T");
        const [year, month, day] = datePart.split("-");

        return `${year}년 ${month}월 ${day}일`;
    }, [dateString]);
};

export default useFormatDate;
