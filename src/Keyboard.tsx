import cs from "classnames";

const ENTER_KEY = "⏎";
const BACKSPACE_KEY = "⌫";
const SPACE_KEY = "␣";
const isSpecialKey = (char: string) =>
  char === ENTER_KEY || char === BACKSPACE_KEY || char === SPACE_KEY;

const keys = ["qwertyuiop", "asdfghjkl", SPACE_KEY + "zxcvbnm" + BACKSPACE_KEY];

interface Props {
  onKeyPress: (key: string) => void;
  onBackspace?: () => void;
  onSpacebar?: () => void;
  includes?: ReadonlyArray<string>;
  eliminated?: ReadonlyArray<string>;
}

export const Keyboard = (props: Props) => {
  const chars = keys.map((row) =>
    Array.from(row, (char) => char).filter((char) => {
      if (char === BACKSPACE_KEY) {
        return props.onBackspace !== undefined;
      }
      if (char === SPACE_KEY) {
        return props.onSpacebar !== undefined;
      }
      return true;
    })
  );

  return (
    <div>
      {chars.map((row, rowIndex) => (
        <div key={rowIndex} className="my-1 d-flex justify-content-center">
          {row.map((char) => (
            <Key
              key={char}
              char={char}
              onClick={() => {
                if (props.onBackspace && char === BACKSPACE_KEY)
                  props.onBackspace();
                else if (props.onSpacebar && char === SPACE_KEY)
                  props.onSpacebar();
                else props.onKeyPress(char);
              }}
              included={props.includes?.includes(char)}
              eliminated={props.eliminated?.includes(char)}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

interface KeyProps {
  char: string;
  onClick: () => void;
  eliminated?: boolean;
  included?: boolean;
}

const Key = ({ char, onClick, eliminated, included }: KeyProps) => {
  return (
    <button
      className={cs(
        "btn btn-outline-dark me-1 px-0",
        isSpecialKey(char) && "fw-bold",
        eliminated && "bg-dark-subtle text-muted",
        included && "bg-warning-subtle text-muted"
      )}
      style={{ width: isSpecialKey(char) ? "40px" : "30px" }}
      onClick={onClick}
    >
      {char}
    </button>
  );
};
