import React, { useEffect, useState } from "react";
import { Text1, TextField } from "../../components/atoms/field";
import Button from "../../components/atoms/button";
import { RegisterImg } from "../../components/atoms/icons";
import { Headerouter } from "../../proj-components/Layout/sub-components/header";
import Link from "next/link";
import { useRouter } from 'next/router';
import authApi from "helpers/use-api/auth";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';


// import "../styles/globals.css";

function Register() {

  const router = useRouter();

  const [register, setRegister] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    acceptedTAndC: false,
    acceptedPrivacyPolicy: false
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const notify = (msg) => toast.success(msg);
  const errorNotify = (msg) => toast.error(msg)
  const onChange = (e) => {
    const { name, value } = e.target;
    setRegister({ ...register, [name]: value });
    console.log(register, "fdfff");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(register));
    setIsSubmit(true)
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit && register.acceptedPrivacyPolicy ) {
      handleLoginButtonClick()
      setIsSubmit(false)
    }
  }, [formErrors]);


  const handleLoginButtonClick = async() => {
    
    try{
        
         const res = await authApi.doRegister(register)
          console.log(res,'res')
          notify('account created successfully')
          setTimeout(()=>{
            router.push('/auth/login')
          },1000)
          

    }catch(err){
      console.log(err.response.data.error,'err')
      errorNotify(err.response.data.error)
      setTimeout(()=>{
        router.reload() 
    },1000)
    }
  
    // setRegister({ email: "", password: "", confirmPassword: "", acceptedTAndC: false, acceptedPrivacyPolicy: false})

  }

  const validate = (value) => {
    const error = {};
    const regex =
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!value.email) {
      error.EmailAddress = "Email address is required !";
    } else if (regex.test(value.EmailAddress)) {
      error.email = "Enter a valid email address ! ";
    }
    if (!value.password) {
      error.password = "Password is required !";
    }
    if (!value.confirmPassword) {
      error.confirmPassword = "Confirm Password is required !";
    } else if (value.confirmPassword !== value.password) {
      error.confirmPassword =
        "Confirm Password should be match with password !";
    }
    return error;
  };

  return (
    <>
      <div className="">
        <div className="">
          <Headerouter />
        </div>
        <div className="w-full h-[90vh]  flex item-center ">
          <div className="flex flex-col lg:flex-row  rounded-lg w-full">
            <div className="w-full  py-44 xl:py-52  2xl:py-48 bg-[#F1F5FD] flex flex-col justify-center items-center gap-28">
              <p className="text-base xl:text-xl font-light text-center">
                Track and Manage your Assets at the comfort of your screen.<br/>
                Anytime! Anywhere!
              </p>
              <RegisterImg
                className={
                  "w-[270px] h-[280px] xl:w-[325px] xl:h-[338px] 2xl:w-96 rounded-sm"
                }
              />
            </div>

            <div className="w-full  bg-white  flex items-center justify-center ">
              <form
                onSubmit={handleSubmit}
                action=""
                className=" flex flex-col  gap-[52px] w-[60%]">
                <div className="flex flex-col gap-8">
                  <Text1
                    weight="semibold"
                    size="3xl"
                    className={"text-primary"}>
                    Register company
                  </Text1>
                  <Text1 className="xl:text-xs 2xl:text-base font-normal">
                    Lorem ipsum dolor sit amet consectetur. Senectus enim
                    ultricies tellus mauris sapien sit ut dignissim ut tempor
                    urna.
                  </Text1>
                </div>

                <div className="flex flex-col gap-8 ">
                  <div>
                    <TextField
                      label={"Email Address"}
                      bgColor="white"
                      type="text"
                      textSize="lg"
                      name="email"
                      onChange={onChange}
                    />
                    <p className="text-red-500">{formErrors.email}</p>
                  </div>
                  <div>
                    <TextField
                      label={"Password"}
                      bgColor="white"
                      type="text"
                      name="password"
                      textSize="lg"
                      onChange={onChange}
                    />
                    <p className="text-red-500">{formErrors.password}</p>
                  </div>
                  <div>
                    <TextField
                      label={"Confirm Password"}
                      bgColor="white"
                      type="text"
                      name="confirmPassword"
                      textSize="lg"
                      onChange={onChange}
                    />
                    <p className="text-red-500">{formErrors.confirmPassword}</p>
                  </div>
                  <div>
                  <div className="flex items-center">
                    <input
                      id="link-checkbox"
                      type="checkbox"
                      checked={register.acceptedTAndC}
                      // checked={'acceptedTAndC'}
                      // value="acceptedTAndC"
                      onChange={(e)=> setRegister({...register,acceptedTAndC:e.target.checked,acceptedPrivacyPolicy:e.target.checked}) }
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor="link-checkbox"
                      className="ml-2 text-sm font-body text-gray-900 dark:text-gray-300">
                      Accept{" "}
                      <Link
                        href="#"
                        className="text-blue-600 dark:text-blue-500 hover:underline">
                        Terms of Services
                      </Link>{" "}
                      and{" "}
                      <Link
                        href="#"
                        className="text-blue-600 dark:text-blue-500 hover:underline">
                        Privacy Policy
                      </Link>
                    </label>

                  </div>
                  {!register.acceptedTAndC && <p className=" ml-2 text-red-500">Plaese accept Term & condition</p>}
                  </div>
                
                </div>
                <Button type="submit" variant="contained" >
                  Get Started
                </Button>
                <div className=" mx-auto my-[-40px]">
                  <Link href="/auth/login" className="text-blue-600 text-sm font-body">
                    Already have an Account ? Log in
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
        <ToastContainer/>
      </div>
    </>
  );
}

export const getServerSideProps = async (appCtx) => {


  const auth = await authApi.WhoAmI(appCtx)

  if(auth){
    return {
      redirect:{
        destination:'/dashboard',
        permanent:false
      }
    }
  }else{

  return {
    props:{

    }


   }
  }
}

export default Register;
