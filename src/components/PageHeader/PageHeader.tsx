'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import LocaleSwitch from '../LocaleSwitch/LocaleSwitch';
import Button from '../Button/Button';
import Edit from '@/icons/add_pen.svg';
import { useUserStore } from '@/store/store';
import { getPathRenderName } from '@/services/getPathRenderName';
import { INTERNAL_LINKS, pathRenderName } from '@/constants/constants';

const PageHeader = () => {
  const path = usePathname();
  const router = useRouter();
  const locale = useUserStore(state => state.locale);

  const renderPath = getPathRenderName(path);

  const getLink = (path: string) => {
    return Object.entries(pathRenderName).filter(
      entry => entry[1] === path
    )[0][0];
  };

  console.log(' - - - path: ', path);

  return (
    <div className="min-h-11 fixed left-4 right-4 z-40 flex justify-between items-center text-xl font-semibold pb-3 pt-8 pr-8 pl-[290px] bg-gray-100">
      <ul className="flex gap-2 min-w-fit text-xl font-semibold">
        {renderPath.map((path, index) => {
          const isLast = index === renderPath.length - 1;
          return (
            <li key={index} className="flex items-center">
              {!isLast ? (
                <>
                  <Link
                    href={`/${getLink(path)}`}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    {path}
                  </Link>
                  <span className="ml-2 text-gray-500">{'>'}</span>
                </>
              ) : (
                <span className="text-black">{path}</span>
              )}
            </li>
          );
        })}
      </ul>

      <div className="flex gap-15">
        <LocaleSwitch checked={locale === 'ua'} />
        {renderPath.length === 1 ? (
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
