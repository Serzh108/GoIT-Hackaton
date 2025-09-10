'use client';
import { FC } from 'react';
import Link from 'next/link';
import { IAllUsersData } from '@/types/formDataTypes';
import Edit from '@/icons/edit.svg';
import Delete from '@/icons/delete.svg';
import { INTERNAL_LINKS } from '@/constants/constants';
import { Button } from '@headlessui/react';

type Props = {
  user: IAllUsersData;
  deleteHandler: (id: string) => void;
};

const UserItem: FC<Props> = ({ user, deleteHandler }) => {

  return (
    <tr>
      <td className="px-6 py-5">{user.name}</td>
      <td className="px-6 py-5">{user.email}</td>
      <td className="px-6 py-5">{user.role}</td>
      <td className="px-6 py-5 flex justify-center gap-4">
        <Link
          href={`${INTERNAL_LINKS.ADMIN}/${user._id}/${INTERNAL_LINKS.EDITING}`}
          className="flex justify-center items-center group hover:bg-gray-300 bg-gray-100 w-16 h-14 rounded-2xl py-2 px-4"
        >
          <Edit
            className="w-8 h-8 cursor-pointer group-hover:text-gray-900"
          />
        </Link>
        <Button
          type="button"
          className="flex justify-center items-center group hover:bg-gray-300 bg-gray-100 w-16 h-14 rounded-2xl py-2 px-4"
        >
          <Delete
            className="w-8 h-8 cursor-pointer  group-hover:text-gray-900"
            onClick={() => deleteHandler(user._id)}
          />
        </Button>
      </td>
    </tr>
  );
};

export default UserItem;
