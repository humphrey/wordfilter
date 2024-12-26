import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"


interface Props {
  title: string
  onReset?: () => void
}

export const Field = (props: React.PropsWithChildren<Props>) => {
  return (
    <div className="py-2">
      <div className='small text-muted'>{props.title}
      </div>
      <div className="d-flex px-1">
        <div>{props.children}</div>
        <div className="ms-auto">
          {props.onReset && <button className="btn btn-light btn-sm" onClick={props.onReset}>
            <FontAwesomeIcon icon={faXmark}/>
          </button>}
        </div>
      </div>
    </div>
  )
}


export interface BaseFieldProps {
  focus: boolean
  onFocus: () => void
  onBlur: () => void
}
