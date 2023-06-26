const Login = () => {
  return (
    <div className="absolute h-screen w-screen bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%">
      <section className="mx-auto mt-12 flex w-2/3 items-center justify-center rounded-lg bg-teal-100 p-6 sm:w-1/2 md:w-2/5">
        <form action="" method="POST" id="login">
          <div className="flex flex-col items-center gap-2">
            {/* <section> */}
            <label htmlFor="username" className="text-2xl">
              Username{" "}
            </label>
            <input
              type="text"
              name="username"
              className="w-56 rounded px-2 py-1"
            />
            {/* </section> */}
            {/* <section> */}
            <label htmlFor="password" className="mt-4 rounded text-2xl">
              Password{" "}
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="w-56 rounded px-2 py-1"
            />
            {/* </section> */}
            <button className="mt-12 w-28 rounded-lg bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% py-2 text-3xl text-white">
              Login
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Login;
