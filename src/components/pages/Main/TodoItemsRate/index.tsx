import {useRecoilValue} from "recoil";
import { todoItemsProgressPercentageSelector } from "../../../Atoms/todoItemsAtom.ts";


export default function TodoItemsListHeader() {
    //달성률 계산에 필요한 todoItems를 Recoil에서 불러온다.
    const percentage = useRecoilValue(todoItemsProgressPercentageSelector);

    return (
        <p style={{userSelect:"none", color: "var(--color-text)", padding: "0.25em 0.75em", width: "100%", fontSize: 16}}>
            🎯 달성률 : <span style={{color: "var(--color-text)", fontWeight:700}}>{percentage}%</span>
        </p>
    )
}