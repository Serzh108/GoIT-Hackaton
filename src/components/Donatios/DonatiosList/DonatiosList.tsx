'use client';
import { useEffect, useState } from 'react';
import DonationCard from '@/components/Donatios/DonationCard/DonationCard';
import NoData from '@/components/NoData/NoData';
import { donationsList } from '@/services/transferData';
import { ICollection } from '@/types/formDataTypes';
import { useUserStore } from '@/store/store';

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
  }, [locale]);
  //   --- - ---
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
  // --- / - ---
  return (
    <>
      {cardData && cardData.length > 0 ? (
        <div className="mx-8 mt-33 w-[984px]">
          <ul className="grid grid-cols-3 gap-6  p-2.5 bg-white shadow-accent rounded-lg ">
            {cardData.map(item => (
              <li key={item._id}>
                <DonationCard donation={item} key={item._id} />
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <NoData message={'Немає інформації'} />
      )}
    </>
  );
};

export default DonationsList;
