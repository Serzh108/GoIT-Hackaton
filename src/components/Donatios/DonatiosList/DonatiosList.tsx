'use client';
import { useEffect, useState } from 'react';
import DonationCard from '@/components/Donatios/DonationCard/DonationCard';
import NoData from '@/components/NoData/NoData';
import { deleteDonation, donationsList } from '@/services/transferData';
import { ICollection } from '@/types/formDataTypes';
import { useUserStore } from '@/store/store';
import Modal from '@/components/Modal/Modal';
import ModalCard, { ModalBtn } from '@/components/ModalCard/ModalCard';

interface IDonationCard {
  path: string;
  alt: string;
  title: string;
  desc: string;
  _id: string;
}

const DonationsList = () => {
  const locale = useUserStore(state => state.locale);
  const [allDonations, setAllDonations] = useState<ICollection[]>([]);
  const [cardData, setCardData] = useState<IDonationCard[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [modalVariant, setModalVariant] = useState<'delete' | 'success'>('delete');
  const [deletingId, setDeletingId] = useState<string>('');
  const [isDeleted, setIsDeleted] = useState<boolean>(false);

  useEffect(() => {
    const getDonationsList = async () => await donationsList(locale);
    getDonationsList().then(res => {
      console.log(' - res --> ', res);
      console.log(' - res.data --> ', res.data);
      console.log(
        ' - res.data.activeCollections --> ',
        res.data.activeCollections
      );
      if (res) {
        setAllDonations(res.data.activeCollections);
      }
    });
  }, [locale, isDeleted]);

  useEffect(() => {
    let cardData: IDonationCard[] = [];
    cardData =
      allDonations &&
      allDonations.map(item => ({
        _id: item._id || '',
        path: item.image[0].path,
        alt: item.alt || '',
        title: item.title || '',
        desc: item.desc || '',
      }));
    setCardData(cardData);
  }, [allDonations]);
  console.log(' - cardData --> ', cardData);

  
  const deleteHandler = async (id: string) => {
    setDeletingId(id);
    setModalVariant('delete');
    setIsOpen(true);
  };

  const handleDelete = async () => {
    try {
        const result = await deleteDonation(deletingId);
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
    <>
      {cardData && cardData.length > 0 ? (
        <div className="mx-8 mt-33 w-[984px]">
          <ul className="grid grid-cols-3 gap-6  p-2.5 bg-white shadow-accent rounded-2xl ">
            {cardData.map(item => (
              <li key={item._id}>
                <DonationCard donation={item} key={item._id} deleteHandler={deleteHandler} />
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <NoData message={'Немає інформації'} />
      )}

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
    </>
  );
};

export default DonationsList;
