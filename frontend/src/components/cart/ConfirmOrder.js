import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

import MetaData from '../layout/MetaData'
import CheckoutSteps from './CheckoutSteps'

import { useSelector } from 'react-redux'

const ConfirmOrder = ({ history }) => {

    const { cartItems, shippingInfo } = useSelector(state => state.cart)
    const { user } = useSelector(state => state.auth)

    // calcular valor pedido
    const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
    const shippingPrice = itemsPrice > 200 ? 0 : 25
    const taxPrice = Number((0.05 * itemsPrice).toFixed(2))
    const totalPrice = (itemsPrice + shippingPrice + taxPrice).toFixed(2)

    const processToPayment = () => {
        const data = {
            itemsPrice: itemsPrice.toFixed(2),
            shippingPrice,
            taxPrice,
            totalPrice
        }

        sessionStorage.setItem('orderInfo', JSON.stringify(data))
        history.push('/payment')
    }

    return (
        <Fragment>

            <MetaData title={'Confirmar pedido'} />

            <CheckoutSteps shipping confirmOrder />

            <div className="row d-flex justify-content-between">
                <div className="col-12 col-lg-8 mt-5 order-confirm">

                    <h4 className="mb-3">Informação para evio</h4>
                    <p><b>Nome:</b> {user && user.name}</p>
                    <p><b>Celular:</b> {shippingInfo.phoneNo}</p>
                    <p className="mb-4"><b>Rua:</b> {`${shippingInfo.rua} ${shippingInfo.numero}, ${shippingInfo.city}, ${shippingInfo.estado}, ${shippingInfo.postalCode}, ${shippingInfo.country}`}</p>

                    <hr />
                    <h4 className="mt-4">Itens carrinho:</h4>

                    {cartItems.map(item => (
                        <Fragment>
                            <hr />
                            <div className="cart-item my-1" key={item.product}>
                                <div className="row">
                                    <div className="col-4 col-lg-2">
                                        <img src={item.image} alt="Laptop" height="45" width="65" />
                                    </div>

                                    <div className="col-5 col-lg-6">
                                        <Link to={`/product/R${item.product}`}>{item.name}</Link>
                                    </div>


                                    <div className="col-4 col-lg-4 mt-4 mt-lg-0">
                                        <p>{item.quantity} x R${item.price} = <b>R${(item.quantity * item.price).toFixed(2)}</b></p>
                                    </div>

                                </div>
                            </div>
                            <hr />
                        </Fragment>
                    ))}



                </div>

                <div className="col-12 col-lg-3 my-4">
                    <div id="order_summary">
                        <h4>Resumo pedido</h4>
                        <hr />
                        <p>Subtotal:  <span className="order-summary-values">R${itemsPrice}</span></p>
                        <p>Envio: <span className="order-summary-values">R${shippingPrice}</span></p>
                        <p>Imposto:  <span className="order-summary-values">R${taxPrice}</span></p>

                        <hr />

                        <p>Total: <span className="order-summary-values">R${totalPrice}</span></p>

                        <hr />
                        <button id="checkout_btn" className="btn btn-primary btn-block" onClick={processToPayment}>Pagar</button>
                    </div>
                </div>


            </div>

        </Fragment>
    )
}

export default ConfirmOrder
