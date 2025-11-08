
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
    const {departments}= usePage().props;
    useEffect(() => {
        return () => {
            onReset?.();
        };
    }, []);
    return (
        <form className="p-3" onSubmit={onSubmit}>
         <fieldset className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="mt-4">
                    <InputLabel htmlFor="name" value="Nom" />
                    <TextInput
                        data-testid="name-input"
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        autoComplete="name"
                        onChange={(e) => setData("name", e.target.value)}
                        isFocused={true}
                        required
                    />

                    <InputError message={errors.name} className="mt-2" />
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

            <fieldset className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className="mt-4">
                        <InputLabel
                            htmlFor="job_title"
                            value="Titre de travail"
                        />

                        <TextInput
                            data-testid="job_title-input"
                            id="job_title"
                            name="job_title"
                            value={data.job_title}
                            className="mt-1 block w-full"
                            onChange={(e) =>
                                setData("job_title", e.target.value)
                            }
                            required
                        />

                        <InputError
                            message={errors.address}
                            className="mt-2"
                        />
                    </div>
                    <div className="mt-4">
                    <InputLabel htmlFor="department_id" value="Département" />
                        <Select
                        id="department_id"
                        name="department_id"
                        value={data.department_id}
                        className="mt-1 block w-full"
                        onChange={(e) => setData("department_id", e.target.value)}
                        required
                        options={departments.length>0 ?(departments.map((department) => ({
                            value: department.id,
                            label: department.name,
                        }))):([])}
                    />

                    <InputError message={errors.department_id} className="mt-2" />
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
            {mode === "creation" && 
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
        }
                
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
