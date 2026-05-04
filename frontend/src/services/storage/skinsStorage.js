const KEY = "@Malua/Skins";

export const getItems = () => {
  const items = JSON.parse(localStorage.getItem(KEY));

  if (items === null) {
    localStorage.setItem(KEY, "[]");
    return [];
  }

  return items;
};

export const addItem = (item, replace = false) => {
  let items = JSON.parse(localStorage.getItem(KEY));

  if (
    items.filter((_item) => _item.weaponName === item.weaponName).length > 0 &&
    !replace
  ) {
    return false;
  }

  if (replace) {
    items = items.filter((_item) => _item.weaponName !== item.weaponName);
  }

  items.push(item);

  localStorage.setItem(KEY, JSON.stringify(items));

  return true;
};

export const removeItem = (item) => {
  const items = JSON.parse(localStorage.getItem(KEY));

  const itemsFiltered = items.filter((i) => i.uuid !== item.uuid);

  console.log(item);

  localStorage.setItem(KEY, JSON.stringify(itemsFiltered));
};

export const clear = () => {
  localStorage.clear();
};
