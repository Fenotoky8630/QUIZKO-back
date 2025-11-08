
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import {  useEffect } from "react";
import { usePage } from "@inertiajs/react";
import Select from "@/Components/Select";

export default function Form({
    mode = "creation",
    data,
    setData,
    errors,
    processing,
    onReset,
    onSubmit,
    onCancel,
}) {
    const {posts}= usePage().props;
    useEffect(() => {
        return () => {
            onReset?.();
        };
    }, []);

    return (
        <form className="p-5" onSubmit={onSubmit}>
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

            </fieldset>

            <fieldset className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div className="mt-4">
                <InputLabel htmlFor="gender" value="Sexe" />

                    <div className="mt-1 text-black">
                        <label className="inline-flex items-center">
                            <input
                                type="radio"
                                className="form-radio text-purple-950"
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
                                className="form-radio text-purple-950"
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
                                       <div className="flex flex-wrap gap-2 mt-1">
                                           {posts.length > 0 && posts.map((post) => (
                                               <div 
                                                   key={post.id}
                                                   className={`px-3 py-1 rounded-md cursor-pointer text-sm transition ${
                                                       data.post_id === post.id
                                                           ? "border-2 border-purple-700 bg-purple-950 text-white"
                                                           : "border-2 border-gray-300 text-gray-700 hover:border-purple-950"
                                                   }`}
                                                   onClick={() => setData("post_id", post.id)}
                                               >
                                                   {post.name}
                                               </div>
                                           ))}
                                       </div>

                    <InputError message={errors.post_id_id} className="mt-2" />
                    </div>
            </fieldset>

            <fieldset className="grid grid-cols-1 md:grid-cols-2 gap-2">
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

                <div className="mt-4">
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
                </div>
            </fieldset>
                    <fieldset className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <div className="mt-4">
                            <InputLabel htmlFor="password" value="Mot de passe" />

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
                                required
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
                                required
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
                    {mode === "creation" ? "Ajouter" : "Sauvegarder"}
                </PrimaryButton>
            </div>
        </form>
    );
}
