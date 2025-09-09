'use client';
import { useEffect, useState } from 'react';
import { deleteUser, usersList } from '@/services/auth';
import { IAllUsersData } from '@/types/formDataTypes';
import NoData from '../NoData/NoData';
import UserItem from './UserItem';
import { useUserStore } from '@/store/store';
import Modal from '../Modal/Modal';
import ModalCard, { ModalBtn } from '../ModalCard/ModalCard';
// import { INTERNAL_LINKS } from '@/constants/constants';
// import { updateServer } from '@/services/actions';

const UsersList = () => {
  const setUsers = useUserStore(state => state.setUsers);
  const [allUsers, setAllUsers] = useState<IAllUsersData[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [modalVariant, setModalVariant] = useState<'delete' | 'success'>('delete');
  const [deletingId, setDeletingId] = useState<string>('');
  const [isDeleted, setIsDeleted] = useState<boolean>(false);

  useEffect(() => {
    const getUsersList = async () => await usersList();
    getUsersList().then(res => {
      if (res) {
        setAllUsers(res);
        setUsers(res);
        setIsDeleted(false);
      }
    });
  }, [setUsers, isDeleted]);
  // --------------
  const deleteHandler = async (id: string) => {
    setDeletingId(id);
    setModalVariant('delete');
    setIsOpen(true);
  };

  const handleDelete = async () => {
    try {
        const result = await deleteUser(deletingId);
        console.log(' - result1 -> ', result);
        if (result === 204) {     
          setModalVariant('success');
          setIsDeleted(true);
        }      
    } catch (error) {
      console.error(error);
    }
    // setTimeout(() => {
    //   updateServer(`/${INTERNAL_LINKS.ADMIN}`);
    // }, 2000);
  };

    const modalButtons: ModalBtn[] = [
      { label: 'Так', style: 'primary', onClick: handleDelete },
      { label: 'Ні', style: 'secondary', onClick: () => setIsOpen(false) },
    ];
  // ----------/-----
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
                <UserItem key={user._id} user={user} deleteHandler={deleteHandler} />
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <NoData message="Немає інформації" />
      )}
{/* -------------------- */}
      <Modal show={isOpen} onClose={() => setIsOpen(false)}>
        <ModalCard
          title={
            modalVariant === 'delete'
              ? `Ви дійсно бажаєте видалити користувача?`
              : 'Успішно видалено'
          }
          variant={modalVariant}
          onClose={() => setIsOpen(false)} 
          buttons={modalVariant === 'delete' ? modalButtons : undefined}
        />
      </Modal>

    </div>
  );
};

export default UsersList;
