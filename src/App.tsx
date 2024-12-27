import { faCircle } from "@fortawesome/free-regular-svg-icons";
import {
  faCheckCircle,
  faHistory,
  faInfo,
  faSortAlphaAsc,
  faSortNumericAsc,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import cs from "classnames";
import React, { useState } from "react";
import { Dropdown, Offcanvas } from "react-bootstrap";
import "./App.css";
import { Field, FieldButton } from "./Field";
import { defaultFilter, WordFilter } from "./Filtering";
import { LengthBtnGroup } from "./LengthSelector";
import {
  IncludeExcludeMode,
  LettersOffCanvas,
  MiniLettersField,
} from "./Letters";
import { MatchList } from "./MatchList";
import { MiniPatternField, PatternFilterOffCanvas } from "./PatternFilter";

function App() {
  const [wordHistory, setWordHistory] = React.useState<WordFilter[]>([]);
  const [sort, setSort] = React.useState<"alpha" | "popularity">("popularity");
  const [filter, setFilter] = useState<WordFilter>(defaultFilter);
  const [mode, setMode] = React.useState<IncludeExcludeMode>("includes");
  const [focused, setFocused] = useState<null | "pattern" | "letters">(null);

  return (
    <div>
      <div
        className="shadow sticky-top container px-0"
        style={{ maxWidth: "540px", background: "#ebf8fb" }}
      >
        <div style={{}} className="px-3">
          <div className="pb-2 pt-1">
            <div className="row">
              <div className="col-4">
                {/* <button className="btn btn-sm">
                  <FontAwesomeIcon icon={faInfo} />
                </button> */}
              </div>
              <div className="col-4">
                <div
                  className="text-white text-center bg-dark mx-auto fs-5 text rounded"
                  style={{ width: "100px" }}
                >
                  <span className="">word</span>
                  <b className="">filter</b>
                </div>
              </div>
              <div className="col-4 d-flex">
                <Dropdown className="ms-auto" align="end">
                  <Dropdown.Toggle
                    variant="link text-dark"
                    id="dropdown-basic"
                    size="sm"
                  >
                    <FontAwesomeIcon
                      icon={
                        sort === "alpha" ? faSortAlphaAsc : faSortNumericAsc
                      }
                    />
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item
                      as="button"
                      onClick={() => setSort("popularity")}
                    >
                      <FontAwesomeIcon
                        icon={sort === "popularity" ? faCheckCircle : faCircle}
                        className="me-3"
                      />
                      Word popularity
                    </Dropdown.Item>
                    <Dropdown.Item as="button" onClick={() => setSort("alpha")}>
                      <FontAwesomeIcon
                        icon={sort === "alpha" ? faCheckCircle : faCircle}
                        className="me-3"
                      />
                      Alphabetical
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <Dropdown align="end">
                  <Dropdown.Toggle
                    variant="link text-dark"
                    id="dropdown-basic"
                    size="sm"
                  >
                    <FontAwesomeIcon icon={faHistory} />
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item
                      as="button"
                      onClick={() => setWordHistory([])}
                    >
                      Clear history
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    {wordHistory.map((h, i) => (
                      <Dropdown.Item
                        as="button"
                        key={i}
                        className="ps-2 d-flex align-items-center"
                      >
                        {h.length === null && (
                          <code className="text-dark rounded">Any length</code>
                        )}
                        {h.length !== null && (
                          <code className="text-dark rounded">
                            {h.pattern.map((c, i) => (
                              <span
                                className={cs(
                                  "pe-1 ms-1",
                                  i < h.pattern.length - 1 && "border-end"
                                )}
                              >
                                {c ?? "?"}
                              </span>
                            ))}
                          </code>
                        )}
                        {(h.includes.length > 0 || h.excludes.length > 0) && (
                          <>
                            <div className="ms-auto ps-2" />
                            <MiniLettersField filter={h} />
                          </>
                        )}
                      </Dropdown.Item>
                    ))}
                    {wordHistory.length === 0 && (
                      <Dropdown.Item
                        as="button"
                        disabled
                        className="text-muted"
                      >
                        No history
                      </Dropdown.Item>
                    )}
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
          </div>
          <div className=" text-center">
            <Field title="Select word length to start new word" align="center">
              <LengthBtnGroup
                value={filter.length}
                onChange={(length) => {
                  if (
                    filter.pattern.filter((c) => c !== null).length > 0 ||
                    filter.includes.length > 0 ||
                    filter.excludes.length > 0
                  )
                    setWordHistory([filter, ...wordHistory]);
                  setFilter({ ...defaultFilter, length });
                  if (focused === null) {
                    if (length === null) setFocused("letters");
                    else setFocused("pattern");
                  }
                }}
              />
            </Field>
          </div>
        </div>

        <div className="px-3 py-2" style={{ background: "#ceeef6" }}>
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
        style={{ height: "250px" }}
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
        <MatchList filter={filter} sort={sort} />
      </div>
    </div>
  );
}

export default App;
