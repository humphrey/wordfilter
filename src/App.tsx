import React, { useState } from "react";
import { Offcanvas } from "react-bootstrap";
import "./App.css";
import {
  LettersOffCanvas,
  IncludeExcludeMode,
  MiniLettersField,
} from "./Letters";
import { Field, FieldButton } from "./Field";
import { defaultFilter, WordFilter } from "./Filtering";
import { LengthBtnGroup } from "./LengthSelector";
import { MatchList } from "./MatchList";
import { MiniPatternField, PatternFilterOffCanvas } from "./PatternFilter";

function App() {
  const [filter, setFilter] = useState<WordFilter>(defaultFilter);
  const [mode, setMode] = React.useState<IncludeExcludeMode>("includes");
  const [focused, setFocused] = useState<null | "pattern" | "letters">(null);
  return (
    <div>
      <div className="border-bottom shadow sticky-top bg-white">
        <div className="px-3 pb-2 pt-1">
          <div className="row">
            <div className="col-4"></div>
            <div className="col-4">
              <div
                className="text-white text-center bg-dark mx-auto fs-5 text rounded"
                style={{ width: "100px" }}
              >
                <span className="">word</span>
                <b className="">filter</b>
              </div>
            </div>
            <div className="col-4 text-end">
              <button
                className="btn btn-sm btn-outline-success"
                onClick={() => setFilter(defaultFilter)}
              >
                New word
              </button>
            </div>
          </div>
        </div>

        <div className="px-3">
          <Field title="Word length">
            <LengthBtnGroup
              value={filter.length}
              onChange={(length) => {
                setFilter({ ...filter, length });
                if (focused === null) setFocused("pattern");
              }}
            />
          </Field>
          <div className="row">
            <div className="col-5">
              <Field title="Pattern">
                <FieldButton
                  focus={focused === "pattern"}
                  onClick={() => setFocused("pattern")}
                  disabled={filter.length === null}
                >
                  <MiniPatternField filter={filter} />
                </FieldButton>
              </Field>
            </div>
            <div className="col-7">
              <Field title="With or without letters">
                <FieldButton
                  focus={focused === "letters"}
                  onClick={() => setFocused("letters")}
                >
                  <MiniLettersField filter={filter} />
                </FieldButton>
              </Field>
            </div>
          </div>
        </div>
      </div>

      <Offcanvas
        show={
          focused === "letters" ||
          (focused === "pattern" && filter.length !== null)
        }
        placement="bottom"
        backdrop={false}
        scroll={true}
        style={{ height: "240px" }}
        onHide={() => setFocused(null)}
      >
        {focused === "letters" && (
          <LettersOffCanvas
            filter={filter}
            onChange={(newValue) => setFilter({ ...filter, ...newValue })}
            mode={mode}
            onChangeMode={(newMode) => setMode(newMode)}
          />
        )}
        {focused === "pattern" && (
          <PatternFilterOffCanvas
            filter={filter}
            onChange={(pattern) => setFilter({ ...filter, pattern })}
          />
        )}
      </Offcanvas>

      <div>
        <MatchList filter={filter} />
      </div>
    </div>
  );
}

export default App;
