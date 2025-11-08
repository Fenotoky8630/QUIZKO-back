import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <GuestLayout>
            <Head title="Mot de passe oublié" />

            <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-xl font-bold text-gray-800 text-center mb-4">
                    Mot de passe oublié ?
                </h2>

                <p className="text-sm text-gray-600 text-center mb-4">
                    Pas de souci. Entrez votre adresse e-mail et nous vous enverrons un lien pour réinitialiser votre mot de passe.
                </p>

                {status && (
                    <div className="mb-4 text-sm font-medium text-center text-green-600">
                        {status}
                    </div>
                )}

                <form onSubmit={submit} className="space-y-4">
                    <div>
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all outline-none"
                            placeholder="Votre adresse e-mail"
                            isFocused={true}
                            onChange={(e) => setData('email', e.target.value)}
                        />
                        <InputError message={errors.email} className="text-red-500 text-sm mt-2" />
                    </div>

                    <div className="flex justify-center">
                        <PrimaryButton className="w-full" disabled={processing}>
                            Envoyer le lien de réinitialisation
                        </PrimaryButton>
                    </div>
                    <Link
                                href={route('login')}
                                className="text-sm text-purple-600 hover:underline"
                            >
                                Se connecter ?
                            </Link>
                </form>
            </div>
        </GuestLayout>
    );
}
