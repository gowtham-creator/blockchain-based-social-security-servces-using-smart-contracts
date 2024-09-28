import web3 from './web3';
import SocialSecurity from './contracts/SocialSecurity.json';


const address = '0xff41389eb494cfc490f8f82824e5f682c45be812';
const instance = new web3.eth.Contract(SocialSecurity.abi, address);


export default instance;
