import React, { useState } from "react";

// dependencies
import { Modal, Button } from "react-bootstrap";
import Select from "react-select";
import PubSub from "pubsub-js";
import swal from "sweetalert";

// components
import weapons from "./weapons.json";
import skins from "./weapons/skins";
import { addItem } from "../../../services/storage/skinsStorage";

const groupStyles = {
  color: "rgb(67, 76, 94)",
  fontWeight: "bold",
  padding: "5px",
  fontSize: 14,
  justifyContent: "space-between",
  textAlign: "center",
};

const formatGroupLabel = (data) => (
  <div style={groupStyles}>
    <span>{data.label}</span>
  </div>
);

function AddSkinModal({ show, handleClose }) {
  const [selectedWeapon, setSelectedWeapon] = useState(weapons[0].options[0]);
  const [selectedSkin, setSelectedSkin] = useState(
    skins[`skins${selectedWeapon.value}`][0]
  );

  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={show}
      onHide={handleClose}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Add Item</Modal.Title>
      </Modal.Header>

      <Modal.Body className="d-flex flex-column align-items-center">
        <Select
          options={weapons}
          className="mb-3 w-100"
          placeholder="Weapon"
          value={selectedWeapon}
          formatGroupLabel={formatGroupLabel}
          onChange={(value) => {
            setSelectedWeapon(value);
            setSelectedSkin(skins[`skins${value.value}`][0]);
          }}
        />
        <Select
          options={skins[`skins${selectedWeapon.value}`]}
          className="mb-3 w-100"
          placeholder="Paint Kit"
          value={selectedSkin}
          onChange={(value) => setSelectedSkin(value)}
        />
        <img
          src={selectedSkin.skinImgURL}
          title={selectedSkin.label}
          alt={selectedSkin.label}
          className="skin-preview"
        />
      </Modal.Body>

      <Modal.Footer>
        <Button
          className="button-add"
          variant="success"
          style={{ fontWeight: "normal" }}
          onClick={async () => {
            const skin = selectedSkin;
            skin.skin = skin.label;
            skin.skinID = skin.value;

            if (!addItem(skin)) {
              const content = document.createElement("div");
              content.innerHTML = `There's already another skin for <strong>${selectedWeapon.label}</strong> do you want to replace it?`;

              const status = await swal({
                title: "Repeated weapon",
                content,
                buttons: {
                  yes: {
                    text: "Yes",
                    value: true,
                    className: "button-add",
                  },
                  cancel: {
                    text: "No",
                    visible: true,
                    value: null,
                  },
                },
              });

              if (status) {
                addItem(skin, true);
              }
            }

            PubSub.publish("updateInventory", skin);

            handleClose();
          }}
        >
          <div>
            Add
          </div>
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddSkinModal;
