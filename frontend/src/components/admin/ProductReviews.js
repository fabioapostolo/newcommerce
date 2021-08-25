import React, { Fragment, useState, useEffect } from 'react'
import { MDBDataTable } from 'mdbreact'

import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import Sidebar from './Sidebar'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { getProductReviews, deleteReview, clearErrors } from '../../actions/productActions'
import { DELETE_REVIEW_RESET } from '../../constants/productConstants'

const ProductReviews = () => {

    const [productId, setProductId] = useState('')

    const alert = useAlert();
    const dispatch = useDispatch();

    const { error, reviews } = useSelector(state => state.productReviews);
    const { isDeleted, error: deleteError } = useSelector(state => state.review)

    useEffect(() => {

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (deleteError) {
            alert.error(deleteError);
            dispatch(clearErrors())
        }

        if (productId !== '') {
            dispatch(getProductReviews(productId))
        }

        if (isDeleted) {
            alert.success('Avaliação deletada com sucesso!');
            dispatch({ type: DELETE_REVIEW_RESET })
        }



    }, [dispatch, alert, error, productId, isDeleted, deleteError])

    const deleteReviewHandler = (id) => {
        dispatch(deleteReview(id, productId))
    }

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(getProductReviews(productId))
    }

    const setReviews = () => {
        const data = {
            columns: [
                {
                    label: 'ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Avaliação',
                    field: 'rating',
                    sort: 'asc'
                },
                {
                    label: 'Comentários',
                    field: 'comment',
                    sort: 'asc'
                },
                {
                    label: 'Usuário',
                    field: 'user',
                    sort: 'asc'
                },
                {
                    label: 'Ações',
                    field: 'actions',
                },
            ],
            rows: []
        }

        reviews.forEach(review => {
            data.rows.push({
                id: review._id,
                rating: review.rating,
                comment: review.comment,
                user: review.name,

                actions:
                    <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deleteReviewHandler(review._id)}>
                        <i className="fa fa-trash"></i>
                    </button>
            })
        })

        return data;
    }

    return (
        <Fragment>
            <MetaData title={'Avaliações do produto'} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <div className="row justify-content-center mt-5">
                            <div className="col-5">
                                <form onSubmit={submitHandler}>
                                    <div className="form-group">
                                        <label htmlFor="productId_field">Entre com o ID produto</label>
                                        <input
                                            type="text"
                                            id="productId_field"
                                            className="form-control"
                                            value={productId}
                                            onChange={(e) => setProductId(e.target.value)}
                                        />
                                    </div>

                                    <button
                                        id="search_button"
                                        type="submit"
                                        className="btn btn-primary btn-block py-2"
                                    >
                                        PROCURAR
								    </button>
                                </ form>
                            </div>

                        </div>

                        {reviews && reviews.length > 0 ? (
                            <MDBDataTable
                                data={setReviews()}
                                className="px-3"
                                bordered
                                striped
                                hover
                            />
                        ) : (
                                <p className="mt-5 text-center">Sem avaliações.</p>
                            )}


                    </Fragment>
                </div>
            </div>

        </Fragment>
    )
}

export default ProductReviews
