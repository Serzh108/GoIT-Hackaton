import DonationsList from '@/components/Donatios/DonatiosList/DonatiosList';
import PageHeader from '@/components/PageHeader/PageHeader';

const Donations = () => {
  return (
    <section className="ml-[256px]">
      <PageHeader isShowEditeImage />
      <DonationsList />
    </section>
  );
};

export default Donations;
