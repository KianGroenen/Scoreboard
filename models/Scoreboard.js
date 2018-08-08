// Require Mongoose
var mongoose = require('mongoose');

// Define a schema
var ScoreboardSchema = new mongoose.Schema({
	score_team1: String,
	score_team2: String,
	score_score1: String,
	score_score2: String,
	score_shots1: String,
	score_shots2: String,
	score_fouls1: String,
	score_fouls2: String,
	score_updates: String,
	updated_at: {type: Date, default: Date.now},
});

// Compile model from schema
var Scoreboard = mongoose.model('Scoreboard', ScoreboardSchema);