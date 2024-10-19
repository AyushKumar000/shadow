import Add from "../Svg/Add";
import SVG from "../Svg/SVG";
import chat from "../Svg/chat";
import HistoryChat from "../Ui/HistoryChat";
import { motion } from "framer-motion";
function LeftPanel() {
  return (
    <div className="flex flex-col w-[18rem] h-full pl-6 pr-2 py-4 space-y-2">
      <div className="text-white bg-dark_bg px-4 py-3 rounded-lg flex space-x-2">
        <SVG svg={chat} className="w-5 h-5" fill="#FFFFFF" />
        <p className="text-sm font-bold ">My Chats</p>
      </div>
      <div className="bg-dark_bg px-4 py-3 rounded-lg flex-auto mb-6 w-full flex flex-col justify-between">
        <div className="space-y-1">
          <HistoryChat text="Greetings.." />
          <HistoryChat text="Hey.." />
          <HistoryChat text="Problem of the day.." />
          <HistoryChat text="lorem ipsum.." />
        </div>
        {/* new chat */}
        <motion.div
          className="bg-dark_green px-4 py-3 rounded-lg cursor-pointer  flex space-x-2"
          whileTap={{ scale: 0.9 }}
        >
          <SVG svg={Add} className="w-5 h-5" />
          <h1 className="text-white font-bold text-sm">New Chat</h1>
        </motion.div>
      </div>
    </div>
  );
}
export default LeftPanel;
