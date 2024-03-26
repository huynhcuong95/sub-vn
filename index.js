const areas = require("./json_data/areas.json");
const provinces = require("./json_data/provinces.json");
const districts = require("./json_data/districts.json");
const wards = require("./json_data/wards.json");
const tree = require("./json_data/tree.json");
const treeWithArea = require("./json_data/treeWithArea.json");

function stringToSlug(str) {
  var from =
    "àáãảạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệđùúủũụưừứửữựòóỏõọôồốổỗộơờớởỡợìíỉĩịäëïîöüûñçýỳỹỵỷ",
    to =
    "aaaaaaaaaaaaaaaaaeeeeeeeeeeeduuuuuuuuuuuoooooooooooooooooiiiiiaeiiouuncyyyyy";
  for (var i = 0, l = from.length; i < l; i++) {
    str = str ? str.replace(RegExp(from[i], "gi"), to[i]) : "";
  }
  str = str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\-]/g, "-")
    .replace(/-+/g, "-");

  return str;
}
// convert wards
const arr = [...wards]
const temp = {}
let nameProcvince = []
arr.forEach((e) => {
  const convertName = stringToSlug(e.province_name)
  if (!temp[convertName]) {
    temp[convertName] = []
    nameProcvince.push(convertName)
  }
  temp[convertName].push(e)
})

// convert district
const arrDistrict = [...districts]
const tempDistrict = {}
let nameDistrict = []
arrDistrict.forEach((e) => {
  const convertName = stringToSlug(e.province_name)
  if (!tempDistrict[convertName]) {
    tempDistrict[convertName] = []
    nameDistrict.push(convertName)
  }
  tempDistrict[convertName].push(e)
})


module.exports = {
  getAreas: () => areas,
  getProvinces: () => provinces,
  getDistricts: () => districts,
  getWards: () => wards,
  getAreasWithDetail: () => treeWithArea,
  getProvincesWithDetail: () => tree,
  getProvindByAreaCode: (areaCode) => provinces.filter((x) => x.area_code == areaCode),
  getDistrictsByProvinceCode: (provinceCode) => districts.filter((x) => x.province_code == provinceCode),
  getWardsByDistrictCode: (districtCode) => wards.filter((x) => x.district_code == districtCode),
  getWardsByProvinceCode: (provinceCode) => wards.filter((x) => x.province_code == provinceCode),
  getWardsByCode: (wardCode) => wards.find((x) => x.code == wardCode),
  getCityByCode: (cityCode) => provinces.find((x) => x.code == cityCode),
  getDistrictByCode: (districtCode) => districts.find((x) => x.code == districtCode),
  //update feature getCodeByName
  getCodeByDistrict: (districtName, provinceName) => tempDistrict[(nameDistrict.find(aa => aa.includes(stringToSlug(provinceName))))].find(x => (stringToSlug(x.name)).includes(stringToSlug(districtName))),
  getCodeByWard: (ward, city) => temp[(nameProcvince.find(aa => aa.includes(stringToSlug(city))))].find(x => (stringToSlug(x.name)).includes(stringToSlug(ward))),
  getCodeProvince: (provinceName) => provinces.find((x) => stringToSlug(x.name).includes(stringToSlug(provinceName))),
};
