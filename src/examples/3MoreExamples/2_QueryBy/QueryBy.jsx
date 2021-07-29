import React from 'react'

const QueryBy = ({ checkboxesList, renderChecked = true }) =>
  checkboxesList
    .filter(({ checked }) => renderChecked || !(!renderChecked && checked))
    .map(({ description, checked }) => (
      <div key={description}>
        <input
          type="checkbox"
          id={description}
          name={description}
          checked={checked}
          readOnly
        />
        <label htmlFor={description}>{description}</label>
      </div>
    ))

export default QueryBy
