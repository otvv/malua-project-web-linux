import React from "react";

// dependencies
import "../styles.css";
import PubSub from "pubsub-js";

// icons
import { CgTrash } from "react-icons/cg";
import { HiCheck } from "react-icons/hi"
import { removeItem } from "../../../services/storage/skinsStorage";

function SkinCard({ weapon }) {
  const { weaponName, skin, uuid, skinImgURL, quality, team } = weapon;

  const qualitySpliced = quality.split("\x20")[0];

  return (
    <div className="card card-skin float-left m-2" key={uuid}>

      <div className="w-100" style={{ color: "#BF616A" }}>

        <div className="w-50 pt-1 float-left">
          <HiCheck title="Counter-Terrorists" style={{ display: team === "ct" ? "block" : "none" }} className="ml-2 skin-team-ct" size={20}/>
          <HiCheck title="Terrorists" style={{ display: team === "t" ? "block" : "none" }} className="ml-2 skin-team-t" size={20}/>
          
          <div className="ml-2" style={{ display: team === "both" ? "block" : "none" }}>
            <HiCheck title="Counter-Terrorists" className="skin-team-ct" size={20}/>
            <HiCheck title="Terrorists" className="skin-team-t" size={20}/>
          </div>
        </div>

        <div className="w-50 pt-2 float-right pr-2">
        <CgTrash
          title="Remove skin" className="float-right" style={{ cursor: "pointer" }}
          onClick={() => {
            removeItem({ uuid });
            PubSub.publish("updateInventory", skin);
          }}/>
        </div>

      </div>
      <img src={skinImgURL} className="card-img-top card-skin-img" alt="..." />
      <div
        className="card-body"
        style={{
          letterSpacing: 0.3,
          fontSize: 15,
        }}
      >
        <span style={{ fontWeight: "bold" }}>{weaponName}</span>
        <span> | </span>
        <span style={{ fontWeight: "bold" }}>{skin}</span>

        <div
          style={{
            padding: "1px",
            color: "var(--color-text)",
            fontWeight: 650,
            fontSize: "13px",
          }}
          className={`w-100 mt-2 skin-${qualitySpliced.toLowerCase().replace("\x20", "-")} rounded text-center`}
        >
          {quality}
        </div>
      </div>
    </div>
  );
}

export default SkinCard;
