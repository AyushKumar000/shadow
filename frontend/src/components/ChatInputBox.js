import chat from "../Svg/chat";
import right_arrow from "../Svg/right_arrow";
import SVG from "../Svg/SVG";
import { motion } from "framer-motion";

function ChatInputBox(props) {
  return (
    <div
      className={`${
        props?.className ? props.className : ""
      } bg-white rounded-md overflow-hidden flex items-center px-1`}
    >
      <SVG svg={chat} fill="#202020" className="w-6 h-6" />
      <input
        placeholder="Enter your code here... "
        className="text-xs px-2 py-3 outline-none flex-auto"
      />
      <div className="cursor-pointer  ">
        <motion.div whileTap={{ scale: 0.8 }}>
          <SVG svg={right_arrow} className="w-8 h-8" />
        </motion.div>
      </div>
    </div>
  );
}
export default ChatInputBox;
