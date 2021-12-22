import React from 'react';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { removeMessage } from '../../state/reducers/auth.reducer'


export default function FlashMessage(props) {
    const { id, type, text } = props.message
    const dispatch = useDispatch()

    return (
        <div role='alert' className={classNames(
            'alert alert-dismissible fade show m-2', {
                'alert-success': type === 'success', 
                'alert-danger': type === 'failure',
            })} >
                <button onClick={() => dispatch(removeMessage(id))} type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                {text}
        </div>
    )
}