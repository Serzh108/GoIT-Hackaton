import DonationForm from '@/components/Donatios/DonationForm/DonationForm';

type Params = {
  id: string;
};

const DonationEditingPage = async ({ params }: { params: Params }) => {
  const { id } = await params;

  return (
    <DonationForm id={id} />
  );
};

export default DonationEditingPage;
