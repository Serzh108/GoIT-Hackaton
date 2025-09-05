'use client';
import { useEffect, useState } from "react";
import { usersList } from "@/services/auth";
import { IAllUsersData } from "@/types/formDataTypes";
import NoData from "../NoData/NoData";
import UserItem from "./UserItem";
import { useUserStore } from "@/store/store";

const UsersList = () => {
  const setUsers = useUserStore(state => state.setUsers);
  const [allUsers, setAllUsers] = useState<IAllUsersData[]>([]);
    
  useEffect(() => {
    const getUsersList = async () => await usersList();
    getUsersList().then(res => {
      if(res) {setAllUsers(res); setUsers(res);}
    });
  }, []);
  
  return(
    <div className="p-12 pt-20 ml-[20px]">
      {allUsers && allUsers.length > 0 ? allUsers.map(item => 
        <UserItem user={item} key={item._id} />)
      : <NoData message={'Немає інформації'}/>
      }
    </div>
  );
};

export default UsersList;