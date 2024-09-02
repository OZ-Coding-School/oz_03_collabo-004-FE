import { FaGamepad } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaHouse } from "react-icons/fa6";
import { FaQuestionCircle } from "react-icons/fa";
import { FaLightbulb } from "react-icons/fa";
import { FaTshirt } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";
import { FaFeatherPointed } from "react-icons/fa6";
import { BsPcDisplayHorizontal } from "react-icons/bs";
import { FaMobileAlt } from "react-icons/fa";

export const DUMMY_TAGS = [
    { id: 0, icon: <FaHeart />, text: "연애 훈수", path: "" },
    { id: 1, icon: <FaHouse />, text: "집안일 훈수", path: "" },
    { id: 2, icon: <FaQuestionCircle />, text: "고민 훈수", path: "" },
    { id: 3, icon: <FaFeatherPointed />, text: "소소 훈수", path: "" },
    { id: 4, icon: <FaLightbulb />, text: "상상 훈수", path: "" },
    { id: 5, icon: <FaTshirt />, text: "패션 훈수", path: "" },
    { id: 6, icon: <FaGamepad />, text: "게임 훈수", path: "" },
    { id: 7, icon: <FaMobileAlt />, text: "모바일 게임 훈수", path: "" },
    { id: 8, icon: <BsPcDisplayHorizontal />, text: "PC 게임 훈수", path: "" },
    { id: 9, icon: <FaPencilAlt />, text: "교육 훈수", path: "" },
];

export const LEVEL_TITLE = [
    { maxLevel: 4, title: "훈수 새싹" },
    { maxLevel: 9, title: "견습 훈수꾼" },
    { maxLevel: 14, title: "풋내기 훈수꾼" },
    { maxLevel: 19, title: "초보 훈수꾼" },
    { maxLevel: 24, title: "훈수 초급자" },
    { maxLevel: 29, title: "훈수 입문자" },
    { maxLevel: 34, title: "훈수 중급자" },
    { maxLevel: 39, title: "훈수 숙련자" },
    { maxLevel: 44, title: "훈수 전문가" },
    { maxLevel: 49, title: "노련한 훈수꾼" },
    { maxLevel: 54, title: "훈수 달인" },
    { maxLevel: 59, title: "훈수 마스터" },
    { maxLevel: 64, title: "훈수 대가" },
    { maxLevel: 69, title: "훈수 고수" },
    { maxLevel: 74, title: "훈수 명인" },
    { maxLevel: 79, title: "훈수 거장" },
    { maxLevel: 84, title: "훈수의 귀재" },
    { maxLevel: 89, title: "훈수의 전설" },
    { maxLevel: 94, title: "궁극의 훈수꾼" },
    { maxLevel: 100, title: "훈수왕" },
];
