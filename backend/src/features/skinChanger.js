const fmemory = require('fmemory');
const knifeAnimationIndex = require('../helpers/definitions').knifeAnimationIndex;
const knifeDefinitionIndex = require('../helpers/definitions').knifeDefinitionIndex;

// TODO: get rid of this
const knifes = [
  500,
  514,
  515,
  503,
  512,
  505,
  506,
  509,
  507,
  508,
  520,
  518,
  517,
  516,
  525,
  522,
  521,
  523,
  519,
];

function getModelIndexByName(_csgo, _name) {
  const clientState = fmemory.readMemory(_csgo.engineModule + _csgo.offsetList.dwClientState, fmemory.INT);
  console.log("[MALUA-DEBUG] clientState = " + clientState)

  if (!clientState) {
    return;
  }

  const modelPrecacheTable = fmemory.readMemory(clientState + 0x52A4, fmemory.INT);
  console.log("[MALUA-DEBUG] modelPrecacheTable = " + modelPrecacheTable)

  if (!modelPrecacheTable) {
    return;
  }

  const itemsDictionary = fmemory.readMemory(modelPrecacheTable + 0x40, fmemory.INT);
  console.log("[MALUA-DEBUG] itemsDictionary = " + itemsDictionary)

  if (!itemsDictionary) {
    return;
  }

  const itemsDictionaryNext = fmemory.readMemory(itemsDictionary + 0xC, fmemory.INT);
  console.log("[MALUA-DEBUG] itemsDictionaryNext = " + itemsDictionaryNext)

  if (!itemsDictionaryNext) {
    return;
  }

  for (let i = 0; i < 1024; i++) {
    const model = fmemory.readMemory(itemsDictionaryNext + 0xc + i * 0x34, fmemory.INT);

    if (!model) {
      continue;
    }

    const modelName = fmemory.readMemory(model, fmemory.STRING);

    if (!modelName) {
      continue;
    }

    if (modelName.includes(_name)) {
        
      console.log("[MALUA-DEBUG] modelIndex = " + i)
      
      return i;
    }
  }

  return 0;
}

function getModelIndex(_csgo, _itemIndex) {
  let index = 0;

  switch (_itemIndex) {
    case knifeDefinitionIndex.WEAPON_KNIFE_CT:
      index = getModelIndexByName(_csgo, "models/weapons/v_knife_default_ct.mdl");
      break;
    case knifeDefinitionIndex.WEAPON_KNIFE_T:
      index = getModelIndexByName(_csgo, "models/weapons/v_knife_default_t.mdl");
      break;
    case knifeDefinitionIndex.WEAPON_KNIFE_BAYONET:
      index = getModelIndexByName(_csgo, "models/weapons/v_knife_bayonet.mdl");
      break;
    case knifeDefinitionIndex.WEAPON_KNIFE_FLIP:
      index = getModelIndexByName(_csgo, "models/weapons/v_knife_flip.mdl");
      break;
    case knifeDefinitionIndex.WEAPON_KNIFE_GUT:
      index = getModelIndexByName(_csgo, "models/weapons/v_knife_gut.mdl");
      break;
    case knifeDefinitionIndex.WEAPON_KNIFE_KARAMBIT:
      index = getModelIndexByName(_csgo, "models/weapons/v_knife_karam.mdl");
      break;
    case knifeDefinitionIndex.WEAPON_KNIFE_M9_BAYONET:
      index = getModelIndexByName(_csgo, "models/weapons/v_knife_m9_bay.mdl");
      break;
    case knifeDefinitionIndex.WEAPON_KNIFE_HUNTSMAN:
      index = getModelIndexByName(_csgo, "models/weapons/v_knife_tactical.mdl");
      break;
    case knifeDefinitionIndex.WEAPON_KNIFE_FALCHION:
      index = getModelIndexByName(_csgo, "models/weapons/v_knife_falchion_advanced.mdl");
      break;
    case knifeDefinitionIndex.WEAPON_KNIFE_BOWIE:
      index = getModelIndexByName(_csgo, "models/weapons/v_knife_survival_bowie.mdl");
      break;
    case knifeDefinitionIndex.WEAPON_KNIFE_BUTTERFLY:
      index = getModelIndexByName(_csgo, "models/weapons/v_knife_butterfly.mdl");
      break;
    case knifeDefinitionIndex.WEAPON_KNIFE_DAGGERS:
      index = getModelIndexByName(_csgo, "models/weapons/v_knife_push.mdl");
      break;
    case knifeDefinitionIndex.WEAPON_KNIFE_URSUS:
      index = getModelIndexByName(_csgo, "models/weapons/v_knife_ursus.mdl");
      break;
    case knifeDefinitionIndex.WEAPON_KNIFE_NAVAJA:
      index = getModelIndexByName(_csgo, "models/weapons/v_knife_gypsy_jackknife.mdl");
      break;
    case knifeDefinitionIndex.WEAPON_KNIFE_STILETTO:
      index = getModelIndexByName(_csgo, "models/weapons/v_knife_stiletto.mdl");
      break;
    case knifeDefinitionIndex.WEAPON_KNIFE_TALON:
      index = getModelIndexByName(_csgo, "models/weapons/v_knife_widowmaker.mdl");
      break;
    case knifeDefinitionIndex.WEAPON_KNIFE_CLASSIC:
      index = getModelIndexByName(_csgo, "models/weapons/v_knife_css.mdl");
      break;
    case knifeDefinitionIndex.WEAPON_KNIFE_PARACORD:
      index = getModelIndexByName(_csgo, "models/weapons/v_knife_cord.mdl");
      break;
    case knifeDefinitionIndex.WEAPON_KNIFE_CANIS:
      index = getModelIndexByName(_csgo, "models/weapons/v_knife_canis.mdl");
      break;
    case knifeDefinitionIndex.WEAPON_KNIFE_OUTDOOR:
      index = getModelIndexByName(_csgo, "models/weapons/v_knife_outdoor.mdl");
      break;
    case knifeDefinitionIndex.WEAPON_KNIFE_SKELETON:
      index = getModelIndexByName(_csgo, "models/weapons/v_knife_skeleton.mdl");
      break;
  }

  return index;
}

module.exports = async (_csgo, _callback) => {
  if (!_csgo.skinChanger.status) {
    return;
  }

  _csgo.processID = fmemory.getProcessID('csgo.exe')
  _csgo.engineModule = fmemory.getModuleBaseAddress('engine.dll', _csgo.processID);
  _csgo.clientModule = fmemory.getModuleBaseAddress('client.dll', _csgo.processID);
  
  _csgo.skinChanger.PID = process.pid;
  
  _callback(null, _csgo);

  let knife = {};

  for (const key in _csgo.skinChanger.skins) {
    const skin = _csgo.skinChanger.skins[key];

    if (knifes.indexOf(skin.id) >= 0) {
      knife = skin;
      break;
    }
  }

  knife.modelIndex = getModelIndex(_csgo, knife.id);

  for (; ;) {
    if (!_csgo.skinChanger.status) {
      continue;
    }

    if (knife.modelIndex === 0) {
      knife.modelIndex = getModelIndex(_csgo, knife.id);
    }

    const localPlayer = fmemory.readMemory(_csgo.clientModule + _csgo.offsetList.dwLocalPlayer, fmemory.UINT);
    // console.log("[MALUA-DEBUG] localPlayer = " + localPlayer)

    if (!localPlayer) {
      continue;
    }

    // TODO: get rid of this loop
    for (let i = 0; i < 8; i++) {

      let currentWeapon = fmemory.readMemory(localPlayer + _csgo.offsetList.m_hMyWeapons + i * 0x4, fmemory.INT) & 0xFFF
      currentWeapon = fmemory.readMemory(_csgo.clientModule + _csgo.offsetList.dwEntityList + (currentWeapon - 1) * 0x10, fmemory.INT)

      if (!currentWeapon) {
        continue;
      }

      const weaponIndex = fmemory.readMemory(currentWeapon + _csgo.offsetList.m_iItemDefinitionIndex, fmemory.SHORT);
      // console.log("[MALUA-DEBUG] weaponIndex = " + weaponIndex)

      if (weaponIndex === knifeDefinitionIndex.WEAPON_KNIFE_CT || weaponIndex === knifeDefinitionIndex.WEAPON_KNIFE_T) {

        fmemory.writeMemory(currentWeapon + _csgo.offsetList.m_iItemDefinitionIndex, knife.id, fmemory.INT);
        fmemory.writeMemory(currentWeapon + _csgo.offsetList.m_nModelIndex, knife.modelIndex, fmemory.INT);
        fmemory.writeMemory(currentWeapon + _csgo.offsetList.m_iViewModelIndex, knife.modelIndex, fmemory.INT);
        fmemory.writeMemory(currentWeapon + _csgo.offsetList.m_iEntityQuality, 3, fmemory.INT);
        fmemory.writeMemory(currentWeapon + _csgo.offsetList.m_iItemIDHigh, -1, fmemory.INT);
        fmemory.writeMemory(currentWeapon + _csgo.offsetList.m_nFallbackPaintKit, knife.skinID, fmemory.INT);
        fmemory.writeMemory(currentWeapon + _csgo.offsetList.m_nFallbackWear, 0.0001, fmemory.FLOAT);
        fmemory.writeMemory(currentWeapon + _csgo.offsetList.m_nFallbackSeed, 661, fmemory.INT);
      }

      if (weaponIndex <= 0 || weaponIndex > 64) {
        continue;
      }

      const paintKit = fmemory.readMemory(currentWeapon + _csgo.offsetList.m_nFallbackPaintKit, fmemory.INT);
      const accountID = fmemory.readMemory(currentWeapon + _csgo.offsetList.m_OriginalOwnerXuidLow, fmemory.INT);

      for (const key in _csgo.skinChanger.skins) {

        const skin = _csgo.skinChanger.skins[key];

        if (weaponIndex === skin.id && paintKit !== skin.skinID) {
          fmemory.writeMemory(currentWeapon + _csgo.offsetList.m_iItemIDLow, 0, fmemory.INT);
          fmemory.writeMemory(currentWeapon + _csgo.offsetList.m_iItemIDHigh, -1, fmemory.INT);
          fmemory.writeMemory(currentWeapon + _csgo.offsetList.m_nFallbackPaintKit, skin.skinID, fmemory.INT);
          fmemory.writeMemory(currentWeapon + _csgo.offsetList.m_nFallbackWear, 0.0001, fmemory.FLOAT);
          fmemory.writeMemory(currentWeapon + _csgo.offsetList.m_nFallbackSeed, 0, fmemory.INT);
          fmemory.writeMemory(currentWeapon + _csgo.offsetList.m_iAccountID, accountID, fmemory.INT);
        }
      }
    }

    let activeWeapon = fmemory.readMemory(localPlayer + _csgo.offsetList.m_hActiveWeapon, fmemory.INT) & 0xFFF
    activeWeapon = fmemory.readMemory(_csgo.clientModule + _csgo.offsetList.dwEntityList + (activeWeapon - 1) * 0x10, fmemory.INT)

    if (!activeWeapon) {
      continue;
    }

    const weaponIndex = fmemory.readMemory(activeWeapon + _csgo.offsetList.m_iItemDefinitionIndex, fmemory.SHORT);

    if (weaponIndex !== knife.id) {
      continue;
    }

    let activeViewModel = fmemory.readMemory(localPlayer + _csgo.offsetList.m_hViewModel, fmemory.INT) & 0xFFF
    activeViewModel = fmemory.readMemory(_csgo.clientModule + _csgo.offsetList.dwEntityList + (activeViewModel - 1) * 0x10, fmemory.INT)

    if (!activeViewModel) {
      continue;
    }

    // update view model with chosen knife
    fmemory.writeMemory(activeViewModel + _csgo.offsetList.m_nModelIndex, knife.modelIndex, fmemory.INT);

    // read current animation sequence
    let currentSequence = fmemory.readMemory(activeViewModel + _csgo.offsetList.m_nSequence, fmemory.INT)
    //console.log("[MALUA-DEBUG] current sequence = " + currentSequence)
  }
};
