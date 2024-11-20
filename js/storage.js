import { TASK_TITLE, allItems } from "./tasks";

/**
 * @param {{ id: string; title: string; status: string }} data
 * @returns {void}
 */
export const saveStorageTask = (data) => {
  if (Object.keys(data).length === 0) return;

  allItems.push(data);

  localStorage.setItem(TASK_TITLE, JSON.stringify(allItems));
};

/**
 * @param {string} id
 * @returns {void}
 */
export const deleteStorageTask = (id) => {
  const updatedItems = allItems.filter((item) => item.id !== id);

  localStorage.setItem(TASK_TITLE, JSON.stringify(updatedItems));

  allItems.length = 0;
  allItems.push(...updatedItems);
};
