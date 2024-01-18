// Models/MainModel.js
import { Schema, model } from 'mongoose';

const playerRecord = new Schema({
  playerName: String,
  playerNumber: Number,
  goalsScored: Number
});

const Player = model('Player', playerRecord);

export default Player;
