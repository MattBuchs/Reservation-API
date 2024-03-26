import client from "../helpers/db.js";

// All of the datamappers
import UserDatamapper from "./user.datamapper.js";
import RoomDatamapper from "./room.datamapper.js";
import ReservationDatamapper from "./reservation.datamapper.js";
import HourlyDatamapper from "./hourly.datamapper.js";
import RoomUserDatamapper from "./roomUser.datamapper.js";
import SessionDatamapper from "./session.datamapper.js";
import PriceDatamapper from "./price.datamapper.js";
import RoomSessionDatamapper from "./roomSession.datamapper.js";
import PriceRoomDatamapper from "./priceRoom.datamapper.js";

// Instanciation while passing client to the constructor
export const userDatamapper = new UserDatamapper(client);
export const roomDatamapper = new RoomDatamapper(client);
export const reservationDatamapper = new ReservationDatamapper(client);
export const hourlyDatamapper = new HourlyDatamapper(client);
export const roomUserDatamapper = new RoomUserDatamapper(client);
export const sessionDatamapper = new SessionDatamapper(client);
export const priceDatamapper = new PriceDatamapper(client);
export const roomSessionDatamapper = new RoomSessionDatamapper(client);
export const priceRoomDatamapper = new PriceRoomDatamapper(client);
