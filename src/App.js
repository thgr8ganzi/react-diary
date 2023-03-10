import './App.css';
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";
import {useRef, useState} from "react";

// const dummyList = [
//     {
//         id:1,
//         author:'이지수',
//         content:'안녕1',
//         emotion:1,
//         created_date:new Date().getTime(),
//     },{
//         id:2,
//         author:'홍길동',
//         content:'안녕2',
//         emotion:2,
//         created_date:new Date().getTime(),
//     },{
//         id:3,
//         author:'아무개',
//         content:'안녕3',
//         emotion:3,
//         created_date:new Date().getTime(),
//     },{
//         id:4,
//         author:'임꺽정',
//         content:'안녕4',
//         emotion:5,
//         created_date:new Date().getTime(),
//     },{
//         id:5,
//         author:'장길산',
//         content:'안녕5',
//         emotion:5,
//         created_date:new Date().getTime(),
//     },
// ];
function App() {

    const [data, setData] = useState([])
    const dataId = useRef(0)
    const  onCreate = (author, content, emotion) => {
        const created_date = new Date().getTime();
        const newItem = {
            author,
            content,
            emotion,
            created_date,
            id : dataId.current,
        };
        dataId.current += 1;
        setData([newItem, ...data])

    };

  return (
    <div className="App">
        <DiaryEditor onCreate={onCreate}/>
        <DiaryList diaryList={data}/>
    </div>
  );
}

export default App;
