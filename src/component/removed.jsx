import { useContext } from "react"
import { FullData } from "../App"
import RestoreFromTrashOutlinedIcon from '@mui/icons-material/RestoreFromTrashOutlined';
export const Removed = () => {
    const [data, setData] = useContext(FullData)

    return (
        <>
            <div className="done">
                {data.map((item) => {
                    return (
                        <>
                            {item.removed &&
                                <div>
                                    {item.todo}
                                    <div>
                                    {item.time && <p>Đã xóa lúc: {item.time} | {item.date}</p>}
                                    <RestoreFromTrashOutlinedIcon />
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