'use client';
import { useEffect, useState } from 'react';
import { useUserStore } from '@/store/store';
import PartnerItem from './PartnerItem';
import NoData from '../NoData/NoData';
import { deletePartner, partnersListData } from '@/services/transferData';
import { IPartnerData } from '@/types/formDataTypes';
import Modal from '../Modal/Modal';
import ModalCard, { ModalBtn } from '../ModalCard/ModalCard';

const PartnersList = () => {
  const setPartners = useUserStore(state => state.setPartners);
  const [allPartners, setAllPartners] = useState<IPartnerData[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [modalVariant, setModalVariant] = useState<'delete' | 'success'>('delete');
  const [deletingId, setDeletingId] = useState<string>('');
  const [isDeleted, setIsDeleted] = useState<boolean>(false);
  
  useEffect(() => {
    const getPartnersList = async () => await partnersListData();
    getPartnersList().then(res => {
      if (res) {
        console.log('- getPartnersList -> ', res);
        setAllPartners(res);
        setPartners(res);
      }
    });
  }, [setPartners, isDeleted]);

  if (!allPartners || allPartners.length === 0) {
    return <NoData message="Немає інформації" />;
  }

  const deleteHandler = async (id: string) => {
    setDeletingId(id);
    setModalVariant('delete');
    setIsOpen(true);
  };

  const handleDelete = async () => {
    try {
        const result = await deletePartner(deletingId);
        console.log(' - result1 -> ', result, ' deletingId- ', deletingId);
        if (result === 204) {     
          setModalVariant('success');
          setIsDeleted(true);
        }      
    } catch (error) {
      console.error(error);
    }
  };

  const modalButtons: ModalBtn[] = [
    { label: 'Так', style: 'primary', onClick: handleDelete },
    { label: 'Ні', style: 'secondary', onClick: () => setIsOpen(false) },
  ];

  return (
    <div className="pt-[140px] w-[90%] mx-auto">
      <div className="grid grid-cols-2 gap-2 shadow-accent rounded-2xl p-6 bg-white">
        {allPartners.map(item => (
          <PartnerItem key={item._id} partner={item} deleteHandler={deleteHandler} />
        ))}
      </div>

      <Modal show={isOpen} onClose={() => setIsOpen(false)}>
        <ModalCard
          title={
            modalVariant === 'delete'
              ? `Ви дійсно бажаєте видалити партнера?`
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

export default PartnersList;
