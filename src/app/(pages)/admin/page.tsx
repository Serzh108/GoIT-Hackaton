import PageHeader from "@/components/PageHeader/PageHeader";
import UsersList from "@/components/Users/UsersList";

const Admin = async () => {
  return(
    <section className="pageWrapper">
      <PageHeader isShowEditeImage />
      <UsersList />
    </section>
  )
};

export default Admin; 