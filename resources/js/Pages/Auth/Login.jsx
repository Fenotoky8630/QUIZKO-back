import { useEffect } from 'react';
import Checkbox from '@/Components/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    return (
        <GuestLayout>
            <Head title="Connexion" />
            
            <div className="w-full max-w-md mx-auto space-y-8 bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-gray-800 text-center">Connexion à Quiz'ko</h2>
                
                {status && <div className="mb-4 font-medium text-sm text-center text-red-600">{status}</div>}
                
                <form onSubmit={submit} className="space-y-4">
                    <div className="space-y-2">
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all outline-none"
                            placeholder="Adresse e-mail"
                            autoComplete="username"
                            isFocused={true}
                            onChange={(e) => setData('email', e.target.value)}
                        />
                        <InputError message={errors.email} className="text-red-500 text-sm" />
                    </div>

                    <div className="space-y-2">
                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all outline-none"
                            placeholder="Mot de passe"
                            autoComplete="current-password"
                            onChange={(e) => setData('password', e.target.value)}
                        />
                        <InputError message={errors.password} className="text-red-500 text-sm" />
                    </div>

                    <div className="flex items-center justify-between">
                        <label className="flex items-center text-sm text-gray-700">
                            <Checkbox
                                name="remember"
                                checked={data.remember}
                                onChange={(e) => setData('remember', e.target.checked)}
                            />
                            <span className="ml-2">Se souvenir de moi</span>
                        </label>
                        {canResetPassword && (
                            <Link
                                href={route('password.request')}
                                className="text-sm text-purple-600 hover:underline"
                            >
                                Mot de passe oublié ?
                            </Link>
                        )}
                    </div>

                    <PrimaryButton
                        type="submit"
                        className="w-full"
                        disabled={processing}
                    >
                        Connexion
                    </PrimaryButton>

                    <p className="text-center text-sm text-gray-500">
                        En cliquant sur Connexion, vous acceptez nos{' '}
                        <a href="#" className="text-purple-600 hover:underline">Conditions d'utilisation</a>{' '}et notre{' '}
                        <a href="#" className="text-purple-600 hover:underline">Politique de confidentialité</a>.
                    </p>
                </form>
            </div>
        </GuestLayout>
    );
}
