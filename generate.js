const fs = require("fs");
const path = require("path");

const JSON_PATH = path.resolve(__dirname, "./json_data");

// Load dữ liệu có sẵn
const areas = JSON.parse(fs.readFileSync(path.resolve(JSON_PATH, "areas.json")));
const provinces = JSON.parse(fs.readFileSync(path.resolve(JSON_PATH, "provinces.json")));
const wards = JSON.parse(fs.readFileSync(path.resolve(JSON_PATH, "wards.json")));

let tree_v1 = {};

// ===== Build tree_v1 (area -> provinces -> wards) =====
areas.forEach((area) => {
  tree_v1[area.code] = { ...area, provinces: {} };
});

provinces.forEach((province) => {
  if (!tree_v1[province.area_code]) return;
  tree_v1[province.area_code].provinces[province.code] = {
    ...province,
    wards: {},
  };
});

wards.forEach((ward) => {
  const area = tree_v1[ward.area_code];
  if (!area) return;

  const province = area.provinces[ward.province_code];
  if (!province) return;

  province.wards[ward.code] = ward;
});

fs.writeFileSync(
  path.resolve(JSON_PATH, "tree.json"),
  JSON.stringify(tree_v1, null, 2)
);

console.log("✅ tree_v1.json generated with areas → provinces → wards!");