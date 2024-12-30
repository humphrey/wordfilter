import { faCircle } from "@fortawesome/free-regular-svg-icons";
import {
  faCheckCircle,
  faHistory,
  faSortAlphaAsc,
  faSortNumericAsc,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import cs from "classnames";
import React, { useState } from "react";
import { Dropdown, Offcanvas } from "react-bootstrap";
import { Field, FieldButton } from "./Field";
import { useFilters } from "./Filtering";
import { LengthBtnGroup } from "./LengthSelector";
import {
  IncludeExcludeMode,
  LettersOffCanvas,
  MiniLettersField,
} from "./Letters";
import { MatchList } from "./MatchList";
import { MiniPatternField, PatternFilterOffCanvas } from "./PatternFilter";

export const App = () => {
  const filters = useFilters();
  const { filter, history } = filters;
  const [sort, setSort] = React.useState<"alpha" | "popularity">("popularity");
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
                    <Dropdown.Item as="button" onClick={history.clear}>
                      Clear history
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    {history.filters.map((h) => (
                      <Dropdown.Item
                        as="button"
                        key={h.id}
                        className="ps-2 d-flex align-items-center"
                        onClick={() => filters.restore(h.id)}
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
                    {history.filters.length === 0 && (
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
                  filters.new(length);
                  setFocused(length === null ? "letters" : "pattern");
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
            key={filter.id}
            filter={filter}
            onChange={filters.update}
            mode={mode}
            onChangeMode={(newMode) => setMode(newMode)}
          />
        )}
        {focused === "pattern" && (
          <PatternFilterOffCanvas
            key={filter.id}
            filter={filter}
            onChange={(pattern) => filters.update({ pattern })}
          />
        )}
      </Offcanvas>

      <div>
        <MatchList
          filter={filter}
          sort={sort}
          onWordTap={filters.toggleStrikeout}
        />
      </div>
    </div>
  );
};
