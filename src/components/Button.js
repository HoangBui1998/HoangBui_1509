import PropTypes from "prop-types";

const Button = ({ color, text, onClick }) => {
  return (
    <button
      onClick={onClick}
      style={{ backgroundColor: color }}
      className="btn"
    >
      {text}
    </button>
  );
};

Button.defaultProps = {
  color: "stellblue",
};

Button.propTypes = {
  text: "PropType.string",
  color: "PropYype.string",
};
export default Button;
