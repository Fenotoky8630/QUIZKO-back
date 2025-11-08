
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import {  useEffect } from "react";
import Select from "@/Components/Select";
import { usePage } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";

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
    const { posts, subjects } = usePage().props;

    useEffect(() => {
        return () => {
            onReset?.();
        };
    }, []);

    return (
        <form className="p-5 bg-white rounded-lg shadow-sm" onSubmit={onSubmit}>
            {/* Champs organisés en grille à 2 colonnes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Nom du test */}
                <div>
                    <InputLabel htmlFor="name" value="Nom du test" />
                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        autoComplete="name"
                        isFocused={true}
                        onChange={(e) => setData("name", e.target.value)}
                        required
                    />
                    <InputError message={errors.name} className="mt-2" />
                </div>

                {/* Sujet */}
                <div>
                    <InputLabel htmlFor="subject_id" value="Sujet" />
                    <Select
                        id="subject_id"
                        name="subject_id"
                        value={data.subject_id}
                        className="mt-1 block w-full"
                        onChange={(e) => setData("subject_id", e.target.value)}
                        required
                        options={subjects.length > 0 ? subjects.map((subject) => ({
                            value: subject.id,
                            label: subject.subject,
                        })) : []}
                    />
                    <InputError message={errors.subject_id} className="mt-2" />
                </div>

                {/* Début */}
                <div>
                    <InputLabel htmlFor="start_date" value="Début" />
                    <TextInput
                        type="datetime-local"
                        id="start_date"
                        name="start_date"
                        value={data.start_date}
                        className="mt-1 block w-full"
                        autoComplete="start_date"
                        onChange={(e) => setData("start_date", e.target.value)}
                        required
                    />
                    <InputError message={errors.start_date} className="mt-2" />
                </div>

                {/* Fin */}
                <div>
                    <InputLabel htmlFor="end_date" value="Fin" />
                    <TextInput
                        type="datetime-local"
                        id="end_date"
                        name="end_date"
                        value={data.end_date}
                        className="mt-1 block w-full"
                        autoComplete="end_date"
                        onChange={(e) => setData("end_date", e.target.value)}
                        required
                    />
                    <InputError message={errors.end_date} className="mt-2" />
                </div>

                {/* Durée */}
                <div>
                    <InputLabel htmlFor="time" value="Durée" />
                    <TextInput
                        type="time"
                        min="0"
                        id="time"
                        name="time"
                        value={data.time}
                        className="mt-1 block w-full"
                        autoComplete="time"
                        onChange={(e) => setData("time", e.target.value)}
                        required
                    />
                    <InputError message={errors.time} className="mt-2" />
                </div>

                {/* Classe */}
                <div>
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
                    <InputError message={errors.post_id} className="mt-2" />
                </div>
            </div>

            {/* Boutons */}
            <div className="flex items-center justify-end mt-6 space-x-4">
                <SecondaryButton onClick={onCancel} disabled={processing}>
                    Annuler
                </SecondaryButton>
                <PrimaryButton type="submit" disabled={processing}>
                    {mode === "creation" ? "Ajouter" : "Modifier"}
                </PrimaryButton>
            </div>
        </form>
    );
}
