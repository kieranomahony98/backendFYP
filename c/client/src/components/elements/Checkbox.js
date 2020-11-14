import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const propTypes = {
  children: PropTypes.node,
  name: PropTypes.string,
  value: PropTypes.string,
  disabled: PropTypes.bool,
  checked: PropTypes.bool
}

const defaultProps = {
  children: null,
  name: undefined,
  value: undefined,
  disabled: false,
  checked: undefined
}
const style = {
  color: 'white',
}

const Checkbox = ({
  className,
  children,
  name,
  value,
  disabled,
  checked,
  labelTxt,
  ...props
}) => {

  const classes = classNames(
    'form-checkbox',
    className
  );

  const onHandleClick = (state) => {
    Checkbox.checked = (false) ? true : false;
  }

  return (
    <label className={classes}> {labelTxt}
      <input
        {...props}
        type="checkbox"
        name={name}
        value={value}
        disabled={disabled}
        checked={checked}
        onCheck = {onHandleClick()}
        onChange = {onHandleClick()}
        style = {style}
      />
      {children}
      </label>
  );
}

Checkbox.propTypes = propTypes;
Checkbox.defaultProps = defaultProps;

export default Checkbox;