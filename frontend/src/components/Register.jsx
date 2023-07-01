import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [prompt, setPrompt] = useState("");

  const navigate = useNavigate("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    const passwordMatch = e.target.passwordMatch.value;

    if (password === passwordMatch) {
      setUsername(username);
      setPassword(password);
      setPrompt("");
    } else {
      setPrompt("Password inputs don't match.");
    }
  };

  useEffect(() => {
    const register = async () => {
      try {
        const res = await fetch("http://localhost:5012/api/users/signup", {
          method: "POST",
          mode: "cors",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username: username, password: password }),
        });
        console.log(res);
        if (res.status === 409) {
          setPrompt("User with this username exists");
        } else if (res.ok) {
          props.setLoggedIn(true);
          navigate("/");
          window.location.reload();
        } else {
          setPrompt("Something went wrong. Please try again. ");
        }
      } catch (error) {
        console.error(error);
      }
    };
    if (username && password) register();
  }, [username, password]);
  return (
    <div className="absolute h-screen w-screen bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%">
      <section className="mx-auto mt-12 flex w-2/3 items-center justify-center rounded-lg bg-teal-100 p-6 sm:w-1/2 md:w-2/5">
        <form onSubmit={handleSubmit} id="register">
          <section className="flex flex-col items-center gap-2">
            <label htmlFor="username" className="text-xl">
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              className="w-56 rounded px-2 py-1"
              required
            />
            <label htmlFor="password" className="text-xl">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="w-56 rounded px-2 py-1"
              required
            />
            <label htmlFor="passwordMatch" className="text-xl">
              Enter password again
            </label>
            <input
              type="password"
              name="passwordMatch"
              id="passwordMatch"
              className="w-56 rounded px-2 py-1"
              required
            />
            <p id="prompt">{prompt}</p>
            <button
              type="submit"
              className="mt-6 w-32 rounded-lg bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% px-4 py-2 text-2xl text-white"
            >
              Register
            </button>
          </section>
        </form>
      </section>
    </div>
  );
};

export default Register;
