import { LogOut } from "lucide-react";
import { getUser } from "../actions"
import Logout from "@/components/ui/log-out";
import { redirect } from "next/navigation";

 async function profile(){

    const user = await getUser()
    console.log(user);

    if (!user?.success) {
        redirect('/sign-in')
    }

    return <>
        <div className="p-10 font-bold">
            Welcome to your Profile
            <p>
                {user?.data?.userName}
            </p>
            {/* <LogOut< */}
            <Logout />
        </div>
    </>
}
export default profile