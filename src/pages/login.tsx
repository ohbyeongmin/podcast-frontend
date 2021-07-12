import { gql, useMutation } from "@apollo/client";
import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { authTokenVar, isloggedInVar } from "../apollo";
import { Button } from "../components/button";
import { FormError } from "../components/form-error";
import { LOCAL_STORAGE_TOKEN } from "../constants";
import {
    loginMutation,
    loginMutationVariables,
} from "../__generated__/loginMutation";
import { Helmet } from "react-helmet-async";
import { ParticlesComponent } from "../components/particles";
import podcastLogo from "../images/logo.svg";

interface ILoginForm {
    email: string;
    password: string;
}

const LOGIN_MUTATION = gql`
    mutation loginMutation($loginInput: LoginInput!) {
        login(input: $loginInput) {
            ok
            error
            token
        }
    }
`;

export const Login = () => {
    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors, isValid },
    } = useForm<ILoginForm>({
        mode: "onChange",
    });
    const onCompleted = (data: loginMutation) => {
        const {
            login: { ok, token },
        } = data;
        if (ok && token) {
            localStorage.setItem(LOCAL_STORAGE_TOKEN, token);
            authTokenVar(token);
            isloggedInVar(true);
        }
    };
    const [loginMutation, { data: loginMutationResult, loading }] = useMutation<
        loginMutation,
        loginMutationVariables
    >(LOGIN_MUTATION, {
        onCompleted,
    });
    const onSubmit = () => {
        if (!loading) {
            const { email, password } = getValues();
            loginMutation({
                variables: {
                    loginInput: {
                        email,
                        password,
                    },
                },
            });
        }
    };
    return (
        <ParticlesComponent>
            <div className="h-screen flex flex-col justify-center items-center">
                <Helmet>
                    <title>Podcast | Login</title>
                </Helmet>
                <div className="flex bg-opacity-10  rounded-full bg-white  text-red-400 items-center justify-center max-w-lg w-full py-2 px-28 text-center mb-5">
                    <img src={podcastLogo} alt="podcast" className="w-16 " />
                    <span className="text-coolGray-100 text font-semibold text-6xl">
                        Podcast
                    </span>
                </div>
                <div className="bg-trueGray-800 w-full  max-w-lg text-center  rounded-xl py-7 px-10 shadow-md">
                    <h1 className="font-bold text-3xl mb-8 text-red-400">
                        Welcome
                    </h1>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="grid gap-8 mb-3"
                    >
                        <input
                            {...register("email", {
                                required: "email is required",
                                pattern:
                                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                            })}
                            className=" bg-gray-100 py-3 px-4 rounded-lg  shadow-inner focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50"
                            type="email"
                            required
                            placeholder="email"
                        />
                        {errors.email?.message && (
                            <FormError errorMessage={errors.email?.message} />
                        )}
                        <input
                            {...register("password", {
                                required: "password is required",
                            })}
                            className=" bg-gray-100 py-3 px-4 rounded-lg  shadow-inner focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50"
                            type="password"
                            required
                            placeholder="password"
                        />
                        {errors.password?.message && (
                            <FormError
                                errorMessage={errors.password?.message}
                            />
                        )}
                        <Button
                            canClick={isValid}
                            loading={loading}
                            actionText={"LOGIN"}
                        />
                        {loginMutationResult?.login.error && (
                            <FormError
                                errorMessage={loginMutationResult?.login.error}
                            />
                        )}
                    </form>
                    <div className="text-sm text-coolGray-100">
                        Don't have an account?{" "}
                        <Link to="create-account" className="text-green-400">
                            Create Account
                        </Link>
                    </div>
                </div>
            </div>
        </ParticlesComponent>
    );
};
