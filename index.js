const express = require('express');
const multer = require('multer');
const app = express();
const port = 5000;
const ip = '192.168.0.190';

// allow cross origin requests
const cors = require('cors');
app.use(cors());





// Set up storage for file uploads
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'uploads/'); // Directory where uploaded files will be stored
	},
	filename: function (req, file, cb) {
		cb(null, file.originalname); // Use the original file name as the saved name
	}
});

const upload = multer({ storage });

// File upload endpoint
app.post('/upload', upload.single('file'), (req, res) => {
	// exec child process
	// "sudo", "apt-get", "install", "deluged", "deluge-web", "deluge-console", ";"


	const file = `uploads/${req.file.originalname}`;
	const { spawnSync } = require('child_process');
	let child = spawnSync("wsl", ["sudo", "pkill", "-i", "deluged", ";", "deluged", ";", "deluge-console", "add", file, ";", "deluge-console", "info"], {
		shell: true
	});
	
	console.log(child.stdout.toString());
	console.log(child.stderr.toString());

	res.json({ file: req.file });

});

// File download endpoint
app.get('/download/:filename', (req, res) => {
	// get file name from folders

	const file = `download/${req.params.filename}`;
	res.download(file); // Sends the file as a response for download
});

app.listen(port, ip, () => {
	console.log('Server running at address: ' + ip + ':' + port);
});
