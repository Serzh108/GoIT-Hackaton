import { FC } from 'react';
import Image from 'next/image';
import EditIcon from '@/icons/edit.svg';
import DeleteIcon from '@/icons/delete.svg';
import Link from 'next/link';
import { INTERNAL_LINKS } from '@/constants/constants';
import { updateServer } from '@/services/actions';
import { deleteDonation } from '@/services/transferData';

interface IDonationCard {
  path: string;
  alt: string;
  title: string;
  desc: string;
  _id: string;
}

type Props = {
  donation: IDonationCard;
};

const BASE_IMAGE_URL = process.env.NEXT_PUBLIC_BASE_IMAGE_URL;

const DonationCard: FC<Props> = ({ donation }) => {
  const { path, alt, desc, title, _id } = donation;

  const deleteHandler = async (id: string) => {
    // !!! Insert Modal with delede confirmation
    console.log(' delete: ', id);
    const result = await deleteDonation(id);
    console.log(' - result1 -> ', result);
     setTimeout(() => {
      updateServer(`/${INTERNAL_LINKS.DONATIONS}`);
    }, 2000);
  };

  return (
    <div className="border-2 w-[305px] h-[440px] rounded-2xl p-6 flex flex-col gap-6">
      <div className=" rounded-2xl w-full h-[160px] bg-neutral-300 relative overflow-hidden">
        <Image
          src={`${BASE_IMAGE_URL}${path}`}
          alt={alt}
          fill
          sizes="(max-width: 257px)"
          className="object-cover "
          priority
        />
      </div>

      <div>
        <h3 className="font-semibold text-2xl leading-normal mb-2 ">{title}</h3>
        <p className="text-sm line-clamp-4">{desc}</p>
      </div>
      <div className="flex flex-row justify-center gap-5 mt-auto">
        <Link
          href={`${INTERNAL_LINKS.DONATIONS}/${_id}/${INTERNAL_LINKS.EDITING}`}
          className="hover:scale-110"
        >
          <EditIcon className="w-8 h-8 cursor-pointer" />
        </Link>

        <button
          type="button"
          aria-label="Видалити збір"
          className="hover:scale-110"
        >
          <DeleteIcon
            className="w-8 h-8 cursor-pointer hover:text-error"
            onClick={() => deleteHandler(_id)}
            aria-hidden
          />
        </button>
      </div>
    </div>
  );
};

export default DonationCard;
