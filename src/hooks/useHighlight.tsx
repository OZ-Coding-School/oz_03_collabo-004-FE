import { useEffect } from "react";
import hljs from "highlight.js";
import "highlight.js/styles/a11y-dark.css";

const useHighlight = () => {
    useEffect(() => {
        //? 모든 <code> 태그에서 코드 하이라이트 적용
        const codeTags = document.getElementsByTagName("code");

        //? 코드 블록의 내용에 따라 언어를 자동으로 감지하고 하이라이트 적용
        for (let i = 0; i < codeTags.length; i++) {
            const element = codeTags[i];
            const code = element.textContent || "";

            //? highlight.js를 사용하여 자동으로 언어 감지 및 하이라이트 적용
            const result = hljs.highlightAuto(code);

            //? 코드 블록에 하이라이트된 HTML을 삽입
            element.innerHTML = result.value;
        }
    }, []); //? 컴포넌트가 렌더링될 때 한 번 실행
};

export default useHighlight;
