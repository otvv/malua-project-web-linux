const fmemory = require('fmemory');
const request = require('request-promise');

module.exports = {
  // TODO: make some sort of netvar manager
  dumpOffsets: async function dumpOffsets(_csgo) {

    const offsets = await request('') // NOTE: add an updated csgo netvar json url here 

    // read offset list
    _csgo.offsetList = JSON.parse(offsets);

    // assign signatures and netvars
    _csgo.offsetList = Object.assign({}, _csgo.offsetList.signatures, _csgo.offsetList.netvars);

    // assign netvars that aren't on the list
    _csgo.offsetList.m_nModelIndex = 0x258;
    _csgo.offsetList.m_hViewModel = 0x32F8;
    _csgo.offsetList.m_iViewModelIndex = 0x3240;
    _csgo.offsetList.m_nDeltaTick = 0x174;
    _csgo.offsetList.m_nSequence = 0x28BC;

    // signatures
  },

  // TODO: make this more reliable
  forceUpdate: function forceUpdate(_csgo) {

    // client state pointer
    const clientState = fmemory.readMemory(_csgo.engineModule + _csgo.offsetList.dwClientState, fmemory.UINT);

    if (clientState) {
      // force update
      fmemory.writeMemory(clientState + _csgo.offsetList.m_nDeltaTick, -999, fmemory.BYTE);
      console.log("[MALUA-DEBUG] forced update")
    }
  },

  getLocalPlayerIndex: function getLocalPlayerIndex(_csgo) {
    
    // client state pointer
    const clientState = fmemory.readMemory(_csgo.engineModule + _csgo.offsetList.dwClientState, fmemory.UINT);
    
    if (clientState) {
      // local player index
      const localPlayerIndex = fmemory.readMemory(clientState + _csgo.offsetList.dwClientState_GetLocalPlayer, fmemory.INT) + 1;
      console.log("[MALUA-DEBUG] localPlayerIndex = " + localPlayerIndex)
      
      return localPlayerIndex;
    }
  },
};
