import { FC } from "react";
import Link from "next/link";
import Edit from '@/icons/edit.svg';
import Delete from '@/icons/delete.svg';
import { INTERNAL_LINKS } from "@/constants/constants";
import { IReportsListData } from "@/types/formDataTypes";
import { deleteReport } from "@/services/transferData";
import { updateServer } from "@/services/actions";

type Props = {
    report: IReportsListData;
};

const ReportItem: FC<Props> = ({report}) => {

  const editHandler = async (id: string) => {
   console.log(' edit: ', id); 
  };

  const deleteHandler = async (id: string) => {
    // !!! Insert Modal with delede confirmation
    console.log(' delete: ', id); 
    const result = await deleteReport(id);
    console.log(' - result1 -> ', result); 
    // if (result === 204) {
    //   setShowNotification(true);
    // }
    setTimeout(() => {
      updateServer(`/${INTERNAL_LINKS.REPORTING}`);
    }, 2000);       
  };
  
  return(
    <li className="flex gap-8 w-[80%] mb-4 p-2 border rounded-md">
    <div className="flex items-center gap-8 w-[60%]">
        <div>{report.month}</div>
        <div>{report.year}</div>
        <div>{report.url}</div>
    </div>
     <div className="flex justify-between items-center gap-8">
        <Link href={`${INTERNAL_LINKS.REPORTING}/${report._id}/${INTERNAL_LINKS.EDITING}`}
        className="group">
        <Edit className="w-8 h-8 cursor-pointer" onClick={() => editHandler(report._id)} />
        </Link>
        <Delete className="w-8 h-8 cursor-pointer" onClick={() => deleteHandler(report._id)} />
     </div>
    </li>
  )
};

export default ReportItem;