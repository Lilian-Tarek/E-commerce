import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signup, type TFormInputs } from "@validation/RegisterationSchema";
import useCheckEmailAvail from "@hooks/useCheckEmailAvail";
import ActAuthRegister from "@store/Auth/ActAuthRegister";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { useNavigate } from "react-router-dom";
import { ResetUi } from "@store/Auth/AuthSlice";
import { useEffect } from "react";
export default function useRegister() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, error, accessToken } = useAppSelector(
    (state) => state.AuthSlice
  );
  useEffect(() => {
    return () => {
      dispatch(ResetUi());
    };
  }, [dispatch]);
  const {
    register,
    handleSubmit,
    getFieldState,
    trigger,
    formState: { errors }
  } = useForm<TFormInputs>({
    resolver: zodResolver(signup),
    mode: "onBlur"
  });
  const {
    emailAvailabilityStatus,
    enteredEmail,
    checkEmailAvailability,
    resetCheckEmailAvailability
  } = useCheckEmailAvail();

  const submitform = async (data: TFormInputs) => {
    const { firstName, lastName, email, password } = data;
    dispatch(ActAuthRegister({ firstName, lastName, email, password }))
      .unwrap()
      .then(() => {
        navigate("/login?message=account_created");
      });
  };
  const emailonblurhandler = async (e: React.FocusEvent<HTMLInputElement>) => {
    await trigger("email");
    const value = e.target.value;
    const { isDirty, invalid } = getFieldState("email");
    console.log(isDirty, invalid);
    if (isDirty && !invalid && enteredEmail !== value) {
      checkEmailAvailability(value);
    }
    if (isDirty && invalid && enteredEmail) {
      resetCheckEmailAvailability();
    }
  };
  return {
    loading,
    error,
    accessToken,
    emailonblurhandler,
    submitform,
    register,
    handleSubmit,
    emailAvailabilityStatus,
    errors
  };
}
