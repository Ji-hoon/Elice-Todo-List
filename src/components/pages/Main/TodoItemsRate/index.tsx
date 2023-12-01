import {useRecoilValue} from "recoil";
import { todoItemsProgressPercentageSelector } from "../../../Atoms/todoItemsAtom.ts";
import styled from "styled-components";


export default function TodoItemsListHeader() {
    //달성률 계산에 필요한 todoItems를 Recoil에서 불러온다.
    const percentage = useRecoilValue(todoItemsProgressPercentageSelector);

    return (
        <p style={{userSelect:"none", color: "var(--color-text)", padding: "0.25em 0.75em", width: "100%", fontSize: 16}}>
            <span style={{fontSize:20, paddingRight:4}}>🎯</span> 달성률 : &nbsp;
            <PercentageValue value={percentage}>{percentage}%</PercentageValue>
        </p>
    )
}
const PercentageValue = styled.span<{value:number}>`
    font-weight:700;
    color: ${(props) => ( props.value === 100 ? "var(--color-primary-deep)" : "var(--color-text)")};
`