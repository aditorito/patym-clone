import { useEffect, useState } from "react"
import { Button } from "./Button"
import axios from "axios";
import { useNavigate } from "react-router-dom"
import { toAtom } from "../store/atoms/count"
import { useRecoilState } from "recoil"

export const Users = () => {
    const [users, setusers] = useState([]);
    
    useEffect( () => {
        const response =  axios.get("http://localhost:3000/api/v1/user/bulk", {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        }).then(response => {
            setusers(response.data.user)
            

        })
    }, []);

    return <>
        <div className="font-bold mt-6 text-lg">
            Users
        </div>
        <div className="my-2">
            <input type="text" placeholder="Search users..." className="w-full px-2 py-1 border rounded border-slate-200"></input>
        </div>
        <div>
            {users.map(user => <User user={user} />)}
        </div>
    </>
}

function User({ user }) {
    const [to,setto] = useRecoilState(toAtom);
    const navigate = useNavigate();
    return <div className="flex justify-between" id={user._id}>
        <div className="flex">
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    {user.firstName[0]}
                </div>
            </div>
            <div className="flex flex-col justify-center h-ful">
                <div>
                    {user.firstName} {user.lastName}
                </div>
            </div>
        </div>

        <div className="flex flex-col justify-center h-ful">
            <Button label={"Send Money"} onClick={(e)=>{
                const _id = user._id
                setto(_id);
                
                navigate('/send')

            }} />
        </div>
    </div>
}