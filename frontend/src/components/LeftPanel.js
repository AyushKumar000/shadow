import Add from "../Svg/Add";
import SVG from "../Svg/SVG";
import chat from "../Svg/chat";
import HistoryChat from "../Ui/HistoryChat";
import { motion } from "framer-motion";
function LeftPanel(props) {
  const handleReload = () => {
    window.location.reload();
  };
  const cppClickHandler = () => {
    props.EpClickhandler(
      '#include <iostream> using namespace std; int main() { int numbers[] = {1, 2, 3, 4, 5}; // Trying to access an element out of bounds (Error) cout << "The sixth element is: " << numbers[5] << endl; return 0; }'
    );
  };
  const pythonClickHandler = () => {
    props.EpClickhandler(
      'def divide_numbers(a, b):   return a / b result = divide_numbers(10, 0)print("Result:", result)'
    );
  };
  const javaClickHandler = () => {
    props.EpClickhandler(
      "public class Main {    public static void main(String[] args) {        String text = null;        System.out.println(text.length());    }}"
    );
  };
  const cClickHandler = () => {
    props.EpClickhandler(
      '#include <stdio.h>int main() {    int a = 5;    int b = 10;    int sum;    // Logical error: The addition operation is incorrect    sum = a * b;  // This should be ddition, not multiplication    printf("The sum of %d and %d is: %d\n", a, b, sum);    return 0;}'
    );
  };

  return (
    <div className="flex flex-col w-[24rem] h-full pl-6 pr-2 py-4 space-y-2">
      <div className="text-white bg-dark_bg px-4 py-3 rounded-lg flex space-x-2">
        <SVG svg={chat} className="w-5 h-5" fill="#FFFFFF" />
        <p className="text-sm font-bold ">Example Prompts</p>
      </div>
      <div className="bg-dark_bg px-4 py-3 rounded-lg flex-auto mb-6 w-full flex flex-col justify-between">
        <div className="space-y-1">
          <HistoryChat text="C++ Example Prompt" onClick={cppClickHandler} />
          <HistoryChat
            text="Python Example Prompt"
            onClick={pythonClickHandler}
          />
          <HistoryChat text="java Example Prompt" onClick={javaClickHandler} />
          <HistoryChat text="C Example Prompt" onClick={cClickHandler} />
        </div>
        {/* new chat */}
        <motion.div
          className="bg-dark_green px-4 py-3 rounded-lg cursor-pointer  flex space-x-2"
          whileTap={{ scale: 0.9 }}
          onClick={handleReload}
        >
          <SVG svg={Add} className="w-5 h-5" />
          <h1 className="text-white font-bold text-sm">New Chat</h1>
        </motion.div>
      </div>
    </div>
  );
}
export default LeftPanel;
