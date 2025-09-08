import PageHeader from "@/components/PageHeader/PageHeader";
import ReportEditing from "@/components/Reporting/ReportEditing";

const NewReport = async () => {
  return(
    <section className="flex flex-col pl-[260px]">
      <PageHeader />
      <ReportEditing />
    </section>
  )  
};

export default NewReport; 