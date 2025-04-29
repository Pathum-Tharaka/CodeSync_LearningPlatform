import {
  AiOutlineHome,
  AiFillHome,
  AiOutlineSearch,
  AiOutlineCompass,
  AiFillCompass,
  AiOutlineCopy ,
  AiFillRead ,
  AiOutlineHeart,
  AiFillHeart,
  AiOutlinePlusCircle,
  AiFillPlusCircle,
  AiOutlineInfoCircle,
} from "react-icons/ai";
import { RiVideoFill, RiVideoLine } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";

export const mainu = [
  {
    title: "Home",
    icon: <AiOutlineHome className="text-2xl mr-5" />,
    activeIcon: <AiFillHome className="text-2xl mr-5" />,
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
    title: "Tricks",
    icon: <RiVideoLine className="text-2xl mr-5" />,
    activeIcon: <RiVideoFill className="text-2xl mr-5" />,
  },
  {
    title: "Course Plan",
    icon: <AiOutlineCopy   className="text-2xl mr-5" />,
    activeIcon: <AiOutlineCopy   className="text-2xl mr-5" />,
  },
  {
    title: "Notifications",
    icon: <AiOutlineHeart className="text-2xl mr-5" />,
    activeIcon: <AiFillHeart className="text-2xl mr-5" />,
  },
  {
    title: "Create",
    icon: <AiOutlinePlusCircle className="text-2xl mr-5" />,
    activeIcon: <AiFillPlusCircle className="text-2xl mr-5" />,
    subMenu: [
      { title: "Create Post" },
      { title: "Learn Tricks" },
      { title: "Catchup" },
    ],
  },
  {
    title: "About Us",
    icon: <AiOutlineInfoCircle className="text-2xl mr-5" />,
    activeIcon: <AiOutlineInfoCircle className="text-2xl mr-5" />,
  },
  {
    title: "Profile",
    icon: <CgProfile className="text-2xl mr-5" />,
    activeIcon: <CgProfile className="text-2xl mr-5" />,
  },
];
