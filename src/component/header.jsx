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
    const hideDropDown =()=>{
        setShow(false)
        console.log(show);
    }
   
    return (
        <>
            <div className="header">
                <div className="left-header">
                    <div className="calender">
                        <p className='month'>Tháng {month}</p>
                        <p className='date'>{date}</p>
                    </div>
                    <h1>VIỆC HÔM NAY CHỚ ĐỂ NGÀY MAI</h1>
                </div>
                <div className="right-header" onBlur={hideDropDown} tabIndex='1'>
                    <div  
                    className={!show?'trip-dots': 'trip-dots shadow'}>
                       
                        <MoreHorizIcon 
                        
                        onClick={showDropDown} 
                       />
                      
                    </div>
                    {show && <div className='dropdown' onClick={showDropDown}>
                        
                        <a onClick={() => navigate('/todo')}>Đang làm</a> 
                        
                        <hr ></hr>
                        <a onClick={() => navigate('/completed')}>Đã hoàn thành</a>
                        <hr ></hr>
                        <a onClick={() => navigate('/removed')}>Đã xóa</a>
                    </div>}
                </div>
            </div>
                <hr style={{width: '50vw'}}></hr>
            <Outlet/>
        </>
    )
}