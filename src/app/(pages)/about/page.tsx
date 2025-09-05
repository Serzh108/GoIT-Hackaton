'use client';
import Modal from '@/components/Modal/Modal';
import ModalCard from '@/components/ModalCard/ModalCard';
import { useState } from 'react';

const About = () => {
  const [open, setOpen] = useState(false);
  const [modalType, setModalType] = useState<'confirm' | 'success' | null>(
    null
  );

  const openConfirm = () => {
    setModalType('confirm');
    setOpen(true);
  };

  const handleDelete = () => {
    // тут виконуєш запит на видалення
    setModalType('success');
  };
  return (
    <section className="pageWrapper">
      <h1>About</h1>
      <p className="mb-3">Page routing About</p>

      <div>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded"
          onClick={openConfirm}
        >
          Видалити
        </button>

        <Modal show={open} onClose={() => setOpen(false)}>
          {modalType === 'confirm' && (
            <ModalCard
              title="Ви дійсно бажаєте видалити звіт?"
              variant="confirm"
              onClose={() => setOpen(false)} // передача функції закриття
              buttons={[
                { label: 'Так', onClick: handleDelete, style: 'primary' },
                { label: 'Ні', onClick: () => {}, style: 'secondary' },
              ]}
            />
          )}

          {modalType === 'success' && (
            <ModalCard
              title="Успішно видалено"
              variant="success"
              onClose={() => setOpen(false)}
            />
          )}
        </Modal>
      </div>
    </section>
  );
};

export default About;
