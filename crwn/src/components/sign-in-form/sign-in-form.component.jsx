import { useState } from "react"

import { signInWithGooglePopup, signInAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";

import FormInput from "../form-input/form-input.component";

import Button, {BUTTON_TYPE_CLASSES} from "../button/button.component";
import {SignInContainer,ButtonsContainer} from './sign-in-form.styles';

const defaultFormFields ={
    email:'',
    password:'',
};

const SignInForm = () => {
    const [formFields, setformFields] = useState(defaultFormFields);
    const{ email, password} = formFields;

    
    //console.log(formFields);

    const resetFormFields = () => {
        setformFields(defaultFormFields);
    }

    const signInWithGoogle = async () => {
        await signInWithGooglePopup();

    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try{
            await signInAuthUserWithEmailAndPassword(email,password);
            resetFormFields();
        }
        catch(error){
            if (error.code == 'auth/invalid-credential'){
                alert('incorrect credentials')
            }
        }
    };

    const handleChange = (event) => {
        const {name, value} = event.target;

        setformFields({ ...formFields, [name]:value });
    };

    return(
        <SignInContainer>
            <h2>Already have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                
                <FormInput label="Email" type='email' required onChange={handleChange} name='email' value={email} />

                <FormInput label="Password" type='password' required onChange={handleChange} name='password' value={password} />

                <ButtonsContainer>
                <Button type="submit">Sign In</Button>
                <Button buttonType={BUTTON_TYPE_CLASSES.google} type='button' onClick={signInWithGoogle} >Google sign In</Button>
                </ButtonsContainer>
            </form>
        </SignInContainer>
    );
};

export default SignInForm;