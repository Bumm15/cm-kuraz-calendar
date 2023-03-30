import { Button } from "react-bootstrap";
import { AdminPanel } from "../components/admin/AdminPanel";
import { UserPanel } from "../components/UserPanel";
import { useAuth } from "../contexts/authContext";
import { Calender } from "./Calender";

export function Home() {
    const { logOut, user } = useAuth()

    const admins = process.env.REACT_APP_ADMINS

    if (admins.indexOf(user) !== -1) {
        return (
        <>
        <AdminPanel />
        </>
        )
    } else {
        return (
            <>
            <UserPanel />
            </>
        )
    }


}