'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/services/cn';
import { logOut } from '@/services/auth';
import { deleteCookie, deleteCookieRefresh } from '@/services/actions';
import { useUserStore } from '@/store/store';
import { MENU_ARRAY } from '@/constants/constants';
import Logo from '@/icons/logo.svg';
import ExitIcon from '@/icons/exit.svg';

const Sidebar = () => {
  const path = usePathname();
  const router = useRouter();
  const isAdmin = useUserStore(state => state.isAdmin);

  const logoutButtonHandler = async () => {
    const resultLogOut = await logOut();
    console.log('resultLogOut: ', resultLogOut);
    if (resultLogOut === 204) {
      await deleteCookie();
      await deleteCookieRefresh();
      router.push('/donations'); 
    }
  };

  return (
    <aside className="fixed flex flex-col left-0 top-0 bottom-0 w-[256px] p-6 bg-primary z-50">
      <div className="flex flex-col items-center justify-between gap-4 h-full">
        <a
          className="flex items-center justify-center size-25 cursor-pointer rounded-full bg-transparent transition-colors duration-300 hover:bg-white/20"
          href="https://inharmony.com.ua/ua"
          target="_blank"
        >
          <Logo className="w-16 h-16" />
        </a>

        <ul className="flex flex-col pb-16 text-gray-50 font-heading">
          {MENU_ARRAY &&
            MENU_ARRAY.length > 0 &&
            MENU_ARRAY.map((item, index) => {
              if (!isAdmin && item.link === 'admin') return null;

              const href = `/${item.link}`;
              const isActive = path.startsWith(href);
              const isLast =
                index ===
                MENU_ARRAY.filter(i => !(!isAdmin && i.link === 'admin'))
                  .length -
                  1;
              return (
                <li
                  key={item.link}
                  className={cn('flex flex-col', isLast && 'mt-20')}
                >
                  <Link
                    href={href}
                    aria-current={isActive ? 'page' : undefined}
                    className={cn(
                      'hover:text-accent font-semibold py-2.5 px-8 leading-normal text-lg',
                      isActive && ' rounded-3xl bg-white/20  '
                    )}
                  >
                    {item.title}
                  </Link>
                </li>
              );
            })}
        </ul>

        <button
          type="button"
          onClick={logoutButtonHandler}
          className="hover:scale-120 text-gray-50  hover:text-accent w-[80%] py-0 px-5  cursor-pointer mb-12 flex items-center gap-3"
        >
          <ExitIcon />
          <span className="font-semibold text-lg leading-[156%]">Вихід</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
