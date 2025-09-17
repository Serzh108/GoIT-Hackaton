import ReportEditing from "@/components/Reporting/ReportEditing";

type Params = {
  id: string;
};

const ReportEditingPage = async ({ params }: { params: Params })  => {
  const { id } = await params;
    
  return(
    <ReportEditing  id={id} />
  )
};

export default ReportEditingPage;