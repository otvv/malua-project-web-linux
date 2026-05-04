const fmemory = require('fmemory');
const cheatUtils = require('./helpers/utils');

let csgo = {
  offsetList: null,
  clientModule: null,
  engineModule: null,
  panoramaModule: null,
  processID: null,
};

module.exports = async (_input, _callback) => {

  try {
    csgo.processID = fmemory.getProcessID('csgo_linux64')
    //console.log("[MALUA-DEBUG] processID = " + csgo.processID)

    csgo.clientModule = fmemory.getModuleBaseAddress('client_client.so', csgo.processID)
    //console.log("[MALUA-DEBUG] clientModule @ " + csgo.clientModule)
    csgo.engineModule = fmemory.getModuleBaseAddress('engine_client.so', csgo.processID)
    //console.log("[MALUA-DEBUG] engineModule @ " + csgo.engineModule)
    csgo.panoramaModule = fmemory.getModuleBaseAddress('panorama_client.so', csgo.processID)
    //console.log("[MALUA-DEBUG] panoramaModule @ " + csgo.panoramaModule)

    await cheatUtils.dumpOffsets(csgo)
    //console.log("[MALUA-DEBUG] offsets dumped")

    if (csgo.processID > 0) {
      csgo.running = true;
    }

    // initialize cheat client
    _callback(null, csgo);
  } catch (e) {
    console.error(e)
    _callback(null, { message: '[MALUA] - game client is not running' });
  }
};
