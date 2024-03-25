import client from "../helpers/db.js";

// All of the datamappers
import UserDatamapper from "./user.datamapper.js";
import RoomDatamapper from "./room.datamapper.js";
import ReservationDatamapper from "./reservation.datamapper.js";
import HourlyDatamapper from "./hourly.datamapper.js";
import BlockedSlotDatamapper from "./blockedSlot.datamapper.js";
import RoomUserDatamapper from "./roomUser.datamapper.js";
import HourlyRoomDatamapper from "./hourlyRoom.datamapper.js";
import BlockedSlotRoomDatamapper from "./blockedSlotRoom.datamapper.js";

// Instanciation while passing client to the constructor
export const userDatamapper = new UserDatamapper(client);
export const roomDatamapper = new RoomDatamapper(client);
export const reservationDatamapper = new ReservationDatamapper(client);
export const hourlyDatamapper = new HourlyDatamapper(client);
export const blockedSlotDatamapper = new BlockedSlotDatamapper(client);
export const roomUserDatamapper = new RoomUserDatamapper(client);
export const hourlyRoomDatamapper = new HourlyRoomDatamapper(client);
export const blockedSlotRoomDatamapper = new BlockedSlotRoomDatamapper(client);
