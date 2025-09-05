import PageHeader from "@/components/PageHeader/PageHeader";
import DonationForm from "@/components/Donatios/DonationForm/DonationForm";

const NewDonations = async () => {
  return(
    <section className="flex flex-col pl-[260px]">
      <PageHeader />
      <DonationForm />
    </section>
  )  
};

export default NewDonations;