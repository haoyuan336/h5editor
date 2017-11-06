/**
 * Created by chuhaoyuan on 2017/8/22.
 */
import PlayerData from './player-data'
const Account = function () {
  let that = {};
  that.playerData = PlayerData();
  return that;
};
export default Account;