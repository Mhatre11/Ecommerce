import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../../redux/Features/auth/authSlice";
import { useProfileMutation } from "../../redux/Api/usersApiSlice";
import { 
  Avatar, 
  Typography, 
  Button, 
  Input, 
  Card, 
  CardBody, 
  CardHeader 
} from "@material-tailwind/react";
import { 
  UserIcon, 
  EnvelopeIcon, 
  PencilIcon 
} from "@heroicons/react/24/solid";

const Profile = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [username, setUsername] = useState(userInfo?.username || "");
  const [email, setEmail] = useState(userInfo?.email || "");

  const [profileMutation] = useProfileMutation();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await profileMutation({
        username,
        email,
      }).unwrap();
      dispatch(setCredentials({ ...res }));
    } catch (err) {
      console.error("Profile update failed", err);
    }
  };

  return (
    <Card className="w-full max-w-[24rem] mx-auto shadow-lg">
      <CardHeader 
        floated={false} 
        className="h-32 bg-gradient-to-r from-blue-500 to-blue-700 flex items-center justify-center"
      >
        <Avatar
          src={
            userInfo?.avatar ||
            "https://docs.material-tailwind.com/img/face-2.jpg"
          }
          alt="Profile Avatar"
          size="xl"
          className="border-4 border-white shadow-lg"
        />
      </CardHeader>
      <CardBody className="text-center">
        <Typography variant="h4" color="blue-gray" className="mb-2">
          {username}
        </Typography>
        <Typography color="gray" className="font-normal mb-6">
          {email}
        </Typography>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            variant="outlined"
            label="Username"
            icon={<UserIcon className="h-5 w-5" />}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mb-4"
          />
          <Input
            variant="outlined"
            label="Email"
            icon={<EnvelopeIcon className="h-5 w-5" />}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-4"
          />
          <Button 
            type="submit" 
            fullWidth 
            className="flex items-center justify-center gap-3"
          >
            <PencilIcon className="h-5 w-5" />
            Update Profile
          </Button>
        </form>
      </CardBody>
    </Card>
  );
};

export default Profile;