/**
 * This util method is responsible for restructuring the images array into
 * specified chunks of arrays for ease of pagination
 * @param {array} images 
 * @returns 
 */
const paginate = (images) => {
  if (images === null || images === undefined || images.length === 0) {
    return [];
  }
  const itemsPerPage = 9;
  const pages = Math.ceil(images.length / itemsPerPage);

  const newImages = Array.from({ length: pages }, (_, index) => {
    const start = index * itemsPerPage;
    return images.slice(start, start + itemsPerPage);
  });
  return newImages;
};

export default paginate;
