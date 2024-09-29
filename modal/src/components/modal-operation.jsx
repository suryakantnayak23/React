// src/App.js
import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useTranslation } from 'react-i18next';

function ModalOperation() {
    const { t, i18n } = useTranslation(); // t is the translation function from react-i18next

    // State to control which modal is open
    const [modal, setModal] = useState(null);

    // Toggle the modal
    const toggleModal = (language) => {
        i18n.changeLanguage(language); // Change the language based on which button was clicked
        setModal(!modal ? language : null); // Open or close the modal
    };

    return (
        <div className="App">
            <h1>{t('Choose Modal')}</h1>

            {/* Button to open English modal */}
            <Button className='me-3' color="primary" onClick={() => toggleModal('en')}>
                Open English Modal
            </Button>

            {/* Button to open French modal */}
            <Button color="secondary" onClick={() => toggleModal('fr')}>
                Ouvrir la modale française
            </Button>

            {/* Modal for both English and French, content changes based on language */}
            <Modal isOpen={modal !== null} toggle={() => toggleModal(null)}>
                <ModalHeader >{t('modalTitle')}</ModalHeader>
                <ModalBody>{t('modalBody')}</ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => toggleModal(null)}>
                        {t('modalOk')}
                    </Button>{' '}
                    <Button color="secondary" onClick={() => toggleModal(null)}>
                        {t('modalCancel')}
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default ModalOperation;
