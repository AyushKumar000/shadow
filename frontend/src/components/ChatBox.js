import chat from "../Svg/chat";
import SVG from "../Svg/SVG";
import ChatInputBox from "./ChatInputBox";
import { motion } from "framer-motion";
function ChatBox() {
  const text = "How Can I Help You Today?".split(" ");
  const subText =
    "we can assist you to find vulnerabilities in your code".split(" ");
  return (
    <div className="flex-auto py-4 pl-2 pr-4 ">
      <div className="bg-dark_bg w-full h-full rounded-lg flex items-center justify-center">
        <div>
          <motion.div
            drag
            dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
            className="cursor-grab"
          >
            <SVG className="mx-auto my-6 w-8 h-8" svg={chat} fill="#51DA4C" />
          </motion.div>

          <motion.h1 className="text-white font-extralight text-4xl tracking-[-2px] ">
            {text.map((el, i) => (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 2,
                  delay: i / 10,
                }}
                key={i}
              >
                {el}{" "}
              </motion.span>
            ))}
          </motion.h1>
          <p className="text-[#909090] mt-2 text-center font-light ">
            {subText.map((el, i) => (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 2,
                  delay: i / 10,
                }}
                key={i}
              >
                {el}{" "}
              </motion.span>
            ))}
          </p>
          <ChatInputBox className="mt-16" />
        </div>
      </div>
    </div>
  );
}
export default ChatBox;
