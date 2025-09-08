'use client';
import { useEffect, useState } from 'react';
import { usersList } from '@/services/auth';
import { IAllUsersData } from '@/types/formDataTypes';
import NoData from '../NoData/NoData';
import UserItem from './UserItem';
import { useUserStore } from '@/store/store';

const UsersList = () => {
  const setUsers = useUserStore(state => state.setUsers);
  const [allUsers, setAllUsers] = useState<IAllUsersData[]>([]);

  useEffect(() => {
    const getUsersList = async () => await usersList();
    getUsersList().then(res => {
      if (res) {
        setAllUsers(res);
        setUsers(res);
      }
    });
  }, [setUsers]);

  return (
    <div className='flex flex-col pt-[140px]'>
      {allUsers && allUsers.length > 0 ? (
        <div className="overflow-x-auto shadow-accent w-[90%] rounded-lg">
          <table className="min-w-full bg-white  ">
            <thead className="border-b border-b-gray-300">
              <tr>
                <th className="px-6 py-5 text-left">Імʼя</th>
                <th className="px-6 py-5 text-left">Email</th>
                <th className="px-6 py-5 text-left">Роль</th>
              </tr>
            </thead>
            <tbody>
              {allUsers.map(user => (
                <UserItem key={user._id} user={user} />
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <NoData message="Немає інформації" />
      )}
    </div>
  );
};

export default UsersList;
