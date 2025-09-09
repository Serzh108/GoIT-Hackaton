import PageHeader from "@/components/PageHeader/PageHeader";
import PartnersEditing from "@/components/Partners/PartnersEditing";

type Params = {
  id: string;
};

const PartnersEditingPage = async ({ params }: { params: Params }) => {
  const { id } = await params;
     
  return(
    <section className="flex flex-col pl-[260px]">
      <PageHeader />
      <PartnersEditing id={id} />
    </section>
  )  
};

export default PartnersEditingPage; 