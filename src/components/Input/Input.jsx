import "../../stylesheets/Input.css"

const Input = ({ id, name, value, onChange, label }) => {
  return (
    <div>
      <label className="input-label" htmlFor={id}>{label}:</label>
      <input className="input-input" id={id} type="text" name={name} value={value} onChange={onChange} />
    </div>
    
  )
}

export default Input