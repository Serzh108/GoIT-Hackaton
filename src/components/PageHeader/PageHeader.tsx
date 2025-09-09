'use client';
import { FC } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { INTERNAL_LINKS, pathRenderName } from "@/constants/constants";
import { getPathRenderName } from "@/services/getPathRenderName";
import Edit from '@/icons/edit.svg';
import LocaleSwitch from "../LocaleSwitch/LocaleSwitch";
import { useUserStore } from "@/store/store";

type Props = {
  isShowEditeImage?: boolean;
};

const PageHeader: FC<Props> = ({isShowEditeImage = false}) => {
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
    <div className="min-h-11 fixed left-4 right-4 z-40 flex justify-between items-center text-xl font-semibold pb-3 pt-8 pr-8 pl-[290px] bg-white">
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

      <LocaleSwitch checked={locale === 'ua'}/>

      {isShowEditeImage ? (
      <button
        type="button"
        title="Додати"
        onClick={() => router.push(`${path}/${INTERNAL_LINKS.NEW}`)}
        className="flex gap-3 items-center group"
      >
        <Edit className="w-8 h-8 stroke-white cursor-pointer"  />
        {/* <Icon
          name="/assets/add.svg"
          id="add"
          className="w-11 h-11 icon-actions-green"
        /> */}
        <span>Додати</span>
      </button>) : (<div className="w-8 h-8"></div>)}
    </div>
  );  
};

export default PageHeader;