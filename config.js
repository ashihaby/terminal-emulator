config = {
	http: {
		host: 'localhost',
		port: 9998
	},
	ssh: {
		host: "localhost",                   //required
		port: 22,                            //required
		username: "",                        //required
		password: "",                        //required 
		privateKey: '',                      //[optional] path of privateKey
		publicKey: ''                        //[optional] path of privateKey
	}

}
module.exports = config;
