import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLoginMutation } from "../../redux/Api/usersApiSlice";
import { setCredentials } from "../../redux/Features/auth/authSlice";
import { toast } from "react-toastify";
import { Card, Typography, Input, Button } from "@material-tailwind/react";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/solid";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);

  const togglePasswordVisiblity = () => setPasswordShown((cur) => !cur);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      console.log('Login Attempt:', { email, password });
      
      const response = await login({ email, password }).unwrap();
      
      console.log('Login Response:', response);
      console.log('Dispatching Credentials:', { 
        ...response, 
        token: response.token 
      });

      dispatch(setCredentials({ 
        ...response, 
        token: response.token 
      }));

      // Verify token in localStorage
      console.log('Token in localStorage after login:', localStorage.getItem('token'));

      // Check if the user is an admin
      if (response.isAdmin) {
        navigate("/admin/dashboard");
        toast.success("Admin login successful");
      } else {
        navigate(redirect);
        toast.success("Login successful");
      }
    } catch (error) {
      console.error('Login Error:', {
        errorData: error?.data,
        errorMessage: error.message,
        fullError: error
      });
      toast.error(error?.data?.message || error.message);
    }
  };

  const handleGoogleSignIn = () => {
    // TODO: Implement Google Sign-In logic
    toast.info("Google Sign-In coming soon!");
  };

  return (
    <section className=" my-32 flex items-center justify-center">
      <Card color="transparent" shadow={false} className="mx-auto max-w-md">
        <Typography variant="h4" color="blue-gray">
          Sign In
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Welcome back! Enter your credentials to login.
        </Typography>

        <Button
          onClick={handleGoogleSignIn}
          className="
            mt-6 
            w-full 
            bg-white 
            text-[#4285F4] 
            border 
            border-[#4285F4] 
            hover:bg-[#4285F4]/10 
            flex 
            items-center 
            justify-center 
            space-x-2
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            width="24"
            height="24"
          >
            <path
              fill="#4285F4"
              d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z"
            />
            <path
              fill="#34A853"
              d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.32-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z"
            />
            <path
              fill="#FBBC05"
              d="M11.68 28.18c-.44-1.32-.69-2.73-.69-4.18s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24s.85 6.91 2.34 9.88l7.34-5.7z"
            />
            <path
              fill="#EA4335"
              d="M24 9.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 3.29 29.93 1 24 1 15.4 1 7.96 5.93 4.34 14.12l7.34 5.7c1.74-5.2 6.59-9.07 12.32-9.07z"
            />
          </svg>
          <span>Continue with Google</span>
        </Button>

        <div className="flex items-center justify-center my-4">
          <div className="border-t border-gray-300 w-full"></div>
          <span className="px-3 text-gray-500 bg-white">OR</span>
          <div className="border-t border-gray-300 w-full"></div>
        </div>

        <form
          onSubmit={submitHandler}
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
        >
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Your Email
            </Typography>
            <Input
              size="lg"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="
                !border-t-blue-gray-200 focus:!border-t-gray-900
              "
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />

            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Password
            </Typography>
            <Input
              type={passwordShown ? "text" : "password"}
              size="lg"
              placeholder="********"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="
                !border-t-blue-gray-200 focus:!border-t-gray-900
              "
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              icon={
                passwordShown ? (
                  <EyeSlashIcon
                    onClick={togglePasswordVisiblity}
                    className="h-5 w-5 cursor-pointer"
                  />
                ) : (
                  <EyeIcon
                    onClick={togglePasswordVisiblity}
                    className="h-5 w-5 cursor-pointer"
                  />
                )
              }
            />
          </div>

          <Button type="submit" className="mt-6" fullWidth>
            Sign In
          </Button>

          <Typography variant="small" className="mt-4 flex justify-center">
            Don&apos;t have an account?{" "}
            <Link
              to="/register"
              className="ml-1 font-bold text-blue-500 transition-colors hover:text-blue-700"
            >
              Sign up
            </Link>
          </Typography>
        </form>
      </Card>
    </section>
  );
};

export default Login;
