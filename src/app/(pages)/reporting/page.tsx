import PageHeader from "@/components/PageHeader/PageHeader";
import ReportsList from "@/components/Reporting/ReportsList";

const Reporting = () => {
  return (
    <section className="ml-[256px]">
      <PageHeader isShowEditeImage />
      <ReportsList />
    </section>
  );
};

export default Reporting;
