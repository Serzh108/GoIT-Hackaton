import { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Button from '../Button/Button';
import Edit from '@/icons/edit.svg';
import Delete from '@/icons/delete.svg';
import { INTERNAL_LINKS } from '@/constants/constants';
import { IPartnerData } from '@/types/formDataTypes';

type Props = {
  partner: IPartnerData;
  deleteHandler: (id: string) => void;
};

const BASE_IMAGE_URL = process.env.NEXT_PUBLIC_BASE_IMAGE_URL;

const PartnerItem: FC<Props> = ({ partner, deleteHandler }) => {

  return (
    <div className="flex flex-col  p-8 drop-shadow-sm rounded-2xl bg-white border-gray-300">
      <p className=" font-semibold">{partner.logo}</p>
      <a
        href={partner.link}
        target="_blank"
        className="truncate max-w-[98%] text-gray-700 break-words hover:text-gray-400 mb-6"
      >
        {partner.link}
      </a>
      <div className="flex items-end justify-between  w-full">
        <div className="rounded-2xl size-[200px] bg-neutral-300 relative overflow-hidden">
          <Image
            src={`${BASE_IMAGE_URL}${partner.image[0].path}`}
            alt={partner.logo}
            fill
            sizes="(max-width: 200px)"
            className="object-cover"
            priority
          />
        </div>
        <div className="flex gap-4">
          <Link
            href={`${INTERNAL_LINKS.PARTNERS}/${partner._id}/${INTERNAL_LINKS.EDITING}`}
            className="flex justify-center items-center group hover:bg-gray-300 bg-gray-100 w-16 h-14 rounded-2xl"
          >
            <Edit className="w-8 h-8 cursor-pointer group-hover:text-gray-900" />
          </Link>
          <Button
            type="button"
            className="flex justify-center items-center group hover:bg-gray-300 bg-gray-100 w-16 h-14 rounded-2xl"
          >
            <Delete
              className="w-8 h-8 cursor-pointer group-hover:text-gray-900"
              onClick={() => deleteHandler(partner._id)}
            />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PartnerItem;
