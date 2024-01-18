import Player from '../Models/MainModel.js';

// controllers/mainController.js
export const getIndex = (req, res) => {
  const name = req.params.name || "";
  
  res.render('index', { name, title : 'Node Core Concepts!!!' });
};

export const getAbout = (req, res) => {
  res.render('about', {title: "About Page"});
};

export const loadCRUD = async (req, res) => {
  try {
    let players;

    // Check if sorting is requested
    const sortBy = req.query.sortBy;

    if (sortBy === 'goals') {
      // If sorting by goals, fetch players sorted by goalsScored in descending order
      players = await Player.find().sort({ goalsScored: -1 });
    } else {
      // Default: Fetch players without sorting
      players = await Player.find();
    }

    res.render('crud', { title: "CRUD", players });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching players' });
  }
};

export const createPlayer = async (req, res) => {
  try {
    const newPlayer = new Player({
      playerName: req.body.playerName,
      playerNumber: req.body.playerNumber,
      goalsScored: req.body.goalsScored,
    });

    await newPlayer.save();
    res.redirect('/crud');
  } catch (error) {
    res.status(500).json({ error: 'Error creating player' });
  }
};


export const editPlayer = async (req, res) => {
  try {
    const playerId = req.params.id;
    const player = await Player.findById(playerId);

    if (!player) {
      return res.status(404).send('Player not found');
    }
    res.render('edit', { player, title: `Editing ${player.playerName}` });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching player' });
  }
};

export const updatePlayer = async (req, res) => {
  console.log(req.params.id);
  try {
    const playerId = req.params.id;
    const updateData = {
      playerName: req.body.playerName,
      playerNumber: req.body.playerNumber,
      goalsScored: req.body.goalsScored,
    };
    await Player.findOneAndUpdate({_id: playerId}, updateData);
    res.redirect('/CRUD'); // Redirect back to the CRUD route
  } catch (error) {
    res.status(500).json({ error: 'Error updating player' });
  }
};

  
export const deletePlayer = async (req, res) => {
  try {
    const playerId = req.params.id;
    const deletedPlayer = await Player.deleteOne({ _id: playerId });

    if (deletedPlayer.deletedCount === 0) {
      console.log('No player found with that _id.');
      return res.redirect('/crud');
    }

    console.log('Deleted player');
    res.redirect('/crud');
  } catch (error) {
    console.error('Error deleting player:', error);
    res.status(500).json({ error: 'Error deleting player' });
  }
};
  

export const addGoal = async (req, res) => {
  try {
    const playerId = req.params.id;
    const player = await Player.findById(playerId);

    if (!player) {
      return res.status(404).send('Player not found');
    }

    player.goalsScored += 1;
    await player.save();

    res.redirect('/crud');
  } catch (error) {
    console.error('Error adding goal:', error);
    res.status(500).json({ error: 'Error adding goal' });
  }
};

