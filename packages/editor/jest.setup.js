// import Adapter from "enzyme-adapter-react-16"
// import Enzyme from "enzyme"
const Adapter = require("enzyme-adapter-react-16")
const Enzyme = require("enzyme")
Enzyme.configure({ adapter: new Adapter() })

const dotenv = require("dotenv")
dotenv.config({ path: "./.env/dev.env" })
