import ApiClient from "@/api";
import { useEffect, useState } from "react";
import Navbar from "@/components/Dashboard/navbar";
const Users = () => {
    const token = sessionStorage.getItem('token');
    const [users, setUsers] = useState<any>(undefined);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if (token != null){
            ApiClient.users.listUsers(token).then((response) => {
                setUsers(response);
                setLoading(false);
            })
        }
      }, []);
    return ( 
        <div className="w-screen h-screen">
            <Navbar page={2}/>
            <div className="mt-[5.23vh] ml-[8.125vw] mr-[8.854166vw]">
                <h1 className="text-primary text-6xl font-bold font-sans">Users</h1>
            </div>
            <div className="mx-auto mt-[52px] w-[83vw] flex gap-x-[19px] gap-y-[20px] flex-wrap">
                <table className="w-full text-left">
                <thead className="text-white text-xl font-bold bg-primary h-[47px] rounded-md">
                    <tr>
                    <th className="pl-[26px] rounded-l-lg">First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Account Type</th>
                    <th className="pr-[26px] rounded-r-lg">Date Added</th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? (<tr><td> Loading ... </td></tr>) :
                        users.map((user: any, index: number) => (
                            <tr key={index} className={(index % 2) == 0 ? "h-[80px] bg-white text-xl text-primary font-medium" : "h-[80px] bg-zinc-100 text-xl text-primary font-medium"}>
                                <td className="pl-[26px]">{user.first_name}</td>
                                <td>{user.last_name}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td className="pr-[26px]">DD-MM-YY</td>
                            </tr>
                        ))
                    }
                </tbody>
                </table>
            </div>
        </div>
    );
}
 
export default Users;