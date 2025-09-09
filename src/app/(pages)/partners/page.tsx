import PageHeader from '@/components/PageHeader/PageHeader';
import PartnersList from '@/components/Partners/PartnersList';

const Partners = () => {
  return (
    <section className="flex flex-col justify-start items-center w-full ml-[256px] ">
      <PageHeader isShowEditeImage />
      <PartnersList />
    </section>
  );
};

export default Partners;
