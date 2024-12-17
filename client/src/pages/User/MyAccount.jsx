import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/Features/auth/authSlice";
import { useNavigate, Outlet, NavLink, useLocation } from "react-router-dom";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  IconButton,
  Drawer,
} from "@material-tailwind/react";
import {
  TicketIcon,
  HeartIcon,
  TruckIcon,
  KeyIcon,
  UserCircleIcon,
  ArrowLeftStartOnRectangleIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/solid";

const SIDEBAR_ITEMS = [
  { icon: TicketIcon, label: "Orders", path: "/my-account/orders" },
  { icon: HeartIcon, label: "Wishlist", path: "/my-account/wishlist" },
  { icon: TruckIcon, label: "Address", path: "/my-account/address" },
  { icon: KeyIcon, label: "Password", path: "/my-account/password" },
  {
    icon: UserCircleIcon,
    label: "Account Details",
    path: "/my-account/profile",
  },
];

const MyAccount = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const location = useLocation();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const SidebarContent = () => (
    <List>
      {SIDEBAR_ITEMS.map((item, index) => (
        <ListItem
          key={index}
          className={
            location.pathname === item.path
              ? "text-blue-500 bg-blue-50"
              : "text-gray-700 hover:bg-blue-50"
          }
        >
          <NavLink
            to={item.path}
            className="flex items-center w-full"
            onClick={() => setOpenDrawer(false)}
          >
            <ListItemPrefix>
              <item.icon className="h-5 w-5" />
            </ListItemPrefix>
            {item.label}
          </NavLink>
        </ListItem>
      ))}

      <ListItem onClick={handleLogout}>
        <ListItemPrefix>
          <ArrowLeftStartOnRectangleIcon className="h-5 w-5" />
        </ListItemPrefix>
        Logout
      </ListItem>
    </List>
  );

  return (
    <div className="flex mt-8">
      {/* Mobile Hamburger Button */}
      <div className="md:hidden fixed top-4 right-4 z-50">
        <IconButton variant="text" onClick={() => setOpenDrawer(true)}>
          <Bars3Icon className="h-6 w-6" />
        </IconButton>
      </div>

      {/* Desktop Sidebar */}
      <Card className="hidden ml-10 md:block w-64 h-[40rem] shadow-xl">
        <div className="mb-4 p-4">
          <img
            src={
              userInfo?.avatar ||
              "https://www.material-tailwind.com/logos/mt-logo.png"
            }
            alt="Profile"
            className="h-10 w-10 rounded-full mb-2"
          />
          <Typography variant="h5" color="blue-gray">
            My Account
          </Typography>
        </div>

        <SidebarContent />
      </Card>

      {/* Mobile Drawer */}
      <Drawer
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        className="md:hidden"
      >
        <div className="mb-4 p-4 flex items-center justify-between">
          <Typography variant="h5" color="blue-gray">
            My Account
          </Typography>
          <IconButton variant="text" onClick={() => setOpenDrawer(false)}>
            <XMarkIcon className="h-6 w-6" />
          </IconButton>
        </div>
        <SidebarContent />
      </Drawer>

      {/* Content Area */}
      <div className="flex-1 md:ml-[10rem] lg:ml-[23rem] my-[3rem] w-full max-w-4xl">
        <Outlet />
      </div>
    </div>
  );
};

export default MyAccount;
