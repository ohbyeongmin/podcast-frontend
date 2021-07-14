import { gql, useMutation } from "@apollo/client";
import React from "react";
import { useForm } from "react-hook-form";
import { useHistory, Link } from "react-router-dom";
import { Button } from "../components/button";
import { FormError } from "../components/form-error";
import {
    createAccountMutation,
    createAccountMutationVariables,
} from "../__generated__/createAccountMutation";
import { UserRole } from "../__generated__/globalTypes";
import { Helmet } from "react-helmet-async";
import { ParticlesComponent } from "../components/particles";
import podcastLogo from "../images/logo.svg";

interface ICreateAccountForm {
    email: string;
    password: string;
    role: UserRole;
}

const CREATE_ACCOUNT_MUTATION = gql`
    mutation createAccountMutation($createAccountInput: CreateAccountInput!) {
        createAccount(input: $createAccountInput) {
            ok
            error
        }
    }
`;

export const CreateAccount = () => {
    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors, isValid },
    } = useForm<ICreateAccountForm>({
        mode: "onChange",
        defaultValues: {
            role: UserRole.Listener,
        },
    });
    const history = useHistory();
    const onCompleted = (data: createAccountMutation) => {
        const {
            createAccount: { ok },
        } = data;
        if (ok) {
            alert("Create Account!");
            history.push("/");
        }
    };
    const [createAccountMutation, { data: createAccountResult, loading }] =
        useMutation<createAccountMutation, createAccountMutationVariables>(
            CREATE_ACCOUNT_MUTATION,
            { onCompleted }
        );
    const onSubmit = () => {
        if (!loading) {
            const { email, password, role } = getValues();
            createAccountMutation({
                variables: {
                    createAccountInput: {
                        email,
                        password,
                        role,
                    },
                },
            });
        }
    };
    return (
        <ParticlesComponent>
            <div className="h-screen flex flex-col justify-center items-center">
                <Helmet>
                    <title>Podcast | Create Account</title>
                </Helmet>
                <div className="flex bg-opacity-10  rounded-full bg-white  text-red-400 items-center justify-center max-w-xs sm:max-w-lg  w-full py-2 px-28 text-center mb-5">
                    <img
                        src={podcastLogo}
                        alt="podcast"
                        className="w-12 sm:w-16 "
                    />
                    <span className="text-coolGray-100 font-semibold text-5xl sm:text-6xl">
                        Podcast
                    </span>
                </div>
                <div className="bg-trueGray-800  w-full max-w-xs sm:max-w-lg text-center rounded-xl py-7 px-10 shadow-md">
                    <h1 className="font-bold text-red-400 text-3xl mb-8">
                        Join with Me!
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
                            className="bg-gray-100 py-3 px-4 rounded-lg  shadow-inner focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50"
                            type="password"
                            required
                            placeholder="password"
                        />
                        {errors.password?.message && (
                            <FormError
                                errorMessage={errors.password?.message}
                            />
                        )}
                        <select
                            {...register("role")}
                            className="bg-gray-100 py-3 px-4 rounded-lg  shadow-inner focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50"
                        >
                            {Object.keys(UserRole).map((role, index) => (
                                <option key={index}>{role}</option>
                            ))}
                        </select>
                        <Button
                            canClick={isValid}
                            loading={loading}
                            actionText={"JOIN"}
                        />
                        {createAccountResult?.createAccount.error && (
                            <FormError
                                errorMessage={
                                    createAccountResult.createAccount.error
                                }
                            />
                        )}
                    </form>
                    <div className="text-sm text-coolGray-100">
                        Already have an account?{" "}
                        <Link to="/" className="text-green-400">
                            Log in
                        </Link>
                    </div>
                </div>
            </div>
        </ParticlesComponent>
    );
};
