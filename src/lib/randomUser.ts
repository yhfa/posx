export const getRandomUser = async () => {
  const res = await fetch(`https://randomuser.me/api/`);
  const data = (await res.json()).results[0];

  return {
    userImg: data.picture.large,
    userName: `${data.name.first} ${data.name.last}`,
  };
};
