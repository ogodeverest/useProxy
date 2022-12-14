import { useEffect, useState } from "react";
import { Observable } from "./proxy";

export default function useProxy<DataType>(
  observable: Observable<DataType>
): Observable<DataType> {
  const [, setState] = useState(0);

  useEffect(
    () => observable.subscribe(() => setState((state) => state + 1)),
    [observable]
  );

  return observable;
}
