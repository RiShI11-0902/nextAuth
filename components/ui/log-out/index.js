"use client"

import { logOutAction } from "@/app/actions";
import { Button } from "../button";

function Logout(){

    const handleLogout = async ()=>{
        await logOutAction()
    }

    return <>
        <Button onClick={handleLogout}>Log out</Button>
    </>
}

export default Logout