import { motion } from "framer-motion";
function HistoryChat(props) {
  return (
    <motion.div
      className="bg-gray_bg pl-4 pr-2 py-3 rounded-lg relative overflow-hidden group cursor-pointer"
      whileTap={{ scale: 0.9 }}
      onClick={props?.onClick}
    >
      <div className="absolute w-4 h-full top-0 left-[-5%] bg-lime_green group-hover:bg-light_green duration-300 " />
      <p className="text-[#D4D4D4] text-sm font-semibold group-hover:text-white duration-300 ">
        {props.text}
      </p>
    </motion.div>
  );
}
export default HistoryChat;
