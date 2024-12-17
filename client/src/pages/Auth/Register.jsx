import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from '../../redux/Features/auth/authSlice';
import { useRegisterMutation } from '../../redux/Api/usersApiSlice';
import { toast } from 'react-toastify';

import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/solid";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register] = useRegisterMutation();
  const { userInfo } = useSelector((state) => state.auth)
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/';

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const togglePasswordVisibility = () => setPasswordShown((cur) => !cur);

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleAgreeTermsChange = (e) => setAgreeTerms(e.target.checked);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!agreeTerms) {
      toast.error("Please agree to the terms and conditions");
      return;
    }
    try {
      const response = await register({ username, email, password }).unwrap();
      dispatch(setCredentials({ ...response }));
      navigate(redirect);
      toast.success("Registration successful");
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  };

  return (
    <section className='my-32 flex items-center justify-center'>
      <Card color="transparent" shadow={false} className='mx-auto max-w-md'>
        <Typography variant="h4" color="blue-gray">
          Sign Up
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Nice to meet you! Enter your details to register.
        </Typography>

        {/* form */}
        <form onSubmit={handleSubmit} className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-1 flex flex-col gap-6">

            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Username
            </Typography>
            {/* Username input */}
            <Input
              id="username"
              color="gray"
              size="lg"
              type="text"
              name="username"
              placeholder="Choose a username"
              value={username}
              onChange={handleUsernameChange}
              className="
               !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />

            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Your Email
            </Typography>
            {/* Email input */}
            <Input
              id="email"
              color="gray"
              size="lg"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={handleEmailChange}
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
            {/* Password input */}
            <Input
              id="password"
              size="lg"
              type={passwordShown ? "text" : "password"}
              name="password"
              placeholder="Create a strong password"
              value={password}
              onChange={handlePasswordChange}
              className="
               !border-t-blue-gray-200 focus:!border-t-gray-900
               
              "
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              outline="true"
              variant="outlined"
              icon={
                <i
                  onClick={togglePasswordVisibility}
                  className="
                    cursor-pointer 
                    text-[#6C757D] 
                    opacity-60
                    hover:opacity-100
                    transition-opacity
                    duration-300
                  "
                >
                  {passwordShown ? (
                    <EyeIcon className="h-5 w-5" />
                  ) : (
                    <EyeSlashIcon className="h-5 w-5" />
                  )}
                </i>
              }
            />
          </div>

          <Checkbox
            label={
              <Typography
                variant="small"
                color="gray"
                className="flex items-center font-normal"
              >
                I agree to the
                <Link
                  to="/terms"
                  className="
                      font-medium 
                      transition-colors 
                      hover:text-[#007bff] 
                      ml-1"
                >
                  Terms and Conditions
                </Link>
              </Typography>
            }
            containerProps={{ className: "-ml-2.5" }}
            color="blue"
            checked={agreeTerms}
            onChange={handleAgreeTermsChange}
          />

          <Button className="mt-6" variant='filled' type='submit' fullWidth>
            sign up
          </Button>

          <Typography
            variant="small"
            className="
              mt-4 
              flex 
              justify-center 
              text-[#6C757D]
              text-base
            "
          >
            Already have an account?{" "}
            <Link
              to="/login"
              className="
                ml-1 
                font-bold 
                text-[#007bff]
                hover:text-[#0056b3]
                transition-colors
                text-base
              "
            >
              Sign In
            </Link>
          </Typography>
        </form>
      </Card>
    </section>
  );
};

export default Register;
