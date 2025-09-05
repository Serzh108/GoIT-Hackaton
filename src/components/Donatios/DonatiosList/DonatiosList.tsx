'use client';

import DonationCard from "@/components/Donatios/DonationCard/DonationCard";
import NoData from "@/components/NoData/NoData";
import { donationsList } from "@/services/transferData";
import { ICollection } from "@/types/formDataTypes";
import { useEffect, useState } from "react";

interface IDonationCard  {
  path: string;
  alt: string;
  title: string;
  desc: string;
  _id: string;
};

const DonationsList = () => {
//   const setUsers = useUserStore(state => state.setUsers);
  const [allDonations, setAllDonations] = useState<ICollection[]>([]);
  const [cardData, setCardData] = useState<IDonationCard[]>([]);

  useEffect(() => {
    const getDonationsList = async () => await donationsList();
    getDonationsList().then(res => {
        console.log(' - res --> ', res);
        console.log(' - res.data --> ', res.data);
        console.log(' - res.data.activeCollections --> ', res.data.activeCollections);
      if(res) { setAllDonations(res.data.activeCollections); };
    });
  }, []);
//   --- - ---
  useEffect(() => {
    let cardData: IDonationCard[] = [];
      cardData  = allDonations && allDonations.map(item => ({
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

// const testDonation = {
//     path: 'jae3whc5gdsnmosftgqs.jpg',
//     alt: 'collection photo',
//     desc: 'Our soldiers are in the harshest conditions, risking their lives daily to protect us.',
//     title: 'Support for Frontline Soldiers',
//     _id: '333',
// }
  
  return(
    <div className="p-12 pt-20 ml-[20px]">      
      {cardData && cardData.length > 0 ? cardData.map(item => <DonationCard donation={item} key={item._id} />) : <NoData message={'Немає інформації'}/>}
      {/* <DonationCard donation={testDonation} /> */}
    </div>
  );
};

export default DonationsList;