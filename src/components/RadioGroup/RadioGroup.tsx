'use client';
import React from 'react';

type RadioOptions = { label: string; value: string };
type Props = {
  name: string;
  options: RadioOptions[];
  selectedValue?: string;
  onChange: (value: string) => void;
};

const RadioGroup: React.FC<Props> = ({
  name,
  options,
  selectedValue,
  onChange,
}: Props) => {
  return (
    <div className="flex flex-wrap gap-4 ">
      {options.map(option => {
        const isSelected = option.value === selectedValue;
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={`px-6 py-3 rounded-3xl border ${
              isSelected
                ? 'border-black bg-black text-white border'
                : 'border-black bg-white text-black border'
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
};

export default RadioGroup;
