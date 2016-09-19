# Market Data

## Front-End Development Environment Setup

1. Make sure you have at least Node v6+
2. Run `npm install`
3. Run `npm run development` for the dev environment
4. Run `npm run production` to generate a static file build in the `/static` directory
5. `npm test` to run unit tests (which aren't set up yet)

## Back-End Development Environment Setup

1. Download Vagrant: https://www.vagrantup.com/downloads.html
2. Set up a Debian box with VirtualBox as the provider: https://atlas.hashicorp.com/debian/boxes/jessie64
3. Run `vagrant up` within the project's root directory
4. Run `vagrant provision` to run the provision script again **ONLY** if you have modified it
5. Follow the commands printed out by the provision script
6. Run `npm start` to get the Node server running whilst connected to the PostgreSQL database
7. Hack the planet
