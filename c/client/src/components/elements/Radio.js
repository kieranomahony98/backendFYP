import React, {useState} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const propTypes = {
  children: PropTypes.node,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  disabled: PropTypes.bool,
  checked: PropTypes.bool
}

const defaultProps = {
  children: null,
  name: undefined,
  value: '',
  disabled: false,
  checked: false
}

const Radio = ({
  className,
  children,
  name,
  value,
  disabled,
  checked,
  ...props
}) => {

  const classes = classNames(
    'form-radio',
    className
  );
  const handleEventChange = (e) => {
     Radio.checked = (e === false) ? true : false;
  }
  return (
    <label className={classes}>
      {name}
      <input
        {...props}
        type="radio"
        name={name}
        value={value}
        disabled={disabled}
        checked
        onChange ={() => handleEventChange(checked)}
      />
      {children}
    </label>
  );
}

Radio.propTypes = propTypes;
Radio.defaultProps = defaultProps;

export default Radio;
