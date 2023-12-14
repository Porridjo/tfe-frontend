import "../../stylesheets/Input.css"

const Input = ({ id, name, value, onChange, label, type }) => {
  return (
    <div>
      <label className="input-label" htmlFor={id}>{label}:</label>
      <input className="input-input" id={id} type={type} name={name} value={value} onChange={onChange} />
    </div>
    
  )
}

export default Input