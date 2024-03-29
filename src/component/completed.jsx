import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';

import { useContext, useEffect, useState } from "react"
import { FullData } from "../App"
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';

export const Done = () => {

    const { data, setData, count } = useContext(FullData)
    const [filteredData, setFilteredData] = useState([]);
    const [wordEntered, setWordEntered] = useState("");





    const handleFilter = (event) => {
        const searchWord = event.target.value;
        setWordEntered(searchWord);
        const newFilter = data.filter((value) => {
            return value.todo.toLowerCase().includes(searchWord.toLowerCase());
        });

        if (searchWord === "") {
            setFilteredData([]);
        } else {
            setFilteredData(newFilter);
        }
    };

    const clearInput = () => {
        setFilteredData([]);
        setWordEntered("");
    };
    console.log(count);
    return (
        <>
            <div className="completed-container ">
                <div className='search-done-div'>
                    <div className="search-done " >
                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                            <TextField
                                id="input-with-sx"
                                label="Tìm kiếm"
                                variant="standard"
                                value={wordEntered}
                                onChange={handleFilter}
                                className="with-60"
                            />
                            <SearchIcon
                                sx={{ color: 'action.active', mr: 1, my: 0.5 }}
                                onClick={clearInput}
                                className='hover-blue hover-svg'
                            />
                        </Box>
                    </div>
                </div>
                {count != 0 ?
                    <div>{filteredData.length != 0 ?
                        <div className="done">
                            {filteredData.map((item) => {
                                return (
                                    <>
                                        {item.completed &&
                                            <div key={item.id} className="completed-item">

                                                <div className='left-done'>
                                                    <CheckCircleOutlinedIcon />
                                                    <h3>{item.todo}</h3>
                                                </div>
                                                <div className='right-done'>
                                                    <p>Đã hoàn thành lúc</p> <p>{item.time} | {item.date}</p>
                                                </div>


                                            </div>
                                        }

                                    </>
                                )
                            })}
                        </div> :
                        <>
                            {data.map((item) => {
                                return (
                                    <>
                                        {item.completed &&
                                            <div key={item.id} className="completed-item">
                                                <div className='left-done'>
                                                    <CheckCircleOutlinedIcon />
                                                    <h3>{item.todo.toUpperCase()}</h3>
                                                </div>
                                                <div className='right-done'>
                                                    <p>Đã hoàn thành lúc</p> <p>{item.time} | {item.date}</p>
                                                </div>

                                            </div>
                                        }

                                    </>
                                )
                            })}
                        </>

                    }</div> : 
                    <div>
                        <h3>Đã làm xong gì đâu mà check</h3>
                        <h3>Nhấc mông lên mà làm đê</h3>

                    </div>
                }
            </div>
        </>
    )
}