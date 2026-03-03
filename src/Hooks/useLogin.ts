import { useForm } from "react-hook-form";
import Heading from "@components/commons/Heading";
import { zodResolver } from "@hookform/resolvers/zod";
import { signin, type TFormInputs } from "@validation/LoginSchema";
import Form from "@components/form/Form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAppDispatch } from "@store/hooks";
import actAuthLogin from "@store/Act/ActLogin";
import type { SubmitHandler } from "react-hook-form";
import { useAppSelector } from "@store/hooks";
import { ResetUi } from "@store/Auth/AuthSlice";
import { useEffect } from "react";
export default function useLogin() {
     const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    return () => { dispatch(ResetUi()) }
  },[dispatch])
  const {error,loading,accessToken} = useAppSelector(state=>state.AuthSlice);
    const {
      register,
      handleSubmit,
      formState: { errors }
    } = useForm<TFormInputs>({
      resolver: zodResolver(signin),
      mode: "onBlur"
    });
  const [searchParams, setSearchParams] = useSearchParams();
  const submitForm: SubmitHandler<TFormInputs> = async (data) => {
    if (searchParams.get("message") == "account_created")
    {
      setSearchParams("")
  }

    dispatch(actAuthLogin(data)).unwrap().then(()=>{navigate("/");});
  }

return {
  submitForm,
  searchParams,
  setSearchParams,
  register,
  handleSubmit,
  errors,
  error,
  loading,
  accessToken
};
}
