import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Joi from "joi";
import Input from "../component/Input";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const LoginSchema = Joi.object({
  email: Joi.string().email({ tlds: false }).required(),
  password: Joi.string()
    .pattern(/^[0-9]{5,15}$/)
    .trim()
    .required(),
});

const validateLogin = (input) => {
  const { error } = LoginSchema.validate(input, { abortEarly: false });
  if (error) {
    const result = error.details.reduce((acc, el) => {
      const { message, path } = el;
      acc[path[0]] = message;
      return acc;
    }, []);
    return result;
  }
};

function LoginPage() {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({});
  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const handleChangeLogin = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmitForm = async (e) => {
    try {
      e.preventDefault();
      const validationError = validateLogin(input);
      if (validationError) {
        return setError(validationError);
      }
      setError({});
      await login(input);
      navigate("/homepage");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="max-md:flex">
      <div className="flex flex-col h-screen w-auto justify-center items-center gap-4">
        <div className="text-2xl font-medium">LOGIN</div>
        <form
          className="flex flex-col gap-4 p-4 border border-orange-950 rounded-md"
          onSubmit={handleSubmitForm}
        >
          <Input
            type="text"
            placeholder="Email"
            name="email"
            value={Input.email}
            onChange={handleChangeLogin}
            Error={error.email}
          />
          {error.email && (
            <span className="text-red-700 text-xs">Email is required</span>
          )}
          <Input
            type="password"
            placeholder="Password"
            name="password"
            value={Input.password}
            onChange={handleChangeLogin}
            Error={error.password}
          />
          {error.password && (
            <span className="text-red-700 text-xs">Password is required</span>
          )}
          <button className="border border-orange-900 rounded-md bg-orange-100 font-medium cursor-pointer">
            SIGN IN
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
