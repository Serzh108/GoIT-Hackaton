import UserEditing from '@/components/Users/UserEditing';

type Params = {
  id: string;
};

const AdminEditingPage = async ({ params }: { params: Params }) => {
  const { id } = await params;

  return (
    <UserEditing id={id} />
  );
};

export default AdminEditingPage;
