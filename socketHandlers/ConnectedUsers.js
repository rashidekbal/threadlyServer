let Users = new Map();
const addUser = (uuid, socketId) => {
  if (Users.has(uuid)) {
    Users.delete(uuid);
  }
  Users.set(uuid, socketId);
};
const removeUser = (socketId) => {
  Users.forEach((value, key) => {
    if (value == socketId) {
      Users.delete(key);

      return;
    }
  });
};
const getuuid = (socketId) => {
  Users.forEach((value, key) => {
    if (value == socketId) {
      return key;
    }
    return null;
  });
};
const getSocketId = (uuid) => {
  if (Users.has(uuid)) {
    return Users.get(uuid);
  } else {
    return null;
  }
};

export { addUser, getSocketId, removeUser, getuuid };
