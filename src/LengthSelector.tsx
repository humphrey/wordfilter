import cs from 'classnames';
import { Dropdown } from 'react-bootstrap';
import { BaseFieldProps } from './Field';

interface Props extends BaseFieldProps {
  value: number | null
  onChange: (newValue: number | null) => void
}

const lengthOptions = [2,3,4,5,6,7,8,9,10];

export const LengthBtnGroup = (props: Props) => {
  return (
    <div>

      <div className='btn-group'>
        {lengthOptions.map((n) => (
          <button key={n}  className={cs('btn btn-sm btn-light', props.value === n && 'active')} onClick={() => {
            props.onChange(n);
            props.onFocus();
          }}>{n}</button>
        ))}
      </div>

      <button className={cs('btn btn-sm btn-light ms-3', props.value === null && 'active')} onClick={() => {
        props.onChange(null);
        props.onBlur();
        }}>Any</button>
    </div>
  )
}

export const LengthSelect = (props: Props) => {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="light" size="sm">
        {props.value ?? 'Any length'}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {lengthOptions.map((n) => (
          <Dropdown.Item key={n}  className={cs('btn btn-sm btn-light', props.value === n && 'active')} onClick={() => props.onChange(n)}>{n}</Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  )
}
