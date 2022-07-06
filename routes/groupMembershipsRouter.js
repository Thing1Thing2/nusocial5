const groupMembershipsController = require("../controllers/groupMembershipsController.js");

const groupMembershipsRouter = require("express").Router();

groupMembershipsRouter.post("/joinGroup", groupMembershipsController.joinGroup);
groupMembershipsRouter.post(
  "/leaveGroup",
  groupMembershipsController.leaveGroup
);
groupMembershipsRouter.post(
  "/gainAdminAccess",
  groupMembershipsController.gainAdminAccess
);

module.exports = groupMembershipsRouter;
