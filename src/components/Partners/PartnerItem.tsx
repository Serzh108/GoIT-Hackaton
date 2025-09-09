import { FC } from "react";
import Link from "next/link";
import Image from 'next/image';
import Button from "../Button/Button";
import Edit from '@/icons/edit.svg';
import Delete from '@/icons/delete.svg';
import { updateServer } from "@/services/actions";
import { deletePartner } from "@/services/transferData";
import { INTERNAL_LINKS } from "@/constants/constants";
import { IPartnerData } from "@/types/formDataTypes";

type Props = {
  partner: IPartnerData;
};

const BASE_IMAGE_URL = process.env.NEXT_PUBLIC_BASE_IMAGE_URL;

const PartnerItem: FC<Props> = ({ partner }) => {
  const deleteHandler = async (id: string) => {
    // !!! Insert Modal with delede confirmation
    console.log(' deleteHandler id: ', id);
    const result = await deletePartner(id);
    console.log(' - result1 -> ', result);
    // if (result === 204) {
    //   setShowNotification(true);
    // }
    setTimeout(() => {
      updateServer(`/${INTERNAL_LINKS.PARTNERS}`);
    }, 2000);
  };

  return (
  <li className=" flex items-center justify-between gap-6 w-[49%] bg-white border-b border-black rounded-lg p-4">
    <div className=" flex flex-col items-center gap-6 flex-1 overflow-hidden font-semibold font-body leading-[22px]">
      <div className=" rounded-2xl w-[200px] h-[200px] bg-neutral-300 relative overflow-hidden">
        <Image
          src={`${BASE_IMAGE_URL}${partner.image[0].path}`}
          alt={partner.logo}
          fill
          sizes="(max-width: 200px)"
          className="object-cover"
          priority
        />
      </div>

      <p>{partner.logo}</p>
      <a href={partner.link} target="_blank" className="truncate max-w-[98%] text-gray-700 break-words hover:text-gray-400">{partner.link}</a>
    </div>

    <div className="flex gap-4 shrink-0">
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
  </li>
  );
};

export default PartnerItem;