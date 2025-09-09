'use client';
import { FC } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { INTERNAL_LINKS, pathRenderName } from '@/constants/constants';
import { getPathRenderName } from '@/services/getPathRenderName';
import Edit from '@/icons/add_pen.svg';
import LocaleSwitch from '../LocaleSwitch/LocaleSwitch';
import { useUserStore } from '@/store/store';
import Button from '../Button/Button';

type Props = {
  isShowEditeImage?: boolean;
};

const PageHeader: FC<Props> = ({ isShowEditeImage = false }) => {
  const path = usePathname();
  const router = useRouter();
  const locale = useUserStore(state => state.locale);

  const renderPath = getPathRenderName(path);

  const getLink = (path: string) => {
    return Object.entries(pathRenderName).filter(
      entry => entry[1] === path
    )[0][0];
  };

  console.log(' path: ', path);

  return (
    <div className="min-h-11 fixed left-4 right-4 z-40 flex justify-between items-center text-xl font-semibold pb-3 pt-8 pr-8 pl-[290px] bg-gray-100">
      <ul className="flex gap-2 min-w-fit text-xl font-semibold">
        {renderPath.map((path, index) => (
          <li key={index}>
            {index === 0 ? (
              <Link
                key={index}
                href={`/${getLink(path)}`}
                className={
                  index !== renderPath.length - 1 ? 'text-accentSecondary' : ''
                }
              >
                {path}
                {index < renderPath.length - 1 && <span> {'>'} </span>}
              </Link>
            ) : (
              <div>{path}</div>
            )}
          </li>
        ))}
      </ul>

      <div className="flex gap-15">
        <LocaleSwitch checked={locale === 'ua'} />
        {isShowEditeImage ? (
          <Button
            type="button"
            title="Додати"
            onClick={() => router.push(`${path}/${INTERNAL_LINKS.NEW}`)}
            className="flex gap-2 items-center group hover:drop-shadow-sm bg-white px-7 py-2 rounded-[48px]"
          >
            <span className="font-body font-semibold text-lg leading-7">
              Додати
            </span>
            <Edit className="w-8 h-8 cursor-pointer " />
          </Button>
        ) : (
          <div className="w-8 h-8"></div>
        )}
      </div>
    </div>
  );
};

export default PageHeader;
