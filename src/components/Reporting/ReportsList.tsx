'use client';
import { useEffect, useState } from "react";
import NoData from "../NoData/NoData";
import ReportItem from "./ReportItem";
import { useUserStore } from "@/store/store";
import { reportsListData } from "@/services/transferData";
import { IReportsListData } from "@/types/formDataTypes";

const ReportsList = () => {
  const setReports = useUserStore(state => state.setReports);
  const [allReports, setAllReports] = useState<IReportsListData[]>([]);
    
  useEffect(() => {
    const getUsersList = async () => await reportsListData();
    getUsersList().then(res => {
      if(res) {
        console.log('- getUsersList -> ', res);
        setAllReports(res); 
        setReports(res);
        }
    });
  }, [setReports]);
  // }, []);
  
  return(
    <ul className="p-12 pt-20 ml-[20px]">
      {allReports && allReports.length > 0 ? allReports.map(item => 
        <ReportItem report={item} key={item._id} />
      )
      : <NoData message={'Немає інформації'}/>
      }
    </ul>
  );
};

export default ReportsList;