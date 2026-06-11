import { useState, useImperativeHandle } from "react";

const Togglable = ({ buttonLabel, children, ref }) => {
  const [visible, setVisible] = useState(false);
  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };
  const toggleVisibile = () => setVisible(!visible);

  useImperativeHandle(ref, () => {
    return { toggleVisibile };
  });

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibile}>{buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {children}
        <button onClick={toggleVisibile}>cancel</button>
      </div>
    </div>
  );
};

export default Togglable;
