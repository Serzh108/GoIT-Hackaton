import React from 'react';
import CheckIcon from '@/icons/check.svg';
import CrossIcon from '@/icons/little_cross.svg';
import Button from '../Button/Button';
import { cn } from '@/services/cn';

interface ModalBtn {
  label: string;
  onClick: () => void;
  style: 'primary' | 'secondary';
}

type ModalCardProps = {
  title: string;
  variant: 'success' | 'delete';
  buttons?: ModalBtn[];
  onClose: () => void;
};

function ModalCard({ title, buttons, variant, onClose }: Props) {
  return (
    <div className="flex flex-col justify-center items-center gap-2 relative w-full h-full ">
      <CrossIcon
        className="cursor-pointer absolute top-0 right-0 text-gray-500 hover:text-gray-700"
        onClick={onClose}
      />
      {variant === 'success' && <CheckIcon className="w-10 h-10   " />}

      <h2 className="font-semibold leading-normal font-body text-black text-2xl ">
        {title}
      </h2>
      <div className="flex gap-6 items-center justify-center mt-9">
        {buttons &&
          buttons.map((btn: ModalBtn, index: number) => (
            <Button
              key={index}
              onClick={() => {
                btn.onClick?.();
                if (btn.style === 'secondary') onClose?.();
              }}
              className={cn(
                'rounded-3xl py-4 px-2 text-xl font-semibold leading-8 w-50',
                btn.style === 'primary'
                  ? 'bg-black text-white hover:bg-primary'
                  : 'text-black border-2 border-black hover:text-primary hover:border-primary'
              )}
            >
              {btn.label}
            </Button>
          ))}
      </div>
    </div>
  );
}

export default ModalCard;
