import { useState } from 'react';
import { Link } from 'react-router-dom'
import Input from '../../components/Input/Input';



const AddOrderPage = ({ formData, setFormData }) => {

  console.log(formData)

  const handleOnChange = (e) => {
    const { name, value } = e.target
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }))

  }

  return (
    <>
      <Link to="/round/addround/addorder2">
        <button>Suivant</button>
      </Link>
      
      <Input id="nurseryName" name="nurseryName" value={formData.nurseryName} onChange={handleOnChange} label="Entrer le nom de la crèche" />
      <Input id="nurseryAdress" name="nurseryAdress" value={formData.nurseryAdress} onChange={handleOnChange} label="Entrer l'adresse de la crèche" />
      <Input id="telephoneNumber" name="telephoneNumber" value={formData.telephoneNumber} onChange={handleOnChange} label="Entrer le num de téléphone de la crèche" />
    </>
    
  )
}

export default AddOrderPage;