import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import cs from "classnames";

interface Props {
  title: string;
  onReset?: () => void;
  align?: "start" | "center" | "end";
}

export const Field = (props: React.PropsWithChildren<Props>) => {
  return (
    <div className="pb-2">
      <div className={`small text-muted text-${props.align ?? "start"}`}>
        <small>{props.title}</small>
      </div>
      <div className="d-flex">
        {props.children}
        {props.onReset && (
          <div className="ms-auto">
            <button className="btn btn-light btn-sm" onClick={props.onReset}>
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export const FieldButton = (
  props: React.PropsWithChildren<{
    onClick: () => void;
    disabled?: boolean;
    focus: boolean;
  }>
) => (
  <button
    className={cs(
      "btn btn-light btn-sm w-100 text-start",
      props.focus && "border-primary"
    )}
    onClick={() => props.onClick()}
    disabled={props.disabled}
  >
    {props.children}
  </button>
);
