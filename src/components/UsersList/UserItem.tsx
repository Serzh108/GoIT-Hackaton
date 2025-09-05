'use client';
import { FC } from 'react';
import { IAllUsersData } from '@/types/formDataTypes';
import Edit from '@/icons/edit.svg';
import Delete from '@/icons/delete.svg';
import { deleteUser } from '@/services/auth';
import { INTERNAL_LINKS } from '@/constants/constants';
import { updateServer } from '@/services/actions';
import Link from 'next/link';

type Props = {
    user: IAllUsersData;
};

const UserItem: FC<Props> = ({user}) => {

  const editHandler = async (id: string) => {
   console.log(' edit: ', id); 
  };

  const deleteHandler = async (id: string) => {
    // !!! Insert Model with delede confirmation
   console.log(' delete: ', id); 
    const result = await deleteUser(id);
    console.log(' - result1 -> ', result); 
    // if (result === 204) {
    //   setShowNotification(true);
    // }
    setTimeout(() => {
      updateServer(`/${INTERNAL_LINKS.ADMIN}`);
    }, 2000);       
  };

  return( 
    <li className="flex gap-8 w-[80%] mb-4 p-2 border rounded-md">
        <div className="flex items-center gap-8 w-[60%]">
          <div>{user.name}</div>
          <div>{user.email}</div>
          <div>{user.role}</div>
        </div>
        <div className="flex justify-between items-center gap-8">
          <Link href={`${INTERNAL_LINKS.ADMIN}/${user._id}/${INTERNAL_LINKS.EDITING}`}
          className="group">
          <Edit className="w-8 h-8 stroke-white cursor-pointer" onClick={() => editHandler(user._id)} />
          </Link>
          <Delete className="w-8 h-8 stroke-white cursor-pointer" onClick={() => deleteHandler(user._id)} />
        </div>
    </li>
  )
};

export default UserItem;