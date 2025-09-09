'use client';
import { useEffect, useState } from "react";
import { useUserStore } from "@/store/store";
import PartnerItem from "./PartnerItem";
import NoData from "../NoData/NoData";
import { partnersListData } from "@/services/transferData";
import { IPartnerData } from "@/types/formDataTypes";

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
    return(
    <>
      {allPartners && allPartners.length > 0 ? (
        <div className=" shadow-accent w-[80%] rounded-lg mt-[140px]">
          <div className="rounded-lg overflow-hidden">
            <ul className="flex justify-between flex-wrap gap-4 max-h-[690px] overflow-y-scroll scrollbar-hide bg-gray-300">
              {allPartners.map(item => (
                <PartnerItem partner={item} key={item._id} />
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <NoData message={'Немає інформації'} />
      )}
    </>
    )
};

export default PartnersList;