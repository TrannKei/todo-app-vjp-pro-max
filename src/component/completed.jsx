import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';

import { useContext, useState } from "react"
import { FullData } from "../App"
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
export const Done = () => {
    const [data, setData] = useContext(FullData)
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

    return (
        <>
            <div className="search-done">
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <TextField
                        id="input-with-sx"
                        label="Tìm kiếm"
                        variant="standard"
                        value={wordEntered}
                        onChange={handleFilter}
                    />
                    <SearchIcon
                        sx={{ color: 'action.active', mr: 1, my: 0.5 }}
                        onClick={clearInput}
                    />
                </Box>
            </div>
            {filteredData.length != 0 ? <div className="done">
                {filteredData.map((item) => {
                    return (
                        <>
                            {item.completed &&
                                <div>
                                    <div>
                                    <CheckCircleOutlinedIcon />
                                    {item.todo}
                                    </div>
                                    {item.time && <p>Đã hoàn thành lúc: {item.time} | {item.date}</p>}
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
                                    <div>
                                        <CheckCircleOutlinedIcon />
                                        {item.todo}
                                        {item.time ? <p>Đã hoàn thành lúc: {item.time} | {item.date}</p> : 
                                        <p>Chơi mà đưa data hoàn thành sẵn thì lấy đâu ra mốc thời gian</p>}
                                    </div>
                                }

                            </>
                        )
                    })}
                </>
            }
        </>
    )
}