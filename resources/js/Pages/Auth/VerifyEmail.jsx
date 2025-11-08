import GuestLayout from '@/Layouts/GuestLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import { Head, Link, useForm } from '@inertiajs/react';

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});

    const submit = (e) => {
        e.preventDefault();
        post(route('verification.send'));
    };

    return (
        <GuestLayout>
            <Head title="Vérification de l'email" />

            <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md text-center">
                <div className="flex justify-center text-purple-500 text-4xl mb-4">
                    
                </div>

                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    Vérifiez votre adresse e-mail
                </h2>

                <p className="text-sm text-gray-600 mb-4">
                    Merci de vous être inscrit ! Avant de commencer, veuillez vérifier votre adresse e-mail en cliquant
                    sur le lien que nous venons de vous envoyer. Si vous n'avez pas reçu l'e-mail, nous pouvons vous en renvoyer un.
                </p>

                {status === 'verification-link-sent' && (
                    <div className="mb-4 font-medium text-sm text-green-600 bg-green-100 p-3 rounded-lg">
                        Un nouveau lien de vérification a été envoyé à l'adresse e-mail fournie lors de votre inscription.
                    </div>
                )}

                <form onSubmit={submit} className="space-y-4">
                    <PrimaryButton className="w-full" disabled={processing}>
                        Renvoyer l'e-mail de vérification
                    </PrimaryButton>

                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="block text-sm text-gray-600 hover:text-gray-900 underline"
                    >
                        Se déconnecter
                    </Link>
                </form>
            </div>
        </GuestLayout>
    );
}
