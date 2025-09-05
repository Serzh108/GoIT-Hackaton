import PageHeader from "@/components/PageHeader/PageHeader";
import UsersList from "@/components/UsersList/UsersList";

const Admin = async () => {
  return(
    <section className="pageWrapper">
      <h1>Admin Page</h1>
      <PageHeader />
      <UsersList />
    </section>
  )
};

export default Admin; 