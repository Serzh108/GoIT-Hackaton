import PageHeader from '@/components/PageHeader/PageHeader';
import ReportsList from '@/components/Reporting/ReportsList';

const Reporting = () => {
  return (
    <section className="flex flex-col justify-center items-center w-full ml-[256px] ">
      <PageHeader isShowEditeImage />
      <ReportsList />
    </section>
  );
};

export default Reporting;
