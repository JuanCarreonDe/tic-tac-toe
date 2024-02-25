const Square = ({ children, isSelected, updateBoard, i }) => {
    const className = `square ${isSelected ? "is-selected" : ""}`;
  
    const handleClick = () => {
      updateBoard(i);
    };
  
    return (
      <div className={className} onClick={handleClick}>
        {children}
      </div>
    );
  };

  export default Square