import { useForm } from "react-hook-form";
import Heading from "@components/commons/Heading";
import { zodResolver } from "@hookform/resolvers/zod";
import { signup, type TFormInputs } from "@validation/RegisterationSchema";
import Form from "@components/form/Form";
import useCheckEmailAvail from "@hooks/useCheckEmailAvail";
import ActAuthRegister from "@store/Act/ActAuthRegister";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { useNavigate,Navigate } from "react-router-dom";
import { ResetUi } from "@store/Auth/AuthSlice";
import { useEffect } from "react";
import useRegister from "@hooks/useRegister";
const Register = () => {
 const {
   loading,
   error,
   accessToken,
   emailonblurhandler,
   submitform,
   register,
   handleSubmit,
   emailAvailabilityStatus,
   errors
 }=useRegister();
    if (accessToken) {
      return <Navigate to="/" />;
    }
  return (
    <>
      <Heading title="User Registeration" />
      <div className=" flex items-center justify-center px-4">
        <form
          onSubmit={handleSubmit(submitform)}
          className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 space-y-5 my-5 border-2 border-primary"
        >
          <Form
            type="text"
            name="firstName"
            register={register}
            error={errors.firstName?.message}
          />
          <Form
            type="text"
            name="lastName"
            register={register}
            error={errors.lastName?.message}
          />
          <Form
            type="email"
            name="email"
            register={register}
            error={
              errors.email?.message
                ? errors.email?.message
                : emailAvailabilityStatus === "notAvailable"
                  ? "This email is already in use."
                  : emailAvailabilityStatus === "failed"
                    ? "Error from the server."
                    : ""
            }
            onBlur={emailonblurhandler}
            formtext={
              emailAvailabilityStatus === "checking"
                ? "We're currently checking the availability of this email address. Please wait a moment."
                : ""
            }
            success={
              emailAvailabilityStatus === "available"
                ? "This email is available for use."
                : ""
            }
          />
          <Form
            type="password"
            name="password"
            register={register}
            error={errors.password?.message}
          />
          <Form
            type="password"
            name="confirmPassword"
            register={register}
            error={errors.confirmPassword?.message}
          />

          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-lg font-semibold hover:opacity-90 transition"
            disabled={(emailAvailabilityStatus === "checking" ? true : false) || loading==="pending"}
          >
            {loading==="pending"?"loading":"Submit"}
          </button>

          {error&&<p className="text-red-600 text-2xl">error</p>}
        </form>
      </div>
    </>
  );
};

export default Register;
