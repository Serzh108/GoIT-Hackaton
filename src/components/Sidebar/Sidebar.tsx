'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/services/cn';
import { getNormalizedPath } from '@/services/getNormalizedPath';
import { MENU_ARRAY } from '@/constants/constants';
import Image from 'next/image';
import { useState } from 'react';

const Sidebar = () => {
  const path = usePathname();
  const normalizePath = getNormalizedPath(path);
  const isAdmin = true; // TEMP!!!
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const outButtonHandler = async () => {
    console.log('outButtonHandler');
  };
  return (
    <aside className="fixed flex flex-col left-0 top-0 bottom-0 w-[255px] p-6 bg-blue-800">
      <div className="flex flex-col justify-between  gap-4 h-full">
        <ul className="flex flex-col ">
          {MENU_ARRAY.map(item =>
            !isAdmin && item.link === 'admin' ? null : (
              <li key={item.title} className="flex flex-col ">
                {item.children ? (
                  <>
                    <button
                      onClick={() =>
                        setOpenMenu(openMenu === item.link ? null : item.link)
                      }
                      className={cn(
                        normalizePath.includes(item.link)
                          ? 'text-active'
                          : 'text-secondaryText',
                        'hover-effect py-2.5 px-5 text-left font-semibold text-lg '
                      )}
                    >
                      {item.title}
                    </button>
                    {openMenu === item.link && (
                      <ul className="ml-6 flex flex-col mb-10">
                        {item.children.map(sub => (
                          <li key={sub.title}>
                            <Link
                              className={cn(
                                normalizePath.includes(sub.link)
                                  ? 'text-active'
                                  : 'text-secondaryText',
                                'hover-effect py-2.5 px-3  font-semibold text-lg flex items-center relative before:content-[""] before:inline-block before:w-1 before:h-1 before:rounded-full before:bg-current before:mr-3.5'
                              )}
                              href={`/${sub.link}`}
                            >
                              {sub.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : (
                  <Link
                    className={cn(
                      normalizePath.includes(item.link)
                        ? 'text-active'
                        : 'text-secondaryText',
                      'hover-effect py-2.5 px-5 font-semibold text-lg'
                    )}
                    href={`/${item.link}`}
                  >
                    {item.title}
                  </Link>
                )}
              </li>
            )
          )}
        </ul>
        <button
          type="button"
          onClick={outButtonHandler}
          className="w-[80%] py-0 px-5  cursor-pointer mb-12 flex items-center gap-3"
        >
          {/*  Або використати Image і додати посилання на іконку з папки icons. Перед цим її авжеж треба туди додати 
          Або додати її як svgr по прикладу як в картці збору */}
          {/* <Image width={32} height={32} src="" alt="exit icon" /> */}

          <span className="font-semibold text-lg leading-[156%]">Вихід</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
