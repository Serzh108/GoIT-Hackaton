import PageHeader from "@/components/PageHeader/PageHeader";
import PartnersEditing from "@/components/Partners/PartnersEditing";

const NewPartners = async ()  => {     
  return(
    <section className="flex flex-col pl-[260px]">
      <PageHeader />
      <PartnersEditing />
    </section>
  )
};

export default NewPartners;