import defines from'./defines.js'
const res =
{
  "bq04": "bq04.png"
};
 for (let i in res) {res[i] = defines.resPath+res[i];}
 export default res