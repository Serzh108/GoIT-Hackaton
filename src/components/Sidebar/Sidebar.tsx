'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/services/cn';
import { getNormalizedPath } from '@/services/getNormalizedPath';
import { MENU_ARRAY } from '@/constants/constants';
import Logo from '@/icons/logo.svg';
import ExitIcon from '@/icons/exit.svg';

const Sidebar = () => {
  const path = usePathname();
  const normalizePath = getNormalizedPath(path);
  const isAdmin = true; // TEMP!!!

  const outButtonHandler = async () => {
    console.log('outButtonHandler');
  };
  return (
    <aside className="fixed flex flex-col left-0 top-0 bottom-0 w-[255px] p-6 bg-blue-800">
      <div className="flex flex-col items-center justify-between  gap-4 h-full">
        <a className="cursor-pointer" href="">
          <Logo className="w-16 h-16" />
        </a>
        <ul className="flex flex-col">
          {MENU_ARRAY.map(item =>
            !isAdmin && item.link === 'admin' ? null : (
              <li key={item.link} className="flex flex-col">
                <Link
                  className={cn(
                    normalizePath.includes(item.link)
                      ? 'text-active'
                      : 'text-secondaryText',
                    item.parent
                      ? 'hover-effect py-2 pl-8 leading-[175%] font-semibold text-base relative before:content-[""] before:inline-block before:w-1 before:h-1 before:rounded-full before:bg-current before:mr-2.5'
                      : 'hover-effect  py-2.5 px-8 font-semibold leading-normal text-lg'
                  )}
                  href={`/${item.link}`}
                >
                  {item.title}
                </Link>
              </li>
            )
          )}
        </ul>

        <button
          type="button"
          onClick={outButtonHandler}
          className="w-[80%] py-0 px-5  cursor-pointer mb-12 flex items-center gap-3"
        >
          <ExitIcon />
          <span className="font-semibold text-lg leading-[156%]">Вихід</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
