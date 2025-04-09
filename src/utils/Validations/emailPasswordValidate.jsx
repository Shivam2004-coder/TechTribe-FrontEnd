
const emailPasswordValidate = (firstName , lastName , email, password , isSignIn ) => {

    if ( isSignIn ) {
        if ( !firstName || firstName.trim() === "" ) {
            return "Please enter your firstName";
        }
        if ( !lastName || lastName.trim() === "" ) {
            return "Please enter your lastName";
        }
    }

    if ( !email ) {
        return "Please enter email id !";
    }

    if ( !password ) {
        return "Please enter password !"; 
    }

    const isEmailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
        email
    );
    const isPasswordValid =
        /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\S+$).{8,20}$/.test(
        password
        );

    if (!isEmailValid) {
        return "Invalid email format.";
    }

    if (!isPasswordValid) {
        return "Password must include uppercase, lowercase, number, and special character.";
    }

    return "";
};

export default emailPasswordValidate;
