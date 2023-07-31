import { useEffect, useState } from "react";
function useFetchRecord(
  id: number,
  fetcher: (params: { id: number }) => Promise<any>,
  setter: (data: any) => void
) {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (id) {
      (async () => {
        setLoading(true);
        const response = await fetcher({ id });
        if (response) {
          const data = response.data.data[0];
          setter(data);
        }
        setLoading(false);
      })();
    }
  }, [id, fetcher, setter]);
  return { loading };
}
export default useFetchRecord;
