import PageHeader from "@/components/PageHeader/PageHeader";
import UserEditing from "@/components/Users/UserEditing";

const NewUser = async () => {
  return(
    <section className="flex flex-col pl-[260px]">
      <PageHeader />
      <UserEditing />
    </section>
  )  
};

export default NewUser; 