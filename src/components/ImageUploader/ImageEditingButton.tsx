'use client';
import React from 'react';
import { cn } from '@/services/cn';
import PenIcon from '@/icons/pen.svg';
import PlussIcon from '@/icons/pluss.svg';

type Props = {
  onClick: () => void;
  buttonType: 'Add' | 'Edit';
};

const ImageEditingButton: React.FC<Props> = ({ onClick, buttonType }) => {
  return (
    <button
      type="button"
      title={buttonType === 'Add' ? 'Додавання' : 'Редагування'}
      onClick={onClick}
      className={cn('flex gap-4 items-center justify-start w-max h-9 font-semibold text-2xl leading-normal cursor-pointer', {
        'justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2':
          buttonType === 'Add',
      })}
    >
      {buttonType === 'Add' ? <PlussIcon /> : <PenIcon />}
      <p className={buttonType === 'Edit' ? 'block' : ''}>
        {buttonType === 'Add' ? 'Додати зображення' : 'Змінити зображення'} 
      </p>
    </button>
  );
};

export default ImageEditingButton;<center></center>