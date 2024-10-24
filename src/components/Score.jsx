import { TRUNS } from "../constants";

export const Score = ({ scoreX, scoreO }) => {
  return (
    <div className="score">
      <span>
        {TRUNS.X}
        {scoreX}
      </span>
      <span>
        {TRUNS.O}
        {scoreO}
      </span>
    </div>
  );
};
