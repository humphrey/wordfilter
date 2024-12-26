import cs from "classnames";
import { Dropdown } from "react-bootstrap";

interface Props {
  value: number | null;
  onChange: (newValue: number | null) => void;
}

const lengthOptions = [2, 3, 4, 5, 6, 7, 8, 9, 10];

export const LengthBtnGroup = (props: Props) => {
  return (
    <div className="d-flex me-n1 justify-content-between w-100">
      {lengthOptions.map((n) => (
        <button
          key={n}
          className={cs(
            "btn btn-sm btn-outline-secondary px-0 me-1  flex-grow-1",
            props.value === n && "active"
          )}
          onClick={() => props.onChange(n)}
        >
          {n}
        </button>
      ))}
      <button
        className={cs(
          "btn btn-sm btn-outline-secondary px-0  flex-grow-1",
          props.value === null && "active"
        )}
        onClick={() => props.onChange(null)}
      >
        Any
      </button>
    </div>
  );
};

export const LengthSelect = (props: Props) => {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="light" size="sm">
        {props.value ?? "Any length"}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {lengthOptions.map((n) => (
          <Dropdown.Item
            key={n}
            className={cs(
              "btn btn-sm btn-light",
              props.value === n && "active"
            )}
            onClick={() => props.onChange(n)}
          >
            {n}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};
