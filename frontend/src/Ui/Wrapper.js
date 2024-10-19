function Wrapper(props) {
  return (
    <div
      className={`${
        props?.className ? props.className : ""
      } mx-auto max-w-7xl h-full`}
    >
      {props.children}
    </div>
  );
}
export default Wrapper;
