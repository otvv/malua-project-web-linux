// TODO: maybe move the server to GO


const express = require("express");
const worker = require("worker-farm");
const cors = require("cors");
const cheatUtils = require("./helpers/utils");

const app = express();
app.use(cors());
app.use(express.json());

// services
// TODO: rename these and maybe move them to a dedicated file
const startService = worker(require.resolve("./index"));
const skinChangerService = worker(require.resolve("./features/skinChanger"));

let csgo = {
  skinChanger: {
    status: true,
    PID: 0,
    skins: {},
  },
  forceUpdate: {
    status: true,
    PID: 0,
  },
}

app.get("/start", (_req, _res) => {
  console.log("[MALUA-SERVER] - request start service")

  startService(0, (_err, _csgo) => {
    csgo = { ...csgo, ..._csgo }

    // send response back to the frontend
    if (csgo.running) {
      return _res.json({
        message: "[MALUA-SERVER] - game client running",
        gamePID: csgo.processID
      })
    }
    else {
      return _res.json({ 
        message: "[MALUA-SERVER] - game client is not running",
        gamePID: -1 // invalid process id
       })
    }
  })
})

app.post("/skinChanger", (_req, _res) => {
  console.log("[MALUA-SERVER] - request skin changer")

  // const skins = _req.body;
  // csgo.skinChanger.skins = skins

  if (csgo.skinChanger.PID) {
    process.kill(csgo.skinChanger.PID)
  }

  skinChangerService(csgo, (_err, _csgo) => {
    csgo = { ...csgo, ..._csgo }

    if (csgo.running) {
      return _res.json(_csgo.skinChanger)
    }
  })
})

app.get("/forceUpdate", (_req, _res) => {
  console.log("[MALUA-SERVER] - request force update")
  
  if (csgo.running) {
    const forceUpdate = cheatUtils.forceUpdate(csgo);

    return _res.json({ forceUpdate })
  }
})

app.listen(7777, () =>
  console.log("[MALUA-SERVER] - server is running at: localhost:7777")
)