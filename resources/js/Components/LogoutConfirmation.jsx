import React from 'react'
import Modal from './Modal'
import SecondaryButton from './SecondaryButton'
import DangerButton from './DangerButton'
import { Link } from '@inertiajs/react'

function LogoutConfirmation({confirmingLogout,closeModal}) {
  return (
    <div>
        <Modal show={confirmingLogout} onClose={closeModal}>
                <div className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        Voulez-vous vraiment déconnecté?
                    </h2>


                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>Annuler</SecondaryButton>
                        <Link
                        method="post"
                        as="button"
                        href={route("logout")}
                            className={`ms-2 inline-flex items-center px-4 py-2 bg-purple-950 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150`}
                        >
                        Déconnexion
                        </Link>
                            </div>
                </div>
            </Modal>
    </div>
  )
}

export default LogoutConfirmation
