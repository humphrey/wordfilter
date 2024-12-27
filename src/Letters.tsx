import cs from "classnames";
import { Offcanvas } from "react-bootstrap";
import { WordFilter } from "./Filtering";
import { Keyboard } from "./Keyboard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBroom, faEraser, faTrash } from "@fortawesome/free-solid-svg-icons";

interface Props {
  filter: WordFilter;
  onChange: (newValue: {
    includes: ReadonlyArray<string>;
    excludes: ReadonlyArray<string>;
  }) => void;
}

export const MiniLettersField = ({
  filter: { includes, excludes },
}: {
  filter: WordFilter;
}) => (
  <div className="overflow-x-auto">
    {includes.map((char) => (
      <span key={char} className="fw-bold text-warning me-1">
        {char}
      </span>
    ))}
    {excludes.map((char) => (
      <span key={char} className="fw-bold text-secondary me-1">
        {char}
      </span>
    ))}
    {includes.length === 0 && excludes.length === 0 && (
      <small className="text-muted">&nbsp;</small>
    )}
  </div>
);

export type IncludeExcludeMode = "includes" | "excludes";

export const LettersOffCanvas = (
  props: Props & {
    mode: IncludeExcludeMode;
    onChangeMode: (value: IncludeExcludeMode) => void;
  }
) => {
  const { includes, excludes } = props.filter;
  return (
    <>
      <Offcanvas.Header closeButton>
        <button
          type="button"
          className={cs("btn btn-sm btn-outline-secondary border-0")}
          onClick={() => props.onChange({ includes: [], excludes: [] })}
        >
          <FontAwesomeIcon icon={faBroom} />
        </button>
        <div
          className="btn-group ms-auto"
          role="group"
          aria-label="Select between including letters or excluding them"
        >
          <button
            type="button"
            className={cs(
              "btn btn-sm",
              props.mode === "includes" && "btn-outline-warning active",
              props.mode === "excludes" && "btn-outline-secondary"
            )}
            onClick={() => props.onChangeMode("includes")}
          >
            With
          </button>
          <button
            type="button"
            className={cs(
              "btn btn-sm",
              props.mode === "includes" && "btn-outline-warning",
              props.mode === "excludes" && "btn-outline-secondary active"
            )}
            onClick={() => props.onChangeMode("excludes")}
          >
            Without
          </button>
        </div>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Keyboard
          includes={includes}
          eliminated={excludes}
          onKeyPress={(key) => {
            if (props.mode === "includes") {
              if (includes.includes(key))
                props.onChange({
                  includes: includes.filter((c) => c !== key),
                  excludes,
                });
              else
                props.onChange({
                  includes: [...includes, key].sort(),
                  excludes: excludes.filter((c) => c !== key),
                });
            } else if (props.mode === "excludes") {
              if (excludes.includes(key))
                props.onChange({
                  excludes: excludes.filter((c) => c !== key),
                  includes,
                });
              else
                props.onChange({
                  excludes: [...excludes, key].sort(),
                  includes: includes.filter((c) => c !== key),
                });
            }
          }}
        />
      </Offcanvas.Body>
    </>
  );
};
