import { useState } from 'react'
import { auth, googleProvider } from '../config/firebase'
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth'
export const Auth = () => {
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");

    console.log(auth?.currentUser?.email)

    const signIn = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password)
            setEmail('')
            setPassword('')
        } catch (error) {
            console.error(error)
        }
    }
    const signinWithGoogle = async () => {
        try{
            await signInWithPopup(auth, googleProvider)
        } catch (error) {
            console.log(error)
        }
    }
    const logOut = async () => {
        try {
            await signOut(auth)
        } catch (error) {
            console.log(error)
        }
    }
    return(
        <div>
            <input type='text' placeholder="Email..." value={email} onChange={(e) => setEmail(e.target.value)}/>
            <input type='password' placeholder="Password..." value={password} onChange={(e) => setPassword(e.target.value)}/>
            <button onClick={signIn}>Sign In</button>
            <button onClick={signinWithGoogle}>Signin With Google</button>
            <button onClick={logOut}>Sign out</button>
        </div>
    )
}