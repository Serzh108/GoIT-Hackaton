import PageHeader from "@/components/PageHeader/PageHeader";
import UserEditing from "@/components/UsersList/UserEditing";

type Params = {
  id: string;
};

const AdminEditingPage = async ({ params }: { params: Params }) => {
  const { id } = await params;

  return(
    <section className="flex flex-col pl-[260px]">
      <PageHeader />
      <UserEditing id={id} />
    </section>
  ) 
};

export default AdminEditingPage;