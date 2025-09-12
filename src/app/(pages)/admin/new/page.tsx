import PageHeader from '@/components/PageHeader/PageHeader';
import UserEditing from '@/components/Users/UserEditing';

const NewUser = async () => {
  return (
    <section className="flex flex-col pl-[260px] min-h-screen">
      <PageHeader />
      <div className="flex grow justify-center items-center p-6 pt-[120px]">
        <UserEditing />
      </div>
    </section>
  );
};

export default NewUser;
