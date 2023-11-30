import { useRecoilState, useRecoilValue } from "recoil";
import { filterAtom } from "../../../Atoms/todoItemsAtom.ts";
import { FiChevronDown } from "react-icons/fi";
import styled from "styled-components";


export default function SelectFilter({theme}) {
    const [filter, setFilter] = useRecoilState(filterAtom);

    function handleChange(event:React.ChangeEvent) {
        setFilter(event.target.value);
    }
    return (
        <div style={{position: "relative"}}>
            <TodoFilterSelect theme={theme} value={filter} onChange={(event)=> handleChange(event)}>
                <option value="all">All</option>
                <option value="done">Done</option>
                <option value="not yet">Not yet</option>
            </TodoFilterSelect>
            <FiChevronDown size={20}/>
        </div>
    )
}

const TodoFilterSelect = styled.select<{theme:string}>`
    border: 0.12em solid  ${(props) => ( props.theme === "theme-dark" ? "var(--color-gray-1)" : "var(--color-light-gray-0)")};
    background: transparent;
    color: ${(props) => ( props.theme === "theme-dark" ? "var(--color-gray-0)" : "var(--color-gray-2)")};
    border-radius: 30px;
    font-size: 1em;
    cursor: pointer;
    padding: 5px 20px 5px 16px;
    width: 6.5em;
    outline: none;
    font-weight: 700;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;

    & + svg {
        position: absolute;
        z-index: -1;
        top: 9px;
        right: 9px;
        color: ${(props) => ( props.theme === "theme-dark" ? "var(--color-gray-0)" : "var(--color-gray-2)")};
    }
`;