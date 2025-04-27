import {
  AiOutlineHome,
  AiFillHome,
  AiOutlineSearch,
  AiOutlineCompass,
  AiFillCompass,
  AiFillMessage,
  AiOutlineMessage,
  AiOutlineHeart,
  AiFillHeart,
  AiOutlinePlusCircle,
  AiFillPlusCircle,
  AiOutlineCamera,
  AiFillCamera,
} from "react-icons/ai";
import { RiVideoFill, RiVideoLine } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { AiOutlineInfoCircle } from "react-icons/ai";

export const mainu = [
  {
    title: "Home",
    icon: <AiOutlineHome className="text-2xl mr-5" />,
    activeIcon: <AiFillHome className="text-2xl mr-5" />,
  },
  {
    title: "About Us",
    icon: <AiOutlineInfoCircle className="text-2xl mr-5" />,
    activeIcon: <AiOutlineInfoCircle className="text-2xl mr-5" />,
  },
  {
    title: "Search",
    icon: <AiOutlineSearch className="text-2xl mr-5" />,
    activeIcon: <AiOutlineSearch className="text-2xl mr-5" />,
  },
  {
    title: "Learning Progress",
    icon: <AiOutlineCompass className="text-2xl mr-5" />,
    activeIcon: <AiFillCompass className="text-2xl mr-5" />,
  },
  {
    title: "Reels",
    icon: <RiVideoLine className="text-2xl mr-5" />,
    activeIcon: <RiVideoFill className="text-2xl mr-5" />,
  },
  {
    title: "Create Reels",
    icon: <RiVideoLine className="text-2xl mr-5" />,
    activeIcon: <RiVideoFill className="text-2xl mr-5" />,
  },
  {
    title: "Learning Plan",
    icon: <AiOutlineMessage className="text-2xl mr-5" />,
    activeIcon: <AiFillMessage className="text-2xl mr-5" />,
  },
  {
    title: "Notifications",
    icon: <AiOutlineHeart className="text-2xl mr-5" />,
    activeIcon: <AiFillHeart className="text-2xl mr-5" />,
  },
  {
    title: "Create Story",
    icon: <AiOutlineCamera className="text-2xl mr-5" />,
    activeIcon: <AiFillCamera className="text-2xl mr-5" />,
  },
  {
    title: "Create Post",
    icon: <AiOutlinePlusCircle className="text-2xl mr-5" />,
    activeIcon: <AiFillPlusCircle className="text-2xl mr-5" />,
  },
  { title: "Profile", icon: <CgProfile className="text-2xl mr-5" />, activeIcon: <CgProfile className="text-2xl mr-5" /> },
];