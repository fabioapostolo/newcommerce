import React, { Fragment, useState } from 'react'
import { countries } from 'countries-list'

import MetaData from '../layout/MetaData'
import CheckoutSteps from './CheckoutSteps'

import { useDispatch, useSelector } from 'react-redux'
import { saveShippingInfo } from '../../actions/cartActions'

const Shipping = ({ history }) => {

    const countriesList = Object.values(countries)

    const { shippingInfo } = useSelector(state => state.cart)

    const [rua, setRua] = useState(shippingInfo.rua)
    const [numero, setNumero] = useState(shippingInfo.numero)
    const [bairro, setBairro] = useState(shippingInfo.bairro)
    const [postalCode, setPostalCode] = useState(shippingInfo.postalCode)
    const [city, setCity] = useState(shippingInfo.city)
    const [estado, setEstado] = useState(shippingInfo.estado)
    const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo)
    const [country, setCountry] = useState(shippingInfo.country)

    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault()

        dispatch(saveShippingInfo({ rua, numero, bairro, city,estado, phoneNo, postalCode, country }))
        history.push('/confirm')
    }

    return (
        <Fragment>

            <MetaData title={'Informações de envio'} />

            <CheckoutSteps shipping />

            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={submitHandler}>
                        <h1 className="mb-4">Informações de envio</h1>
                        <div className="form-group">
                            <label htmlFor="address_field">Rua</label>
                            <input
                                type="text"
                                id="address_field"
                                className="form-control"
                                value={rua}
                                onChange={(e) => setRua(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="address_field">Número</label>
                            <input
                                type="text"
                                id="address_field"
                                className="form-control"
                                value={numero}
                                onChange={(e) => setNumero(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="address_field">Bairro</label>
                            <input
                                type="text"
                                id="address_field"
                                className="form-control"
                                value={bairro}
                                onChange={(e) => setBairro(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="city_field">Cidade</label>
                            <input
                                type="text"
                                id="city_field"
                                className="form-control"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="city_field">Estado</label>
                            <input
                                type="text"
                                id="city_field"
                                className="form-control"
                                value={estado}
                                onChange={(e) => setEstado(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="phone_field">Celular</label>
                            <input
                                type="phone"
                                id="phone_field"
                                className="form-control"
                                value={phoneNo}
                                onChange={(e) => setPhoneNo(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="postal_code_field">CEP</label>
                            <input
                                type="number"
                                id="postal_code_field"
                                className="form-control"
                                value={postalCode}
                                onChange={(e) => setPostalCode(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="country_field">Pais</label>
                            <select
                                id="country_field"
                                className="form-control"
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                required
                            >

                                {countriesList.map(country => (
                                    <option key={country.name} value={country.name}>
                                        {country.name}
                                    </option>
                                ))}

                            </select>
                        </div>

                        <button
                            id="shipping_btn"
                            type="submit"
                            className="btn btn-block py-3"
                        >
                            CONTINUAR
                            </button>
                    </form>
                </div>
            </div>

        </Fragment>
    )
}

export default Shipping
