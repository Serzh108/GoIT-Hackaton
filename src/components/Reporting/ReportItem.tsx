import { FC } from 'react';
import Link from 'next/link';
import Edit from '@/icons/edit.svg';
import Delete from '@/icons/delete.svg';
import { INTERNAL_LINKS } from '@/constants/constants';
import { IReportsListData } from '@/types/formDataTypes';
import { deleteReport } from '@/services/transferData';
import { updateServer } from '@/services/actions';
import Button from '../Button/Button';

type Props = {
  report: IReportsListData;
};

const ReportItem: FC<Props> = ({ report }) => {
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

  return (
    <li className="bg-white border-b-2 border-black rounded-lg px-6 py-5  flex items-center justify-between gap-6">
      <div className=" flex items-center gap-8 flex-1 overflow-hidden font-semibold font-body leading-[22px]">
        <p className="min-w-[80px]">{report.month}</p>
        <p className="min-w-[60px]">{report.year}</p>
        <p className="truncate max-w-[483px] text-gray-500 break-words">
          {report.url}
        </p>
      </div>

      <div className="flex gap-4 shrink-0">
        <Link
          href={`${INTERNAL_LINKS.REPORTING}/${report._id}/${INTERNAL_LINKS.EDITING}`}
          className="flex justify-center items-center group hover:bg-gray-300 bg-gray-100 w-16 h-14 rounded-2xl"
        >
          <Edit
            className="w-8 h-8 cursor-pointer group-hover:text-gray-900"
            onClick={() => editHandler(report._id)}
          />
        </Link>
        <Button
          type="button"
          className="flex justify-center items-center group hover:bg-gray-300 bg-gray-100 w-16 h-14 rounded-2xl"
        >
          <Delete
            className="w-8 h-8 cursor-pointer group-hover:text-gray-900"
            onClick={() => deleteHandler(report._id)}
          />
        </Button>
      </div>
    </li>
  );
};

export default ReportItem;
