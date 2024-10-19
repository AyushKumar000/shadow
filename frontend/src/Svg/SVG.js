const SVG = (props) => {
  return (
    <div className={`relative ${props?.className}`}>
      <props.svg
        className={`w-full h-full ${props?.svgClass}`}
        fill={props.fill}
      />
    </div>
  );
};
export default SVG;
