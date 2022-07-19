import * as React from 'react';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import Radio from '@mui/material/Radio';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { SetDate, SetTime } from './set-time';
import { useContext, useState, useEffect } from "react"
import { FullData } from "../App"
export const AddTodo = () => {

    // useEffect(()=>{
    //     function changeData(){
    //         const fake = data.map((item)=>{ 
    //           item.time = time;
    //           item.date = date;
    //           item.removed = false
    //           return item
    //         })
    //         setData(fake)
    //       }
    //     changeData()
    // },[])

    const date = SetDate()
    const time = SetTime()
    const [data, setData] = useContext(FullData)
    const [show, setShow] = useState(true)
    const [input, setInput] = useState()

    function handleChange(e) {
        setInput(e.target.value)

    }

    const Handle = () => {
        if (input !== "") {
            const beforeData = {
                id: Math.floor(Math.random() * 10000) + 1,
                todo: input,
                completed: false,
                isEdit: false,
                del: false,
                date: date,
                time: time
            }
            setData([...data, beforeData])
        } else 
        // console.log(data);
        // setInput('')
        showAdd()
        // console.log(show);
    }


    const showAdd = () => {
        setShow(!show)
    }

    const handleCompleted = (id) => {
        const updateChecked = data.map((item) => {
            if (item.id === id) {
                item.completed = !item.completed
                item.date = date
                item.time = time
            }
            return item

        }
        )

        setData(updateChecked)
        // console.log(data);
    }
    const deleteItem = (id) => {
        const deleteData = data.filter((item) => {
            if (item.id === id) {
                item.removed = !item.removed
                item.date = date
                item.time = time
            }
            return item
        })


        setData(deleteData)
        console.log(data);
    }

    return (
        <div className='add-todo-container'>
            <div className='add-todo-input' >
                {show ? <div onClick={showAdd} className='input-title' >
                    <ControlPointIcon color="primary" />
                    <p>Thêm việc cần làm</p>
                </div> :
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                        <TextField id="input-with-sx" label="With sx" variant="standard" onChange={handleChange} className="with-60" />
                        <PlaylistAddIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} onClick={Handle} />
                    </Box>}
            </div>
            {data.map((item) => {
                return (
                    <>
                        <div >
                        {(!item.completed && !item.removed) &&
                            <div key={item.id} className='add-todo-item'>
                                <div className='left-task'>
                                    <Radio
                                        onChange={() => handleCompleted(item.id)}
                                    />
                                    <h3>{item.todo}</h3>
                                </div>
                                <div className='right-task'>
                                    <div className='date-time'>
                                        <p>Khởi tạo lúc: {item.time}</p>
                                        <p>{item.date}</p>
                                    </div>
                                    <HighlightOffIcon
                                        style={{ color: '#c62828' }}
                                        onClick={() => deleteItem(item.id)}
                                    />
                                </div>
                            </div>
                        }
                        </div>
                    </>
                )
            }
            )}
        </div>
    )
}