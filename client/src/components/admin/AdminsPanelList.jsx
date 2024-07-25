import React, { useState, useEffect } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import { useAuthStore } from "../../store/Store";
import Button from "@mui/material/Button";
import NewAdminModal from "./NewAdminModal";

const AdminsPanelList = () => {
  const token = useAuthStore((state) => state.token);
  const [admins, setAdmins] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const [searchAdmin, setSearchAdmin] = useState("");

  const [openAddAdminModal, setOpenAddAdminModal] = useState(false);

  const handleAddAdminOpen = () => setOpenAddAdminModal(true);
  const handleAddAdminClose = () => setOpenAddAdminModal(false);

  const [currentAdminId, setCurrentAdminId] = useState();

  const [openDeleteAdminModal, setOpenDeleteAdminModal] = useState(false);

  const handleDeleteAdminOpen = (id) => {
    setOpenDeleteAdminModal(true);
    setCurrentAdminId(id);
  };

  const handleDeleteAdminClose = () => setOpenDeleteAdminModal(false);

  const fetchAdmins = async () => {
    try {
      setIsLoading(true);

      const response = await axios.get(
        `${process.env.REACT_APP_MAIN_URL}/users`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // console.log(response.data);

      setAdmins(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const updateAdminsList = () => {
    fetchAdmins();
  };

  const deleteAdmin = async () => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_MAIN_URL}/users/${currentAdminId}`
      );

      fetchAdmins();
      handleDeleteAdminClose();
    } catch (err) {
      console.log(err);
    }
  };

  const filteredAdmins =
    admins &&
    admins.filter((admin) =>
      admin.username.toLowerCase().includes(searchAdmin.trim().toLowerCase())
    );

  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <>
      <NewAdminModal
        open={openAddAdminModal}
        closeHandler={handleAddAdminClose}
        onUpdate={updateAdminsList}
      />

      <Modal open={openDeleteAdminModal} onClose={handleDeleteAdminClose}>
        <div className="admin-open-modal">
          <h2>
            Точно <span style={{ color: "red" }}>ВИДАЛИТИ</span> адміністратора?
          </h2>
          <Button variant="contained" color="error" onClick={deleteAdmin}>
            Видалити остаточно
          </Button>
        </div>
      </Modal>

      <Button variant="contained" color="success" onClick={handleAddAdminOpen}>
        Додати
      </Button>

      <TextField
        style={{ marginTop: 20 }}
        fullWidth
        label="Пошук адміна.."
        id="fullWidth"
        value={searchAdmin}
        onChange={(e) => setSearchAdmin(e.target.value)}
      />

      {!isLoading &&
        admins &&
        filteredAdmins.map((admin) => (
          <div className="admin-panel-shop-item" key={admin._id}>
            <div className="admin-panel-product-item-title">
              {admin.username}
            </div>
            <Button
              variant="outlined"
              color="error"
              onClick={() => handleDeleteAdminOpen(admin._id)}
            >
              Видалити
            </Button>
          </div>
        ))}
    </>
  );
};

export default AdminsPanelList;
