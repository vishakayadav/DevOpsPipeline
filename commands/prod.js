require('dotenv').config()
const chalk = require('chalk');
const axios = require("axios");
const fs = require('fs');
const path = require('path');
const vmProvider = require("../lib/vmProvider");
const bakerxProvider = require("../lib/bakerxProvider");
const execProvider = require('../lib/exec/ExecProvider');
const { env } = require('process');
const droplet = require("../lib/droplet")
const { serverNames } = require("../lib/blueGreenStrategy")

exports.command = 'prod up';
exports.desc = 'Create a production on the DigitalOcean';
exports.builder = yargs => {
    yargs.options({
    });
};


exports.handler = async argv => {
    const { processor } = argv;

    console.log("Check if the TOKEN exists")

    let provider = null;
    if (processor == "Intel/Amd64") {
        provider = bakerxProvider
    } else {
        provider = vmProvider
    }

	var region = "nyc1"; // Fill one in from #1
	var image = "ubuntu-20-04-x64"; // Fill one in from #2
    let sshKeys = await droplet.listSshKeys();

    if(sshKeys.length == 0){
        console.log(chalk.red("You should upload a ssh key to your digital account"))
        return
    }

    // reset the server by delete existing one and create a new one
    let flag = false;
	for(let server in serverNames) {
		await droplet.cleanExistDroplet(server);
		let hostInfo = `HOST ${server}`;
		await droplet.writeToInventory(hostInfo, flag);
		await droplet.createDroplet(server, region, image, sshKeys[0]);
        flag = true;
	}
};
