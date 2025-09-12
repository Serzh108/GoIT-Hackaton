'use client';
import { useEffect, useState } from 'react';
import { useUserStore } from '@/store/store';
import PartnerItem from './PartnerItem';
import NoData from '../NoData/NoData';
import { partnersListData } from '@/services/transferData';
import { IPartnerData } from '@/types/formDataTypes';

const PartnersList = () => {
  const setPartners = useUserStore(state => state.setPartners);
  const [allPartners, setAllPartners] = useState<IPartnerData[]>([]);

  useEffect(() => {
    const getPartnersList = async () => await partnersListData();
    getPartnersList().then(res => {
      if (res) {
        console.log('- getPartnersList -> ', res);
        setAllPartners(res);
        setPartners(res);
      }
    });
  }, [setPartners]);
  if (!allPartners || allPartners.length === 0) {
    return <NoData message="Немає інформації" />;
  }
  return (
    <div className="pt-[140px] w-[90%] mx-auto">
      <div className="grid grid-cols-2 gap-2 shadow-accent rounded-2xl p-6 bg-white">
        {allPartners.map(item => (
          <PartnerItem key={item._id} partner={item} />
        ))}
      </div>
    </div>
  );
};

export default PartnersList;
