import './App.css';
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";
import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import Lifecycle from "./Lifecycle";
import OptimizeTest from "./OptimizeTest";

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

    const getData = async () => {
        const res = await fetch('https://jsonplaceholder.typicode.com/comments').then((res) => res.json());

        const initData = res.slice(0, 20).map((it) => {
            return {
                author: it.email,
                content: it.body,
                emotion: Math.floor(Math.random() * 5) + 1,
                created_date: new Date().getTime(),
                id: dataId.current++
            }
        })
        setData(initData)
    }
    useEffect(()=>{
        getData();
    },[])

    const [data, setData] = useState([])
    const dataId = useRef(0)
    const  onCreate = useCallback((author, content, emotion) => {
        const created_date = new Date().getTime();
        const newItem = {
            author,
            content,
            emotion,
            created_date,
            id : dataId.current,
        };
        dataId.current += 1;
        setData((data)=>[newItem, ...data])

    },[]);

    const onRemove = useCallback((targetId) => {
        setData((data)=>data.filter((it)=>it.id !== targetId));
    },[])

    const onEdit = useCallback((targetId, newContent) => {
        setData((data) => data.map((it) =>  it.id === targetId ? {...it, content:newContent} : it)
        )
    })

    const getDiaryAnalysis = useMemo(
        () => {
            const goodCount = data.filter((it) => it.emotion >= 3).length;
            const badCount = data.length - goodCount;
            const goodRatio = (goodCount / data.length) * 100;
            return({goodCount, badCount, goodRatio})
        },[data.length]
    );

    const {goodCount, badCount, goodRatio} = getDiaryAnalysis;

  return (
    <div className="App">
        <DiaryEditor onCreate={onCreate}/>
        <div>전체 일기 : {data.length}</div>
        <div>기분 좋은 일기 개수 : {goodCount}</div>
        <div>기분 나쁜 일기 개수 : {badCount}</div>
        <div>기분 좋은 일기 비율 : {goodRatio}</div>
        <DiaryList  onRemove={onRemove} diaryList={data} onEdit={onEdit}/>
    </div>
  );
}

export default App;
