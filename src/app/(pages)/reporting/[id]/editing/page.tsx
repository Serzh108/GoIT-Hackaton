import PageHeader from "@/components/PageHeader/PageHeader";

type Params = {
  id: string;
};

const ReportEditingPage = async ({ params }: { params: Params })  => {
    const { id } = await params;
    
    return(
    <section className="flex flex-col pl-[260px]">
      <PageHeader />
        {/* <ReportEditing  id={id} /> */}
    </section>
  )
};

export default ReportEditingPage;