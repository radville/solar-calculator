# solar-calculator
This Solar Calculator demo allows users to search for a location on the map, draw a polygon over any area, and see the nominal power output of a solar array in that area.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app)

## Built With

* [React 16.12.0](https://reactjs.org/)


### Installing and running in development mode

1. Clone this repo to your local machine from `https://github.com/radville/solar-calculator` 

2. From the `solar-calculator` folder, run `yarn start` in the terminal to run the app in development mode

3. Open [http://localhost:3000](http://localhost:3000) to view it in the browser. The page will reload if you make edits. You will also see any lint errors in the console.


### `yarn build`: Build for production

Run `yarn build` to build the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.
The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Assumptions
    Assumptions for nominal power calculations were derived from "How to calculate the annual solar energy output of a photovoltaic system?" at https://photovoltaic-software.com/principle-ressources/how-calculate-solar-energy-power-pv-systems
    
    Nominal power (kWh/year) = A (m²) * r * H (kWh/m²*year) * PR,
    where A = total solar panel area, r = solar panel efficiency ratio, H = annual average solar radtion on tilted panels, and PR = performance ratio/coefficient for losses

    Values chosen to represent average conditions in this demo were r = 0.15, H = 1250, and PR = 0.75. In real applications, these would vary by location. Calculations also assume standard test conditions (STC): radiation = 1000 W/m2, cell temperature = 25C, Wind speed = 1 m/s, AM = 1.5.

## Contributing

1. Fork this repo

2. Clone the repo to your local machine with `https://github.com/radville/solar-calculator`

3. Make your edits

4. Create a new pull request


## Authors

* **Laura Radville** - *Initial work* - (https://github.com/radville/)


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details