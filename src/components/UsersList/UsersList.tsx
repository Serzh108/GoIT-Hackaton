'use client';
import { useEffect, useState } from "react";
import { usersList } from "@/services/auth";
import { IAllUsersData } from "@/types/formDataTypes";

const UsersList = () => {
    const [allUsers, setAllUsers] = useState<IAllUsersData[]>([]);
    
  useEffect(() => {
    const getUsersList = async () => await usersList();
    getUsersList().then(res => res && setAllUsers(res));
  }, []);
  
  return(
      <>
      {allUsers && allUsers.length > 0 ? allUsers.map(item => (
        <ul key={item._id} className="mb-4 p-2 w-[80%] border rounded-md">
            <li><span>name: </span>{item.name}</li>
            <li><span>email: </span>{item.email}</li>
            <li><span>role: </span>{item.role}</li>
            <li><span>id: </span>{item._id}</li>
        </ul>
      )) : <p>No info</p>}

      </>
  );
};

export default UsersList;