import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Joi from "joi";
import Input from "../component/Input";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const registerSchema = Joi.object({
  memberName: Joi.string().trim().required(),
  password: Joi.string()
    .pattern(/^[0-9]{5,15}$/)
    .trim()
    .required(),
  confirmpassword: Joi.string().valid(Joi.ref("password")).trim().required(),
  mobile: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .required(),
  email: Joi.string().email({ tlds: false }).required(),
});

const validateRegister = (input) => {
  const { error } = registerSchema.validate(input, { abortEarly: false });
  if (error) {
    const result = error.details.reduce((acc, el) => {
      const { message, path } = el;
      acc[path[0]] = message;
      return acc;
    }, []);
    return result;
  }
};

function RegisterPage() {
  const [input, setInput] = useState({
    memberName: "",
    password: "",
    confirmpassword: "",
    email: "",
    mobile: "",
  });

  const [error, setError] = useState({});
  const navigate = useNavigate();

  const { register } = useContext(AuthContext);

  const handleChangeRegister = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmitForm = (e) => {
    try {
      e.preventDefault();
      const validationError = validateRegister(input);
      if (validationError) {
        return setError(validationError);
      }
      setError({});
      register(input);
      navigate("/homepage");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="max-md:flex">
      <div className="flex flex-col h-screen w-auto justify-center items-center gap-4">
        <div className="text-2xl font-medium">REGISTER</div>
        <form
          className="flex flex-col gap-4 p-4 border border-orange-950 rounded-md"
          onSubmit={handleSubmitForm}
        >
          <Input
            type="text"
            placeholder="MemberName"
            name="memberName"
            value={Input.memberName}
            onChange={handleChangeRegister}
            Error={error.memberName}
          />
          {error.memberName && (
            <span className="text-red-700 text-xs">Name is required</span>
          )}
          <Input
            type="password"
            placeholder="Password"
            name="password"
            value={Input.password}
            onChange={handleChangeRegister}
            Error={error.password}
          />
          {error.password && (
            <span className="text-red-700 text-xs">Password is required</span>
          )}
          <Input
            type="password"
            placeholder="Confirmpassword"
            name="confirmpassword"
            value={Input.confirmpassword}
            onChange={handleChangeRegister}
            Error={error.confirmpassword}
          />
          {error.confirmpassword && (
            <span className="text-red-700 text-xs">Password don't match</span>
          )}
          <Input
            type="email"
            placeholder="email"
            name="email"
            value={Input.email}
            onChange={handleChangeRegister}
            Error={error.email}
          />
          {error.email && (
            <span className="text-red-700 text-xs">Email is required</span>
          )}
          <Input
            type="text"
            placeholder="mobile"
            name="mobile"
            value={Input.mobile}
            onChange={handleChangeRegister}
            Error={error.mobile}
          />
          {error.mobile && (
            <span className="text-red-700 text-xs">Mobile is required</span>
          )}
          <button className="border border-orange-900 rounded-md bg-orange-100 font-medium cursor-pointer">
            SIGN UP
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
