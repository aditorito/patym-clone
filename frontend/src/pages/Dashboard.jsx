import { Appbar } from "../components/Appbar"
import { Balance } from "../components/Balance"
import { Users } from "../components/Users"
import { balanceAtom, usernameAtom } from "../store/atoms/count"
import { useRecoilState, useRecoilValue } from "recoil"
import { useEffect } from "react"
import axios from "axios"

export const Dashboard = () => {
    const [balance , setbalance ] = useRecoilState(balanceAtom);
    const username = useRecoilValue(usernameAtom)
    useEffect( () => {
        const response =  axios.get("http://localhost:3000/api/v1/account/balance", {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        }).then(response => {
            setbalance(response.data.balance)           
            

        })
    }, []);
    
    return <div>
        <Appbar />
        <div className="m-8">
            <h1>{username}</h1>
            <Balance value={balance}/>
            <Users/>
        </div>
    </div>
}