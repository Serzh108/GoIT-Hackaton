import DonationForm from '@/components/Donatios/DonationForm/DonationForm';
import PageHeader from '@/components/PageHeader/PageHeader';

type Params = {
  id: string;
};

const DonationEditingPage = async ({ params }: { params: Params }) => {
  const { id } = await params;

  return (
    <section className="flex flex-col pl-[260px] pb-20">
      <PageHeader />
      <DonationForm id={id} />
    </section>
  );
};

export default DonationEditingPage;
