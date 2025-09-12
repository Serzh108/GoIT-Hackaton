import React from 'react';
import Image from 'next/image';
import ImageEditingButton from './ImageEditingButton';

type Props = {
  image: string | undefined;
  title: string | undefined;
  width: number;
  height: number;
  handleAddImage: () => void;
};

const ImageUploader: React.FC<Props> = ({
  image,
  title,
  width,
  height,
  handleAddImage,
}) => {
  return (
    <>
      {image ? (
        <div className="flex align-top gap-14 relative mr-auto w-full h-full">
         <div
          className="w-[408px] h-[212px] flex items-center justify-center border border-dashed border-black rounded-[22px] overflow-hidden cursor-pointer"
         >
          <Image
            src={
              image.startsWith('data:image/')
                ? image
                : `${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}${image}`
            }
            alt={title || 'Зображення'}
            width={width}
            height={height}
            className="rounded-md object-cover w-full h-full"
          />
          </div>
          <ImageEditingButton onClick={handleAddImage} buttonType="Edit" />
        </div>
      ) : (
        <div className='w-[408px] h-[212px] border border-dashed rounded-[22px] relative'>
          <ImageEditingButton onClick={handleAddImage} buttonType="Add" />
        </div>
      )}
    </>
  );
};

export default ImageUploader;