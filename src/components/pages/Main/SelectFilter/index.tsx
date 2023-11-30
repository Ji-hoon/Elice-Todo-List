import {useRecoilState, useRecoilValue} from "recoil";
import { filterAtom } from "../../../Atoms/todoItemsAtom.ts";


export default function SelectFilter() {
    const [filter, setFilter] = useRecoilState(filterAtom);
    function handleChange(event) {
        setFilter(event.target.value);
    }
    return (
        <select value={filter} onChange={(event)=> handleChange(event)}>
            <option value="all">All</option>
            <option value="done">Done</option>
            <option value="not yet">Not yet</option>
        </select>
    )
}