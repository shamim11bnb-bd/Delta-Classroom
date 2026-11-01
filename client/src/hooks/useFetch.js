import { useCallback, useEffect, useState } from "react";

// useFetch(() => fetchSomething(id), [id]) → { data, loading, error, reload }
export function useFetch(fn, deps = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const run = useCallback(fn, deps);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      setData(await run());
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [run]);

  useEffect(() => {
    load();
  }, [load]);

  return { data, loading, error, reload: load };
}
