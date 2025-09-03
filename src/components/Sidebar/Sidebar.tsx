'use client';
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/services/cn";
import { getNormalizedPath } from "@/services/getNormalizedPath";
import { useUserStore } from "@/store/store";
import { logOut, userRegister } from "@/services/auth";
import { MENU_ARRAY } from "@/constants/constants";
import { deleteCookie, deleteCookieRefresh, 
  // refreshPath 
} from "@/services/actions";
import { IRegisterFormData } from "@/types/formDataTypes";
import axios from "axios";

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
    // const newUser: IRegisterFormData = {
    //   email: 'ser2015@i.ua',
    //   password: 'xxxxTEST1xxx',
    //   name: 'Serhii',
    //   role: 'editor',
    // };  
    // const resultRegister = await userRegister(newUser);
    // console.log(' - resultRegister: ', resultRegister);

        // const result2 = await axios.get("/api/collections/en?page=1&perPage=3");
        // console.log(' - collections list -> ', result2);

        const result1 = await axios.get("/api/auth/users");
        console.log(' - result1 -> ', result1);
  };
  
  return(
    <aside className="fixed flex flex-col left-0 top-0 bottom-0 w-[240px] pl-4 bg-blue-800">
      <div className="flex flex-col justify-center gap-4">
        <ul>
          {MENU_ARRAY &&
            MENU_ARRAY.length > 0 &&
            MENU_ARRAY.map((item) =>
              (!isAdmin && item.link !== 'admin') || isAdmin ? (
                <li
                  key={item.title}
                  className={cn(
                    normalizePath.includes(item.link)
                      ? 'text-active'
                      : 'text-secondaryText',
                    'hover-effect'
                  )}
                >
                  <Link href={`/${item.link}`}>{item.title}</Link>
                </li>
              ) : null
          )}
        </ul>
        <button
          type="button"
          onClick={logoutButtonHandler}
          className="w-[80%] p-1.5 border border-white rounded-md cursor-pointer"
        >
          <span className="text-xl font-semibold">
            Вихід
          </span>
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

  )  
};

export default Sidebar;