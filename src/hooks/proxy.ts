export type HandlerFunction<MessageType> = (message: MessageType) => void;

export function createSubscribable<MessageType>() {
  const subscribers: Set<HandlerFunction<MessageType>> = new Set([]);

  return {
    subscribe: (handler: HandlerFunction<MessageType>): (() => void) => {
      subscribers.add(handler);

      return () => subscribers.delete(handler);
    },
    publish: (message: MessageType) => {
      subscribers.forEach((handler) => handler(message));
    },
  };
}

export type ObservableMessage<T> = {
  target: T;
  prop: string;
};

export type Observable<T> = T & {
  subscribe: (handler: HandlerFunction<ObservableMessage<T>>) => () => void;
};

export default function createProxy<DataType extends {}>(
  data: DataType
): Observable<DataType> {
  const { subscribe, publish } =
    createSubscribable<ObservableMessage<DataType>>();

  return new Proxy(
    {
      ...data,
      subscribe,
    },
    {
      set: (
        target: DataType,
        prop: string,
        newValue: DataType[keyof DataType]
      ) => {
        Reflect.set(target, prop, newValue);
        publish({
          target,
          prop,
        });
        return true;
      },
    }
  ) as Observable<DataType>;
}
