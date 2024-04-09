import { Link } from "react-router-dom";
import { useState, useRef } from "react";
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from 'react-toastify';
import { FormHookYup, userSchema } from "../userschema/UserSchema";
import { loginPending, loginSuccess, loginFail } from '../slices/LoginSlice';

function Form() {

    const { register, handleSubmit, formState: { errors } } = FormHookYup(userSchema);

    const [UserName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setconfirmPassword] = useState('');

    const userNameRef = useRef(null);
    const passwordRef = useRef(null);
    const confirmPasswordRef = useRef(null);

    const dispatch = useDispatch();

    const onSubmit = async (event) => {
        event.preventDefault();
        dispatch(loginPending()); // Dispatch before API calls

        const userData = { UserName, password, confirmPassword }

        const url = 'http://localhost:3000/api/login';

        try {
            const response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                const error = await response.json();
                dispatch(loginFail(error.message)); // Dispatch error message
                toast.error(error.message); // Display error toast
                return; // Exit if not successful
            }
            const responseData = await response.json();
            dispatch(loginSuccess(responseData)); // Dispatch success with data
            toast.success('Login Successful!'); // Display success toast

            // Clear form fields (optional)
            userNameRef.current.value = '';
            passwordRef.current.value = '';
            confirmPasswordRef.current.value = '';

        } catch (error) {
            console.error('Error sending data:', error);
            dispatch(loginFail(error.message)); // Dispatch error message
            toast.error('An error occurred. Please try again later.'); // Display error toast
        }
    };

    return (
        <div className="bg-orange-500 min-h-screen flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg shadow-md mx-4">
                <h1 className="text-center text-5xl font-serif">Log in Form</h1>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <div className="username text-center mt-4">
                        <label className="block text-xl font-medium leading-6 text-gray-900 mb-2">Username</label>
                        <div className="flex justify-center">
                            <div className="rounded-md shadow-sm sm:max-w-md">
                                <input
                                    type="text"
                                    id="UserName"
                                    value={UserName}
                                    ref={userNameRef}
                                    {...register("UserName")}
                                    placeholder="Enter Username Here...."
                                    onChange={(e) => setUserName(e.target.value)}
                                    className="block bg-transparent py-1 pl-1 px-16 border sm:text-sm sm:leading-6"
                                />
                                <p className="text-red-600 text-sm">{errors.UserName?.message}</p>
                            </div>
                        </div>
                    </div>


                    <div className="password text-center mt-4">
                        <label className="block text-xl font-medium leading-6 text-gray-900 mb-2">Password</label>
                        <div className="flex justify-center">
                            <div className="rounded-md shadow-sm sm:max-w-md">
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    ref={passwordRef}
                                    {...register("password")}
                                    placeholder="Password Here...."
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="block bg-transparent py-1 pl-1 px-16 border sm:text-sm sm:leading-6"
                                />
                                <p className="text-red-600 text-sm">{errors.password?.message}</p>
                            </div>
                        </div>
                    </div>


                    <div className="confirm_password text-center mt-4">
                        <label className="block text-xl font-medium leading-6 text-gray-900 mb-2">Confirm Password</label>
                        <div className="flex justify-center">
                            <div className="rounded-md shadow-sm sm:max-w-md">
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    value={confirmPassword}
                                    ref={confirmPasswordRef}
                                    {...register("confirmPassword")}
                                    onChange={(e) => setconfirmPassword(e.target.value)}
                                    placeholder="Confirm Password Here...."
                                    className="block bg-transparent py-1 pl-1 px-16 border sm:text-sm sm:leading-6"
                                />
                                <p className="text-red-600 text-sm">{errors.confirmPassword?.message}</p>
                            </div>
                        </div>
                    </div>


                    <div className="buttons flex items-center justify-center mt-8 space-x-8">
                        <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:shadow-outline" type="submit">
                            Log In
                        </button>

                        <Link to={"/register"}>
                            <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:shadow-outline" type="submit">
                                Register
                            </button>
                        </Link>
                    </div>
                    <ToastContainer
                        position="top-right"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="dark"
                    />
                </form>
            </div>
        </div >
    );
}

export default Form;