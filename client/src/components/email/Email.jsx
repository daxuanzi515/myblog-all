import React, { useState , useEffect} from 'react'
import "./email.css"
import {toast} from 'react-toastify' 

import {
    validateEmail,
    validateFullName,
    validateMessage,
} from './Validation';

import {SendEmail} from './Sendemail'

export default function Email() {

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [fullNameError, setFullNameError] = useState();
    const [emailError, setEmailError] = useState();
    const [messageError, setMessageError] = useState();
    const [loading, setLoading] = useState(true);
    const [buttonLoading, setButtonLoading] = useState(false);
    const [send, setSend] = useState();

    useEffect(() => {

        validateFullName({ fullName, setFullNameError });
        validateEmail({ email, setEmailError });
        validateMessage({ message, setMessageError });

        if (send) {
            toast.success(send.msg);
            setFullName("")
            setEmail("")
            setMessage("")
            setSend()
          }
        
    },[fullName, email, message, send]);

    const submitHandler = async (e) => {
        e.preventDefault();
        setButtonLoading(true);
        if (!fullNameError & !emailError & !messageError) {
          SendEmail({ fullName, email, message, setSend }).then(
            () => {
              setButtonLoading(false);
            }
          );
        }
      };

  return (
    <>
    {/* <Toast /> */}
        <div className="emailContainer">
            <form className="emailForm" onSubmit={submitHandler}>
                <div className="nameInput">
                    <label className='labelInput'>FullName</label>
                    <input required type="text" placeholder='Your Name' className="InputClass"
                    onChange={(e) => setFullName(e.target.value)}
                    value = {fullName}
                    />
                     {fullNameError}
                </div>
                <div className="nameInput">
                    <label className='labelInput'>Email</label>
                    <input required type="email" placeholder='Your Legal Email' className="InputClass"
                    onChange={(e) => setEmail(e.target.value)}
                    value = {email}
                    />
                     {emailError}
                </div>

                <div className="nameInput">
                    <label className='labelInput'>Message</label>
                    <textarea required
                     placeholder='Something Need' 
                     className="TextInput"
                     value={message}
                     onChange={(e) => setMessage(e.target.value)}
                     />
                     {messageError}
                </div>
                <button
                type='submit'
                className="Submitbutton"
                disabled={buttonLoading && true}
                >
                    {buttonLoading ? 'Loading..' : 'SUBMIT'}
                </button>
            </form>
        </div>
    </>

  )
}
