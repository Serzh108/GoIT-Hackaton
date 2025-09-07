import React from 'react';

type Props = {
  message: string;
};

const NoData: React.FC<Props> = ({ message }) => {
  return (
    <div className="flex justify-center w-full text-center ">{message}</div>
  );
};

export default NoData;
