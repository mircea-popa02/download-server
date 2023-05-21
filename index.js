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

	const file = `uploads/${req.file.originalname}`;

	const { exec } = require('child_process');
	exec("sudo pkill -i deluged && deluged && deluge-console add " + file, (error, stdout, stderr) => {
		if (error) {
			console.log(`error: ${error.message}`);
			return;
		}
		if (stderr) {
			console.log(`stderr: ${stderr}`);
			return;
		}

		console.log(`stdout: ${stdout}`);
	});


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
