import { useContext } from "react"
import { FullData } from "../App"
import RestoreFromTrashOutlinedIcon from '@mui/icons-material/RestoreFromTrashOutlined';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';


export const Removed = () => {

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
    

    const {data, setData} = useContext(FullData)
    const unRemoved=(id)=>{
        const undo = data.map((item) => {
            if (item.id === id) {
                item.removed = !item.removed

            }
            return item

        }
        )

        setData(undo)
    }
    return (
        <>
            <div className="removed-container">
                {data.map((item) => {
                    return (
                        <>
                            {item.removed &&
                                <div key={item.id} className='removed-item'>
                                    <h3>{item.todo}</h3>
                                    <div className="right-removed">
                                        <div>
                                            <p>Đã xóa lúc:</p><p> {item.time} | {item.date}</p>
                                        </div>
                                        <LightTooltip title="Hoàn tác">
                                        <RestoreFromTrashOutlinedIcon className="hover-svg color-sz hover-blue" 
                                        style={{fontSize: "40px"}}
                                        onClick={()=>unRemoved(item.id)}
                                        />
                                        </LightTooltip>
                                    </div>
                                </div>
                            }

                        </>
                    )
                })}
            </div>
        </>
    )
}