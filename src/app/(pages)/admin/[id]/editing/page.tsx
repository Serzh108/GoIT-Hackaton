import PageHeader from '@/components/PageHeader/PageHeader';
import UserEditing from '@/components/Users/UserEditing';

type Params = {
  id: string;
};

const AdminEditingPage = async ({ params }: { params: Params }) => {
  const { id } = await params;

  return (
    <section className="flex flex-col pl-[260px] min-h-screen">
      <PageHeader />
      <div className="flex grow justify-center items-center p-6 pt-[120px]">
        <UserEditing id={id} />
      </div>
    </section>
  );
};

export default AdminEditingPage;
