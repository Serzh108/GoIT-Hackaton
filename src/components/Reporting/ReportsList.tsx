'use client';
import { useEffect, useState } from 'react';
import NoData from '../NoData/NoData';
import ReportItem from './ReportItem';
import { useUserStore } from '@/store/store';
import { reportsListData } from '@/services/transferData';
import { IReportsListData } from '@/types/formDataTypes';

const ReportsList = () => {
  const setReports = useUserStore(state => state.setReports);
  const locale = useUserStore(state => state.locale);
  const [allReports, setAllReports] = useState<IReportsListData[]>([]);

  useEffect(() => {
    const getUsersList = async () => await reportsListData(locale);
    getUsersList().then(res => {
      if (res) {
        console.log('- getUsersList -> ', res);
        setAllReports(res);
        setReports(res);
      }
    });
  }, [setReports, locale]);
 
  return (
    <>
      {allReports && allReports.length > 0 ? (
        <div className=" shadow-accent w-[80%] rounded-lg mt-[140px]">
          <div className="rounded-lg overflow-hidden">
            <div className="flex rounded-lg border-b border-black font-semibold font-body leading-[22px] sticky top-0 bg-white z-10">
              <h2 className="px-6 py-5 text-left min-w-[100px]">Місяць</h2>
              <h2 className="px-6 py-5 text-left min-w-[80px]">Рік</h2>
              <h2 className="px-6 py-5 text-left flex-1">Посилання на звіт</h2>
            </div>
            <ul className="flex flex-col max-h-[590px] overflow-y-scroll scrollbar-hide bg-gray-300">
              {allReports.map(item => (
                <ReportItem report={item} key={item._id} />
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <NoData message={'Немає інформації'} />
      )}
    </>
  );
};

export default ReportsList;
