'use client';
import { useUserStore } from '@/store/store';
import React from 'react';

type Props = {
  checked?: boolean;
  onChange?: (value: boolean) => void;
};

function LocaleSwitch({  checked, onChange }: Props) {
    // --- - ---
    const setLocale = useUserStore(state => state.setLocale);
    const onChange1 = (checked1: boolean) => {
        console.log('onChange1 -> ', checked1, 'checked -> ', checked);
        setLocale(checked1);
    };
    // --- / - ---
  return (
    <div className="hs-tooltip flex flex-row items-center justify-center gap-x-3">
      <label
        htmlFor="hs-large-soft-switch-with-icons"
        className="relative inline-block w-30 h-15 cursor-pointer"
      >
        <input
          type="checkbox"
          id="hs-large-soft-switch-with-icons"
          checked={checked}
        //   onChange={event => onChange?.(event.target.checked)}
  onChange={event => onChange1(event.target.checked)}
          className="peer sr-only"
        />
        <span className="absolute inset-0 bg-gray-300 rounded-full transition-colors -200 ease-in-out peer-checked:bg-accent peer-disabled:opacity-50 peer-disabled:pointer-events-none"></span>
        <span className="absolute top-1/2 start-1 -translate-y-1/2 size-13 bg-white rounded-full shadow-xs transition-transform -200 ease-in-out  peer-checked:translate-x-15"></span>

        <span className="text-2xl leading-8 font-body absolute top-1/2 start-6 -translate-y-1/2 flex justify-center items-center size-5 text-white peer-checked:text-black transition-colors -200">
          UA
        </span>

        <span className="text-2xl leading-8 font-body absolute top-1/2 end-6 -translate-y-1/2 flex justify-center items-center size-5 text-black peer-checked:text-white transition-colors -200">
          EN
        </span>
      </label>
    </div>
  );
}

export default LocaleSwitch;