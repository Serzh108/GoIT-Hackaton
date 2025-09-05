'use client';
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import axios from "axios";
import { cn } from "@/services/cn";
import { getNormalizedPath } from "@/services/getNormalizedPath";
import { deleteUser, logOut, 
  // userRegister
 } from "@/services/auth";
import { deleteCookie, deleteCookieRefresh } from "@/services/actions";
import { useUserStore } from "@/store/store";
import { MENU_ARRAY } from "@/constants/constants";
// import { IRegisterFormData } from "@/types/formDataTypes";
import Logo from '@/icons/logo.svg';
import ExitIcon from '@/icons/exit.svg';

const Sidebar = () => {
  const path = usePathname();
  const router = useRouter();
  const normalizePath = getNormalizedPath(path);
  const isAdmin = useUserStore(state => state.isAdmin);

  const logoutButtonHandler = async () => {
    const resultLogOut = await logOut(); 
    console.log('resultLogOut: ', resultLogOut);
    if (resultLogOut === 204) {
      await deleteCookie();
      await deleteCookieRefresh();
      // await refreshPath(path); // ? Why
      router.push('/about'); // ???
    }
  };

  const testButtonHandler = async () => {
     
    // const resultRegister = await userRegister(newUser);
    // console.log(' - resultRegister: ', resultRegister);

        // const result2 = await axios.get("/api/collections/en?page=1&perPage=3");
        // console.log(' - collections list -> ', result2);

        // const result1 = await axios.get("/api/auth/users");
        // console.log(' - result1 -> ', result1);
  };
// const newUser: IRegisterFormData = {
    //   email: 'ser2015@i.ua',
    //   password: 'xxxxTEST1xxx',
    //   name: 'Serhii',
    //   role: 'editor',
    // };   
  return(
    <aside className="fixed flex flex-col left-0 top-0 bottom-0 w-[256px] p-6 bg-blue-800">
      <div className="flex flex-col items-center justify-between  gap-4 h-full">
        <a className="cursor-pointer" href="">
          <Logo className="w-16 h-16" />
        </a>
        <ul className="flex flex-col">
          {MENU_ARRAY &&
            MENU_ARRAY.length > 0 &&
            MENU_ARRAY.map((item) =>
              (!isAdmin && item.link !== 'admin') || isAdmin ? (
                // !isAdmin && item.link === 'admin' ? null : (
                // <li key={item.title}   
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
              ) : null
            )}
        </ul>

        <button
          type="button"
          onClick={logoutButtonHandler}
          className="w-[80%] py-0 px-5  cursor-pointer mb-12 flex items-center gap-3"
        >
          <ExitIcon />
          <span className="font-semibold text-lg leading-[156%]">Вихід</span>
        </button>

        <button
          type="button"
          onClick={testButtonHandler}
          className="w-[80%] p-1.5 text-red-500 border border-white rounded-md cursor-pointer"
        >
          <span className="text-xl font-semibold">
            Test
          </span>
        </button> 
      </div>
    </aside>
  );
};

export default Sidebar;
