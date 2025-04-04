import HomeIcon from "@mui/icons-material/Home";
import ExploreIcon from "@mui/icons-material/Explore";
import NotificationIcon from "@mui/icons-material/Notifications";
import MassageIcon from "@mui/icons-material/Message";
import ListIcon from "@mui/icons-material/ListAlt";
import GroupIcon from "@mui/icons-material/Group";
import VerifiedIcon from "@mui/icons-material/Verified";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PendingIcon from "@mui/icons-material/Pending";


export const navigationMenu = [
   {
    title:"Home",
    icon:<HomeIcon />,
    path:"/home"
   },
   {
    title:"Explore",
    icon:< ExploreIcon />,
    path:"/explore"
   },
   {
    title:"Notification",
    icon:<NotificationIcon />,
    path:"/notification"
   },
   {
    title:"Messages",
    icon:<MassageIcon />,
    path:"/messages"
   },
   {
    title:"List",
    icon:<ListIcon />,
    path:"/list"
   },
   {
    title:"Communities",
    icon:<GroupIcon />,
    path:"/communities"
   },
   {
    title:"Verified",
    icon:<VerifiedIcon />,
    path:"/verified"
   },
   {
    title:"Profile",
    icon:<AccountCircleIcon />,
    path:"/profile"
   },
   {
    title:"More",
    icon:<PendingIcon />,
    path:"/more"
   }

]