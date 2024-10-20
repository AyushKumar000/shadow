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
      'C++ code:\n ```cpp #include <iostream> using namespace std;\n int main()\n { int numbers[] = {1, 2, 3, 4, 5}; // Trying to access an element out of bounds (Error) \ncout << "The sixth element is: " << numbers[5] << endl;\n return 0; }'
    );
  };
  const pythonClickHandler = () => {
    props.EpClickhandler(
      'Python Code:\n```python \ndef divide_numbers(a, b):\n return a / b \nresult = divide_numbers(10, 0) \nprint("Result:", result)'
    );
  };
  const javaClickHandler = () => {
    props.EpClickhandler(
      "Java Code: \n  ```java \n public class Main (public static void main(String[] args) \n{       \n String text = null;      \n  System.out.println(text.length());  \n    }\n}"
    );
  };
  const cClickHandler = () => {
    props.EpClickhandler(
      'C : \n ```C \n#include <stdio.h>\nint main() \n{  \n  int a = 5;   \n int b = 10;  \n  int sum;    // Logical error: The addition operation is incorrect  \n  sum = a * b;  // This should be ddition, not multiplication \n   printf("The sum of %d and %d is: %d\n", a, b, sum);  \n  return 0;\n}'
    );
  };
  const gitClickHandler = ()=>{
    props.EpClickhandler("https://github.com/sudiirkumar/AuthPanel");
  }

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
          <HistoryChat text="Git Example Prompt" onClick={gitClickHandler} />
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
