import React from 'react'
import { useSelector } from 'react-redux'

import FlashMessage from './flashmessage.component'


export default function FlashMessageList() {
    const data = useSelector((state) => state.auth.messages)
    const messages = data.map( message => {
        return (
            <FlashMessage key={message.id} message={message}/>
        )
    })
    
    return (
        <div className="container my-3">
            {messages}
        </div>
    )
}