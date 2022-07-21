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
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';



import { SetDate, SetTime } from './set-time';
import { useContext, useState, useEffect } from "react"
import { FullData } from "../App"
import { toBeEnabled } from '@testing-library/jest-dom/dist/matchers';
export const AddTodo = () => {
    const LightTooltip = styled(({ className, ...props }) => (
        <Tooltip {...props} classes={{ popper: className }} />
    ))(({ theme }) => ({
        [`& .${tooltipClasses.tooltip}`]: {
            backgroundColor: theme.palette.common.white,
            color: 'rgba(0, 0, 0, 0.87)',
            boxShadow: theme.shadows[1],
            fontSize: 11,
        },
    }));


    const date = SetDate()
    const time = SetTime()
    const { data, setData, count, setCount } = useContext(FullData)
    const [show, setShow] = useState(true)
    const [input, setInput] = useState("")

    function handleChange(e) {
        setInput(e.target.value)

    }

    const Handle = () => {
        if (input != "") {
            const beforeData = {
                id: Math.floor(Math.random() * 10000) + 1,
                todo: input,
                completed: false,
                isEdit: false,
                del: false,
                date: date,
                time: time,
                disabled: true
            }
            setData([...data, beforeData])
        }

        setInput('')
        showAdd()

    }


    const showAdd = () => {
        setShow(!show)
    }


    const handleCompleted = (id) => {
        const updateChecked = data.map((item) => {
            // let count = 0
            if (item.id === id) {
                item.completed = !item.completed
                item.date = date
                item.time = time
                setCount(count + 1)

            }
            return item

        }
        )
        console.log(count);
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

    const handelTarget = (id) => {
        const targetItem = data.filter((item) => {
            if (item.id === id) {
                item.target = !item.target
            } else item.target = false
            return item
        })
        setData(targetItem)
    }


    const [inputEdit, setInputEdit] = useState()
    const handleKeyDown = (event, id) => {
        if (event.key === 'Enter' && inputEdit) {
            const onClickEdit = data.map((item) => {

                if (item.id === id) {
                    // item.isEdit = false
                    item.todo = inputEdit
                    item.disabled = !item.disabled
                    item.target = !item.target
                    // item.isEdit = true
                    setInput("")
                }

                return item
            })
            setData(onClickEdit)

        }


    }
    const isEdit = (id) => {
        const editItem = data.filter((item) => {
            if (item.id === id) {
                item.disabled = !item.disabled
                item.target = !item.target

            } else {
                item.disabled = true
                item.target = false
            }

            return item

        })
        setData(editItem)


    }
    // const showEdit=(id)=>{
    //     const showEdit = data.filter((item)=>{
    //         if (item.id === id){
    //             item.hover = true
    //         } else item.hover = false
    //         return item
    //     })
    //     setData(showEdit)
    // }
    return (
        <div className='add-todo-container'>
            <div className='with-100'>
                <div className='add-todo-input' >
                    {show ? <div onClick={showAdd} className='input-title' >

                        <ControlPointIcon
                            color="primary"
                            className="hover-svg"
                        />

                        <p>Thêm việc cần làm</p>
                    </div> :
                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                            <TextField id="input-with-sx"
                                label="Thêm"
                                variant="standard"
                                onChange={handleChange}
                                className="with-60" />
                            <LightTooltip title="Thêm">
                                <PlaylistAddIcon
                                    sx={{ color: 'action.active', mr: 1, my: 0.5 }}
                                    onClick={Handle} className='hover-blue hover-svg' />
                            </LightTooltip>
                        </Box>}
                </div>
            </div>
            <div >
                {data.map((item) => {
                    return (
                        <>
                            <div >
                                {(!item.completed && !item.removed) &&
                                    <div key={item.id}
                                        className={!item.target ? 'add-todo-item' : 'add-todo-item box-shadow'}
                                    onClick={() => handelTarget(item.id)}
                                    // onMouseOver={()=> showEdit(item.id)}
                                    // onDoubleClick={() => isEdit(item.id)}
                                    >

                                        <div className='left-task'>
                                            <LightTooltip title="Hoàn thành">
                                                <Radio
                                                    onChange={() => handleCompleted(item.id)}
                                                />
                                            </LightTooltip>
                                            {/* <h3>{item.todo}</h3> */}
                                            <input
                                                type='text'
                                                defaultValue={item.todo}
                                                onKeyDown={(event) => handleKeyDown(event, item.id)}
                                                onChange={(event) => setInputEdit(event.target.value)}
                                                disabled={item.disabled}
                                                className="input-edit"
                                            />
                                        </div>
                                        <div className='right-task'>
                                            <div className='date-time'>
                                                <p>Khởi tạo lúc: </p>
                                                <p>{item.time} | {item.date}</p>

                                            </div>
                                           
                                            <LightTooltip title="Chỉnh sửa">
                                                <DriveFileRenameOutlineIcon className="hover-svg" onClick={() => isEdit(item.id)} />
                                            </LightTooltip>
                                            <LightTooltip title="Xóa">
                                                <HighlightOffIcon
                                                    style={{ color: '#c62828' }}
                                                    onClick={() => deleteItem(item.id)}
                                                    className="hover-svg"
                                                />
                                            </LightTooltip>
                             </div>
                                    </div>
                                }
                            </div>
                        </>
                    )
                }
                )}
            </div>
            <div className="note"><p>* Nhấp đôi để chỉnh sửa | Enter để xác nhận</p></div>
        </div>
    )
}