# A Privacy Period App

## Mission
Create an encrypted-at-rest local data storage for tracking your period and other uterine and pregnancy health metrics for use by all women, especially those in states with regressive abortion legislation.

## Tasks
Add a....
- [ ] Function for local key creation and lock/unlock
- [ ] Data object creator
- [ ] Data lock/unlock function
- [ ] Calendar
- [ ] Period tracking workflow
- [ ] Data Shredder / Panic button
- [ ] Notifications for common situations

## Running this project
Currently running this on WSL2 on Windows 11. To run this locally on such an environment you should follow [these reccomendations](https://github.com/expo/fyi/blob/main/wsl.md) to forward traffic and open the Hyper-V firewall.

You should also ensure you [meet the requirements to use Expo](https://docs.expo.dev/get-started/installation/), which includes installing Node.JS LTS, Git, and Watchman.

Once you have done that you should clone this repository, navigate to root, and run the command to start expo.
`npx expo start`

You should then be able to access via browser or mobile device by using the expo CLI menu.

## Designs
image