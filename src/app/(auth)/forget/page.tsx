export default function Page() {
  return (
    <div
      className="flex flex-col items-center justify-center w-full max-w-[600px] shadow-[5px_30px_31px_0px_rgba(101,101,83,0.3)]"
    >
      <h1 className="mb-8 text-xl leading-[30px] font-semibold">
        Відновити пароль
      </h1>
      <p className="mb-5 font-normal text-base">
        Для відновлення паролю введіть Вашу електронну адресу. Вам надійде лист
        із посиланням для зміни паролю.
      </p>
    </div>
  );
}