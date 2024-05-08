import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

function Example(args) {
    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    return (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <Button color="danger" onClick={toggle}>
                suring with confirmation
            </Button>
            <Modal isOpen={modal} toggle={toggle} {...args}>
                <ModalHeader toggle={toggle}>Modal title</ModalHeader>
                <ModalBody>
                    Hey there welcome to my modal operation
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={toggle}>
                        Do Something
                    </Button>{' '}
                    <Button color="secondary" onClick={toggle}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default Example;

