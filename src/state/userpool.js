import { CognitoUserPool } from "amazon-cognito-identity-js";

const userpool = {
    UserPoolId: import.meta.env.VITE_REACT_APP_USER_POOL_ID,
    ClientId: import.meta.env.VITE_REACT_APP_CLIENT_ID,
};

let userPool;

try {
    userPool = new CognitoUserPool(userpool);
    console.log("UserPool created");
} catch (error) {
    console.error("Error creating Cognito User Pool:", error);
}

export default userPool;