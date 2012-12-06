var Connection    = require('ssh2')
  , inherits      = require('util').inherits
  , EventEmitter  = require('events').EventEmitter;


var ssh = new Connection();
ssh.on('connect', function() {
	shell.is_connected = true;
	console.log('Connection :: connect');
});
ssh.on('ready', function() {
	console.log('Connection :: ready');
	shell.start();
});
ssh.on('error', function(err) {
	console.log('Connection :: error :: ' + err);
});
ssh.on('end', function() {
	console.log('Connection :: end');
});
ssh.on('close', function(had_error) {
	console.log('Connection :: close');
});

function Shell () {
	EventEmitter.call(this);
	self = this;
	this._stream = undefined;
	self._term = process.env.TERM || 'xterm';
	self.is_connected = false;
	this.connect = function(config) {
		ssh.connect({
			host: config.ssh.host,
			port: config.ssh.port,
			username: config.ssh.username,
			password: config.ssh.password,
			privateKey: config.ssh.privateKey ? fs.readFileSync(config.ssh.privateKey) : undefined,
			publicKey: config.ssh.publicKey ? fs.readFileSync(config.ssh.publicKey) : undefined
		});

	}
	this.on('cmd', function(cmd){
		if(cmd && self._stream) {
			self._stream.write(cmd + '\n');
		}
	});
	this.writeStream = function() {}
	this.exit = function() {}
};
inherits(Shell, EventEmitter);

Shell.prototype.start = function() { 
	ssh.shell(self._term, function(err, stream) {
		self._stream = stream;
		if (err) throw err;
		stream.on('data', function(data, extended) {
			self.emit('data', data);
		});
		stream.on('end', function() {
			console.log('Stream :: EOF');
		});
		stream.on('close', function() {
			console.log('Stream :: close');
		});
		stream.on('exit', function(code, signal) {
			console.log('Stream :: exit :: code: ' + code + ', signal: ' + signal);
		});
	});
};
var shell = new Shell();
module.exports = shell;