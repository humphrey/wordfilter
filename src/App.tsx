import React, { useState } from "react";
import { Offcanvas } from "react-bootstrap";
import "./App.css";
import {
  LettersOffCanvas,
  IncludeExcludeMode,
  MiniLettersField,
} from "./ExcludedList";
import { Field, FieldButton } from "./Field";
import { defaultFilter, WordFilter } from "./Filtering";
import { LengthBtnGroup } from "./LengthSelector";
import { MatchList } from "./MatchList";
import { MiniPatternField, PatternFilterOffCanvas } from "./PatternFilter";

function App() {
  const [filter, setFilter] = useState<WordFilter>(defaultFilter);
  const [mode, setMode] = React.useState<IncludeExcludeMode>("includes");
  const [focused, setFocused] = useState<null | FocusType>(null);
  // const includesField = useIncludedLettersField({
  //   filter,
  //   focus: focused === "includes",
  //   onFocus: () => setFocused("includes"),
  //   onBlur: () => setFocused(null),
  //   onChange: (newValue) => setFilter({ ...filter, ...newValue }),
  // });
  // const excludesField = useExcludedLettersField({
  //   filter,
  //   focus: focused === "excludes",
  //   onFocus: () => setFocused("excludes"),
  //   onBlur: () => setFocused(null),
  //   onChange: (newValue) => setFilter({ ...filter, ...newValue }),
  // });
  // const patternField = usePatternFilter({
  //   pattern: filter.pattern,
  //   length: filter.length,
  //   focus: focused === 'pattern',
  //   onFocus: () => setFocused('pattern'),
  //   onBlur: () => setFocused(null),
  //   onChange: pattern => setFilter({...filter, pattern})
  // })
  // const FieldKeyboard = includesField.Keyboard ?? excludesField.Keyboard; // ?? patternField.Keyboard;

  return (
    <div>
      {/* <div className='d-flex bg-primary-subtle'> */}

      {/* <LengthSelect value={filter.length} onChange={length => setFilter({...filter, length})}/>

      {filter.length !== null &&
        <PatternFilter 
          length={filter.length} 
          pattern={filter.pattern}
          onChange={pattern => setFilter({...filter, pattern})}
        />
      } */}

      {/* <button className='btn btn-light btn-sm ms-auto' onClick={() => setFilter(defaultFilter)}> */}
      {/* <FontAwesomeIcon icon={faXmark}/> */}
      {/* Reset */}
      {/* </button> */}

      {/* </div> */}

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
        {/* {focused === "excludes" && (
          <ExcludedLettersOffCanvas
            filter={filter}
            onChange={(newValue) => setFilter({ ...filter, ...newValue })}
          />
        )} */}
        {focused === "pattern" && (
          <PatternFilterOffCanvas
            filter={filter}
            // focus: focused === 'pattern',
            // onFocus: () => setFocused('pattern'),
            // onBlur: () => setFocused(null),
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
