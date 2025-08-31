import Image from 'next/image';
import EditIcon from '@/icons/edit.svg';
import DeleteIcon from '@/icons/delete.svg';
import { BASE_IMAGE_URL } from '@/constants/constants';

type Props = {
  path: string;
  alt: string;
  title: string;
  desc: string;
};
function DonationCard({ path, alt, desc, title }: Props) {
  return (
    <div className="border-2 w-[305px] h-[440px] rounded-2xl p-6 flex flex-col gap-6">
      <div className="border-2 rounded-2xl w-full h-[160px] bg-neutral-300 relative overflow-hidden">
        <Image
          src={`${BASE_IMAGE_URL}${path}`}
          alt={alt}
          fill
          className="object-cover"
          priority
        />
      </div>

      <div>
        <h3 className="font-semibold text-2xl leading-normal mb-2 ">{title}</h3>
        <p className="text-sm line-clamp-4">{desc}</p>
      </div>
      <div className="flex flex-row justify-center gap-5 mt-auto">
        <button type="button" aria-label="Редагувати збір">
          <EditIcon className="w-8 h-8 cursor-pointer" aria-hidden />
        </button>
        <button type="button" aria-label="Видалити збір">
          <DeleteIcon className="w-8 h-8 cursor-pointer" aria-hidden />
        </button>
      </div>
    </div>
  );
}

export default DonationCard;
