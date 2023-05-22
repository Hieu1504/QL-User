import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { postCreateUser } from '../service/UserService';
import { toast } from 'react-toastify';

const ModalAddNew = (prop) => {
    const { show, handleClose, handleUpdateTable } = prop;
    const [name, setName] = useState("");
    const [job, setJob] = useState("");
    const handleSaveUser = async () => {
        let res = await postCreateUser(name, job)

        if (res && res.id) {
            handleClose();
            setName('');
            setJob('');
            toast.success("A user created success !")
            handleUpdateTable({ first_name: name, id: res.id });
            //success
        } else {
            toast.error("An error...")
            //error
        }
    }

    return (
        <>

            <div
                className="modal show"
                style={{ display: 'block', position: 'initial' }}
            >
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add new user</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <div className='body-add-new'>
                            <div class="mb-3">
                                <label className="form-label">Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={name}
                                    onChange={(event) => setName(event.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Job</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={job}
                                    onChange={(event) => setJob(event.target.value)}
                                />
                            </div>
                        </div>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={() => handleSaveUser()}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>

        </>


    )
}

export default ModalAddNew;

