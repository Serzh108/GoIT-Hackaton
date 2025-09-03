'use client';
import { useEffect, useState } from "react";
import { usersList } from "@/services/auth";
import { IAllUsersData } from "@/types/formDataTypes";
import Edit from '@/icons/edit.svg';
import Delete from '@/icons/delete.svg';

const UsersList = () => {
  const [allUsers, setAllUsers] = useState<IAllUsersData[]>([]);
    
  useEffect(() => {
    const getUsersList = async () => await usersList();
    getUsersList().then(res => res && setAllUsers(res));
  }, []);

  const editHandler = (id: string) => {
   console.log(' edit: ', id); 
  };

  const deleteHandler = (id: string) => {
   console.log(' delete: ', id); 
  };
  
  return(
    <>
      {allUsers && allUsers.length > 0 ? allUsers.map(item => (
        <div key={item._id} className="flex justify-start items-center gap-8 w-[80%] mb-4 border rounded-md border-red-50">
          <ul className="p-2 w-[70%] border rounded-md">
              <li><span>name: </span>{item.name}</li>
              <li><span>email: </span>{item.email}</li>
              <li><span>role: </span>{item.role}</li>
              <li><span>id: </span>{item._id}</li> 
          </ul>
          <div className="flex justify-between items-center gap-8">
            <Edit class="w-8 h-8 stroke-white cursor-pointer" onClick={() => editHandler(item._id)} />
            <Delete className="w-8 h-8 stroke-white cursor-pointer" onClick={() => deleteHandler(item._id)} />
          </div>
        </div>
      )) : <p>No info</p>}

    </>
  );
};

export default UsersList;