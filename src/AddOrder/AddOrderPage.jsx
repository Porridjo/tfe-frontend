import { useState } from 'react';
import { Link } from 'react-router-dom'



const AddOrderPage = () => {

  const [fields, setFields] = useState({
    nurseryName: "",
    nurseryAdress: "",
    telephoneNumber: "",
  })

  console.log(fields)

  const handleOnChange = (e) => {
    const { name, value } = e.target
    setFields(prevFields => ({
      ...prevFields,
      [name]: value
    }))

  }

  return (
    <>
      <label htmlFor='nurseryName'>Entrer le nom de la crèche</label>
      <input id="nurseryName" type="text" name="nurseryName" value={fields.nurseryName} onChange={handleOnChange} />
      
      <input id="nurseryAdress" type="text" name="nurseryAdress" value={fields.nurseryAdress} onChange={handleOnChange} />
      <input id="telephoneNumber" type="text" name="telephoneNumber" value={fields.telephoneNumber} onChange={handleOnChange} />
    </>
    
  )
}

export default AddOrderPage;