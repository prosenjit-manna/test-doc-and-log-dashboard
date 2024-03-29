import React from 'react';
import ButtonComponent from '../../../Components/Button/ButtonComponent';
import TextFieldComponent from '../../../Components/TextField/TextFieldComponent';
import EmailIcon from '../../../Icons/Email-Icon';
import LockIcon from '../../../Icons/Lock-Icon';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../../Lib/Store/hooks';
import { userSliceActions } from '../../../Lib/Store/User/User.Slice';
import { Link } from 'react-router-dom';
import routes from '../../../Lib/Routes/Routes';
import { useViewportSize } from '@mantine/hooks';
import { useMutation } from '@apollo/client';
import { LOGIN_MUTATION } from './loginMutation';
import { localStore } from 'Lib/Api/LocalStore';
import { LoginFormFields } from './LoginFormFields.interface';


export default function LoginPage() {
  const loginState = useAppSelector(state => state.user.login);
  const dispatch  = useAppDispatch();
  const { height } = useViewportSize();

  const [loginApi, { loading }] = useMutation(LOGIN_MUTATION)

  const {
    register,
    handleSubmit,
  } = useForm<LoginFormFields>();
  
  const onSubmit = (data: LoginFormFields) => {
    loginApi({
      variables: {
        input: {
          identifier: data.username,
          password: data.password,
          provider: 'local'
        }
      },
      onCompleted: (data) => {
        localStore.update({ token: data.login.jwt })
        dispatch(userSliceActions.setToken(data.login.jwt as string));  
        setTimeout(() => {
          dispatch(userSliceActions.login());  
        }, 1000);
        console.log(data.login.jwt);
      }
    })
  };

  return (
    <div style={{ height: `${height}px` }} className='flex justify-center items-center'>
      <div className='mx-auto flex flex-col w-full max-w-md px-4 py-8 bg-white rounded-lg shadow  sm:px-6 md:px-8 lg:px-10'>
      <div className='self-center mb-6 text-xl font-light text-gray-600 sm:text-2xl '>Login To Your Account</div>
      <div className='mt-8'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextFieldComponent icon={<EmailIcon />} placeholder='Your email' register={register('username')} />
          
          <TextFieldComponent icon={<LockIcon />} placeholder='Your password' type='password' register={register('password')} />
          <div className='flex items-center mb-6 mt-4'>
            <div className='flex ml-auto'>
              <Link to={routes.forgetPassword.path}
               className='inline-flex text-xs  text-gray-500 sm:text-sm  hover:text-gray-700'>
                Forgot Your Password?
              </Link>
            </div>
          </div>
          <div className='flex w-full'>
            <ButtonComponent type='submit' loading={loginState.loading || loading}>Login</ButtonComponent>
          </div>
        </form>
      </div>
      <div className='flex items-center justify-center mt-6'>
        <Link
          to={routes.register.path}
          className='inline-flex items-center text-xs  text-center text-gray-500 hover:text-gray-700'>
          <span className='ml-2'>You don&#x27;t have an account?</span>
        </Link>
      </div>
    </div>
    </div>
  );
}
