'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/services/cn";
import { getNormalizedPath } from "@/services/getNormalizedPath";
import { MENU_ARRAY } from "@/constants/constants";
import { logIn } from "@/services/auth";
// import axios from "axios";

const Sidebar = () => {
  const path = usePathname();
  const normalizePath = getNormalizedPath(path);
  const isAdmin = true; // TEMP!!!
  const outButtonHandler = async () => {
    console.log('outButtonHandler');
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
          onClick={outButtonHandler}
          className="w-[80%] p-1.5 border border-white rounded-md cursor-pointer"
        >
          <span className="text-xl font-semibold">
            Вихід
          </span>
        </button>
      </div>
    </aside>

  )  
};

export default Sidebar;