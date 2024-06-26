import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import logo from "../assets/images/black-vfans.png";
import googleLogo from "../assets/images/google.png";

export default function Login() {
  const [formData, setFormdata] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [message, setMessage] = useState({
    msg: "",
    success: false,
  });
  const [shake, setShake] = useState(false);

  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
    });
  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-left",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`auth/login`, formData, {
        withCredentials: true,
      });
      console.log(data);
      const { success, message } = data;
      if (success) {
        handleSuccess(message);
        setMessage({ msg: "Logged in successfully!", success: true });
        setTimeout(() => {
          localStorage.setItem("redirectedFromLogin", "true");
          navigate("/home");
        }, 1000);
      } else {
        setMessage({ msg: data.message, success: false });
        handleError(message);
        if (message) {
          setShake(true);
          setTimeout(() => setShake(false), 300);
        }
      }
    } catch (error) {
      console.error("Error logging in", error);
    }
  };

  const handleChange = (e) => {
    setFormdata({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-darkest-black h-full w-full min-h-[100vh] grid grid-rows-4 xl:grid-cols-2 xl:grid-rows-1 gap-0">
      <section className="bg-emerald-green row-span-1 xl:col-span-1 bottom-0 top-0 left-0 right-0 h-auto xl:rounded-bl-[90px] xl:rounded-tl-[90px] xl:ml-[4rem] xl:my-[3.8rem]">
        <a href="/home" className="xl:mt-20 xl:ml-20 mt-8 ml-8 absolute">
          <img
            src={logo}
            alt="vfans"
            className="xl:h-[3.5rem] h-[2.5rem]"
          />
        </a>
        <div className="flex flex-col text-center text-nowrap w-auto h-full justify-center mx-[20%]">
          <h1 className="font-semibold xl:text-[1.5rem] text-[1.25rem]">
            Welcome back to
          </h1>
          <h1 className="font-bold xl:text-[5rem] text-[3.25rem]">VFans!</h1>
        </div>
      </section>
      <section className="bg-primary flex items-center justify-center row-span-3 xl:col-span-1 text-wrap bottom-0 top-0 left-0 right-0 px-[6rem] shadow-2xl shadow-primary p-10">
        <div className="w-full max-w-[550px]">
          <h1 className="text-emerald-green font-bold text-[1.6rem]">Login</h1>
          <p className="text-emerald-green font-medium text-sm mt-[16px]">
            Welcome back! Please login to your account.
          </p>
          <button className="bg-white rounded-[10px] w-full h-[52px] flex items-center justify-between mt-8 px-4">
            <img
              src={googleLogo}
              alt="google"
              className="size-8"
            />
            <p className="text-[#7B7B7B] text-sm p-6">Use Google account</p>
            <div></div>
          </button>
          <div className="flex items-center gap-2 my-5">
            <div className="flex-grow bg-emerald-green h-[1.35px]"></div>
            <div className="text-emerald-green text-sm">or</div>
            <div className="flex-grow bg-emerald-green h-[1.35px]"></div>
          </div>
          <p className={`text-start mb-3 font-normal ${message.success ? 'text-green-400' : `text-rose-500 ${shake ? 'animate-shake' : ''}`}`}>{message.msg}</p>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4 h-auto">
              <input
                type="text"
                name="email"
                placeholder="Email"
                className="text-sm font-normal placeholder-[##7B7B7B] text-white bg-dark-field border-[0.5px] border-emerald-green rounded-[10px] py-4 px-4 focus:outline-none"
                onChange={handleChange}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="text-sm font-normal placeholder-[##7B7B7B] text-white bg-dark-field border-[0.5px] border-emerald-green rounded-[10px] py-4 px-4 focus:outline-none"
                onChange={handleChange}
              />
            </div>
            <button
              type="submit"
              className="text-base text-white font-bold bg-emerald-green w-full xl:mt-8 mt-6 xl:py-6 py-4 rounded-[10px]"
            >
              LOGIN
            </button>
            <p className="font-normal text-xs text-emerald-green mt-4 text-center">
              new to VFans?
              <span className="text-white underline m-1">
                <a href="/signup">Create an account</a>
              </span>
            </p>
          </form>
        </div>
      </section>
    </div>
  );
}
