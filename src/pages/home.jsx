import React, { useRef, useState } from 'react'
import { firestore } from '../firebase'
import { addDoc, collection } from '@firebase/firestore'

export default function Home() {
    const messageRef = useRef()
    const messagesCollection = collection(firestore, "messages")
    const [message, setMessage] = useState('')

    const handleSave = async (e) => {
        e.preventDefault()
        const newMessage = messageRef.current.value
        console.log(newMessage)

        let data = {
            message: newMessage
        }

        try {
            await addDoc(messagesCollection, data)
            console.log('Document successfully added!')
            setMessage(newMessage) // Update the state with the entered message
        } catch (error) {
            console.error('Error adding document: ', error)
        }
    }

    return (
        <div>
            <form onSubmit={handleSave}>
                <label>Enter Message</label>
                <input type='text' ref={messageRef} />
                <button type='submit'>Save</button>
            </form>
            <h1>{message}</h1>
        </div>
    )
}
