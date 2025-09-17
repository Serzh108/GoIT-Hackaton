import PartnersEditing from "@/components/Partners/PartnersEditing";

type Params = {
  id: string;
};

const PartnersEditingPage = async ({ params }: { params: Params }) => {
  const { id } = await params;
     
  return(
    <PartnersEditing id={id} />
  )  
};

export default PartnersEditingPage; 