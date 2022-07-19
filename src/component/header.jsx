import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useState } from 'react';
import { Outlet, Link, navigate, useNavigate } from 'react-router-dom'


export const Header = () => {
    const navigate = useNavigate();
    const newDate = new Date()
    const date = newDate.getDate()
    const month = newDate.getMonth()
    const [show, setShow] = useState(false)
    const showDropDown = () =>{
        setShow(!show)
    }
    return (
        <>
            <div className="header">
                <div className="left-header">
                    <div className="calender">
                        <p className='month'>Tháng {month}</p>
                        <p className='date'>{date}</p>
                    </div>
                    <h1>TODAY</h1>
                </div>
                <div className="right-header">
                    <div className={!show?'trip-dots': 'trip-dots shadow'}>
                        <MoreHorizIcon onClick={showDropDown}/>
                    </div>
                    {show && <div className='dropdown'>
                        <a onClick={() => navigate('/todo')}>In Progress</a>
                        <hr ></hr>
                        <a onClick={() => navigate('/completed')}>Completed</a>
                        <hr ></hr>
                        <a onClick={() => navigate('/removed')}>Removed</a>
                    </div>}
                </div>
            </div>
                <hr style={{width: '50vw'}}></hr>
            <Outlet/>
        </>
    )
}