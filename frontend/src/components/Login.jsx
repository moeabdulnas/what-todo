const Login = () => {
  return (
    <div className="">
        <form action="" method="POST" id="login">
              <div className="flex flex-col gap-2">
                <section>
                  <label htmlFor="username">Username: </label>
                  <input type="text" name="username" />
                </section>
                <section>
                  <label htmlFor="password">Password: </label>
                  <input type="password" name="password" id="password" />
                </section>
                <button>Login</button>
              </div>
            </form>
    </div>
  )
  
};

export default Login;
