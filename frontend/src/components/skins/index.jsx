import React, { useState, useEffect } from "react";

// dependencies
import "./styles.css";
import api from "../../services/api";
import { getItems, clear } from "../../services/storage/skinsStorage";
import { Button } from "react-bootstrap";
import PubSub from "pubsub-js";

// components
import SkinCard from "./cards";
import AddSkinModal from "./modal";

// icons
import { CgPlayListAdd } from "react-icons/cg";
import { VscDebugRestartFrame } from "react-icons/vsc";
import { VscClearAll } from "react-icons/vsc";

function Skins() {
  const [items, setItems] = useState(getItems());
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    PubSub.subscribe("updateInventory", (msg, data) => {
      setItems(getItems());
    });
  }, []);

  return (

    <div className="container pt-2 pb-2">
      <AddSkinModal show={showModal} handleClose={() => setShowModal(false)} />
      <div className="card h-100">

        <div className="category-header d-flex align-items-center">Skins

          <div className="mx-auto">

            <Button
              variant="secondary"
              className="mr-3 button-update"
              title="Update in-game"
              onClick={async () => {
                await api.post("/skinChanger", getItems());
                await api.get("/forceUpdate");
              }}
            >
              <VscDebugRestartFrame />
            </Button>
            <Button
              className="mr-3 button-add"
              variant="success"
              title="Add item"
              onClick={() => setShowModal(true)}
            >
              <CgPlayListAdd />
            </Button>
            <Button
              variant="danger"
              className="mr-3 button-clear"
              title="Clear inventory"
              onClick={() => {
                clear();
                setItems(getItems());
              }}
            >
              <VscClearAll />
            </Button>
          </div>
        </div>

        <div className="category-title">My skins</div>

        <div className="category-separator"></div>

        <div className="pl-3 pb-3">
          {items.map((weapon) => { return <SkinCard weapon={weapon} />; })}
        </div>

      </div>
    </div>
  );
}

export default Skins;
