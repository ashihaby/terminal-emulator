config = {
	http: {
		host: 'localhost',
		port: 9998
	},
	ssh: {
		host: "localhost",                   //required
		port: 22,                            //required
		username: "ashihaby",                        //required
		password: "c9cloud9ers",                        //required 
		privateKey: '',                      //[optional] path of privateKey
		publicKey: ''                        //[optional] path of privateKey
	}

}
module.exports = config;
