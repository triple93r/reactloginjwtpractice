import React, { useState } from 'react'
import DashboardTables from '../../components/tables/DashboardTables'
import { useTranslation } from 'react-i18next';
import { Button, Modal } from 'react-bootstrap';
import CreateUser from '../../components/User/CreateUser';
import { userService } from '../../Api/user.services';
import { IRegisterUser } from '../../interfaces/IRegisterUser';

const DashboardPage = () => {
  const initialUser: IRegisterUser = {
    email: '',
    password: '',
    name: ''
}
  const { t } = useTranslation();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [dataFromChild, setDataFromChild] = useState(null);
  const [User, setUser] = useState<IRegisterUser>(initialUser);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleDataSubmit = (data: any) => {
    setDataFromChild(data);
    // Make API call
    userService.createUser(data)
    .then((response: any) => {
        setUser({
            email: response.data.email,
            name: response.data.name,
            password: response.data.password,
        });

        setShow(false);
        setSubmitted(true);
    })
    .catch((e: Error) => {
        console.log(e);
    });
  };
  return (
    <section>
      <h2 className="title">{t("dashboard")}</h2>
      <div>
        <Button variant="primary" onClick={handleShow}>
          Create User
        </Button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Insert Form</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <CreateUser onDataSubmit={handleDataSubmit}/>
          </Modal.Body>
        </Modal>
      </div>
      <DashboardTables submitted={submitted}/>
    </section>
  )
}

export default DashboardPage
