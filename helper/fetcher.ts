const fetcher = async (url: string) => {
  const res = await fetch(url);
  const data = res.json();
  return data;
};

export default fetcher;
