import PageHeader from '@/components/PageHeader/PageHeader';
import UsersList from '@/components/Users/UsersList';

const Admin = async () => {
  return (
    <section className="flex flex-col justify-center items-center w-full ml-[256px] ">
      <PageHeader isShowEditeImage />
      <UsersList />
    </section>
  );
};

export default Admin;
