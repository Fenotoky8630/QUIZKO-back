import PrimaryButton from "./PrimaryButton";
import SecondaryButton from "./SecondaryButton";

export default function DeletionConfirmation({
    name,
    onCancel,
    handleDeleteSubmit,
}) {
    return (
        <div className=" space-y-4 py-5 text-black">
            <p className="text-center">
                Voulez-vous vraiment supprimer {name} ?
            </p>
            <div className="text-center space-x-10">
                <SecondaryButton
                    onClick={() => {
                        onCancel();
                    }}
                >
                    Annuler
                </SecondaryButton>
                <PrimaryButton onClick={handleDeleteSubmit}>Oui</PrimaryButton>
            </div>
        </div>
    );
}