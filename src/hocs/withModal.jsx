import React, { useState, useEffect } from 'react';
import MyModal from "../components/MyModal";

export default (WrappedComponent) => {
    return props => {
        const loginStatus = props.profile ? 'logged' : '';
        const [showModal, setShowModal] = useState(false);
        const [modalContent, setModalContent] = useState();
        const [fetchAgain, setFetchAgain] = useState(false);
        const [itemSelected, setItemSelected] = useState();

        const handleClose = (shouldUpdate) => {
            setShowModal(false);
            if(shouldUpdate) setFetchAgain(!fetchAgain);
        }

        return (
            <>
                <WrappedComponent {...props} setShowModal={setShowModal} setModalContent={setModalContent} fetchAgain={fetchAgain} loginStatus={loginStatus} setItemSelected={setItemSelected} />
                <MyModal show={showModal} handleClose={handleClose}>
                    {modalContent && modalContent({ type: showModal, handleClose, setShowModal, itemSelected})}
                </MyModal>
            </>
        );
    }
}