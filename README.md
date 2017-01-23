# Market Data

## Front-End Development Environment Setup

1. Make sure you have at least Node v6+
2. Run `npm install`
3. Run `npm run development` for the dev environment
4. Run `npm run production` to generate a static file build in the `/static` directory
5. `npm test` to run unit tests (which aren't set up yet)

## Back-End Development Environment Setup

1. Download Vagrant: https://www.vagrantup.com/downloads.html
2. Download VirtualBox: https://www.virtualbox.org/wiki/Downloads
3. Run `vagrant up` within the project's root directory
4. Run `vagrant provision` to run the provision script again **ONLY** if you have modified it
5. Follow the commands printed out by the provision script
6. Run `npm start` to get the Node server running whilst connected to the PostgreSQL database
7. Hack the planet

## Recommended Development Tools

If you don't have `nvm` (Node Version Manager) yet, it is highly advised that you install it. Simply use one of the two following install scripts:

- For cURL: `curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.32.0/install.sh | bash`
- For Wget: `wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.32.0/install.sh | bash`
