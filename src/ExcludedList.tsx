import { WordFilter } from "./Filtering";
import React from "react";
import cs from "classnames";
import { Keyboard } from "./Keyboard";
import { Offcanvas } from "react-bootstrap";

interface Props {
  // focus: boolean
  // onFocus: () => void
  // onBlur: () => void
  filter: WordFilter;
  onChange: (newValue: {
    includes: ReadonlyArray<string>;
    excludes: ReadonlyArray<string>;
  }) => void;
}

// export const useIncludedLettersField = (props: Props) => {
//   const { includes, excludes } = props.filter;
//   return {
//     onClear: () => props.onChange({ includes: [], excludes: [] }),
//     Field: () => (
//       <button
//         className={cs(
//           "btn d-block",
//           props.focus ? "btn-outline-primary" : "btn-light"
//         )}
//         onClick={() => props.onFocus()}
//       >
//         {props.filter.includes.map((char) => (
//           <span key={char} className="fw-bold text-warning me-1">
//             {char}
//           </span>
//         ))}
//         {props.filter.includes.length === 0 && (
//           <small className="text-muted">&mdash;</small>
//         )}
//       </button>
//     ),

//     Keyboard: !props.focus
//       ? null
//       : () => (
//           <Keyboard
//             includes={includes}
//             eliminated={excludes}
//             onKeyPress={(key) => {
//               if (includes.includes(key))
//                 props.onChange({
//                   includes: includes.filter((c) => c !== key),
//                   excludes,
//                 });
//               else
//                 props.onChange({
//                   includes: [...includes, key].sort(),
//                   excludes: excludes.filter((c) => c !== key),
//                 });
//             }}
//           />
//         ),
//   };
// };

export const MiniIncludesField = (props: { filter: WordFilter }) => (
  <MiniLetterField letters={props.filter.includes} theme="warning" />
);

export const MiniExcludesField = (props: { filter: WordFilter }) => (
  <MiniLetterField letters={props.filter.excludes} theme="secondary" />
);

const MiniLetterField = (props: {
  letters: ReadonlyArray<string>;
  theme: "secondary" | "warning";
}) => (
  <div className="overflow-x-auto">
    {props.letters.map((char) => (
      <span key={char} className="fw-bold text-secondary me-1">
        {char}
      </span>
    ))}
    {props.letters.length === 0 && (
      <small className="text-muted">&mdash;</small>
    )}
  </div>
);

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
        <div
          className="btn-group"
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

        <button
          type="button"
          className={cs("btn btn-sm ms-3 btn-outline-dark")}
          onClick={() => props.onChange({ includes: [], excludes: [] })}
        >
          Clear all
        </button>
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
