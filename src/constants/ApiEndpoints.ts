export const emails = (page = 1) => {
  return `https://flipkart-email-mock.now.sh/?page=${page}`;
};

export const email = (id: string) => {
  return `https://flipkart-email-mock.now.sh/?id=${id}`;
};
