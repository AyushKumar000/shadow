import Wrapper from "../Ui/Wrapper";
import ChatBox from "./ChatBox";
import LeftPanel from "./LeftPanel";

function ChatUi() {
  return (
    <Wrapper className="flex ">
      <LeftPanel />
      <ChatBox />
    </Wrapper>
  );
}
export default ChatUi;
