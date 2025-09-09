'use client';
import Modal from '@/components/Modal/Modal';
import ModalCard, { ModalBtn } from '@/components/ModalCard/ModalCard';
import { useState } from 'react';

const About = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalVariant, setModalVariant] = useState<'delete' | 'success'>('delete');

  const openDeleteModal = () => {
    setModalVariant('delete');
    // setModalVariant('success');
    setIsOpen(true);
  };

  const handleDelete = () => {
    try {
      // тут має бути запит на видалення
console.log('I try to delete You!!!');
      // а це відкриття модалки що каже про успішне видалення
      setModalVariant('success');
    } catch (error) {
      console.error(error);
    }
    console.log('Delete');
  };

  const modalButtons: ModalBtn[] = [
    { label: 'Так', style: 'primary', onClick: handleDelete },
    { label: 'Ні', style: 'secondary', onClick: () => setIsOpen(false) },
  ];

  return (
    <section className="ml-[256px]">
      <h1>About</h1>
      <p className="mb-3">Page routing About</p>

      <div>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded"
          onClick={openDeleteModal}
        >
          Видалити
        </button>

        <Modal show={isOpen} onClose={() => setIsOpen(false)}>
          <ModalCard
            title={
              modalVariant === 'delete'
                ? // ? `Ви дійсно бажаєте видалити ${title}?`
                  `Ви дійсно бажаєте видалити збір?`
                : 'Успішно видалено'
            }
            variant={modalVariant}
            onClose={() => setIsOpen(false)} // передача функції закриття
            buttons={modalVariant === 'delete' ? modalButtons : undefined}
          />
        </Modal>
      </div>
    </section>
  );
};

export default About;
