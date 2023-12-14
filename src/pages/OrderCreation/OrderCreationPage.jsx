import { useState } from 'react';
import { Link } from 'react-router-dom'
import Input from '../../components/Input/Input';
import '/src/stylesheets/OrderCreationPage.css'

const OrderCreationPage = ({ formData, setFormData }) => {

  const handleOnChange = (e) => {
    const { name, value } = e.target
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }))
  }

  return (
    <div className='order-creation1-container'>
      <div className="button-div">
      <Link to="/round/create-round/">
          <button>Retour</button>
        </Link>
      </div>
      <div className='order-form'>
        <h2>Information de la crèche</h2>
        <div className='order-input-div'>
          <Input id="nurseryName" name="nurseryName" value={formData.nurseryName} onChange={handleOnChange} label="Nom de la crèche" />
        </div>
        <div className='order-input-div'>
          <Input id="nurseryAdress" name="nurseryAdress" value={formData.nurseryAdress} onChange={handleOnChange} label="Adresse de la crèche" />
        </div>
        <div className='order-input-div'>
          <Input id="telephoneNumber" name="telephoneNumber" value={formData.telephoneNumber} onChange={handleOnChange} label="Numéro de téléphone de la crèche (facultatif)" />
        </div>
        <Link to="/round/create-round/addorder2">
          <button>Continuer</button>
        </Link>
      </div>
    </div>
    
  )
}

export default OrderCreationPage;