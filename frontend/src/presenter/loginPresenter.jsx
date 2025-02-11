import frontEndModel from "../model/frontEndModel"; 

const LoginPresenter = {
  submitLogin: async (formData, onSuccess, onError) => {
    try {
      frontEndModel.encryptJSONObject(formData);
      const response = await frontEndModel.login(formData);
      //const isEmail = formData.username.includes("@");
      if (!response || !response.userPassword || !response.username || !response.email) {
        throw new Error("User not found");
      }
       if (formData.userPassword !== response.userPassword || formData.username !== response.username && formData.username !== response.email) {
         throw new Error("Invalid credentials");
       }
      // if (formData.userPassword !== response.userPassword || formData.username !== response.username) {
      //   throw new Error("Invalid credentials");
      // }
      // if (isEmail) {
      //   if (formData.username !== response.email) {
      //     throw new Error("Incorrect email");
      //   }
      //   else {
      //     if (formData.username !== response.username) {
      //       throw new Error("Incorrect username");
      //     }
      //     if (formData.userPassword !== response.userPassword) {
      //       throw new Error("Incorrect password");
      //     }
      //   }
      // }
      onSuccess(response); 
    } catch (error) {
      console.error("Error in LoginPresenter:", error.message);
      onError(error.message); 
    }
  },
};

export default LoginPresenter;
