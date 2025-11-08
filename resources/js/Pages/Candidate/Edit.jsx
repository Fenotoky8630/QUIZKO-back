import {  useForm } from "@inertiajs/react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import {  useEffect } from "react";
import Select from "@/Components/Select";

export default function Edit({candidate, onCancel,posts }) {
    const {
        data,
        setData,
        put,
        processing,
        errors,
        reset,
        cancel,
        hasErrors,
        recentlySuccessful,
    } = useForm({
        id: candidate.id,
        name: candidate.user.name,
        registration_number: candidate.registration_number,
        email: candidate.user.email,
        user_id: candidate.user.id,
        phone: candidate.user.phone,
        address:candidate.user.address,
        gender: candidate.gender,
        post_id: candidate.post_id,
        role: "candidate",
        password: "",
        password_confirmation: "",
    });
    const handleEditionSubmit = (e) => {
        e.preventDefault();
        const id=data.id;
        put(route("students.update", id));
        onCancel();
    };

    return (
        <form className="p-5" onSubmit={handleEditionSubmit}>
         <fieldset className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="mt-4">
                    <InputLabel htmlFor="registration_number" value="Numero d'inscription" />
                    <TextInput
                        data-testid="registration_number-input"
                        id="registration_number"
                        name="registration_number"
                        value={data.registration_number}
                        className="mt-1 block w-full"
                        autoComplete="registration_number"
                        onChange={(e) => setData("registration_number", e.target.value)}
                        isFocused={true}
                        required
                    />

                    <InputError message={errors.registration_number} className="mt-2" />
                </div>
                <div className="mt-4">
                <InputLabel htmlFor="email" value="Email" />
                    <TextInput
                        data-testid="email-input"
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="email"
                        onChange={(e) => setData("email", e.target.value)}
                        required
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>
            </fieldset>

            <fieldset className="">

                <div className="mt-4 md:mt-0">
                    <InputLabel htmlFor="name" value="Nom" />

                    <TextInput
                        data-testid="name-input"
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        autoComplete="name"
                        onChange={(e) => setData("name", e.target.value)}
                        required
                    />

                    <InputError message={errors.name} className="mt-2" />
                </div>

                {/* <div className="mt-4 md:mt-0">
                    <InputLabel htmlFor="first_name" value="Prénom" />

                    <TextInput
                        data-testid="first_name-input"
                        id="first_name"
                        name="first_name"
                        value={data.first_name}
                        className="mt-1 block w-full"
                        autoComplete="first_name"
                        onChange={(e) => setData("first_name", e.target.value)}
                        required
                    />

                    <InputError message={errors.first_name} className="mt-2" />
                </div> */}
            </fieldset>

            <fieldset className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div className="mt-4">
                <InputLabel htmlFor="gender" value="Sexe" />

                    <div className="mt-1 text-black">
                        <label className="inline-flex items-center">
                            <input
                                type="radio"
                                className="form-radio text-black"
                                name="gender"
                                value="masculine"
                                checked={data.gender === "masculine"}
                                onChange={(e) => setData("gender", e.target.value)}
                            />
                            <span className="ml-2">Masculin</span>
                        </label>
                        <label className="inline-flex items-center ml-6">
                            <input
                                type="radio"
                                className="form-radio text-black"
                                name="gender"
                                value="feminine"
                                checked={data.gender === "feminine"}
                                onChange={(e) => setData("gender", e.target.value)}
                            />
                            <span className="ml-2">Féminin</span>
                        </label>
                    </div>

                    <InputError message={errors.gender} className="mt-2" />
            </div>

                    <div className="mt-4">
                    <InputLabel htmlFor="post_id" value="Classe" />
                        <Select
                        id="post_id"
                        name="post_id"
                        value={data.post_id}
                        className="mt-1 block w-full"
                        onChange={(e) => setData("post_id", e.target.value)}
                        required
                        options={posts.length>0 ?(posts.map((post) => ({
                            value: post.id,
                            label: post.name,
                        }))):([])}
                    />

                    <InputError message={errors.department_id} className="mt-2" />
                    </div>
            </fieldset>

            <fieldset className="">
            <div className="mt-4">
                <InputLabel htmlFor="phone" value="Numéro de téléphone" />
                     <TextInput
                            data-testid="phone-input"
                            id="phone"
                            name="phone"
                            value={data.phone}
                            className="mt-1 block w-full"
                            autoComplete="phone"
                            onChange={(e) => setData("phone", e.target.value)}
                            required
                        /> 

                        <InputError message={errors.phone} className="mt-2" />  
            </div>

                {/* <div className="mt-4">
                    <InputLabel
                        htmlFor="address"
                        value="Adresse"
                    />

                    <TextInput
                        data-testid="firm_address-input"
                        id="address"
                        name="address"
                        value={data.address}
                        className="mt-1 block w-full"
                        onChange={(e) =>
                            setData("address", e.target.value)
                        }
                        required
                    />

                    <InputError
                        message={errors.address}
                        className="mt-2"
                    />
                </div> */}
            </fieldset>
                    <fieldset className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <div className="mt-4">
                            <InputLabel htmlFor="password" value="Nouveau Mot de passe" />

                            <TextInput
                                data-testid="password-input"
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="mt-1 block w-full"
                                autoComplete="new-password"
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                            />

                            <InputError
                                message={errors.password}
                                className="mt-2"
                            />
                        </div>

                        <div className="mt-4">
                            <InputLabel
                                htmlFor="password_confirmation"
                                value="Confirmation du mot de passe"
                            />

                            <TextInput
                                data-testid="password_confirmation-input"
                                id="password_confirmation"
                                type="password"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                className="mt-1 block w-full"
                                autoComplete="new-password"
                                onChange={(e) =>
                                    setData("password_confirmation", e.target.value)
                                }
                            />

                            <InputError
                                message={errors.password_confirmation}
                                className="mt-2"
                            />
                        </div>
                    </fieldset>       
            <div className="flex items-center justify-end mt-4">
                <SecondaryButton
                    data-testid="cancel-button"
                    className="ms-4"
                    onClick={onCancel}
                    disabled={processing}
                >
                    Annuler
                </SecondaryButton>

                <PrimaryButton
                    data-testid="submit-button"
                    className="ms-4"
                    type="submit"
                    disabled={processing}
                >
                   Sauvegarder
                </PrimaryButton>
            </div>
        </form>
    );
}